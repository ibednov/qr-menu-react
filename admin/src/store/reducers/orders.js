import * as types from '../types/orders'

const initialState = {
  orders: [],
  isOrdersLoading: true,
  isOrdersError: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUESTED_ORDERS: {
      return {
        ...state,
        isOrdersLoading: true,
      }
    }
    case types.REQUESTED_ORDERS_SUCCEEDED: {
      return {
        ...state,
        orders: action.payload.orders,
        isOrdersLoading: false,
      }
    }
    case types.REQUESTED_ORDERS_FAILED: {
      return {
        ...state,
        isOrdersErrors: true,
        isOrdersLoading: false,
      }
    }

    case types.ADD_ORDER: {
      const { order } = action.payload
      return {
        ...state,
        orders: [...state.orders, order],
      }
    }

    case types.CLEAR_ORDERS: {
      return {
        ...state,
        orders: [],
      }
    }
    default:
      return state
  }
}

export default reducer