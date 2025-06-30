import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlbumService } from '../../services/album.service';
import * as AlbumActions from '../album/album.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AlbumEffects {
  constructor(
    private actions$: Actions,
    private albumService: AlbumService,
  ) {}

  loadRandomAlbum$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumActions.loadRandomAlbum),
      mergeMap(() =>
        this.albumService.getRandomAlbum().pipe(
          map((album) => AlbumActions.loadRandomAlbumSuccess({ album })),
          catchError((error) => of(AlbumActions.loadRandomAlbumFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  loadAlbumById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumActions.loadAlbumById),
      mergeMap(({ id }) =>
        this.albumService.getAlbumById(id).pipe(
          map((album) => AlbumActions.loadAlbumByIdSuccess({ album })),
          catchError((error) => of(AlbumActions.loadAlbumByIdFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
