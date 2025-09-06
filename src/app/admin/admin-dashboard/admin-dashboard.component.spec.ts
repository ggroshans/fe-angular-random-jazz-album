import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/angular';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminService } from '../services/admin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { describe, it, vi, expect } from 'vitest';

const mockAdminService = {
  createAlbumsFromArtistName: vi.fn().mockReturnValue(of({ message: 'Success' })),
  runBatchEnrichment: vi.fn().mockReturnValue(of({ message: 'Success' })),
};

describe('AdminDashboardComponent', () => {
  it('should render the dashboard with initial form and buttons', async () => {
    await render(AdminDashboardComponent, {
      imports: [ReactiveFormsModule],
      providers: [{ provide: AdminService, useValue: mockAdminService }],
    });

    expect(screen.getByRole('heading', { name: /import artist discography/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/artist name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /import artist/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /run enrichment/i })).toBeInTheDocument();
  });
});
