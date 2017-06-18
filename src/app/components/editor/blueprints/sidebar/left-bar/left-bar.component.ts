/**
 * Created by Caro on 10/06/2017.
 */

import {
    Component,
    Input, OnInit
} from '@angular/core';

import {
    HtmlService,
    GameControllerService
} from "../../../../../../services";

@Component({
    selector  : 'ia-left-bar',
    providers : [HtmlService],
    template  : require('./left-bar.component.html'),
    styles    : [
        require('./left-bar.component.css'),
        require('../../../designer/sidebar/sidebars.css')
    ]
})
export class LeftBarComponent implements OnInit{
    @Input() start;
    @Input() eventDispatcher;

    private gameController;

    constructor(public html: HtmlService, private gameControllerService:GameControllerService) {
        this.gameController = this.gameControllerService.gameController;
    }

    ngOnInit() {}

    private toggleMode() {
        this.start.mode = (this.start.mode == 'side') ? 'over' : 'side';
    }
}