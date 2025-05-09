import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLightColorBase } from '../../state/color/color.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: false,
})
export class HomeComponent {
  lightColorBase: string = "";

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.select(selectLightColorBase).subscribe(
      (lightColorBase) => {
        this.lightColorBase = lightColorBase
      })
  }
}
