import { serve } from "https://deno.land/std/http/server.ts"
import { validateJwt } from "https://deno.land/x/djwt/validate.ts"
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts"

const key = "87c96f50201c4cebe591339c3938d4e4"
const payload: Payload = {
  iss: "Matheus",
  exp: setExpiration(new Date().getTime() + 60000 * 60),
}
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
}

export default {
    generate(): string{
      return makeJwt({ header, payload, key })
    },

    async validate(token: string) {
      return await validateJwt(token, key, {isThrowing: false});
    }
}