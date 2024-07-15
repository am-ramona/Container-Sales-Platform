import _ from 'lodash'

let initialState = {
    orderId: null,
};

export default function CartReducer (state = initialState, action) {
    if (!_.get(action, 'type')) {
        return state
      }
    switch (action.type) {
        case 'GET_ORDERID':
            return {
                ...state,
                orderId: action.orderId
            }
        default: 
            return state; 

    }
}