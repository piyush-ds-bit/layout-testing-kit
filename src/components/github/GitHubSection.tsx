
import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { Github } from 'lucide-react';

// GraphQL API endpoint and query
const GITHUB_GRAPHQL_API = process.env.GITHUB_GRAPHQL_API || 'https://api.github.com/graphql';
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'piyush-ds-bit';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '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';

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

        const headers = {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
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
      <section className="portfolio-section bg-portfolio-dark">
        <div className="portfolio-container">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-portfolio-accent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="portfolio-section bg-portfolio-dark">
        <div className="portfolio-container">
          <div className="text-center py-12 text-red-400">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Function to get contribution level and corresponding styles
  const getContributionLevel = (count: number) => {
    if (count === 0) return { level: 0, class: 'contrib-level-0' };
    if (count < 5) return { level: 1, class: 'contrib-level-1' };
    if (count < 10) return { level: 2, class: 'contrib-level-2' };
    if (count < 20) return { level: 3, class: 'contrib-level-3' };
    return { level: 4, class: 'contrib-level-4' };
  };

  return (
    <section className="portfolio-section bg-portfolio-dark">
      <div className="portfolio-container">
        <h2 className="portfolio-heading text-white mb-8">GitHub Activity</h2>
        
        <div className="max-w-5xl mx-auto">
          <div className="portfolio-card bg-[#0d1117] border border-[#21262d] p-6 rounded-xl">
            {/* Header */}
            <div className="flex items-center mb-6">
              <Github className="w-6 h-6 mr-3 text-[#58a6ff]" />
              <h3 className="text-xl font-semibold text-white">GitHub</h3>
            </div>

            {/* Contribution Graph Container */}
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[800px]">
                {/* Month Labels */}
                <div className="grid grid-cols-53 gap-1 mb-2 ml-8">
                  {monthSpans.map((span, index) => (
                    <div
                      key={index}
                      className="text-xs text-gray-400 text-left"
                      style={{ 
                        gridColumn: `${span.start + 2} / span ${Math.max(1, span.end - span.start + 1)}` 
                      }}
                    >
                      {span.month.split(' ')[0]}
                    </div>
                  ))}
                </div>

                {/* Main Grid */}
                <div className="flex gap-1">
                  {/* Days of the week labels */}
                  <div className="grid grid-rows-7 gap-1 text-xs text-gray-400 pr-2">
                    <div></div>
                    <div className="flex items-center">Mon</div>
                    <div></div>
                    <div className="flex items-center">Wed</div>
                    <div></div>
                    <div className="flex items-center">Fri</div>
                    <div></div>
                  </div>

                  {/* Contribution Grid */}
                  <div className="grid grid-cols-53 gap-1">
                    {weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="grid grid-rows-7 gap-1">
                        {week.contributionDays.map((day, dayIndex) => {
                          const { class: levelClass } = getContributionLevel(day.contributionCount);
                          const formattedDate = new Date(day.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          });
                          const tooltip = `${formattedDate}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`;
                          
                          return (
                            <div
                              key={dayIndex}
                              className={`w-3 h-3 rounded-sm border border-[#1b1f23] transition-all duration-200 hover:scale-110 hover:border-gray-500 cursor-pointer ${levelClass}`}
                              title={tooltip}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with stats and legend */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 gap-4">
              <div className="text-[#58a6ff] text-sm">
                <span className="font-medium">{totalContributions}</span> contributions in the last year
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm contrib-level-0 border border-[#1b1f23]"></div>
                  <div className="w-3 h-3 rounded-sm contrib-level-1 border border-[#1b1f23]"></div>
                  <div className="w-3 h-3 rounded-sm contrib-level-2 border border-[#1b1f23]"></div>
                  <div className="w-3 h-3 rounded-sm contrib-level-3 border border-[#1b1f23]"></div>
                  <div className="w-3 h-3 rounded-sm contrib-level-4 border border-[#1b1f23]"></div>
                </div>
                <span className="text-xs text-gray-400">More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
