export const replaceRange = (s, start, end, substitute) =>
	s.substring(0, start) + substitute + s.substring(end);
