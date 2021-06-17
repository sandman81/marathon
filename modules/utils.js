export const getRandom = (num) => Math.ceil(Math.random() * num);

export const getTime = () => {
    const date = new Date();

    return `${date.getHours()}:${date.getMinutes()}`;
}