import Api from "..";
import {
  Category,
  GeneralCreateResponse,
  GeneralQuery,
  LoginResponse,
  Order,
  PaymentInitiationData,
  Product,
  Review,
} from "../../types";

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

  public makeOrder = async (
    data: unknown,
  ): Promise<GeneralCreateResponse<Order>> =>
    await this.api.post("/orders/make", data);

  public makePayment = async (
    data: unknown,
  ): Promise<GeneralCreateResponse<PaymentInitiationData>> =>
    await this.api.post("/orders/make-payment", data);

  public login = async (data: unknown): Promise<LoginResponse> =>
    await this.api.post("/accounts/auth", data);
}

const actions = new Actions();

export default actions;
