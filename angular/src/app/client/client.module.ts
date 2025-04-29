import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { albumReducer } from './state/album/album.reducer';
import { AlbumEffects } from './state/album/album.effects';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { ItemDetailComponent } from './components/shared/item-detail/item-detail.component';
import { AlbumDetailComponent } from './components/album/album-detail/album-detail.component';
import { HomeComponent } from './components/home/home.component';
import { ClientRoutingModule } from './client-routing.module';
import { artistReducer } from './state/artist/artist.reducer';
import { ArtistEffects } from './state/artist/artist.effects';
import { ArtistDetailComponent } from './components/artist/artist-detail/artist-detail.component';
import { colorReducer } from './state/color/color.reducer';

@NgModule({
  declarations: [
    HomeComponent,
    AlbumDetailComponent,
    ItemDetailComponent,
    ArtistDetailComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    StoreModule.forFeature('album', albumReducer),
    EffectsModule.forFeature([AlbumEffects]),
    StoreModule.forFeature('artist', artistReducer),
    EffectsModule.forFeature([ArtistEffects]),
    StoreModule.forFeature('color', colorReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
})
export class ClientModule { }
