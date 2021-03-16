import BaseColumnsGenerator from "../util/columnGenerator.js";

class ColumnsGenerator extends BaseColumnsGenerator {

    getColumnData(count) {
        const def = typeof count === "undefined";
        return {
            id: { dataIndex : def ? 'id' : 'id' + count, text : 'Id', width : 100, sortable: false, resizable: false, },
            firstName: { dataIndex : def ? 'firstName' : 'firstName' + count, text : 'First name', width : 130, sortable: false, resizable: false, },
            surname: { dataIndex : def ? 'surname': 'surename' + count, text : 'Surname', width : 130, sortable: false, resizable: false, },
            city: { dataIndex : def ? 'city': 'city' + count, text : 'City', width : 150, sortable: false, resizable: false, },
            age: { dataIndex : def ? 'age' : 'age' + count, text : 'Age', width : 100, sortable: false, resizable: false, },
            color: {
                dataIndex : def ? 'color' : 'color' + count,
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
                dataIndex : def ? 'score' : 'score' + count,
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
            start: { dataIndex : def ? 'start': 'start' + count, text : 'Start', width : 120, xtype : 'datecolumn', sortable: false, },
            done: {
                dataIndex : def ? 'done' : 'done' + count,
                text : 'Done',
                width : 90,
                renderer : (value) => value ? 'Yes' : 'No',
                sortable: false,
                resizable: false,
            },
            rating: { dataIndex : def ? 'rating' : 'rating' + count, text : 'Rating', width : 90, sortable: false, resizable: false, },
        }
    }
}

export default new ColumnsGenerator();
