import { v4 as uuid } from 'uuid';

export class Point {
	// static ORIGIN = new Point(0, 0)

	/**
	 * Creates a new Point
	 *
	 * @class
	 * @param {number} x - the x coordinate
	 * @param {number} y - the y coordinate
	 * @param {string} [id=guid] - the ID for this point; defaults to a guid.
	 */
	constructor(x, y, id = uuid()) {
		this.x = x;
		this.y = y;
		this.id = id;
	}

	/**
	 * Returns a new Point that is the sum of this point and p2
	 *
	 * @param {Point} p2 The other point
	 * @returns {Point} a new Point that is the sum of this Point and Point p2.
	 */
	plus(p2) {
		return new Point(this.x + p2.x, this.y + p2.y);
	}

	/**
	 * Returns a new Point that is this point minus point p2
	 *
	 * @param {Point} p2 The other point
	 * @returns {Point} a new Point that is this point minus p2.
	 */
	minus(p2) {
		return new Point(this.x - p2.x, this.y - p2.y);
	}

	times(p2) {
		if (typeof p2 === 'number') {
			return new Point(this.x * p2, this.y * p2);
		}
		return new Point(this.x * p2.x, this.y * p2.y);
	}

	/**
	 * Returns a new Point that is this point multiplied by the given scale factor
	 *
	 * @param {number} factor The scale factor
	 * @param {Point} [origin] origin point
	 * @returns {Point} a new Point that is this point multiplied by the given scale factor
	 */
	scale(factor = 1.0, origin = Point.ORIGIN) {
		return this.minus(origin).times(factor).plus(origin);
	}

	/**
	 * Returns a new Point halfway between this and the given point
	 *
	 * @param {Point} p The other point
	 * @returns {Point} the point halfway between this and Point p
	 */
	middle(p) {
		return {
			x: (p.x - this.x) / 2 + this.x,
			y: (p.y - this.y) / 2 + this.y,
		};
	}

	toString() {
		return `Point ${this.id}: (${this.x}, ${this.y})`;
	}
}
//workaround a bug in basel-plugin-transform-decorators(-legacy), when this plugin is active (static) class properties cannot access the class name. :|
Point.ORIGIN = new Point(0, 0);
