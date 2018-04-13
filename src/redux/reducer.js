import { main } from "./initialState";

const mainReducer = (state = main, action) => {
    switch (action.type){
        case "SUBMIT":
        return {
            ...state,
            referralName: action.data
        };
        default:
        return state;
    }

}

export default mainReducer;