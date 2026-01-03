import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("this is the value of body from sdk side", body);
    console.log("value of api key:- ", body.APIKEY);
    const data = JSON.parse(body.error);
    console.log("the value of data:- ", data);
    console.log(
      "this is the value of stack from the backend side:- ",
      data["stack"]
    );
    console.log("this is message value from the backend side", data["message"]);
    return NextResponse.json({ message: "error fetched successfully", body });
  } catch (error) {
    return NextResponse.json({
      message: "Some Invalid error has occured",
      error,
    });
  }
}
