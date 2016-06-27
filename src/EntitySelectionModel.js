import SelectionModel from './SelectionModel';
import EntityMatcherFactory from './identify-entities';


export default class EntitySelectionModel extends SelectionModel {
	constructor (initialSelection = []) {
		super(EntityMatcherFactory, initialSelection);
	}
}
