import type { operations } from "@repo/cms-types";
import { StrapiService } from "./strapi";

/** Portfolio GET response data (from OpenAPI schema). */
export type PortfolioData = operations["portfolio/get/portfolio"]["responses"][200]["content"]["application/json"]["data"];
/** Single project from portfolio.projects array. */
export type Project = NonNullable<PortfolioData["projects"]>[number];




const portfolioService = new StrapiService<PortfolioData>(
    process.env.NEXT_PUBLIC_STRAPI_URL!,
    "/api/portfolio"
);

/** Fetch the single portfolio resource. */
export const getPortfolio = (params?: Parameters<typeof portfolioService.getSingleResource>[0]) =>
    portfolioService.getSingleResource<PortfolioData>(params ?? { populate: { projects: { populate: "*" } } });
