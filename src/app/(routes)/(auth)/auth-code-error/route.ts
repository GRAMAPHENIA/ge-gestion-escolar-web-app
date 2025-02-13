import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "Código de autenticación inválido" },
    { status: 400 }
  );
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.code) {
    return NextResponse.json(
      { error: "Falta el código de autenticación" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "Código de autenticación procesado correctamente",
  });
}
