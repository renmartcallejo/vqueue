import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { QueueComponent } from './pages/queue/queue.component';

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
        path: 'event', loadChildren: './pages/event/event.module#EventModule'
      },
      {
        path: 'queue', component: QueueComponent
      }
    ]
  },

];

export const AdministratorRouter = RouterModule.forChild(routes);