/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("function _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\nmodule.exports = _assertThisInitialized;\n\n//# sourceURL=webpack://reel_world/./node_modules/@babel/runtime/helpers/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\n\n//# sourceURL=webpack://reel_world/./node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/***/ ((module) => {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\n\n//# sourceURL=webpack://reel_world/./node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("function _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nmodule.exports = _defineProperty;\n\n//# sourceURL=webpack://reel_world/./node_modules/@babel/runtime/helpers/defineProperty.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/get.js":
/*!****************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/get.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var superPropBase = __webpack_require__(/*! ./superPropBase */ \"./node_modules/@babel/runtime/helpers/superPropBase.js\");\n\nfunction _get(target, property, receiver) {\n  if (typeof Reflect !== \"undefined\" && Reflect.get) {\n    module.exports = _get = Reflect.get;\n  } else {\n    module.exports = _get = function _get(target, property, receiver) {\n      var base = superPropBase(target, property);\n      if (!base) return;\n      var desc = Object.getOwnPropertyDescriptor(base, property);\n\n      if (desc.get) {\n        return desc.get.call(receiver);\n      }\n\n      return desc.value;\n    };\n  }\n\n  return _get(target, property, receiver || target);\n}\n\nmodule.exports = _get;\n\n//# sourceURL=webpack://reel_world/./node_modules/@babel/runtime/helpers/get.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("function _getPrototypeOf(o) {\n  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}\n\nmodule.exports = _getPrototypeOf;\n\n//# sourceURL=webpack://reel_world/./node_modules/@babel/runtime/helpers/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) setPrototypeOf(subClass, superClass);\n}\n\nmodule.exports = _inherits;\n\n//# sourceURL=webpack://reel_world/./node_modules/@babel/runtime/helpers/inherits.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\");\n\nvar assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return assertThisInitialized(self);\n}\n\nmodule.exports = _possibleConstructorReturn;\n\n//# sourceURL=webpack://reel_world/./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("function _setPrototypeOf(o, p) {\n  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\nmodule.exports = _setPrototypeOf;\n\n//# sourceURL=webpack://reel_world/./node_modules/@babel/runtime/helpers/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/superPropBase.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n\nfunction _superPropBase(object, property) {\n  while (!Object.prototype.hasOwnProperty.call(object, property)) {\n    object = getPrototypeOf(object);\n    if (object === null) break;\n  }\n\n  return object;\n}\n\nmodule.exports = _superPropBase;\n\n//# sourceURL=webpack://reel_world/./node_modules/@babel/runtime/helpers/superPropBase.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

eval("function _typeof(obj) {\n  \"@babel/helpers - typeof\";\n\n  if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") {\n    module.exports = _typeof = function _typeof(obj) {\n      return typeof obj;\n    };\n  } else {\n    module.exports = _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;\n    };\n  }\n\n  return _typeof(obj);\n}\n\nmodule.exports = _typeof;\n\n//# sourceURL=webpack://reel_world/./node_modules/@babel/runtime/helpers/typeof.js?");

/***/ }),

