import {inject} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {Router} from '@angular/router';
import {map, mergeMap, of} from 'rxjs';

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    mergeMap((isAuthenticated) => isAuthenticated ? authService.idTokenClaims$ : of(false)),
    map(claims => {
      if (claims?.['https://www.yogaenpevele.fr/roles']?.includes('admin')) {
        return true
      }
      return router.parseUrl('/')
    })
  );

};
