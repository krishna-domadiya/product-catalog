const cart  =   [];

const manageCart = (state = cart, action) => {
    const product   =   action.payload;

    switch (action.type) {
        case "ADD":
            const isExisting   =   state.find((val) => val.id === product.id);
            if(isExisting) {
                return state.map((val) => {
                    return val.id === product.id ? {...val, qty: val.qty+1} : val;
                })
            }
            else {
                return [...state, {...product, qty: 1}]
            }
            break;
    
        case "REMOVE":
            const isExistingDel    =   state.find((val) => val.id === product.id);
            if(isExistingDel.qty === 1) {
                return state.filter((val) => val.id !== isExistingDel.id)
            } 
            else {
                return state.map((val) => {
                    return val.id === product.id ? {...val, qty: val.qty-1} : val;
                })
            }
            break;

        default:
            return state;
            break;
    }
}


export default manageCart;