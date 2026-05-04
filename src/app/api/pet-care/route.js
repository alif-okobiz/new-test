import { NextResponse } from "next/server";
import { insertDocument } from "@/lib/db-operations"; 
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { 
      ownerName, 
      phone, 
      petType, 
      petBreedAge, 
      visitReason, 
      symptoms, 
      image 
    } = await req.json();

    // Upload to Cloudinary (If image exists)
    let imageUrl = "";
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: "pet_care_tickets",
      });
      imageUrl = uploadRes.secure_url;
    }

    //  Prepare Data
    const petTicketData = {
      ownerName,
      phone,
      petType,
      petBreedAge,
      visitReason,
      symptoms,
      imageUrl,
      status: "pending",
    };

    const result = await insertDocument("pet-care-tickets", petTicketData);

    return NextResponse.json({ 
      success: true, 
      insertedId: result.insertedId 
    }, { status: 201 });

  } catch (error) {
    console.error("Pet Care API Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}