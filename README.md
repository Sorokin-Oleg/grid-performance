# JavaScript data grid performance comparison

A performance comparison of seven popular JavaScript data grid components. Measures the initial rendering time and 
scroll performance for the following data grids:

* DHTMLX Grid (7.1.1), https://dhtmlx.com/docs/products/dhtmlxGrid/
* Ag-grid (cdn), https://www.ag-grid.com/
* Bryntum Grid (4.0.8 trial), https://www.bryntum.com/products/grid/
* Componentator j-DataGrid(cdn @18), https://componentator.com/components/j-datagrid/
* DevExtreme Grid (cdn 20.2.5), https://js.devexpress.com/Overview/DataGrid/ 
* Webix Grid (DataTable) (cdn), https://webix.com/widget/datatable/
* ExtJS Classic Grid (cdn 7.3.0), https://www.sencha.com/products/extjs/

To set each grid up, please see the README.md files in the corresponding folders.

## Methodology
To make comparison as fair as possible the following actions were taken:

* All grids have additional features (such as grouping, sorting) turned off.
* Two approaches to test datasets:
  * The same dataset consisting of an array of 10,000 JSON objects is used throughout (util/10000.json).
  * Auto generated dataset (the same columns, the same data types, but different data in cells) 
    to get any count of JSON objects (util/const.js, ROWS_COUNT for all grids  or generateData(count) 
    directly for every config). Datasets of 10 000, 100 000, 1 000 000 rows were tested. 
* Grids were configured with the same set of columns, with custom cell renderers matching each other as close as possible.
* Average measurements were taken from 5 times for a grid with locked/fixed/pinned columns and 5 times without
  (util/const.js, MEASURING_COUNT).
* All use the same size on their container: 1280 x 1024 px.
* Grid rows have same height (43px).
* Scrollbars where turned on.

Measurements where taken using the same approach and same code for the different grids:

* Timer for initial rendering started after page and data has loaded, before grid instance is created and populated with 
the data. Timer stopped when grid is completely rendered, which for some grids is a sync operation while others requires
listening for an event.
* Scroll FPS measured by using a JS frame counter and changing scroll programmatically. Time taken to reach a predefined 
scroll distance was measured and used to calculate an average FPS value.
* Page reloads a second after the measurement finished.
