export type Task = {
    id: string;
    title: string;
    maxAmount: number;
    sortBy: string;
    query: string;
  };
  
  export type SavedQueriesState = {
    savedQueries: Task[];
    openModalWindow: boolean;
    currentQueryId: string | null;
    query: string;
    inputValue: number;
    savedQuery: string;
  };