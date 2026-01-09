import Header from './components/Header'
import Produtos from './containers/Produtos'

import { useDispatch, useSelector } from 'react-redux'

import { useGetProdutosQuery } from './services/api'
import { AppDispatch, RootState } from './store'
import { addItem, selectCartItems } from './features/cart/cartSlice'
import { alternarFavorito } from './store/slices/favoritesSlice'
import { Produto } from './types/Produto'

import { GlobalStyle } from './styles'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const carrinho = useSelector((state: RootState) => selectCartItems(state))
  const favoritos = useSelector((state: RootState) => state.favoritos.itens)
  const { data: produtos = [] } = useGetProdutosQuery()

  function adicionarProdutoAoCarrinho(produto: Produto) {
    const jaAdicionado = carrinho.some((item) => item.produto.id === produto.id)

    if (jaAdicionado) {
      alert('Item já adicionado')
      return
    }

    dispatch(addItem(produto))
  }

  function favoritar(produto: Produto) {
    dispatch(alternarFavorito(produto))
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarProdutoAoCarrinho}
        />
      </div>
    </>
  )
}

export default App
