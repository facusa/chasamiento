// Countdown Timer Logic
const countdown = () => {
    const targetDate = new Date('Oct 24, 2026 18:00:00');
    const now = new Date();
    const gap = targetDate.getTime() - now.getTime();

    // How the time works
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Calculate
    if (gap > 0) {
        let m = targetDate.getMonth() - now.getMonth() + (12 * (targetDate.getFullYear() - now.getFullYear()));
        let d = targetDate.getDate() - now.getDate();
        
        if (d < 0) {
            m -= 1;
            const daysInLastMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
            d += daysInLastMonth;
        }
        
        const hGap = targetDate.getHours() - now.getHours();
        const mGap = targetDate.getMinutes() - now.getMinutes();
        const sGap = targetDate.getSeconds() - now.getSeconds();
        
        if (hGap < 0 || (hGap === 0 && mGap < 0) || (hGap === 0 && mGap === 0 && sGap < 0)) {
            d -= 1;
            if (d < 0) {
                m -= 1;
                const daysInLastMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
                d += daysInLastMonth;
            }
        }
        
        const textMonth = m;
        const textDay = d;
        const textHour = Math.floor((gap % day) / hour);
        const textMinute = Math.floor((gap % hour) / minute);
        const textSecond = Math.floor((gap % minute) / second);

        document.getElementById('months').innerText = textMonth.toString().padStart(2, '0');
        document.getElementById('days').innerText = textDay.toString().padStart(2, '0');
        document.getElementById('hours').innerText = textHour.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = textMinute.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = textSecond.toString().padStart(2, '0');
    } else {
        document.getElementById('months').innerText = '00';
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
let isPlaying = true; // Assume autoplay starts

// Handle the case where browser blocks autoplay
bgMusic.addEventListener('play', () => {
    isPlaying = true;
    audioControl.classList.add('playing');
    audioControl.innerHTML = '<i class="fas fa-pause"></i>';
});

bgMusic.addEventListener('pause', () => {
    isPlaying = false;
    audioControl.classList.remove('playing');
    audioControl.innerHTML = '<i class="fas fa-music"></i>';
});

// Try playing on first interaction if autoplay was blocked
document.body.addEventListener('click', () => {
    if (bgMusic.paused && isPlaying) {
        bgMusic.play().catch(e => console.log("Audio play blocked by browser:", e));
    }
}, { once: true });

audioControl.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent body click handler from interfering
    if (isPlaying) {
        bgMusic.pause();
    } else {
        bgMusic.play();
    }
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
