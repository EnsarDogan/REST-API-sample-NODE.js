import supertest from "supertest";
import app from "../app.js";

const request = supertest(app);

describe("GET /movie", () => {
  test("The response should return 200 status code", async () => {
    const response = await request.get("/movie");
    expect(response.statusCode).toBe(200);
  });

  test("The response should respond the movie of id === 1 with 200 status code", async () => {
    const response = await request.get("/movie/1");
    expect(response.statusCode).toBe(200);
  });

  test("The ID of a movie should be unique. In that case it can not get and should return 404 status code", async () => {
    const response = await request.get("/movie/4444");
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe("Movie not found");
  });
});

describe("POST /movie", () => {
  test("The response should include title, director and release_date fields and should return 200 status code", async () => {
    const response = await request.post("/movie").send({
      title: "Truman Show",
      director: "Peter Weir",
      release_date: "1998",
    });
    expect(response.statusCode).toBe(200);
    expect(response.text).toBeDefined();
  });
  test("If the response does not include title, director and release_date fields it should return 404 status code", async () => {
    const response = await request.post("/movie").send({
      director: "Peter Weir",
      release_date: "1998",
    });
    expect(response.statusCode).toBe(400);
  });
});

describe("DELETE /movie", () => {
  test("If the given ID exists in the movies List it should return 200 status code", async () => {
    const response = await request.delete("/movie/1");
    expect(response.statusCode).toBe(200);
  });

  test("If the given ID does not exist in the movies List it should return 404 status code", async () => {
    const response = await request.delete("/movie/asfjk");
    expect(response.statusCode).toBe(404);
  });
});

describe("PATCH /movie", () => {
  test("If the given ID does not exist in the movies List it should return 404 status code", async () => {
    const response = await request.patch("/movie/asfjk");
    expect(response.statusCode).toBe(404);
  });
  test("If the request has fields without title and director and release_date fields it should return 400 status code", async () => {
    const response = await request
      .patch("/movie/2")
      .send({ starring: "Jim Carrey" });
    expect(response.statusCode).toBe(400);
  });
  test("The request should contain at least one fields from title or director or release_date if so it should return 200 status code", async () => {
    const response = await request
      .patch("/movie/2")
      .send({ title: "The Truman Show" });
    expect(response.statusCode).toBe(200);
  });
});

describe("PUT /movie", () => {
  test("If the given ID does not exist in the movies List it should return 404 status code", async () => {
    const response = await request.put("/movie/asfjk");
    expect(response.statusCode).toBe(404);
  });
  test("If the request does not contain title and director and release_date fields it should return 400 status code", async () => {
    const response = await request
      .put("/movie/2")
      .send({ title: "The Truman Show" });
    expect(response.statusCode).toBe(400);
  });
  test("The request should contain title and director and release_date fields if so it should return 200 status code", async () => {
    const response = await request.put("/movie/2").send({
      title: "Truman Show",
      director: "Peter Weir",
      release_date: "1998",
    });
    expect(response.statusCode).toBe(200);
  });
});
