import {Role} from "../util/role";

export class User {
  id: number;
  username: string;
  name: string;
  imageUrl: string;
  email: string;
  phoneNumber: string;
  role: Role;
  createTime: string;
}

