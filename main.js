import { $arenas, $form } from './modules/Common.js';
import { player1, player2 } from './modules/players.js';
import { enemyAttack, playerAttack } from './modules/attacks.js';
import { createPlayer } from './modules/createPlayer.js';
import { generateLogs } from './modules/generateLogs.js';
import { showResult } from './modules/showResult.js';

$form.addEventListener('submit', (e) => {
    e.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    } else {
        generateLogs('defence', player2, player1);
    }

    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, player.value);
    } else {
        generateLogs('defence', player1, player2);
    }

    showResult(player1, player2);

});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

generateLogs('start', player1, player2);