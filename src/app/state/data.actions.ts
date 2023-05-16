import {createAction, props} from '@ngrx/store';
import { Table } from '../models/table';


export const loadDataSuccess = createAction('[Data] Load Data Success', props<{items: Table[]}>());

export const saveData = createAction('[Data] Save Data');
