import move from '../move';

describe('move-item', ()=> {

	it('should move the element upward in the array', ()=> {
		let a = ['a', 'b', 'c'];
		expect(move(a, 2, 0)).toEqual(['c', 'a', 'b']);
	});

	it('should move the element downward in the array', ()=> {
		let a = ['a', 'b', 'c'];
		expect(move(a, 0, 2)).toEqual(['b', 'c', 'a']);
	});

	it('should not alter the input array', ()=> {
		let a = [1, 2, 3];
		move(a, 0, 2);
		expect(a).toEqual([1,2,3]);
	});

});
