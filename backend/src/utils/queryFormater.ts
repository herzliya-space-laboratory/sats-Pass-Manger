export function formatQueryForMoongose(query)
{    
    let formatQuery = {...query};
    let params = moveTheSearchParamsFromTheQueryToNewObject(formatQuery);
    formatQuery = addDollarSignAtTheBeginingOfAllTheQuryComparisonOperators(formatQuery);

    populatedParams(formatQuery, params);

    params.limit = parseInt(params.limit, 10) || undefined;
    if(params.page && params.limit)
        params.skip = (params.page - 1) * params.limit;

    return {params, formatQuery};
}


export function formatPagination(query, total:number)
{
    const page = parseInt(query.page, 10);
    const limit = parseInt(query.limit, 10);

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

export function formatPaginationToPouplated(query, notCutObject:object)
{
    query = {...query};

    query = Object.keys(query).reduce((res, q) => {
        if(typeof query[q] === 'object' && query[q] !== null)
            res[q] = query[q]; 
        return res;
    }, {});

    return Object.keys(query).reduce( (AllPagination:any, key) =>
    {
        const total = notCutObject[key].length;

        AllPagination[key] = formatPagination(query[key], total);
        return AllPagination;
    }, {});
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


function populatedParams(query, params) {
    const PopulatedParams = extractThePopulatedQueryParametersFromTheQuery(query); 

    PopulatedParams.forEach(addPopulatedFieldAToThePopulatedObject);

    
    addSkipToThePopulatedParamsWereNedded(params);

    function addPopulatedFieldAToThePopulatedObject(field){
        const [populatedFieldQueryParameter, populatedField] = field.split('.');
        params[populatedField] = params[populatedField] || {};
        params[populatedField][populatedFieldQueryParameter] = query[field];
        delete query[field];
    }   
}

function extractThePopulatedQueryParametersFromTheQuery(query: any) {
    const fieldsToExclude = ["select", "sort", "limit", "page"];
    const fileldsREGEX = new RegExp(fieldsToExclude.join("|"));
    const PopulatedParams = Object.keys(query).filter(field => fileldsREGEX.test(field));
    return PopulatedParams;
}

function addSkipToThePopulatedParamsWereNedded(params: any) {
    Object.keys(params).forEach(field => {
        if (params[field].page)
            params[field].skip = params[field].page * params[field].limit;
    });
}
