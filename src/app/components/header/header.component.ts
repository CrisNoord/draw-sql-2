import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { saveData } from 'src/app/state/data.actions';
import { DataState } from 'src/app/state/data.reducer';
import { Observable, Subject, take} from 'rxjs';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  data$: Observable<DataState>;
    destroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<{ data: DataState }>, private dataService: DataService) {
    this.data$ = this.store.select('data');
  };

  saveDatabase() {
    this.store.dispatch(saveData());

    this.data$.pipe(take(1)).subscribe((data: DataState) => {
      this.dataService.saveData((data.tables)).subscribe((data: any) => {
        alert('json data updated!');

      }, (error: any) => {
        console.error('Error:', error);
      });
    })
  }
}
