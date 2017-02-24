import { Component }    from '@angular/core';

@Component({
  selector  : 'ia-sceneslist',
  template  : require('./sceneslist.component.html'),
  styles    : [
    require('./sceneslist.component.css')
  ],
  providers : [],
})
export class ScenesListComponent {
  public getScenesList() {
    // CARO
    // Ici tu dois recuperer la liste des scenes pour le jeu actuel, la stocker et l'afficher
    }
}
