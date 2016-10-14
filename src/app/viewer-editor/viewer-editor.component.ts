/**
 * Created by Nicolas Delahaigue on 09/10/16.
 */

import { Component, OnInit }    from '@angular/core';

import {
    Vector3
} from 'three';

import { SceneViewer, BoardModelViewer, TexturePoolViewer }          from "./threed-viewer/index";

@Component({
    selector  : 'editor',
    template  : `
    <div id="editorContainer"></div>
    `,
    styles    : [],
    providers : []
})
export class ViewerEditorComponent implements OnInit {
    private scene:SceneViewer;

    ngOnInit():void {
        this.scene = new SceneViewer({
            width:1000,
            height:500
        });
        this.scene.setContainer('editorContainer');
        this.scene.setCameraPosition(new Vector3(0, 500, 0));
        this.scene.setCameraTarget(new Vector3(0, 0, 0));
        this.initBoards();
        this.scene.render();
        this.scene.animate();
    }

    private initBoards() {
        var boardMid = new BoardModelViewer({
            dimensions: [326, 20, 326]

        });
        boardMid.init((mesh) => {
            this.scene.addInScene(mesh);
            this.scene.render();
        });


        var boardWhite = new BoardModelViewer({
            dimensions: [778, 20, 122],
            position: [0, 0, 350]
        });
        boardWhite.texturesPaths[2] = 'pion_table.png';
        boardWhite.init((mesh) => {
            this.scene.addInScene(mesh);
            this.scene.render();
        });

        var boardBlack = new BoardModelViewer({
            dimensions: [778, 20, 122],
            position: [0, 0, -350]
        });
        boardBlack.texturesPaths[2] = 'pion_table.png';
        boardBlack.init((mesh) => {
            this.scene.addInScene(mesh);
            this.scene.render();
        });

    }
}
