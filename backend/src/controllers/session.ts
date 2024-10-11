import CredentialsModel from "../models/credentials";

export const getSessions = async (req: any, res: any) => {
  try {
    const postMessage = await CredentialsModel.find();
    res.status(200).json(postMessage);
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(409).json({ message: "Unknown error" });
    }
  }
};

export const createSession = async (req: any, res: any) => {
  console.log("in create Session ");
  const credentials = req.body;
  const newCredentials = new CredentialsModel(credentials);

  try {
    await newCredentials.save();
    res.status(201).json(newCredentials);
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(409).json({ message: "Unknown error" });
    }
  }
};
