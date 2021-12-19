import manageCart from "./manageCart";
import manageInventory from "./manageInventory";
import { combineReducers } from "redux";

const rootReducers =   combineReducers({
    manageCart,
    manageInventory,
})

export default rootReducers;