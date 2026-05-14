import { CreateAlertService, GetAlertService, UpdateAlertService } from "@/modules/alerts/alerts.service";
import { alertSchema } from "@/modules/alerts/alerts.types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        const data = await alertSchema.parse(body);
        await CreateAlertService(data);
        return NextResponse.json({ message: "Alert created successfully" });
    } catch (_error) {
        return NextResponse.json({ message: "some invalid error has occured" })
    }
}

export async function GET(_req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        const alerts = await GetAlertService(Number(session?.user.id));
        return NextResponse.json({ alerts });
    } catch (_error) {
        return NextResponse.json({ message: "some invalid error has occured" })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const alertruleid = req.nextUrl.searchParams.get("alertruleid");
        if (!alertruleid) {
            return NextResponse.json({ message: "alertruleid is required" }, { status: 400 });
        }
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        const data = await alertSchema.parse(body);
        await UpdateAlertService(alertruleid, data);
        return NextResponse.json({ message: "Alert updated successfully" });
    } catch (_error) {
        return NextResponse.json({ message: "some invalid error has occured" })
    }
}