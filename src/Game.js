import Expo, {AppLoading} from 'expo';

import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  Vibration,
  Animated,
  Dimensions,
  Text,
  View,

} from 'react-native';

import GestureRecognizer, {
  swipeDirections
} from './GestureView';

import Water from './Particles/Water';
import Feathers from './Particles/Feathers';
import {
  TweenMax,
  Power2,
  TimelineLite
} from "gsap";

// const {THREE} = global;

import State from '../state';


import * as THREE from 'three';
import createTHREEViewClass from './createTHREEViewClass';
const THREEView = createTHREEViewClass(THREE);

// import Map from './Map';
// Setup THREE//
const {width, height} = Dimensions.get('window');

const AnimatedText = Animated.createAnimatedComponent(RetroText);
const AnimatedGestureRecognizer = Animated.createAnimatedComponent(GestureRecognizer);

let scoreAnimation = new Animated.Value(0);

import RetroText from './RetroText';

import Node from './Node';
const {
  Hero,
  Car,
  Log,
  Road,
  Grass,
  River,
  Tree,
  Train,
  RailRoad
} = Node;

// import Hero from './Hero'

const groundLevel = 0.5;
const sceneColor = 0x6dceea;

class Game extends Component {
  maxRows = 20;
  sineCount = 0;
  sineInc = Math.PI / 50;
  state = { ready: false, score: 0,};
  currentLog = -1;


  componentWillReceiveProps(nextProps) {
    const {props} = this;

    if (nextProps.gameState !== props.gameState) {
        this.updateWithGameState(nextProps.gameState, props.gameState);
    }

  }
  updateWithGameState = (gameState, previousGameState) => {
    const {playing, gameOver, paused, none} = State.Game;
    switch (gameState) {
      case playing:
        this.newScore();
        break;
        case gameOver:

          break;

          case paused:

            break;

            case none:

              break;

      default:
        break;
    }
  }

  componentWillMount() {
    this.scene = new THREE.Scene();
    // this.scene.fog = new THREE.Fog(sceneColor, 350, 500);

    this.camera = new THREE.OrthographicCamera(-width, width, height, -height, -30, 30);
    this.camera.position.set(-1, 2.8, -2.9); // Change -1 to -.02
    this.camera.zoom = 110; // for birds eye view
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(this.scene.position);

    // this.map = new Map({width: this.levelWidth, height: this.levelHeight});
    // const position = new THREE.Vector3( 0, 0, 0 );
    // this.map.buildLevel({position, parentNode: this.scene});

    this.doGame();
  }

  createParticles = () => {


    this.waterParticles = new Water(THREE);
    this.scene.add(this.waterParticles.mesh);

    this.featherParticles = new Feathers(THREE);
    this.scene.add(this.featherParticles.mesh);

  }

  useParticle = (model, type, direction) => {
    if (type === 'water') {
      this.waterParticles.mesh.position.copy(model.position);
      this.waterParticles.mesh.visible = true;
      this.waterParticles.run(type);
    } else if (type == 'feathers') {
      this.featherParticles.mesh.position.copy(model.position);
      this.featherParticles.mesh.visible = true;
      this.featherParticles.run(type, direction);
    }
  }

