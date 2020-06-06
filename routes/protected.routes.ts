import { Router } from "https://deno.land/x/oak/mod.ts";
const protectedRouter = new Router();

protectedRouter.get("/protected", (context: any) => {
  context.response.body = "I am protected route";
});

export default protectedRouter;
