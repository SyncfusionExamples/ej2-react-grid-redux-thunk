import http from "../serverapi";
import axios from 'axios';

class orderDataService {
  getAll(gState) {
    debugger
    let cpage = (gState.skip/gState.take) +1; 
    let sortColumnName = ''
    let sortDirection =''

    let params= {
      _page: cpage,
      _limit: gState.take
    }
    // push the sorted columns
    if(gState.sorted){
      for(let i=gState.sorted.length; i>0; i--){
        let sortD = gState.sorted[i-1].direction == "ascending" ? 'asc':'desc';
        let sortCol = gState.sorted[i-1].name;
        sortColumnName = sortColumnName =='' ? sortCol: sortColumnName + ',' + sortCol;
        sortDirection  = sortDirection == ''?  sortD : sortDirection+ ',' + sortD;
      }
      params._sort = sortColumnName;
      params._order = sortDirection;
    }

    if(gState.where){
      let filterCol = gState.where[0].predicates;
      for(let i= 0 ; i< filterCol.length; i++){
        let optr = filterCol[i].operator == 'contains'? '_like' : filterCol[i].operator == 'greaterthan'? '_gte': filterCol[i].operator == 'lessthan'? '_lte' : '';
        params[filterCol[i].field + optr] = filterCol[i].value;
      }
    }
    return http.get("/orderdetails" ,
      {
      params
    });
  }


  create(data) {
    return http.post("/orderdetails", data);
  }

  update(id, data) {
    return http.put(`/orderdetails/${id}`, data);
  }

  remove(id) {
    debugger
    return http.delete(`/orderdetails/${id}`);
  }
}

export default new orderDataService();