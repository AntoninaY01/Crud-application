import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from "@angular/forms";
import { EventGuestsAmount, EventTypes } from "../../shared/constants/event-constants";
import { EventActionsService } from "../../services/event-actions.service";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  fb: FormBuilder = inject(FormBuilder);
  eventActionsService: EventActionsService = inject(EventActionsService);
  messageService: MessageService = inject(MessageService);

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
    { name: EventGuestsAmount.SMALL_GUEST_GROUP, code: 'sm' },
    { name: EventGuestsAmount.AVERAGE_GUEST_GROUP, code: 'md' },
    { name: EventGuestsAmount.LARGE_GUEST_GROUP, code: 'lg' },
  ];



  ngOnInit() {
    this.initializeForm()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      eventType: [null],
      eventName: [],
      guestsAmount: [null],
      date: [],
      address: [],
      dresscode: []
    })
  }

  submit(): void {
    this.eventActionsService.createNewEventUsingPOST(this.form.value).subscribe({
      next: (res) => {
        console.log('success')
        console.log(res)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Success' });
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
        console.error('Error', err)
      }
    })
  }
}
