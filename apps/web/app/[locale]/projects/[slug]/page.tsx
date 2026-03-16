import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ 
    locale: string;
    slug: string; 
  }>;
}

 
// This is a placeholder page for project details
// You can implement the full project details view here
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  
  try {
    // You can uncomment this when you want to fetch real data
    // const projectService = new StrapiService<ProjectData>(
    //   process.env.NEXT_PUBLIC_STRAPI_URL!, 
    //   `/api/projects`
    // );
    // const project = await projectService.getSingleResource({ 
    //   filters: { slug: { $eq: slug } } 
    // });

    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto section-aurora p-6 md:p-8 noise-overlay">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 text-gradient-cyan headline-glow">
                Project Details  
              </h1>
              <p className="text-muted-foreground">
                Project Slug: {slug}
              </p>
            </div>
            
            <div className=" p-8 rounded-3xl">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">
                  Coming Soon
                </h2>
                <p className="text-muted-foreground mb-6">
                  This project details page is under development. 
                  You can implement the full project view here using the project slug: <strong>{slug}</strong>
                </p>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg text-left">
                    <h3 className="font-semibold mb-2">TODO: Implementation</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Fetch project data using the slug</li>
                      <li>• Display project overview, images, and details</li>
                      <li>• Show technologies and skills used</li>
                      <li>• Add links to live demo and repository</li>
                      <li>• Display project timeline and achievements</li>
                      <li>• Add navigation to related projects</li>
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

export function generateMetadata({ params }: ProjectPageProps) {
  return {
    title: "Project Details",
    description: "Detailed view of project implementation and achievements.",
  };
}