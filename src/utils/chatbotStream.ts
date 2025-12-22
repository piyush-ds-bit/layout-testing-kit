import { supabase } from '@/integrations/supabase/client';

export interface StreamMessage {
  type: 'delta' | 'done' | 'error';
  content: string;
}

// Get the Supabase URL and anon key from the client
const SUPABASE_URL = 'https://pfwqlxgrwcphsnpkevot.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmd3FseGdyd2NwaHNucGtldm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMzYyNDUsImV4cCI6MjA2MjkxMjI0NX0.8TTzZFxJK2xzCAxCrj93IFpufubgF8N2p5jHH7ohWWw';

export const streamChatResponse = async (
  message: string,
  conversationHistory: Array<{ role: string; content: string }>,
  onDelta: (delta: string) => void,
  onDone: () => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/chatbot`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          message,
          conversationHistory,
        }),
      }
    );

    if (!response.ok) {
      const statusMessages: Record<number, string> = {
        402: 'Lovable AI credits exhausted. Please add credits in workspace settings.',
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
    let streamDone = false;
    let doneCalled = false; // Prevent calling onDone() multiple times

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
        let line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);

        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (!line.trim() || line.startsWith(':')) continue;
        if (!line.startsWith('data: ')) continue;

        console.debug('[chatbot SSE line]', line);

        const jsonStr = line.slice(6).trim();

        if (jsonStr === '[DONE]') {
          streamDone = true;
          break;
        }

        try {
          const parsed: StreamMessage = JSON.parse(jsonStr);
          console.debug('[chatbot SSE parsed]', parsed);

          if (parsed.type === 'delta' && parsed.content) {
            onDelta(parsed.content);
          } else if (parsed.type === 'error') {
            onError(parsed.content || 'An error occurred. Please try again.');
            streamDone = true;
            doneCalled = true; // Mark as handled
            return; // Exit immediately on error
          } else if (parsed.type === 'done') {
            if (!doneCalled) {
              doneCalled = true;
              onDone();
            }
            streamDone = true;
            return; // Exit cleanly after done
          }
        } catch (parseError) {
          // JSON may be split across chunks: re-buffer and wait for more data
          // Only re-buffer if it looks like incomplete JSON (starts with { or [)
          if (jsonStr.startsWith('{') || jsonStr.startsWith('[')) {
            buffer = 'data: ' + jsonStr + '\n' + buffer;
            console.debug('[chatbot] Re-buffering incomplete JSON');
          } else {
            console.debug('[chatbot] Skipping unparseable line:', jsonStr.substring(0, 50));
          }
          break; // Exit inner while loop to read more data
        }
      }
    }

    // Final flush in case remaining buffered lines arrived without trailing newline
    if (!doneCalled && buffer.trim()) {
      console.debug('[chatbot] Processing final buffer');
      for (let raw of buffer.split('\n')) {
        const trimmed = raw.trim();
        if (!trimmed || trimmed.startsWith(':') || !trimmed.startsWith('data: ')) continue;
        const jsonStr = trimmed.slice(6).trim();
        if (jsonStr === '[DONE]') continue;
        try {
          const parsed: StreamMessage = JSON.parse(jsonStr);
          if (parsed.type === 'delta' && parsed.content) {
            onDelta(parsed.content);
          } else if (parsed.type === 'done' && !doneCalled) {
            doneCalled = true;
            onDone();
            return;
          }
        } catch {
          // ignore partial leftovers
        }
      }
    }

    // Only call onDone if it hasn't been called yet
    if (!doneCalled) {
      doneCalled = true;
      onDone();
    }
  } catch (error) {
    console.error('Stream error:', error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Connection lost. Please check your internet and try again.';
    onError(errorMessage);
  }
};
