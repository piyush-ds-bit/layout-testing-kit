import React from 'react';

interface VectorTableProps {
  vocabulary: string[];
  vectors: number[][];
  labels: string[];
  type: 'bow' | 'tfidf';
}

const VectorTable: React.FC<VectorTableProps> = ({ vocabulary, vectors, labels, type }) => {
  const formatValue = (value: number) => {
    return type === 'tfidf' ? value.toFixed(3) : value.toString();
  };
  
  const getIntensity = (value: number, maxValue: number) => {
    if (value === 0) return 0;
    return (value / maxValue) * 0.8 + 0.2; // 0.2 to 1.0
  };
  
  const maxValue = Math.max(...vectors.flat());
  
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-xs font-mono border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-2 text-muted-foreground sticky left-0 bg-[#182437]">Term</th>
            {labels.map((label, idx) => (
              <th key={idx} className="text-center p-2 text-foreground">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vocabulary.map((term, termIdx) => (
            <tr key={termIdx} className="border-b border-border/30 hover:bg-accent/5 transition-colors">
              <td className="p-2 text-muted-foreground sticky left-0 bg-[#182437]">{term}</td>
              {vectors.map((vector, vecIdx) => {
                const value = vector[termIdx];
                const intensity = getIntensity(value, maxValue);
                return (
                  <td 
                    key={vecIdx} 
                    className="text-center p-2 transition-all duration-200"
                    style={{
                      backgroundColor: value > 0 
                        ? `hsla(var(--accent), ${intensity})` 
                        : 'transparent',
                      color: value > 0 ? 'hsl(var(--accent-foreground))' : 'hsl(var(--muted-foreground))'
                    }}
                  >
                    {formatValue(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VectorTable;
