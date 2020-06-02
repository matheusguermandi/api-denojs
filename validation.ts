export default {
  async validate(context: any) {
    let errors = [];
    let status;

    const { value } = await context.request.body();

    if (!value) {
      context.response.status = 400; //bad request
      context.response.body = { error: "Please provide the required data" };
      return false;
    }

    const fields = ["name", "email", "password"];

    for (let index = 0; index < fields.length; index++) {
      if (!value[fields[index]]) {
        status = 422; // unprocessable entity
        errors.push({ [fields[index]]: `${fields[index]} fiel is required` });
      }
    }

    if (status) {
      context.response.body = { errors };
      return false;
    }

    return value;
  },

  async validateUpdate(context: any) {
    const { value } = await context.request.body();

    if (!value || Object.keys(value).length === 0) {
      context.response.status = 400; //bad request
      context.response.body = { error: "Please provide the required data" };
      return false;
    }

    return value;
  },
};