  createLights = () => {
    let globalLight = new THREE.AmbientLight(0xffffff, .9);

    let shadowLight = new THREE.DirectionalLight(0xffffff, 1);
    shadowLight.position.set( 1, 1, 0 ); 			//default; light shining from top
    shadowLight.lookAt( 0, 0, 0 ); 			//default; light shining from top
//
//     shadowLight.castShadow = true;            // default false
//
//     shadowLight.shadow.mapSize.width = 512;  // default
// shadowLight.shadow.mapSize.height = 512; // default
// shadowLight.shadow.camera.near = 0.5;       // default
// shadowLight.shadow.camera.far = 500      // default
// shadowLight.shadow.radius = 1;
// var helper = new THREE.CameraHelper( shadowLight.shadow.camera );
// this.scene.add( helper );

//directional light
//  var directionalLight = new THREE.DirectionalLight(0xffffff);
//  directionalLight.position.set(5, 1, 5);
//  directionalLight.target.position.set(0, 0, 0);
//
//  directionalLight.castShadow = true;
//  directionalLight.shadow.darkness = 0.5;
//  directionalLight.shadow.cameraVisible = true;
//
//  directionalLight.shadow.cameraNear = 0;
//  directionalLight.shadow.cameraFar = 15;
//
//  directionalLight.shadow.cameraLeft = -5;
//  directionalLight.shadow.cameraRight = 5;
//  directionalLight.shadow.cameraTop = 5;
//  directionalLight.shadow.cameraBottom = -5;
//
//  this.scene.add(directionalLight);
//
//
// //spotlight
// var spotLight = new THREE.SpotLight( 0xffffff,1 );
// spotLight.position.set( 5,2,6 );
//
// spotLight.castShadow = true;
//
// spotLight.target.position.set(-1, 0, 1 );
// spotLight.shadow.darkness = 0.5;
//
// spotLight.shadow.cameraNear = 6;
// spotLight.shadow.cameraFar = 13;
//
// this.scene.add( spotLight );
//
// spotLight.shadow.cameraVisible = true;

    // shadowLight.shadowCameraVisible = true;

    // this.camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);
    // this.camera.position.z = 1000;

    // shadowLight.position.set(-1, 22.8, -2.9); // Change -1 to -.02
    // shadowLight.shadow.camera.left = -5;
    // shadowLight.shadow.camera.right = 5;
    // shadowLight.shadow.camera.top = 50;
    // shadowLight.shadow.camera.bottom = -50;
    // shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 2048;

    // shadowLight.castShadow = true;
    //
    // shadowLight.shadow = new THREE.LightShadow( new THREE.OrthographicCamera(-width, width, height, -height, -30, 30) );
    // shadowLight.shadow.mapSize.width = 1024;
    // shadowLight.shadow.mapSize.height = 1024;
    // light.shadowMapWidth = 1024; // default is 512
// light.shadowMapHeight = 1024; // default is 512

    // shadowLight.shadow.bias = 0.001;
    //
    // shadowLight.shadowCameraHelper = new THREE.CameraHelper( shadowLight.shadow.camera );
    // this.scene.add( shadowLight.shadowCameraHelper );
    //
    // shadowLight.shadow.camera.near = 1;
    // shadowLight.shadow.camera.far = 2000;
    // shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 2048 * 3;


    this.scene.add(globalLight);
    this.scene.add(shadowLight);

  }

  endScore = () => {
    Animated.timing(scoreAnimation, {
      toValue: 2,
      duration: 200,
      useNativeDriver: true,
      delay: 800
    }).start();
  }

