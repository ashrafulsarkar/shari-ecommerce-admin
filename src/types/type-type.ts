export interface Type {
  _id: string;
  name: string;
  description?: string;
}

export interface TypeResponse {
  success: boolean;
  result: Type[];
}

export interface TypeDelResponse {
  success: boolean;
  message: string;
}

export interface IAddType {
  name: string;
  description?: string;
}

export interface ITypeAddResponse {
  success: boolean;
  message: string;
  data:Type
}

