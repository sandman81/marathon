import { player1, player2 } from './players.js';
import { $randomButton, $arenas } from './Common.js';
import { createReloadButton } from './createReloadButton.js';
import { generateLogs } from './generateLogs.js';
import { playerWins } from './playerWins.js';

export const showResult =  ({ hp: hp1 } = player1, { hp: hp2 } = player2) => {
    if (hp1 === 0 || hp2 === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if (hp1 === 0 && hp1 < hp2) {
        $arenas.appendChild(playerWins(player2.name));
        generateLogs('end', player2, player1);
    } else if (hp2 === 0 && hp2 < hp1) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2);
    } else if (hp1 === 0 && hp2 === 0) {
        $arenas.appendChild(playerWins());
    }
}