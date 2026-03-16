import { getDailyError } from "./error.repo";

export async function getDailyErrorServices(userId: number) {
    if (!userId) {
        throw new Error("Invalid userId");
    }
    return await getDailyError(userId);
}