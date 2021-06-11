const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const form = document.querySelector('form.control');
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'scorpion',
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

const player2 = {
    player: 2,
    name: 'sonya',
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

function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(obj) {
    const $player = createElement('div', `player${obj.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = `${obj.hp}%`;

    $name.innerText = obj.name;

    $img.src = obj.img;

    $player.appendChild($progressbar);
    $player.appendChild($character);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);

    $arenas.appendChild($player);

    return $player;
}

function changeHP(num) {
    this.hp -= getRandom(num);

    if(this.hp <= 0) {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
}

function getRandom(num) {
    const random = Math.ceil(Math.random() * num);

    return random;
}

function playerWins(name) {
    const $winsTitle = createElement('div', 'loseTitle');

    if(name) {
        $winsTitle.innerText = `${name} wins`;
    } else {
        $winsTitle.innerText = 'draw';
    }

    return $winsTitle;
}

function createReloadButton() {
    const $wrapper = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');

    $button.innerText = 'Restart';
    $wrapper.appendChild($button);

    $arenas.appendChild($wrapper);

    $button.addEventListener('click', function() {
        window.location.reload();
    })
}

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

function playersAction(player, action){
    player.changeHP(getRandom(action.value));
    player.renderHP();
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const enemy = enemyAttack();
    const attack = {};

    for (let item of form) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if(item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    if(enemy.hit !== attack.defence) {
        playersAction(player2, enemy);
    }

    if(attack.hit !== enemy.defence) {
        playersAction(player1, attack);
    }

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }

});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));