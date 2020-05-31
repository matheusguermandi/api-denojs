export default {
  index(context: any) {
    const user = {
      name: "Matheus Guermandi",
      email: "matheus_guermandi@hotmail.com",
    };
    context.response.body = user;
  },

  show(context: any) {
    context.response.body = context.params.id;
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
