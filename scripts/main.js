import {isFormOpen, isMenuOpen} from './helpers.js';

const windowInnerWidth = window.innerWidth;
const navigation = {
    openBtn: document.querySelector('#open-menu-btn'),
    closeBtn: document.querySelector('#close-menu-btn'),
    menu: document.querySelector('nav ul'),
    navList: document.querySelectorAll('nav ul li a'),
}
const slideBar = {
    slides: document.querySelectorAll('.slide'),
    prevBtn: document.querySelector('.arrow.left'),
    nextBtn: document.querySelector('.arrow.right'),
}

const form = {
    formContainer: document.querySelector('#form-section'),
    openBtn: document.querySelector('#open-form'),
    closeBtn: document.querySelector('#close-form'),
}

//region NAVIGATION
navigation.openBtn.addEventListener('click', () => isMenuOpen(true, navigation))

navigation.closeBtn.addEventListener('click', () => isMenuOpen(false, navigation))


 console.log(windowInnerWidth)
if (windowInnerWidth < 1200) {
    navigation.navList.forEach(navEl => {
        navEl.addEventListener('click', () => isMenuOpen(false, navigation))
    })
}

//endregion

//region SLIDE_BAR
let currentSlide = 0;

const showSlide = (index) => {
    slideBar.slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
};

const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slideBar.slides.length;
    showSlide(currentSlide);
};

const prevSlide = () => {
    currentSlide = (currentSlide - 1 + slideBar.slides.length) % slideBar.slides.length;
    showSlide(currentSlide);
};

slideBar.prevBtn.addEventListener('click', prevSlide);
slideBar.nextBtn.addEventListener('click', nextSlide);

//endregion

form.openBtn.addEventListener('click', () => isFormOpen(true, form));
form.closeBtn.addEventListener('click', () => isFormOpen(false, form));