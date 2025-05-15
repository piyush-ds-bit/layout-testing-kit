import React, { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const GITHUB_USERNAME = 'piyush-ds-bit';  // <-- change this

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
  const [contributions, setContributions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const headers = {
          Authorization: `Bearer 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`,  // replace with your token
        };
        const data = await request(GITHUB_GRAPHQL_API, query, { login: GITHUB_USERNAME }, headers);
        
        // Extract daily contribution data from weeks
        const weeks = data.user.contributionsCollection.contributionCalendar.weeks;
        const days = weeks.flatMap((week: any) => week.contributionDays);
        setContributions(days);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  if (loading) return <p>Loading GitHub contributions...</p>;

  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
        <h2 className="portfolio-heading">GitHub Contributions</h2>
        <div className="portfolio-card">
          <div className="grid grid-cols-53 gap-1"> {/* Adjust grid cols for 53 weeks */}
            {contributions.map((day) => {
              let bgColor = 'bg-portfolio-darker';
              if (day.contributionCount > 0) {
                bgColor = `bg-[${day.color}]`; // or map color if you want custom colors
              }
              return (
                <div
                  key={day.date}
                  className={`w-5 h-5 rounded-sm ${bgColor} border border-portfolio-dark/50`}
                  title={`${day.date}: ${day.contributionCount} contributions`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;