/***/ "./frontend/index.js":
/*!***************************!*\
  !*** ./frontend/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _world_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./world.js */ \"./frontend/world.js\");\n\nvar startButton = document.getElementById('startButton');\nvar shareScreenButton = document.getElementById(\"shareScreen\");\nvar world = null;\nstartButton.addEventListener('click', init);\n\nfunction init() {\n  callConnect();\n  shareScreenButton.addEventListener('click', shareScreen);\n}\n\nfunction callConnect() {\n  //remove the overlay as no longer needed, show call options\n  document.getElementById(\"overlay\").style.display = \"none\";\n  document.getElementById(\"conferenceOptions\").style.display = \"flex\"; //get local media stream, create the world and pass on stream\n\n  var localMediaStream = navigator.mediaDevices.getUserMedia({\n    audio: false,\n    video: {\n      frameRate: 10,\n      width: 1280,\n      height: 720\n    }\n  }).then(function (mediaStream) {\n    var video = document.createElement('video');\n    video.srcObject = mediaStream;\n    video.id = \"local_video\";\n    video.play().then(function () {\n      console.log(\"Local video playing\");\n    });\n    world = new _world_js__WEBPACK_IMPORTED_MODULE_0__.World(video);\n    world.init();\n  });\n}\n\nfunction callDisconnect() {\n  //remove the call options as no longer needed, show overlay\n  document.getElementById(\"conferenceOptions\").style.display = \"none\";\n  document.getElementById(\"overlay\").style.display = \"block\";\n}\n\nfunction shareScreen() {\n  var screenStream = navigator.mediaDevices.getDisplayMedia({\n    video: {\n      frameRate: 10,\n      width: 1280,\n      height: 720\n    },\n    audio: true\n  }).then(function (mediaStream) {\n    var video = document.createElement('video');\n    video.srcObject = mediaStream;\n    video.id = \"local_video\";\n    video.play().then(function () {\n      console.log(\"Local screen playing\");\n    });\n    world.addScreenShare(video);\n    shareScreenButton.textContent = \"Stop Sharing\";\n    shareScreenButton.removeEventListener('click', shareScreen);\n    shareScreenButton.addEventListener('click', stopSharingScreen);\n  })[\"catch\"](function (err) {\n    console.error(\"Error:\" + err);\n    return null;\n  });\n}\n\nfunction stopSharingScreen() {\n  shareScreenButton.textContent = \"Share Screen\";\n  shareScreenButton.removeEventListener('click', stopSharingScreen);\n  shareScreenButton.addEventListener('click', shareScreen);\n  world.removeScreenShare();\n}\n\n//# sourceURL=webpack://reel_world/./frontend/index.js?");

/***/ }),

/***/ "./frontend/lib/CSS2DRenderer.js":
/*!***************************************!*\
  !*** ./frontend/lib/CSS2DRenderer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CSS2DObject\": () => /* binding */ CSS2DObject,\n/* harmony export */   \"CSS2DRenderer\": () => /* binding */ CSS2DRenderer\n/* harmony export */ });\n/* harmony import */ var _three_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./three.module.js */ \"./frontend/lib/three.module.js\");\n\n\nvar CSS2DObject = function CSS2DObject(element) {\n  _three_module_js__WEBPACK_IMPORTED_MODULE_0__.Object3D.call(this);\n  this.element = element || document.createElement('div');\n  this.element.style.position = 'absolute';\n  this.addEventListener('removed', function () {\n    this.traverse(function (object) {\n      if (object.element instanceof Element && object.element.parentNode !== null) {\n        object.element.parentNode.removeChild(object.element);\n      }\n    });\n  });\n};\n\nCSS2DObject.prototype = Object.assign(Object.create(_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Object3D.prototype), {\n  constructor: CSS2DObject,\n  copy: function copy(source, recursive) {\n    _three_module_js__WEBPACK_IMPORTED_MODULE_0__.Object3D.prototype.copy.call(this, source, recursive);\n    this.element = source.element.cloneNode(true);\n    return this;\n  }\n}); //\n\nvar CSS2DRenderer = function CSS2DRenderer() {\n  var _this = this;\n\n  var _width, _height;\n\n  var _widthHalf, _heightHalf;\n\n  var vector = new _three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3();\n  var viewMatrix = new _three_module_js__WEBPACK_IMPORTED_MODULE_0__.Matrix4();\n  var viewProjectionMatrix = new _three_module_js__WEBPACK_IMPORTED_MODULE_0__.Matrix4();\n  var cache = {\n    objects: new WeakMap()\n  };\n  var domElement = document.createElement('div');\n  domElement.style.overflow = 'hidden';\n  this.domElement = domElement;\n\n  this.getSize = function () {\n    return {\n      width: _width,\n      height: _height\n    };\n  };\n\n  this.setSize = function (width, height) {\n    _width = width;\n    _height = height;\n    _widthHalf = _width / 2;\n    _heightHalf = _height / 2;\n    domElement.style.width = width + 'px';\n    domElement.style.height = height + 'px';\n  };\n\n  var renderObject = function renderObject(object, scene, camera) {\n    if (object instanceof CSS2DObject) {\n      object.onBeforeRender(_this, scene, camera);\n      vector.setFromMatrixPosition(object.matrixWorld);\n      vector.applyMatrix4(viewProjectionMatrix);\n      var element = object.element;\n      var style = 'translate(-50%,-50%) translate(' + (vector.x * _widthHalf + _widthHalf) + 'px,' + (-vector.y * _heightHalf + _heightHalf) + 'px)';\n      element.style.WebkitTransform = style;\n      element.style.MozTransform = style;\n      element.style.oTransform = style;\n      element.style.transform = style;\n      element.style.display = object.visible && vector.z >= -1 && vector.z <= 1 ? '' : 'none';\n      var objectData = {\n        distanceToCameraSquared: getDistanceToSquared(camera, object)\n      };\n      cache.objects.set(object, objectData);\n\n      if (element.parentNode !== domElement) {\n        domElement.appendChild(element);\n      }\n\n      object.onAfterRender(_this, scene, camera);\n    }\n\n    for (var i = 0, l = object.children.length; i < l; i++) {\n      renderObject(object.children[i], scene, camera);\n    }\n  };\n\n  var getDistanceToSquared = function () {\n    var a = new _three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3();\n    var b = new _three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3();\n    return function (object1, object2) {\n      a.setFromMatrixPosition(object1.matrixWorld);\n      b.setFromMatrixPosition(object2.matrixWorld);\n      return a.distanceToSquared(b);\n    };\n  }();\n\n  var filterAndFlatten = function filterAndFlatten(scene) {\n    var result = [];\n    scene.traverse(function (object) {\n      if (object instanceof CSS2DObject) result.push(object);\n    });\n    return result;\n  };\n\n  var zOrder = function zOrder(scene) {\n    var sorted = filterAndFlatten(scene).sort(function (a, b) {\n      var distanceA = cache.objects.get(a).distanceToCameraSquared;\n      var distanceB = cache.objects.get(b).distanceToCameraSquared;\n      return distanceA - distanceB;\n    });\n    var zMax = sorted.length;\n\n    for (var i = 0, l = sorted.length; i < l; i++) {\n      sorted[i].element.style.zIndex = zMax - i;\n    }\n  };\n\n  this.render = function (scene, camera) {\n    if (scene.autoUpdate === true) scene.updateMatrixWorld();\n    if (camera.parent === null) camera.updateMatrixWorld();\n    viewMatrix.copy(camera.matrixWorldInverse);\n    viewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, viewMatrix);\n    renderObject(scene, scene, camera);\n    zOrder(scene);\n  };\n};\n\n\n\n//# sourceURL=webpack://reel_world/./frontend/lib/CSS2DRenderer.js?");

