import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminService } from '../services/admin.service';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let adminSvcMock: any;

  beforeEach(() => {
    adminSvcMock = {
      createAlbumsFromArtistName: vi.fn().mockReturnValue(of({ message: 'Import OK' })),
      runBatchEnrichment: vi.fn().mockReturnValue(of({ message: 'Enrichment OK' })),
    };

    TestBed.configureTestingModule({
      declarations: [AdminDashboardComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: AdminService, useValue: adminSvcMock }],
    });

    component = TestBed.createComponent(AdminDashboardComponent).componentInstance;
  });

  it('fetchArtistDiscography success', () => {
    component.formDiscography.setValue({ artistName: 'Coltrane' });
    component.fetchArtistDiscography();
    expect(component.importMsg).toEqual({ ok: true, text: 'Import OK' });
    expect(component.isImporting).toBe(false);
  });

  it('runBatchEnrichment success', () => {
    component.runBatchEnrichment();
    expect(component.enrichMsg).toEqual({ ok: true, text: 'Enrichment OK' });
    expect(component.isEnriching).toBe(false);
  });
});
