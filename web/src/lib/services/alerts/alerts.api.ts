import axios from "axios";

export async function createAlert(name: string, projectId: string, condition: string) {
    return await axios({
        method: 'POST',
        url: "/api/alerts",
        data: {
            name,
            projectId,
            condition
        }
    })
}

export async function getAlerts() {
    const res = await axios({
        method: 'GET',
        url: "/api/alerts",
    });
    return res.data.alerts || [];
}

export async function updateAlert(alertruleid: string, name: string, projectId: string, condition: string) {
    return await axios({
        method: 'PUT',
        url: `/api/alerts?alertruleid=${alertruleid}`,
        data: {
            name,
            projectId,
            condition
        }
    })
}