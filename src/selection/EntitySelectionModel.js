import { EntityMatcherFactory } from '../filters/identify-entities.js';

import SelectionModel from './SelectionModel.js';

export class EntitySelectionModel extends SelectionModel {
	constructor(initialSelection = []) {
		super(EntityMatcherFactory, initialSelection);
	}
}
