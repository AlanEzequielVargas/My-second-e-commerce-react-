import { configureStore } from '@reduxjs/toolkit'
import  cartSlice  from './slices/cart.splice'
import productsSlice from './slices/products.slice'
import  purchasesSlice  from './slices/purchases.slice'
import spinnerSlice from './slices/spinner.slice'

export default configureStore({
    reducer: {
      products: productsSlice,
      spinner: spinnerSlice,
      purchases: purchasesSlice,
      cart: cartSlice
    }
})
