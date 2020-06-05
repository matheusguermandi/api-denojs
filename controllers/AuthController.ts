import db from "../config/databases.ts";
import hash from "../util/hashPassword.ts";
import validation from "../validation.ts";

const userCollection = db.collection("users");

export default {
  async login(context: any) {
    const value = await validation.validateLogin(context);

    if (value) {
      const user = await userCollection.findOne({ email: value.email });
      context.response.body = user;
    }

   
  },
};
