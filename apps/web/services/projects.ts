import { Project } from "next/dist/build/swc/types";
import { StrapiService } from "./strapi";

export class ProjectsService extends StrapiService<Project> {
    constructor(baseUrl: string) {
        super(baseUrl, '/api/projects');
    }
}

export const projectsService = new ProjectsService(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337');