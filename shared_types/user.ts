import { z } from "zod";
import { credentialsSchema } from "./session";

export const userSchema = credentialsSchema.extend({});

export type User = z.infer<typeof userSchema>;
