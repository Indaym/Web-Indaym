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
 * Event to interact with View
 * - addObject : Throw when an object is added
 * - addGroupObjects : Throw when a group of objects is added
 * - deleteObject : Throw when an object is deleted
 * - deleteAllObjects : Throw when all object is deleted
 *
 * Event to interact with Service / Server
 * - addObjectToService : Throw when an object is added
 * - addGroupObjectsToService : Throw when a group of objects is added
 * - deleteObjectToService : Throw when an object is deleted
 * - deleteAllObjectsToService : Throw when all object is deleted
 */

export class GameObjectsController {
  private _gameId;
  private _sceneId;
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
  public subscribe(type: string, callback) {
    this.eventDispatcher.addEventListener(type, callback);
  }

  /**
   * Subscribe to a group of Events
   * @param types : Group type of the event
   * @param callback : Callback called when event throw
   */
  public subscribes(types: string[], callback) {
    types.forEach((type) => {
      this.eventDispatcher.addEventListener(type, callback);
    });
  }

  /**
   * Unsubscribe to Events
   * @param type : Type of the event
   * @param callback : Callback used for subscribe
   */
  public unsubscribe(type: string, callback) {
    this.eventDispatcher.removeEventListener(type, callback);
  }

  /**
   * Unsubscribe a group of  Events
   * @param type : Type of the event
   * @param callback : Callback used for subscribe
   */
  public unsubscribes(types: string[], callback) {
    types.forEach((type) => {
      this.eventDispatcher.removeEventListener(type, callback);
    });
  }

  /**
   * Emit event
   * @param type : Type of the event to emit
   * @param datas : Data to emit
   */
  public emit(type, datas, success?: (any) => void, error?: (any) => void) {
    const obj = {
      type,
      datas,
    };
    if (success)
      obj['success'] = success;
    if (error)
      obj['error'] = error;
    this.eventDispatcher.dispatchEvent(obj);
  }

  /**
   * Set the game informations
   * @param game : Informations about game
   * @param reset : Reset scenes ands objects (Default true)
   */
  public setGame(game, reset = true) {
    this.gameInfo = game;
    if (reset === true) {
      this.scenes = [];
      this.currentScene = undefined;
      this.currentObjects = [];

      this.gameId = 0;
      this.sceneId = 0;
    }
    this.emit('setGame', this.gameInfo);
  }

  set gameId(id) {
    this._gameId = id;
  }

  get gameId() {
    return this._gameId;
  }

  set sceneId(id) {
    this._sceneId = id;
  }

  get sceneId() {
    return this._sceneId;
  }

  /**
   * Get game informations
   * @returns {any}
   */
  public getGame() {
    return this.gameInfo;
  }

  /**
   * Set Scenes of a game
   * @param scenes : scenes of the game
   * @param reset : Reset selected scene and objects (Default true)
   */
  public setScenes(scenes, reset = true) {
    this.scenes = scenes;
    if (reset === true) {
      this.currentScene = undefined;
      this.currentObjects = [];
    }
    this.emit('setScenes', this.scenes);
  }

  /**
   * Get scenes of a game
   * @returns {Array}
   */
  public getScenes() {
    return this.scenes;
  }

  /**
   * Select the current scene
   * @param sceneId : Id of the scene to select
   */
  public selectScene(sceneId) {
    if (this.scenes !== undefined) {
      const scene = this.scenes.find((value) => {
        return value.uuid === sceneId;
      });
      if (scene !== undefined) {
        this.currentScene = scene;
        this.emit('selectScene', this.currentScene);
      }
    }
  }

  /**
   * Get the selected scene
   * @returns {any}
   */
  public getSelectedScene() {
    return this.currentScene;
  }

