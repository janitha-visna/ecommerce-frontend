// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { Product } from "@/models/Product"; // Sequelize model from your backend

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
