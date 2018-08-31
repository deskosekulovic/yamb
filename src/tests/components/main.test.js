import React from 'react';
import { shallow, toHaveRendered } from 'enzyme';
// import App from '../../App';
import Fields from '../../components/Main';

describe('App', () => {

    it('Shows game and navigation', () => {
        const component = shallow(<Fields />);
        expect(component).toHaveBeenCalled();
    });
});
