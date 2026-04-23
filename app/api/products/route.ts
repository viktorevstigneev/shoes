// app/api/products/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET - получение всех товаров
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : 100;
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");

    let query = supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    // Фильтр по бренду
    if (brand && brand !== "Все") {
      query = query.eq("brand", brand);
    }

    // Фильтр по категории
    if (category && category !== "Все") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Ошибка при получении товаров: " + error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ products: data, count: data?.length || 0 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}

// POST - создание нового товара
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, brand, price, image, description, category } = body;

    // Валидация
    const errors = [];
    if (!name) errors.push("name");
    if (!brand) errors.push("brand");
    if (!price) errors.push("price");
    if (!image) errors.push("image");

    if (errors.length > 0) {
      return NextResponse.json(
        { error: `Обязательные поля: ${errors.join(", ")}` },
        { status: 400 },
      );
    }

    // Сохраняем в Supabase
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name,
          brand,
          price: Number(price),
          image,
          description: description || "",
          category: category || "Кроссовки",
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Ошибка при создании товара: " + error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Товар успешно создан",
        product: data[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}

// PUT - обновление товара
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, brand, price, image, description, category } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID товара обязателен" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("products")
      .update({
        name,
        brand,
        price: price ? Number(price) : undefined,
        image,
        description,
        category,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Ошибка при обновлении товара: " + error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Товар успешно обновлен",
      product: data[0],
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}

// DELETE - удаление товара
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID товара обязателен" },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", Number(id));

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Ошибка при удалении товара: " + error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Товар успешно удален",
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
