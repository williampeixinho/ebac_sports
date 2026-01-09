import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Produto } from '../../types/Produto'

type FavoritesState = {
  itens: Produto[]
}

const initialState: FavoritesState = {
  itens: []
}

const favoritesSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    alternarFavorito: (state, action: PayloadAction<Produto>) => {
      const jaFavorito = state.itens.some(
        (produto) => produto.id === action.payload.id
      )

      if (jaFavorito) {
        state.itens = state.itens.filter(
          (produto) => produto.id !== action.payload.id
        )
      } else {
        state.itens.push(action.payload)
      }
    }
  }
})

export const { alternarFavorito } = favoritesSlice.actions
export default favoritesSlice.reducer
