// Interface that represents a person.

import { Assignatura } from "./Assignatura";

interface IPersona {
  codi: string;
  nomPersona: string;
  // nota: Assignatura;
  nota: number;
}

export { IPersona };
