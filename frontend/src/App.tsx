import { useEffect, useState } from 'react';
import { fetchPortfolio } from '@/lib/api';
import type { Portfolio } from '@/types/portfolio';
import { NarrativeJourney } from '@/components/narrative';

function App() {
  const [data, setData] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPortfolio()
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="relative">
          {/* Animated loading indicator */}
          <div className="w-16 h-16 rounded-full border-2 border-[var(--accent-current)]/20 border-t-[var(--accent-current)] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--accent-current)]/10 border-b-[var(--accent-current)]/50 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex flex-col items-center justify-center text-center p-8">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-narrative-statement text-[var(--text-primary)] mb-4">
          Something went wrong
        </h1>
        <p className="text-narrative-body text-[var(--text-secondary)] max-w-md">
          Failed to load portfolio data. Please refresh the page or try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="magnetic-cta mt-8"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <NarrativeJourney data={data} />
    </div>
  );
}

export default App;
