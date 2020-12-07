const {client, createTable, addNewVisitor, viewVisitor, updateVisitor, deleteAVisitor, deleteAllVisitors, listAllVisitors} = require("../src/app");

describe("Client", function() {
  it("should check if the createTable is defined", function() {
    expect(createTable).toBeDefined();
  });
  it("should check if addVisitor is defined and called", function() {
    expect(addNewVisitor).toBeDefined();
  });
  it("should check if the addNewVisitor is not undefined", function() {
    expect(addNewVisitor).not.toBeUndefined();
  });
  it("should check if the viewVisitor is returning values", function() {
    spyOn(client,'query')
    viewVisitor();
    expect(client.query).toHaveBeenCalled();
  });
  it("should check if the deleteAVisitor is not null", function() {
    expect(deleteAVisitor).not.toBe(null);
  });
  it("should check if the updateVisitor is defined", function() {
    expect(updateVisitor).toBeDefined();
  });
  it("Should check if deleteAllVisitors function is defined", () => {
    expect(deleteAllVisitors).toBeDefined();
  });
  it("Should check if listAllVisitors is defined function is defined", () => {
    expect(listAllVisitors).toBeDefined();
  });
});