"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api/api */ \"./pages/api/api.js\");\n\n\nconst LandingPage = (param)=>{\n    let { message } = param;\n    var _message;\n    return ((_message = message) === null || _message === void 0 ? void 0 : _message.name) ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n        children: \"You are signed In\"\n    }, void 0, false, {\n        fileName: \"D:\\\\code\\\\AAAA\\\\ashish\\\\ticketingMicroservicesProject\\\\client\\\\pages\\\\index.js\",\n        lineNumber: 5,\n        columnNumber: 5\n    }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n        children: \"You are not signed In\"\n    }, void 0, false, {\n        fileName: \"D:\\\\code\\\\AAAA\\\\ashish\\\\ticketingMicroservicesProject\\\\client\\\\pages\\\\index.js\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, undefined);\n};\n_c = LandingPage;\nLandingPage.getInitialProps = async ()=>{\n    try {\n        const response = await (0,_api_api__WEBPACK_IMPORTED_MODULE_1__.getFetch)(\"http://localhost:8080/api/v1/me\");\n        console.log(\"I am in landing Pages------------------\", response);\n        return response;\n    } catch (error) {\n        console.log(error);\n    }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (LandingPage);\nvar _c;\n$RefreshReg$(_c, \"LandingPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFxQztBQUVyQyxNQUFNQyxjQUFjO1FBQUMsRUFBRUMsT0FBTyxFQUFFO1FBQ3ZCQTtJQUFQLE9BQU9BLEVBQUFBLFdBQUFBLHFCQUFBQSwrQkFBQUEsU0FBU0MsSUFBSSxrQkFDbEIsOERBQUNDO2tCQUFHOzs7OztrQ0FFSiw4REFBQ0E7a0JBQUc7Ozs7OztBQUVSO0tBTk1IO0FBUU5BLFlBQVlJLGVBQWUsR0FBRztJQUM1QixJQUFJO1FBQ0YsTUFBTUMsV0FBVyxNQUFNTixrREFBUUEsQ0FBQztRQUVoQ08sUUFBUUMsR0FBRyxDQUFDLDJDQUEyQ0Y7UUFFdkQsT0FBT0E7SUFDVCxFQUFFLE9BQU9HLE9BQU87UUFDZEYsUUFBUUMsR0FBRyxDQUFDQztJQUNkO0FBQ0Y7QUFDQSwrREFBZVIsV0FBV0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9pbmRleC5qcz9iZWU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEZldGNoIH0gZnJvbSBcIi4vYXBpL2FwaVwiO1xyXG5cclxuY29uc3QgTGFuZGluZ1BhZ2UgPSAoeyBtZXNzYWdlIH0pID0+IHtcclxuICByZXR1cm4gbWVzc2FnZT8ubmFtZSA/IChcclxuICAgIDxoMT5Zb3UgYXJlIHNpZ25lZCBJbjwvaDE+XHJcbiAgKSA6IChcclxuICAgIDxoMT5Zb3UgYXJlIG5vdCBzaWduZWQgSW48L2gxPlxyXG4gICk7XHJcbn07XHJcblxyXG5MYW5kaW5nUGFnZS5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0RmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL3YxL21lXCIpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiSSBhbSBpbiBsYW5kaW5nIFBhZ2VzLS0tLS0tLS0tLS0tLS0tLS0tXCIsIHJlc3BvbnNlKTtcclxuXHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IExhbmRpbmdQYWdlO1xyXG4iXSwibmFtZXMiOlsiZ2V0RmV0Y2giLCJMYW5kaW5nUGFnZSIsIm1lc3NhZ2UiLCJuYW1lIiwiaDEiLCJnZXRJbml0aWFsUHJvcHMiLCJyZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.js\n"));

/***/ })

});