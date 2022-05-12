Below Heroku links to access the app - (Use Postman for better experience - https://github.com/abhi02495/nodejs-api/blob/main/NodeJs%20APIs.postman_collection.json)

-> POST (Add an item in the cart)
https://floating-brushlands-12135.herokuapp.com/cart/item 
Request Body - 
{
  "product_id": 103,
  "quantity": 10
}


-> GET all the items in the cart
https://floating-brushlands-12135.herokuapp.com/cart/items



-> POST - delete all the items in the cart
https://floating-brushlands-12135.herokuapp.com/cart/items
Request Body - 
{
  "action": "empty_cart"
}


-> GET total cart value 
https://floating-brushlands-12135.herokuapp.com/cart/checkout-value?shipping_postal_code=465535
