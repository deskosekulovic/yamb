import { columns, rowsToSelect } from './Fields';

function removeDuplicateUsingSet(arr){
    let unique_array = Array.from(new Set(arr));
    return unique_array;
}

function countDuplicates(obj, num){
    obj[num] = (++obj[num] || 1);
    return obj;
}
const reducer = (accumulator, currentValue) => accumulator + currentValue;

const elementRepeats = (dice, field) => {
    let count = 0;
    dice.map(el=>{
        el==field && count++;
    });
    if(count===6) return 5*field;
    return count*field;
};

const minMax = (dice, max) => {
    const minrray=dice.sort((a,b)=>a-b).slice(0, 5);
    const maxАrray=dice.sort((a,b)=>a-b).slice(1, 6);
    return max ? maxАrray.reduce(reducer) : minrray.reduce(reducer);
};

const kenta = (dice,rolls) => {
    let unique = removeDuplicateUsingSet(dice);
    if(((unique.reduce(reducer)===15 || unique.reduce(reducer)===20) && unique.length===5) || unique.length===6){
        if(rolls === 1) return 66;
        if(rolls === 2) return 56;
        if(rolls === 3) return 46;
    }else{
        return 0;
    }
};

const same = (dice,field) => {
    let data = dice.reduce(countDuplicates, {});
    let unique = removeDuplicateUsingSet(dice);
    for (var key in data) {
        if(data[key]===3 && field===3 && unique.length===2){
            return Math.max(...unique)*field;
        }
        if(data[key]>=3 && field===3){
            return key*field;
        }
        if(data[key]>=4 && field===4){
            return key*field;
        }
        if(data[key]>=5 && field===5){
            return key*field;
        }
    }
};

const full = (dice) => {
    let data = dice.reduce(countDuplicates, {});
    let unique = removeDuplicateUsingSet(dice);
    let result2=0;
    let result3=0;
    let result5=0;
    for (var key in data) {
        if(data[key]>=3){
            result3+=key*3;
        }
        if(data[key]==2){
            result2+=key*2;
        }
        if(data[key]>=5){
            result5+=key*5;
        }
    }
    if(result5) return result5;
    if(result2 && result3) return result2 + result3;
    if(result3 && unique.length===2) return result3-Math.min(...dice);
};

const calculate = (field, dice, rolls) =>{
    switch(field){
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
        return elementRepeats(dice, field);
    case 'max':
        return minMax(dice, true);
    case 'min':
        return minMax(dice, false);
    case 'kenta':
        return kenta(dice, rolls);
    case 'triling':
        return (same(dice, 3)+20) || 0;
    case 'full':
        return (full(dice)+30) || 0;
    case 'poker':
        return (same(dice, 4)+40) || 0;
    case 'yumb':
        return (same(dice, 5)+50) || 0;
    default:
        return 0;
    }
};

let helper={};
let columnResults={};
let bonus={};
columns.map(column=>columnResults={...columnResults,[column+'-suma1']:0,[column+'-suma2']:0,[column+'-suma3']:0});
columns.map(column=>bonus={...bonus,[column+'-suma1']:true});
export const columnResult = (field, value, reset) => {
    if(reset){
        helper={};
        columnResults={};
        bonus={};
        columns.map(column=>columnResults={...columnResults,[column+'-suma1']:0,[column+'-suma2']:0,[column+'-suma3']:0});
        columns.map(column=>bonus={...bonus,[column+'-suma1']:true});
        return;
    }
    let column = field.split('-')[0];
    let row = field.split('-')[1];

    if(row>=1 || row<=6){
        if(row==1){
            helper[column+'-1']=value;
        }
        columnResults[column+'-suma1']+=value;
        if(columnResults[column+'-suma1']>=60 && bonus[column+'-suma1']){
            columnResults[column+'-suma1']=columnResults[column+'-suma1']+30;
            bonus[column+'-suma1']=false;
        }
    }
    if(row==='max' || row==='min' || row==='1'){
        helper[field]=value;
        columnResults[column+'-suma2']=(helper[column+'-max']-helper[column+'-min'])*helper[column+'-1'];
        if(columnResults[column+'-suma2']>=60){
            columnResults[column+'-suma2'] = columnResults[column+'-suma2']+30;
        }
        if(columnResults[column+'-suma2']<0){
            columnResults[column+'-suma2'] = 0;
        }
        columnResults[column+'-suma2']=columnResults[column+'-suma2'] || 0;
    }
    if(row==='full' || row==='triling' || row==='kenta' || row==='poker' || row==='yumb'){
        columnResults[column+'-suma3']+=value;
    }
    return columnResults;
};

export const totalResult = () => {
    return Object.values(columnResults).reduce(reducer);
};

let done = {};
let doleIndex=0;
let goreIndex=0;

export const permissionHandler = (field, rolls, najavljeno, reset) => {
    if(reset){
        done = {};
        doleIndex=0;
        goreIndex=0;
    }
    let object={};
    if(field){
        done={...done, [field]: false};
    }


    object={...object, ['dole-'+rowsToSelect[doleIndex]]:true};
    object={...object, ['gore-'+rowsToSelect[rowsToSelect.length-goreIndex-1]]:true};
    if(field && field.split('-')[0]=='dole'){
        doleIndex++;
    }
    if(field && field.split('-')[0]=='gore'){
        goreIndex++;
    }
    rowsToSelect.filter(
        row => {
            if(row!==field) return object={...object, ['slobodno-'+row]:true};
        }
    );
    if(rolls===1){
        rowsToSelect.filter(
            row => {
                if(row!==field) return object={...object, ['rucno-'+row]:true};
            }
        );
    }
    if(rolls===1 || najavljeno){
        rowsToSelect.filter(
            row => {
                if(row!==field) return object={...object, ['najava-'+row]:true};
            }
        );
    }
    object={...object,...done};

    return object;
};

export default calculate;
