import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust path if needed

// DELETE all users
export async function DELETE() {
  try {
    const deleted = await prisma.user.deleteMany({});

    return NextResponse.json({
      message: "All users deleted successfully",
      count: deleted.count,
    });
  } catch (error) {
    console.error("Error deleting users:", error);
    return NextResponse.json(
      { error: "Failed to delete users" },
      { status: 500 }
    );
  }
}
