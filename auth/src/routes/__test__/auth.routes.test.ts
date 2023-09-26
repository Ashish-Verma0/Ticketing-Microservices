import request from "supertest";
import app from "../../app";

it("returns a 201 on successful signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "ashish",
      email: "av847701234@gmail.com",
      password: "123456",
    })
    .expect(201);
});

it("returns a 409 on duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "ashish",
      email: "av847701234@gmail.com",
      password: "123456",
    })
    .expect(201);
  return await request(app)
    .post("/api/users/signup")
    .send({
      name: "ashish",
      email: "av84770123@gmail.com", // Existing email address in your database
      password: "123456",
    })
    .expect(409);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      name: "ashish",
      email: "test",
      password: "123456",
    })
    .expect(400);
});

it("returns a 403 with empty details", async () => {
  return await request(app)
    .post("/api/users/signup")
    .send({
      name: "ashish",
      email: "",
      password: "",
    })
    .expect(403);
});

it("set a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      name: "ashish",
      email: "av847701234@gmail.com",
      password: "123456",
    })
    .expect(201);
  var token = response.get("Set-Cookie");
  console.log(token[0]);
  // Log the response headers
  await request(app)
    .post("/api/users/me")
    .set(token)
    .send({})
    .expect(200);
// Log the response headers
});

it("if email does not exist", async () => {
  return await request(app)
    .post("/api/users/login")
    .send({
      email: "nonexistent@gmail.com",
      password: "123456",
    })
    .expect(404);
});

it("if password does not match", async () => {
  return await request(app)
    .post("/api/users/login")
    .send({
      email: "av847701233@gmail.com", // Use an existing email
      password: "wrongpassword", // Provide a wrong password
    })
    .expect(404);
});

it("if successful login", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "ashish",
      email: "av847701234@gmail.com",
      password: "123456",
    })
    .expect(201);
  await request(app)
    .post("/api/users/login")
    .send({
      email: "av847701234@gmail.com",
      password: "123456",
    })
    .expect(200);
  // expect(response.body.status).toBe(200);
});
