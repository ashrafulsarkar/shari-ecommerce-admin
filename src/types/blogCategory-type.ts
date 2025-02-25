
export interface ICategoryItem {
  _id: string;
  img: string;
  parent: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  success: boolean;
  result: ICategoryItem[];
}

export interface IAddCategory {
  img?: string;
  parent: string;
  description?: string;
}

export interface IAddCategoryResponse {
  status: string;
  message: string;
  data: {
    parent: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ICategoryDeleteRes {
  success?: boolean;
  message?: string;
}


