const indexRouter = require("../routes/indexRoutes");
const cors = require("cors");
const request = require("supertest");
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", indexRouter);

// SETTING #3: Gamerverse Character Coordinate Validation Testing
describe("wrong coordinates on character #1 on setting #1 ", () => {
  test("wrong random coordinates #1 on photo #1", (done) => {
    request(app)
      .post("/photos/1")
      .type("json")
      .send({ coordinates: { x: "87", y: "705" }, characterId: 1 })
      .expect(404, done);
  });
  test("wrong random coordinates #2 on photo #1", (done) => {
    request(app)
      .post("/photos/1")
      .type("json")
      .send({ coordinates: { x: "100", y: "500" }, characterId: 1 })
      .expect(404, done);
  });
  test("wrong coordinates that is near click coordinates #1 on photo #1", (done) => {
    request(app)
      .post("/photos/1")
      .type("json")
      .send({ coordinates: { x: "38", y: "312" }, characterId: 1 })
      .expect(404, done);
  });
  test("wrong coordinates that is near click coordinates #2 on photo #1", (done) => {
    request(app)
      .post("/photos/1")
      .type("json")
      .send({ coordinates: { x: "97", y: "406" }, characterId: 1 })
      .expect(404, done);
  });
});

describe("correct coordinates on character #1 on setting #1", () => {
  test("correct coordinates on top edge", (done) => {
    request(app)
      .post("/photos/1")
      .type("json")
      .send({ coordinates: { x: "66.3", y: "316.72" }, characterId: 1 })
      .expect(200, done);
  });
  test("correct coordinates on bottom edge", (done) => {
    request(app)
      .post("/photos/1")
      .type("json")
      .send({ coordinates: { x: "75.41", y: "402.69" }, characterId: 1 })
      .expect(200, done);
  });
  test("correct coordinates on right edge", (done) => {
    request(app)
      .post("/photos/1")
      .type("json")
      .send({ coordinates: { x: "95", y: "405.69" }, characterId: 1 })
      .expect(200, done);
  });
  test("correct coordinates on left edge", (done) => {
    request(app)
      .post("/photos/1")
      .type("json")
      .send({ coordinates: { x: "39", y: "313.7" }, characterId: 1 })
      .expect(200, done);
  });
});
