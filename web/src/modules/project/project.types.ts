import * as z from "zod";
import { Environment, Language } from "../../../prisma/generated/prisma/enums";

export const ProjectSchema = z.object({
    name: z.string(),
    environment: z.enum(Environment),
    language: z.enum(Language),
    team: z.string().optional()
})