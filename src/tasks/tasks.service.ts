import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status';
import { CreateTaskDto } from './DTO/create-task.dto';
import { GetTaskFilterDto } from './DTO/get-task-filter.dto';
import { TasksRepository } from 'src/tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}
  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskWisthFilter(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const result = await this.taskRepository.findOneById(id);
    if (!result) {
      throw new NotFoundException(`Task with Id "${id}" not found`);
    }
    return result;
  }

  // getTaskById(id: string): Task {
  //   const result = this.tasks.find((task) => task.id == id);
  //   if (!result) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   return result;
  // }

  // deleteTask(id: string): void {
  //   const taskId = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== taskId.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }
}
