export type SavedQuery = {
    query: string;
    maxAmount?: number;
  };
  
 export type Video = {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      channelTitle: string;
    };
    statistics?: {
      viewCount?: string;
    };
  };