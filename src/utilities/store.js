let data = JSON.parse(localStorage.getItem('data')) || {};

export const saveData = (name, points, numberOfDice, numberOfColumns) => {
    const columns = ((data || {})[numberOfDice] || {})[numberOfColumns];
    data = {...data, [numberOfDice]:{...data[numberOfDice],[numberOfColumns]:{...columns,[points]:name}}};
    localStorage.setItem('data', JSON.stringify(data));
};

export const saveSettings = (numberOfDice, rest) => {
    data = {...data, ['dataSettings']:{...data['dataSettings'],['numberOfDice']:numberOfDice, ['columnsToAdd']:{...rest}}};
    localStorage.setItem('data', JSON.stringify(data));
};

export const saveTopListSettings = (name, value) => {
    data = {...data, ['topListSettings']:{...data['topListSettings'],[name]:value}};
    localStorage.setItem('data', JSON.stringify(data));
};

export const getDataSettings = type => {
    let data = JSON.parse(localStorage.getItem('data')) || {};
    return data[type] || {};
};
