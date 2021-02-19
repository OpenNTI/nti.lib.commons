import isEmpty from 'isempty';

const anchors = /<a([^>]*)>(.*?)<\/a>/gim;
// const pars = /<(\/)?p([^>]*)>/igm;

function stripAnchors(tag, attrs, body) {
	return attrs.indexOf('data-id') < 0 &&
		(isEmpty(body) || isEmpty(attrs) || attrs.indexOf('href') === -1)
		? ''
		: tag;
}

// function stripPars (tag, end) {
// 	return end ? '\n' : '';
// }

export default function (string) {
	string = string && string.replace(anchors, stripAnchors);
	// string = string && string.replace(pars, stripPars);

	return string.trim();
}
