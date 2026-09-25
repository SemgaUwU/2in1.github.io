let button1 = document.querySelector('.button1')
let button2 = document.querySelector('.button2')

button1.addEventListener('click', function() {
    document.querySelector('#bg-audio').play()
    window.location.href = 'file:///c%3A/Users/Semgaaa/.vscode/protdot/Project%202%20in%201/more_less.html'
})

button2.addEventListener('click', function() {
    window.location.href = 'file:///c%3A/Users/Semgaaa/.vscode/protdot/Project%202%20in%201/safe.html'
})

button1.addEventListener('mouseover', function() {
    button1.style.backgroundColor = '#f8e0af'
})
button1.addEventListener('mouseout', function() {
    button1.style.backgroundColor = '#f9eacd'
})


button2.addEventListener('mouseover', function() {
    button2.style.backgroundColor = '#aca287'
})
button2.addEventListener('mouseout', function() {
    button2.style.backgroundColor = '#c0b085'
})