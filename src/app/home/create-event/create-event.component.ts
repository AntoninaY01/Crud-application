import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from "@angular/forms";
import { EventGuestsAmount, EventTypes } from "../../shared/constants/event-constants";
import { EventActionsService } from "../../services/event-actions.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  fb: FormBuilder = inject(FormBuilder);
  eventActionsService: EventActionsService = inject(EventActionsService)

  form!: UntypedFormGroup;
  submitted = false;
  eventTypeOptions = [
    { name: EventTypes.WEDDING, code: 'wed' },
    { name: EventTypes.BIRTHDAY, code: 'bd' },
    { name: EventTypes.GRADUATION, code: 'grad' },
    { name: EventTypes.TRIP, code: 'trip' },
    { name: EventTypes.CUSTOM, code: 'cstm' }
  ];
  eventGuestsAmountOptions = [
    { name: EventGuestsAmount.SMALL_GUEST_GROUP, code: 'wed' },
    { name: EventGuestsAmount.AVERAGE_GUEST_GROUP, code: 'bd' },
    { name: EventGuestsAmount.LARGE_GUEST_GROUP, code: 'grad' },
  ];



  ngOnInit() {
    this.initializeForm()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      eventType: [],
      eventName: [],
      guestsAmount: [],
      date: [],
      address: [],
      dresscode: []
    })
  }

  submit(): void{
    this.eventActionsService.createNewEventUsingPOST(this.form.value).subscribe({
      next: (res) => {
        console.log('success')
        console.log(res)
      }
    })
  }
}
