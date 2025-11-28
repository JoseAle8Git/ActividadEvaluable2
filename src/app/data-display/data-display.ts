import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Api, DataState } from '../services/api';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './data-display.html',
  styleUrl: './data-display.css',
})
export class DataDisplay {

  private apiService = inject(Api);

  dataState$!: Observable<DataState<User[]>>;

  public barChartType: ChartType = 'bar';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, 
    scales: {
      y: {
        min: 0,
        title: {
          display: true,
          text: 'Username Length'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Username Length', backgroundColor: '#4f46e5' } 
    ]
  }

  constructor() {
    this.loadData();
  }

  loadData(): void {
    this.dataState$ = this.apiService.getUsers().pipe(
      tap(state => {
        if(state.data) {
          this.processChartData(state.data);
        }
      })
    );
  }

  private processChartData(users: User[]): void {
    const labels = users.map(user => user.username);
    const data = users.map(user => user.username.length);
    
    this.barChartData = {
      labels: labels,
      datasets: [
        { 
          data: data, 
          label: 'Longitud del Nombre de Usuario', 
          backgroundColor: '#4f46e5', 
          borderColor: '#4f46e5',
          hoverBackgroundColor: '#6366f1' 
        }
      ]
    };
  }

}
