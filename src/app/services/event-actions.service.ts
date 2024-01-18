import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class EventActionsService {
  http: HttpClient = inject(HttpClient);

  createNewEventUsingPOST(newEvent: any): Observable<any> {
    return this.http.post<{ message: string }>('http://localhost:3000/api/event', newEvent);
  }
}