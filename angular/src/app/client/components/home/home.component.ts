import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSecondaryColor } from '../../state/color/color.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: false,
})
export class HomeComponent {
  secondaryColor: string = "";

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.select(selectSecondaryColor).subscribe(
      (secondaryColor) => {
        this.secondaryColor = secondaryColor
        console.log("color changed");
      })
  }
}
