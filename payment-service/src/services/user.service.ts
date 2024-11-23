import { BadRequest } from "../helpers/error.helper";
import { IUser, User } from "../models/user.model";

export default class UserService {
  static async findUserByEmail(email: string): Promise<IUser> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequest("Customer not found!");
    }
    return user;
  }
}
