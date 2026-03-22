import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/Card';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">Anonymous Chat</h1>
        <p className="text-text-muted text-lg">Connect privately without tracing.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
          <CardDescription>Choose how you want to join the conversation.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button size="lg" onClick={() => navigate('/create')} className="w-full justify-between group">
            <span className="flex items-center gap-3">
              <svg className="w-5 h-5 text-current opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create a new group
            </span>
            <svg className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-border/50"></div>
            <span className="flex-shrink-0 mx-4 text-text-muted text-sm uppercase tracking-widest">or</span>
            <div className="flex-grow border-t border-border/50"></div>
          </div>

          <Button variant="secondary" size="lg" onClick={() => navigate('/join')} className="w-full justify-between group">
            <span className="flex items-center gap-3">
              <svg className="w-5 h-5 text-current opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Join an existing group
            </span>
            <svg className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-text-muted/60 mt-8">
        Your chats are anonymous and ephemeral by default.
      </p>
    </div>
  );
}
