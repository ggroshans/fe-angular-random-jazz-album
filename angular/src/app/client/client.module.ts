import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ItemDetailComponent } from './shared/item-detail/item-detail.component';
import { AlbumDetailComponent } from './album/album-detail/album-detail.component';
import { HomeComponent } from './home/home.component';
import { ClientRoutingModule } from './client-routing.module';

@NgModule({
  declarations: [HomeComponent, AlbumDetailComponent, ItemDetailComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
  ],
})
export class ClientModule { }
