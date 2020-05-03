import {generateUId, generateTime} from './Utils/General';


//this is a file that creates initial State data.
//In an ideal case this data should come from a service.

const generateObjByIds = arr => {
    let tmp = {};
    arr.forEach(i => tmp[i.id] = i);
    return tmp;
};

const generateDefaultArr = arr => {
    let tmp = {};
    arr.forEach(i => tmp[i.id] = []);
    return tmp;
};

const generateDefaultIdUsers = (arr, users) => {
    let tmp = {};
    arr.forEach((item, i) => tmp[item.id] = [users[i].id]);
    return tmp;
};

const mockedUsers = [{
	nickName: 'George',
	id: generateUId()
}, {
	nickName: 'Alice',
	id: generateUId()
}, {
	nickName: 'Brandom',
	id: generateUId()
}, {
	nickName: 'Erick',
	id: generateUId()
}, {
	nickName: 'Alexandra',
	id: generateUId()
}];

const mockedRooms = mockedUsers.map(user => ({
    name: user.nickName,
    thumbnail: '',
    id: generateUId()
}));

const mockedGroupRooms = [{
	name: 'React is awesome Group',
	thumbnail: '',
	id: generateUId()
}];

const allRooms = [
    ...mockedRooms,
    ...mockedGroupRooms
];

const mockedMessages = [{
	id: generateUId(),
	from: mockedUsers[0].id,
	content: 'Make sure you don\'t, as they say, go whole',
    createdTime: generateTime(),
	seen: false
}, {
	id: generateUId(),
	from: mockedUsers[1].id,
	content: 'Are you and Karen gonna, as they say, pig out?',
    createdTime: generateTime(),
	seen: false
}, {
	id: generateUId(),
	from: mockedUsers[2].id,
	content: 'how did it turn out?  Sounds nummy!\n',
	createdTime: generateTime(),
	seen: false
}];

const Mock = {
    users: {
        data: generateObjByIds(mockedUsers)
    },
    rooms: {
        data: generateObjByIds(allRooms),
        users: {
            ...generateDefaultIdUsers(mockedRooms, mockedUsers),
            [mockedGroupRooms[0].id]: [
                mockedUsers[0].id,
                mockedUsers[1].id
            ]
        },
        messages: {
            ...generateDefaultArr(mockedRooms),
            ...generateDefaultArr(mockedGroupRooms),
            [mockedRooms[0].id]: [
                mockedMessages[0].id
            ],
            [mockedRooms[1].id]: [
                mockedMessages[1].id
            ],
            [mockedRooms[2].id]: [
                mockedMessages[2].id
            ]
        }
    },
    messages: {
        data: generateObjByIds(mockedMessages)
    },
    selectedRoom: mockedRooms[0].id
};

export default Mock;