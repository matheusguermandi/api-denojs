import token from "../util/token.ts";

export default {
  async authorized(context: any, next: any) {
    const authorization = context.request.headers.get("authorization");
    if (!authorization) {
      context.response.status = 401; //Unauthorized
      context.response.body = {
        error: " Unauthorized",
      };
      return;
    }

    const headerToken = authorization.replace("authorization ", "");

    const isTokenValid = await token.validate(headerToken);

    if (!isTokenValid) {
      context.response.status = 401; //Unauthorized
      context.response.body = {
        error: " Unauthorized",
      };
      return;
    }
    await next();
  },
};
