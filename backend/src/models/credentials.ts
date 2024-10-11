import { credentialsSchema } from "@shared_types";
import { mapZodToMongoose } from "./utils";
import mongoose from "mongoose";

const credentialsMongoSchema = mapZodToMongoose(credentialsSchema);
const CredentialsModel = mongoose.model("Credentials", credentialsMongoSchema);

export default CredentialsModel;
