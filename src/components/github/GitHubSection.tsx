
import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import GitHubHeader from './GitHubHeader';
import GitHubContributionGrid from './GitHubContributionGrid';
import GitHubStats from './GitHubStats';
import GitHubLoading from './GitHubLoading';
import GitHubError from './GitHubError';

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
    return <GitHubLoading />;
  }

  if (error) {
    return <GitHubError error={error} />;
  }

  return (
    <section className="portfolio-section bg-portfolio-dark">
      <div className="portfolio-container">
        <h2 className="portfolio-heading text-white mb-8">GitHub Activity</h2>
        
        <div className="max-w-5xl mx-auto">
          <div className="portfolio-card bg-[#0d1117] border border-[#21262d] p-6 rounded-xl">
            <GitHubHeader />
            <GitHubContributionGrid weeks={weeks} monthSpans={monthSpans} />
            <GitHubStats totalContributions={totalContributions} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
