import { createalert, getalert, updatealert } from "./alerts.repo";
import { alertSchema } from "./alerts.types";

export function CreateAlertService(data: alertSchema) {
    return createalert(data);
}

export function GetAlertService(userId: number) {
    return getalert(userId);
}

export function UpdateAlertService(alertruleid: string, data: alertSchema) {
    return updatealert(alertruleid, data);
}