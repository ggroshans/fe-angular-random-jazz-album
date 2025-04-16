import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: false,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AdminDashboardComponent {

  public formDiscography!: FormGroup;
  public currentYear: Number = 2025;

  constructor(public adminService: AdminService) {
    this.formDiscography = new FormGroup({
      artistName: new FormControl('', [Validators.required]),
    })
  }

  public fetchArtistDiscography() {
    if (this.formDiscography.valid) {

      const artistName = this.formDiscography.value.artistName;
      if (typeof artistName == 'string') {
        const trimmedArtistName = artistName.trim();
        const requestData: string = JSON.stringify(trimmedArtistName);

        this.adminService.createAlbumsFromArtistName(requestData).subscribe({
          error: (error) => console.error("Error sending form data", error),
          complete: () => console.log("Sent form data successfully")
        })
      }

    }
  }
}
