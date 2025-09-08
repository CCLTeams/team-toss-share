import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trophy, PlayCircle } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen field-bg flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        {/* Logo and Header */}
        <div className="flex items-center justify-center mb-6">
          <Trophy className="h-16 w-16 text-primary mr-4" />
          <div className="w-32 h-4 gradient-primary rounded-full"></div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
          CCL Cricket Lineup
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Create professional cricket team lineups and share them instantly
        </p>
        
        <Button 
          size="lg" 
          onClick={() => navigate('/teams')}
          className="btn-bounce gradient-primary text-lg px-8 py-4"
        >
          <PlayCircle className="mr-2 h-5 w-5" />
          Create Lineup
        </Button>

        {/* Simple steps */}
        <div className="mt-16 grid grid-cols-3 gap-8 text-sm">
          <div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary-foreground font-bold">1</span>
            </div>
            <p className="text-muted-foreground">Create Teams</p>
          </div>
          <div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary-foreground font-bold">2</span>
            </div>
            <p className="text-muted-foreground">Preview</p>
          </div>
          <div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary-foreground font-bold">3</span>
            </div>
            <p className="text-muted-foreground">Share</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
