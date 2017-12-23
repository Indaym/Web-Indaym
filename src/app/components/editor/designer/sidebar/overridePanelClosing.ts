import { ViewChildren }       from '@angular/core';
import { MatExpansionPanel }  from '@angular/material';

export class OverridePanelClosing {
  @ViewChildren(MatExpansionPanel) private panels;

  onClick(event, element) {
    if (!element.panel.expanded) {
      event.stopPropagation();
      const arrPanes = this.panels.toArray();
      if (arrPanes.length > 1) {
        const index = arrPanes.findIndex((el) => el.id === element.panel.id);
        arrPanes[(index === arrPanes.length - 1) ? index - 1 : index + 1].open();
      } else {
        element.panel.open();
      }
    }
  }
}
