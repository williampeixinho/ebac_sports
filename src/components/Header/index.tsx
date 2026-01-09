import * as S from './styles'

import { CartItem } from '../../features/cart/cartSlice'
import { Produto } from '../../types/Produto'

import cesta from '../../assets/cesta.png'
import { paraReal } from '../Produto'

type Props = {
  itensNoCarrinho: CartItem[]
  favoritos: Produto[]
}

const Header = ({ itensNoCarrinho, favoritos }: Props) => {
  const quantidadeTotal = itensNoCarrinho.reduce((acc, item) => {
    acc += item.quantidade
    return acc
  }, 0)

  const valorTotal = itensNoCarrinho.reduce((acc, item) => {
    acc += item.produto.preco * item.quantidade
    return acc
  }, 0)

  return (
    <S.Header>
      <h1>EBAC Sports</h1>
      <div>
        <span>{favoritos.length} favoritos</span>
        <img src={cesta} />
        <span>
          {quantidadeTotal} itens, valor total: {paraReal(valorTotal)}
        </span>
      </div>
    </S.Header>
  )
}

export default Header
