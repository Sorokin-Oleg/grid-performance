class ColumnsGenerator {
    columns = {
        id: { dataIndex : 'id', text : 'Id', width : 100, sortable: false, resizable: false, },
        firstName: { dataIndex : 'firstName', text : 'First name', width : 130, sortable: false, resizable: false, },
        surname: { dataIndex : 'surname', text : 'Surname', width : 130, sortable: false, resizable: false, },
        city: { dataIndex : 'city', text : 'City', width : 150, sortable: false, resizable: false, },
        age: { dataIndex : 'age', text : 'Age', width : 100, sortable: false, resizable: false, },
        color: {
            dataIndex : 'color',
            text : 'Color',
            width : 120,
            renderer(value, metaData) {
                metaData.tdStyle = `background-color: ${value}`;
                return value;
            },
            sortable: false,
            resizable: false,
        },
        score: {
            dataIndex : 'score',
            text : 'Score',
            width : 120,
            renderer(score) {
                return `
            <div style="
                width : ${score / 10}%;
                background-color: blue;
                height : 3px;
                position: absolute;
                top: 0;
                left :0;
                "></div>
            ${score}
            `
            },
            sortable: false,
            resizable: false,
        },
        start: { dataIndex : 'start', text : 'Start', width : 120, xtype : 'datecolumn', sortable: false, },
        done: {
            dataIndex : 'done',
            text : 'Done',
            width : 90,
            renderer : (value) => value ? 'Yes' : 'No',
            sortable: false,
            resizable: false,
        },
        rating: { dataIndex : 'rating', text : 'Rating', width : 90, sortable: false, resizable: false, },
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
