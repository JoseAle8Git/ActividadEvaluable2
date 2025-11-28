import 'chart.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import { 
    Chart,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend 
} from 'chart.js';

// COMENTARIO EN ESPAÑOL: REGISTRO OBLIGATORIO DE COMPONENTES.
// Esto soluciona el error "linear is not a registered scale" al ejecutarse antes de la app.
Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
