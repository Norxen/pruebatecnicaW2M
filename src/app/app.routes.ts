import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./main/components/main/main.component').then(
        (m) => m.MainComponent
      ),
  },
  {
    path: 'edit-hero',
    loadComponent: () =>
      import('./main/components/pages/edit-view/edit-view.component').then(
        (m) => m.EditViewComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
