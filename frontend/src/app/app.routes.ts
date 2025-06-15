import { Routes } from '@angular/router';
export const routes: Routes = [
    {path: '',loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)},
    {path: 'documents',loadComponent: ()=> import('./documents/documents.component').then(m => m.DocumentsComponent)}
];
