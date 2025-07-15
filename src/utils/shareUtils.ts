export interface ShareData {
  title: string;
  url: string;
}

export const generateShareUrls = (data: ShareData) => {
  const { title, url } = data;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const text = encodeURIComponent(`${title} ${url}`);

  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${text}`,
    instagram: null, // Instagram doesn't support direct sharing URLs
  };
};

export const copyToClipboard = async (text: string): Promise<void> => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  }
};

export const getCurrentPageUrl = (postId?: string): string => {
  const baseUrl = window.location.origin;
  if (postId) {
    return `${baseUrl}/blog/${postId}`;
  }
  return window.location.href;
};