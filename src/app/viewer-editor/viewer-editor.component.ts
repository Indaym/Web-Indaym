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
    <div>
    </div>
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
        this.scene.setCameraPosition(new Vector3(0, 50.0, 0));
        this.scene.setCameraTarget(new Vector3(0, 0, 0));
        document.getElementById(this.scene.getContainer().toString()).addEventListener('mousedown', (event) => { this.scene.onMouseDown(event) }, false);
        this.initBoards();
        this.scene.render();
        this.scene.animate();
    }

    private initBoards() {
        var boardMid = new BoardModelViewer({
            dimensions: [32.6, 2.0, 32.6]

        });
        boardMid.init((mesh) => {
            this.scene.addInScene(mesh);
            this.scene.render();
        });


        var boardWhite = new BoardModelViewer({
            dimensions: [77.8, 2.0, 12.2],
            position: [0, 0, 35.0]
        });
        boardWhite.texturesPaths[2] = 'pion_table.png';
        boardWhite.init((mesh) => {
            this.scene.addInScene(mesh);
            this.scene.render();
        });

        var boardBlack = new BoardModelViewer({
            dimensions: [77.8, 2.0, 12.2],
            position: [0, 0, -35.0]
        });
        boardBlack.texturesPaths[2] = 'pion_table.png';
        boardBlack.init((mesh) => {
            this.scene.addInScene(mesh);
            this.scene.render();
        });

    }
}
