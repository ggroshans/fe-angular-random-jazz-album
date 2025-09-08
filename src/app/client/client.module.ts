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
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

import { ClientRoutingModule } from './client-routing.module';
import { artistReducer } from './state/artist/artist.reducer';
import { ArtistEffects } from './state/artist/artist.effects';
import { colorReducer } from './state/color/color.reducer';

import { HomeComponent } from './pages/home/home.component';
import { AlbumDetailComponent } from './pages/album-detail/album-detail.component';
import { AlbumHeroComponent } from './components/album-hero/album-hero.component';
import { ScoreCardComponent } from './components/score-card/score-card.component';
import { ArtistInfoCardComponent } from './components/artist-info-card/artist-info-card.component';
import { AlbumInfoGroupComponent } from './components/album-info-group/album-info-group.component';
import { AnalysisCardComponent } from './components/analysis-card/analysis-card.component';
import { ArtistDisplayPipe } from './shared/pipes/artist-display.pipe';
import { BadgeComponent } from './components/badge/badge.component';
import { AlbumInfoCardComponent } from './components/album-info-card/album-info-card.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { AlbumListPageComponent } from './pages/album-list-page/album-list-page.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormatTitlePipe } from './shared/pipes/format-title.pipe';
import { AlbumNavigationComponent } from './components/album-navigation/album-navigation.component';

@NgModule({
  declarations: [
    HomeComponent,
    AlbumDetailComponent,
    AlbumHeroComponent,
    ScoreCardComponent,
    ArtistInfoCardComponent,
    AlbumInfoGroupComponent,
    AnalysisCardComponent,
    ScoreCardComponent,
    BadgeComponent,
    AlbumInfoCardComponent,
    AlbumCardComponent,
    AlbumListPageComponent,
    PaginationComponent,
    AlbumNavigationComponent,
    ArtistDisplayPipe,
    FormatTitlePipe,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatTabsModule,
    StoreModule.forFeature('album', albumReducer),
    EffectsModule.forFeature([AlbumEffects]),
    StoreModule.forFeature('artist', artistReducer),
    EffectsModule.forFeature([ArtistEffects]),
    StoreModule.forFeature('color', colorReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
})
export class ClientModule {}
