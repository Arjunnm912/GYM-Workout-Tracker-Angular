import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutData } from '../../core/services/workout-data';
import { HttpClientModule } from '@angular/common/http';
import {WorkoutResponse} from'../../core/models/workoutdata.model'



@Component({
  selector: 'app-workout-track-ing-page',
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './workout-track-ing-page.html',
  styleUrl: './workout-track-ing-page.scss',
})
export class WorkoutTrackIngPage implements OnInit {

  //#region  constructor
  constructor(private workoutdataservice:WorkoutData,private cd: ChangeDetectorRef  ){}
  //#endregion
  //#region workout group
  //Create Workout Groups
   workoutGroups:Record<string, any[]>  = {
    Push: ["Bench Press", " Overhead Press", " Dumbbell Lateral Raises", " Skull Crushers / Dips", " Rope Pushdowns"],
    Pull: [" Deadlift / Rack Pull", "Pull-Ups / Lat Pulldown", " Barbell / Dumbbell Row", " Face Pulls", " Barbell Curl", " Hammer Curl"],
    Leg: ["Back Squat", " Romanian Deadlift", " Leg Press", " Walking Lunges", "Leg Curl","Standing Calf Raise","Hanging Leg Raises"],
    Push2:["Incline Barbell Press","Dumbbell Shoulder Press","Dumbbell Fly / Cable Crossover","Arnold Press","Overhead Tricep Extension"," Rope Pushdowns",],
    Pull2:[" Weighted Pull-Ups / Chin-Ups"," T-Bar Row / Seated Row"," Lat Pulldown (different grip)"," Rear Delt Fly","Preacher Curl","Concentration Curl","Cable Woodchoppers"],
    Leg2:["Front Squat"," Bulgarian Split Squat","Hip Thrust"," Leg Extension"," Seated Hamstring Curl"," Seated Calf Raise","Ab Rollouts"]
  };
  groupOrder = ['Push', 'Pull', 'Leg','Push2', 'Pull2', 'Leg2' ];
  selectedWorkouts: any[] = [];
  savedWorkouts: any = null;
  selectedGroup = '';

  //----Change Workout Group
  onGroupChange() {

  //    this.selectedWorkouts = this.workoutGroups[this.selectedGroup].map((w: string) => ({
  //   type: w,
  //   weight: '',
  //   reps: ''
  // }));
  // if (!this.workoutGroups[this.selectedGroup]) return;

  // Only rebuild if no existing workouts
  // if (!this.selectedWorkouts.length) {
  //   this.selectedWorkouts = this.workoutGroups[this.selectedGroup].map((w: string) => ({
  //     type: w,
  //     weight: '',
  //     reps: ''
  //   }));
  // }
    if (!this.selectedGroup) return;

  const predefined = this.workoutGroups[this.selectedGroup] || [];

  // ✅ If workouts already have weights/reps from API, keep them
  if (this.selectedWorkouts.length > 0 && this.selectedWorkouts[0].type) {
    // Means data came from API — don’t overwrite
    console.log('Using workouts from API');
  } else {
    // Otherwise, generate new empty workout fields
    this.selectedWorkouts = predefined.map((w: string) => ({
      type: w,
      weight: '',
      reps: ''
    }));
  }

  this.cd.detectChanges();
  }

