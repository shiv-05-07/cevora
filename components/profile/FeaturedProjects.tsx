'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Project } from '@/types/profile';
import { FolderGit2, GitBranch, ExternalLink, Users, User, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) {
    return (
      <Card className="bg-card border-border/50 shadow-sm p-8 text-center flex flex-col items-center justify-center min-h-[250px]">
        <FolderGit2 className="w-12 h-12 text-muted-foreground/60 mb-3" />
        <h3 className="font-bold text-lg text-foreground">No Projects Yet</h3>
        <p className="text-sm text-muted-foreground mb-4">Start building your technical portfolio to showcase to recruiters.</p>
        <button className={buttonVariants({ variant: 'default', size: 'sm' })}>Add your first project</button>
      </Card>
    );
  }

  // Sort projects so featured/pinned appear first
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-primary" />
          Featured Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedProjects.map((project) => (
            <div 
              key={project.id} 
              className={cn(
                "group relative border border-border/50 rounded-xl overflow-hidden bg-muted/10 transition-all duration-300 hover:border-border/80 flex flex-col",
                project.featured && "md:col-span-2 border-primary/20 bg-primary/5 hover:border-primary/40"
              )}
            >
              {/* Cover Placeholder / Thumbnail */}
              <div className="h-40 bg-muted dark:bg-muted/30 border-b border-border/40 flex items-center justify-center relative">
                <FolderGit2 className="w-10 h-10 text-muted-foreground/40" />
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <Badge variant="secondary" className="text-[9px] bg-background/80 backdrop-blur-sm">
                    {project.status}
                  </Badge>
                  <Badge variant="outline" className="text-[9px] bg-background/80 backdrop-blur-sm flex items-center gap-1">
                    {project.teamSize === 'Solo' ? <User className="w-2.5 h-2.5" /> : <Users className="w-2.5 h-2.5" />}
                    {project.teamSize}
                  </Badge>
                </div>
                {project.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge className="text-[9px] bg-primary text-primary-foreground flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-primary-foreground" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              {/* Project Body */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-base text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {project.name}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-[9px]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "h-8 text-xs flex-1")}
                    >
                      <GitBranch className="w-3.5 h-3.5 mr-1.5" />
                      Code
                    </a>
                  )}
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: 'default', size: 'sm' }), "h-8 text-xs flex-1")}
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
