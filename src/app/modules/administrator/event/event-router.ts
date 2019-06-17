import { Routes, RouterModule } from '@angular/router';
import { CurrentEventComponent } from './current-event/current-event.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: 'current-event', component: CurrentEventComponent, 
  },
  {
    path: 'history', component: HistoryComponent, 
  },
];

export const EventRouter = RouterModule.forChild(routes);