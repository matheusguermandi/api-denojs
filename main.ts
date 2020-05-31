import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

const router = new Router();

router.get("/user", (context) => {
  const user = {
    name: "Matheus Guermandi",
    email: "matheus_guermandi@hotmail.com",
  };
  context.response.body = user;
});

router.post("/user", async (context) => {
  const { value } = await context.request.body();

  context.response.status = 201;
  context.response.body = value;
});

app.use(router.routes());

app.use((context) => {
  context.response.body = "Hello Deno From OAK";
});

console.log("server started at http://localhost:4000");

await app.listen({ port: 4000 });
