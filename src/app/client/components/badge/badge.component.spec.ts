import { describe, it, expect } from 'vitest';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  it('builds classes and gates click emit', () => {
    const c = new BadgeComponent();
    c.variant = 'purple';
    c.size = 'lg';
    c.clickable = true;
    expect(c.classes).toEqual(['badge', 'badge--purple', 'badge--lg', 'badge--clickable']);

    const calls: MouseEvent[] = [];
    c.badgeClick.subscribe((e) => calls.push(e));
    c.clickable = false;
    c.onClick(new MouseEvent('click'));
    c.clickable = true;
    c.onClick(new MouseEvent('click'));
    expect(calls.length).toBe(1);
  });

  it('returns styles only for custom variant with color', () => {
    const c = new BadgeComponent();
    c.variant = 'custom';
    c.customColor = '#336699';
    expect(c.customStyles['background-color']).toBeTruthy();
    c.variant = 'purple';
    expect(Object.keys(c.customStyles).length).toBe(0);
  });
});
