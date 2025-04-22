import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AlbumDetailComponent } from './components/album/album-detail/album-detail.component';
import { ArtistDetailComponent } from './components/artist/artist-detail/artist-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'random-album',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'artist/:artistId', component: ArtistDetailComponent
      },
      {
        path: 'random-album', component: AlbumDetailComponent
      },
      {
        path: 'album/:albumId', component: AlbumDetailComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
