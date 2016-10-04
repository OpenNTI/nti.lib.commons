import SelectionModel from './SelectionModel';
import {EntityMatcherFactory} from '../filters';


export default class EntitySelectionModel extends SelectionModel {
	constructor (initialSelection = []) {
		super(EntityMatcherFactory, initialSelection);
	}
}
