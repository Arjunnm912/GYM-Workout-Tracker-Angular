import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-datepickerdesign',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './datepickerdesign.html',
  styleUrl: './datepickerdesign.scss',
})
export class Datepickerdesign implements OnInit {
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

  selectDate(date: Date) {
    this.selectedDate = date;
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

}
