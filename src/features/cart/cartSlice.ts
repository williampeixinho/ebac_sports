import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../../store'
import { Produto } from '../../types/Produto'

export type CartItem = {
  produto: Produto
  quantidade: number
}

type CartState = {
  itens: CartItem[]
}

const initialState: CartState = {
  itens: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Produto>) => {
      const existingItem = state.itens.find(
        (item) => item.produto.id === action.payload.id
      )

      if (existingItem) {
        existingItem.quantidade += 1
      } else {
        state.itens.push({ produto: action.payload, quantidade: 1 })
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter(
        (item) => item.produto.id !== action.payload
      )
    },
    changeQuantity: (
      state,
      action: PayloadAction<{ id: number; quantidade: number }>
    ) => {
      const item = state.itens.find(
        (produto) => produto.produto.id === action.payload.id
      )

      if (!item) {
        return
      }

      if (action.payload.quantidade <= 0) {
        state.itens = state.itens.filter(
          (produto) => produto.produto.id !== action.payload.id
        )
        return
      }

      item.quantidade = action.payload.quantidade
    },
    clearCart: (state) => {
      state.itens = []
    }
  }
})

export const { addItem, removeItem, changeQuantity, clearCart } =
  cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.itens
export const selectTotalItems = (state: RootState) =>
  state.cart.itens.reduce((total, item) => total + item.quantidade, 0)
export const selectCartTotalValue = (state: RootState) =>
  state.cart.itens.reduce(
    (total, item) => total + item.produto.preco * item.quantidade,
    0
  )

export default cartSlice.reducer
