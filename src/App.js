import React, { Component } from 'react';
import { StyledApp, Game, Span, Rezultati, theme } from './styles/App';
import { ThemeProvider } from 'styled-components';
import calculate, { permissionHandler, columnResult, totalResult } from './utilities/Functions';
import Fields from './components/Fields';
import SetOfDice from './components/SetOfDice';
import TopList from './components/TopList';
import { columns, rowsToSelect } from './utilities/Fields';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: [],
            selected: [false,false,false,false,false,false],
            rollCounter: 0,
            fields: {},
            permission: {},
            najavljeno: false,
            inputCount: 0
        };
        this.rollDices = this.rollDices.bind(this);
        this.toggleSelectDice = this.toggleSelectDice.bind(this);
        this.handleInput=this.handleInput.bind(this);
        this.resetGame=this.resetGame.bind(this);
    }
    componentDidMount() {
        const { permission } = this.state;
        this.setState({
            permission: {...permission, per:{}}
        });
    }
    componentDidUpdate(prevProps, prevState) {
        const { rollCounter, permission, najavljeno } = this.state;
        let per;
        if(prevState.rollCounter!==rollCounter && rollCounter){
            if(!najavljeno){
                per=permissionHandler(null, rollCounter, null, null);
                this.setState({
                    permission: {...permission, per}
                });
            }
        }
    }
    rollDices(){
        const { selected, value, rollCounter } = this.state;
        let val1 = selected[0] ? value[0] : Math.floor(Math.random()*6+1);
        let val2 = selected[1] ? value[1] : Math.floor(Math.random()*6+1);
        let val3 = selected[2] ? value[2] : Math.floor(Math.random()*6+1);
        let val4 = selected[3] ? value[3] : Math.floor(Math.random()*6+1);
        let val5 = selected[4] ? value[4] : Math.floor(Math.random()*6+1);
        let val6 = selected[5] ? value[5] : Math.floor(Math.random()*6+1);

        this.setState({
            value: [val1,val2,val3,val4,val5,val6],
            rollCounter: rollCounter + 1
        });
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
        const { value, rollCounter, permission, najavljeno, fields, inputCount } = this.state;
        let field = e.target.id.split('-')[1];
        permissionHandler(e.target.id);
        let input, res={};
        e.target.id.split('-')[0]==='najava' && rollCounter===1 && this.setState({
            permission: {...permission, per:{[e.target.id]: true}},
            najavljeno: true
        });
        if(field==='kenta' && e.target.id.split('-')[0]==='najava'){
            input=calculate(field,value,rollCounter);
            res=columnResult(e.target.id,input);
            input && this.setState({
                fields: {...fields, [e.target.id]: input,...res},
                rollCounter: 0,
                value: [],
                selected: [false,false,false,false,false,false],
                permission: {...permission, per:{}},
                najavljeno: false,
                inputCount: inputCount+1
            });
        }
        if(najavljeno && rollCounter===3){
            input=calculate(field,value,rollCounter);
            res=columnResult(e.target.id,input);
            this.setState({
                fields: {...fields, [e.target.id]: input,...res},
                rollCounter: 0,
                value: [],
                selected: [false,false,false,false,false,false],
                permission: {...permission, per:{}},
                najavljeno: false,
                inputCount: inputCount+1
            });
        }
        if(e.target.id.split('-')[0]!=='najava' && permission.per[e.target.id]){
            input=calculate(field,value,rollCounter);
            res=columnResult(e.target.id,input);
            this.setState({
                fields: {...fields, [e.target.id]: input,...res},
                rollCounter: 0,
                value: [],
                selected: [false,false,false,false,false,false],
                permission: {...permission, per:{}},
                inputCount: inputCount+1
            });
        }
    }
    resetGame(){
        this.setState({
            value: [],
            selected: [false,false,false,false,false,false],
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
        const { value, rollCounter, selected, fields, permission, inputCount } = this.state;
        const numberOfFields = columns.length*rowsToSelect.length;
        return (
            <ThemeProvider theme={theme}>
                <StyledApp>
                    <Game>
                        <Span onClick={this.resetGame}><b>Nova igra</b></Span>
                        <Fields
                            fields={fields}
                            handleInput={this.handleInput}
                            permission={permission}
                        />
                        <SetOfDice
                            rollDices={this.rollDices}
                            toggleSelectDice={this.toggleSelectDice}
                            selected={selected}
                            rollCounter={rollCounter}
                            value={value}
                        />
                    </Game>
                    <Rezultati>
                        <h1>Rezultat: {totalResult()}</h1>
                        {numberOfFields===inputCount && <TopList totalResult={totalResult()} />}
                    </Rezultati>
                </StyledApp>
            </ThemeProvider>
        );
    }
}

export default App;
