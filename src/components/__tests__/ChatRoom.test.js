import React from 'react';
import * as Store from '../../context/store';
import ChatRoom from '../ChatRoom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'


describe('<ChatRoom />', () => {
    test('should render chat room component', () => {
        const contextValues = {
            state: {
                rooms: {
                    data: {
                        1: {
                            name: 'React is awesome Group',
                            thumbnail: ''
                        }
                    },
                    messages: {
                        1: [1,2,3,4]
                    }
                },
                
                selectedRoom: 1
            },
            dispatch: () => {}
        };
        jest.spyOn(Store, 'useAppContext')
            .mockImplementation(() => contextValues);
        const tree = shallow(<ChatRoom />);
        expect(toJson(tree)).toMatchSnapshot();
    });
});