import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export type BadgeVariant =
  | 'secondary'
  | 'outline'
  | 'purple'
  | 'teal'
  | 'amber'
  | 'rose'
  | 'blue'
  | 'indigo'
  | 'green'
  | 'orange'
  | 'red'
  | 'violet'
  | 'lime'
  | 'pink'
  | 'sky'
  | 'slate'
  | 'stone'
  | 'custom';

type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'secondary';
  @Input() size: BadgeSize = 'sm';
  @Input() clickable = false;
  @Input() ariaLabel?: string;
  @Input() customColor?: string;
  @Output() badgeClick = new EventEmitter<MouseEvent>();

  onClick(e: MouseEvent) {
    if (this.clickable) this.badgeClick.emit(e);
  }

  get classes() {
    return [
      `badge`,
      `badge--${this.variant}`,
      `badge--${this.size}`,
      this.clickable ? 'badge--clickable' : '',
    ];
  }

  get customStyles() {
    if (this.variant === 'custom' && this.customColor) {
      console.log('Applying custom color:', this.customColor);
      const colors = this.generateColorPalette(this.customColor);

      if (colors) {
        return {
          'background-color': colors.background,
          color: colors.text,
          'border-color': colors.border,
          '--hover-bg': colors.backgroundHover,
          '--hover-border': colors.borderHover,
        };
      }
    }
    return {};
  }

  private generateColorPalette(baseColor: string): {
    background: string;
    text: string;
    border: string;
    backgroundHover: string;
    borderHover: string;
  } | null {
    const rgb = this.parseColor(baseColor);
    if (!rgb) {
      console.warn('Invalid color format:', baseColor);
      return null;
    }

    const luminance = this.calculateLuminance(rgb.r, rgb.g, rgb.b);

    const backgroundRgb = this.lightenColor(rgb, 0.85);
    const borderRgb = this.lightenColor(rgb, 0.4);
    const backgroundHoverRgb = this.lightenColor(rgb, 0.75);
    const borderHoverRgb = this.lightenColor(rgb, 0.2);
    const darkenFactor = Math.max(0.1, 0.7 - luminance * 0.6);
    const textRgb = this.darkenColor(rgb, darkenFactor);

    return {
      background: `rgb(${backgroundRgb.r}, ${backgroundRgb.g}, ${backgroundRgb.b})`,
      text: `rgb(${textRgb.r}, ${textRgb.g}, ${textRgb.b})`,
      border: `rgb(${borderRgb.r}, ${borderRgb.g}, ${borderRgb.b})`,
      backgroundHover: `rgb(${backgroundHoverRgb.r}, ${backgroundHoverRgb.g}, ${backgroundHoverRgb.b})`,
      borderHover: `rgb(${borderHoverRgb.r}, ${borderHoverRgb.g}, ${borderHoverRgb.b})`,
    };
  }

  private parseColor(color: string): { r: number; g: number; b: number } | null {
    color = color.trim();

    const rgbMatch = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (rgbMatch) {
      return {
        r: parseInt(rgbMatch[1], 10),
        g: parseInt(rgbMatch[2], 10),
        b: parseInt(rgbMatch[3], 10),
      };
    }

    const rgbaMatch = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*[\d.]+\s*\)$/i);
    if (rgbaMatch) {
      return {
        r: parseInt(rgbaMatch[1], 10),
        g: parseInt(rgbaMatch[2], 10),
        b: parseInt(rgbaMatch[3], 10),
      };
    }

    return this.hexToRgb(color);
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    hex = hex.replace('#', '').toLowerCase();

    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }

    if (!/^[0-9a-f]{6}$/i.test(hex)) {
      return null;
    }

    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  private calculateLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  private lightenColor(
    rgb: { r: number; g: number; b: number },
    factor: number,
  ): { r: number; g: number; b: number } {
    return {
      r: Math.round(rgb.r + (255 - rgb.r) * factor),
      g: Math.round(rgb.g + (255 - rgb.g) * factor),
      b: Math.round(rgb.b + (255 - rgb.b) * factor),
    };
  }

  private darkenColor(
    rgb: { r: number; g: number; b: number },
    factor: number,
  ): { r: number; g: number; b: number } {
    return {
      r: Math.round(rgb.r * factor),
      g: Math.round(rgb.g * factor),
      b: Math.round(rgb.b * factor),
    };
  }
}
