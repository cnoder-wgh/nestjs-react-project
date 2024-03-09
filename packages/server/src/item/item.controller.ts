import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TodoItem } from '../entities/todo-item.entity';
import { TodoItemService } from './item.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todo-items')
export class TodoItemController {
  constructor(private readonly todoItemService: TodoItemService) {}

  @Post()
  createTodoItem(@Body() todoItem: TodoItem): Promise<TodoItem> {
    return this.todoItemService.createTodoItem(todoItem);
  }

  @Get()
  getAllTodoItems(): Promise<TodoItem[]> {
    return this.todoItemService.getAllTodoItems();
  }

  @Get(':id')
  getTodoItemById(@Param('id') id: number): Promise<TodoItem> {
    return this.todoItemService.getTodoItemById(id);
  }

  @Put(':id')
  updateTodoItem(
    @Param('id') id: number,
    @Body() todoItem: Partial<TodoItem>,
  ): Promise<TodoItem> {
    return this.todoItemService.updateTodoItem(id, todoItem);
  }

  @Delete(':id')
  deleteTodoItem(@Param('id') id: number): Promise<void> {
    return this.todoItemService.deleteTodoItem(id);
  }
}
