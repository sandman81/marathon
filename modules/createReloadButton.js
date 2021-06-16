import { $arenas } from './Common.js';

export const createReloadButton = () => {
    const $wrapper = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');

    $button.innerText = 'Restart';
    $wrapper.appendChild($button);

    $arenas.appendChild($wrapper);

    $button.addEventListener('click', function() {
        window.location.reload();
    })
}