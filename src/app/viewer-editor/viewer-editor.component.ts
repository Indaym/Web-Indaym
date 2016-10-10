/**
 * Created by Nicolas Delahaigue on 09/10/16.
 */

import { Component, OnInit }    from '@angular/core';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

@Component({
    selector  : 'editor',
    template  : `
    <div id="editorContainer"></div>
    `,
    styles    : [],
    providers : []
})
export class ViewerEditorComponent implements OnInit {
    ngOnInit():void {
        var scene = new Scene();
        var camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        var geometry = new BoxGeometry( 1, 1, 1 );
        var material = new MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;
        var renderer = new WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById('editorContainer').appendChild( renderer.domElement );
        renderer.render(scene, camera);
    }
}
