export interface WorkoutItem {
  type: string;
  weight: number;
  reps: number;
}

export interface WorkoutResponse {
  date: string;
  group: string;
  workouts: WorkoutItem[];
}
