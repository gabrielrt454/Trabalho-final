/**
 * Lida com toda a comunicação com o servidor (API REST)
 */
async function lerJogo() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/jogo')
    return await response.json()
  } catch (error) {
    console.log(error)
    return false
  }
}

async function lerTecnologias() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/tecnologias')
    return await response.json()
  } catch (error) {
    console.log(error)
    return false
  }
} 

async function adicionarJogo(jogos) { /** Adcicionei o export */
  try {
    console.log(jogos);
    const response = await fetch('http://127.0.0.1:8000/api/jogo/criar', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: jogos.nome, //
        tecnologia_id: jogos.tecnologia_id,
        preset: jogos.preset,
        fps: jogos.fps
      })
    })

    return response.status == 201
  } catch (error) {
    console.log(error)
    return false
  }
}

async function editarJogo(jogos) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/jogo/' + jogos.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: jogos.nome, //
        tecnologia_id: jogos.tecnologia_id,
        preset: jogos.preset,
        fps: jogos.fps
      })
    })

    return response.status == 201
  } catch (error) {
    console.log(error)
    return false
  }
}

async function removerJogo(jogos) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/jogo/delete/' + jogos.id, {
      method: 'DELETE'
    })

    return response.status == 204
  } catch (error) {
    //console.log(error)
    return false
  }
}

module.exports = {
  lerJogo,
  adicionarJogo,
  editarJogo,
  removerJogo,
  lerTecnologias
}