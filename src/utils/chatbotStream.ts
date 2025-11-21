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
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chatbot`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversationHistory,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No reader available');
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
              onError(parsed.content);
              return;
            } else if (parsed.type === 'done') {
              onDone();
              return;
            }
          } catch (e) {
            console.error('Failed to parse SSE data:', e);
          }
        }
      }
    }
  } catch (error) {
    console.error('Stream error:', error);
    onError(error instanceof Error ? error.message : 'Unknown error occurred');
  }
};
