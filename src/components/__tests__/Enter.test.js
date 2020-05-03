import React from 'react';
import * as Store from '../../context/store';
import Enter from '../Enter';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'
import { arrowFunctionExpression } from '@babel/types';


describe('<Enter />', () => {

    test('should render Enter', () => {
        const contextValues = {
            state: {
            },
            dispatch: () => {}
        };
        jest.spyOn(Store, 'useAppContext')
            .mockImplementation(() => contextValues);
        const tree = shallow(<Enter />);
        expect(tree.find('#nickname-enter-helper-text').text()).toBe('');
        tree.find('form').simulate('submit', {preventDefault: () => {}});
        expect(tree.find('#nickname-enter-helper-text').text()).toBe('Should enter a valid nickName');
    });

    test('should make the propert changes and trigget distach', () => {
        const dispatchStub = jest.fn();
        const setLogStub = jest.fn();
        
        const contextValues = {
            state: {
                currentUser: {
                    id: 2
                }
            },
            dispatch: dispatchStub
        };
        jest.spyOn(Store, 'useAppContext')
            .mockImplementation(() => contextValues);
        const tree = shallow(<Enter setLog={setLogStub}/>);
        expect(tree.find('#nickname-enter-helper-text').text()).toBe('');
        tree.find('#nickname-enter').simulate('change', { target: { value: 'Changed' } })
        tree.find('#nickname-enter').simulate('keydown', {keyCode: 13, shiftKey: false, preventDefault: () => {}});
        expect(dispatchStub).toHaveBeenCalledWith(
            expect.objectContaining({
                type: 'UPDATE_NICKNAME', nickName: 'Changed', sentBy: 2
            })
        );
        expect(setLogStub).toHaveBeenCalledWith(true);
    });

    test('should render chat room component', () => {
        const contextValues = {
            state: {
            },
            dispatch: () => {}
        };
        jest.spyOn(Store, 'useAppContext')
            .mockImplementation(() => contextValues);
        const tree = shallow(<Enter/>);
        expect(toJson(tree)).toMatchSnapshot();
    });
});