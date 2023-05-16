import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/models/table';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

    tables: Table[] = [];

    constructor(){}

    ngOnInit() {
        this.tables.push(new Table(1));
    }

    addNewTable() {
        const newTable = new Table(this.tables.length + 1);
        this.tables.push(newTable)
    }

}

