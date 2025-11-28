import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataDisplay } from './data-display/data-display';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DataDisplay],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('actividad-evaluable-2');
}
