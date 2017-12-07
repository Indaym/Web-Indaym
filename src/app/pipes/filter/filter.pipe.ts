import {
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  /**
   * -Si- la key présente dans filter est présente dans fullMatch
   * -Alors- on vérifie que la valeur est exact
   * -Sinon- on vérifie qu'elle contient cette valeur
   *
   * Exemple :
   * filter:{type: "board", nom: "pawn"}:["type"]
   * Donne les objets de type board (totoboard marche pas)
   * qui contient pawn dans leur nom (whitepawn, blackpawn, anepawnpawn marche)
   */
  transform(items: any, filter: any, fullMatch = []): any {
    if (!filter)
      return items;
    const keys = Object.keys(filter);

    return items.filter((item) => {
      return keys.every((key) => {
        if (item.hasOwnProperty(key)) {
          return (fullMatch.findIndex((fm) => fm === key) > -1) ?
            item[key] === filter[key] :
            item[key].includes(filter[key]);
        }
      });
    });
  }
}
