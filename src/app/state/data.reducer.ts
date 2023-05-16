import {createReducer, on} from '@ngrx/store';
import { Table } from '../models/table';
import { loadDataSuccess, saveData } from './data.actions';

export const featureKey = 'data';

export interface DataState {
    tables: Table[],
}

export const initialState: DataState = {
    tables: []
}

export const dataReducer = createReducer(
    initialState,
    on(loadDataSuccess, (state, action) => {
        return {...state, tables: action.items}
    }),
    on(saveData, (state) => ({...state}))
);
