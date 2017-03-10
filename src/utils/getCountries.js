import jsonp from 'jsonp';

export default (cb: Function) => (
	jsonp('https://api.vk.com/method/database.getCountries?count=400&need_all=1&v=5.62', {}, cb)
);
