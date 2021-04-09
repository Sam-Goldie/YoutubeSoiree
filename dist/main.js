/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/autoscrollChat.js":
/*!*******************************!*\
  !*** ./src/autoscrollChat.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nvar autoscrollChat = function autoscrollChat() {\n  var chatContainer = document.getElementById('chat-container');\n  chatContainer.scrollTop = chatContainer.scrollHeight;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (autoscrollChat);\n\n//# sourceURL=webpack://my-webpack-project/./src/autoscrollChat.js?");

/***/ }),

/***/ "./src/findColor.js":
/*!**************************!*\
  !*** ./src/findColor.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nvar userColors = {};\n\nvar findColor = function findColor(username) {\n  var color = userColors[username];\n\n  if (color !== undefined) {\n    return color;\n  }\n\n  userColors[username] = \"#\" + ((1 << 24) * Math.random() | 0).toString(16);\n  return userColors[username];\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findColor);\n\n//# sourceURL=webpack://my-webpack-project/./src/findColor.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _socketConnect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socketConnect.js */ \"./src/socketConnect.js\");\n/* harmony import */ var _findColor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./findColor.js */ \"./src/findColor.js\");\n\n\nvar username;\nvar userColor;\n\ndocument.getElementById('username-submit').onclick = function () {\n  var newUsername = document.getElementById('username-entry').value;\n\n  if (newUsername !== '') {\n    username = newUsername;\n    document.getElementById('username-modal').style.display = 'none';\n    userColor = (0,_findColor_js__WEBPACK_IMPORTED_MODULE_1__.default)(newUsername);\n  }\n};\n\ndocument.getElementById('url-submit').onclick = function () {\n  console.log('IM INSIDE CHANGEVIDEO!');\n  var newVideoId = document.getElementById('submit-input').value;\n  document.getElementById('submit-input').value = '';\n  newVideoId = newVideoId.substring(newVideoId.lastIndexOf('/') + 1);\n\n  if (newVideoId.includes('?')) {\n    newVideoId = newVideoId.substring(0, newVideoId.lastIndexOf('?'));\n  }\n\n  if (newVideoId.includes('&')) {\n    newVideoId = newVideoId.substring(0, newVideoId.lastIndexOf('&'));\n  }\n\n  console.log(\"the newURL is: \".concat(newVideoId));\n  socket.emit('url', newVideoId);\n  player.loadVideoById(newVideoId); // player = new YT.Player('video-player', {\n  //   // why am i hardcapped on iframe dimensions?\n  //   height: '100%',\n  //   width: '100%',\n  //   videoId: newVideoId,\n  //   events: {\n  //     onReady: onPlayerReady,\n  //     onStateChange: onPlayerStateChange,\n  //   },\n  // });\n};\n\ndocument.getElementById('message-input').addEventListener('keyup', function (event) {\n  if (event.key === 'Enter') {\n    document.getElementById('message-submit').click();\n  }\n}); // onclick={window.changeVideo}\n\ndocument.getElementById('message-submit').onclick = function () {\n  var messageBox = document.getElementById('message-input');\n  var newText = messageBox.value;\n\n  if (newText === '') {\n    return;\n  }\n\n  messageBox.value = '';\n  console.log('heres the newText: ' + newText);\n  var addedMessage = {\n    user: username,\n    body: newText\n  };\n  console.log(\"heres the new message: \".concat(addedMessage));\n  socket.emit('message', addedMessage);\n  var displayMessage = document.createElement('div');\n  displayMessage.setAttribute('class', 'message');\n  var displayName = document.createElement('div');\n  displayName.setAttribute('class', addedMessage.user);\n  displayName.setAttribute('class', 'chat-text username');\n  displayName.style.color = userColor;\n  displayName.append(\"\".concat(addedMessage.user, \":  \"));\n  var chatContainer = document.getElementById('chat-container');\n  var displayBody = document.createElement('div');\n  displayBody.setAttribute('class', 'chat-text');\n  displayBody.append(\"  \".concat(addedMessage.body));\n  displayMessage.append(displayName);\n  displayMessage.append(displayBody);\n\n  if (jQuery(chatContainer.getElementsByTagName('div')[chatContainer.getElementsByTagName('div').length - 1]).offset().top <= chatContainer.offsetTop + chatContainer.offsetHeight) {\n    chatContainer.append(displayMessage);\n    chatContainer.scrollTo(0, chatContainer.scrollHeight);\n  }\n\n  chatContainer.append(displayMessage); // this.setState({\n  //   messages: [...this.state.messages, {\n  //     user: this.state.currentUser,\n  //     body: newMessage,\n  //   }],\n  // });\n}; // App.propTypes = {\n//   url: PropTypes.string,\n//   changeVideo: PropTypes.func,\n// };\n// App.defaultProps = {\n//   url: 'https://www.youtube.com/embed/IY9YNF5MMQo',\n//   changeVideo,\n// };\n// render() {\n//   console.log(`heres thises changeVideo: ${this.changeVideo}`);\n//   return (\n//     <div>\n//       <UrlSubmission changeVideo={this.changeVideo.bind(this)} />\n//       {/* <VideoDisplay url={this.state.url} /> */}\n//       <ChatInput addMessage={this.addMessage.bind(this)} />\n//       <ChatContainer messages={this.state.messages}/>\n//     </div>\n//   );\n// }\n\n\nconsole.log('here i am in app!'); // not exporting anything at the moment\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ }),

/***/ "./src/socketConnect.js":
/*!******************************!*\
  !*** ./src/socketConnect.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _autoscrollChat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./autoscrollChat.js */ \"./src/autoscrollChat.js\");\n/* harmony import */ var _findColor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./findColor.js */ \"./src/findColor.js\");\n// turns out, iframes keep track of time data more granularly than seconds. implement greater precision of playback sync when you have time\n\n\nsocket.on('message', function (data) {\n  var mustScroll = false;\n  console.log(\"data is: \".concat(data));\n  var newMessage = document.createElement('div');\n  newMessage.setAttribute('class', 'message');\n  var userColor = (0,_findColor_js__WEBPACK_IMPORTED_MODULE_1__.default)(data.user);\n  newMessage.append(\"\".concat(data.user, \":  \").concat(data.body));\n  var chatContainer = document.getElementById('chat-container');\n  console.log('the current distance from bottom is: ' + (chatContainer.height - chatContainer.scrollTop).toString());\n\n  if (jQuery(chatContainer.getElementsByTagName('div')[chatContainer.getElementsByTagName('div').length - 1]).offset().top <= chatContainer.offsetTop + chatContainer.offsetHeight) {\n    chatContainer.append(newMessage);\n    chatContainer.scrollTo(0, chatContainer.scrollHeight);\n  }\n\n  chatContainer.append(newMessage);\n\n  if (mustScroll) {\n    autoscrollChat();\n  }\n});\nsocket.on('play', function (timecode) {\n  // player.seekTo(timecode, true);\n  player.playVideo();\n});\nsocket.on('pause', function (timecode) {\n  player.seekTo(timecode, true);\n  player.pauseVideo();\n}); // I never emit this signal as of yet\n\nsocket.on('seek', function (timecode) {\n  player.seekTo(timecode, true);\n});\nsocket.on('url', function (url) {\n  player.loadVideoById(url);\n});\n\n//# sourceURL=webpack://my-webpack-project/./src/socketConnect.js?");

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
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;