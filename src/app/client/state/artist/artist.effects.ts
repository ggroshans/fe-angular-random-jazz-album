import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ArtistActions from '../artist/artist.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ArtistService } from '../../services/artist.service';

@Injectable()
export class ArtistEffects {
  constructor(
    private actions$: Actions,
    private artistService: ArtistService,
  ) {}

  loadArtist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistActions.loadArtist),
      mergeMap(({ artistId }) =>
        this.artistService.getArtistById(artistId).pipe(
          map((artist) => ArtistActions.loadArtistSuccess({ artist })),
          catchError((error) => of(ArtistActions.loadArtistFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
