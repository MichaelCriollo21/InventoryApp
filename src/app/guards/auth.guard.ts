import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const firebaseSvc = inject(FirebaseService);
  const utilSvc = inject(UtilsService);

  return new Promise<boolean>((resolve) => {
    const user = localStorage.getItem('user');
    
    firebaseSvc.getAuth().onAuthStateChanged((auth) => {
      if (auth) {
        if (user) resolve(true);
      }
      else {
          firebaseSvc.signOut();
          resolve(false);
      }
    })
  });
}