/***/ }),

/***/ "./frontend/lib/playerControls.js":
/*!****************************************!*\
  !*** ./frontend/lib/playerControls.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PlayerControls\": () => /* binding */ PlayerControls\n/* harmony export */ });\n/* harmony import */ var _three_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./three.module.js */ \"./frontend/lib/three.module.js\");\n//this file has been modified to fit the needs of this project\n // https://github.com/PiusNyakoojo/PlayerControls\n\nvar PlayerControls = function PlayerControls(camera, player, domElement) {\n  this.camera = camera;\n  this.player = player;\n  this.domElement = domElement !== undefined ? domElement : document;\n  this.maxDistanceFromCenter = Infinity; // API\n\n  this.enabled = true;\n  this.center = new _three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(player.position.x, player.position.y, player.position.z);\n  this.moveSpeed = 0.2;\n  this.turnSpeed = 0.1;\n  this.userZoomSpeed = 1.0;\n  this.userRotate = true;\n  this.userRotateSpeed = 1.5;\n  this.autoRotate = false;\n  this.autoRotateSpeed = 0.1;\n  this.minPolarAngle = 0;\n  this.maxPolarAngle = Math.PI; // internals\n\n  var scope = this;\n  var EPS = 0.000001;\n  var PIXELS_PER_ROUND = 1800;\n  var rotateStart = new _three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2();\n  var rotateEnd = new _three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2();\n  var rotateDelta = new _three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2();\n  var zoomStart = new _three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2();\n  var zoomEnd = new _three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2();\n  var zoomDelta = new _three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2();\n  var phiDelta = 0;\n  var thetaDelta = 0;\n  var scale = 1;\n  var lastPosition = new _three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(player.position.x, player.position.y, player.position.z);\n  var playerIsMoving = false;\n  var keyState = {};\n  var STATE = {\n    NONE: -1,\n    ROTATE: 0,\n    ZOOM: 1,\n    PAN: 2\n  };\n  var state = STATE.NONE; // events\n\n  this.rotateLeft = function (angle) {\n    if (angle === undefined) {\n      angle = getAutoRotationAngle();\n    }\n\n    thetaDelta -= angle;\n  };\n\n  this.rotateRight = function (angle) {\n    if (angle === undefined) {\n      angle = getAutoRotationAngle();\n    }\n\n    thetaDelta += angle;\n  };\n\n  this.rotateUp = function (angle) {\n    if (angle === undefined) {\n      angle = getAutoRotationAngle();\n    }\n\n    phiDelta -= angle;\n  };\n\n  this.rotateDown = function (angle) {\n    if (angle === undefined) {\n      angle = getAutoRotationAngle();\n    }\n\n    phiDelta += angle;\n  };\n\n  this.zoomIn = function (zoomScale) {\n    if (zoomScale === undefined) {\n      zoomScale = getZoomScale();\n    }\n\n    scale /= zoomScale;\n  };\n\n  this.zoomOut = function (zoomScale) {\n    if (zoomScale === undefined) {\n      zoomScale = getZoomScale();\n    }\n\n    scale *= zoomScale;\n  };\n\n  this.init = function () {// this.camera.position.x = this.player.position.x + 2;\n    // this.camera.position.y = this.player.position.y + 2;\n    // this.camera.position.z = this.player.position.x + 2;\n    //\n    // this.camera.lookAt(this.player.position);\n  };\n\n  this.update = function () {\n    this.checkKeyStates();\n    this.center = this.player.position;\n    var position = this.camera.position;\n    var offset = position.clone().sub(this.center); // angle from z-axis around y-axis\n\n    var theta = Math.atan2(offset.x, offset.z); // angle from y-axis\n\n    var phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);\n    theta += thetaDelta;\n    phi += phiDelta; // restrict phi to be between desired limits\n\n    phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi)); // restrict phi to be between EPS and PI-EPS\n\n    phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));\n    var radius = offset.length() * scale; // offset.x = radius * Math.sin(phi) * Math.sin(theta);\n\n    offset.y = Math.max(radius * Math.cos(phi), 0); // offset.z = radius * Math.sin(phi) * Math.cos(theta);\n\n    if (this.autoRotate) {// this.camera.position.x += this.autoRotateSpeed * ((this.player.position.x + 8 * Math.sin(this.player.rotation.y)) - this.camera.position.x);\n      // this.camera.position.z += this.autoRotateSpeed * ((this.player.position.z + 8 * Math.cos(this.player.rotation.y)) - this.camera.position.z);\n      //  this.camera.position.z += Math.sin(this.player.rotation.y);\n      //  this.camera.position.x += Math.cos(this.player.rotation.y);\n    } else {\n      this.camera.position.copy(this.center).add(offset);\n    }\n\n    var centerTemp = this.center.clone();\n    centerTemp.y = centerTemp.y + 10;\n    this.camera.lookAt(centerTemp);\n    thetaDelta = 0;\n    phiDelta = 0;\n    scale = 1;\n\n    if (state === STATE.NONE && playerIsMoving) {\n      this.autoRotate = true;\n    } else {\n      this.autoRotate = false;\n    }\n\n    if (lastPosition.distanceTo(this.player.position) > 0) {\n      lastPosition.copy(this.player.position);\n    } else if (lastPosition.distanceTo(this.player.position) === 0) {\n      playerIsMoving = false;\n    }\n  };\n\n  this.checkKeyStates = function () {\n    if (keyState[38] || keyState[87]) {\n      // up arrow or 'w' - move forward\n      this.player.position.x -= this.moveSpeed * Math.sin(this.player.rotation.y);\n      this.player.position.z -= this.moveSpeed * Math.cos(this.player.rotation.y); // this.camera.position.x -= this.moveSpeed * Math.sin(this.player.rotation.y);\n      // this.camera.position.z -= this.moveSpeed * Math.cos(this.player.rotation.y);\n    }\n\n    if (keyState[40] || keyState[83]) {\n      // down arrow or 's' - move backward\n      playerIsMoving = true;\n      this.player.position.x += this.moveSpeed * Math.sin(this.player.rotation.y);\n      this.player.position.z += this.moveSpeed * Math.cos(this.player.rotation.y); // this.camera.position.x += this.moveSpeed * Math.sin(this.player.rotation.y);\n      // this.camera.position.z += this.moveSpeed * Math.cos(this.player.rotation.y);\n    }\n\n    if (keyState[37] || keyState[65]) {\n      // left arrow or 'a' - rotate left\n      playerIsMoving = true;\n      this.player.rotation.y += this.turnSpeed;\n    }\n\n    if (keyState[39] || keyState[68]) {\n      // right arrow or 'd' - rotate right\n      playerIsMoving = true;\n      this.player.rotation.y -= this.turnSpeed;\n    }\n\n    if (keyState[81]) {\n      // 'q' - strafe left\n      playerIsMoving = true;\n      this.player.position.x -= this.moveSpeed * Math.cos(this.player.rotation.y);\n      this.player.position.z += this.moveSpeed * Math.sin(this.player.rotation.y); // this.camera.position.x -= this.moveSpeed * Math.cos(this.player.rotation.y);\n      // this.camera.position.z += this.moveSpeed * Math.sin(this.player.rotation.y);\n    }\n\n    if (keyState[69]) {\n      // 'e' - strage right\n      playerIsMoving = true;\n      this.player.position.x += this.moveSpeed * Math.cos(this.player.rotation.y);\n      this.player.position.z -= this.moveSpeed * Math.sin(this.player.rotation.y); // this.camera.position.x += this.moveSpeed * Math.cos(this.player.rotation.y);\n      // this.camera.position.z -= this.moveSpeed * Math.sin(this.player.rotation.y);\n    }\n\n    if (this.player.position.x > this.maxDistanceFromCenter) {\n      this.player.position.x = this.maxDistanceFromCenter;\n    }\n\n    if (this.player.position.z > this.maxDistanceFromCenter) {\n      this.player.position.z = this.maxDistanceFromCenter;\n    }\n\n    if (this.player.position.x < -this.maxDistanceFromCenter) {\n      this.player.position.x = -this.maxDistanceFromCenter;\n    }\n\n    if (this.player.position.z < -this.maxDistanceFromCenter) {\n      this.player.position.z = -this.maxDistanceFromCenter;\n    }\n  };\n\n  function getAutoRotationAngle() {\n    return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;\n  }\n\n  function getZoomScale() {\n    return Math.pow(0.95, scope.userZoomSpeed);\n  }\n\n  function onMouseDown(event) {\n    if (scope.enabled === false) return;\n    if (scope.userRotate === false) return;\n    event.preventDefault();\n\n    if (event.button === 0) {\n      state = STATE.ROTATE;\n      rotateStart.set(event.clientX, event.clientY);\n    } else if (event.button === 1) {\n      state = STATE.ZOOM;\n      zoomStart.set(event.clientX, event.clientY);\n    }\n\n    document.addEventListener('mousemove', onMouseMove, false);\n    document.addEventListener('mouseup', onMouseUp, false);\n  }\n\n  function onMouseMove(event) {\n    if (scope.enabled === false) return;\n    event.preventDefault();\n\n    if (state === STATE.ROTATE) {\n      rotateEnd.set(event.clientX, event.clientY);\n      rotateDelta.subVectors(rotateEnd, rotateStart); // scope.rotateLeft(2 * Math.PI * rotateDelta.x / PIXELS_PER_ROUND * scope.userRotateSpeed);\n\n      scope.rotateUp(2 * Math.PI * rotateDelta.y / PIXELS_PER_ROUND * scope.userRotateSpeed);\n      rotateStart.copy(rotateEnd);\n    } else if (state === STATE.ZOOM) {\n      zoomEnd.set(event.clientX, event.clientY);\n      zoomDelta.subVectors(zoomEnd, zoomStart);\n\n      if (zoomDelta.y > 0) {\n        scope.zoomIn();\n      } else {\n        scope.zoomOut();\n      }\n\n      zoomStart.copy(zoomEnd);\n    }\n  }\n\n  function onMouseUp(event) {\n    if (scope.enabled === false) return;\n    if (scope.userRotate === false) return;\n    document.removeEventListener('mousemove', onMouseMove, false);\n    document.removeEventListener('mouseup', onMouseUp, false);\n    state = STATE.NONE;\n  }\n\n  function onMouseWheel(event) {\n    if (scope.enabled === false) return;\n    if (scope.userRotate === false) return;\n    var delta = 0;\n\n    if (event.wheelDelta) {\n      //WebKit / Opera / Explorer 9\n      delta = event.wheelDelta;\n    } else if (event.detail) {\n      // Firefox\n      delta = -event.detail;\n    }\n\n    if (delta > 0) {\n      scope.zoomOut();\n    } else {\n      scope.zoomIn();\n    }\n  }\n\n  function onKeyDown(event) {\n    event = event || window.event;\n    keyState[event.keyCode || event.which] = true;\n  }\n\n  function onKeyUp(event) {\n    event = event || window.event;\n    keyState[event.keyCode || event.which] = false;\n  }\n\n  this.domElement.addEventListener('contextmenu', function (event) {\n    event.preventDefault();\n  }, false);\n  this.domElement.addEventListener('mousedown', onMouseDown, false);\n  this.domElement.addEventListener('mousewheel', onMouseWheel, false);\n  this.domElement.addEventListener('DOMMouseScroll', onMouseWheel, false); // firefox\n\n  this.domElement.addEventListener('keydown', onKeyDown, false);\n  this.domElement.addEventListener('keyup', onKeyUp, false);\n};\n\n\n\n//# sourceURL=webpack://reel_world/./frontend/lib/playerControls.js?");

