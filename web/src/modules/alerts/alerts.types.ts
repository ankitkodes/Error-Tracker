import z from "zod";

export const alertSchema = z.object({
    name: z.string().min(1, "Name is required"),
    projectId: z.string().min(1, "Project ID is required"),
    condition: z.string().min(1, "Condition is required")
})

export type alertSchema = z.infer<typeof alertSchema>