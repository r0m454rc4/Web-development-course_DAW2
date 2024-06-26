/*
 * Directiva per a canviar el color de fons
 * @author sergi grau, sergi.grau@fje.edu
 * @version 1.0
 * date 15.10.2016
 * format del document UTF-8
 *
 * CHANGELOG
 * 5.12.2017
 * - Directiva per a canviar el color de fons
 * 1.12.2020
 * - Actualització a Angular 11
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes El Clot
 */

import { Directive, ElementRef } from '@angular/core';
@Directive({ selector: '[marcat]' })
export class M07_DirectivaPersonalizada {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
    el.nativeElement.style.color = 'red';
    el.nativeElement.style.textTransform = 'uppercase';
  }
}
