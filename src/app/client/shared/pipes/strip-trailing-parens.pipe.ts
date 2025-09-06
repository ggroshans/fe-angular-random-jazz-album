import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stripTrailingParens', pure: true, standalone: false })
export class StripTrailingParensPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    const s = (value ?? '').trim();
    return s.replace(/\s*\([^)]*\)\s*$/, '').trim();
  }
}
