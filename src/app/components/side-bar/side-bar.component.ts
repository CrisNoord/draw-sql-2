import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Table } from 'src/app/models/table';
import { DataState } from 'src/app/state/data.reducer';
import { Observable, Subject, takeUntil} from 'rxjs';
import { addTable } from 'src/app/state/data.actions';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {

    tables: Table[] = [];
    data$: Observable<DataState>;
    destroy$: Subject<void> = new Subject<void>();

    constructor(private store: Store<{ data: DataState }>){
        this.data$ = this.store.select('data');
    }



    ngOnInit() {
        this.data$.pipe(takeUntil(this.destroy$)).subscribe((data: DataState) => {
            this.tables = data.tables;
        })
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    addNewTable() {
        const newTable = new Table(this.tables.length + 1);
        this.store.dispatch(addTable({table: newTable}));
    }

}

