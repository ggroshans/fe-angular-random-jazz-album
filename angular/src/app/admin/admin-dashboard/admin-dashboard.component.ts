import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  public albumForm!: FormGroup;

  constructor() {
    this.albumForm = new FormGroup({
      artistName: new FormControl('', [Validators.required]),
      albumName: new FormControl('', [Validators.required])
    });
  }

  public onSubmit() {
    if (this.albumForm.valid) {
      console.log("Form Submitted", this.albumForm.value);
    } else {
      console.log("Form is invalid");
    }
  }
}
