import { ScamCategory } from './scamCategory';
import { z } from 'zod';

export const exerciseSchema = z.object({
  type: z.string(),
  scam: z.boolean(),
  category: z.nativeEnum(ScamCategory),
  message: z.string(),
  feedback: z.string(),
});

export type Exercise = z.infer<typeof exerciseSchema>;

export const emailSchema = exerciseSchema.extend({
  emailSender: z.string(),
});
export type Email = z.infer<typeof emailSchema>;

export const textSchema = exerciseSchema.extend({
  phoneNumber: z.string(),
});
export type Text = z.infer<typeof textSchema>;
