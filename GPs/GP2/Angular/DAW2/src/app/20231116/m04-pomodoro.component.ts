/*
 * Component que mostra com poden utilitzar esdeveniment DOM
 * també mostra com utilitzar una pipe
 * mostra un cronometre pomodoro
 * @author sergi grau, sergi.grau@fje.edu
 * @version 1.0
 * date 15.10.2016
 * format del document UTF-8
 *
 * CHANGELOG
 * 15.10.2016
 * - Component que mostra com poden utilitzar esdeveniment DOM
 * 15.10.2017
 * - Actualització a Angular 5
 * 1.12.2020
 * - Actualització a Angular 11
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes El Clot
 */

import { Component } from '@angular/core';
@Component({
  selector: 'aplicacio',
  template: `
    <div>
      <h1>{{ minuts }}:{{ segons | number : '2.0' }}</h1>
      <!--  | number : '2.0' is to show the secods with 2 digits and without decimals. -->
      <p>
        <button (click)="conmutarPausa()" class="btn btn-danger">
          {{ etiquetaBoto }}
        </button>
      </p>
    </div>
  `,
})
export class M04_PomodoroComponent {
  minuts: number = 0;
  segons: number = 0;
  isPausa: boolean = false;
  etiquetaBoto: string = '';

  constructor() {
    this.resetPomodoro();
    setInterval(() => this.tick(), 1000); // this.tick() will be executed every second.
  }

  resetPomodoro(): void {
    this.isPausa = true;
    this.minuts = 24;
    this.segons = 59;
    this.etiquetaBoto = 'Inicia';
  }

  private tick(): void {
    if (!this.isPausa) {
      this.etiquetaBoto = 'Pausa';

      // Here I have "--this.segons" , because I want to rest segons in the same conditional.
      if (--this.segons < 0) {
        this.segons = 59;
        
        if (--this.minuts < 0) {
          this.resetPomodoro();
        }
      }
    }
  }

  // Function that is called when "pausa" is clicked.
  conmutarPausa(): void {
    this.isPausa = !this.isPausa;

    if (this.minuts < 24 || this.segons < 59) {
      this.etiquetaBoto = this.isPausa ? 'Continua' : 'Pausa';
    }
  }
}
