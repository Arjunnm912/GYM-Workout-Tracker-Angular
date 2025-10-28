import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { WorkoutTrackIngPage  } from './pages/workout-track-ing-page/workout-track-ing-page'
import { Datepickerdesign } from './pages/datepickerdesign/datepickerdesign'

export const routes: Routes = [
  { path: '',component: Home,},
  {path:'track-workout',component:WorkoutTrackIngPage},
  {path:'datepickerTest',component:Datepickerdesign},
  { path: '**', redirectTo: '' }
];
