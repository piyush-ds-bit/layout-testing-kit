export interface StreamMessage {
  type: 'delta' | 'done' | 'error';
  content: string;
}

export const streamChatResponse = async (
  message: string,
  conversationHistory: Array<{ role: string; content: string }>,
  onDelta: (delta: string) => void,
  onDone: () => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    const response = await fetch(
      `https://pfwqlxgrwcphsnpkevot.supabase.co/functions/v1/chatbot`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmd3FseGdyd2NwaHNucGtldm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMzYyNDUsImV4cCI6MjA2MjkxMjI0NX0.8TTzZFxJK2xzCAxCrj93IFpufubgF8N2p5jHH7ohWWw',
        },
        body: JSON.stringify({
          message,
          conversationHistory,
        }),
      }
    );

    if (!response.ok) {
      const statusMessages: Record<number, string> = {
        429: 'Too many requests. Please wait a moment and try again.',
        500: 'Server error. Please try again in a moment.',
        503: 'Service temporarily unavailable. Please try again later.',
      };
      
      const errorMsg = statusMessages[response.status] || `Connection error (${response.status}). Please try again.`;
      throw new Error(errorMsg);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('Unable to establish connection. Please refresh and try again.');
    }

    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        onDone();
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      
      // Keep the last incomplete line in the buffer
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          
          if (data === '[DONE]') {
            onDone();
            return;
          }

          try {
            const parsed: StreamMessage = JSON.parse(data);
            
            if (parsed.type === 'delta') {
              onDelta(parsed.content);
            } else if (parsed.type === 'error') {
              onError(parsed.content || 'An error occurred. Please try again.');
              return;
            } else if (parsed.type === 'done') {
              onDone();
              return;
            }
          } catch (e) {
            // Silently skip incomplete JSON chunks
            console.log('Skipping incomplete chunk');
          }
        }
      }
    }
  } catch (error) {
    console.error('Stream error:', error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Connection lost. Please check your internet and try again.';
    onError(errorMessage);
  }
};
