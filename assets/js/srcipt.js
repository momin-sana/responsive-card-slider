let swiperCards = new Swiper(".card__content", {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,
  
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
  
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    autoplay: {
        delay: 5000,
        disableOnInteraction: false, // Keeps autoplay running after manual interactions
    },
  
    breakpoints: {
        600: {
            slidesPerView: 2,
        },
        968: {
            slidesPerView: 3,
        },
    },
});

const texts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const heading = [
    "Responsive",
    "Card Slider",
    "by SanaMomin"
];

const morphTimings = 1;
const cooldownTimings = 0.25;

let textIndex = heading.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTimings;

texts.text1.textContent = heading[textIndex % heading.length];
texts.text2.textContent = heading[(textIndex + 1) % heading.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTimings;

    if (fraction > 1) {
        cooldown = cooldownTimings;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    texts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    texts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    texts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    texts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    texts.text1.textContent = heading[textIndex % heading.length];
    texts.text2.textContent = heading[(textIndex + 1) % heading.length];
}

function doCooldown() {
    morph = 0;

    texts.text2.style.filter = "";
    texts.text2.style.opacity = "100%";

    texts.text1.style.filter = "";
    texts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();
