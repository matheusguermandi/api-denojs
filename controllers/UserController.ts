import db from "../config/databases.ts";
import validation from '../validation.ts'

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
    const value = await validation.validate(context)


    if(value){
      const insertIn = await user.insertOne(value);
      context.response.status = 201;
      context.response.body = insertIn;
    }
  },

  async update(context: any) {
    if (!context.request.hasBody) {
      context.response.status = 400; //bad request
      context.response.body = { error: "Please provide the required data" };

      return;
    }

    const { value } = await context.request.body();

    const data = {
      email: value.email,
      name: value.name,
      password: value.password,
    };

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
      context.response.body = {
        error: { message: "Password fiel is required" },
      };

      return;
    }

    await user.updateOne({ _id: { $oid: context.params.id } }, { $set: value });

    context.response.status = 200;
    context.response.body = { message: "successfully updated" };
  },

  async destroy(context: any) {
    await user.deleteOne({ _id: { $oid: context.params.id } });

    context.response.status = 204; // no content
  },
};
