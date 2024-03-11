import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { EventActionsService } from "../services/event-actions.service";
import { Calendar } from "primeng/calendar";
import { FormBuilder, UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  reservedDates: Date[] = [];
  @ViewChild('calendar') calendar!: Calendar
  form!: UntypedFormGroup;
  isFormReady = false;
  private eventActionService: EventActionsService = inject(EventActionsService);
  private fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {

    this.eventActionService.getAllEventsUsingGET().subscribe((v) => {
      v.forEach(data => {
        this.reservedDates.push(data.date);
      })


      this.initializeForm();
    })
  }

  onSelect(event: Event): void {
    if (event && event instanceof Date) {
      const selectedDate = event;
      console.log('Selected Date:', selectedDate);

      if (this.isDateBusy(selectedDate)) {
        console.log('Date is busy.');
      } else {
        console.log('Date is not busy.');
      }
    }
  }

  initializeForm(): void {
    this.form = this.fb.group({
      reservedDates: [this.reservedDates]
    })
    this.isFormReady = true;
  }


  dateMatches(date1: Date, date2: any): boolean {
    const parsedDate = new Date(date1);

    if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
      console.error("Invalid date1:", date1);
      return false;
    }
    return (
        parsedDate.getDate() === date2.day &&
        parsedDate.getMonth() === date2.month &&
        parsedDate.getFullYear() === date2.year
    );
  }

  isDateBusy(date: Date): boolean {
    return this.reservedDates.some(reservedDateItem =>
        this.dateMatches(reservedDateItem, date)
    );
  }


}
