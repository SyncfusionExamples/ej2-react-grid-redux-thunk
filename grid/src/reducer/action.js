import orderDataService from "../services/order"
export const Grid_Paging = "Grid_Paging";
export const Grid_Sorting = "Grid_Sorting";
export const Grid_Filtering = "Grid_Filtering";
export const Grid_Add = "Grid_Add";
export const Grid_Editing = "Grid_Editing";
export const Grid_Delete = "Grid_Delete";


export const getData = (gquery, gState) => async (dispatch) => {
    try {
        if (gState.action && gState.action == 'edit') {
            const updatedData = await orderDataService.update(gState.primaryKeyValue[0], gState.data)
            dispatch({
                type: Grid_Editing,
                payload: updatedData.data,
                gQuery: gquery,
                gState: gState,
                tCount: parseInt(updatedData.headers["x-total-count"]),
            })
        }
        if (gState.action && gState.action == 'add') {
            const addedData = await orderDataService.create(gState.data)
            dispatch({
                type: Grid_Add,
                payload: addedData.data,
                gQuery: gquery,
                gState: gState,
                tCount: parseInt(addedData.headers["x-total-count"]),
            })
        }
        if (gState.requestType && gState.requestType == 'delete') {
            const deletedData = await orderDataService.remove(gState.data[0]['id'])
            dispatch({
                type: Grid_Delete,
                payload: deletedData.data,
                gQuery: gquery,
                gState: gState,
                tCount: parseInt(deletedData.headers["x-total-count"]),
            })
        }
        else {
            const res = await orderDataService.getAll(gState);
            dispatch({
                type: Grid_Paging,
                payload: res.data,
                gQuery: gquery,
                gState: gState,
                tCount: parseInt(res.headers["x-total-count"]),
            })
        }
    } catch (error) {

    }

}