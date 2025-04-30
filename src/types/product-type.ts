export type IBrand = {
  name: string;
  id: string;
}

export type ICategory = {
  name: string;
  id: string;
}

export type IProductImg = string;

export type IAdditionalInformation = {
  id: string;
  title: string;
  description: string;
}

export type IType = {
  name?: string;
  id?: string;
}

export type IReviewUser = {
  _id: string;
  name: string;
  email: string;
}

export type IReview = {
  _id: string;
  userId: IReviewUser;
  productId: string;
  rating: number;
  comment: string;
  updatedAt: string;
  createdAt: string;
}

export interface IProduct {
  _id: string;
  title: string;
  img: string;
  description: string;
  slug: string;
  parent: string;
  imageURLs: IProductImg[];
  price: number;
  discount: number;
  quantity: number;
  brand: IBrand;
  category: ICategory;
  type?: IType;
  status: string;
  count?: number;
  additionalInformation?: IAdditionalInformation[];
  tags?: string[];
  reviews?: IReview[];
  ja?: boolean;
  lee?: boolean;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}

export interface IAddProduct {
  title: string;
  img: string;
  description: string;
  parent: string;
  imageURLs: IProductImg[];
  price: number;
  discount?: number;
  quantity: number;
  brand: string;
  category: string;
  type?: string;
  status?: string;
  sku?: string;
  count?: number;
  additionalInformation?: IAdditionalInformation[];
  tags?: string[];
}

export interface IReviewProductRes {
  success: boolean;
  data: IProduct[];
}

export interface IDelReviewsRes {
  success: boolean;
  message: string;
}

export interface ProductResponse {
  success: boolean;
  data: IProduct[];
}