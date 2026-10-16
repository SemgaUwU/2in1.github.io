let button1 = document.querySelector('.button1')
let button2 = document.querySelector('.button2')
 
let overlay = document.createElement('div')
overlay.className = 'transition'
document.body.appendChild(overlay)
 
function goTo(url, color, event) {
    overlay.style.background = color
    overlay.style.setProperty('--x', event.clientX + 'px')
    overlay.style.setProperty('--y', event.clientY + 'px')
    overlay.classList.add('active')
    setTimeout(function () {
        window.location.href = url
    }, 800)
}
 
button1.addEventListener('click', function (e) {
    document.querySelector('#bg-audio').play()
    goTo('more_less.html', '#f9eacd', e)
})
 
button2.addEventListener('click', function (e) {
    goTo('safe.html', '#c0b085', e)
})
 
window.addEventListener('pageshow', function () {
    overlay.classList.remove('active')
})
 

document.querySelectorAll('.digit').forEach(d => {
    d.addEventListener('click', () => {
        d.textContent = (Number(d.textContent) + 1) % 10;
    });
});