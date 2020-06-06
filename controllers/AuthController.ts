import db from "../config/databases.ts";
import hash from "../util/hashPassword.ts";
import validation from "../validation.ts";
import token from "../util/token.ts"

const userCollection = db.collection("users");

export default {
  async login(context: any) {
    const value = await validation.validateLogin(context);

    if (!value) {
      context.response.status = 422;
      context.response.body = { error: "Please provider required data" };
      return;
    }

    const user = await userCollection.findOne({ email: value.email });

    if (!user) {
      context.response.status = 422;
      context.response.body = {
        error: "Credentials doesn't match out record",
      };
      return;
    }

    const passwordMatched = await hash.verify(user.password, value.password);

    if (!passwordMatched) {
      context.response.status = 422;
      context.response.body = {
        error: "Password is incorrect",
      };
      return;
    }

    context.response.body = token.generate(user._id.$oid);

  },
};
