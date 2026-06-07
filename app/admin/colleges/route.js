import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const college = await prisma.college.create({
    data: {
      name: body.name,
      location: body.location,
      fees: Number(body.fees),
      rating: Number(body.rating),
      placements: body.placements,
      overview: body.overview,
      image: body.image,
    },
  });

  return NextResponse.json(college);
}