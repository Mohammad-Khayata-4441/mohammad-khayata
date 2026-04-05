"use server";

import { contactsService } from "@/services/contacts";

export async function submitContactMessage(prevState: any, formData: FormData) {
  try {
    const fullName = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString() || undefined;
    const service = formData.get("service")?.toString() || undefined;
    const message = formData.get("message")?.toString();

    if (!fullName || !email || !message) {
      return {
        error: "Please fill out all required fields.",
        success: false,
      };
    }

    await contactsService.create({
      fullName,
      email,
      phone,
      message,
      // @ts-ignore: mapping standard combobox values to string payload
      service,
    });

    return {
      success: true,
      error: null,
    };
  } catch (error: any) {
    console.error("Error submitting contact form:", error);
    return {
      error: error.message || "Something went wrong. Please try again later.",
      success: false,
    };
  }
}
