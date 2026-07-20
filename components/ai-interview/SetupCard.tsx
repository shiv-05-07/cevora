import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InterviewConfig, InterviewRole, InterviewLevel, InterviewType, InputMode, SessionMode } from './types';
import { Play, Mic, Video, Type } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HoverCard } from '@/components/ui/hover-card';

interface SetupCardProps {
  mode: SessionMode;
  onStart: (config: InterviewConfig) => void;
}

export function SetupCard({ mode, onStart }: SetupCardProps) {
  const [role, setRole] = React.useState<InterviewRole>('SDE');
  const [level, setLevel] = React.useState<InterviewLevel>('Intermediate');
  const [company, setCompany] = React.useState<string>(mode === 'interview' ? 'Google' : 'University');
  const [type, setType] = React.useState<InterviewType>('Technical');
  const [inputMode, setInputMode] = React.useState<InputMode>('text');

  const handleStart = () => {
    onStart({ role, level, company, type, inputMode, sessionMode: mode });
  };

  const title = mode === 'interview' ? 'AI Interview Simulator' : 'Viva Preparation';
  const desc = mode === 'interview' 
    ? 'Configure your target role and company to begin' 
    : 'Configure your academic subject and level for your Viva';

  return (
    <HoverCard className="w-full flex flex-col h-full">
      <Card className="w-full shadow-none border-0 bg-transparent flex flex-col h-full">
        <CardHeader className="text-center pb-4 shrink-0">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{mode === 'interview' ? 'Target Role' : 'Subject Area'}</Label>
              <Select value={role} onValueChange={(val) => setRole(val as InterviewRole)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SDE">Software Engineering</SelectItem>
                  <SelectItem value="Data Analyst">Data Science</SelectItem>
                  <SelectItem value="Product Manager">Product Management</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select value={level} onValueChange={(val) => setLevel(val as InterviewLevel)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{mode === 'interview' ? 'Target Company' : 'Institution / Topic'}</Label>
            <Input 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={mode === 'interview' ? "e.g. Google, Amazon, Startup" : "e.g. Core Java Concepts"}
            />
          </div>

          <div className="space-y-2">
            <Label>Interaction Mode (Critical)</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className={cn("h-20 flex flex-col items-center justify-center gap-2", inputMode === 'text' && "border-primary bg-primary/5")}
                onClick={() => setInputMode('text')}
              >
                <Type className={cn("w-6 h-6", inputMode === 'text' ? "text-primary" : "text-muted-foreground")} />
                <span className="text-xs">Text Chat</span>
              </Button>
              <Button 
                variant="outline" 
                className={cn("h-20 flex flex-col items-center justify-center gap-2", inputMode === 'audio' && "border-primary bg-primary/5")}
                onClick={() => setInputMode('audio')}
              >
                <Mic className={cn("w-6 h-6", inputMode === 'audio' ? "text-primary" : "text-muted-foreground")} />
                <span className="text-xs">Audio (Mic)</span>
              </Button>
              <Button 
                variant="outline" 
                className={cn("h-20 flex flex-col items-center justify-center gap-2", inputMode === 'video' && "border-primary bg-primary/5")}
                onClick={() => setInputMode('video')}
              >
                <Video className={cn("w-6 h-6", inputMode === 'video' ? "text-primary" : "text-muted-foreground")} />
                <span className="text-xs">Video Call</span>
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-4 shrink-0 mt-auto">
          <Button 
            onClick={handleStart} 
            className="w-full font-bold text-md h-12 transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg active:scale-95 active:translate-y-0 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500" 
            size="lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Start {mode === 'interview' ? 'Interview' : 'Viva'}
          </Button>
        </CardFooter>
      </Card>
    </HoverCard>
  );
}
