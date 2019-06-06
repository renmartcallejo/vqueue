import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: AdministratorComponent, 

    children: [
      {  
        path: '', redirectTo: 'dashboard', 
      },
      {
        path: 'dashboard', component: DashboardComponent 
      },
      {
        path: 'event', loadChildren: './event/event.module#EventModule'
      },
    ]
  },

];

export const AdministratorRouter = RouterModule.forChild(routes);