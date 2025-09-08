import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';

type MsgState = { ok: boolean | null; text: string };

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AdminDashboardComponent {
  public formDiscography!: FormGroup;
  public currentYear: Number = 2025;
  public isImporting = false;
  public isEnriching = false;
  public importMsg: MsgState = { ok: null, text: '' };
  public enrichMsg: MsgState = { ok: null, text: '' };

  constructor(public adminService: AdminService) {
    this.formDiscography = new FormGroup({
      artistName: new FormControl('', [Validators.required]),
    });
  }

  public fetchArtistDiscography(): void {
    if (!this.formDiscography.valid) {
      this.formDiscography.markAllAsTouched();
      return;
    }
    const artistName = this.formDiscography.value.artistName;
    if (typeof artistName === 'string') {
      const trimmedArtistName = artistName.trim();
      this.importMsg = { ok: null, text: '' };
      this.isImporting = true;
      this.adminService.createAlbumsFromArtistName(trimmedArtistName).subscribe({
        next: (res) => {
          this.importMsg = {
            ok: true,
            text: res?.message ?? 'Import successful.',
          };
        },
        error: (error) => {
          const serverMsg =
            error?.error?.message || error?.message || 'Import failed. Please try again.';
          this.importMsg = { ok: false, text: serverMsg };
          this.isImporting = false;
        },
        complete: () => {
          this.isImporting = false;
          if (this.importMsg.ok === true) {
            this.formDiscography.reset();
          }
        },
      });
    }
  }

  public runBatchEnrichment(): void {
    this.enrichMsg = { ok: null, text: '' };
    this.isEnriching = true;
    this.adminService.runBatchEnrichment().subscribe({
      next: (res) => {
        this.enrichMsg = {
          ok: true,
          text: res?.message ?? 'Enrichment successful.',
        };
      },
      error: (error) => {
        const serverMsg =
          error?.error?.message || error?.message || 'Enrichment failed. See logs and try again.';
        this.enrichMsg = { ok: false, text: serverMsg };
        this.isEnriching = false;
      },
      complete: () => {
        this.isEnriching = false;
      },
    });
  }
}
