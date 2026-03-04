import { notFound } from "next/navigation";
import { StrapiService } from "@/services/strapi";
import type { operations } from "@repo/cms-types";

interface ExperiencePageProps {
  params: Promise<{ 
    locale: string;
    id: string; 
  }>;
}

type ExperienceData = operations["experience/get/experiences_by_id"]["responses"][200]["content"]["application/json"]["data"];

// This is a placeholder page for experience details
// You can implement the full experience details view here
export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { locale, id } = await params;
  
  try {
    // You can uncomment this when you want to fetch real data
    // const experienceService = new StrapiService<ExperienceData>(
    //   process.env.NEXT_PUBLIC_STRAPI_URL!, 
    //   `/api/experiences/${id}`
    // );
    // const experience = await experienceService.getSingleResource();

    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 gradient-heading">
                Experience Details
              </h1>
              <p className="text-muted-foreground">
                Experience ID: {id}
              </p>
            </div>
            
            <div className="glass-paper p-8 rounded-lg">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">
                  Coming Soon
                </h2>
                <p className="text-muted-foreground mb-6">
                  This experience details page is under development. 
                  You can implement the full experience view here using the experience ID: <strong>{id}</strong>
                </p>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg text-left">
                    <h3 className="font-semibold mb-2">TODO: Implementation</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Fetch experience data using the experience ID</li>
                      <li>• Display company information and role details</li>
                      <li>• Show project portfolio from this experience</li>
                      <li>• Display achievements and technologies used</li>
                      <li>• Add navigation back to main experience timeline</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}

export function generateMetadata({ params }: ExperiencePageProps) {
  return {
    title: "Experience Details",
    description: "Detailed view of professional experience and achievements.",
  };
}