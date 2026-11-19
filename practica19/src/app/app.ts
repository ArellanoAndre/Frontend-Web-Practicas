import { Component, signal } from '@angular/core';
import { CLASES_LOCALES } from './datos/clases-locales';
import type { Clase } from './modelos/clase';
import { TarjetaClase } from './componentes/tarjeta-clase/tarjeta-clase';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  clases = signal<Clase[]>([...CLASES_LOCALES]);

  totalClases() {
    return this.clases().length;
  }

  minutosSemana() {
    return this.clases().reduce(
      (total, clase) => total + clase.duracionMin, 0
    );
  }

  clasesLargas() {
    return this.clases().filter(
      clase => clase.duracionMin >= 60
    ).length;
  }

  vaciarCatalogo() {
    this.clases.set([]);
  }

  restaurarCatalogo() {
    this.clases.set([...CLASES_LOCALES]);
  }
}

