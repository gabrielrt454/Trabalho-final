/**
 * Lida com toda a comunicação com o servidor (API REST)
 * Versão falsa para testes
 */
async function lerInformacoes() {
  return [
    {
      id: 1,
      jogo:'baldurs gate 3',
      tecnologia: 'FSR 2.0',
      preset:'Desempenho' ,
      fps: 38
    },
    {
      id: 2,
      jogo:'Five Nights At Freddys',
      tecnologia: 'Nativo',
      preset:'nenhum' ,
      fps: 99
    },
    {
      id: 3,
      jogo:'My little poney',
      tecnologia: 'FSR 3.0 com frame generation',
      preset:'Ultra Desempenho' ,
      fps: 3
    }
  ]
}

async function adicionarProduto(produto) {
  return true
}

async function editarInformacao(produto) {
  return true
}

async function removerProduto(produto) {
  return true
}

module.exports = {
  lerInformacoes,
  adicionarProduto,
  editarInformacao,
  removerProduto
}