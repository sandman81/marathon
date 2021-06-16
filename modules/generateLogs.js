import { getRandom } from './utils.js';
import { player1, player2 } from './players.js';
import { logs } from './logs.js';

const $chat = document.querySelector('.chat');
const date = new Date();
const getHours = date.getHours();
const getMinutes = date.getMinutes();

export const generateLogs = (type, { name: namePlayer1 } = player1, { name: namePlayer2, hp } = player2, value) => {
    let text, el;

    switch(type) {
        case 'start':
            text = logs.start.replace('[player1]', namePlayer1).replace('[player2]', namePlayer2).replace('[time]', `${getHours}:${getMinutes}`);
            el = `<p>${text}</p>`;
            break;
        case 'hit':
            text = logs[type][getRandom(logs.hit.length) - 1].replace('[playerKick]', namePlayer1).replace('[playerDefence]', namePlayer2);
            el = `<p>${getHours}:${getMinutes} - ${text} -${value} [${hp}/100]</p>`;
            break;
        case 'defence':
            text = logs[type][getRandom(logs.defence.length) - 1].replace('[playerKick]', namePlayer1).replace('[playerDefence]', namePlayer2);
            el = `<p>${getHours}:${getMinutes} - ${text}</p>`;
            break;
        case 'end':
            text = logs[type][getRandom(logs.end.length) - 1].replace('[playerWins]', namePlayer1).replace('[playerLose]', namePlayer2);
            el = `<p>${text}</p>`;
            break;
    }
    $chat.insertAdjacentHTML('afterbegin', el);
}