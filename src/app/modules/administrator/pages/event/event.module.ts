import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentEventComponent } from './components/current-event/current-event.component';
import { EventRouter } from './event-router';
import { FormsModule } from "@angular/forms";
import { ClarityModule } from '@clr/angular';
import { AddEventComponent } from './components/add-event/add-event.component';


@NgModule({
  declarations: [CurrentEventComponent, AddEventComponent],
  imports: [
    CommonModule,
    ClarityModule,
    EventRouter,
    FormsModule
  ],
  exports: [ CurrentEventComponent, AddEventComponent ]
})
export class EventModule { }
