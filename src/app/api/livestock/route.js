import { NextResponse } from 'next/server';
import { insertDocument, findDocuments } from '@/lib/db-operations';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const COLLECTION = 'livestock_tickets';

/**
 * GET: Retrieve all tickets from the database
 */
export async function GET() {
  try {
    const data = await findDocuments(COLLECTION);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("GET_LIVESTOCK_ERROR:", error); 
    return NextResponse.json(
      { error: "Failed to fetch livestock data" }, 
      { status: 500 }
    );
  }
}

/**
 * POST: Create a new livestock support ticket with Cloudinary upload
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { ownerName, phone, species, category, image } = body;
    
    // Basic validation for required fields
    if (!ownerName || !phone || !species || !category) {
      return NextResponse.json(
        { error: "Required fields (Name, Phone, Species, Category) are missing" }, 
        { status: 400 }
      );
    }

    let uploadedImageUrl = null;

    // Handle Cloudinary upload if an image is provided in Base64 format
    if (image) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: "livestock_service", // Folder name in Cloudinary media library
        });
        uploadedImageUrl = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("CLOUDINARY_UPLOAD_ERROR:", uploadError);
        return NextResponse.json(
          { error: "Image upload failed. Please try again." }, 
          { status: 500 }
        );
      }
    }

    // Prepare final payload for MongoDB
    const finalData = {
      ...body,
      image: uploadedImageUrl, 
      createdAt: new Date()
    };

    const result = await insertDocument(COLLECTION, finalData);

    return NextResponse.json(
      { 
        message: "Ticket created successfully", 
        id: result.insertedId,
        imageUrl: uploadedImageUrl 
      }, 
      { status: 201 }
    );

  } catch (error) {
    console.error("POST_LIVESTOCK_ERROR:", error); 
    return NextResponse.json(
      { error: "Failed to submit ticket. Please try again later." }, 
      { status: 500 }
    );
  }
}