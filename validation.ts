export default {
  async validate(context: any) {
    const { value } = await context.request.body();

    if (!value) {
      context.response.status = 400; //bad request
      context.response.body = { error: "Please provide the required data" };
      return;
    }

    const fields = ["name", "email", "password"];

    for (let index = 0; index < fields.length; index++) {
      if (!value[fields[index]]) {
        context.response.status = 422; // unprocessable entity
        context.response.body = {
          error: { message: `${fields[index]} fiel is required` },
        };

        return false;
      }
    }

    return value;
  },
};
