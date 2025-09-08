import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlbumDetailComponent } from './pages/album-detail/album-detail.component';
import { AlbumListPageComponent } from './pages/album-list-page/album-list-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'albums',
    component: AlbumListPageComponent,
  },

  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: AlbumDetailComponent,
      },
      {
        path: 'album/:albumId',
        component: AlbumDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
