import * as z from "zod";

export const UserForm = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
  organizationName: z.string(),
  role: z.enum(["Developer", "Team_Lead", "Admin"]),
});
