const errors = {
    ADDED_IN_CART: "Item already present in the cart.",
    ITEM_NOT_ADDED: "Item is not added to the cart. Please try again.",
    CART_IS_EMPTY: "Cart is Empty. Add items to Proceed.",
    NOTHING_TO_DELETE_IN_CART: "Cart is empty. Nothing to delete from cart.",
    BAD_REQUEST_GENERAL_ERR: "Bad Request: Please try again.",
    POSTAL_CODE_ERROR: "Invalid postal code, valid ones are 465535 to 465545."
}

export function handleErrors(response){
    return function(message){
        if(message === errors.CART_IS_EMPTY){
            return response.status(200).send({
                message: message
            })
        }
        return response.status(400).send({
            message: message
        })
    }
    
}

export default errors;