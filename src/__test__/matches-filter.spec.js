import matchesFilter, {normalize, generateMatchFilter} from '../matches-filter';

describe('Matches Filter Tests', () => {
	describe('Normalize', () => {
		it('Case is normalized away', () => {
			const a = normalize('test');
			const b = normalize('TEST');

			expect(a).toEqual(b);
		});
	});

	describe('matchesFilter', () => {
		const filter = 'filter';

		it('Filter is exactly the term', () => {
			const term = filter;

			expect(matchesFilter(term, filter)).toBeTruthy();
		});

		describe('Filter is substring of the term', () => {
			it('Start', () => {
				const term = `${filter} plus some more`;

				expect(matchesFilter(term, filter)).toBeTruthy();
			});

			it('Middle', () => {
				const term = `first ${filter} last`;

				expect(matchesFilter(term, filter)).toBeTruthy();
			});

			it('End', () => {
				const term = `some stuff then ${filter}`;

				expect(matchesFilter(term, filter)).toBeTruthy();
			});
		});

		it ('Filter is not in term', () => {
			const term = 'nothing to match';

			expect(matchesFilter(term, filter)).toBeFalsy();
		});

		it('Filter is superset of term', () => {
			const f = `${filter} plus some more`;
			const term = filter;

			expect(matchesFilter(term, f)).toBeFalsy();
		});
	});

	describe('generateMatchFilter', () => {
		const filter = 'filter';

		it('filters out terms that don\'t match', () => {
			const values = [filter, 'not'];
			const filterFn = generateMatchFilter(filter);
			const filteredValues = values.filter(filterFn);

			expect(filteredValues.length).toEqual(1);
			expect(filteredValues[0]).toEqual(filter);
		});
	});
});
