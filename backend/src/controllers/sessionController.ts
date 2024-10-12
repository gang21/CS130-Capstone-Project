import { Credentials, User } from "@shared_types";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import { UserClient } from "../clients";
import { UserController } from "./userController";
import { JWT_KEY } from "../settings";
import jwt from "jsonwebtoken";

export class SessionController {
  constructor(
    private readonly client: UserClient,
    private readonly userController: UserController
  ) {}
  getSessions = async (req: any, res: any) => {
    console.log("in the getSessions function");
    try {
      const postMessage = await UserModel.find();
      res.status(200).json(postMessage);
    } catch (error) {
      if (error instanceof Error) {
        res.status(409).json({ message: error.message });
      } else {
        res.status(409).json({ message: "Unknown error" });
      }
    }
  };

  login = async (req: { body: Credentials }, res: any) => {
    const credentials = req.body;
    const user = await this.userController.getByEmail(credentials.email);

    if (!user) {
      throw new Error("401");
    }
    const passwordMatch = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!passwordMatch) {
      throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
    }
    const token = jwt.sign({ sub: user.sub }, JWT_KEY, { algorithm: "HS256" });
    res.status(200).json(token);
    // return token;
  };

  signup = async (req: { body: Credentials }, res: any) => {
    const credentials = req.body;
    const user = await this.userController.getByEmail(credentials.email);

    if (user) {
      throw new Error("409");
    }

    try {
      const hashedPassword = await bcrypt.hash(credentials.password, 10);
      const userSub = await this.generateRandomSub();
      const newUser = {
        email: credentials.email,
        password: hashedPassword,
        sub: userSub,
      };

      await this.userController.create(newUser);
      const newUserDb = await this.userController.getByEmail(credentials.email);
      res.status(201).json(newUserDb);
    } catch (error) {
      if (error instanceof Error) {
        res.status(409).json({ message: error.message });
      } else {
        res.status(409).json({ message: "Unknown error" });
      }
    }
  };

  async generateRandomSub(): Promise<string> {
    const randomId = Math.random().toString(36).substring(2);
    const hashedId = await bcrypt.hash(randomId, 10);
    const sub = hashedId.substring(0, 16);
    return sub;
  }
}
