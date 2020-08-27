const sub = require("../sub")
test("yarn test", ()=>{
    expect(sub(1,2)).toBe(-1);
    expect(sub(89,17)).toBe(72);
})
