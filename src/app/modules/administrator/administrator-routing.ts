import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { QueueComponent } from './queue/queue.component';

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
      {
        path: 'queue', component: QueueComponent
      },
    ]
  },

];

export const AdministratorRouter = RouterModule.forChild(routes);