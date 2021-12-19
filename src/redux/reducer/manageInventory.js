import inventory from '../../inventory.json';

const existInventory    =   inventory;

const manageInventory = (state = existInventory, action) => {

    const actionInventory =   action.payload;

    switch (action.type) {
        case "ADDTOINVENTORY":
            return state.map((val) => {
                return val.product_id === actionInventory.id ? {...val, quantity: val.quantity + 1} : val;
            })
            break;

        case "REMOVEFROMINVENTORY":
            return state.map((val) => {
                return val.product_id === actionInventory.id ? {...val, quantity: val.quantity - 1} : val;
            })
            break;
    
        default:
            return state;
            break;
    }
}

export default manageInventory;