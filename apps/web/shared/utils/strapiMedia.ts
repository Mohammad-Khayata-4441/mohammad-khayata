export const strapiMedia = (url: string) => {
    return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}