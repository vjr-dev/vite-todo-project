export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export type FilterType = "all" | "completed" | "pending";
