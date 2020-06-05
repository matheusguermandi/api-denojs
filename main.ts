import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import router from "./routes.ts";
import notFound from "./404.ts";

const app = new Application();

const env = config();

const HOST = env.APP_HOST || "http://localhost";
const PORT = +env.APP_PORT || 4000;

app.use(router.routes());
app.use(async (context: any, next) => {
  const token = context.request.headers.get("authorization");

  if (!token) {
    await next();
    return;
  }
});

app.use(notFound);

console.log(`server started at ${HOST}:${PORT}`);

await app.listen({ port: PORT });
