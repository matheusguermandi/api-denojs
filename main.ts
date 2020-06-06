import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import token from "./util/token.ts";

import router from "./routes.ts";
import notFound from "./404.ts";

const app = new Application();

const env = config();

const HOST = env.APP_HOST || "http://localhost";
const PORT = +env.APP_PORT || 4000;

app.use(router.routes());

app.use(async (context: any, next) => {
  const authorization = context.request.headers.get("authorization");
  if (!authorization) {
    context.response.status = 401; //Unauthorized
    context.response.body = {
      error: " Unauthorized - 0",
    };
    return;
  }

  const headerToken = authorization.replace("authorization ",'');

  const isTokenValid = await token.validate(headerToken);

  if (!isTokenValid) {
    context.response.status = 401; //Unauthorized
    context.response.body = {
      error: " Unauthorized - 1",
    };
    return;
  }
  await next();
});

app.use((context: any) => {
  context.response.body = "Protected routes";
});

app.use(notFound);

console.log(`server started at ${HOST}:${PORT}`);

await app.listen({ port: PORT });
