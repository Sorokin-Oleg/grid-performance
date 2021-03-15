class ColumnsGenerator {
    columns = {
        id: { dataField : 'id', caption : 'Id', width : 100 },
        firstName: { dataField : 'firstName', caption : 'First name', width : 130 },
        surname: { dataField : 'surname', caption : 'Surname', width : 130 },
        city: { dataField : 'city', caption : 'City', width : 150 },
        age: { dataField : 'age', caption : 'Age', width : 100 },
        color: {
            dataField : 'color',
            caption : 'Color',
            width : 120,
            cellTemplate : (element, info) => element.text(info.text).css('background-color', info.text)
        },
        score: {
            dataField : 'score',
            caption : 'Score',
            width : 120,
            cellTemplate(element, info) {
                element.append(`
                <div style="
                    width : ${info.text / 10}%; 
                    background-color: blue; 
                    height : 3px;
                    position: absolute;
                    top: 0;
                    left :0;
                    "></div>
                ${info.text}
                `).css('position', 'relative');
            }
        },
        start: { dataField : 'start', caption : 'Start', width : 120, dataType : 'date' },
        done: { dataField : 'done', caption : 'Done', width : 90, dataType : 'text', customizeText : ({ value }) => value ? 'Yes' : 'No' },
        rating: { dataField : 'rating', caption : 'Rating', width : 90 },
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
