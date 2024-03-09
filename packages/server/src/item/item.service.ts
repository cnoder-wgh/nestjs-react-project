import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItem } from '../entities/todo-item.entity';

@Injectable()
export class TodoItemService {
  constructor(
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
  ) {}

  async createTodoItem(todoItem: TodoItem): Promise<TodoItem> {
    return this.todoItemRepository.save(todoItem);
  }

  async getAllTodoItems(): Promise<TodoItem[]> {
    return this.todoItemRepository.find();
  }

  async getTodoItemById(id: number): Promise<TodoItem> {
    return this.todoItemRepository.findOne({ where: { id } });
  }

  async updateTodoItem(
    id: number,
    todoItem: Partial<TodoItem>,
  ): Promise<TodoItem> {
    await this.todoItemRepository.update(id, todoItem);
    return this.todoItemRepository.findOne({ where: { id } });
  }

  async deleteTodoItem(id: number): Promise<void> {
    await this.todoItemRepository.delete(id);
  }
}
