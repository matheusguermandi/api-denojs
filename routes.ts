import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/user", (context) => {
  const user = {
    name: "Matheus Guermandi",
    email: "matheus_guermandi@hotmail.com",
  };
  context.response.body = user;
});

router.get("/user/:id", (context) => {
  context.response.body = context.params.id;
});

router.post("/user", async (context) => {
  const { value } = await context.request.body();

  context.response.status = 201;
  context.response.body = value;
});

export default router;