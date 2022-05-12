import express from "express";
import fetch from "node-fetch";
import URL from "../common/url.js";
import errors, { handleErrors } from "../common/errors.js";
import success, { handleSuccess } from "../common/success.js";
import { getAmount } from "../common/calcCost.js";
import actions from "../common/actions.js";

const router = express.Router();
let items = [];
let items_descriptive = [];

//POST - to add the items in cart
router.post("/item", (req, res) => {
  let item_id = req.body.product_id;
  let item_quantity = req.body.quantity;
  const responseErrorHandler = handleErrors(res);

  fetch(URL["PRODUCT_URL"] + `${item_id}`)
    .then((resp) => {
      if (resp.status === 200) {
        return resp.json();
      } else {
        return new Error();
      }
    })
    .then((data) => {
      if (data.status != "error") {
        const check_item = items.filter(
          (item) => item.product_id == data.product.id
        );
        if (check_item.length > 0) {
          responseErrorHandler(errors.ADDED_IN_CART);
        } else {
          items.push({
            product_id: data.product.id,
            description: data.product.name,
            quantity: item_quantity,
          });

          items_descriptive.push({
            quantity: item_quantity,
            ...data.product,
          });

          console.log(items_descriptive);
          res.send(handleSuccess(success.ITEM_ADDED_TO_CART));
        }
      }
    })
    .catch(() => {
      responseErrorHandler(errors.ITEM_NOT_ADDED);
    });
});

//GET - get all the cart items
router.get("/items", (req, res) => {
  const responseErrorHandler = handleErrors(res);

  if (items.length === 0) {
    responseErrorHandler(errors.CART_IS_EMPTY);
  } else {
    res.send({
      ...handleSuccess(success.ITEMS_AVAILABLE_IN_CART),
      items: items,
    });
  }
});

//DELETE - delete all the items in cart
router.post("/items", (req, res) => {
  const responseErrorHandler = handleErrors(res);
  if (req.body.action === actions.EMPTY_CART) {
    if (items.length > 0) {
      items = [];
      res.send(handleSuccess(success.ALL_ITEMS_REMOVED_FROM_CART));
    } else {
      responseErrorHandler(errors.NOTHING_TO_DELETE_IN_CART);
    }
  } else {
    responseErrorHandler(errors.BAD_REQUEST_GENERAL_ERR);
  }
});

//GET - calculate total cost of cart
router.get("/checkout-value", (req, res) => {
  const postal_code = req.query.shipping_postal_code;
  console.log("postal ", req.query.shipping_postal_code);
  let total_weight = 0;
  let cost_without_shipping = 0;
  let totalCost = 0;

  if (items_descriptive.length > 0) {
    items_descriptive.map((item) => {
      total_weight =
        total_weight + (item.weight_in_grams / 1000) * item.quantity;
      cost_without_shipping =
        cost_without_shipping +
        item.quantity * item.price * ((100 - item.discount_percentage) / 100);
    });
  }

  fetch(URL["WAREHOUSE_DISTANCE_URL"] + `?postal_code=${postal_code}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.distance_in_kilometers)
      totalCost =
        getAmount(total_weight, data.distance_in_kilometers) +
        cost_without_shipping;

      res.send({
        status: "success",
        message: `Total value of your shopping cart is - $${totalCost.toFixed(2)}`,
      })
    });
});


export default router;
