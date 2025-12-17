import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongoose';
import Item from '@/app/models/Item';
import { requireAuth } from '@/app/lib/auth';

// GET /api/items/[id] - Fetch single item by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const item = await Item.findById(id);

    if (!item) {
      return NextResponse.json({
        success: false,
        error: 'Item not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: item
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch item'
    }, { status: 500 });
  }
}

// PUT /api/items/[id] - Update item by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const item = await Item.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return NextResponse.json({
        success: false,
        error: 'Item not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: item
    }, { status: 200 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update item'
    }, { status: 400 });
  }
}

// DELETE /api/items/[id] - Delete item by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    await connectDB();
    const { id } = await params;

    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      return NextResponse.json({
        success: false,
        error: 'Item not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {}
    }, { status: 200 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }
    return NextResponse.json({
      success: false,
      error: 'Failed to delete item'
    }, { status: 500 });
  }
}
