import { formatQueryForMoongose, formatPagination } from "../../src/utils/queryFormater";

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