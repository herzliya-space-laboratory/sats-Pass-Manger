export default function formatQueryAndGetPagination(query, totalElements?)
{
    let pagination;
    if(totalElements)
        pagination = FormatPagination(query, totalElements);
    
    let params = moveTheSearchParamsFromTheQueryToNewObject(query);
    const formatQuery = addDollarSignAtTheBeginingOfAllTheQuryComparisonOperators(query);
     
    params.limit = parseInt(params.limit, 10) || undefined;
    params.skip = (params.page - 1) * params.limit || undefined;
    return {pagination, params, formatQuery};

}


function FormatPagination(query, total)
{
    if(!query) return {};

    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 100;

    const endIndex = (page * limit);
    const startIndex = (page - 1) * limit;
    const pagination:any = {page, limit};

    if(endIndex < total) 
        pagination.next = {page: page + 1, limit: limit * (page + 1)}
    
    if(startIndex > 0) 
        pagination.previous = {page: page - 1, limit: limit * (page - 1)}

    pagination.last = {page: Math.floor(total/limit) + 1, limit: total}
    return pagination;

}

function moveTheSearchParamsFromTheQueryToNewObject(query) {
    let params:any = {};
    const fieldsToExclude = ["select", "sort", "limit", "page"];
    
    fieldsToExclude.forEach(field => {
        params[field] = query[field] || "";
        delete query[field];
    });

    if(params.sort === "") params.sort = "-createdAt";

    return params;
}

function addDollarSignAtTheBeginingOfAllTheQuryComparisonOperators(query: any) {
    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = JSON.parse(queryStr);
    return query;
}

