import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import App from '../../App';
import Main from '../../components/Main';
import Fields from '../../components/Fields';
import SetOfDice from '../../components/SetOfDice';
import TopList from '../../components/TopList';
import { StyledApp, Game, Rezultati, theme } from '../../styles/App';

describe('Main', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(<Main inputCount={50} numberOfFields={50} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.containsMatchingElement(<Fields />)).toBe(true);
        expect(wrapper.containsMatchingElement(<SetOfDice />)).toBe(true);
        // if(this.props.inputCount===this.props.numberOfFields) expect(wrapper.containsMatchingElement(<TopList />)).toBe(true);
    });
    describe('<Game />', () => {
        const wrapper = shallow(<Game theme={theme} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toHaveStyleRule('padding', '5px 30px');
    });
    describe('<Rezultati />', () => {
        const wrapper = shallow(<Rezultati theme={theme} />);
        expect(wrapper).toMatchSnapshot();
    });
});
