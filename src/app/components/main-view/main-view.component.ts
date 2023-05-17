import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataState } from 'src/app/state/data.reducer';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {

  data$: Observable<DataState>;

    constructor(private store: Store<{ data: DataState }>){
        this.data$ = this.store.select('data');
    }
}
