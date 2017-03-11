import jsonp from 'jsonp';
import { stream } from 'kefir';
import type { Emitter } from 'kefir'; // eslint-disable-line no-duplicate-imports

let citiesStream: Emitter<*, *>;

stream((emitter: Emitter<*, *>): void => {
	citiesStream = emitter;
})
.debounce(350)
.onValue((v): void => {
	const apiBaseURL = `https://api.vk.com/method/database.getCities?region_id=${v.regionID}&country_id=${v.countryID}`;
	if (v.query) {
		const query = encodeURIComponent(v.query);
		jsonp(`${apiBaseURL}&q=${query}&count=5&v=5.62`, {}, v.cb);
		return;
	}
	jsonp(`${apiBaseURL}&count=5&v=5.62`, {}, v.cb);
});

export default ({
	countryID, regionID, query,
}: {countryID: number; regionID: number; query: string}, cb: Function): void => {
	citiesStream.emit({countryID, regionID, query, cb});
};
