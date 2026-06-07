import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    await prisma.college.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, context) {
  try {
    const { id } = await context.params;

    const body = await req.json();

    const updated = await prisma.college.update({
      where: {
        id,
      },
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

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}