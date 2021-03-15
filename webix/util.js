class ColumnsGenerator {
    dateFormat = webix.Date.dateToStr("%Y-%m-%d");
    columns = {
        id: { id : 'id', header : 'Id', width : 100 },
        firstName: { id : 'firstName', header : 'First name', width : 130 },
        surname: { id : 'surname', header : 'Surname', width : 130 },
        city: { id : 'city', header : 'City', width : 150 },
        age: { id : 'age', header : 'Age', width : 100 },
        color: {
            id        : 'color',
            header    : 'Color',
            css       : "no_padding_box",
            width     : 120,
            template  : obj => `<div style="background-color:${obj.color}">${obj.color}</div>`
        },
        score: {
            id         : 'score',
            header     : 'Score',
            width      : 120,
            css        : "relative_box",
            template   : obj => `
                <div style="
                    width : ${obj.score / 10}%; 
                    background-color: blue; 
                    height : 3px;
                    position: absolute;
                    top: 0;
                    left :0;
                    "></div>${obj.score}`
        },
        start: { id : 'start', header : 'Start', width : 120, format: this.dateFormat },
        done: { id : 'done', header : 'Done', width : 90, template : obj => obj.done ? 'Yes' : 'No' },
        rating: { id : 'rating', header : 'Rating', width : 90 },
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
