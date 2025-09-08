import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLightColorBase, selectTertiaryColor } from '../../state/color/color.selectors';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false,
})
export class HomeComponent {
  readonly vm$ = combineLatest({
    lightColor: this.store.select(selectLightColorBase),
    tertiaryColor: this.store.select(selectTertiaryColor),
  });

  constructor(private store: Store) {}
}
