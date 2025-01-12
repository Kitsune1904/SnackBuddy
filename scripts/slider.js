/**
 * Slider on page
 * @type {HTMLDivElement}
 */
const slider = document.querySelector('.slider');
/**
 * Holder of all feedback items
 * @type {HTMLDivElement}
 */
export const sliderContent = document.querySelector('.slider-content');

const backBtn = document.querySelector('.left');
const nextBtn = document.querySelector('.right');

/**
 * Statical setup updated only on resize
 * @type {{screenWidth: number, slidesPerScreen: number, slidePaddingWidth: number, slidesCount: number}}
 */
const s = {
    screenWidth: 0,
    slidesPerScreen: 1,
    slidePaddingWidth: 0,
    slidesCount: sliderContent.children.length,
}

/**
 * Temporary memory for current state
 * @type {{tempX: number, tempSlide: number, pressed: boolean, intervalId: number}}
 */
const t = {
    tempX: 0,
    tempSlide: 0,
    pressed: false,
    intervalId: undefined
}

/**
 * In every 3 sec initialize autoscroll to next slide
 */
function carouselAutoScroll(){
    t.intervalId = setInterval(() => {
        changeSlide(t.tempSlide + 1);
    }, 3000);
}

/**
 * On click or touch event of slide it declare start of movement by X axis, press action, change transition and
 * removes interval
 * @param x {number} current X coordinate of pointer
 */
function onPointerStart(x){
    t.tempX = x;
    t.pressed = true;
    sliderContent.style.transition = 'unset'
    clearInterval(t.intervalId);
}

/**
 * If slide was pressed - declare direction of movement by X axis, disable extra-movements, defined left margin
 * for slider
 * @param x {number} current X coordinate of pointer
 */
function onPointerMove(x){
    if(!t.pressed)
        return;
    //define additional margin from user movement
    const styles = window.getComputedStyle(sliderContent);
    let siding = -(t.tempX - x) + parseInt(styles.marginLeft, 10);
    siding = Math.min(siding, 0);
    siding = Math.max(siding, (s.slidesCount - 1) * s.slidePaddingWidth * -1);
    sliderContent.style.marginLeft = `${siding}px`;
    t.tempX = x;
}

/**
 * If movement NOT on touchscreen - call onPointerMove, else - define pressed false,
 * reset X axis movement, change animation for sliderContent, makes auto flip on slide by chosen direction, setTimer after finish movement.
 * @param x {number | null} current X coordinate of pointer
 */
function onPointerEnd(x){
    if(x != null)
        onPointerMove(x);
    t.pressed = false;
    t.tempX = 0;

    //define nearest slide in slider
    let target = 0;
    const styles = window.getComputedStyle(sliderContent);
    while (target < s.slidesCount && s.slidePaddingWidth * (target + 0.5) < Math.abs(parseInt(styles.marginLeft, 10))){
        target = target + 1;
    }

    //return auto scroll
    sliderContent.style.transition = 'margin-left 0.25s ease-out';
    changeSlide(target);
    carouselAutoScroll();
}

/**
 * Helps to define how will show slides, depends on screen width
 */
function initWithSize(){
    const currentWidth = document.body.clientWidth;
    if(currentWidth >= 1152) {
        s.screenWidth = 80
        s.slidesPerScreen = 2
        s.slidePaddingWidth = (window.innerWidth * 0.8 + 32);
    }
    else if(currentWidth >= 768) {
        s.screenWidth = 60
        s.slidesPerScreen = 1
        s.slidePaddingWidth = (window.innerWidth * 0.6 + 16);
    }
    else {
        s.screenWidth = 80
        s.slidesPerScreen = 1
        s.slidePaddingWidth = (window.innerWidth * 0.8 + 16);
    }
    changeSlide(t.tempSlide);
}

/**
 * If assumed index smaller than 0 or bigger than count of slides - index will reset
 * to 0, else - define left margin to slider container, and define current slide index
 * @param targetIndex {number} assumed index of current shown slide
 */
function changeSlide(targetIndex) {
    if(targetIndex < 0)
        targetIndex = 0
    if (targetIndex >= sliderContent.children.length / s.slidesPerScreen)
        targetIndex = 0;
    sliderContent.style.marginLeft = `calc(-${targetIndex * s.screenWidth}vw - ${targetIndex * s.slidesPerScreen}rem)`;
    t.tempSlide = targetIndex;
}

/**
 * Invoke this after loading all feedback from server. Method will initialize event listeners on slider component for TOUCH and MOUSE devices AND initialize resize listener for fitting slider to new screen width
 * @param slidesCount {number} count of feedbacks
 */
export function initWithSlides(slidesCount){
    s.slidesCount = slidesCount;
    window.addEventListener('resize', () => initWithSize());

    backBtn.addEventListener('click', () => changeSlide(t.tempSlide - 1));
    nextBtn.addEventListener('click', () => changeSlide(t.tempSlide + 1));

    slider.addEventListener('touchstart', (event) => onPointerStart(event.touches[0].pageX));
    slider.addEventListener('touchmove', (event) => onPointerMove(event.touches[0].pageX))
    slider.addEventListener('touchcancel', () => onPointerEnd(null))
    slider.addEventListener('touchend', () => onPointerEnd(null));

    slider.addEventListener('mousedown', (event) => onPointerStart(event.clientX));
    slider.addEventListener('mousemove', (event) => onPointerMove(event.clientX))
    slider.addEventListener('mouseup', (event) => onPointerEnd(event.clientX))
    initWithSize();
    carouselAutoScroll();
}
