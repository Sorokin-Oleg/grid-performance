class ColumnsGenerator {
    columns = {
        id: { id : 'id', header : [{ text : 'Id' }], width : 100 },
        firstName: { id : 'firstName', header : [{ text : 'First name' }], width : 130 },
        surname: { id : 'surname', header : [{ text : 'Surname' }], width : 130 },
        city: { id : 'city', header : [{ text : 'City' }], width : 150 },
        age: { id : 'age', header : [{ text : 'Age' }], width : 100 },
        color: {
            id : 'color',
            header : [{ text : 'Color' }],
            width : 120,
            template : value => `<div style="width:100%;height:100%;background-color: ${value}">${value}</div>`,
            htmlEnable: true,
        },
        score: {
            id : 'score', header : [{ text : 'Score' }], width : 120, template(value) {
                return `
                <div style="
                    width : ${value / 10}%;
                    background-color: blue;
                    height : 3px;
                    position: absolute;
                    top: 0;
                    left :0;
                    "></div>
                ${value}
                `;
            },
            htmlEnable: true,
        },
        start: {
            id : 'start',
            header : [{ text : 'Start' }],
            width : 120,
            type : 'date',
            format: "%Y-%m-%d"
        },
        done: {
            id : 'done',
            header : [{ text : 'Done' }],
            width : 90,
            template : value => value ? 'Yes' : 'No',
        },
        rating: { id : 'rating', header : [{ text : 'Rating' }], width : 90 },
    };

    defaultColumns = Object.values(this.columns);

    getDefaultColumns() {
        return this.defaultColumns.map(col => col);
    }

    /**
     * @param {Number} count Number of columns to create
     */
    getSomeColumns(count) {
        const columns = [];
        let lengthCount = 0;

        for (let index = 0; index < +count; index++) {
            if (lengthCount > this.defaultColumns.length - 1) lengthCount = 0;
            columns.push(this.defaultColumns[lengthCount]);
            lengthCount++;
        }

        return columns;
    }

    /**
     * @param {Object} defineColumns Object, where the name of the column is the key, the number of columns is the value
     */
    getDefinedColumns(definedColumns) {
        const columns = [];
        Object.entries(definedColumns).map(([key, count]) => {
            if (this.columns[key] && count !==0) {
                for (let index = 0; index < count; index++) {
                    columns.push(this.columns[key]);
                }
            }
        });
        return columns;
    }
}

export default new ColumnsGenerator();
