export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
}

export interface CreateTodoDto {
  title: string;
  description: string;
}
