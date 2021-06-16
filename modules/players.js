import { changeHP, elHP, renderHP } from './changeHP.js';

export const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knife', 'sword'],
    changeHP,
    elHP,
    renderHP,
    attack: function() {
        console.log(`${this.name} Fight...`);
    }
}

export const player2 = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['gun', 'automate'],
    changeHP,
    elHP,
    renderHP,
    attack: function() {
        console.log(`${this.name} Fight...`);
    }
}