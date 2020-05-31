import { Application } from "https://deno.land/x/oak/mod.ts";

import router from "./routes.ts";
import notFound from "./404.ts";


const app = new Application();

app.use(router.routes());

app.use(notFound);

console.log("server started at http://localhost:4000");

await app.listen({ port: 4000 });
