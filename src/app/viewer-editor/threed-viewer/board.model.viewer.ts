/**
 * Created by nicolas on 13/10/16.
 */

import {
    CubeGeometry,
    MeshBasicMaterial,
    MeshFaceMaterial,
    CubeTextureLoader,
    CubeTexture,
    Texture,
    Material
} from 'three'

import { ModelViewer } from './model.viewer';
import { TexturePoolViewer } from './texture-pool.viewer';

export class BoardModelViewer extends ModelViewer {
    private _textureLoader: TexturePoolViewer;
    private _texturesPaths = [
        'side.png', 'side.png',
        'board.png', 'side.png',
        'side.png', 'side.png'
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
        this._textureLoader = new TexturePoolViewer('../../../assets/three-images/');
        this.geometry = new CubeGeometry( this.dimension.x, this.dimension.y, this.dimension.z, 1, 1, 1);

        var materials = new Array(6);

        this._textureLoader.load(this._texturesPaths, (textures) => {
            this.material = new MeshFaceMaterial(materials);
            var mesh = this.generateMesh();
            onLoad(mesh);

        }, (texture, index) => {
            //texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            if (index > -1)
                materials[index] = new MeshBasicMaterial({ map: texture });
        });
    }


}