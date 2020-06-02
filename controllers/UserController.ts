import db from "../config/databases.ts";

const user = db.collection("users");

export default {
  async index(context: any) {
    const data = await user.find();
    context.response.body = data;
  },

  async show(context: any) {
    const data = await user.findOne({
      _id: { $oid: context.params.id },
    });

    context.response.body = data;
  },

  async store(context: any) {
    if (!context.request.hasBody) {
      context.response.status = 400; //bad request
      context.response.body = { error: "Please provide the required data" };

      return;
    }

    const { value } = await context.request.body();

    if (!value.email) {
      context.response.status = 422; // unprocessable entity
      context.response.body = { error: { message: "Email fiel is required" } };
      
      return;
    }

    if (!value.name) {
      context.response.status = 422; // unprocessable entity
      context.response.body = { error: { message: "Name fiel is required" } };
      
      return;
    }

    if (!value.password) {
      context.response.status = 422; // unprocessable entity
      context.response.body = { error: { message: "Password fiel is required" } };
      
      return;
    }

    const insertIn = await user.insertOne(value);

    context.response.status = 201;
    context.response.body = insertIn;
  },

  update(context: any) {
  },

  destroy(context: any) {
  },
};
