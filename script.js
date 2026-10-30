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
        d.textContent = (Number(d.textContent) + 1) % 10
    })
})



const safe = document.querySelector('.safe');
const panel = document.querySelector('.two');

if (safe && panel) {
    const maxTilt = 20;

    panel.addEventListener('mousemove', (e) => {
        const safeRect = safe.getBoundingClientRect();
        const panelRect = panel.getBoundingClientRect();

        const centerX = safeRect.left + safeRect.width / 2;
        const centerY = safeRect.top + safeRect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        const normalizedX = deltaX / (panelRect.width / 2);
        const normalizedY = deltaY / (panelRect.height / 2);

        const tiltY = Math.max(
            -maxTilt,
            Math.min(maxTilt, normalizedX * maxTilt)
        );

        const tiltX = Math.max(
            -maxTilt,
            Math.min(maxTilt, -normalizedY * maxTilt)
        );

        safe.style.transform =
            `translateZ(0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
    });

    panel.addEventListener('mouseleave', () => {
        safe.style.transform =
            'translateZ(0) rotateX(0deg) rotateY(0deg) scale(1)';
    });
}