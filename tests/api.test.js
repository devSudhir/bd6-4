const request = require("supertest");
const { app } = require("../index.js");
const { getAllBooks, getBookById, addBook } = require("../book.js");
const http = require("http");

jest.mock("../book.js", () => ({
  ...jest.requireActual("../book.js"),
  getAllBooks: jest.fn(),
  getBookById: jest.fn(),
  addBook: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3002, done);
});

afterAll((done) => {
  server.close(done);
});

describe("BOOK API TEST", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Return 404 if books not found", async () => {
    getAllBooks.mockReturnValue([]);
    const result = await request(server).get("/api/books");
    expect(result.status).toEqual(404);
    expect(result.body.error).toEqual("No books found!");
  });

  test("Return 404 if books not found by id", async () => {
    getBookById.mockReturnValue(null);
    const result = await request(server).get("/api/books/99");
    expect(result.status).toEqual(404);
    console.log(result);
    expect(result.text).toEqual("Invalid id! book not found");
  });
});
