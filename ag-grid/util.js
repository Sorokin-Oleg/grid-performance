class ColumnsGenerator {
    columns = {
        id: { field : 'id', headerName : 'Id', width : 100 },
        firstName: { field : 'firstName', headerName : 'First name', width : 130 },
        surname: { field : 'surname', headerName : 'Surname', width : 130 },
        city: { field : 'city', headerName : 'City', width : 150 },
        age: { field : 'age', headerName : 'Age', width : 100 },
        color: {
            field : 'color',
            headerName : 'Color',
            width : 120,
            cellStyle : params => ({ backgroundColor : params.value })
        },
        score: {
            field : 'score', headerName : 'Score', width : 120, cellRenderer({ value }) {
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
        start: { field : 'start', headerName : 'Start', width : 120, type: 'dateColumn' },
        done: {
            field : 'done',
            headerName : 'Done',
            width : 90,
            cellRenderer : params => params.value ? 'Yes' : 'No'
        },
        rating: { field : 'rating', headerName : 'Rating', width : 90 },
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
