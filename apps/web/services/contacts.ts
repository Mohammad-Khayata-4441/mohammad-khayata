import { StrapiService } from "./strapi";
import { operations } from "@repo/cms-types";

// Extract types from the OpenAPI schema if they exist, or fallback
export type ContactInput = {
    fullName?: string;
    email?: string;
    message?: string;
    phone?: string;
};

export type ContactData = NonNullable<operations["contact/post/contacts"]["responses"][200]["content"]["application/json"]["data"]>;

export class ContactsService extends StrapiService<ContactData> {
    constructor(baseUrl: string) {
        super(baseUrl, '/api/contacts');
    }
}

export const contactsService = new ContactsService(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337');
