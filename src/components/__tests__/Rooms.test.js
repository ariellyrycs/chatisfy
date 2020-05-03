import React from 'react';
import Rooms from '../Rooms';
import * as Store from '../../context/store';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe('<Rooms />', () => {

    test('trigget distpatch with the right params', () => {
        let handleDrawerCloseStub = jest.fn();
        let dispatchStub = jest.fn();
        let contextValues = {
            state: {
                rooms: {
                    data: {
                        1: {
                            id: 1,
                            from: 1,
                            content: 'Make sure you don\'t, as they say, go whole',
                            createdTime: '14:23',
                            seen: false
                        },
                    }
                },
                currentUser: {
                    nickName: 'Pedro'
                }
            },
            dispatch: dispatchStub
        };
        jest.spyOn(Store, 'useAppContext')
            .mockImplementation(() => contextValues);
        const tree = shallow(<Rooms handleDrawerClose={handleDrawerCloseStub}/>);
        tree.find('.list-item').first().simulate('click');
        expect(dispatchStub).toHaveBeenCalledWith(
            expect.objectContaining({type: 'UPDATE_ROOM', roomId: 1})
        );
        expect(handleDrawerCloseStub).toHaveBeenCalled();
    });

    test('display component correctly', function () {
        let contextValues = {
            state: {
                rooms: {
                    data: {
                        1: {
                            id: 1,
                            from: 1,
                            content: 'Make sure you don\'t, as they say, go whole',
                            createdTime: '14:23',
                            seen: false
                        },
                    }
                },
                currentUser: {
                    nickName: 'Pedro'
                }
            },
            dispatch: () => {}
        };
        jest.spyOn(Store, 'useAppContext')
            .mockImplementation(() => contextValues);
        const tree = shallow(<Rooms handleDrawerClose={() => {}}/>);
        expect(toJson(tree)).toMatchSnapshot();
    });
});
