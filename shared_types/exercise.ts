import type { scamCategories, ScamCategory } from './scamCategory';
import { z } from 'zod';
import { scamCategory } from './scamCategory';

export const exerciseSchema = z.object({
  type: z.string(),
  label: z.string(),
  message: z.string(),
  feedback: z.string(),
});

export type Exercise = z.infer<typeof exerciseSchema>;

export type Email = Exercise & {
  emailSender: string;
};

export type Text = Exercise & {
  phoneNumber: string;
};
