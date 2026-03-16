"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  CheckCircle,
  Building,
  ArrowUpRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import type { HomeData } from "@/services/home";
import { strapiMedia } from "@/shared/utils/strapiMedia";

interface ExperienceCardsProps {
  experiences?: HomeData['experiences'];
}

export default function ExperienceCards({ experiences = [] }: ExperienceCardsProps) {
  if (!experiences || experiences.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No experience data available.</p>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {experiences.map((experience, index) => (
        <motion.div
          key={experience.documentId || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Card className=" interactive-card overflow-hidden transition-all duration-300 noise-overlay">
              {/* Main Header */}
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-linear-to-br from-primary/20 to-secondary/20 border border-primary/20 ring-glow">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-foreground mb-1">
                        {experience.jobTitle}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium text-primary mb-2">
                        {experience.company}
                      </CardDescription>


                   
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(experience.startDate)} - {formatDate(experience.endDate)}</span>
                        </div>
                        
                        {experience.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{experience.location}</span>
                            {experience.isRemote && (
                              <Badge variant="secondary" className="ml-1 text-xs px-2 py-0.5">
                                Remote
                              </Badge>
                            )}
                          </div>
                        )}

                        
                      </div>

                    </div>

                  </div>
                  
                  <Link 
                    href={`/experience/${experience.documentId}`}
                    className="p-2 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors group/link border border-line-soft/70"
                    title="View Details"
                  >
                    <ArrowUpRight className="h-4 w-4 text-secondary group-hover/link:text-primary transition-colors" />
                  </Link>
                </div>
                   <CardDescription className="flex items-center gap-4 text-lg mt-8 text-foreground">
                            {experience.overview}
                        </CardDescription>
                      
              </CardHeader>
              

              {/* Projects Section */}
              {experience.projects && experience.projects.length > 0 && (
                <CardContent className="pt-0 pb-4 border-b border-border/50">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="projects" className="border-none">
                      <AccordionTrigger className="hover:no-underline py-3 px-0">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          Projects ({experience.projects.length})
                        </h4>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          {experience.projects.map((project, projectIndex) => (
                            <div 
                              key={project.documentId || projectIndex}
                              className="p-3 rounded-lg bg-linear-to-r from-accent/8 to-transparent border border-accent/20 hover:from-accent/15 transition-all duration-200 group"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                                  {project.title}
                                </h5>
                                
                                <div className="flex items-center gap-1">
                                  {project.url && (
                                    <a
                                      href={project.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1 rounded bg-primary/20 hover:bg-primary/30 transition-colors"
                                      title="Visit External Link"
                                    >
                                      <ExternalLink className="h-3 w-3 text-primary" />
                                    </a>
                                  )}
                                  
                                  {project.slug && (
                                    <Link 
                                      href={`/projects/${project.slug}`}
                                      className="p-1 rounded bg-accent/20 hover:bg-accent/30 transition-colors"
                                      title="View Project"
                                    >
                                      <ArrowUpRight className="h-3 w-3 text-accent-foreground" />
                                    </Link>
                                  )}
                                </div>
                              </div>
                              
                              {project.company && project.company !== experience.company && (
                                <p className="text-xs text-muted-foreground mb-1">
                                  Client: {project.company}
                                </p>
                              )}
                              
                              {project.date && (
                                <p className="text-xs text-muted-foreground">
                                  {new Date(project.date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'short' 
                                  })}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              )}

              {/* Key Achievements */}
              {experience.achievements && experience.achievements.length > 0 && (
                <CardContent className="pt-4 pb-4 border-b border-border/50">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="achievements" className="border-none">
                      <AccordionTrigger className="hover:no-underline py-3 px-0">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Key Achievements ({experience.achievements.length})
                        </h4>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {experience.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-500 font-semibold text-xs mt-0.5 shrink-0">
                                {i + 1}
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {achievement.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              )}

              {/* Skills & Technologies */}
              {experience.technologies && experience.technologies.length > 0 && (
                <CardContent className="pt-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                      Skills & Technologies
                    </h4>
                    
                    <div className="flex flex-wrap justify-center items-center gap-4">
                      {experience.technologies.map((tech, techIndex) => (
                        <div 
                          key={tech.documentId || techIndex}
                          className="flex items-center justify-center p-2 rounded-lg transition-transform duration-300 hover:scale-120"
                          title={tech.name}
                        >
                          {tech.logo?.url ? (
                            <img 
                              src={strapiMedia(tech.logo.url)} 
                              alt={tech.name || 'Technology logo'}
                              className="w-12 h-12 object-contain"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                              <span className="text-xs font-bold text-primary">
                                {tech.name?.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        ))}
    </div>
  );
}