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
  meta_img?: string,
  meta_title?: string,
  meta_description?: string,
  createdAt: string;
  updatedAt: string;
}

export interface BlogResponse {
  data: IBlog[];
}

// IAddBlog
export interface IAddBlog {
  meta_description: string | undefined;
  meta_title: string | number | undefined;
  title: string;
  description?: string;
  long_description?: string;
  img: string;
  category: { name: string, id: string };
  parent: string;
  tags?: string[];
}