  newScore = () => {
    Vibration.cancel();
    Animated.timing(scoreAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();

    // this.props.setGameState(State.Game.playing);
    this.setState({score: 0})
    this.init();
  }

  doneMoving = () => {
    this.moving = false;
    // this.hero.position.set(Math.round(this.hero.position.x), this.hero.position.y, Math.round(this.hero.position.z))
  }

  getWidth = (mesh) => {
    let box3 = new THREE.Box3();
    box3.setFromObject(mesh);
    // console.log( box.min, box.max, box.size() );
    return Math.round(box3.max.x - box3.min.x);
  }
  getDepth = mesh => {
    let box3 = new THREE.Box3();
    box3.setFromObject(mesh);
    // console.log( box.min, box.max, box.size() );
    return Math.round(box3.max.z - box3.min.z);
  }


  loadModels = async () => {
    this._grass = new Grass();
    this._road = new Road();
    this._river = new River();
    this._tree = new Tree();
    this._car = new Car();
    this._railroad = new RailRoad();
    this._train = new Train();
    this._log = new Log();
    this._hero = new Hero();

    try {
      await Promise.all([
        this._road.setup(),
        this._grass.setup(),
        this._river.setup(),
        this._log.setup(),

        this._tree.setup(),
        this._car.setup(),
        this._railroad.setup(),
        this._train.setup(),
        this._hero.setup()
      ]);
      console.log("Done Loading 3D Models!");
    } catch(error) {
      console.warn(`:( We had a problem loading the 3D Models: ${error}`);
    } finally {
      //TODO: Add some complicated code so people think that I'm a really good programmer...
    }

  }



  doGame = async () => {

    this.moving = false;
    this.timing = 0.10;

    // Variables
    this.grass = [],
    this.grassCount = 0; //
    this.water = [],
    this.waterCount = 0; // Terrain tiles
    this.road = [],
    this.roadCount = 0; //
    this.railRoad = [],
    this.railRoadCount = 0; //
    this.trees = [],
    this.treeCount = 0; //
    this.logs = [],
    this.logCount = 0; // Terrain objects
    this.cars = [],
    this.carCount = 0; //
    this.logSpeed = [],
    this.carSpeed = []; //
    this.onLog = true;


    this.rowCount = 0;
    this.camCount = 0,
    this.camSpeed = .02;
    this.heroWidth = .7;

    await this.loadModels()


    this.createParticles();
    this.createLights();

    // Mesh
    this.hero = new THREE.Object3D();
    // this.hero.receiveShadow = true;
    // this.hero.castShadow = true;
    // this.hero.position.y = .25;
    this.scene.add(this.hero);

    this.hero.add(this._hero.getNode());


    this.railRoad[0] = this._railroad.getRandom();
    this.road[0] = this._road.getRandom();
    this.trees[0] = this._tree.getRandom();

    let _carMesh = this._car.getRandom();
    let _carWidth = this.getDepth(_carMesh);
    this.cars[0] = {mesh: _carMesh, width: _carWidth, collisionBox: (this.heroWidth / 2 + _carWidth / 2 - .1) };


    let _logMesh = this._log.getRandom();
    let _logWidth = this.getWidth(_logMesh);
    this.logs[0] = {mesh: _logMesh, width: _logWidth, collisionBox: (this.heroWidth / 2 + _logWidth / 2 - .1) };


    // Mesh orientation
    // this.leftShade.rotation.x = 270 * Math.PI / 180;
    // this.leftShade.position.set(6.65, 1, 248.47);
    // this.rightShade.rotation.x = 270 * Math.PI / 180;
    // this.rightShade.position.set(-7.35, 1, 248.47);
    // this.leftBlind.rotation.x = 270 * Math.PI / 180;
    // this.leftBlind.position.set(11.8, .6, 248.9);
    // this.rightBlind.rotation.x = 270 * Math.PI / 180;
    // this.rightBlind.position.set(-12.2, .6, 248.9);
    // this.scene.add(this.leftShade);
    // this.scene.add(this.rightShade);
    // this.scene.add(this.leftBlind);
    // this.scene.add(this.rightBlind);


    this.trees[0].position.set(0, .5, -30);
    this.cars[0].mesh.position.set(0, .25, -30);
    this.cars[0].mesh.rotation.set(0, 0,0);

    this.logs[0].mesh.position.set(0, -10.5, -30);

    // Assign mesh to corresponding array
    // and add mesh to scene
    for (i = 0; i < this.maxRows; i++) {
      this.grass[i] = this._grass.getNode(`${i % 2}`);
      this.grass[i].receiveShadow = true;
      this.grass[i].castShadow = false;

      this.water[i] = this._river.getNode();
      this.road[i] = this._road.getRandom();
      this.road[i].receiveShadow = true;
      this.road[i].castShadow = false;


      this.railRoad[i] = this._railroad.getRandom();
      this.scene.add(this.grass[i]);
      this.scene.add(this.water[i]);
      this.scene.add(this.road[i]);
      this.scene.add(this.railRoad[i]);

    }

    // Repeat above for terrain objects
    for (i = 0; i < 55; i++) {
      this.trees[i] = this._tree.getRandom();
      this.scene.add(this.trees[i]);
    }

    for (i = 0; i < 40; i++) {
      let _carMesh = this._car.getRandom();
      let _carWidth = this.getDepth(_carMesh);
      this.cars[i] = {mesh: _carMesh, width: _carWidth, collisionBox: (this.heroWidth / 2 + _carWidth / 2 - .1) };
      this.scene.add(_carMesh);
    }
    for (i = 0; i < 40; i++) {
      let _logMesh = this._log.getRandom();
      let _logWidth = this.getWidth(_logMesh);
      this.logs[i] = {mesh: _logMesh, width: _logWidth, collisionBox: (this.heroWidth / 2 + _logWidth / 2 - .1) };
      this.scene.add(_logMesh);
    }


    this.init();
  }


  // Setup initial scene
  init = () => {
    const offset = -30;
    const startingRow = 8;
    this.setState({score: 0})
    this.camera.position.z = startingRow;
    this.hero.position.set(0, groundLevel, startingRow);
    this.hero.scale.set(1,1,1);

    this.initialPosition = null;
    this.targetPosition = null;
    this.grassCount = 0;
    this.waterCount = 0;
    this.roadCount = 0;
    this.railRoadCount = 0;
    this.treeCount = 0;
    this.rowCount = 0;

    for (i = 0; i < this.maxRows; i++) {
      this.grass[i].position.z = offset;
      this.water[i].position.z = offset;
      this.road[i].position.z = offset;
      this.railRoad[i].position.z = offset;

    }

    for (i = 0; i < 55; i++) {
      this.trees[i].position.z = offset;
    }

    for (i = 0; i < 40; i++) {

      this.cars[i].mesh.position.z = offset;
      this.carSpeed[i] = 0;

      this.logs[i].mesh.position.z = offset;
      this.logSpeed[i] = 0;
    }

    this.treeGen();
    this.grass[this.grassCount].position.z = this.rowCount;
    this.grassCount++;
    this.rowCount++;

    for (i = 0; i < 25; i++) {
      this.newRow();
    }

    this.setState({ ready: true });
  }

  // Scene generators
  newRow = rowKind => {
    if (this.grassCount == this.maxRows) {
      this.grassCount = 0;
    }
    if (this.roadCount == this.maxRows) {
      this.roadCount = 0;
    }
    if (this.waterCount == this.maxRows) {
      this.waterCount = 0;
    }
    if (this.railRoadCount == this.maxRows) {
      this.railRoadCount = 0;
    }


    /// Special layers
    if (this.rowCount <= 0) {
      this.grass[this.grassCount].position.z = this.rowCount;
      this.grassCount++;

    } else if (this.rowCount > 0 && this.rowCount <= 4) {
      this.treeGen(true);
      this.grass[this.grassCount].position.z = this.rowCount;
      this.grassCount++;
    } else if (this.rowCount > 4 && this.rowCount <= 10) {
      this.treeGen();
      this.grass[this.grassCount].position.z = this.rowCount;
      this.grassCount++;
    } else {
      switch (rowKind || Math.floor(Math.random() * 3) + 1) {
        case 1:
        this.treeGen();
        this.grass[this.grassCount].position.z = this.rowCount;
        this.grassCount++;
        break;

        case 2:
        this.carGen();

        let isMultiLane = rowKind ? true : false;
        // if (Math.floor(Math.random() * (2 - 1)) == 1) {
        //   this.newRow(2);
        // }

        // let road = this._road.getNode(!isMultiLane ? "0" : "1");
        this.road[this.roadCount].position.z = this.rowCount;
        // this.scene.add(road);
        this.roadCount++;
        break;

        case 3:
        this.logGen();
        this.water[this.waterCount].position.z = this.rowCount;
        this.waterCount++;
        break;
        case 4:
        this.railRoad[this.railRoadCount].position.z = this.rowCount;
        this.railRoadCount++;
        break;
      }
    }
    this.rowCount++;

  }

  treeGen = (isFull = false) => {
    // 0 - 8
    for (x = -3; x < 12; x++) {
      if (x == 9 || x == -1 || isFull) {
        if (this.treeCount < 54) {
          this.treeCount++;
        } else {
          this.treeCount = 0;
        }
        const tree = this._tree.getRandom();
        tree.position.set(x - 4, .4, this.rowCount);
        this.scene.add(tree);
        this.trees.push(tree);
        this.treeCount ++;
        // this.trees[this.treeCount].position.set(x - 4, .4, this.rowCount);
      } else {
        if ((x !== 4 && Math.random() > .6) || isFull) {
          if (this.treeCount < 54) {
            this.treeCount++;
          } else {
            this.treeCount = 0;
          }
          this.trees[this.treeCount].position.set(x - 4, .4, this.rowCount);
        }
      }

    }
  }

  trainGen = () => {
    // Speeds: .01 through .08
    // Number of cars: 1 through 3
    this.speed = .08
    this.numCars = Math.floor(Math.random() * (4 - 2)) + 2;
    xDir = 1;

    if (Math.random() > .5) {
      xDir = -1;
    }

    xPos = -6 * xDir;


    let train = this._train.withSize(this.numCars);
    this.scene.add(train);
    train.position.set(xPos, .25, this.rowCount);
    // this.trainSpeed[this.carCount] = this.speed * xDir;

    this.train.rotation.y = (Math.PI / 2) * xDir;

    xPos -= 5 * xDir;
  }

  carGen = () => {
    // Speeds: .01 through .08
    // Number of cars: 1 through 3
    this.speed = (Math.floor(Math.random() * (5 - 1)) + 1) / 80;
    this.numCars = Math.floor(Math.random() * (4 - 2)) + 2;
    xDir = 1;

    if (Math.random() > .5) {
      xDir = -1;
    }

    xPos = -6 * xDir;

    for (x = 0; x < this.numCars; x++) {
      if (this.carCount < 39) {
        this.carCount++;
      } else {
        this.carCount = 0;
      }

      this.cars[this.carCount].mesh.position.set(xPos, .25, this.rowCount);
      this.carSpeed[this.carCount] = this.speed * xDir;

      this.cars[this.carCount].mesh.rotation.y = (Math.PI / 2) * xDir;


      xPos -= 5 * xDir;
    }
  }

  logGen = () => {
    // Speeds: .01 through .08
    // Number of cars: 1 through 3
    this.speed = (Math.floor(Math.random() * (3 - 1)) + 1) / 70;
    this.numLogs = Math.floor(Math.random() * (4 - 3)) + 3;
    xDir = 1;

    if (Math.random() > .5) {
      xDir = -1;
    }
    if (this.logSpeed[this.logCount] == this.speed * xDir) {
      this.speed /= 1.5;
    }

    xPos = -6 * xDir;

    for (x = 0; x < this.numLogs; x++) {
      if (this.logCount < 39) {
        this.logCount++;
      } else {
        this.logCount = 0;
      }

      this.logs[this.logCount].mesh.position.set(xPos, -0.1, this.rowCount);
      this.logSpeed[this.logCount] = this.speed * xDir;

      xPos -= 5 * xDir;
    }
  }

  // Animate cars/logs
  drive = () => {
    for (d = 0; d < this.cars.length; d++) {
      this.cars[d].mesh.position.x += this.carSpeed[d];
      this.logs[d].mesh.position.x += this.logSpeed[d];

      if (this.cars[d].mesh.position.x > 11 && this.carSpeed[d] > 0) {
        this.cars[d].mesh.position.x = -11;
      } else if (this.cars[d].mesh.position.x < -11 && this.carSpeed[d] < 0) {
        this.cars[d].mesh.position.x = 11;
      }
      if (this.logs[d].mesh.position.x > 11 && this.logSpeed[d] > 0) {
        this.logs[d].mesh.position.x = -10;
      } else if (this.logs[d].mesh.position.x < -11 && this.logSpeed[d] < 0) {
        this.logs[d].mesh.position.x = 10;
      }
    }
  }

  // Detect collisions with trees/cars
  treeCollision = (dir) => {
    var zPos = 0;
    var xPos = 0;
    if (dir == "up") {
      zPos = 1;
    } else if (dir == "down") {
      zPos = -1;
    } else if (dir == "left") {
      xPos = 1;
    } else if (dir == "right") {
      xPos = -1;
    }

    for (x = 0; x < this.trees.length; x++) {
      if (Math.round(this.hero.position.z + zPos) == this.trees[x].position.z) {
        if (Math.round(this.hero.position.x + xPos) == this.trees[x].position.x) {
          return true;
        }
      }
    }
  }

  carCollision = () => {
    if (this.props.gameState != State.Game.playing) {
      return
    }
    for (let c = 0; c < this.cars.length; c++) {
      let car = this.cars[c];
      if (this.hero.position.z == car.mesh.position.z) {

        const {collisionBox} = car;

        if (this.hero.position.x < this.cars[c].mesh.position.x + collisionBox && this.hero.position.x > this.cars[c].mesh.position.x - collisionBox) {

          ///Run Over Hero. ///TODO: Add a side collide
          this.hero.scale.y = 0.1;
          this.hero.position.y = groundLevel;

          this.useParticle(this.hero, 'feathers', this.carSpeed[c]);
          this.rumbleScreen()

          this.gameOver();
        }
      }
    }
  }


  bounceLog = mesh => {
    let timing = 0.2;
    TweenMax.to(mesh.position, timing * 0.9, {
      y: -0.3,
    });

    TweenMax.to(mesh.position, timing, {
      y: -0.1,
      delay: timing
    });

    TweenMax.to(this.hero.position, timing * 0.9, {
      y: groundLevel + -0.1,
    });

    TweenMax.to(this.hero.position, timing, {
      y: groundLevel,
      delay: timing
    });
  }

  moveUserOnLog = () => {
    if (!this.currentLog || this.currentLog < 0 || this.currentLog >= this.logs.length) {
      return;
    }

    const log = this.logs[this.currentLog];
    let target = log.mesh.position.x + this.currentLogSubIndex;
    this.hero.position.x = target;
    this.initialPosition.x = target;
  }

  logCollision = () => {
    if (this.props.gameState != State.Game.playing) {
      return
    }
    for (let l = 0; l < this.logs.length; l++) {
      let log = this.logs[l];
      if (this.hero.position.z == log.mesh.position.z) {
        const {collisionBox, mesh} = log;
        const logX = mesh.position.x;
        const heroX = this.hero.position.x;

        if (heroX < logX + collisionBox && heroX > logX - collisionBox) {
          this.onLog = true;
          if (this.currentLog != l) {
            this.currentLog = l;
            this.currentLogSubIndex = (heroX - logX);
            this.bounceLog(mesh);
          }
        }
      }
    }
  }

  waterCollision = () => {

    if (this.onLog === false) {
      for (w = 0; w < this.water.length; w++) {
        if (this.hero.position.z == this.water[w].position.z) {

          if (this.props.gameState == State.Game.playing) {
            this.useParticle(this.hero, 'water');
            this.rumbleScreen()
            this.gameOver();
          } else {

            let y = Math.sin(this.sineCount) * .08 - .2;
            this.sineCount += this.sineInc;
            this.hero.position.y = y;

            for (w = 0; w < this.logSpeed.length; w++) {
              if (this.hero.position.z == this.logs[w].mesh.position.z) {
                this.hero.position.x += this.logSpeed[w] / 3;
              }
            }
          }

        }
      }
    }
  }

  rumbleScreen = () => {
    Vibration.vibrate();
  }

  // Move scene forward
  forwardScene = () => {
    if (this.props.gameState === State.Game.playing) {
      if (Math.floor(this.camera.position.z) < this.hero.position.z - 4) {
        // speed up camera to follow player
        this.camera.position.z += .033;
        if (this.camCount > 1.8) {
          this.camCount = 0;
          this.newRow();
          this.newRow();
          this.newRow();
        } else {
          this.camCount += this.camSpeed;
        }

      } else {
        this.camera.position.z += .011;
        // normal camera speed
        if (this.camCount > 1.8) {
          this.camCount = 0;
          this.newRow();
        } else {
          this.camCount += this.camSpeed;
        }
      }

    }
  }

  // Reset variables, restart game
  gameOver = () => {
    // this.trees.map(val => this.scene.remove(val) );

    this.props.setGameState(State.Game.gameOver)
    this.endScore();
  }

  tick = dt => {
    this.drive();
    if (!this.moving) {
      this.moveUserOnLog();

      this.carCollision();
      this.logCollision();
      this.waterCollision();


      this.updateScore();
      this.checkIfUserHasFallenOutOfFrame();
    }

    this.forwardScene();
  }


  checkIfUserHasFallenOutOfFrame = () => {
    if (this.props.gameState !== State.Game.playing) {
      return
    }
    if (this.hero.position.z < this.camera.position.z - 8) {

      ///TODO: rumble
      this.rumbleScreen()

      this.gameOver();
    }

    /// Check if offscreen
    if (this.hero.position.x < -5 || this.hero.position.x > 5) {

      ///TODO: Rumble death
      this.rumbleScreen()

      this.gameOver();
    }
  }

  updateScore = () => {
    const position = Math.floor(this.hero.position.z) - 8;
    if (this.state.score < position) {
      this.setState({score: position})
    }
  }

  moveWithDirection = direction => {
    if (this.props.gameState != State.Game.playing ) {
      // this.newScore();
      return;
    }

    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;


    if (!this.initialPosition) {
      this.initialPosition = this.hero.position;
      this.targetPosition = this.initialPosition;
    }

    if (this.moving) {
      this.hero.position = this.targetPosition;
      // return
    };

    switch (direction) {
      case SWIPE_LEFT:
      this.hero.rotation.y = Math.PI/2
      if (!this.treeCollision("left")) {
        this.targetPosition = {x: this.initialPosition.x + 1, y: this.initialPosition.y, z: this.initialPosition.z};
        this.moving = true

      }
      break;
      case SWIPE_RIGHT:
      this.hero.rotation.y = -Math.PI/2
      if (!this.treeCollision("right")) {
        this.targetPosition = {x: this.initialPosition.x - 1, y: this.initialPosition.y, z: this.initialPosition.z};
        this.moving = true

      }
      break;
      case SWIPE_UP:
      this.hero.rotation.y = 0;
      if (!this.treeCollision("up")) {
        this.targetPosition = {x: this.initialPosition.x, y: this.initialPosition.y, z: this.initialPosition.z + 1};
        this.moving = true

      }
      break;
      case SWIPE_DOWN:
      this.hero.rotation.y = Math.PI
      if (!this.treeCollision("down")) {
        this.targetPosition = {x: this.initialPosition.x, y: this.initialPosition.y, z: this.initialPosition.z - 1};
        this.moving = true

      }
      break;
    }



    let {targetPosition, initialPosition} = this;


    // if (Math.abs(targetPosition.x - initialPosition.x) > 0 && this.onLog && this.currentLog && this.currentLog >= 0) {
    //   const {speed} = this.logSpeed[this.currentLog];
    //   // delta.x = (targetPosition.x - Math.round(initialPosition.x))
    //   // delta.z += (speed < 0) ? -1 : 1;
    //   if (speed > 0) {
    //   targetPosition.x = Math.ceil(targetPosition.x)
    // } else {
    //   targetPosition.x = Math.floor(targetPosition.x)
    // }
    //
    // }
    let delta = {x: (targetPosition.x - initialPosition.x), y: targetPosition.y - initialPosition.y, z: targetPosition.z - initialPosition.z}

    this.onLog = false;
    this.currentLog = null;
    let timing = 0.5;


    TweenMax.to(this.hero.position, this.timing, {
      x: this.initialPosition.x + (delta.x * 0.75),
      y: groundLevel + 0.5,
      z: this.initialPosition.z + (delta.z * 0.75),
    });

    TweenMax.to(this.hero.scale, this.timing, {
      x: 1,
      y: 1.2,
      z: 1,
    });
    TweenMax.to(this.hero.scale, this.timing, {
      x: 1.0,
      y: 0.8,
      z: 1,
      delay: this.timing
    });
    TweenMax.to(this.hero.scale, this.timing, {
      x: 1,
      y: 1,
      z: 1,
      ease: Bounce.easeOut,
      delay: this.timing * 2
    });

    TweenMax.to(this.hero.position, this.timing, {
      x: this.targetPosition.x,
      y: this.targetPosition.y,
      z: this.targetPosition.z,
      ease: Power4.easeOut,
      delay: 0.151,
      onComplete: this.doneMoving,
      onCompleteParams: []
    });


    this.initialPosition = this.targetPosition;

  }

  beginMoveWithDirection = direction => {
    if (this.props.gameState != State.Game.playing) {
      return;
    }

    let timing = 0.3;

    TweenMax.to(this.hero.scale, timing, {
      x: 1.2,
      y: 0.8,
      z: 1,
      ease: Bounce.easeOut,
    });
  }

  onSwipe = (gestureName, gestureState) => {
    this.moveWithDirection(gestureName);
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    if (!this.state.ready) {
      return (<AppLoading />);
    }

    return (
      <View style={[{flex: 1, backgroundColor: '#6dceea'}, this.props.style]}>
        <AnimatedGestureRecognizer
          onResponderGrant={_=> {
            this.beginMoveWithDirection();
          }}
          onSwipe={(direction, state) => this.onSwipe(direction, state)}
          config={config}
          style={{
            flex: 1,
            // opacity: scoreAnimation.interpolate({
            //   inputRange: [0, 1],
            //   outputRange: [1, 0],
            // })
          }}
          >
            <TouchableWithoutFeedback onPressIn={_=> {
                this.beginMoveWithDirection();

              }} style={{flex: 1}} onPress={_=> {
                this.onSwipe(swipeDirections.SWIPE_UP, {});
              }}>
              <THREEView
                backgroundColor={sceneColor}
                shadowMapEnabled={true}
                shadowMapRenderSingleSided={true}
                style={{ flex: 1 }}
                scene={this.scene}
                camera={this.camera}
                tick={this.tick}
              />
            </TouchableWithoutFeedback>
          </AnimatedGestureRecognizer>

        <AnimatedText pointerEvents={'none'} style={[{color: 'white', fontSize: 48, backgroundColor: 'transparent', position: 'absolute', top: 32, left: 16}, {transform: [
            {translateX: scoreAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 50]
            })},
            {translateY: scoreAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 50]
            })},
            {scale: scoreAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 2.5]
            })},
          ]}]}>
          {this.state.score}
        </AnimatedText>
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {setGameState} from '../actions/game';
export default connect(
  state => ({
    gameState: state.game.gameState

  }),
  {setGameState}
)(Game);
