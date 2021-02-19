/**
 * Utilitity to abstract away setting raw content on a React component. The content MUST be valid and sanitized.
 *
 * @param {string} x - A sanitized & valid HTML string.
 *
 * @returns {Object} An object with one prop: dangerouslySetInnerHTML setup to contain your raw content value.
 */
export default x => ({ dangerouslySetInnerHTML: { __html: x } });
