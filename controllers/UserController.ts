import { ObjectId } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

import db from "../config/databases.ts";
import validation from "../validation.ts";

const user = db.collection("users");

export default {
  async index(context: any) {
    const data = await user.find();
    context.response.body = data;
  },

  async show(context: any) {
    try {
      const data = await user.findOne({
        _id: ObjectId(context.params.id),
      });
      context.response.body = data;
    } catch (error) {
      context.response.status = 404;
      context.response.body = { error: "User does't exist in our database" };
    }
  },

  async store(context: any) {
    const value = await validation.validate(context);

    value.created_at = parseInt((new Date().getTime() / 1000).toString());

    if (value) {
      const insertIn = await user.insertOne(value);
      context.response.status = 201;
      context.response.body = insertIn;
    }
  },

  async update(context: any) {
    const value = await validation.validateUpdate(context);

    if (value) {
      const data = {
        email: value.email,
        name: value.name,
        password: value.password,
      };

      try {
        await user.updateOne(
          { _id: ObjectId(context.params.id) },
          { $set: value },
        );
        context.response.status = 200;
        context.response.body = { message: "successfully updated" };
      } catch (error) {
        context.response.status = 404;
        context.response.body = { error: "User does't exist in our database" };
      }
    }
  },

  async destroy(context: any) {
    try {
      await user.deleteOne({ _id: ObjectId(context.params.id) });
      context.response.status = 204; // no content
    } catch (error) {
      context.response.status = 404;
      context.response.body = { error: "User does't exist in our database" };
    }
  },
};
