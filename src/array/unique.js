const filter = (value, index, self) => self.indexOf(value) === index;
const filterLast = (value, index, self) => self.lastIndexOf(value) === index;

export function unique(array, keepLastOccurrence = false) {
	return array.filter(keepLastOccurrence ? filterLast : filter);
}
