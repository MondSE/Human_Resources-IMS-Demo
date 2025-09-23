import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // find hrProfile of current user
  const userId = session.user.id;
  const hr = await prisma.hRProfile.findUnique({ where: { userId } });
  if (!hr) return NextResponse.json({ data: [] });

  const employees = await prisma.employee.findMany({ where: { hrId: hr.id } });
  return NextResponse.json({ employees });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  const userId = session.user.id;
  const hr = await prisma.hRProfile.findUnique({ where: { userId } });
  if (!hr)
    return NextResponse.json(
      { error: "HR profile not found" },
      { status: 400 }
    );

  const created = await prisma.employee.create({
    data: {
      hrId: hr.id,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      position: body.position,
    },
  });
  return NextResponse.json({ employee: created });
}
