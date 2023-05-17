import {createReducer, on} from '@ngrx/store';
import { Table } from '../models/table';
import { addTable, deleteTable, loadData, loadDataSuccess, saveData, updateTable } from './data.actions';

export const featureKey = 'data';

export interface DataState {
    tables: Table[],
}

export const initialState: DataState = getInitialState();

export const dataReducer = createReducer(
    initialState,
    on(loadData, (state) => {
        return {...state}
    }),
    on(addTable, (state, action) => {
        const tables = [...state.tables];
        tables.push(action.table);
        return {...state, tables}
    }),
    on(loadDataSuccess, (state, action) => {
        debugger
        return {...state, tables: action.items}
    }),
    on(saveData, (state) => ({...state})),
    on(updateTable, (state, action) => {
        debugger
        const updatedTables = state.tables.map((table) => {
            if (table.id === action.table.id) {
              return { ...table, fields: [...action.table.fields] };
            }
            return table;
          });
          return { ...state, tables: updatedTables };
    }),
    on(deleteTable, (state, action) => {
        const tables = [...state.tables];
        const index = tables.findIndex(x => x.id === action.id);

        if (index !== -1) {
            tables.splice(index, 1);
        }
        return {...state, tables}
    })
);

function getInitialState() {
    const tables = [];
    const firstTable = new Table(1);
    tables.push(firstTable);
    return {
        tables
    }
}
