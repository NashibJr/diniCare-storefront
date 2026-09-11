import Api from "..";
import { Category, GeneralQuery, Product } from "../../types";

class Actions {
  private api: Api;

  constructor() {
    this.api = new Api();
  }

  public getCategories = async (): Promise<Category[]> =>
    await this.api.get("/products/category/get");

  public getProducts = async (
    page: number = 1,
    limit: number = 100,
  ): Promise<GeneralQuery<Product>> =>
    await this.api.get(`/products/all?page=${page}&limit=${limit}`);
}

const actions = new Actions();

export default actions;
