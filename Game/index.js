import Player from '../Player/index.js';
import { getRandom, getTime } from '../modules/utils.js';
import { $form, $randomButton, $arenas, $chat } from '../modules/Common.js';
import { HIT, ATTACK } from '../modules/constants.js';
import { LOGS } from '../modules/logs.js';
import { createElement } from '../modules/createElement.js';

class Game {
    constructor() {
        this.player1 = new Player ({
            player: 1,
            name: 'Scorpion',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
            rootSelector: 'arenas'
        });
        this.player2 = new Player ({
            player: 2,
            name: 'Sonya',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
            rootSelector: 'arenas'
        });
    }

   start = () => {
        this.player1.createPlayer();
        this.player2.createPlayer();

        this.generateLogs('start', this.player1, this.player2);
   }

   enemyAttack = () => {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];

        return {
            value: getRandom(HIT[hit]),
            hit,
            defence
        }
   }

    playerAttack = () => {
        const attack = {};

        for (let item of $form) {
            if (item.checked && item.name === 'hit') {
                attack.value = getRandom(HIT[item.value]);
                attack.hit = item.value;
            }

            if(item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }

            item.checked = false;
        }

        return attack;
    }

    getTextLog = (type, playerName1, playerName2) => {
        switch (type) {
            case 'start':
                return LOGS[type]
                    .replace('[player1]', playerName1)
                    .replace('[player2]', playerName2)
                    .replace('[time]', getTime());
                break;
            case 'hit':
                return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
                    .replace('[playerKick]', playerName1)
                    .replace('[playerDefence]', playerName2)
                break;
            case 'defence':
                return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
                    .replace('[playerKick]', playerName1)
                    .replace('[playerDefence]', playerName2)
                break;
            case 'end':
                return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
                    .replace('[playerWins]', playerName1)
                    .replace('[playerLose]', playerName2)
                break;
            case 'draw':
                return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
                break;
        }
    }

    generateLogs = (type, { name } = {}, { name: playerName2, hp } = {}, valueAttack) => {
        let text = this.getTextLog(type, name, playerName2);
        switch (type) {
            case 'hit':
                text = `${getTime()} ${text} -${valueAttack} [${hp}/100]`;
                break;
            case 'defence':
            case 'end':
            case 'draw':
                text = `${getTime()} ${text}`;
                break;
        }
        const el = `<p>${text}</p>`

        $chat.insertAdjacentHTML('afterbegin', el);
    }

    playerWins = (name) => {
        const $winsTitle = createElement('div', 'loseTitle');

        if(name) {
            $winsTitle.innerText = `${name} wins`;
        } else {
            $winsTitle.innerText = 'draw';
        }

        return $winsTitle;
    }

    createReloadButton = () => {
        const $wrapper = createElement('div', 'reloadWrap');
        const $button = createElement('button', 'button');

        $button.innerText = 'Restart';
        $wrapper.appendChild($button);

        $arenas.appendChild($wrapper);

        $button.addEventListener('click', function() {
            window.location.reload();
        })
    }

    showResult =  ({ hp: hp1 } = player1, { hp: hp2 } = player2) => {
        if (hp1 === 0 || hp2 === 0) {
            $randomButton.disabled = true;
            this.createReloadButton();
        }

        if (hp1 === 0 && hp1 < hp2) {
            $arenas.appendChild(this.playerWins(this.player2.name));
            this.generateLogs('end', this.player2, this.player1);
        } else if (hp2 === 0 && hp2 < hp1) {
            $arenas.appendChild(this.playerWins(player1.name));
            this.generateLogs('end', this.player1, this.player2);
        } else if (hp1 === 0 && hp2 === 0) {
            $arenas.appendChild(this.playerWins());
            this.generateLogs('draw', this.player1, this.player2);
        }
    }

    submitForm = () => {
        $form.addEventListener('submit', (e) => {
            e.preventDefault();

            const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy } = this.enemyAttack();
            const { hit, defence, value } = this.playerAttack();

            if (defence !== hitEnemy) {
                this.player1.changeHP(valueEnemy);
                this.player1.renderHP();
                this.generateLogs('hit', this.player2, this.player1, valueEnemy);
            } else {
                this.generateLogs('defence', this.player2, this.player1);
            }

            if (defenceEnemy !== hit) {
                this.player2.changeHP(value);
                this.player2.renderHP();
                this.generateLogs('hit', this.player1, this.player2, value);
            } else {
                this.generateLogs('defence', this.player1, this.player2);
            }

            this.showResult(this.player1, this.player2);

        });

    }

}

export default Game;