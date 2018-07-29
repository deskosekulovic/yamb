let data = JSON.parse(localStorage.getItem('data')) || {};

export const saveData = (name, points) => {
    data = {...data, [points]:name};
    localStorage.setItem('data', JSON.stringify(data));
};
