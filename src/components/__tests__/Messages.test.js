import React from 'react';
import Messages from '../Messages';
import * as Store from '../../context/store';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'


describe('<Messages />', () => {
    test('render the message component', () => {

        const contextValues = {
            state: {
                users: {
                    1: {
                        name: 'GEORGE',
                        thumbnail: ''
                    },
                    2: {
                        name: 'SANDRA',
                        thumbnail: ''
                    },
                },
                messages: {
                    data: {
                        1: {
                            id: 1,
                            from: 1,
                            content: 'Make sure you don\'t, as they say, go whole',
                            createdTime: '12:12',
                            seen: true
                        },
                        2: {
                            id: 2,
                            from: 2,
                            content: 'Are you and Karen gonna, as they say, pig out?',
                            createdTime: '12:14',
                            seen: false
                        }
                    }
                }
            }
        };
        const currentMessagesIds = [1, 2];
        jest.spyOn(Store, 'useAppContext')
            .mockImplementation(() => contextValues);
        const tree = shallow(<Messages currentMessagesIds={currentMessagesIds}/>);
        expect(toJson(tree)).toMatchSnapshot();
    });
});