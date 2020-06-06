import token from "../util/token.ts";

export default {
  async authorized(context: any, next: any) {
    const authorization = context.request.headers.get("authorization");
    if (!authorization) {
      context.response.status = 401; //Unauthorized
      context.response.body = {
        error: " Unauthorized - No token found",
      };
      return;
    }

    const headerToken = authorization.replace("authorization ", "");
   
    const isTokenValid = await token.validate(headerToken);

    // console.log(headerToken + ' - | - ' + isTokenValid);

    if (!isTokenValid) {
      context.response.status = 401; //Unauthorized
      context.response.body = {
        error: " Unauthorized - Token invalid",
      };
      return;
    }
    await next();
  },
};
