// Countdown Timer Logic
const countdown = () => {
    // Wedding Date: October 24, 2026
    const countDate = new Date('Oct 24, 2026 18:00:00').getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    // How the time works
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Calculate
    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    // Update HTML
    if (gap > 0) {
        document.getElementById('days').innerText = textDay.toString().padStart(2, '0');
        document.getElementById('hours').innerText = textHour.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = textMinute.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = textSecond.toString().padStart(2, '0');
    } else {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
    }
};

setInterval(countdown, 1000);

// Audio Player Logic
const audioControl = document.getElementById('audioControl');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

audioControl.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        audioControl.classList.remove('playing');
        audioControl.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgMusic.play();
        audioControl.classList.add('playing');
        audioControl.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Toggle Gifts Details
window.toggleGifts = () => {
    const details = document.getElementById('giftsDetails');
    details.classList.toggle('active');
};

// RSVP Form Submission
const rsvpForm = document.getElementById('rsvpForm');
rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    
    if(attendance === 'yes') {
        alert(`¡Gracias ${name}! Hemos registrado tu confirmación de asistencia. ¡Nos vemos en la fiesta!`);
    } else {
        alert(`Gracias ${name} por avisarnos. ¡Te vamos a extrañar!`);
    }
    
    rsvpForm.reset();
});

// Timeline Animation on Scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Start countdown immediately
    countdown();
    
    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});
