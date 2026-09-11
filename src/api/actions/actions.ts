import Api from "..";
import { Category, GeneralQuery, Product, Review } from "../../types";

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
    category: string = "",
  ): Promise<GeneralQuery<Product>> =>
    await this.api.get(
      `/products/all?page=${page}&limit=${limit}&category=${category}`,
    );

  public getProductDetails = async (id: string): Promise<Product> =>
    await this.api.get(`/products/details/${id}`);

  public getReviews = async (
    page: number = 1,
    limit: number = 100,
    product?: string,
  ): Promise<GeneralQuery<Review>> =>
    await this.api.get(
      `/trcs/reviews/all?product=${product}&page=${page}&limit=${limit}`,
    );
}

const actions = new Actions();

export default actions;
