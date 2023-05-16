export class Table {
    tableN = '';
    fields: Field[] = []

    constructor(index: number) {
        this.tableN = `table_${index}`
        this.fields.push({
            name: 'id',
            type: 'number',
            nullable: false,
            indexType: 'primaryKey'
        })
    }
}

export interface Field {
    name: string;
    type: string;
    nullable: boolean;
    indexType: string;

}