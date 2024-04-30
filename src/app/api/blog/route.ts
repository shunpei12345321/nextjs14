import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
    console.log("DB connected");
  } catch (err) {
    return Error("DB connection error");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();

    const blogs = await prisma.post.findMany({});
    console.log(blogs);
    return NextResponse.json({ message: "Success", blogs }, { status: 200 });
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, content, authorId } = await req.json();

    await main();
    const blog = await prisma.post.create({
      data: { title, content, authorId },
    });
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
};