  //#endregion

//#region Date show box --- show and pick dates----
    monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];



  current = new Date();
  currentMonth = this.current.getMonth();
  currentYear = this.current.getFullYear();
  days: Date[] = [];
  selectedDate: Date | null = null;

  ngOnInit(): void {
    this.loadDays();
  }

   loadDays() {
    this.days = [];
    const start = new Date(this.currentYear, this.currentMonth, 1);
    const end = new Date(this.currentYear, this.currentMonth + 1, 0);
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      this.days.push(new Date(d));
    }
  }

  changeMonth(offset: number) {
    this.current.setMonth(this.current.getMonth() + offset);
    this.currentMonth = this.current.getMonth();
    this.currentYear = this.current.getFullYear();
    this.loadDays();
  }

  // testdate:string = "2025-5-28";
   workoutData: any
  errorMsg: string = '';

  selectDate(date: Date) {

    this.selectedDate = date;
    this.selectedGroup = '';
      this.selectedWorkouts = [];
    const formattedDate = new DatePipe('en-US').transform(this.selectedDate, 'yyyy-MM-dd');
    console.log("Formated Date",formattedDate)
    // this.workoutdataservice.getWorkoutByDate(this.testdate).subscribe((resp:any)=>{
    //   console.log(resp);

    // });
     if (!formattedDate) return;

    this.workoutdataservice.getWorkoutByDate(formattedDate).subscribe({
      // next: (res) => { },
        // this.workoutData = res;
        // this.errorMsg = '';
        // console.log("data" ,this.workoutData)
      //   console.log('Existing workout found:', res);
      // this.selectedGroup = res.group;
      // this.selectedWorkouts = res.workouts; // Already has type, weight, reps

      //  next: (res: WorkoutResponse) => {
      //   console.log('Workout response:', res);

      //   if (res && res.group && res.workouts) {
      //     this.selectedGroup = res.group;
      //     this.selectedWorkouts = res.workouts.map((w: any) => ({
      //       type: w.type || '',
      //       weight: w.weight || '',
      //       reps: w.reps || '',
      //     }));
      //   } else {
      //     this.selectedGroup = '';
      //     this.selectedWorkouts = [];
      //   }
      // },
      // error: (err) => {
      //   // this.workoutData = null;
      //   // this.errorMsg = err.error?.message || 'Workout not found';
      //   // console.log(this.errorMsg)
      //   console.log('No existing data, creating new form');
      //   this.selectedGroup = '';
      //   this.selectedWorkouts = [];
      // }
  //     next: (res: WorkoutResponse) => {
  //   console.log('Workout response:', res);
  //   if (res && res.group && res.workouts) {
  //     this.selectedGroup = res.group;
  //     this.selectedWorkouts = res.workouts.map((w: any) => ({
  //       type: w.type || '',
  //       weight: w.weight || '',
  //       reps: w.reps || '',
  //     }));
  //   } else {
  //     this.selectedGroup = '';
  //     this.selectedWorkouts = [];
  //   }
  // },
  // error: (err) => {
  //   console.error('Error fetching workouts:', err);
  //   this.selectedGroup = '';
  //   this.selectedWorkouts = [];
  // },

   next: (res: WorkoutResponse) => {
      // this.selectedGroup = res.group;
      // this.selectedWorkouts = res.workouts;
      // console.log("respose", res)
      // this.onGroupChange();

      if (res) {
      this.selectedGroup = res.group;
      this.selectedWorkouts = res.workouts;
      console.log("respose", res)
      this.onGroupChange();
    } else {
      this.selectedGroup = '';
      this.selectedWorkouts = [];
      console.log("tester")
    }
    },
    error: (err) => {
      if (err.status === 404) {
        console.log('No workout found, showing empty inputs.');
        this.selectedGroup = '';
        this.selectedWorkouts = [];
      } else {
        console.error('Error fetching workouts:', err);
      }
    }
    });

  }

  isToday(date: Date) {
    const t = new Date();
    return date.getDate() === t.getDate() && date.getMonth() === t.getMonth() && date.getFullYear() === t.getFullYear();
  }

  isSelected(date: Date) {
    return (
      this.selectedDate &&
      date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear()
    );
  }

//#endregion
//#region save Workout
saveData(){
  //  const formattedDate = new DatePipe('en-US').transform(this.selectedDate, 'yyyy-MM-dd');
  //  //console.log(formattedDate)
  // const dataToSave = {
  //   date: formattedDate,
  //   group: this.selectedGroup,
  //   workouts: this.selectedWorkouts
  // };

  // console.log('Saving data:', dataToSave);


  // this.workoutdataservice.postWorkout(dataToSave).subscribe({
  //   next: () => alert('Workout saved!'),
  //   error: () => alert('Error saving workout.')
  // });
  const formattedDate = new DatePipe('en-US').transform(this.selectedDate, 'yyyy-MM-dd');
  const fullwokoutdata = {
      date: formattedDate,
      group: this.selectedGroup,
      workouts: this.selectedWorkouts,
    };

    //console.log('Saving data:', dataToSave);

    this.workoutdataservice.postWorkout(fullwokoutdata).subscribe({
      next:(res)=>{
        alert('Workout saved!')
        console.log(res)
      },
      error:(res)=>{
        console.error(res)
        alert('Error saving workout.')
      }
    })

}

//#endregion
}
