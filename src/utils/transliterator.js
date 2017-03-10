const chars = [
	{
		original: 'ä',
		replace: 'ae',
	},
	{
		original: 'æ',
		replace: 'ae',
	},
	{
		original: 'ǽ',
		replace: 'ae',
	},
	{
		original: 'ö',
		replace: 'oe',
	},
	{
		original: 'œ',
		replace: 'oe',
	},
	{
		original: 'ü',
		replace: 'ue',
	},
	{
		original: 'Ä',
		replace: 'Ae',
	},
	{
		original: 'Ü',
		replace: 'Ue',
	},
	{
		original: 'Ö',
		replace: 'Oe',
	},
	{
		original: 'À',
		replace: 'A',
	},
	{
		original: 'Á',
		replace: 'A',
	},
	{
		original: 'Â',
		replace: 'A',
	},
	{
		original: 'Ã',
		replace: 'A',
	},
	{
		original: 'Å',
		replace: 'A',
	},
	{
		original: 'Ǻ',
		replace: 'A',
	},
	{
		original: 'Ā',
		replace: 'A',
	},
	{
		original: 'Ă',
		replace: 'A',
	},
	{
		original: 'Ą',
		replace: 'A',
	},
	{
		original: 'Ǎ',
		replace: 'A',
	},
	{
		original: 'à',
		replace: 'a',
	},
	{
		original: 'á',
		replace: 'a',
	},
	{
		original: 'â',
		replace: 'a',
	},
	{
		original: 'ã',
		replace: 'a',
	},
	{
		original: 'å',
		replace: 'a',
	},
	{
		original: 'ǻ',
		replace: 'a',
	},
	{
		original: 'ā',
		replace: 'a',
	},
	{
		original: 'ă',
		replace: 'a',
	},
	{
		original: 'ą',
		replace: 'a',
	},
	{
		original: 'ǎ',
		replace: 'a',
	},
	{
		original: 'ª',
		replace: 'a',
	},
	{
		original: 'Ç',
		replace: 'C',
	},
	{
		original: 'Ć',
		replace: 'C',
	},
	{
		original: 'Ĉ',
		replace: 'C',
	},
	{
		original: 'Ċ',
		replace: 'C',
	},
	{
		original: 'Č',
		replace: 'C',
	},
	{
		original: 'ç',
		replace: 'c',
	},
	{
		original: 'ć',
		replace: 'c',
	},
	{
		original: 'ĉ',
		replace: 'c',
	},
	{
		original: 'ċ',
		replace: 'c',
	},
	{
		original: 'č',
		replace: 'c',
	},
	{
		original: 'Ð',
		replace: 'D',
	},
	{
		original: 'Ď',
		replace: 'D',
	},
	{
		original: 'Đ',
		replace: 'D',
	},
	{
		original: 'ð',
		replace: 'd',
	},
	{
		original: 'ď',
		replace: 'd',
	},
	{
		original: 'đ',
		replace: 'd',
	},
	{
		original: 'È',
		replace: 'E',
	},
	{
		original: 'É',
		replace: 'E',
	},
	{
		original: 'Ê',
		replace: 'E',
	},
	{
		original: 'Ë',
		replace: 'E',
	},
	{
		original: 'Ē',
		replace: 'E',
	},
	{
		original: 'Ĕ',
		replace: 'E',
	},
	{
		original: 'Ė',
		replace: 'E',
	},
	{
		original: 'Ę',
		replace: 'E',
	},
	{
		original: 'Ě',
		replace: 'E',
	},
	{
		original: 'è',
		replace: 'e',
	},
	{
		original: 'é',
		replace: 'e',
	},
	{
		original: 'ê',
		replace: 'e',
	},
	{
		original: 'ë',
		replace: 'e',
	},
	{
		original: 'ē',
		replace: 'e',
	},
	{
		original: 'ĕ',
		replace: 'e',
	},
	{
		original: 'ė',
		replace: 'e',
	},
	{
		original: 'ę',
		replace: 'e',
	},
	{
		original: 'ě',
		replace: 'e',
	},
	{
		original: 'Ĝ',
		replace: 'G',
	},
	{
		original: 'Ğ',
		replace: 'G',
	},
	{
		original: 'Ġ',
		replace: 'G',
	},
	{
		original: 'Ģ',
		replace: 'G',
	},
	{
		original: 'ĝ',
		replace: 'g',
	},
	{
		original: 'ğ',
		replace: 'g',
	},
	{
		original: 'ġ',
		replace: 'g',
	},
	{
		original: 'ģ',
		replace: 'g',
	},
	{
		original: 'Ĥ',
		replace: 'H',
	},
	{
		original: 'Ħ',
		replace: 'H',
	},
	{
		original: 'ĥ',
		replace: 'h',
	},
	{
		original: 'ħ',
		replace: 'h',
	},
	{
		original: 'Ì',
		replace: 'I',
	},
	{
		original: 'Í',
		replace: 'I',
	},
	{
		original: 'Î',
		replace: 'I',
	},
	{
		original: 'Ï',
		replace: 'I',
	},
	{
		original: 'Ĩ',
		replace: 'I',
	},
	{
		original: 'Ī',
		replace: 'I',
	},
	{
		original: 'Ĭ',
		replace: 'I',
	},
	{
		original: 'Ǐ',
		replace: 'I',
	},
	{
		original: 'Į',
		replace: 'I',
	},
	{
		original: 'İ',
		replace: 'I',
	},
	{
		original: 'ì',
		replace: 'i',
	},
	{
		original: 'í',
		replace: 'i',
	},
	{
		original: 'î',
		replace: 'i',
	},
	{
		original: 'ï',
		replace: 'i',
	},
	{
		original: 'ĩ',
		replace: 'i',
	},
	{
		original: 'ī',
		replace: 'i',
	},
	{
		original: 'ĭ',
		replace: 'i',
	},
	{
		original: 'ǐ',
		replace: 'i',
	},
	{
		original: 'į',
		replace: 'i',
	},
	{
		original: 'ı',
		replace: 'i',
	},
	{
		original: 'Ĵ',
		replace: 'J',
	},
	{
		original: 'ĵ',
		replace: 'j',
	},
	{
		original: 'Ķ',
		replace: '',
	},
	{
		original: 'ķ',
		replace: 'k',
	},
	{
		original: 'Ĺ',
		replace: 'L',
	},
	{
		original: 'Ļ',
		replace: 'L',
	},
	{
		original: 'Ľ',
		replace: 'L',
	},
	{
		original: 'Ŀ',
		replace: 'L',
	},
	{
		original: 'Ł',
		replace: 'L',
	},
	{
		original: 'ĺ',
		replace: 'l',
	},
	{
		original: 'ļ',
		replace: 'l',
	},
	{
		original: 'ľ',
		replace: 'l',
	},
	{
		original: 'ŀ',
		replace: 'l',
	},
	{
		original: 'ł',
		replace: 'l',
	},
	{
		original: 'Ñ',
		replace: 'N',
	},
	{
		original: 'Ń',
		replace: 'N',
	},
	{
		original: 'Ņ',
		replace: 'N',
	},
	{
		original: 'Ň',
		replace: 'N',
	},
	{
		original: 'ñ',
		replace: 'n',
	},
	{
		original: 'ń',
		replace: 'n',
	},
	{
		original: 'ņ',
		replace: 'n',
	},
	{
		original: 'ň',
		replace: 'n',
	},
	{
		original: 'ŉ',
		replace: 'n',
	},
	{
		original: 'Ò',
		replace: 'O',
	},
	{
		original: 'Ó',
		replace: 'O',
	},
	{
		original: 'Ô',
		replace: 'O',
	},
	{
		original: 'Õ',
		replace: 'O',
	},
	{
		original: 'Ō',
		replace: 'O',
	},
	{
		original: 'Ŏ',
		replace: 'O',
	},
	{
		original: 'Ǒ',
		replace: 'O',
	},
	{
		original: 'Ő',
		replace: 'O',
	},
	{
		original: 'Ơ',
		replace: 'O',
	},
	{
		original: 'Ø',
		replace: 'O',
	},
	{
		original: 'Ǿ',
		replace: 'O',
	},
	{
		original: 'ò',
		replace: 'o',
	},
	{
		original: 'ó',
		replace: 'o',
	},
	{
		original: 'ô',
		replace: 'o',
	},
	{
		original: 'õ',
		replace: 'o',
	},
	{
		original: 'ō',
		replace: 'o',
	},
	{
		original: 'ŏ',
		replace: 'o',
	},
	{
		original: 'ǒ',
		replace: 'o',
	},
	{
		original: 'ő',
		replace: 'o',
	},
	{
		original: 'ơ',
		replace: 'o',
	},
	{
		original: 'ø',
		replace: 'o',
	},
	{
		original: 'ǿ',
		replace: 'o',
	},
	{
		original: 'º',
		replace: 'o',
	},
	{
		original: 'Ŕ',
		replace: 'R',
	},
	{
		original: 'Ŗ',
		replace: 'R',
	},
	{
		original: 'Ř',
		replace: 'R',
	},
	{
		original: 'ŕ',
		replace: 'r',
	},
	{
		original: 'ŗ',
		replace: 'r',
	},
	{
		original: 'ř',
		replace: 'r',
	},
	{
		original: 'Ś',
		replace: 'S',
	},
	{
		original: 'Ŝ',
		replace: 'S',
	},
	{
		original: 'Ş',
		replace: 'S',
	},
	{
		original: 'Š',
		replace: 'S',
	},
	{
		original: 'ś',
		replace: 's',
	},
	{
		original: 'ŝ',
		replace: 's',
	},
	{
		original: 'ş',
		replace: 's',
	},
	{
		original: 'š',
		replace: 's',
	},
	{
		original: 'ſ',
		replace: 's',
	},
	{
		original: 'Ţ',
		replace: 'T',
	},
	{
		original: 'Ť',
		replace: 'T',
	},
	{
		original: 'Ŧ',
		replace: 'T',
	},
	{
		original: 'ţ',
		replace: 't',
	},
	{
		original: 'ť',
		replace: 't',
	},
	{
		original: 'ŧ',
		replace: 't',
	},
	{
		original: 'Ù',
		replace: 'U',
	},
	{
		original: 'Ú',
		replace: 'U',
	},
	{
		original: 'Û',
		replace: 'U',
	},
	{
		original: 'Ũ',
		replace: 'U',
	},
	{
		original: 'Ū',
		replace: 'U',
	},
	{
		original: 'Ŭ',
		replace: 'U',
	},
	{
		original: 'Ů',
		replace: 'U',
	},
	{
		original: 'Ű',
		replace: 'U',
	},
	{
		original: 'Ų',
		replace: 'U',
	},
	{
		original: 'Ư',
		replace: 'U',
	},
	{
		original: 'Ǔ',
		replace: 'U',
	},
	{
		original: 'Ǖ',
		replace: 'U',
	},
	{
		original: 'Ǘ',
		replace: 'U',
	},
	{
		original: 'Ǚ',
		replace: 'U',
	},
	{
		original: 'Ǜ',
		replace: 'U',
	},
	{
		original: 'ù',
		replace: 'u',
	},
	{
		original: 'ú',
		replace: 'u',
	},
	{
		original: 'û',
		replace: 'u',
	},
	{
		original: 'ũ',
		replace: 'u',
	},
	{
		original: 'ū',
		replace: 'u',
	},
	{
		original: 'ŭ',
		replace: 'u',
	},
	{
		original: 'ů',
		replace: 'u',
	},
	{
		original: 'ű',
		replace: 'u',
	},
	{
		original: 'ų',
		replace: 'u',
	},
	{
		original: 'ư',
		replace: 'u',
	},
	{
		original: 'ǔ',
		replace: 'u',
	},
	{
		original: 'ǖ',
		replace: 'u',
	},
	{
		original: 'ǘ',
		replace: 'u',
	},
	{
		original: 'ǚ',
		replace: 'u',
	},
	{
		original: 'ǜ',
		replace: 'u',
	},
	{
		original: 'Ý',
		replace: 'Y',
	},
	{
		original: 'Ÿ',
		replace: 'Y',
	},
	{
		original: 'Ŷ',
		replace: 'Y',
	},
	{
		original: 'ý',
		replace: 'y',
	},
	{
		original: 'ÿ',
		replace: 'y',
	},
	{
		original: 'ŷ',
		replace: 'y',
	},
	{
		original: 'Ŵ',
		replace: 'W',
	},
	{
		original: 'ŵ',
		replace: 'w',
	},
	{
		original: 'Ź',
		replace: 'Z',
	},
	{
		original: 'Ż',
		replace: 'Z',
	},
	{
		original: 'Ž',
		replace: 'Z',
	},
	{
		original: 'ź',
		replace: 'z',
	},
	{
		original: 'ż',
		replace: 'z',
	},
	{
		original: 'ž',
		replace: 'z',
	},
	{
		original: 'Æ',
		replace: 'AE',
	},
	{
		original: 'Ǽ',
		replace: 'AE',
	},
	{
		original: 'ß',
		replace: 'ss',
	},
	{
		original: 'Ĳ',
		replace: 'IJ',
	},
	{
		original: 'ĳ',
		replace: 'ij',
	},
	{
		original: 'Œ',
		replace: 'OE',
	},
	{
		original: 'ƒ',
		replace: 'f',
	},
	{
		original: 'зг',
		replace: 'zgh',
	},
	{
		original: 'Зг',
		replace: 'Zgh',
	},
	{
		original: 'А',
		replace: 'A',
	},
	{
		original: 'а',
		replace: 'a',
	},
	{
		original: 'Б',
		replace: 'B',
	},
	{
		original: 'б',
		replace: 'b',
	},
	{
		original: 'В',
		replace: 'V',
	},
	{
		original: 'в',
		replace: 'v',
	},
	{
		original: 'Г',
		replace: 'G',
	},
	{
		original: 'г',
		replace: 'g',
	},
	{
		original: 'Ґ',
		replace: 'G',
	},
	{
		original: 'ґ',
		replace: 'g',
	},
	{
		original: 'Д',
		replace: 'D',
	},
	{
		original: 'д',
		replace: 'd',
	},
	{
		original: 'Е',
		replace: 'E',
	},
	{
		original: 'е',
		replace: 'e',
	},
	{
		original: 'Ё',
		replace: 'E',
	},
	{
		original: 'ё',
		replace: 'e',
	},
	{
		original: 'Є',
		replace: 'Ye',
	},
	{
		original: 'є',
		replace: 'ie',
	},
	{
		original: 'Ж',
		replace: 'Zh',
	},
	{
		original: 'ж',
		replace: 'zh',
	},
	{
		original: 'З',
		replace: 'Z',
	},
	{
		original: 'з',
		replace: 'z',
	},
	{
		original: 'И',
		replace: 'Y',
	},
	{
		original: 'и',
		replace: 'y',
	},
	{
		original: 'І',
		replace: 'I',
	},
	{
		original: 'і',
		replace: 'i',
	},
	{
		original: 'Ї',
		replace: 'Yi',
	},
	{
		original: 'ї',
		replace: 'i',
	},
	{
		original: 'Й',
		replace: 'Y',
	},
	{
		original: 'й',
		replace: 'i',
	},
	{
		original: 'К',
		replace: 'K',
	},
	{
		original: 'к',
		replace: 'k',
	},
	{
		original: 'Л',
		replace: 'L',
	},
	{
		original: 'л',
		replace: 'l',
	},
	{
		original: 'М',
		replace: 'M',
	},
	{
		original: 'м',
		replace: 'm',
	},
	{
		original: 'Н',
		replace: 'N',
	},
	{
		original: 'н',
		replace: 'n',
	},
	{
		original: 'О',
		replace: 'O',
	},
	{
		original: 'о',
		replace: 'o',
	},
	{
		original: 'П',
		replace: 'P',
	},
	{
		original: 'п',
		replace: 'p',
	},
	{
		original: 'Р',
		replace: 'R',
	},
	{
		original: 'р',
		replace: 'r',
	},
	{
		original: 'С',
		replace: 'S',
	},
	{
		original: 'с',
		replace: 's',
	},
	{
		original: 'Т',
		replace: 'T',
	},
	{
		original: 'т',
		replace: 't',
	},
	{
		original: 'У',
		replace: 'U',
	},
	{
		original: 'у',
		replace: 'u',
	},
	{
		original: 'Ф',
		replace: 'F',
	},
	{
		original: 'ф',
		replace: 'f',
	},
	{
		original: 'Х',
		replace: 'Kh',
	},
	{
		original: 'х',
		replace: 'kh',
	},
	{
		original: 'Ц',
		replace: 'Ts',
	},
	{
		original: 'ц',
		replace: 'ts',
	},
	{
		original: 'Ч',
		replace: 'Ch',
	},
	{
		original: 'ч',
		replace: 'ch',
	},
	{
		original: 'Ш',
		replace: 'Sh',
	},
	{
		original: 'ш',
		replace: 'sh',
	},
	{
		original: 'Щ',
		replace: 'Shch',
	},
	{
		original: 'щ',
		replace: 'shch',
	},
	{
		original: 'Ы',
		replace: 'Y',
	},
	{
		original: 'ы',
		replace: 'y',
	},
	{
		original: 'Э',
		replace: 'E',
	},
	{
		original: 'э',
		replace: 'e',
	},
	{
		original: 'Ю',
		replace: 'Yu',
	},
	{
		original: 'ю',
		replace: 'iu',
	},
	{
		original: 'Я',
		replace: 'Ya',
	},
	{
		original: 'я',
		replace: 'ia',
	},
	{
		original: 'Ь',
		replace: '',
	},
	{
		original: 'ь',
		replace: '',
	},
	{
		original: 'Ъ',
		replace: '',
	},
	{
		original: 'ъ',
		replace: '',
	},
	{
		original: '\'',
		replace: '',
	},
].map(v => ({...v, re: new RegExp(`${v.original}`, 'g')}));

export default (s: string): string => (
	chars.reduce((str, char) => (
		str.replace(char.re, char.replace)
	), s)
);
