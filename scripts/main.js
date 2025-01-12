import {start} from './loader.js'

//region Navigation
/**
 * Navigation elements
 * @type {{openBtn: HTMLImageElement, closeBtn: HTMLImageElement, menu: HTMLUListElement, navList: NodeList<HTMLAnchorElement>}}
 */
const navigation = {
    openBtn: document.querySelector('#open-menu-btn'),
    closeBtn: document.querySelector('#close-menu-btn'),
    menu: document.querySelector('nav ul'),
    navList: document.querySelectorAll('nav ul li a'),
}

/**
 * Handling click on menu buttons
 * @param isOpen {boolean} detect if menu will be opened
 */
const isMenuOpen = (isOpen) => {
    if (isOpen) {
        navigation.menu.style.display = 'flex';
        navigation.closeBtn.style.display = 'block';
        navigation.openBtn.style.display = 'none';
    }
    else if(window.innerWidth < 1200) {
        navigation.menu.style.display = 'none';
        navigation.closeBtn.style.display = 'none';
        navigation.openBtn.style.display = 'block';
    }
}

navigation.openBtn.addEventListener('click', () => isMenuOpen(true))
navigation.closeBtn.addEventListener('click', () => isMenuOpen(false))
//endregion

//region Contact form
/**
 * Form interaction elements
 * @type {{formContainer: HTMLElement, openBtn: HTMLButtonElement, closeBtn: HTMLImageElement}}
 */
const form = {
    formContainer: document.querySelector('#form-section'),
    openBtn: document.querySelector('#open-form'),
    closeBtn: document.querySelector('#close-form'),
}

/**
 * Handling click on form buttons
 * @param isOpen {boolean} detect if form will be opened
 */
const isFormOpen = (isOpen) => {
    if (isOpen) {
        form.formContainer.style.display = 'flex';
    } else {
        form.formContainer.style.display = 'none';
    }
}

form.openBtn.addEventListener('click', () => isFormOpen(true));
form.closeBtn.addEventListener('click', () => isFormOpen(false));
//endregion

/**
 * Holder of all catalogue items
 * @type {HTMLDivElement}
 */
export const catalogue = document.querySelector('.catalogue-cards');

function onResize() {
    navigation.closeBtn.style.display = 'none';
    if (window.innerWidth < 1200) {
        navigation.navList.forEach(navEl => {
            navEl.addEventListener('click', () => isMenuOpen(false))
        })
        navigation.openBtn.style.display = 'block';
        navigation.menu.style.display = 'none';
    }
    else {
        navigation.openBtn.style.display = 'none';
        navigation.menu.style.display = 'flex';
    }
}

window.addEventListener('resize', onResize)

onResize();

start();
