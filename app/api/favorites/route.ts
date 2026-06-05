import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const favorites = await prisma.favorite.findMany({
    include: {
      college: true,
    },
  });

  return NextResponse.json(favorites);
}

export async function POST(req: Request) {
  const { collegeId } = await req.json();

  const favorite = await prisma.favorite.create({
    data: {
      collegeId,
    },
  });

  return NextResponse.json(favorite);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Favorite ID is required" },
      { status: 400 }
    );
  }

  const favorite = await prisma.favorite.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(favorite);
}

