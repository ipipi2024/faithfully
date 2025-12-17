import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongoose';
import Item from '@/app/models/Item';

// GET /api/items - Fetch all items
export async function GET() {
  try {
    await connectDB();
    const items = await Item.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: items
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch items'
    }, { status: 500 });
  }
}

// POST /api/items - Create new item
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const item = await Item.create(body);

    return NextResponse.json({
      success: true,
      data: item
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create item'
    }, { status: 400 });
  }
}
