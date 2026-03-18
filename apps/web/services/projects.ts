 import { operations } from "@repo/cms-types";
import { StrapiService } from "./strapi";
/** Portfolio GET response data (from OpenAPI schema). */
export type PortfolioData = operations["project/get/projects"]["responses"][200]["content"]["application/json"]["data"];
/** Single project from portfolio.projects array. */
export type Project = NonNullable<PortfolioData[number]>;


export class ProjectsService extends StrapiService<Project> {
    constructor(baseUrl: string) {
        super(baseUrl, '/api/projects');
    }
}

export const projectsService = new ProjectsService(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337');
