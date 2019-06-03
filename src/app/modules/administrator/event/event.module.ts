import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentEventComponent } from './current-event/current-event.component';
import { EventRouter } from './event-router';
import { FormsModule } from "@angular/forms";
import { ClarityModule } from '@clr/angular';
import { AddEventComponent } from './add-event/add-event.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';


@NgModule({
  declarations: [CurrentEventComponent, AddEventComponent],
  imports: [
    CommonModule,
    ClarityModule,
    EventRouter,
    FormsModule,
    DlDateTimeDateModule, 
    DlDateTimePickerModule
  ],
  exports: [ CurrentEventComponent, AddEventComponent ]
})
export class EventModule { }
