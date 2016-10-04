const filter = (value, index, self) => self.indexOf(value) === index;
const filterLast = (value, index, self) => self.lastIndexOf(value) === index;

export default function unique (array, keepLastOccurance = false) {
	return array.filter(keepLastOccurance ? filterLast : filter);
}
