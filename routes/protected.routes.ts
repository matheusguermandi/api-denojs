import { Router } from "https://deno.land/x/oak/mod.ts";
import token from "../util/token.ts";

const protectedRouter = new Router();

protectedRouter.get("/protected", (context: any) => {
  const authorization = context.request.headers.get("authorization");
  const headerToken = authorization.replace("authorization ", "");

  const payload = token.fetchUserId(headerToken);

  if(payload){
    console.log(payload.uid);
  }
  

  context.response.body = "I am protected route";
});

export default protectedRouter;
