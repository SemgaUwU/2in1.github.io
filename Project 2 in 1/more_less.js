let variant = document.querySelectorAll('.variant')
let easy = document.querySelector('.easy')
let midd = document.querySelector('.midd')
let hard = document.querySelector('.hard')


variant.forEach(element => {
    element.addEventListener('click', function(e) {

        let movesCount = 0

        let inp_ez = document.querySelectorAll('.ez')
        let inp_mid = document.querySelectorAll('.mid')
        let option = document.querySelector('.option')

        if (e.target.classList.contains('easy')) {
            movesCount = 10
            option.style.display = 'none'
        }

        if (e.target.classList.contains('midd')) {
            movesCount = 7
            inp_mid.forEach(el => el.style.display = 'none')
            option.style.display = 'none'
        }

        if (e.target.classList.contains('hard')) {
            movesCount = 5
            inp_ez.forEach(el => el.style.display = 'none')
            option.style.display = 'none'
        }


        let inputs = document.querySelectorAll(".guess-input")
        let moves = document.querySelector('.moves')
        

        

        if (moves) moves.textContent = movesCount
        let number = Math.floor(Math.random() * 100)

        inputs.forEach((input, index) => {
            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault() 

                    let userGuess = parseInt(input.value)

                    if (isNaN(userGuess)) {
                        alert("Введите число!")
                        return
                    }

                    movesCount--
                    moves.textContent = movesCount
                    
                    if (userGuess == number) {
                        input.type = "text"
                        input.value = `${userGuess} ⠀–⠀⠀Угадал!`
                        input.disabled = true

                        let numberElement = document.querySelector('.number')
                        if (numberElement) {
                            numberElement.textContent = number
                            document.querySelector('.number').textContent = number
                            numberElement.style.color = 'green'
                        }
                        
                        return
                    } 

                    if (userGuess < number) {
                        input.type = "text"
                        input.value = `${userGuess} ⠀–⠀⠀Больше`
                    } 
                    
                    else {
                        input.type = "text"
                        input.value = `${userGuess} ⠀–⠀ Меньше`
                    }
                    
                    let nextInput = inputs[index + 1]

                    if (nextInput) {
                        nextInput.disabled = false
                        nextInput.focus();          
                        input.disabled = true  
                    }
                    else {
                        input.disabled = true
                        
                    }

                    if (movesCount == 0 && userGuess != number) {
                        input.type = "text"
                        let numberElement = document.querySelector('.number')
                        if (numberElement) {
                            numberElement.textContent = number
                            document.querySelector('.number').textContent = number
                            numberElement.style.color = 'red'
                        }
                        input.disabled = true
                        return;
                    }

                }
            })
        })

        let exit = document.querySelector('.exit')
        exit.addEventListener('click', function() {
            window.location.href = 'file:///c%3A/Users/Semgaaa/.vscode/protdot/Project%202%20in%201/Index.html'
        })

    })

})
