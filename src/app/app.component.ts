import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataService } from './services/data.service';
import { loadDataSuccess } from './state/data.actions';
import { DataState } from './state/data.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'draw-sql';

  constructor(private store: Store<{ data: DataState }>, private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((data: any) => {
      debugger
      if (data[0]) {
        this.store.dispatch(loadDataSuccess({items: data[0].data}));
      }
    }, (error: any) => {
      console.error('Error:', error);
    });
  }
}
