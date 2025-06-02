import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';

// GraphQL API endpoint and query
const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const GITHUB_USERNAME = 'piyush-ds-bit';

// Define types for GitHub API response
interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface GitHubData {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: Week[];
      };
    };
  };
}

const GitHubSection: React.FC = () => {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [monthSpans, setMonthSpans] = useState<{ month: string; start: number; end: number }[]>([]);

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
                    }
                  }
                }
              }
            }
          }
        `;

        // Using environment variable or direct token (in a real app, use server-side request)
        const headers = {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN || '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'}`,
        };

        const response = await request<GitHubData>(
          GITHUB_GRAPHQL_API,
          query,
          { login: GITHUB_USERNAME },
          headers
        );

        if (response?.user?.contributionsCollection?.contributionCalendar) {
          const calendar = response.user.contributionsCollection.contributionCalendar;
          setWeeks(calendar.weeks);
          setTotalContributions(calendar.totalContributions);

          // Compute month spans
          const allDays = calendar.weeks.flatMap((week) => week.contributionDays);
          const monthRanges = new Map<string, { start: number; end: number }>();
          let currentMonth = '';
          let startWeek = -1;
          allDays.forEach((day, index) => {
            const date = new Date(day.date);
            const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
            const weekIndex = Math.floor(index / 7);
            if (monthYear !== currentMonth) {
              if (currentMonth) {
                monthRanges.set(currentMonth, { start: startWeek, end: weekIndex - 1 });
              }
              currentMonth = monthYear;
              startWeek = weekIndex;
            }
          });
          // Last month
          if (currentMonth) {
            const lastWeekIndex = Math.floor((allDays.length - 1) / 7);
            monthRanges.set(currentMonth, { start: startWeek, end: lastWeekIndex });
          }
          setMonthSpans(Array.from(monthRanges.entries()).map(([month, range]) => ({ month, ...range })));
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

  // Function to map contribution count to dark theme colors
  const getContributionColor = (count: number) => {
    if (count === 0) return '#010409';
    if (count < 5) return '#0e4429';
    if (count < 10) return '#006d32';
    if (count < 20) return '#26a641';
    return '#39d353';
  };

  return (
    <section className="portfolio-section bg-[#0d1117] py-12">
      <div className="portfolio-container max-w-6xl mx-auto px-4">
        <h2 className="portfolio-heading text-3xl font-bold text-white mb-8">GitHub</h2>
        <div className="portfolio-card bg-[#161b22] rounded-lg p-6">
          <div className="flex items-center mb-6">
            <svg className="w-6 h-6 mr-2 text-[#58a6ff]" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <h3 className="text-xl font-semibold text-white">GitHub</h3>
          </div>

          <div className="flex">
            {/* Days of the week labels */}
            <div className="grid grid-rows-7 gap-1 mr-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="text-xs text-gray-400 text-right h-5 flex items-center justify-end pr-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Contribution grid */}
            <div className="grid grid-cols-52 gap-1 overflow-x-auto">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-rows-7 gap-1">
                  {week.contributionDays.map((day, dayIndex) => {
                    const bgColor = getContributionColor(day.contributionCount);
                    const formattedDate = new Date(day.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    });
                    const tooltip = `${formattedDate}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`;
                    return (
                      <div
                        key={dayIndex}
                        className={`w-5 h-5 rounded-sm bg-[${bgColor}] border border-[#30363d] transition-all hover:scale-125`}
                        title={tooltip}
                      ></div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Month labels */}
          <div className="grid grid-cols-52 gap-1 mt-2">
            {monthSpans.map((span) => (
              <div
                key={span.month}
                className="text-xs text-gray-400 text-center"
                style={{ gridColumn: `${span.start + 1} / span ${span.end - span.start + 1}` }}
              >
                {span.month.split(' ')[0]}
              </div>
            ))}
          </div>

          {/* Total contributions and legend */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-[#58a6ff]">
              {totalContributions} contributions in the last year
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Less</span>
              <div className="w-3 h-3 rounded-sm bg-[#010409] border border-[#30363d]"></div>
              <div className="w-3 h-3 rounded-sm bg-[#0e4429] border border-[#30363d]"></div>
              <div className="w-3 h-3 rounded-sm bg-[#006d32] border border-[#30363d]"></div>
              <div className="w-3 h-3 rounded-sm bg-[#26a641] border border-[#30363d]"></div>
              <div className="w-3 h-3 rounded-sm bg-[#39d353] border border-[#30363d]"></div>
              <span className="text-xs text-gray-400">More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
