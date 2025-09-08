import { describe, it, expect } from 'vitest';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  it('has sane defaults and emits only in-range pages', () => {
    const c = new PaginationComponent();
    expect(c.currentPage).toBe(1);
    expect(c.totalPages).toBe(0);

    c.totalPages = 4;
    const got: number[] = [];
    c.pageChange.subscribe((v) => got.push(v));

    c.goToPage(0);
    c.goToPage(3);
    c.goToPage(5);
    expect(got).toEqual([3]);
  });
});
