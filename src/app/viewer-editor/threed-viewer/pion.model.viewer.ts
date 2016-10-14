/**
 * Created by nicolas on 15/10/16.
 */


import {
    CylinderGeometry,
    CubeGeometry,
    MeshBasicMaterial,
    Texture,
    Material
} from 'three'

import { ModelViewer } from './model.viewer';
import { TexturePoolViewer } from './texture-pool.viewer';

export class PionModelViewer extends ModelViewer {
    private textureLoader: TexturePoolViewer;
    private _texturesPaths = [
        'white.png'
    ];

    constructor(conf) {
        super(conf);
    }

    get texturesPaths():string[] {
        return this._texturesPaths;
    }

    set texturesPaths(value:Array<string>) {
        this._texturesPaths = value;
    }

    init(onLoad) {
        this.textureLoader = new TexturePoolViewer('../../../assets/three-images/');
        var dim = this.getDimensions();
        this.geometry = new CylinderGeometry( dim.x, dim.y, dim.z, 40);

        this.textureLoader.load(this._texturesPaths, (textures) => {
            this.material = new MeshBasicMaterial({map:textures[0]});
            var mesh = this.generateMesh();
            onLoad(mesh);

        }, (texture, index) => {});
    }


}