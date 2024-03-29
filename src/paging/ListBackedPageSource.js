import { join } from 'path';

import { encodeForURI } from '@nti/lib-ntiids';

const getNodeId = node =>
	node && (node.getContentId ? node.getContentId() : node.getID());

function buildRef(node, pathPrefix) {
	const id = getNodeId(node);
	return (
		node && {
			ntiid: id,
			title: node.title,
			ref: join(pathPrefix, encodeForURI(id)),
		}
	);
}

export class ListBackedPageSource {
	constructor(list, pathPrefix = '', id) {
		this.list = list;
		this.pathPrefix = pathPrefix;
		this.id = id;
	}

	getPagesAround(pageId) {
		const { list, pathPrefix } = this;

		//list maybe array like, and not actually an array
		const nodes = list.reduce ? list : Array.from(list);

		const index = nodes.reduce(
			(found, node, ix) =>
				typeof found !== 'number' && getNodeId(node) === pageId
					? ix
					: found,
			null
		);

		let next = nodes[index + 1];
		let prev = nodes[index - 1];

		return {
			total: nodes.length,
			index: index,
			next: buildRef(next, pathPrefix),
			prev: buildRef(prev, pathPrefix),
		};
	}

	contains(node) {
		return this.find(node) >= 0;
	}

	find(node) {
		let nodeId =
			node && (typeof node === 'string' ? node : getNodeId(node));
		let matcher = n => n.getID() === nodeId;
		return this.list.findIndex(matcher);
	}
}
