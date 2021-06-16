export const playerWins = (name) => {
    const $winsTitle = createElement('div', 'loseTitle');

    if(name) {
        $winsTitle.innerText = `${name} wins`;
    } else {
        $winsTitle.innerText = 'draw';
    }

    return $winsTitle;
}