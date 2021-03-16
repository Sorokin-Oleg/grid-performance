class BaseColumnsGenerator {
    getColumnData(count) {
        return {};
    }

    getDefaultColumns() {
        return Object.values(this.getColumnData()).map(col => col);
    }

    /**
     * @param {Object} defineColumns Object, where the name of the column is the key, the number of columns is the value
     */
    getDefinedColumns(definedColumns) {
        const columns = [];
        Object.entries(definedColumns).map(([key, count]) => {
            if (this.getColumnData()[key] && count !==0) {
                for (let index = 0; index < count; index++) {
                    columns.push({ ...this.getColumnData(index)[key], id: key + index });
                }
            }
        });
        return columns;
    }
}

export default BaseColumnsGenerator;
