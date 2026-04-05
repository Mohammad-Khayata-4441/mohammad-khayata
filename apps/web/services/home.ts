import type { operations } from "@repo/cms-types";
import { StrapiService } from "./strapi";
import { PortfolioData } from "./portfolio";

/** Portfolio GET response data (from OpenAPI schema). */
/** Single project from home.projects array. */
export type HomeData = operations["home/get/home"]["responses"][200]["content"]["application/json"]["data"];
export type AboutData = operations['about/get/about']['responses'][200]['content']['application/json']['data'];

export type TechnologyData = operations['technology/get/technologies']['responses'][200]['content']['application/json']['data'];
export type PricingData = operations['pricing/get/pricings']['responses'][200]['content']['application/json']['data'];

const baseStrapiService = new StrapiService(process.env.NEXT_PUBLIC_STRAPI_URL!);

const homeService = new StrapiService<HomeData>(
    process.env.NEXT_PUBLIC_STRAPI_URL!, "/api/home"
);



/** Fetch the single portfolio resource. */
export const getHome = () =>
    homeService.getSingleResource<HomeData>({

        populate: {
            experiences: {
                populate: {
                    technologies: { populate: ["logo"] },
                    projects: { populate: "*" },
                    achievements: { populate: "*" },
 
                },
            },
            technologies: { populate: ["logo"] },
            posts: { populate: "*" },
            pricings: { populate: "*" },
        }
    });


export const getAbout = () =>
    baseStrapiService.getSingleResource<AboutData>({
        populate: {
            seo: {
                populate: ["metaImage", "openGraph"],
            },
            openGraph: {
                populate: ["ogImage"],
            },
            socialLinks: true,
        },
    }, "api/about");

export const getTechnologies = () =>
    baseStrapiService.getCollection<TechnologyData>({ populate: "*", }, "api/technologies");

export const getPricings = () =>
    baseStrapiService.getCollection<PricingData>({ populate: "*", }, "api/pricings");