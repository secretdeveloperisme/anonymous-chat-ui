import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Card';
import { useCurrentGroup } from '~/hooks/useCurrentGroup';

export default function WaitingRoom() {
  const { group } = useCurrentGroup();

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center justify-center min-h-[40vh]">
      <Card className="w-full text-center border-primary-500/30 shadow-primary-500/10">
        <CardHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-primary-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <CardTitle>Waiting for Approval</CardTitle>
          <CardDescription>
            The owner of <strong>{group?.name}</strong> needs to approve your entry.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-2 mt-4 text-text-muted">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Please wait...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
