import { ObjectMatcherFactory } from '../filters/identify-objects.js';

import SelectionModel from './SelectionModel.js';

export class ObjectSelectionModel extends SelectionModel {
	constructor(initialSelection = []) {
		super(ObjectMatcherFactory, initialSelection);
	}
}
