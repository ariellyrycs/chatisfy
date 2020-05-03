const generateUId = () => {
    return new Date().getTime() + Math.floor(Math.random() * 1000);
};

const generateTime = (timestamp = Date.now()) => {
	const time = new Date(timestamp);
	return `${time.getHours() || '00'}:${time.getMinutes() || '00'}`;
};

export {
    generateUId,
    generateTime
};