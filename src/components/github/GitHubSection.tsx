
import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';

// GraphQL API endpoint and query
const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const GITHUB_USERNAME = 'piyush-ds-bit';

// Define types for GitHub API response
interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: {
    contributionDays: ContributionDay[];
  }[];
}

interface GitHubData {
  user: {
    contributionsCollection: {
      contributionCalendar: ContributionCalendar;
    };
  };
}

const GitHubSection: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const query = `
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

        const headers = {
          Authorization: `Bearer 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`
        };

        const response = await request<GitHubData>(
          GITHUB_GRAPHQL_API,
          query,
          { login: GITHUB_USERNAME },
          headers
        );

        // Explicitly check if response has user property and proper structure
        if (response && response.user && 
            response.user.contributionsCollection && 
            response.user.contributionsCollection.contributionCalendar) {
          
          const calendar = response.user.contributionsCollection.contributionCalendar;
          const weeks = calendar.weeks;
          const days = weeks.flatMap(week => week.contributionDays);
          
          setContributions(days);
          setTotalContributions(calendar.totalContributions);
          setLoading(false);
        } else {
          throw new Error('Invalid response structure from GitHub API');
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setError('Failed to load GitHub contributions');
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-portfolio-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
        <h2 className="portfolio-heading">GitHub Contributions</h2>
        <div className="portfolio-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">
              {GITHUB_USERNAME}'s Activity
            </h3>
            <span className="text-portfolio-accent">
              {totalContributions} contributions in the last year
            </span>
          </div>
          <div className="grid grid-cols-7 sm:grid-cols-14 md:grid-cols-26 lg:grid-cols-53 gap-1">
            {contributions.map((day) => {
              let bgColor = 'bg-portfolio-darker';
              if (day.contributionCount > 0) {
                bgColor = `bg-[${day.color}]`;
              }
              
              // Format date for display
              const date = new Date(day.date);
              const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });
              
              return (
                <div
                  key={day.date}
                  className={`w-4 h-4 rounded-sm ${bgColor} border border-portfolio-dark/50 transition-all hover:scale-125`}
                  title={`${formattedDate}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`}
                ></div>
              );
            })}
          </div>
          <div className="mt-4 text-xs text-portfolio-gray-light">
            <p>Note: This data is fetched directly from GitHub via their GraphQL API.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
