import jsonp from 'jsonp';
import { stream } from 'kefir';
import type { Emitter } from 'kefir'; // eslint-disable-line no-duplicate-imports

let regionsStream: Emitter<*, *>;

stream((emitter: Emitter<*, *>): void => {
	regionsStream = emitter;
})
.debounce(350)
.onValue((v): void => {
	if (v.query) {
		const query = encodeURIComponent(v.query);
		jsonp(`https://api.vk.com/method/database.getRegions?q=${query}&country_id=${v.countryID}&count=5&v=5.62`, {}, v.cb);
		return;
	}
	jsonp(`https://api.vk.com/method/database.getRegions?country_id=${v.countryID}&count=5&v=5.62`, {}, v.cb);
});

export default ({countryID, query}: {countryID: number; query: string}, cb: Function): void => {
	regionsStream.emit({countryID, query, cb});
};
