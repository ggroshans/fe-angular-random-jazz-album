import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  public albumForm!: FormGroup;

  constructor(public adminService: AdminService) {
    this.albumForm = new FormGroup(
      {
        artistName: new FormControl('', [Validators.required]),
        albumName: new FormControl('', [Validators.required])
      }
    );
  }

  public onSubmit() {
    if (this.albumForm.valid) {
      const formData = this.albumForm.value;
      this.adminService.createPost(formData).subscribe({
        error: (error) => console.error("Error sending form data", error),
        complete: () => console.log("Sent form data succesfully")
      });

    } else {
      console.error("Form is invalid");
    }
  }
}
