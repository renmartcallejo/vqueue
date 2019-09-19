import { Routes, RouterModule } from '@angular/router';
import { CurrentEventComponent } from './current-event/current-event.component';
import { HistoryComponent } from './history/history.component';
import { AddEventComponent } from './add-event/add-event.component';

const routes: Routes = [
  {
    path: 'add-event', component: AddEventComponent, 
  },
  {
    path: 'current-event', component: CurrentEventComponent, 
  },
  {
    path: 'history', component: HistoryComponent, 
  },
];

export const EventRouter = RouterModule.forChild(routes);