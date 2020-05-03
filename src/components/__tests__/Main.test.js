import React from 'react';
import Main from '../Main';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe('<Main />', () => {

    test('should render main component', () => {
        const tree = shallow(<Main/>);
        expect(toJson(tree)).toMatchSnapshot();
    });
});