  /**
   * Add object in Scene
   * @param obj : Object to add
   * @param emit : Choose if it must throw an event
   * @param typeEvent : Select if Event must be for view, for service or both
   */
  public addObject(obj, emit = true, typeEvent = 'ToView', success?: (any) => void, error?: (any) => void) {
    if (obj === undefined || obj === null)
      return;
    if (this.currentObjects === undefined || this.currentObjects === null)
      this.currentObjects = [];
    if (typeEvent === 'ToView')
      this.currentObjects.push(obj);
    if (emit === true) {
      if (typeEvent === 'ToView')
        this.emit('addObject', obj, success, error);
      if (typeEvent === 'ToService' || typeEvent === 'Both')
        this.emit('addObjectToService', obj, (ret) => {
          this.currentObjects.push(ret);
          if (typeEvent === 'Both')
            this.emit('addObject', ret, success, error);
          if (success !== undefined)
            success(ret);
        }, error);
    }
  }

  /**
   * Add a group of objects
   * @param objs : Objects to add
   * @param emit : Choose if it must throw an event
   * @param typeEvent : Select if Event must be for view, for service or both
   */
  public addGroupObjects(objs, emit = true, typeEvent = 'ToView', success?: (any) => void, error?: (any) => void) {
    this.currentObjects = [ ...this.currentObjects, ...objs];
    if (emit === true) {
      if (typeEvent === 'ToView' || typeEvent === 'Both')
        this.emit('addGroupObjects', objs, success, error);
      if (typeEvent === 'ToService' || typeEvent === 'Both')
        this.emit('addGroupObjectsToService', objs, success, error);
    }
  }

  /**
   * Get objects of the current scene
   * @returns {Array}
   */
  public getObjects() {
    return this.currentObjects;
  }

  /**
   * Delete an object
   * @param objectId
   * @param emit : Choose if it must throw an event
   * @param typeEvent : Select if Event must be for view, for service or both
   */
  public deleteObject(objectId, emit = true, typeEvent = 'ToView', success?: () => void, error?: () => void) {
    if (this.currentObjects !== undefined) {
      const objIndex = this.currentObjects.findIndex((value) => {
        return value.uuid === objectId;
      });
      if (objIndex !== -1) {
        const removed = this.currentObjects.splice(objIndex, 1);
        if (emit === true) {
          if (typeEvent === 'ToView' || typeEvent === 'Both')
            this.emit('deleteObject', removed[0], success, error);
          if (typeEvent === 'ToService' || typeEvent === 'Both')
            this.emit('deleteObjectToService', removed[0], success, error);
        }
      }
    }
  }

  /**
   * Delete a Group of objects
   * @param emit : Choose if it must throw an event
   * @param typeEvent : Select if Event must be for view, for service or both
   */
  public deleteGroupObjects(objects, emit = true, typeEvent = 'ToView', success?: () => void, error?: () => void) {
    if (this.currentObjects !== undefined) {
      this.currentObjects = this.currentObjects.filter((element) => !objects.find((el) => element === el));
      if (emit === true) {
        if (typeEvent === 'ToView' || typeEvent === 'Both')
          this.emit('deleteGroupObjects', objects, success, error);
        if (typeEvent === 'ToService' || typeEvent === 'Both')
          this.emit('deleteGroupObjectsToService', objects, success, error);
      }
    }
  }

  /**
   * Delete all objects
   * @param emit : Choose if it must throw an event
   * @param typeEvent : Select if Event must be for view, for service or both
   */
  public deleteAllObjects(emit = true, typeEvent = 'ToView', success?: () => void, error?: () => void) {
    if (this.currentObjects !== undefined) {
      const objects = this.currentObjects;
      this.currentObjects = [];
      if (emit === true) {
        if (typeEvent === 'ToView' || typeEvent === 'Both')
          this.emit('deleteAllObjects', objects, success, error);
        if (typeEvent === 'ToService' || typeEvent === 'Both')
          this.emit('deleteAllObjectsToService', objects, success, error);
      }
    }
  }

  /**
   * Temporary function to fill the controller
   */
  public fillObjectsController() {
    this.addGroupObjects(datas);
  }
}
