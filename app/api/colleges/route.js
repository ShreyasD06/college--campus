import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const search = req.nextUrl.searchParams.get("search") || "";
  const location = req.nextUrl.searchParams.get("location") || "";
  const minRating = parseFloat(req.nextUrl.searchParams.get("minRating") || 0);
  const maxFees = parseFloat(req.nextUrl.searchParams.get("maxFees") || Infinity);
  const sort = req.nextUrl.searchParams.get("sort") || "";

  const where = {
    AND: [
      search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {},
      location
        ? {
            location: {
              contains: location,
              mode: "insensitive",
            },
          }
        : {},
      minRating > 0 ? { rating: { gte: minRating } } : {},
      maxFees < Infinity ? { fees: { lte: maxFees } } : {},
    ],
  };

  const orderBy = getOrderBy(sort);

  const colleges = await prisma.college.findMany({
    where,
    orderBy: orderBy || undefined,
  });

  return NextResponse.json(colleges);
}

function getOrderBy(sort) {
  switch (sort) {
    case "ratingDesc":
      return { rating: "desc" };
    case "feesAsc":
      return { fees: "asc" };
    case "placementDesc":
      // Can't sort by string directly, so default
      return { rating: "desc" };
    default:
      return null;
  }
}
