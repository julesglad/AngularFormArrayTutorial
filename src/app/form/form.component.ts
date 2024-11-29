import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  tasksForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tasksForm = this.fb.group({
      tasks: this.fb.array([]), // Main tasks array
    });
  }

  // Getter for the tasks FormArray
  get tasks(): FormArray {
    return this.tasksForm.get('tasks') as FormArray;
  }

  // Helper to get subtasks FormArray for a specific task
  subtasks(index: number): FormArray {
    return (this.tasks.at(index) as FormGroup).get('subtasks') as FormArray;
  }

  // Add a new task
  addTask(taskName: string = '') {
    const taskGroup = this.fb.group({
      taskName: taskName || '',
      subtasks: this.fb.array([]), // Subtasks array for each task
    });
    this.tasks.push(taskGroup);
  }

  // Add a subtask to a specific task
  addSubtask(taskIndex: number, subtaskName: string = '') {
    this.subtasks(taskIndex).push(this.fb.control(subtaskName || ''));
  }


  // Remove a specific task
  removeTask(index: number) {
    this.tasks.removeAt(index);
  }

  // Remove a specific subtask
  removeSubtask(taskIndex: number, subtaskIndex: number) {
    this.subtasks(taskIndex).removeAt(subtaskIndex);
  }

  // Clear all tasks
  clearAllTasks() {
    this.tasks.clear();
  }


  loadSampleTasks() {
    const sampleTasks = [
      {
        taskName: 'Laundry',
        subtasks: ['Wash clothes', 'Dry clothes', 'Fold clothes'],
      },
      {
        taskName: 'Homework',
        subtasks: ['Math problems', 'Science project'],
      },
      {
        taskName: 'Prep Lunch',
        subtasks: [], // No subtasks for this task
      },
    ];
  
    sampleTasks.forEach((task) => {
      const taskGroup = this.fb.group({
        taskName: task.taskName,
        subtasks: this.fb.array(
          task.subtasks.map((subtask) => this.fb.control(subtask))
        ),
      });
      this.tasks.push(taskGroup);
    });
  }

}
