import { Routes, RouterModule } from '@angular/router';
import { CurrentEventComponent } from './current-event/current-event.component';

const routes: Routes = [
  {
    path: 'current-event', component: CurrentEventComponent, 
  },
];

export const EventRouter = RouterModule.forChild(routes);