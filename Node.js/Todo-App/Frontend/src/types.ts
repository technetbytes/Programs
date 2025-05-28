export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export interface CreateTodoDto {
  title: string;
  description: string;
}
