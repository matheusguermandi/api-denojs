import db from "../config/databases.ts";

const user = db.collection("users");

export default {
  async index(context: any) {
    const data = await user.find();
    context.response.body = data;
  },

  async show(context: any) {
    const data = await user.findOne({
      _id: { $oid: context.params.id}
    })

    context.response.body = data;
  },

  async store(context: any) {
    const { value } = await context.request.body();

    context.response.status = 201;
    context.response.body = value;
  },

  update(context: any) {
      
  },

  destroy(context: any) {
      
  },


};
