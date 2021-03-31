import { remove } from './remove.js';
import { insert } from './insert.js';

export function move(arr, from, to) {
	return insert(remove(arr, from), arr[from], to);
}
