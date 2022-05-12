const success = {
    ITEM_ADDED_TO_CART: "Item has been added to cart",
    ITEMS_AVAILABLE_IN_CART: "Items available in the cart",
    ALL_ITEMS_REMOVED_FROM_CART: "All items have been removed from the cart !"
}

export function handleSuccess(message){
    return {
        status:"success",
        message: message
    }
}

export default success;