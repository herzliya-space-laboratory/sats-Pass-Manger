import { formatQueryForMoongose, formatPagination, formatPaginationToPouplated } from "../../src/utils/queryFormater";

test('test empty empty input return defualt object', () => {
    const input = {};
    const output = formatQueryForMoongose(input);

    expect(output).toEqual({
         params: {
            page: "",
            select: "",
            sort: "-createdAt"
        },
        formatQuery: {}
    });
})

test('test query input with qury parmetrs return defualt params + formt query', () => {
    const input = {query1: 5, query2: -10, query3: "abhd", query4: true};
    const output = formatQueryForMoongose(input);

    expect(output).toEqual({
         params: {
            page: "",
            select: "",
            sort: "-createdAt"
        },
        formatQuery: {query1: 5, query2: -10, query3: "abhd", query4: true}
    });
})

test('test query input with query format', () => {
    const input = {limit: "5", select: "query1,query2,query3", page: "9", sort:"-query1"};
    const output = formatQueryForMoongose(input);

    expect(output).toEqual({
         params: {
            limit: 5,
            page: "9",
            skip: 40,
            select: "query1,query2,query3",
            sort: "-query1"
        },
        formatQuery: {}
    });
})

test('test query input with pages format', () => {
    const input_query = {limit: "5", page: "9"};
    const input_Amount = 150;
    let output:any = formatQueryForMoongose(input_query);
    output.pagination = formatPagination(input_query, input_Amount);

    expect(output).toEqual({
        pagination: {
            next: {page: 9 + 1, limit: 5 * (9 + 1)}, 
            previous: {page: 9 - 1, limit: 5 * (9 - 1)}, 
            last: {page: Math.floor(input_Amount/5) + 1, limit: input_Amount},
            page: 9,
            limit: 5
        },
         params: {
            limit: 5,
            page: "9",
            skip: 40,
            select: "",
            sort: "-createdAt"
        },
        formatQuery: {}
    });
})

test('test query input with lte and gt format', () => {
    const input_query = {query1: {lte: 8}, query2: {gt: 1}};
    const output = formatQueryForMoongose(input_query);

    expect(output).toEqual({
         params: {
            limit: undefined,
            page: "",
            select: "",
            sort: "-createdAt"
        },
        formatQuery: {query1: {$lte: 8}, query2: {$gt: 1}}
    });
})

test('test query imput for a pouplated fields params', () =>  {

    const expectedRes = {
        params:{ 
            pass: {
                limit: 5,
                page: 10,
                sort: "-startTime",
                skip: 50
            },
            Satllite: {
                sort: "SatId"
            }, 
            limit: undefined,
            page: "",
            select: "",
            sort: "-createdAt"
        },
        formatQuery: {}
    }

    const input_query = {
        "sort.pass": "-startTime",
        "limit.pass": 5, 
        "page.pass": 10, 
        "sort.Satllite": "SatId"
    };

    const output = formatQueryForMoongose(input_query);

    expect(output).toEqual(expectedRes);
})

test('test query input with pouplated fields and pages format', () => {

    const input_query = {
        "limit.pass": 5, 
        "page.pass": 10, 
        "limit.Satllite": 5,
        "page.Satllite": 0,
        "limit.users": 5,
        "page.users": 100,
    };

    const expectedRes = {
        pagination: {
            pass: {
                next: {page: 10 + 1, limit: 5 * (10 + 1)}, 
                previous: {page: 10 - 1, limit: 5 * (10 - 1)}, 
                last: {page: Math.floor(300/5) + 1, limit: 300},
                page: 10,
                limit: 5
            },
            Satllite: {
                next: {page: 0 + 1, limit: 5 * (0 + 1)}, 
                last: {page: Math.floor(10/5) + 1, limit: 10},
                page: 0,
                limit: 5
            },
            users: {
                previous: {page: 100 - 1, limit: 5 * (100 - 1)}, 
                last: {page: Math.floor(102/5) + 1, limit: 102},
                page: 100,
                limit: 5
            },
        },
        params:{ 
            pass: {
                limit: 5,
                page: 10,
                skip: 50
            },
            Satllite: {
                limit: 5,
                page: 0
            }, 
            users: {
                limit: 5,
                page: 100,
                skip: 500
            },
            limit: undefined,
            page: "",
            select: "",
            sort: "-createdAt"
        },
        formatQuery: {}
    };

    const ObjectToCountFrom = {
        pass: { length: 300},
        Satllite: { length: 10},
        users: { length: 102 }
    };

    let output:any = formatQueryForMoongose(input_query);
    output.pagination = formatPaginationToPouplated(output.params, ObjectToCountFrom);
    
    expect(output).toEqual(expectedRes);
})