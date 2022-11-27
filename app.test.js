const request = require("supertest");

const app = require("./app").app;

it("should return Hello Test", function (done) {

    request(app)
        .get("/hello")
        .expect("Hello Test!")
        .end(done);
});