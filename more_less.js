const variants = document.querySelectorAll('.variant')
const option = document.querySelector('.option')
const restart = document.querySelector('.restart')
const exit = document.querySelector('.exit')
const movesEl = document.querySelector('.moves')
const numberEl = document.querySelector('.number')
const inputs = Array.from(document.querySelectorAll('.guess-input'))

const LEVELS = { easy: 10, midd: 7, hard: 5 }

let movesCount = 0
let number = 0
let playing = false
let activeInputs = []

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

function setMoves(n) {
    movesEl.textContent = n
    movesEl.classList.remove('pop')
    void movesEl.offsetWidth 
    movesEl.classList.add('pop')
}

function shake(el) {
    el.classList.remove('shake')
    void el.offsetWidth
    el.classList.add('shake')
}

function resetBoard() {
    inputs.forEach(input => {
        input.type = 'number'
        input.value = ''
        input.disabled = true
        input.className = 'guess-input'
        input.closest('p').classList.remove('off')
    })
    numberEl.textContent = '?'
    numberEl.className = 'number'
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

function endGame(win) {
    playing = false
    numberEl.textContent = number
    numberEl.classList.add('reveal', win ? 'win' : 'lose')
    if (win) confetti()
    setTimeout(() => restart.classList.add('show'), 500)
}

function startGame(level) {
    resetBoard()

    movesCount = LEVELS[level]
    number = Math.floor(Math.random() * 99) + 1 // от 1 до 99

    if (level === 'midd') document.querySelectorAll('.mid').forEach(el => el.classList.add('off'))
    if (level === 'hard') document.querySelectorAll('.ez').forEach(el => el.classList.add('off'))

    activeInputs = inputs.filter(i => !i.closest('p').classList.contains('off'))

    setMoves(movesCount)
    option.classList.add('hide')
    playing = true

    activeInputs[0].disabled = false
    setTimeout(() => activeInputs[0].focus(), 400)
}

variants.forEach(v => {
    v.addEventListener('click', () => {
        const level = Object.keys(LEVELS).find(k => v.classList.contains(k))
        startGame(level)
    })
})

inputs.forEach(input => {
    input.addEventListener('keydown', event => {
        if (event.key !== 'Enter' || !playing) return
        event.preventDefault()

        const userGuess = parseInt(input.value)

        if (isNaN(userGuess)) {
            shake(input)
            return
        }

        movesCount--
        setMoves(movesCount)

        input.type = 'text'
        input.disabled = true

        if (userGuess === number) {
            input.value = `${userGuess}  -  Угадал!`
            input.classList.add('win')
            endGame(true)
            return
        }

        if (userGuess < number) {
            input.value = `${userGuess}  -  Больше`
            input.classList.add('more')
        } else {
            input.value = `${userGuess}  -  Меньше`
            input.classList.add('less')
        }

        if (movesCount === 0) {
            endGame(false)
            return
        }

        const next = activeInputs[activeInputs.indexOf(input) + 1]
        if (next) {
            next.disabled = false
            next.focus()
        }
    })
})

restart.addEventListener('click', () => {
    restart.classList.remove('show')
    resetBoard()
    movesEl.textContent = ''
    option.classList.remove('hide')
    playing = false
})

resetBoard()