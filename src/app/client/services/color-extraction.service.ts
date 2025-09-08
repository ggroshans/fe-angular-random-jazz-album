import { Injectable } from '@angular/core';
import ColorThief from 'colorthief';

export interface AppColors {
  lightColorBase: string;
  darkColorBase: string;
  tertiaryColor: string;
}

@Injectable({
  providedIn: 'root',
})
export class ColorExtractionService {
  private colorThief = new ColorThief();

  getPaletteFromUrl(imageUrl: string): Promise<AppColors> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = imageUrl;

      image.onload = () => {
        try {
          const palette = this.colorThief.getPalette(image, 3);

          const brightness = (rgb: number[]) => rgb.reduce((sum, val) => sum + val, 0);

          palette.sort((a: number[], b: number[]) => brightness(a) - brightness(b));

          const [darkest, middle, lightest] = palette;

          resolve({
            lightColorBase: `rgb(${lightest.join(', ')})`,
            darkColorBase: `rgb(${darkest.join(', ')})`,
            tertiaryColor: `rgb(${middle.join(', ')})`,
          });
        } catch (error) {
          console.error('ColorThief failed to get palette:', error);
          reject(error);
        }
      };

      image.onerror = (err) => {
        console.error('Image failed to load for color extraction:', err);
        reject('Image load error');
      };
    });
  }
}
