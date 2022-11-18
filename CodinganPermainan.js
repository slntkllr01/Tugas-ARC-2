// PERMAINAN

let skorpemain = 0
let skorbot = 0
let pemenang = ''

function main(pemain, bot) {
  if (pemain === bot) {
    pemenang = 'seri'
  }
  if (
    (pemain === 'BATU' && bot === 'GUNTING') ||
    (pemain === 'GUNTING' && bot === 'KERTAS') ||
    (pemain === 'KERTAS' && bot === 'BATU')
  ) {
    skorpemain++
    pemenang = 'pemain'
  }
  if (
    (bot === 'BATU' && pemain === 'GUNTING') ||
    (bot === 'GUNTING' && pemain === 'KERTAS') ||
    (bot === 'KERTAS' && pemain === 'BATU')
  ) {
    skorbot++
    pemenang = 'bot'
  }
  updatepesanskor(pemenang, pemain, bot)
}

function pilihanacak() {
  let nomoracak = Math.floor(Math.random() * 3)
  switch (nomoracak) {
    case 0:
      return 'BATU'
    case 1:
      return 'KERTAS'
    case 2:
      return 'GUNTING'
  }
}

function gameover() {
  return skorpemain === 5 || skorbot === 5
}

// UI

const infoskor = document.getElementById('infoskor')
const pesanskor = document.getElementById('pesanskor')
const skorpemainPara = document.getElementById('skorpemain')
const skorbotPara = document.getElementById('skorbot')
const pilihanpemain = document.getElementById('pilihanpemain')
const pilihanbot = document.getElementById('pilihanbot')
const rockBtn = document.getElementById('rockBtn')
const paperBtn = document.getElementById('paperBtn')
const scissorsBtn = document.getElementById('scissorsBtn')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

rockBtn.addEventListener('click', () => handleClick('BATU'))
paperBtn.addEventListener('click', () => handleClick('KERTAS'))
scissorsBtn.addEventListener('click', () => handleClick('GUNTING'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(pemain) {
  if (gameover()) {
    openEndgameModal()
    return
  }

  const bot = pilihanacak()
  main(pemain, bot)
  updateChoices(pemain, bot)
  updateScore()

  if (gameover()) {
    openEndgameModal()
    setFinalMessage()
  }
}

function updateChoices(pemain, bot) {
  switch (pemain) {
    case 'BATU':
      pilihanpemain.textContent = '✊'
      break
    case 'KERTAS':
      pilihanpemain.textContent = '✋'
      break
    case 'GUNTING':
      pilihanpemain.textContent = '✌'
      break
  }

  switch (bot) {
    case 'BATU':
      pilihanbot.textContent = '✊'
      break
    case 'KERTAS':
      pilihanbot.textContent = '✋'
      break
    case 'GUNTING':
      pilihanbot.textContent = '✌'
      break
  }
}

function updateScore() {
  if (pemenang === 'seri') {
    infoskor.textContent = "Seri!"
  } else if (pemenang === 'pemain') {
    infoskor.textContent = 'Selamat, Kamu menang !'
  } else if (pemenang === 'bot') {
    infoskor.textContent = 'Maaf, kamu kalah! silakan coba lagi'
  }

  skorpemainPara.textContent = `Pemain : ${skorpemain}`
  skorbotPara.textContent = `Bot : ${skorbot}`
}

function updatepesanskor(menang, pemain, bot) {
  if (menang === 'pemain') {
    pesanskor.textContent = `${capitalizeFirstLetter(
      pemain
    )} mengalahkan ${bot.toLowerCase()}`
    return
  }
  if (menang === 'bot') {
    pesanskor.textContent = `${capitalizeFirstLetter(
      pemain
    )} dikalahkan oleh ${bot.toLowerCase()}`
    return
  }

  pesanskor.textContent = `${capitalizeFirstLetter(
    pemain
  )} seri dengan ${bot.toLowerCase()}`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function openEndgameModal() {
  endgameModal.classList.add('active')
  overlay.classList.add('active')
}

function closeEndgameModal() {
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}

function setFinalMessage() {
  return skorpemain > skorbot
    ? (endgameMsg.textContent = 'Kamu Menang !')
    : (endgameMsg.textContent = 'Kamu Kalah !')
}

function restartGame() {
  skorpemain = 0
  skorbot = 0
  infoskor.textContent = 'Tentukan Pilihan Anda !'
  pesanskor.textContent = 'Peraih 5 poin pertama akan menang'
  skorpemainPara.textContent = 'Pemain : 0'
  skorbotPara.textContent = 'bot : 0'
  pilihanpemain.textContent = '❔'
  pilihanbot.textContent = '❔'
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}
