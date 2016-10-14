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
    private textureLoader: TexturePoolViewer;
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
        this.textureLoader = new TexturePoolViewer('../../../assets/three-images/');
        var dim = this.getDimensions();
        this.geometry = new CubeGeometry( dim.x, dim.y, dim.z, 1, 1, 1);

        var materials = new Array(6);

        this.textureLoader.load(this._texturesPaths, (textures) => {
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