/***/ }),

/***/ "./frontend/lib/three.module.js":
/*!**************************************!*\
  !*** ./frontend/lib/three.module.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

/***/ }),

/***/ "./frontend/world.js":
/*!***************************!*\
  !*** ./frontend/world.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"World\": () => /* binding */ World\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/three.module.js */ \"./frontend/lib/three.module.js\");\n/* harmony import */ var _lib_playerControls_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/playerControls.js */ \"./frontend/lib/playerControls.js\");\n/* harmony import */ var _lib_CSS2DRenderer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/CSS2DRenderer.js */ \"./frontend/lib/CSS2DRenderer.js\");\n\n\n\n\n\n\nvar World = function World(videoStream) {\n  var _this = this;\n\n  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, World);\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"init\", function () {\n    var canvas = document.getElementById(\"c\");\n    _this.renderer = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer({\n      canvas: canvas,\n      logarithmicDepthBuffer: true\n    });\n    _this.scene = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.Scene();\n    _this.scene.background = 0x000000; //ambient light to reduce computations and keep everything visible\n\n    var ambientLight = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.AmbientLight(0xFFFFFF, 1);\n\n    _this.scene.add(ambientLight); //setting this so that center is known\n\n\n    var axesHelper = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.AxesHelper(5);\n    axesHelper.position.y = 1;\n\n    _this.scene.add(axesHelper); //setting the stage\n\n\n    var gridHelper = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.GridHelper(200, 20);\n\n    _this.scene.add(gridHelper); //camera to follow user around\n\n\n    var fov = 90;\n    var aspect = window.innerWidth / window.innerHeight;\n    var far = 283;\n    var near = 1;\n    _this.camera = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.PerspectiveCamera(fov, aspect, far, near);\n    _this.camera.position.y = 10;\n    _this.camera.position.z = 15;\n\n    _this.camera.lookAt(0, 0, 0); //setting up user\n\n\n    var userLowerBodyGeo = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(5, 5, 5);\n    var userLowerBodyMat = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial();\n    var userLowerBodyMesh = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.Mesh(userLowerBodyGeo, userLowerBodyMat);\n    userLowerBodyMesh.position.y = 2.5;\n    var userUpperBodyGeo = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(5, 5, 5);\n    var userUpperBodyVideoTexture = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.VideoTexture(_this.localVideoStream);\n    var userUpperBodyMat = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({\n      map: userUpperBodyVideoTexture\n    });\n    var userUpperBodyMesh = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.Mesh(userUpperBodyGeo, userUpperBodyMat);\n    userUpperBodyMesh.position.y = 7.5;\n    var userBody = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.Object3D();\n    userBody.add(userUpperBodyMesh);\n    userBody.add(userLowerBodyMesh);\n    var userLabelDiv = document.createElement('div');\n    userLabelDiv.className = 'label';\n    userLabelDiv.textContent = 'You';\n    userLabelDiv.style.marginTop = '-2em';\n    userLabelDiv.style.color = \"white\";\n    userLabelDiv.style.fontSize = \"2em\";\n    var userLabel = new _lib_CSS2DRenderer_js__WEBPACK_IMPORTED_MODULE_4__.CSS2DObject(userLabelDiv);\n    userLabel.position.set(0, 11, 0);\n    userBody.add(userLabel);\n    var user = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.Group();\n    user.add(userBody);\n    user.add(_this.camera);\n\n    _this.scene.add(user); //setting up movement controls\n    //I have not used the main camera here as I didn't like the camera movement provided by the library\n\n\n    _this.controls = new _lib_playerControls_js__WEBPACK_IMPORTED_MODULE_3__.PlayerControls(_this.camera, user);\n    _this.controls.moveSpeed = 2;\n    _this.controls.turnSpeed = 0.1;\n    _this.controls.maxDistanceFromCenter = 100; //to show labels\n\n    _this.labelRenderer = new _lib_CSS2DRenderer_js__WEBPACK_IMPORTED_MODULE_4__.CSS2DRenderer();\n\n    _this.labelRenderer.setSize(window.innerWidth, window.innerHeight);\n\n    _this.labelRenderer.domElement.style.position = 'absolute';\n    _this.labelRenderer.domElement.style.top = '0px';\n    document.body.appendChild(_this.labelRenderer.domElement);\n    requestAnimationFrame(_this.render);\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"addScreenShare\", function (video) {\n    //TODO cannot be more than 4\n    var videoTexture = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.VideoTexture(video);\n    var planeMesh = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.Mesh(new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(50, 50), new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({\n      map: videoTexture\n    }));\n\n    _this.sharedScreenBoards.push(planeMesh);\n\n    var numberOfScreens = _this.sharedScreenBoards.length - 1;\n\n    video.onloadeddata = function () {\n      var aspectRatio = video.videoWidth / video.videoHeight;\n      planeMesh.scale.set(1, 1 / aspectRatio, 1);\n      planeMesh.position.y = 25 / aspectRatio;\n\n      if (numberOfScreens > 1) {\n        if (numberOfScreens % 2) {\n          planeMesh.rotation.y = -0 * Math.PI / 180;\n          planeMesh.position.z = -100;\n        } else {\n          planeMesh.rotation.y = 90 * Math.PI / 180;\n          planeMesh.position.x = -100;\n        }\n      } else {\n        if (numberOfScreens % 2) {\n          planeMesh.rotation.y = 180 * Math.PI / 180;\n          planeMesh.position.z = 100;\n        } else {\n          planeMesh.rotation.y = -90 * Math.PI / 180;\n          planeMesh.position.x = 100;\n        }\n      }\n    };\n\n    _this.scene.add(planeMesh);\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"removeScreenShare\", function () {\n    _this.scene.remove(_this.sharedScreenBoards.pop());\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"resizeRendererToDisplaySize\", function () {\n    var canvas = _this.renderer.domElement;\n    var pixelRatio = window.devicePixelRatio;\n    var width = canvas.clientWidth * pixelRatio | 0;\n    var height = canvas.clientHeight * pixelRatio | 0;\n    var needResize = canvas.width !== width || canvas.height !== height;\n\n    if (needResize) {\n      _this.renderer.setSize(width, height, false);\n\n      _this.labelRenderer.setSize(width, height);\n    }\n\n    return needResize;\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"render\", function (time) {\n    if (_this.resizeRendererToDisplaySize()) {\n      var canvas = _this.renderer.domElement;\n      _this.camera.aspect = canvas.clientWidth / canvas.clientHeight;\n\n      _this.camera.updateProjectionMatrix();\n    }\n\n    _this.controls.update();\n\n    _this.renderer.render(_this.scene, _this.camera);\n\n    _this.labelRenderer.render(_this.scene, _this.camera);\n\n    setTimeout(function () {\n      requestAnimationFrame(_this.render);\n    }, 1000 / 30);\n  });\n\n  this.localVideoStream = videoStream;\n  this.scene = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.Scene();\n  this.camera = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.PerspectiveCamera();\n  this.renderer = new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer();\n  this.controls = new _lib_playerControls_js__WEBPACK_IMPORTED_MODULE_3__.PlayerControls(this.camera, new _lib_three_module_js__WEBPACK_IMPORTED_MODULE_2__.Object3D());\n  this.labelRenderer = new _lib_CSS2DRenderer_js__WEBPACK_IMPORTED_MODULE_4__.CSS2DRenderer();\n  this.sharedScreenBoards = [];\n};\n\n\n\n//# sourceURL=webpack://reel_world/./frontend/world.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./frontend/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;