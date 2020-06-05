import { ObjectId } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

import db from "../config/databases.ts";
import validation from "../validation.ts";
import hash from "../util/hashPassword.ts";

const userCollection = db.collection("users");

export default {
  async index(context: any) {
    const data = await userCollection.find();
    context.response.body = data;
  },

  async show(context: any) {
    try {
      const data = await userCollection.findOne({
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

    value.password = await hash.bcrypt(value.password);

    if (value) {
      const insertIn = await userCollection.insertOne(value);
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
        await userCollection.updateOne(
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
      await userCollection.deleteOne({ _id: ObjectId(context.params.id) });
      context.response.status = 204; // no content
    } catch (error) {
      context.response.status = 404;
      context.response.body = { error: "User does't exist in our database" };
    }
  },
};
