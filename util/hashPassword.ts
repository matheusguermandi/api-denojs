import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

interface IDataVerify {
  hash: string;
  text: string;
}

export default {
  async bcrypt(stringToHash: string): Promise<string> {
    const hash = await bcrypt.hash(stringToHash);
    return hash;
  },

  async verify({ hash, text }: IDataVerify): Promise<Boolean> {
    const result = await bcrypt.compare(text, hash);

    return result;
  },
};
