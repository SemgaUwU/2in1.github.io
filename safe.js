let secretCode = []
let attemptsLeft = 8
const maxAttempts = 8

const secretDisplay = document.getElementById('secret-display')
const attemptsDisplay = document.getElementById('attempts-left')
const historyPanel = document.getElementById('history-panel')
const userInput = document.getElementById('user-guess')
const submitBtn = document.getElementById('submit-btn')
const messageDisplay = document.getElementById('message')
const restartBtn = document.getElementById('restart-btn')

function generateSecretCode() {
    const digits = Array.from({length: 10}, (_, i) => i)
    const code = []
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length)
        code.push(digits[randomIndex])
        digits.splice(randomIndex, 1)
    }
    return code
}

function initGame() {
    secretCode = generateSecretCode()
    attemptsLeft = maxAttempts
    
    console.log("Загаданный код:", secretCode.join(''))

    secretDisplay.textContent = '? ? ? ?'
    attemptsDisplay.textContent = attemptsLeft
    historyPanel.innerHTML = ''
    messageDisplay.textContent = ''
    messageDisplay.style.color = '#1a1a1a'
    userInput.value = ''
    userInput.disabled = false
    submitBtn.disabled = false
    restartBtn.style.display = 'none'
}

function makeGuess() {
    const guessStr = userInput.value.trim()
    
    if (guessStr.length !== 4 || isNaN(guessStr)) {
        alert('Пожалуйста, введите четырёхзначное число.')
        return;
    }

    const guessArray = guessStr.split('').map(Number)
    
    let onRightPlace = 0
    let wrongPlace = 0

    for (let i = 0; i < 4; i++) {
        if (guessArray[i] === secretCode[i]) {
            onRightPlace++;
        } else if (secretCode.includes(guessArray[i])) {
            wrongPlace++;
        }
    }

    attemptsLeft--
    attemptsDisplay.textContent = attemptsLeft

    const historyItem = document.createElement('div')
    historyItem.className = 'history-item'
    historyItem.innerHTML = `
        <span><strong>${guessStr}</strong></span>
        <span>На местах: ${onRightPlace} | Не на месте: ${wrongPlace}</span>
    `
    historyPanel.appendChild(historyItem)

    userInput.value = ''
    userInput.focus()

    if (onRightPlace === 4) {
        endGame(true)
    } else if (attemptsLeft === 0) {
        endGame(false)
    }
}

function endGame(isWin) {
    userInput.disabled = true
    submitBtn.disabled = true
    restartBtn.style.display = 'block'
    secretDisplay.textContent = secretCode.join(' ')

    if (isWin) {
        messageDisplay.textContent = '🎉 Код взломан! Сейф открыт!'
        messageDisplay.style.color = 'green'
    } else {
        messageDisplay.textContent = '❌ Попытки закончились. Сейф заблокирован.'
        messageDisplay.style.color = 'red'
    }
}

submitBtn.addEventListener('click', makeGuess)

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        makeGuess();
    }
});

let exit = document.querySelector('.exit')
exit.addEventListener('click', function() {
    window.location.href = 'file:///c%3A/Users/Semgaaa/.vscode/protdot/Project%202%20in%201/Index.html'
})

restartBtn.addEventListener('click', initGame)

initGame()

