type Category = {
  name: string;
  id: string;
}

export interface IBlog {
  _id: string;
  category: Category;
  img: string;
  title: string;
  parent: string;
  description: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogResponse {
  success: boolean;
  data: IBlog[];
}

// IAddBlog
export interface IAddBlog {
  title: string;
  description: string;
  img: string;
  category: { name: string, id: string };
  parent: string;
  tags?: string[];
}