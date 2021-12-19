export const addToCart = (product) => {
    return {
        type: "ADD",
        payload: product
    }
}

export const removeFromCart = (product) => {
    return {
        type: "REMOVE",
        payload: product
    }
}

export const addToInventory = (product) => {
    return {
        type: "ADDTOINVENTORY",
        payload: product
    }
}

export const removeFromInventory = (product) => {
    return {
        type: "REMOVEFROMINVENTORY",
        payload: product
    }
}