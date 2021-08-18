// Dados iniciais
let square = {
  //Mapeando todos os quadrados do tabuleiro
  a1: '',
  a2: '',
  a3: '',
  b1: '',
  b2: '',
  b3: '',
  c1: '',
  c2: '',
  c3: ''
}

let playing = false //Criando variavel para o jogo
let vez = 'x' //Variavel inicializando com um jogador
let warning = '' //Variavel de aviso de vitória ou empate

reset() //Função para reiniciar o jogo

// Eventos
document.querySelector('.reset').addEventListener('click', reset)

document.querySelectorAll('.item').forEach(item => {
  //Selecionando todos os itens do quadrado
  item.addEventListener('click', e => {
    //Add click em todos os quadrados
    let loc = e.target.getAttribute('data-item') //Verificando qual quadrado foi clicado dos que tem data-item

    if (playing && square[loc] === '') {
      //Verificando se o jogo está rolando e se o quadrado na posição está vazio
      square[loc] = vez //A posição do quadrado recebendo o jogador da vez
      renderSquare() //Função que mostra o quadrado
      togglePlayer() //Função que alterna os jogadores
    }
  })
})

// Funções
function reset() {
  //Função que reinicia o jogo
  warning = ''

  //Defini a vez de forma aleatória do jogador
  let random = Math.floor(Math.random() * 2)
  vez = random === 0 ? 'x' : 'o'

  //Limpando os quadrados
  for (let i in square) {
    square[i] = ''
  }

  //Mostrar tudo
  renderSquare()
  renderInfo()

  playing = true //Indicação que o jogo está acontecendo
}

function renderSquare() {
  for (let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`) //Selecionando todos os quadrados na posição i
    if (square[i] !== '') {
      //Se a posição tiver vazia
      item.innerHTML = square[i] //Preenchemos
    } else {
      item.innerHTML = ''
    }
  }

  checkGame() //Função para verificar se houve vencedores e se o jogo continua
}

function renderInfo() {
  document.querySelector('.vez').innerHTML = vez //Recebe o jogador
  document.querySelector('.resultado').innerHTML = warning //Recebe as infomações
}

function togglePlayer() {
  //Função para definir a vez do jogador
  vez = vez === 'x' ? 'o' : 'x'
  renderInfo() //Mostra as informações de qual jogador tem a vez
}

function checkGame() {
  if (checkWinnerFor('x')) {
    warning = 'O "x" venceu'
    playing = false //Para o jogo, não dá para preencher os quadrados
  } else if (checkWinnerFor('o')) {
    warning = 'O "o" venceu'
    playing = false
  } else if (isFull()) {
    warning = 'Deu empate'
    playing = false
  }
}

function checkWinnerFor(i) {
  let pos = [
    //Possibilidades de vitórias na horizontal, vertical e diagonal
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'a3,b2,c1'
  ]

  for (let w in pos) {
    let pArray = pos[w].split(',') //Varrendo array e separando por , ficando assim a1,a2,a3 e etc
    let hasWon = pArray.every(option => square[option] === i) //Verificação, se houver o preenchimento do i, ou seja x ou o nas posições de vitória horizontal, vertical e diagonal retornamos true para checkGame
    if (hasWon) return true
  }

  return false
}
function isFull() {
  for (let i in square) {
    if (square[i] === '') {
      //Se tiver algum quadrado vazio retorna falso, logo não teve empate
      return false
    }
  }
  return true
}
