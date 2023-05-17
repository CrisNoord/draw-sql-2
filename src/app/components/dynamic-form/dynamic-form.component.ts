import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Field, Table } from 'src/app/models/table';
import { deleteTable, updateTable } from 'src/app/state/data.actions';
import { DataState } from 'src/app/state/data.reducer';
import {distinctUntilChanged, debounceTime} from 'rxjs';
@Component({
  selector: 'app-dynamic-form-component',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
    @Input() table!: Table;
    form: FormGroup | undefined;

    typeOptions = [
      {value:"bigint"},
      {value:'blob'},
      {value:'boolean'},
      {value:'char'},
      {value:'date'},
      {value:'datetime'},
      {value:'decimal'},
      {value:'double'},
      {value:'enum'},
      {value:'float'},
      {value:'geometry'},
      {value:'geometrycollection'},
      {value:'int'},
      {value:'json'}
    ];

    indexOptions = [
      {value: 'primarykey'},
      {value: 'uniquekey'},
      {value: 'none'},
      {value: 'index'}
    ]

    constructor(private formBuilder: FormBuilder,
      private store: Store<{ data: DataState }>, 
            ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            tableN: new FormControl(this.table?.tableN),
            fields: this.formBuilder.array( this.table ?
                this.table.fields.map((field) => this.createFieldGroup(field)) :
                []
              )            
        });

        this.subscribeToFormChanges();
    }

    get fields() {
        return this.form?.controls["fields"] as FormArray;
    }


    private createFieldGroup(field: Field): FormGroup {
        return this.formBuilder.group({
          id: [field.id],
          name: [field.name],
          type: [field.type],
          nullable: [field.nullable],
          indexType: [field.indexType]
        });
    }

    addField() {
        const fieldsArray = this.form?.get('fields') as FormArray;
        const newField = this.createFieldGroup({ 
            id: fieldsArray.length,
            name: `field_${fieldsArray.length}`,
            type: 'bigint',
            nullable: false,
            indexType: 'none'
         }); 
        fieldsArray.push(newField);
      }

      subscribeToFormChanges() {
        this.form?.valueChanges
        .pipe(
          distinctUntilChanged(),
          debounceTime(500),
        )
        .subscribe((data: Table) => {
          const newTable = data;
          this.store.dispatch(updateTable({table: {...newTable, id: this.table.id}}));
        });
      }

      deleteTable() {
        this.store.dispatch(deleteTable({id: this.table.id}))
      }

      deleteField(i: number) {
        debugger;
        const fieldsArray = this.form?.get('fields') as FormArray;
        fieldsArray.removeAt(i);

      }
}
