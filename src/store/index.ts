import { configureStore } from '@reduxjs/toolkit'

import { api } from '../services/api'
import cartReducer from '../features/cart/cartSlice'
import favoritosReducer from './slices/favoritesSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favoritos: favoritosReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
