import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  public todoForm: FormGroup | undefined;

  constructor(private readonly _fb: FormBuilder, private readonly _dialogRef: MatDialogRef<AddTodoComponent>) {}

  ngOnInit(): void {
    this.initForm();
  }

  onCreate() {
    if (this.todoForm?.valid) {
      this._dialogRef.close(this.todoForm.value);
    }
  }

  private initForm(): void {
    this.todoForm = this._fb.group({
      content: ['', [Validators.required]],
    });
  }
}
