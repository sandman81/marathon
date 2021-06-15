import { getRandom } from './utils.js';

export function elHP() {
    return document.querySelector(`.player${this.player} .life`);
}

export function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
}

export function changeHP(num) {
    this.hp -= getRandom(num);

    if(this.hp <= 0) {
        this.hp = 0;
    }
}