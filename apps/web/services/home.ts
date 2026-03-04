import type { operations } from "@repo/cms-types";
import { StrapiService } from "./strapi";
import { PortfolioData } from "./portfolio";

/** Portfolio GET response data (from OpenAPI schema). */
/** Single project from home.projects array. */
export type HomeData = operations["home/get/home"]["responses"][200]["content"]["application/json"]["data"];





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

                },
            },
            technologies: { populate: ["logo"] },
            posts: { populate: "*" },
        }
    });
