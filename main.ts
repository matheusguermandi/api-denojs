import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import usersRouter from "./routes/users.routes.ts";
import protectedRouter from "./routes/protected.routes.ts";

import notFound from "./404.ts";
import authMiddleware from "./middleware/auth.ts";

const app = new Application();

const env = config();

const HOST = env.APP_HOST || "http://localhost";
const PORT = +env.APP_PORT || 4000;

app.use(usersRouter.routes());

app.use((context, next) => authMiddleware.authorized(context, next));

app.use(protectedRouter.routes());

app.use(notFound);

console.log(`server started at ${HOST}:${PORT}`);

await app.listen({ port: PORT });
