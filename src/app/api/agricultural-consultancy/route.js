import { NextResponse } from "next/server";
import { insertDocument } from "@/lib/db-operations"; 
import { v2 as cloudinary } from "cloudinary";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { 
      farmerName, 
      phone, 
      cropCategory, 
      landArea, 
      problemDescription, 
      image 
    } = await req.json();

    // Upload to Cloudinary (If image exists)
    let imageUrl = "";
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: "agri_consultancy_images", 
      });
      imageUrl = uploadRes.secure_url;
    }

    // Prepare Data Object
    const ticketData = {
      farmerName,
      phone,
      cropCategory,
      landArea,
      problemDescription,
      imageUrl,
      status: "pending",
    };

    //  Save using common helper function
    // Collection Name: agri-consaltancy-ticket
    const result = await insertDocument("agri-consaltancy-ticket", ticketData);

    return NextResponse.json({ 
      success: true, 
      message: "Ticket created in agro_vet database",
      insertedId: result.insertedId 
    }, { status: 201 });

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}