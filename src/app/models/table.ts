export class Table {
    tableN = '';
    id = 0;
    fields: Field[] = []

    constructor(index: number) {
        this.id = index;
        this.tableN = `table_${index}`
        this.fields.push({
            id: 0,
            name: 'id',
            type: 'bigint',
            nullable: false,
            indexType: 'primarykey'
        })
    }
}

export interface Field {
    id: number;
    name: string;
    type: string;
    nullable: boolean;
    indexType: string;

}