import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .max(400, 'Description must be less than 400 characters')
    .optional(),
  hours: z.number()
    .min(0, 'Hours must be between 0 and 23')
    .max(23, 'Hours must be between 0 and 23')
    .optional(),
  minutes: z.number()
    .min(0, 'Minutes must be between 1 and 59')
    .max(59, 'Minutes must be between 1 and 59')
    .optional(),
})
.refine(
  (data) => {
    if (data.hours === 0 && data.minutes !== undefined) {
      return data.minutes >= 1;
    }
    return true;
  },
  {
    message: 'We apologize, but the minimum allowed time is 1 minute.',
    path: ['minutes'],
  }
);

export type TaskFormData = z.infer<typeof taskSchema>;

export function formatTimeFromParts(hours?: number, minutes?: number): string | undefined {
  if (hours === undefined || minutes === undefined) return undefined;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function parseTimeString(timeString?: string): { hours?: number; minutes?: number } {
  if (!timeString) return { hours: undefined, minutes: undefined };
  const [hours, minutes] = timeString.split(':').map(Number);
  return { hours, minutes };
}