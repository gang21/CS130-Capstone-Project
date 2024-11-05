import { z } from "zod";
import { scamCategory } from "./scamCategory";

export const resourceSchema = z.object({
  category: scamCategory,
  content: z.string().max(500),
  links: z.array(z.string()),
  imageUrl: z.string().optional(),
});

export type Resource = z.infer<typeof resourceSchema>;
