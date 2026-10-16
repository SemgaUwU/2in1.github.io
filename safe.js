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
const exit = document.querySelector('.exit')

// inline-стиль display:none из HTML мешает анимации — управляем кнопкой через класс
restartBtn.removeAttribute('style')

// ---------- Плавный переход между страницами ----------
const overlay = document.createElement('div')
overlay.className = 'transition'
document.body.appendChild(overlay)

function goTo(url, event) {
    overlay.style.setProperty('--x', event.clientX + 'px')
    overlay.style.setProperty('--y', event.clientY + 'px')
    overlay.classList.add('active')
    setTimeout(() => (window.location.href = url), 800)
}

window.addEventListener('pageshow', () => overlay.classList.remove('active'))
exit.addEventListener('click', e => goTo('index.html', e))

// ---------- Вспомогательные функции ----------
function restartAnim(el, cls) {
    el.classList.remove(cls)
    void el.offsetWidth
    el.classList.add(cls)
}

function setAttempts(n) {
    attemptsDisplay.textContent = n
    attemptsDisplay.classList.toggle('low', n <= 2)
    restartAnim(attemptsDisplay, 'pop')
}

function showMessage(text, type) {
    messageDisplay.textContent = text
    messageDisplay.className = 'message ' + (type || '')
}

function confetti() {
    const colors = ['#f8c630', '#e76f51', '#2a9d8f', '#e9c46a', '#9b5de5', '#00bbf9']
    for (let i = 0; i < 70; i++) {
        const c = document.createElement('div')
        c.className = 'confetti'
        c.style.left = Math.random() * 100 + 'vw'
        c.style.background = colors[i % colors.length]
        c.style.setProperty('--dx', Math.random() * 200 - 100 + 'px')
        c.style.animationDuration = 2 + Math.random() * 2 + 's'
        c.style.animationDelay = Math.random() * 0.5 + 's'
        document.body.appendChild(c)
        c.addEventListener('animationend', () => c.remove())
    }
}

// ---------- Игра ----------
function generateSecretCode() {
    const digits = Array.from({ length: 10 }, (_, i) => i)
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

    console.log('Загаданный код:', secretCode.join(''))

    secretDisplay.textContent = '? ? ? ?'
    secretDisplay.className = ''
    attemptsDisplay.textContent = attemptsLeft
    attemptsDisplay.classList.remove('low')
    historyPanel.innerHTML = ''
    showMessage('')
    userInput.value = ''
    userInput.disabled = false
    submitBtn.disabled = false
    restartBtn.classList.remove('show')
    userInput.focus()
}

function makeGuess() {
    const guessStr = userInput.value.trim()

    // ровно 4 цифры (раньше пропускались вещи вроде «1e10» и «1.50»)
    if (!/^\d{4}$/.test(guessStr)) {
        restartAnim(userInput, 'shake')
        showMessage('Введи четырёхзначное число!', 'error')
        return
    }

    showMessage('')

    const guessArray = guessStr.split('').map(Number)

    let onRightPlace = 0
    let wrongPlace = 0

    for (let i = 0; i < 4; i++) {
        if (guessArray[i] === secretCode[i]) {
            onRightPlace++
        } else if (secretCode.includes(guessArray[i])) {
            wrongPlace++
        }
    }

    attemptsLeft--
    setAttempts(attemptsLeft)

    const historyItem = document.createElement('div')
    historyItem.className = 'history-item'
    historyItem.innerHTML = `
        <span class="digits">${guessArray.map(d => `<b class="digit">${d}</b>`).join('')}</span>
        <span class="badges">
            <span class="badge good">На местах: ${onRightPlace}</span>
            <span class="badge warn">Не на месте: ${wrongPlace}</span>
        </span>
    `
    historyPanel.appendChild(historyItem)
    historyItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })

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
    secretDisplay.textContent = secretCode.join(' ')
    secretDisplay.classList.add('reveal', isWin ? 'win' : 'lose')

    if (isWin) {
        showMessage('🎉 Код взломан! Сейф открыт!', 'win')
        confetti()
    } else {
        showMessage('❌ Попытки закончились. Сейф заблокирован.', 'lose')
    }

    setTimeout(() => restartBtn.classList.add('show'), 500)
}

submitBtn.addEventListener('click', makeGuess)

userInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') makeGuess()
})

// В поле можно вводить только цифры
userInput.addEventListener('input', () => {
    userInput.value = userInput.value.replace(/\D/g, '')
})

restartBtn.addEventListener('click', initGame)

initGame()