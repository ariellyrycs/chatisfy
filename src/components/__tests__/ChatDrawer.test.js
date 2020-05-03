import React from 'react';
import ChatDrawer from '../ChatDrawer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe('<ChatDrawer />', () => {
    test('should render ChatDrawer and open the menu component', () => {
        const tree = shallow(<ChatDrawer />);
        expect(toJson(tree)).toMatchSnapshot();
    });
});