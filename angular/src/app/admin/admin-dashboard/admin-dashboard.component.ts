import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from '../services/admin.service';
import { DiscoRequestDto } from '../models/admin.types';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css'],
    standalone: false
})
export class AdminDashboardComponent {

  public formDiscography!: FormGroup;

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
        const requestData: DiscoRequestDto = { artistName: trimmedArtistName }

        this.adminService.createAlbumsFromArtistName(requestData).subscribe({
          error: (error) => console.error("Error sending form data", error),
          complete: () => console.log("Sent form data successfully")
        })
      }

    }
  }
}
