/**
 * Created by nicolas on 20/03/17.
 */

import { EventDispatcher }  from 'three';

import { datas }            from './temporaryFill';

/**
 * Events :
 * - setGame : Throw when game set
 * - setScenes : Throw when scenes set
 * - selectScene : Throw when scene is selected
 *
 * - addObject : Throw when an object is added
 * - addGroupObjects : Throw when a group of objects is added
 * - deleteObject : Throw when an object is deleted
 * - deleteAllObjects : Throw when all object is deleted
 *
 * NOT IMPLEMENTED
 * - addObjectFromView : Throw when an object is added
 * - addGroupObjectsFromView : Throw when a group of objects is added
 * - deleteObjectFromView : Throw when an object is deleted
 * - deleteAllObjectsFromView : Throw when all object is deleted
 */

export class gameObjectsController {
  private gameInfo;
  private scenes = [];
  private currentScene;
  private currentObjects = [];
  private eventDispatcher: EventDispatcher;

  constructor() {
    this.eventDispatcher = new EventDispatcher();
  }

  /**
   * Subscribe to Events
   * @param type : Type of the event
   * @param callback : Callback called when event throw
   */
  subscribe(type:string, callback) {
    this.eventDispatcher.addEventListener(type, callback);
  }

  /**
   * Emit event
   * @param type : Type of the event to emit
   * @param datas : Data to emit
   */
  emit(type, datas) {
    this.eventDispatcher.dispatchEvent({
      'type' : type,
      'datas' : datas
    });
  }

  /**
   * Set the game informations
   * @param game : Informations about game
   * @param reset : Reset scenes ands objects (Default true)
   */
  setGame(game, reset = true) {
    this.gameInfo = game;
    this.scenes = [];
    this.currentScene = undefined;
    this.currentObjects = [];
    this.emit("setGame", this.gameInfo);
  }

  /**
   * Get game informations
   * @returns {any}
   */
  getGame() {
    return this.gameInfo;
  }

  /**
   * Set Scenes of a game
   * @param scenes : scenes of the game
   * @param reset : Reset selected scene and objects (Default true)
   */
  setScenes(scenes, reset = true) {
    this.scenes = scenes;
    this.currentScene = undefined;
    this.currentObjects = [];
    this.emit("setScenes", this.scenes);
  }

  /**
   * Get scenes of a game
   * @returns {Array}
   */
  getScenes() {
    return this.scenes;
  }

  /**
   * Select the current scene
   * @param sceneId : Id of the scene to select
   */
  selectScene(sceneId) {
    if (this.scenes !== undefined) {
      let scene = this.scenes.find((value) => {
        return value.id === sceneId;
      });
      if (scene !== undefined) {
        this.currentScene = scene;
        this.emit("selectScene", this.currentScene);
      }
    }
  }

  /**
   * Get the selected scene
   * @returns {any}
   */
  getSelectedScene() {
    return this.currentScene;
  }

  /**
   * Add object in Scene
   * @param obj : Object to add
   */
  addObject(obj, emit = true) {
    if (this.currentObjects !== undefined) {
      this.currentObjects.push(obj);
      if (emit === true)
        this.emit("addObject", obj);
    }
  }

  /**
   * Add a group of objects
   * @param objs : Objects to add
   * @param emit : Decide si on doit emettre un event
   */
  addGroupObjects(objs, emit = true) {
    this.currentObjects = [ ...this.currentObjects, ...objs];
    if (emit === true)
      this.emit("addGroupObjects", this.currentObjects);
  }

  /**
   * Get objects of the current scene
   * @returns {Array}
   */
  getObjects() {
    return this.currentObjects;
  }

  /**
   * Delete an object
   * @param objectId
   * @param emit : Decide si on doit emettre un event
   */
  deleteObject(objectId, emit = true) {
    if (this.currentObjects !== undefined) {
      let objIndex = this.currentObjects.findIndex((value) => {
        return value.id === objectId;
      });
      if (objIndex != -1) {
        let removed = this.currentObjects.splice(objIndex, 1);
        this.emit("deleteObject", removed[0]);
      }
    }
  }

  /**
   * Delete all objects
   * @param emit : Decide si on doit emettre un event
   */
  deleteAllObjects(emit = true) {
    if (this.currentObjects !== undefined) {
      let objects = this.currentObjects;
      this.currentObjects = [];
      this.emit("deleteAllObjects", objects);
    }
  }

  renderAllObjects() {

  }

  /**
   * Temporary function to fill the controller
   */
  fillObjectsController() {
    this.addGroupObjects(datas);
  }
}