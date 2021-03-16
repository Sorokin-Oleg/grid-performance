import BaseColumnsGenerator from "../util/columnGenerator.js";

class ColumnsGenerator extends BaseColumnsGenerator {

    getColumnData(count) {
        const def = typeof count === "undefined";
        return {
            id: { field : def ? 'id' : 'id' + count, headerName : 'Id', width : 100 },
            firstName: { field : def ? 'firstName' : 'firstName' + count, headerName : 'First name', width : 130 },
            surname: { field : def ? 'surname': 'surename' + count, headerName : 'Surname', width : 130 },
            city: { field : def ? 'city': 'city' + count, headerName : 'City', width : 150 },
            age: { field : def ? 'age' : 'age' + count, headerName : 'Age', width : 100 },
            color: {
                field : def ? 'color' : 'color' + count,
                headerName : 'Color',
                width : 120,
                cellStyle : params => ({ backgroundColor : params.value })
            },
            score: {
                field : def ? 'score' : 'score' + count, headerName : 'Score', width : 120, cellRenderer({ value }) {
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
            start: { field : def ? 'start': 'start' + count, headerName : 'Start', width : 120, type: 'dateColumn' },
            done: {
                field : def ? 'done' : 'done' + count,
                headerName : 'Done',
                width : 90,
                cellRenderer : params => params.value ? 'Yes' : 'No'
            },
            rating: { field : def ? 'rating' : 'rating' + count, headerName : 'Rating', width : 90 },
        }
    }
}

export default new ColumnsGenerator();
