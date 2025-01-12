import {initWithSlides, sliderContent} from "./slider.js";
import {catalogue} from "./main.js";

/**
 * Structure of item in catalogue array from server response
 * @typedef {{image: string, src: string, name: string, description: string, cost: number, href: string}} CatalogueItem
 */

/**
 * Render items from server by filling up specific template
 * @param items {CatalogueItem[]} array of items in catalogue
 */
function renderCatalogue(items){
    const template = document.querySelector('#catalogue-template');
    items.forEach(item => {
        const card = template.content.cloneNode(true);
        card.querySelector('img').setAttribute('src', `assets/images/products/${item['image']}`);
        card.querySelector('img').setAttribute('alt', item['name']);
        card.querySelector('h3').innerText = item['name'];
        card.querySelector('p').innerText = item['description'];
        card.querySelector('span').innerText = `Ціна: ${item['cost']}грн.`;
        card.querySelector('a').setAttribute('href', item['url']);
        catalogue.append(card)
    })
}

/**
 * Structure of item in feedback array from server response
 * @typedef {Object} FeedBackItem
 * @property {string} url name of file with user photo, without path
 * @property {string} userName name of user
 * @property {string} city name of user city
 * @property {string} text users comment
 * @property {string | Date} posted date in which user was made comment
 */

/**
 * Render items from server by filling up specific template
 * @param items {FeedBackItem[]}
 */
function renderFeedback(items){
    const template = document.querySelector('#feedback-template');
    const formatter = new Intl.DateTimeFormat('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    items.forEach(item => {
        const date = new Date(item["posted"]);
        const card = template.content.cloneNode(true);
        card.querySelector('img').setAttribute('src', `assets/images/icons/${item['url']}`);
        card.querySelector('blockquote').innerText = item['text'];
        card.querySelector('span').innerText = formatter.format(date);
        card.querySelector('figcaption').innerText = `${item["userName"]}, ${item["city"]}`
        sliderContent.append(card);
    })
}

/**
 * Render all dynamic entries from server response
 * @param data {{catalogue: CatalogueItem[], feedback: FeedBackItem[]}} parsed JSON from server
 */
function renderDynamic(data) {
    renderCatalogue(data['catalogue']);
    renderFeedback(data['feedback']);
}


/**
 * Invoke this after finishing all main callbacks to retrieve actual data from server
 */
export function start() {
    fetch('assets/db_emul.json', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
    })
        .then(res => {
            res.json()
                .then((data) => {
                    renderDynamic(data)
                    initWithSlides(data['feedback'].length);
                })
                .catch(err => console.error(err))
        })
        .catch(err2 => console.error(err2))
}


