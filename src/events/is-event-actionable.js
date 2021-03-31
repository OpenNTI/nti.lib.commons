export function isActionable(e) {
	return (
		!e ||
		e.type === 'click' ||
		(e.type === 'keydown' && (e.key === 'Enter' || e.key === ' '))
	);
}
