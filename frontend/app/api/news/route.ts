import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: { url: string | URL; }) {
  const { searchParams } = new URL(req.url);
  const collectionName = searchParams.get("type");

  if (!collectionName) {
    return NextResponse.json(
      { error: "Collection name is required" },
      { status: 400 }
    );
  }

  const validCollections = [
    "raw_material_costs",
    "laws_and_regulations",
    "economic_factors",
    "industry_events",
    "climate_and_sustainability",
  ];

  if (!validCollections.includes(collectionName)) {
    return NextResponse.json(
      { error: "Invalid collection name" },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("news_scraper");
    const collection = db.collection(collectionName);

    const articles = await collection.find().toArray();

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
