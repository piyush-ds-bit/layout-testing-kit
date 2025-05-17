
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
  
  const months = ["Aug", "Sept", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];

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

        // Using environment variable or direct token (in a real app, use server-side request)
        const headers = {
          Authorization: `Bearer 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`
        };

        const response = await request<GitHubData>(
          GITHUB_GRAPHQL_API,
          query,
          { login: GITHUB_USERNAME },
          headers
        );

        if (response?.user?.contributionsCollection?.contributionCalendar) {
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
        <h2 className="portfolio-heading">GitHub</h2>
        <div className="portfolio-card">
          <div className="flex items-center mb-6">
            <svg className="w-6 h-6 mr-2 text-portfolio-accent" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <h3 className="text-xl font-semibold text-white">GitHub</h3>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div className="grid grid-cols-10 gap-1 min-w-[600px]">
              {/* Month labels */}
              {months.map((month, index) => (
                <div key={index} className="text-xs text-portfolio-gray text-center">
                  {month}
                </div>
              ))}
              
              {/* Activity grid */}
              <div className="col-span-10 grid grid-cols-10 gap-1">
                {months.map((_, monthIndex) => (
                  <div key={monthIndex} className="grid grid-rows-7 gap-1">
                    {[...Array(10)].map((_, i) => {
                      const index = monthIndex * 10 + i;
                      const day = contributions[index];
                      let bgColor = 'bg-portfolio-darker';
                      
                      if (day && day.contributionCount > 0) {
                        bgColor = `bg-[${day.color}]`;
                      }
                      
                      // Format date for display if available
                      const formattedDate = day ? new Date(day.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : '';
                      
                      const tooltip = day 
                        ? `${formattedDate}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`
                        : 'No contributions';
                      
                      return (
                        <div
                          key={i}
                          className={`w-5 h-5 rounded-sm ${bgColor} border border-portfolio-dark/50 transition-all hover:scale-125`}
                          title={tooltip}
                        ></div>
                      );
                    })}
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="col-span-10 flex items-center justify-between mt-4">
                <div className="text-portfolio-accent">
                  {totalContributions} contributions in the last year
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-portfolio-gray">Less</span>
                  <div className="w-3 h-3 rounded-sm bg-portfolio-darker border border-portfolio-dark/50"></div>
                  <div className="w-3 h-3 rounded-sm bg-green-900/30 border border-portfolio-dark/50"></div>
                  <div className="w-3 h-3 rounded-sm bg-green-700/40 border border-portfolio-dark/50"></div>
                  <div className="w-3 h-3 rounded-sm bg-green-500/50 border border-portfolio-dark/50"></div>
                  <span className="text-xs text-portfolio-gray">More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
