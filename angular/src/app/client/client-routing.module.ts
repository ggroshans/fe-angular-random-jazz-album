import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AlbumDetailComponent } from './components/album/album-detail/album-detail.component';
import { ArtistDetailComponent } from './components/artist/artist-detail/artist-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '', component: AlbumDetailComponent
      },
      {
        path: 'artist/:artistId', component: ArtistDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
