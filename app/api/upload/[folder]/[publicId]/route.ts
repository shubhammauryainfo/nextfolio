import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(
  request: NextRequest,
  { params }: { params: { folder: string; publicId: string } }
) {
  const { folder, publicId } = params;

  try {
    const fullPublicId = `${folder}/${publicId}`;
    const result = await cloudinary.uploader.destroy(fullPublicId, {
      resource_type: "image",
    });

    if (result.result === "not found") {
      return NextResponse.json(
        { message: "File not found on Cloudinary." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "File deleted successfully.", result },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting file:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }

    return NextResponse.json(
      { error: "An error occurred during deletion." },
      { status: 500 }
    );
  }
}
