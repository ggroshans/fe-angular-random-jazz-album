import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-detail',
  standalone: false,
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {
  @Input() icon!: string;
  @Input() label!: string;
  @Input() value!: string;
}
