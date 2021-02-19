import { ObjectMatcherFactory } from '../filters';

import SelectionModel from './SelectionModel';

export default class ObjectSelectionModel extends SelectionModel {
	constructor(initialSelection = []) {
		super(ObjectMatcherFactory, initialSelection);
	}
}
