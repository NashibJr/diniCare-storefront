import Api from "..";
import { Category } from "../../types";

class Actions {
  private api: Api;

  constructor() {
    this.api = new Api();
  }

  public getCategories = async (): Promise<Category[]> =>
    await this.api.get("/products/category/get");
}

const actions = new Actions();

export default actions;
