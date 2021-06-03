const scorpion = {
    name: 'scorpion',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knife', 'sword'],
    attack: function() {
        console.log(`${player1.name} Fight...`);
    }
}

const sonya = {
    name: 'sonya',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['gun', 'automate'],
    attack: function() {
        console.log(`${player2.name} Fight...`);
    }
}

function createPlayer(classPlayer, obj) {
    const $player1 = document.createElement('div');
    $player1.classList.add(classPlayer);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = `${obj.hp}%`;

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = obj.name;

    const $img = document.createElement('img');
    $img.src = obj.img;

    $player1.appendChild($progressbar);
    $player1.appendChild($character);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);

    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player1);
}

createPlayer('player1', scorpion);
createPlayer('player2', sonya);



