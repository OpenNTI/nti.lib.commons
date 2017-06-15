import {EntityMatcherFactory} from '../filters';

import SelectionModel from './SelectionModel';


export default class EntitySelectionModel extends SelectionModel {
	constructor (initialSelection = []) {
		super(EntityMatcherFactory, initialSelection);
	}
}
