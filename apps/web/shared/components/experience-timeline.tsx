"use client";

import { useState } from "react";
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
  EyeIcon,
} from "lucide-react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  TimelineContent,
  TimelineHeader,
  TimelineTime,
  TimelineTitle,
  TimelineBody,
} from "./ui/timeline";
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

interface ExperienceTimelineProps {
  experiences?: HomeData['experiences'];
}

export default function ExperienceTimeline({ experiences = [] }: ExperienceTimelineProps) {
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
    <div className="relative">
      <Timeline variant="alternating" className="max-w-8xl mx-auto">
        {experiences.map((experience, index) => (
          <TimelineItem key={experience.documentId || index}>
            <TimelineConnector>
              <TimelineIcon icon={Briefcase} />
            </TimelineConnector>
            
            <TimelineContent>
              <Card className="glass-paper shadow-md hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className={`flex items-start gap-4`}>
                    <div className="flex-1 text-start">
                      <TimelineTitle className="text-2xl font-bold gradient-heading mb-2 text-start">
                        {experience.company}
                      </TimelineTitle>
                      <CardDescription className="text-lg font-medium text-slate-700 dark:text-slate-300 text-start">
                        {experience.jobTitle}
                      </CardDescription>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge
                        variant="outline"
                        className="flex border-primary text-xs text-primary items-center gap-1 px-3 py-1"
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                        </span>
                      </Badge>
                      
                      <Link 
                        href={`/experience/${experience.documentId}`}
                        className="p-2 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors group/link"
                        title="View Experience Details"
                      >
                        <ArrowUpRight className="h-4 w-4 text-secondary group-hover/link:text-primary transition-colors" />
                      </Link>
                    </div>
                  </div>
                  
                  {experience.location && (
                    <div className="flex items-center mt-3 text-sm text-slate-500 dark:text-slate-400 text-start">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{experience.location}</span>
                      {experience.isRemote && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Remote
                        </Badge>
                      )}
                    </div>
                  )}
                </CardHeader>

                {(experience.projects && experience.projects.length > 0) && (
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-start">
                        Projects
                      </h4>
                      
                      <Accordion type="single" collapsible className="w-full">
                        {experience.projects.map((project, projectIndex) => (
                          <AccordionItem
                            key={project.documentId || projectIndex}
                            className="border-none bg-secondary/10 px-4 rounded-lg mb-2"
                            value={`${experience.documentId}-${projectIndex}`}
                          >
                            <AccordionTrigger className="text-left font-medium hover:no-underline py-3 text-start">
                              <div className="flex items-center justify-between w-full pr-4">
                                <div className="flex items-center text-start">
                                  <Building className="h-4 w-4 mr-2 text-secondary" />
                                  <span className="text-start">{project.title}</span>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  {project.url && (
                                    <a
                                      href={project.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors group/link"
                                      onClick={(e) => e.stopPropagation()}
                                      title="Visit External Link"
                                    >
                                      <ExternalLink className="h-3.5 w-3.5 text-primary" />
                                    </a>
                                  )}
                                  
                                  {project.slug && (
                                    <Link 
                                      href={`/projects/${project.slug}`}
                                      onClick={(e) => e.stopPropagation()}
                                      className="p-1.5 rounded-full bg-accent/20 hover:bg-accent/30 transition-colors group/link"
                                      title="View Project Details"
                                    >
                                      <EyeIcon className="h-3.5 w-3.5   group-hover/link:text-primary transition-colors" />
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </AccordionTrigger>
                            
                            <AccordionContent>
                              <div className="mt-2 space-y-3 text-start">
                                {project.company && project.company !== experience.company && (
                                  <div className="text-sm text-start">
                                    <span className="font-medium text-muted-foreground">Client: </span>
                                    <span className="text-foreground">{project.company}</span>
                                  </div>
                                )}
                                
                                {project.date && (
                                  <div className="text-sm text-start">
                                    <span className="font-medium text-muted-foreground">Date: </span>
                                    <span className="text-foreground">
                                      {new Date(project.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long' 
                                      })}
                                    </span>
                                  </div>
                                )}
                                
                                {project.overview && (
                                  <div 
                                    className="text-sm text-muted-foreground prose prose-sm max-w-none text-start"
                                    dangerouslySetInnerHTML={{ __html: project.overview }}
                                  />
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </CardContent>
                )}

                {(experience.achievements && experience.achievements.length > 0) && (
                  <CardContent className={experience.projects?.length ? "pt-4 border-t" : "pt-0"}>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-start">
                          Key Achievements
                        </h4>
                      </div>
                      
                      <div className="grid gap-3">
                        {experience.achievements.map((achievement, i) => (
                          <div 
                            key={i} 
                            className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-green-500/5 to-transparent border-l-2 border-green-500/30 hover:from-green-500/10 transition-all duration-200"
                          >
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 shrink-0 mt-0.5">
                              <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                            </div>
                            <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-start">
                              {achievement.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
