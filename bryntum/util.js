class ColumnsGenerator {
    columns = {
        id: { field : 'id', text : 'Id', width : 100 },
        firstName: { field : 'firstName', text : 'First name', width : 130 },
        surname: { field : 'surname', text : 'Surname', width : 130 },
        city: { field : 'city', text : 'City', width : 150 },
        age:  { field : 'age', text : 'Age', width : 100 },
        color: {
            field    : 'color',
            text     : 'Color',
            width    : 120,
            renderer : ({ value, cellElement }) => cellElement.style.backgroundColor = value
        },
        score: {
            field      : 'score',
            text       : 'Score',
            width      : 120,
            htmlEncode : false,
            renderer({ value }) {
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
            }
        },
        start: { field : 'start', text : 'Start', width : 120, type : 'date', format : 'YYYY-MM-DD' },
        done: { field : 'done', text : 'Done', width : 90, renderer : ({ value }) => value ? 'Yes' : 'No' },
        rating: { field : 'rating', text : 'Rating', width : 90 },
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
