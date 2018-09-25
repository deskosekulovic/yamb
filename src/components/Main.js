import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { StyledApp, Game, Span, Results, Navigation } from '../styles/App';
import calculate, { permissionHandler, columnResult, totalResult, selectedDice } from '../utilities/Functions';
import Fields from './Fields';
import SetOfDice from './SetOfDice';
import Button from './Button';
import { saveData } from '../utilities/store';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            dice: [],
            selected: [],
            rollCounter: 0,
            fields: {},
            permission: {},
            najavljeno: false,
            inputCount: 0
        };
        this.rollDice = this.rollDice.bind(this);
        this.toggleSelectDice = this.toggleSelectDice.bind(this);
        this.handleInput=this.handleInput.bind(this);
        this.resetGame=this.resetGame.bind(this);
        this.handleMouseOver=this.handleMouseOver.bind(this);
        this.handleMouseOut=this.handleMouseOut.bind(this);
    }
    componentDidMount() {
        this.resetGame();
        window.scrollTo(0, 0);
    }
    componentDidUpdate(prevProps, prevState) {
        const { rollCounter, najavljeno, inputCount } = this.state;
        const { columnsToAdd, numberOfFields, numberOfDice, numberOfColumns } = this.props;
        let per=permissionHandler(null, rollCounter);
        if((prevState.rollCounter!==rollCounter && rollCounter) || (prevState.najavljeno!==najavljeno && rollCounter)){
            this.najavaAndRucno = 0;
            Object.keys(per).map(item=>{
                (columnsToAdd['rucno'] && item.split('-')[0]=='rucno' || item.split('-')[0]=='najava') && per[item] && this.najavaAndRucno++;
            });
            if(!najavljeno){
                this.setState({permission: {...per}});
            }
        }
        if(inputCount===numberOfFields) {
            let name = prompt('Unesite ime', '');
            name = name && name.trim().length > 0 ? name : 'Neznani junak';
            saveData(name, totalResult(), numberOfDice, numberOfColumns);
        }
    }
    rollDice(){
        const { selected, dice, rollCounter, inputCount, najavljeno } = this.state;
        const { numberOfDice, numberOfFields } = this.props;
        if((numberOfFields-inputCount)!==this.najavaAndRucno || !rollCounter || najavljeno){
            let diceValue=[];
            for(let i=0; i<numberOfDice; i++){
                diceValue[i] = selected[i] ? dice[i] : Math.floor(Math.random()*6+1);
            }
            this.setState({
                dice: diceValue,
                rollCounter: rollCounter + 1
            });
        }
        if((numberOfFields-inputCount)==this.najavaAndRucno && rollCounter && !najavljeno){
            alert('Morate najaviti ili uneti iznos!');
        }
    }
    toggleSelectDice(e){
        let index=e.target.name.split('-')[1]-1;
        this.setState({
            selected: this.state.selected.map((el,i)=>{
                return i===index ? !el : el;
            })
        });
    }
    handleInput(e){
        const { dice, rollCounter, najavljeno, fields, inputCount } = this.state;
        const { numberOfDice } = this.props;
        let field = e.target.id.split('-')[1];
        let column = e.target.id.split('-')[0];
        let input, res={};
        if(((column==='rucno' || (column==='najava' && !najavljeno)) && rollCounter!==1) || (column==='najava' && rollCounter===1 && field!=='kenta')){
            input=0;
        }else{
            input=calculate(field,dice,rollCounter);
            res=columnResult(e.target.id,input);
        }
        (!(column==='najava' && rollCounter===1) || (column==='najava' && rollCounter===1 && field==='kenta' && input)) && permissionHandler(e.target.id);

        column==='najava' && rollCounter===1 && this.setState({
            permission: {[e.target.id]: true},
            najavljeno: !najavljeno
        });
        (column==='najava' && (rollCounter===1 && field==='kenta' && input || rollCounter!==1) || column!=='najava') && this.setState({
            fields: {...fields, [e.target.id]: input,...res},
            rollCounter: 0,
            dice: [],
            selected: selectedDice(numberOfDice),
            permission: {},
            inputCount: inputCount+1,
            najavljeno: false
        });
    }
    handleMouseOver(e){
        const { dice, rollCounter, fields } = this.state;
        let field = e.target.id.split('-')[1];
        let input=calculate(field,dice,rollCounter);

        this.setState({
            fields: {...fields, [e.target.id]: input}
        });
    }
    handleMouseOut(e){
        const { fields } = this.state;
        this.setState({
            fields: {...fields, [e.target.id]: ''}
        });
    }
    resetGame(){
        const { numberOfDice } = this.props;
        this.setState({
            dice: [],
            selected: selectedDice(numberOfDice),
            rollCounter: 0,
            fields: {},
            permission: {},
            najavljeno: false,
            inputCount: 0
        });
        permissionHandler(null, null, null, true);
        columnResult(null, null, true);
    }
    render() {
        const { dice, rollCounter, selected, fields, permission, inputCount, najavljeno } = this.state;
        const { numberOfDice, columnsToAdd, numberOfFields, columns } = this.props;

        let extraColumns = Object.keys(columnsToAdd);
        let mergedColumns = [...columns];
        extraColumns.map(
            item=>{
                if(columnsToAdd[item]){
                    mergedColumns=[...mergedColumns,...[{[item]: item=='rucno' ?' R' : item}]];
                }
            }
        );
        return (
            <StyledApp>
                <Game>
                    <Navigation>
                        <Span onClick={this.resetGame}><b>Nova igra</b></Span>
                        <Link to='/settings' style={{'color':'black','paddingLeft':'10px'}}><b>Podešavanja</b></Link>
                        <Link to='/toplists' style={{'color':'black','paddingLeft':'10px'}}><b>Top Liste</b></Link>
                    </Navigation>
                    <Fields
                        fields={fields}
                        columns={mergedColumns}
                        handleInput={this.handleInput}
                        handleMouseOver={this.handleMouseOver}
                        handleMouseOut={this.handleMouseOut}
                        permission={permission}
                        rollCounter={rollCounter}
                        najavljeno={najavljeno}
                    />
                    <SetOfDice
                        toggleSelectDice={this.toggleSelectDice}
                        selected={selected}
                        rollCounter={rollCounter}
                        dice={dice}
                        numberOfDice={numberOfDice}
                    />
                    <Button
                        rollDice={this.rollDice}
                        rollCounter={rollCounter}
                        disabled={numberOfFields===inputCount}
                    />
                </Game>
                <Results>
                    {totalResult()!==0 && <h1>Rezultat: {totalResult()}</h1>}
                </Results>
            </StyledApp>
        );
    }
}

Main.propTypes={
    numberOfDice: PropTypes.string,
    columnsToAdd: PropTypes.object,
    columns: PropTypes.array,
    numberOfFields: PropTypes.number,
    numberOfColumns: PropTypes.number,
    match: PropTypes.object
};

export default Main;
