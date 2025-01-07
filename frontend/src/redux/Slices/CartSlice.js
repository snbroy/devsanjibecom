import { createSlice } from "@reduxjs/toolkit"

const getLocalCartData = () =>{
    const localCart = localStorage.getItem("cart")
    let returnData = []
    if(localCart){
        return returnData = JSON.parse(localCart)
    }
    return returnData
}

console.log('ghjhg', getLocalCartData())

export const CartSlice = createSlice({
    name: "cart",
    initialState: getLocalCartData(),
    reducers: {
        add: (state, action) => {
            state.push(action.payload)
        },
        remove: (state, action) => {
            return state.filter((item) => item.id !== action.payload)
        },
        update: (state, action) => {
            return state.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        ...action.payload
                    }
                }
                return item
            })
        },
        clearCart: (state) => {
            const emptyState = [];
            state.push(emptyState)
        },
    }
})

export const { add, remove, update, clearCart } = CartSlice.actions;
export default CartSlice.reducer;