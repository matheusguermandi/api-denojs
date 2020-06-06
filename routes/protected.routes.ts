import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
import token from "../util/token.ts";

import db from "../config/databases.ts"
const userCollection = db.collection("users");

const protectedRouter = new Router();

protectedRouter.get("/protected", async (context: any) => {
  const authorization = context.request.headers.get("authorization");
  const headerToken = authorization.replace("authorization ", "");

  const payload = token.fetchUserId(headerToken);

  if(payload){
    const uid: string = String(payload.uid);
    const user = await userCollection.findOne({_id: ObjectId(uid)});
    context.response.body = user;
  }
 
});

export default protectedRouter;
