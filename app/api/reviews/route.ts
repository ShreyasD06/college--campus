import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const collegeId =
    req.nextUrl.searchParams.get("collegeId") || "";

  if (!collegeId) {
    return NextResponse.json(
      { error: "collegeId is required" },
      { status: 400 }
    );
  }

  const reviews = await prisma.review.findMany({
    where: {
      collegeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  try {
    const { name, comment, rating, collegeId } =
      await req.json();

    if (!name || !comment || !rating || !collegeId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        name,
        comment,
        rating,
        collegeId,
      },
    });

    return NextResponse.json(review, {
      status: 201,
    });
  } catch (error: unknown) {
    console.error("Review creation error:", error);

    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}