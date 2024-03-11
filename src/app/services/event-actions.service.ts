import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { EventDTO } from "../shared/models/eventDTO";

@Injectable({providedIn: 'root'})
export class EventActionsService {
  http: HttpClient = inject(HttpClient);

  createNewEventUsingPOST(newEvent: any): Observable<any> {
    return this.http.post<{ message: string }>('http://localhost:3000/api/event', newEvent);
  }

  getAllEventsUsingGET(): Observable<EventDTO[]>{
    return this.http.get<{ message: string, eventList: EventDTO[] }>('http://localhost:3000/api/event')
        .pipe(map((userData: any) => {
          return userData.eventList.map((user: any) => {
            return {
              eventType: user.eventType,
              eventName: user.eventName,
              guestsAmount: user.guestsAmount,
              date: user.date,
              address: user.address,
              dresscode: user.dresscode
            }
          })
        }))
  }
}