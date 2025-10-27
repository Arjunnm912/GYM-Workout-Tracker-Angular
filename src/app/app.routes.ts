import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { WorkoutTrackIngPage  } from './pages/workout-track-ing-page/workout-track-ing-page'

export const routes: Routes = [
  { path: '',component: Home,},
  {path:'track-workout',component:WorkoutTrackIngPage}
  //{ path: '**', redirectTo: '' }
];
