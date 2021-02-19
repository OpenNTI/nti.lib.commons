import removeAt from './remove';
import insertAt from './insert';

export default function moveItem(arr, from, to) {
	return insertAt(removeAt(arr, from), arr[from], to);
}
