import { Application } from "https://deno.land/x/oak/mod.ts"

const app = new Application();

app.use((ctx) => {
    ctx.response.body = "Hello Deno From OAK";
});

console.log("server started at http://localhost:4000");

await app.listen({ port: 4000});