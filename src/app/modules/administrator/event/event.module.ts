import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentEventComponent } from './current-event/current-event.component';
import { EventRouter } from './event-router';
import { FormsModule } from "@angular/forms";
import { ClarityModule } from '@clr/angular';
import { AddEventComponent } from './add-event/add-event.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { QueueComponent } from './queue/queue.component';
import { HistoryComponent } from './history/history.component';


@NgModule({
  declarations: [CurrentEventComponent, AddEventComponent, QueueComponent, HistoryComponent],
  imports: [
    CommonModule,
    ClarityModule,
    EventRouter,
    FormsModule,
    DlDateTimeDateModule, 
    DlDateTimePickerModule
  ],
  exports: [ CurrentEventComponent, AddEventComponent, QueueComponent ]
})
export class EventModule { }
