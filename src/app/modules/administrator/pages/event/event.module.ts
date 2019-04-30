import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentEventComponent } from './components/current-event/current-event.component';
import { EventRouter } from './event-router';
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [CurrentEventComponent],
  imports: [
    CommonModule,
    EventRouter,
    FormsModule
  ]
})
export class EventModule { }
