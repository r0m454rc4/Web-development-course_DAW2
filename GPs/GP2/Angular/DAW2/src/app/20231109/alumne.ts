/**
 * Classe que repressenta un alumne
 * Implementa la interfície IPersona
 * @see IPersona
 * @author sergi.grau@fje.edu
 * @version 1.0 9.11.2023
 */
import { IPersona } from './ipersona';

export class Alumne implements IPersona {
  /**
   * Constructor de la classe Alumne
   * @param nom nom de l'alumne
   * @param nota  nota de l'alumne
   */
  constructor(public id: number, public nom: string, public nota: number) {
    this.id = id;
    this.nom = nom;
    this.nota = nota;
  }
}
