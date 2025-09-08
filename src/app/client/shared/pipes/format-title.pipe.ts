import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatTitle', pure: true, standalone: false })
export class FormatTitlePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    const s = (value ?? '').trim();
    return s.replace(/\s*\([^)]*\)\s*$/, '').trim();
  }
}
