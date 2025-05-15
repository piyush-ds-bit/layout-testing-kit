
import React, { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const GITHUB_USERNAME = 'piyush-ds-bit';  // <-- change this to your GitHub username

// Define types for GitHub contribution data
type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

const query = gql`
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

const GitHubSection: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // Note: In production, you should use an environment variable for the token
        // and consider using a server-side approach to avoid exposing tokens
        const headers = {
          Authorization: `Bearer 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`,  // replace with your token
        };
        
        const data = await request(GITHUB_GRAPHQL_API, query, { login: GITHUB_USERNAME }, headers);
        
        // Extract contribution data
        const calendar = data.user.contributionsCollection.contributionCalendar;
        const weeks = calendar.weeks;
        const days = weeks.flatMap((week: any) => week.contributionDays);
        
        setTotalContributions(calendar.totalContributions);
        setContributions(days);
        setLoading(false);
      } catch (error) {
        console.error('GitHub API error:', error);
        setError('Failed to load GitHub contributions. Please try again later.');
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  if (loading) {
    return (
      <section className="portfolio-section">
        <div className="portfolio-container">
          <h2 className="portfolio-heading">GitHub Contributions</h2>
          <div className="portfolio-card">
            <Skeleton className="w-full h-40" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="portfolio-section">
        <div className="portfolio-container">
          <h2 className="portfolio-heading">GitHub Contributions</h2>
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
        <h2 className="portfolio-heading">GitHub Contributions</h2>
        <div className="portfolio-card">
          <p className="mb-4 text-sm text-gray-400">
            Total contributions in the past year: <span className="font-semibold text-white">{totalContributions}</span>
          </p>
          <div className="grid grid-cols-7 sm:grid-cols-14 md:grid-cols-28 lg:grid-cols-53 gap-1">
            {contributions.map((day) => {
              let bgColor = 'bg-portfolio-darker';
              if (day.contributionCount > 0) {
                // Handle color formatting - GitHub returns colors like #216e39
                bgColor = `bg-[${day.color}]`;
              }
              
              const date = new Date(day.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });
              
              return (
                <div
                  key={day.date}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${bgColor} border border-portfolio-dark/50 hover:scale-150 transition-transform`}
                  title={`${date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
