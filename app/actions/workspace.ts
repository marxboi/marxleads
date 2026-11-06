"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { supabase, user };
}

export async function createBusiness(formData: FormData) {
  const { supabase, user } = await requireUser();

  const name = String(formData.get("name") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const description = String(formData.get("description") || "").trim();

  if (!name) throw new Error("Business name is required.");

  const { error } = await supabase.from("businesses").insert({
    owner_id: user.id,
    name,
    category: category || null,
    city: city || null,
    description: description || null,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/business");
}

export async function updateBusiness(formData: FormData) {
  const { supabase, user } = await requireUser();

  const id = String(formData.get("business_id") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const description = String(formData.get("description") || "").trim();

  if (!id || !name)
    throw new Error("A business and business name are required.");

  const { error } = await supabase
    .from("businesses")
    .update({
      name,
      category: category || null,
      city: city || null,
      description: description || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/business");
}

export async function deleteBusiness(formData: FormData) {
  const { supabase, user } = await requireUser();
  const id = String(formData.get("business_id") || "").trim();
  if (!id) throw new Error("Business ID is required.");

  const { error } = await supabase
    .from("businesses")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/business");
}

export async function createService(formData: FormData) {
  const { supabase, user } = await requireUser();

  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = Number(formData.get("price") || 0);
  const currency = String(formData.get("currency") || "NGN");
  const businessId = String(formData.get("business_id") || "").trim();

  if (!title) throw new Error("Service title is required.");
  if (!Number.isFinite(price) || price < 0)
    throw new Error("Enter a valid service price.");

  let verifiedBusinessId: string | null = null;
  if (businessId) {
    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id")
      .eq("id", businessId)
      .eq("owner_id", user.id)
      .maybeSingle();
    if (businessError) throw new Error(businessError.message);
    if (!business)
      throw new Error("Choose a business that belongs to your account.");
    verifiedBusinessId = business.id;
  }

  const { error } = await supabase.from("services").insert({
    owner_id: user.id,
    business_id: verifiedBusinessId,
    title,
    description: description || null,
    price,
    currency,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/services");
}

export async function updateService(formData: FormData) {
  const { supabase, user } = await requireUser();
  const id = String(formData.get("service_id") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = Number(formData.get("price") || 0);
  const currency = String(formData.get("currency") || "NGN");
  const businessId = String(formData.get("business_id") || "").trim();

  if (!id || !title)
    throw new Error("A service and service title are required.");
  if (!Number.isFinite(price) || price < 0)
    throw new Error("Enter a valid service price.");

  let verifiedBusinessId: string | null = null;
  if (businessId) {
    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id")
      .eq("id", businessId)
      .eq("owner_id", user.id)
      .maybeSingle();
    if (businessError) throw new Error(businessError.message);
    if (!business)
      throw new Error("Choose a business that belongs to your account.");
    verifiedBusinessId = business.id;
  }

  const { error } = await supabase
    .from("services")
    .update({
      title,
      description: description || null,
      price,
      currency,
      business_id: verifiedBusinessId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/services");
}

export async function deleteService(formData: FormData) {
  const { supabase, user } = await requireUser();
  const id = String(formData.get("service_id") || "").trim();
  if (!id) throw new Error("Service ID is required.");

  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/services");
}
