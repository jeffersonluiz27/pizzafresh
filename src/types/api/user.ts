export interface User {
  nickname: string;
  name: string;
  password: string;
  confirmPassword: string;
  image: string;
}

export interface UserUpdate {
  user: User;
  id: string;
}

export interface UserResponse{
  id: string
  nickname: string;
  name: string;
  password: string;
  image: string;
  updatedAt?: string;
  createdAt?: string;
}