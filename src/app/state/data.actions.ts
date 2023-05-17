import {createAction, props} from '@ngrx/store';
import { Table } from '../models/table';

export const loadData = createAction('[Data] Load Data');
export const loadDataSuccess = createAction('[Data] Load Data Success', props<{items: Table[]}>());
export const addTable = createAction('[Data] Add Table', props<{table: Table}>());
export const saveData = createAction('[Data] Save Data');
export const updateTable = createAction('[Data] Update Table', props<{table: Table}>());
export const deleteTable = createAction('[Data] Delete Table', props<{id: number}>());