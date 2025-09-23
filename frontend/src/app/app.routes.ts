import { Routes } from '@angular/router';
import { NAVIGATION_PATHS } from './shared/constants/navigation-paths';

export const routes: Routes = [
  {
    path: '',
    redirectTo: NAVIGATION_PATHS.NOTES,
    pathMatch: 'full',
  },
  {
    path: NAVIGATION_PATHS.NOTES,
    loadComponent: () => import('./pages/notes-list/notes-list'),
  },
  {
    path: NAVIGATION_PATHS.CREATE_NOTE,
    loadComponent: () => import('./pages/create-note/create-note'),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found'),
  },
];
