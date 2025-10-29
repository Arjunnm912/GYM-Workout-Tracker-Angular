import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {WorkoutResponse} from'../../core/models/workoutdata.model'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WorkoutData {
  constructor(private httpclient:HttpClient){}

  getWorkoutByDate(date:string): Observable<WorkoutResponse> {
  //  return this.httpclient.get(`${environment.apiUrl}"getWorkoutByDate/"${date}`)
  console.log("data fetch" , date)
   return this.httpclient.get<WorkoutResponse>(environment.apiUrl+"getWorkoutByDate/" + date)
  }

    postWorkout(data: any) {
      console.log(data)
    return this.httpclient.post(environment.apiUrl+"postWorkoutByDay", data);
    // return this.httpclient.post("http://localhost:8500/postWorkoutByDay", data);

  }


}
