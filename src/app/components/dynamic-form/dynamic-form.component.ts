import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Field, Table } from 'src/app/models/table';

@Component({
  selector: 'app-dynamic-form-component',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
    form: FormGroup | undefined;
    @Input() table: Table | undefined;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            tableN: new FormControl(this.table?.tableN),
            fields: this.formBuilder.array( this.table ?
                this.table.fields.map((field) => this.createFieldGroup(field)) :
                []
              )            
        });
    }

    get fields() {
        return this.form?.controls["fields"] as FormArray;
    }


    private createFieldGroup(field: Field): FormGroup {
        return this.formBuilder.group({
          name: [field.name],
          type: [field.type],
          nullable: [field.nullable],
          indexType: [field.indexType]
        });
    }

    addField() {
        const fieldsArray = this.form?.get('fields') as FormArray;
        const newField = this.createFieldGroup({ 
            name: `field_${fieldsArray.length}`,
            type: '',
            nullable: false,
            indexType: ''
         }); 
        fieldsArray.push(newField);
      }

      
  
}
