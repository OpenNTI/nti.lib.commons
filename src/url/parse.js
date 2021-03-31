export const NULL_PROTO = 'file://';
export const parse = (uri, b) => new URL(uri, new URL(b, NULL_PROTO));
