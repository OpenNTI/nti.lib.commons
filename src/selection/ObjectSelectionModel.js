import SelectionModel from './SelectionModel';
import {ObjectMatcherFactory} from '../filters';


export default class ObjectSelectionModel extends SelectionModel {
	constructor (initialSelection = []) {
		super(ObjectMatcherFactory, initialSelection);
	}
}
