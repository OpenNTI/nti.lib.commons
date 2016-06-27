import SelectionModel from './SelectionModel';
import ObjectMatcherFactory from './identify-objects';


export default class ObjectSelectionModel extends SelectionModel {
	constructor (initialSelection = []) {
		super(ObjectMatcherFactory, initialSelection);
	}
}
