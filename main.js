const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knife', 'sword'],
    attack: function() {
        console.log(`${player1.name} Fight...`);
    }
}

const player2 = {
    player: 2,
    name: 'sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['gun', 'automate'],
    attack: function() {
        console.log(`${player2.name} Fight...`);
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

function changeHP(player) {
    const $playerLife = document.querySelector(`.player${player.player} .life`);

    player.hp -= randomCount();

    if(player.hp <= 0) {
        player.hp = 0;
    }

    $playerLife.style.width = `${player.hp}%`;
}

function randomCount() {
    const random = Math.ceil(Math.random() * 20);

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

$randomButton.addEventListener('click', function (){
    changeHP(player1);
    changeHP(player2);

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }

})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));



