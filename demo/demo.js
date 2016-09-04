/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _jsBeautify = __webpack_require__(2);

	var _jsBeautify2 = _interopRequireDefault(_jsBeautify);

	var _highlight = __webpack_require__(6);

	var _highlight2 = _interopRequireDefault(_highlight);

	__webpack_require__(8);

	var _iframe = __webpack_require__(12);

	var _iframe2 = _interopRequireDefault(_iframe);

	var _p5Min = __webpack_require__(13);

	var _p5Min2 = _interopRequireDefault(_p5Min);

	var _p5ToyMin = __webpack_require__(14);

	var _p5ToyMin2 = _interopRequireDefault(_p5ToyMin);

	__webpack_require__(15);

	var _examples = __webpack_require__(21);

	var _examples2 = _interopRequireDefault(_examples);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// To be injected in the iframe


	var libraries = [_p5Min2.default, _p5ToyMin2.default];

	var SandBox = function (_React$Component) {
		_inherits(SandBox, _React$Component);

		function SandBox(props) {
			_classCallCheck(this, SandBox);

			var _this = _possibleConstructorReturn(this, (SandBox.__proto__ || Object.getPrototypeOf(SandBox)).call(this, props));

			_this.baseHead = libraries.map(function (t) {
				return "<script>" + t + "</script>";
			}).join("");
			_this.sandboxAttributes = ["allow-scripts", "allow-popups"];
			return _this;
		}

		_createClass(SandBox, [{
			key: "getDefaultProps",
			value: function getDefaultProps() {
				return {
					html: "",
					css: "",
					js: ""
				};
			}
		}, {
			key: "componentDidMount",
			value: function componentDidMount() {
				this.frame = (0, _iframe2.default)({
					container: this.container,
					//scrollingDisabled: true,
					sandboxAttributes: this.sandboxAttributes
				});
				this.update(this.props);
			}
		}, {
			key: "componentWillReceiveProps",
			value: function componentWillReceiveProps(props) {
				this.update(props);
			}
		}, {
			key: "update",
			value: function update(props) {
				var head = this.baseHead;
				if (props.js) head += "<script>" + props.js + "</script>";
				if (props.css) head += "<style>" + props.css + "</style>";
				var body = props.html;
				this.frame.setHTML({
					head: head,
					body: body,
					sandboxAttributes: this.sandboxAttributes
				});
			}
		}, {
			key: "render",
			value: function render() {
				var _this2 = this;

				return _react2.default.createElement("div", { ref: function ref(e) {
						_this2.container = e;
					} });
			}
		}]);

		return SandBox;
	}(_react2.default.Component);

	var CodeBox = function (_React$Component2) {
		_inherits(CodeBox, _React$Component2);

		function CodeBox() {
			_classCallCheck(this, CodeBox);

			return _possibleConstructorReturn(this, (CodeBox.__proto__ || Object.getPrototypeOf(CodeBox)).apply(this, arguments));
		}

		_createClass(CodeBox, [{
			key: "getDefaultProps",
			value: function getDefaultProps() {
				return {
					lang: "js",
					code: ""
				};
			}
		}, {
			key: "componentWillMount",
			value: function componentWillMount() {
				this.highlight(this.props);
			}
		}, {
			key: "componentWillReceiveProps",
			value: function componentWillReceiveProps(props) {
				this.highlight(props);
			}
		}, {
			key: "highlight",
			value: function highlight(props) {
				var prettyCode = _jsBeautify2.default[props.lang](props.code);
				var tmpElem = document.createElement("code");
				tmpElem.innerHTML = prettyCode;
				_highlight2.default.highlightBlock(tmpElem);
				this.setState({
					hlCode: { __html: tmpElem.innerHTML }
				});
			}
		}, {
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"div",
					{ className: "codebox fullWidth" },
					_react2.default.createElement(
						"pre",
						null,
						_react2.default.createElement("code", { className: "hljs", dangerouslySetInnerHTML: this.state.hlCode })
					)
				);
			}
		}]);

		return CodeBox;
	}(_react2.default.Component);

	var Main = function (_React$Component3) {
		_inherits(Main, _React$Component3);

		function Main(props) {
			_classCallCheck(this, Main);

			var _this4 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

			_this4.state = {
				exIndex: 0
			};
			_this4.transitionDelay = 250;
			_this4.transitionElements = [];
			_this4.prev = _this4.prev.bind(_this4);
			_this4.next = _this4.next.bind(_this4);
			_this4.show = _this4.show.bind(_this4);
			return _this4;
		}

		_createClass(Main, [{
			key: "prev",
			value: function prev() {
				var i = this.state.exIndex - 1;
				if (i >= 0) {
					this.transitionState({ exIndex: i });
				}
			}
		}, {
			key: "next",
			value: function next() {
				var i = this.state.exIndex + 1;
				if (i < _examples2.default.length) {
					this.transitionState({ exIndex: i });
				}
			}
		}, {
			key: "transitionState",
			value: function transitionState(state) {
				var _this5 = this;

				this.transitionElements.forEach(this.hide);
				this.transitionElements = [];
				setTimeout(function () {
					_this5.setState(state);
				}, this.transitionDelay);
			}
		}, {
			key: "show",
			value: function show(e) {
				if (!e) return;
				e.classList.add("content");
				e.classList.remove("content-hide");
				e.classList.add("content-show");
				this.transitionElements.push(e);
			}
		}, {
			key: "hide",
			value: function hide(e) {
				if (!e) return;
				e.classList.remove("content-show");
				e.classList.add("content-hide");
			}
		}, {
			key: "render",
			value: function render() {
				var _this6 = this;

				var _examples$state$exInd = _examples2.default[this.state.exIndex];
				var title = _examples$state$exInd.title;
				var desc = _examples$state$exInd.desc;
				var html = _examples$state$exInd.html;
				var css = _examples$state$exInd.css;
				var js = _examples$state$exInd.js;

				var prevClass = "",
				    nextClass = "";
				if (this.state.exIndex == 0) {
					prevClass = "disabled";
				}
				if (this.state.exIndex == _examples2.default.length - 1) {
					nextClass = "disabled";
				}
				return _react2.default.createElement(
					"div",
					{ id: "main" },
					_react2.default.createElement(
						"div",
						{ className: "sandbox" },
						_react2.default.createElement(
							"div",
							{ style: { height: "100%" }, ref: function ref(e) {
									_this6.show(e);
								} },
							_react2.default.createElement(SandBox, { html: html, css: css, js: js })
						)
					),
					_react2.default.createElement(
						"div",
						{ id: "side" },
						_react2.default.createElement(
							"div",
							{ className: "header fullWidth noselect" },
							_react2.default.createElement(
								"div",
								{ className: "p5toyLogo" },
								_react2.default.createElement(
									"span",
									null,
									"p5"
								),
								_react2.default.createElement(
									"span",
									null,
									"."
								),
								_react2.default.createElement(
									"span",
									null,
									"toy"
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "links" },
								_react2.default.createElement("a", { className: "githubLink", target: "_blank", href: "http://github.com/entibo/p5.toy" }),
								_react2.default.createElement("a", { className: "p5Link", target: "_blank", href: "http://p5js.org" })
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "navigation fullWidth noselect" },
							_react2.default.createElement(
								"span",
								{ className: prevClass, onClick: this.prev },
								" Previous example "
							),
							_react2.default.createElement(
								"span",
								{ className: nextClass, onClick: this.next },
								" Next example "
							)
						),
						_react2.default.createElement(
							"div",
							{ ref: function ref(e) {
									_this6.show(e);
								} },
							_react2.default.createElement(
								"h1",
								null,
								title
							),
							_react2.default.createElement(
								"h3",
								null,
								desc
							),
							_react2.default.createElement(CodeBox, { code: js, lang: "js" })
						)
					)
				);
			}
		}]);

		return Main;
	}(_react2.default.Component);

	window.render = function () {
		_react2.default.render(_react2.default.createElement(Main, null), document.getElementById("app"));
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	/*!
	 * react-lite.js v0.15.17
	 * (c) 2016 Jade Gu
	 * Released under the MIT License.
	 */
	'use strict';

	var HTML_KEY = 'dangerouslySetInnerHTML';
	var SVGNamespaceURI = 'http://www.w3.org/2000/svg';
	var COMPONENT_ID = 'liteid';
	var VELEMENT = 2;
	var VSTATELESS = 3;
	var VCOMPONENT = 4;
	var VCOMMENT = 5;

	/**
	 * current stateful component's refs property
	 * will attach to every vnode created by calling component.render method
	 */
	var refs = null;

	function createVnode(vtype, type, props, key, ref) {
	    var vnode = {
	        vtype: vtype,
	        type: type,
	        props: props,
	        refs: refs,
	        key: key,
	        ref: ref
	    };
	    if (vtype === VSTATELESS || vtype === VCOMPONENT) {
	        vnode.uid = getUid();
	    }
	    return vnode;
	}

	function initVnode(vnode, parentContext, namespaceURI) {
	    var vtype = vnode.vtype;

	    var node = null;
	    if (!vtype) {
	        // init text
	        node = document.createTextNode(vnode);
	    } else if (vtype === VELEMENT) {
	        // init element
	        node = initVelem(vnode, parentContext, namespaceURI);
	    } else if (vtype === VCOMPONENT) {
	        // init stateful component
	        node = initVcomponent(vnode, parentContext, namespaceURI);
	    } else if (vtype === VSTATELESS) {
	        // init stateless component
	        node = initVstateless(vnode, parentContext, namespaceURI);
	    } else if (vtype === VCOMMENT) {
	        // init comment
	        node = document.createComment('react-text: ' + (vnode.uid || getUid()));
	    }
	    return node;
	}

	function updateVnode(vnode, newVnode, node, parentContext) {
	    var vtype = vnode.vtype;

	    if (vtype === VCOMPONENT) {
	        return updateVcomponent(vnode, newVnode, node, parentContext);
	    }

	    if (vtype === VSTATELESS) {
	        return updateVstateless(vnode, newVnode, node, parentContext);
	    }

	    // ignore VCOMMENT and other vtypes
	    if (vtype !== VELEMENT) {
	        return node;
	    }

	    var oldHtml = vnode.props[HTML_KEY] && vnode.props[HTML_KEY].__html;
	    if (oldHtml != null) {
	        updateVelem(vnode, newVnode, node, parentContext);
	        initVchildren(newVnode, node, parentContext);
	    } else {
	        updateVChildren(vnode, newVnode, node, parentContext);
	        updateVelem(vnode, newVnode, node, parentContext);
	    }
	    return node;
	}

	function updateVChildren(vnode, newVnode, node, parentContext) {
	    var patches = {
	        removes: [],
	        updates: [],
	        creates: []
	    };
	    diffVchildren(patches, vnode, newVnode, node, parentContext);
	    flatEach(patches.removes, applyDestroy);
	    flatEach(patches.updates, applyUpdate);
	    flatEach(patches.creates, applyCreate);
	}

	function applyUpdate(data) {
	    if (!data) {
	        return;
	    }
	    var vnode = data.vnode;
	    var newNode = data.node;

	    // update
	    if (!data.shouldIgnore) {
	        if (!vnode.vtype) {
	            newNode.replaceData(0, newNode.length, data.newVnode);
	            // newNode.nodeValue = data.newVnode
	        } else if (vnode.vtype === VELEMENT) {
	                updateVelem(vnode, data.newVnode, newNode, data.parentContext);
	            } else if (vnode.vtype === VSTATELESS) {
	                newNode = updateVstateless(vnode, data.newVnode, newNode, data.parentContext);
	            } else if (vnode.vtype === VCOMPONENT) {
	                newNode = updateVcomponent(vnode, data.newVnode, newNode, data.parentContext);
	            }
	    }

	    // re-order
	    var currentNode = newNode.parentNode.childNodes[data.index];
	    if (currentNode !== newNode) {
	        newNode.parentNode.insertBefore(newNode, currentNode);
	    }
	    return newNode;
	}

	function applyDestroy(data) {
	    destroyVnode(data.vnode, data.node);
	    data.node.parentNode.removeChild(data.node);
	}

	function applyCreate(data) {
	    var node = initVnode(data.vnode, data.parentContext, data.parentNode.namespaceURI);
	    data.parentNode.insertBefore(node, data.parentNode.childNodes[data.index]);
	}

	/**
	 * Only vnode which has props.children need to call destroy function
	 * to check whether subTree has component that need to call lify-cycle method and release cache.
	 */

	function destroyVnode(vnode, node) {
	    var vtype = vnode.vtype;

	    if (vtype === VELEMENT) {
	        // destroy element
	        destroyVelem(vnode, node);
	    } else if (vtype === VCOMPONENT) {
	        // destroy state component
	        destroyVcomponent(vnode, node);
	    } else if (vtype === VSTATELESS) {
	        // destroy stateless component
	        destroyVstateless(vnode, node);
	    }
	}

	function initVelem(velem, parentContext, namespaceURI) {
	    var type = velem.type;
	    var props = velem.props;

	    var node = null;

	    if (type === 'svg' || namespaceURI === SVGNamespaceURI) {
	        node = document.createElementNS(SVGNamespaceURI, type);
	        namespaceURI = SVGNamespaceURI;
	    } else {
	        node = document.createElement(type);
	    }

	    initVchildren(velem, node, parentContext);

	    var isCustomComponent = type.indexOf('-') >= 0 || props.is != null;
	    setProps(node, props, isCustomComponent);

	    attachRef(velem.refs, velem.ref, node);

	    return node;
	}

	function initVchildren(velem, node, parentContext) {
	    var vchildren = node.vchildren = getFlattenChildren(velem);
	    var namespaceURI = node.namespaceURI;
	    for (var i = 0, len = vchildren.length; i < len; i++) {
	        node.appendChild(initVnode(vchildren[i], parentContext, namespaceURI));
	    }
	}

	function getFlattenChildren(vnode) {
	    var children = vnode.props.children;

	    var vchildren = [];
	    if (isArr(children)) {
	        flatEach(children, collectChild, vchildren);
	    } else {
	        collectChild(children, vchildren);
	    }
	    return vchildren;
	}

	function collectChild(child, children) {
	    if (child != null && typeof child !== 'boolean') {
	        if (!child.vtype) {
	            // convert immutablejs data
	            if (child.toJS) {
	                child = child.toJS();
	                if (isArr(child)) {
	                    flatEach(child, collectChild, children);
	                } else {
	                    collectChild(child, children);
	                }
	                return;
	            }
	            child = '' + child;
	        }
	        children[children.length] = child;
	    }
	}

	function diffVchildren(patches, vnode, newVnode, node, parentContext) {
	    var childNodes = node.childNodes;
	    var vchildren = node.vchildren;

	    var newVchildren = node.vchildren = getFlattenChildren(newVnode);
	    var vchildrenLen = vchildren.length;
	    var newVchildrenLen = newVchildren.length;

	    if (vchildrenLen === 0) {
	        if (newVchildrenLen > 0) {
	            for (var i = 0; i < newVchildrenLen; i++) {
	                addItem(patches.creates, {
	                    vnode: newVchildren[i],
	                    parentNode: node,
	                    parentContext: parentContext,
	                    index: i
	                });
	            }
	        }
	        return;
	    } else if (newVchildrenLen === 0) {
	        for (var i = 0; i < vchildrenLen; i++) {
	            addItem(patches.removes, {
	                vnode: vchildren[i],
	                node: childNodes[i]
	            });
	        }
	        return;
	    }

	    var updates = Array(newVchildrenLen);
	    var removes = null;
	    var creates = null;

	    // isEqual
	    for (var i = 0; i < vchildrenLen; i++) {
	        var _vnode = vchildren[i];
	        for (var j = 0; j < newVchildrenLen; j++) {
	            if (updates[j]) {
	                continue;
	            }
	            var _newVnode = newVchildren[j];
	            if (_vnode === _newVnode) {
	                var shouldIgnore = true;
	                if (parentContext) {
	                    if (_vnode.vtype === VCOMPONENT || _vnode.vtype === VSTATELESS) {
	                        if (_vnode.type.contextTypes) {
	                            shouldIgnore = false;
	                        }
	                    }
	                }
	                updates[j] = {
	                    shouldIgnore: shouldIgnore,
	                    vnode: _vnode,
	                    newVnode: _newVnode,
	                    node: childNodes[i],
	                    parentContext: parentContext,
	                    index: j
	                };
	                vchildren[i] = null;
	                break;
	            }
	        }
	    }

	    // isSimilar
	    for (var i = 0; i < vchildrenLen; i++) {
	        var _vnode2 = vchildren[i];
	        if (_vnode2 === null) {
	            continue;
	        }
	        var shouldRemove = true;
	        for (var j = 0; j < newVchildrenLen; j++) {
	            if (updates[j]) {
	                continue;
	            }
	            var _newVnode2 = newVchildren[j];
	            if (_newVnode2.type === _vnode2.type && _newVnode2.key === _vnode2.key && _newVnode2.refs === _vnode2.refs) {
	                updates[j] = {
	                    vnode: _vnode2,
	                    newVnode: _newVnode2,
	                    node: childNodes[i],
	                    parentContext: parentContext,
	                    index: j
	                };
	                shouldRemove = false;
	                break;
	            }
	        }
	        if (shouldRemove) {
	            if (!removes) {
	                removes = [];
	            }
	            addItem(removes, {
	                vnode: _vnode2,
	                node: childNodes[i]
	            });
	        }
	    }

	    for (var i = 0; i < newVchildrenLen; i++) {
	        var item = updates[i];
	        if (!item) {
	            if (!creates) {
	                creates = [];
	            }
	            addItem(creates, {
	                vnode: newVchildren[i],
	                parentNode: node,
	                parentContext: parentContext,
	                index: i
	            });
	        } else if (item.vnode.vtype === VELEMENT) {
	            diffVchildren(patches, item.vnode, item.newVnode, item.node, item.parentContext);
	        }
	    }

	    if (removes) {
	        addItem(patches.removes, removes);
	    }
	    if (creates) {
	        addItem(patches.creates, creates);
	    }
	    addItem(patches.updates, updates);
	}

	function updateVelem(velem, newVelem, node) {
	    var isCustomComponent = velem.type.indexOf('-') >= 0 || velem.props.is != null;
	    patchProps(node, velem.props, newVelem.props, isCustomComponent);
	    if (velem.ref !== newVelem.ref) {
	        detachRef(velem.refs, velem.ref);
	        attachRef(newVelem.refs, newVelem.ref, node);
	    }
	    return node;
	}

	function destroyVelem(velem, node) {
	    var props = velem.props;
	    var vchildren = node.vchildren;
	    var childNodes = node.childNodes;

	    for (var i = 0, len = vchildren.length; i < len; i++) {
	        destroyVnode(vchildren[i], childNodes[i]);
	    }
	    detachRef(velem.refs, velem.ref);
	    node.eventStore = node.vchildren = null;
	}

	function initVstateless(vstateless, parentContext, namespaceURI) {
	    var vnode = renderVstateless(vstateless, parentContext);
	    var node = initVnode(vnode, parentContext, namespaceURI);
	    node.cache = node.cache || {};
	    node.cache[vstateless.uid] = vnode;
	    return node;
	}

	function updateVstateless(vstateless, newVstateless, node, parentContext) {
	    var uid = vstateless.uid;
	    var vnode = node.cache[uid];
	    delete node.cache[uid];
	    var newVnode = renderVstateless(newVstateless, parentContext);
	    var newNode = compareTwoVnodes(vnode, newVnode, node, parentContext);
	    newNode.cache = newNode.cache || {};
	    newNode.cache[newVstateless.uid] = newVnode;
	    if (newNode !== node) {
	        syncCache(newNode.cache, node.cache, newNode);
	    }
	    return newNode;
	}

	function destroyVstateless(vstateless, node) {
	    var uid = vstateless.uid;
	    var vnode = node.cache[uid];
	    delete node.cache[uid];
	    destroyVnode(vnode, node);
	}

	function renderVstateless(vstateless, parentContext) {
	    var factory = vstateless.type;
	    var props = vstateless.props;

	    var componentContext = getContextByTypes(parentContext, factory.contextTypes);
	    var vnode = factory(props, componentContext);
	    if (vnode && vnode.render) {
	        vnode = vnode.render();
	    }
	    if (vnode === null || vnode === false) {
	        vnode = createVnode(VCOMMENT);
	    } else if (!vnode || !vnode.vtype) {
	        throw new Error('@' + factory.name + '#render:You may have returned undefined, an array or some other invalid object');
	    }
	    return vnode;
	}

	function initVcomponent(vcomponent, parentContext, namespaceURI) {
	    var Component = vcomponent.type;
	    var props = vcomponent.props;
	    var uid = vcomponent.uid;

	    var componentContext = getContextByTypes(parentContext, Component.contextTypes);
	    var component = new Component(props, componentContext);
	    var updater = component.$updater;
	    var cache = component.$cache;

	    cache.parentContext = parentContext;
	    updater.isPending = true;
	    component.props = component.props || props;
	    component.context = component.context || componentContext;
	    if (component.componentWillMount) {
	        component.componentWillMount();
	        component.state = updater.getState();
	    }
	    var vnode = renderComponent(component);
	    var node = initVnode(vnode, getChildContext(component, parentContext), namespaceURI);
	    node.cache = node.cache || {};
	    node.cache[uid] = component;
	    cache.vnode = vnode;
	    cache.node = node;
	    cache.isMounted = true;
	    addItem(pendingComponents, component);
	    attachRef(vcomponent.refs, vcomponent.ref, component);
	    return node;
	}

	function updateVcomponent(vcomponent, newVcomponent, node, parentContext) {
	    var uid = vcomponent.uid;
	    var component = node.cache[uid];
	    var updater = component.$updater;
	    var cache = component.$cache;
	    var Component = newVcomponent.type;
	    var nextProps = newVcomponent.props;

	    var componentContext = getContextByTypes(parentContext, Component.contextTypes);
	    delete node.cache[uid];
	    node.cache[newVcomponent.uid] = component;
	    cache.parentContext = parentContext;
	    if (component.componentWillReceiveProps) {
	        updater.isPending = true;
	        component.componentWillReceiveProps(nextProps, componentContext);
	        updater.isPending = false;
	    }
	    updater.emitUpdate(nextProps, componentContext);

	    if (vcomponent.ref !== newVcomponent.ref) {
	        detachRef(vcomponent.refs, vcomponent.ref);
	        attachRef(newVcomponent.refs, newVcomponent.ref, component);
	    }
	    return cache.node;
	}

	function destroyVcomponent(vcomponent, node) {
	    var uid = vcomponent.uid;
	    var component = node.cache[uid];
	    var cache = component.$cache;
	    delete node.cache[uid];
	    detachRef(vcomponent.refs, vcomponent.ref);
	    component.setState = component.forceUpdate = noop;
	    if (component.componentWillUnmount) {
	        component.componentWillUnmount();
	    }
	    destroyVnode(cache.vnode, node);
	    delete component.setState;
	    cache.isMounted = false;
	    cache.node = cache.parentContext = cache.vnode = component.refs = component.context = null;
	}

	function getContextByTypes(curContext, contextTypes) {
	    var context = {};
	    if (!contextTypes || !curContext) {
	        return context;
	    }
	    for (var key in contextTypes) {
	        if (contextTypes.hasOwnProperty(key)) {
	            context[key] = curContext[key];
	        }
	    }
	    return context;
	}

	function renderComponent(component, parentContext) {
	    refs = component.refs;
	    var vnode = component.render();
	    if (vnode === null || vnode === false) {
	        vnode = createVnode(VCOMMENT);
	    } else if (!vnode || !vnode.vtype) {
	        throw new Error('@' + component.constructor.name + '#render:You may have returned undefined, an array or some other invalid object');
	    }
	    refs = null;
	    return vnode;
	}

	function getChildContext(component, parentContext) {
	    if (component.getChildContext) {
	        var curContext = component.getChildContext();
	        if (curContext) {
	            parentContext = extend(extend({}, parentContext), curContext);
	        }
	    }
	    return parentContext;
	}

	var pendingComponents = [];

	function clearPendingComponents() {
	    var len = pendingComponents.length;
	    if (!len) {
	        return;
	    }
	    var components = pendingComponents;
	    pendingComponents = [];
	    var i = -1;
	    while (len--) {
	        var component = components[++i];
	        var updater = component.$updater;
	        if (component.componentDidMount) {
	            component.componentDidMount();
	        }
	        updater.isPending = false;
	        updater.emitUpdate();
	    }
	}

	function compareTwoVnodes(vnode, newVnode, node, parentContext) {
	    var newNode = node;
	    if (newVnode == null) {
	        // remove
	        destroyVnode(vnode, node);
	        node.parentNode.removeChild(node);
	    } else if (vnode.type !== newVnode.type || vnode.key !== newVnode.key) {
	        // replace
	        destroyVnode(vnode, node);
	        newNode = initVnode(newVnode, parentContext, node.namespaceURI);
	        node.parentNode.replaceChild(newNode, node);
	    } else if (vnode !== newVnode || parentContext) {
	        // same type and same key -> update
	        newNode = updateVnode(vnode, newVnode, node, parentContext);
	    }
	    return newNode;
	}

	function getDOMNode() {
	    return this;
	}

	function attachRef(refs, refKey, refValue) {
	    if (!refs || refKey == null || !refValue) {
	        return;
	    }
	    if (refValue.nodeName && !refValue.getDOMNode) {
	        // support react v0.13 style: this.refs.myInput.getDOMNode()
	        refValue.getDOMNode = getDOMNode;
	    }
	    if (isFn(refKey)) {
	        refKey(refValue);
	    } else {
	        refs[refKey] = refValue;
	    }
	}

	function detachRef(refs, refKey) {
	    if (!refs || refKey == null) {
	        return;
	    }
	    if (isFn(refKey)) {
	        refKey(null);
	    } else {
	        delete refs[refKey];
	    }
	}

	function syncCache(cache, oldCache, node) {
	    for (var key in oldCache) {
	        if (!oldCache.hasOwnProperty(key)) {
	            continue;
	        }
	        var value = oldCache[key];
	        cache[key] = value;
	        // is component, update component.$cache.node
	        if (value.forceUpdate) {
	            value.$cache.node = node;
	        }
	    }
	}

	var updateQueue = {
		updaters: [],
		isPending: false,
		add: function add(updater) {
			addItem(this.updaters, updater);
		},
		batchUpdate: function batchUpdate() {
			if (this.isPending) {
				return;
			}
			this.isPending = true;
			/*
	   each updater.update may add new updater to updateQueue
	   clear them with a loop
	   event bubbles from bottom-level to top-level
	   reverse the updater order can merge some props and state and reduce the refresh times
	   see Updater.update method below to know why
	  */
			var updaters = this.updaters;

			var updater = undefined;
			while (updater = updaters.pop()) {
				updater.updateComponent();
			}
			this.isPending = false;
		}
	};

	function Updater(instance) {
		this.instance = instance;
		this.pendingStates = [];
		this.pendingCallbacks = [];
		this.isPending = false;
		this.nextProps = this.nextContext = null;
		this.clearCallbacks = this.clearCallbacks.bind(this);
	}

	Updater.prototype = {
		emitUpdate: function emitUpdate(nextProps, nextContext) {
			this.nextProps = nextProps;
			this.nextContext = nextContext;
			// receive nextProps!! should update immediately
			nextProps || !updateQueue.isPending ? this.updateComponent() : updateQueue.add(this);
		},
		updateComponent: function updateComponent() {
			var instance = this.instance;
			var pendingStates = this.pendingStates;
			var nextProps = this.nextProps;
			var nextContext = this.nextContext;

			if (nextProps || pendingStates.length > 0) {
				nextProps = nextProps || instance.props;
				nextContext = nextContext || instance.context;
				this.nextProps = this.nextContext = null;
				// merge the nextProps and nextState and update by one time
				shouldUpdate(instance, nextProps, this.getState(), nextContext, this.clearCallbacks);
			}
		},
		addState: function addState(nextState) {
			if (nextState) {
				addItem(this.pendingStates, nextState);
				if (!this.isPending) {
					this.emitUpdate();
				}
			}
		},
		replaceState: function replaceState(nextState) {
			var pendingStates = this.pendingStates;

			pendingStates.pop();
			// push special params to point out should replace state
			addItem(pendingStates, [nextState]);
		},
		getState: function getState() {
			var instance = this.instance;
			var pendingStates = this.pendingStates;
			var state = instance.state;
			var props = instance.props;

			if (pendingStates.length) {
				state = extend({}, state);
				pendingStates.forEach(function (nextState) {
					// replace state
					if (isArr(nextState)) {
						state = extend({}, nextState[0]);
						return;
					}
					if (isFn(nextState)) {
						nextState = nextState.call(instance, state, props);
					}
					extend(state, nextState);
				});
				pendingStates.length = 0;
			}
			return state;
		},
		clearCallbacks: function clearCallbacks() {
			var pendingCallbacks = this.pendingCallbacks;
			var instance = this.instance;

			if (pendingCallbacks.length > 0) {
				this.pendingCallbacks = [];
				pendingCallbacks.forEach(function (callback) {
					return callback.call(instance);
				});
			}
		},
		addCallback: function addCallback(callback) {
			if (isFn(callback)) {
				addItem(this.pendingCallbacks, callback);
			}
		}
	};
	function Component(props, context) {
		this.$updater = new Updater(this);
		this.$cache = { isMounted: false };
		this.props = props;
		this.state = {};
		this.refs = {};
		this.context = context;
	}

	Component.prototype = {
		constructor: Component,
		// getChildContext: _.noop,
		// componentWillUpdate: _.noop,
		// componentDidUpdate: _.noop,
		// componentWillReceiveProps: _.noop,
		// componentWillMount: _.noop,
		// componentDidMount: _.noop,
		// componentWillUnmount: _.noop,
		// shouldComponentUpdate(nextProps, nextState) {
		// 	return true
		// },
		forceUpdate: function forceUpdate(callback) {
			var $updater = this.$updater;
			var $cache = this.$cache;
			var props = this.props;
			var state = this.state;
			var context = this.context;

			if ($updater.isPending || !$cache.isMounted) {
				return;
			}
			var nextProps = $cache.props || props;
			var nextState = $cache.state || state;
			var nextContext = $cache.context || context;
			var parentContext = $cache.parentContext;
			var node = $cache.node;
			var vnode = $cache.vnode;
			$cache.props = $cache.state = $cache.context = null;
			$updater.isPending = true;
			if (this.componentWillUpdate) {
				this.componentWillUpdate(nextProps, nextState, nextContext);
			}
			this.state = nextState;
			this.props = nextProps;
			this.context = nextContext;
			var newVnode = renderComponent(this);
			var newNode = compareTwoVnodes(vnode, newVnode, node, getChildContext(this, parentContext));
			if (newNode !== node) {
				newNode.cache = newNode.cache || {};
				syncCache(newNode.cache, node.cache, newNode);
			}
			$cache.vnode = newVnode;
			$cache.node = newNode;
			clearPendingComponents();
			if (this.componentDidUpdate) {
				this.componentDidUpdate(props, state, context);
			}
			if (callback) {
				callback.call(this);
			}
			$updater.isPending = false;
			$updater.emitUpdate();
		},
		setState: function setState(nextState, callback) {
			var $updater = this.$updater;

			$updater.addCallback(callback);
			$updater.addState(nextState);
		},
		replaceState: function replaceState(nextState, callback) {
			var $updater = this.$updater;

			$updater.addCallback(callback);
			$updater.replaceState(nextState);
		},
		getDOMNode: function getDOMNode() {
			var node = this.$cache.node;
			return node && node.nodeName === '#comment' ? null : node;
		},
		isMounted: function isMounted() {
			return this.$cache.isMounted;
		}
	};

	function shouldUpdate(component, nextProps, nextState, nextContext, callback) {
		var shouldComponentUpdate = true;
		if (component.shouldComponentUpdate) {
			shouldComponentUpdate = component.shouldComponentUpdate(nextProps, nextState, nextContext);
		}
		if (shouldComponentUpdate === false) {
			component.props = nextProps;
			component.state = nextState;
			component.context = nextContext || {};
			return;
		}
		var cache = component.$cache;
		cache.props = nextProps;
		cache.state = nextState;
		cache.context = nextContext || {};
		component.forceUpdate(callback);
	}

	// event config
	var notBubbleEvents = {
		onmouseleave: 1,
		onmouseenter: 1,
		onload: 1,
		onunload: 1,
		onscroll: 1,
		onfocus: 1,
		onblur: 1,
		onrowexit: 1,
		onbeforeunload: 1,
		onstop: 1,
		ondragdrop: 1,
		ondragenter: 1,
		ondragexit: 1,
		ondraggesture: 1,
		ondragover: 1,
		oncontextmenu: 1
	};

	function getEventName(key) {
		key = key === 'onDoubleClick' ? 'ondblclick' : key;
		return key.toLowerCase();
	}

	// Mobile Safari does not fire properly bubble click events on
	// non-interactive elements, which means delegated click listeners do not
	// fire. The workaround for this bug involves attaching an empty click
	// listener on the target node.
	var inMobile = ('ontouchstart' in document);
	var emptyFunction = function emptyFunction() {};
	var ON_CLICK_KEY = 'onclick';

	var eventTypes = {};

	function addEvent(elem, eventType, listener) {
		eventType = getEventName(eventType);

		if (notBubbleEvents[eventType] === 1) {
			elem[eventType] = listener;
			return;
		}

		var eventStore = elem.eventStore || (elem.eventStore = {});
		eventStore[eventType] = listener;

		if (!eventTypes[eventType]) {
			// onclick -> click
			document.addEventListener(eventType.substr(2), dispatchEvent, false);
			eventTypes[eventType] = true;
		}

		if (inMobile && eventType === ON_CLICK_KEY) {
			elem.addEventListener('click', emptyFunction, false);
		}

		var nodeName = elem.nodeName;

		if (eventType === 'onchange' && (nodeName === 'INPUT' || nodeName === 'TEXTAREA')) {
			addEvent(elem, 'oninput', listener);
		}
	}

	function removeEvent(elem, eventType) {
		eventType = getEventName(eventType);
		if (notBubbleEvents[eventType] === 1) {
			elem[eventType] = null;
			return;
		}

		var eventStore = elem.eventStore || (elem.eventStore = {});
		delete eventStore[eventType];

		if (inMobile && eventType === ON_CLICK_KEY) {
			elem.removeEventListener('click', emptyFunction, false);
		}

		var nodeName = elem.nodeName;

		if (eventType === 'onchange' && (nodeName === 'INPUT' || nodeName === 'TEXTAREA')) {
			delete eventStore['oninput'];
		}
	}

	function dispatchEvent(event) {
		var target = event.target;
		var type = event.type;

		var eventType = 'on' + type;
		var syntheticEvent = undefined;

		updateQueue.isPending = true;
		while (target) {
			var _target = target;
			var eventStore = _target.eventStore;

			var listener = eventStore && eventStore[eventType];
			if (!listener) {
				target = target.parentNode;
				continue;
			}
			if (!syntheticEvent) {
				syntheticEvent = createSyntheticEvent(event);
			}
			syntheticEvent.currentTarget = target;
			listener.call(target, syntheticEvent);
			if (syntheticEvent.$cancalBubble) {
				break;
			}
			target = target.parentNode;
		}
		updateQueue.isPending = false;
		updateQueue.batchUpdate();
	}

	function createSyntheticEvent(nativeEvent) {
		var syntheticEvent = {};
		var cancalBubble = function cancalBubble() {
			return syntheticEvent.$cancalBubble = true;
		};
		syntheticEvent.nativeEvent = nativeEvent;
		syntheticEvent.persist = noop;
		for (var key in nativeEvent) {
			if (typeof nativeEvent[key] !== 'function') {
				syntheticEvent[key] = nativeEvent[key];
			} else if (key === 'stopPropagation' || key === 'stopImmediatePropagation') {
				syntheticEvent[key] = cancalBubble;
			} else {
				syntheticEvent[key] = nativeEvent[key].bind(nativeEvent);
			}
		}
		return syntheticEvent;
	}

	function setStyle(elemStyle, styles) {
	    for (var styleName in styles) {
	        if (styles.hasOwnProperty(styleName)) {
	            setStyleValue(elemStyle, styleName, styles[styleName]);
	        }
	    }
	}

	function removeStyle(elemStyle, styles) {
	    for (var styleName in styles) {
	        if (styles.hasOwnProperty(styleName)) {
	            elemStyle[styleName] = '';
	        }
	    }
	}

	function patchStyle(elemStyle, style, newStyle) {
	    if (style === newStyle) {
	        return;
	    }
	    if (!newStyle && style) {
	        removeStyle(elemStyle, style);
	        return;
	    } else if (newStyle && !style) {
	        setStyle(elemStyle, newStyle);
	        return;
	    }

	    for (var key in style) {
	        if (newStyle.hasOwnProperty(key)) {
	            if (newStyle[key] !== style[key]) {
	                setStyleValue(elemStyle, key, newStyle[key]);
	            }
	        } else {
	            elemStyle[key] = '';
	        }
	    }
	    for (var key in newStyle) {
	        if (!style.hasOwnProperty(key)) {
	            setStyleValue(elemStyle, key, newStyle[key]);
	        }
	    }
	}

	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */
	var isUnitlessNumber = {
	    animationIterationCount: 1,
	    borderImageOutset: 1,
	    borderImageSlice: 1,
	    borderImageWidth: 1,
	    boxFlex: 1,
	    boxFlexGroup: 1,
	    boxOrdinalGroup: 1,
	    columnCount: 1,
	    flex: 1,
	    flexGrow: 1,
	    flexPositive: 1,
	    flexShrink: 1,
	    flexNegative: 1,
	    flexOrder: 1,
	    gridRow: 1,
	    gridColumn: 1,
	    fontWeight: 1,
	    lineClamp: 1,
	    lineHeight: 1,
	    opacity: 1,
	    order: 1,
	    orphans: 1,
	    tabSize: 1,
	    widows: 1,
	    zIndex: 1,
	    zoom: 1,

	    // SVG-related properties
	    fillOpacity: 1,
	    floodOpacity: 1,
	    stopOpacity: 1,
	    strokeDasharray: 1,
	    strokeDashoffset: 1,
	    strokeMiterlimit: 1,
	    strokeOpacity: 1,
	    strokeWidth: 1
	};

	function prefixKey(prefix, key) {
	    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}

	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

	Object.keys(isUnitlessNumber).forEach(function (prop) {
	    prefixes.forEach(function (prefix) {
	        isUnitlessNumber[prefixKey(prefix, prop)] = 1;
	    });
	});

	var RE_NUMBER = /^-?\d+(\.\d+)?$/;
	function setStyleValue(elemStyle, styleName, styleValue) {

	    if (!isUnitlessNumber[styleName] && RE_NUMBER.test(styleValue)) {
	        elemStyle[styleName] = styleValue + 'px';
	        return;
	    }

	    if (styleName === 'float') {
	        styleName = 'cssFloat';
	    }

	    if (styleValue == null || typeof styleValue === 'boolean') {
	        styleValue = '';
	    }

	    elemStyle[styleName] = styleValue;
	}

	var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
	var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\uB7\\u0300-\\u036F\\u203F-\\u2040';

	var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');

	var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));
	// will merge some data in properties below
	var properties = {};

	/**
	 * Mapping from normalized, camelcased property names to a configuration that
	 * specifies how the associated DOM property should be accessed or rendered.
	 */
	var MUST_USE_PROPERTY = 0x1;
	var HAS_BOOLEAN_VALUE = 0x4;
	var HAS_NUMERIC_VALUE = 0x8;
	var HAS_POSITIVE_NUMERIC_VALUE = 0x10 | 0x8;
	var HAS_OVERLOADED_BOOLEAN_VALUE = 0x20;

	// html config
	var HTMLDOMPropertyConfig = {
	    props: {
	        /**
	         * Standard Properties
	         */
	        accept: 0,
	        acceptCharset: 0,
	        accessKey: 0,
	        action: 0,
	        allowFullScreen: HAS_BOOLEAN_VALUE,
	        allowTransparency: 0,
	        alt: 0,
	        async: HAS_BOOLEAN_VALUE,
	        autoComplete: 0,
	        autoFocus: HAS_BOOLEAN_VALUE,
	        autoPlay: HAS_BOOLEAN_VALUE,
	        capture: HAS_BOOLEAN_VALUE,
	        cellPadding: 0,
	        cellSpacing: 0,
	        charSet: 0,
	        challenge: 0,
	        checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	        cite: 0,
	        classID: 0,
	        className: 0,
	        cols: HAS_POSITIVE_NUMERIC_VALUE,
	        colSpan: 0,
	        content: 0,
	        contentEditable: 0,
	        contextMenu: 0,
	        controls: HAS_BOOLEAN_VALUE,
	        coords: 0,
	        crossOrigin: 0,
	        data: 0, // For `<object />` acts as `src`.
	        dateTime: 0,
	        'default': HAS_BOOLEAN_VALUE,
	        // not in regular react, they did it in other way
	        defaultValue: MUST_USE_PROPERTY,
	        // not in regular react, they did it in other way
	        defaultChecked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	        defer: HAS_BOOLEAN_VALUE,
	        dir: 0,
	        disabled: HAS_BOOLEAN_VALUE,
	        download: HAS_OVERLOADED_BOOLEAN_VALUE,
	        draggable: 0,
	        encType: 0,
	        form: 0,
	        formAction: 0,
	        formEncType: 0,
	        formMethod: 0,
	        formNoValidate: HAS_BOOLEAN_VALUE,
	        formTarget: 0,
	        frameBorder: 0,
	        headers: 0,
	        height: 0,
	        hidden: HAS_BOOLEAN_VALUE,
	        high: 0,
	        href: 0,
	        hrefLang: 0,
	        htmlFor: 0,
	        httpEquiv: 0,
	        icon: 0,
	        id: 0,
	        inputMode: 0,
	        integrity: 0,
	        is: 0,
	        keyParams: 0,
	        keyType: 0,
	        kind: 0,
	        label: 0,
	        lang: 0,
	        list: 0,
	        loop: HAS_BOOLEAN_VALUE,
	        low: 0,
	        manifest: 0,
	        marginHeight: 0,
	        marginWidth: 0,
	        max: 0,
	        maxLength: 0,
	        media: 0,
	        mediaGroup: 0,
	        method: 0,
	        min: 0,
	        minLength: 0,
	        // Caution; `option.selected` is not updated if `select.multiple` is
	        // disabled with `removeAttribute`.
	        multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	        muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	        name: 0,
	        nonce: 0,
	        noValidate: HAS_BOOLEAN_VALUE,
	        open: HAS_BOOLEAN_VALUE,
	        optimum: 0,
	        pattern: 0,
	        placeholder: 0,
	        poster: 0,
	        preload: 0,
	        profile: 0,
	        radioGroup: 0,
	        readOnly: HAS_BOOLEAN_VALUE,
	        referrerPolicy: 0,
	        rel: 0,
	        required: HAS_BOOLEAN_VALUE,
	        reversed: HAS_BOOLEAN_VALUE,
	        role: 0,
	        rows: HAS_POSITIVE_NUMERIC_VALUE,
	        rowSpan: HAS_NUMERIC_VALUE,
	        sandbox: 0,
	        scope: 0,
	        scoped: HAS_BOOLEAN_VALUE,
	        scrolling: 0,
	        seamless: HAS_BOOLEAN_VALUE,
	        selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	        shape: 0,
	        size: HAS_POSITIVE_NUMERIC_VALUE,
	        sizes: 0,
	        span: HAS_POSITIVE_NUMERIC_VALUE,
	        spellCheck: 0,
	        src: 0,
	        srcDoc: 0,
	        srcLang: 0,
	        srcSet: 0,
	        start: HAS_NUMERIC_VALUE,
	        step: 0,
	        style: 0,
	        summary: 0,
	        tabIndex: 0,
	        target: 0,
	        title: 0,
	        // Setting .type throws on non-<input> tags
	        type: 0,
	        useMap: 0,
	        value: MUST_USE_PROPERTY,
	        width: 0,
	        wmode: 0,
	        wrap: 0,

	        /**
	         * RDFa Properties
	         */
	        about: 0,
	        datatype: 0,
	        inlist: 0,
	        prefix: 0,
	        // property is also supported for OpenGraph in meta tags.
	        property: 0,
	        resource: 0,
	        'typeof': 0,
	        vocab: 0,

	        /**
	         * Non-standard Properties
	         */
	        // autoCapitalize and autoCorrect are supported in Mobile Safari for
	        // keyboard hints.
	        autoCapitalize: 0,
	        autoCorrect: 0,
	        // autoSave allows WebKit/Blink to persist values of input fields on page reloads
	        autoSave: 0,
	        // color is for Safari mask-icon link
	        color: 0,
	        // itemProp, itemScope, itemType are for
	        // Microdata support. See http://schema.org/docs/gs.html
	        itemProp: 0,
	        itemScope: HAS_BOOLEAN_VALUE,
	        itemType: 0,
	        // itemID and itemRef are for Microdata support as well but
	        // only specified in the WHATWG spec document. See
	        // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
	        itemID: 0,
	        itemRef: 0,
	        // results show looking glass icon and recent searches on input
	        // search fields in WebKit/Blink
	        results: 0,
	        // IE-only attribute that specifies security restrictions on an iframe
	        // as an alternative to the sandbox attribute on IE<10
	        security: 0,
	        // IE-only attribute that controls focus behavior
	        unselectable: 0
	    },
	    attrNS: {},
	    domAttrs: {
	        acceptCharset: 'accept-charset',
	        className: 'class',
	        htmlFor: 'for',
	        httpEquiv: 'http-equiv'
	    },
	    domProps: {}
	};

	// svg config
	var xlink = 'http://www.w3.org/1999/xlink';
	var xml = 'http://www.w3.org/XML/1998/namespace';

	// We use attributes for everything SVG so let's avoid some duplication and run
	// code instead.
	// The following are all specified in the HTML config already so we exclude here.
	// - class (as className)
	// - color
	// - height
	// - id
	// - lang
	// - max
	// - media
	// - method
	// - min
	// - name
	// - style
	// - target
	// - type
	// - width
	var ATTRS = {
	    accentHeight: 'accent-height',
	    accumulate: 0,
	    additive: 0,
	    alignmentBaseline: 'alignment-baseline',
	    allowReorder: 'allowReorder',
	    alphabetic: 0,
	    amplitude: 0,
	    arabicForm: 'arabic-form',
	    ascent: 0,
	    attributeName: 'attributeName',
	    attributeType: 'attributeType',
	    autoReverse: 'autoReverse',
	    azimuth: 0,
	    baseFrequency: 'baseFrequency',
	    baseProfile: 'baseProfile',
	    baselineShift: 'baseline-shift',
	    bbox: 0,
	    begin: 0,
	    bias: 0,
	    by: 0,
	    calcMode: 'calcMode',
	    capHeight: 'cap-height',
	    clip: 0,
	    clipPath: 'clip-path',
	    clipRule: 'clip-rule',
	    clipPathUnits: 'clipPathUnits',
	    colorInterpolation: 'color-interpolation',
	    colorInterpolationFilters: 'color-interpolation-filters',
	    colorProfile: 'color-profile',
	    colorRendering: 'color-rendering',
	    contentScriptType: 'contentScriptType',
	    contentStyleType: 'contentStyleType',
	    cursor: 0,
	    cx: 0,
	    cy: 0,
	    d: 0,
	    decelerate: 0,
	    descent: 0,
	    diffuseConstant: 'diffuseConstant',
	    direction: 0,
	    display: 0,
	    divisor: 0,
	    dominantBaseline: 'dominant-baseline',
	    dur: 0,
	    dx: 0,
	    dy: 0,
	    edgeMode: 'edgeMode',
	    elevation: 0,
	    enableBackground: 'enable-background',
	    end: 0,
	    exponent: 0,
	    externalResourcesRequired: 'externalResourcesRequired',
	    fill: 0,
	    fillOpacity: 'fill-opacity',
	    fillRule: 'fill-rule',
	    filter: 0,
	    filterRes: 'filterRes',
	    filterUnits: 'filterUnits',
	    floodColor: 'flood-color',
	    floodOpacity: 'flood-opacity',
	    focusable: 0,
	    fontFamily: 'font-family',
	    fontSize: 'font-size',
	    fontSizeAdjust: 'font-size-adjust',
	    fontStretch: 'font-stretch',
	    fontStyle: 'font-style',
	    fontVariant: 'font-variant',
	    fontWeight: 'font-weight',
	    format: 0,
	    from: 0,
	    fx: 0,
	    fy: 0,
	    g1: 0,
	    g2: 0,
	    glyphName: 'glyph-name',
	    glyphOrientationHorizontal: 'glyph-orientation-horizontal',
	    glyphOrientationVertical: 'glyph-orientation-vertical',
	    glyphRef: 'glyphRef',
	    gradientTransform: 'gradientTransform',
	    gradientUnits: 'gradientUnits',
	    hanging: 0,
	    horizAdvX: 'horiz-adv-x',
	    horizOriginX: 'horiz-origin-x',
	    ideographic: 0,
	    imageRendering: 'image-rendering',
	    'in': 0,
	    in2: 0,
	    intercept: 0,
	    k: 0,
	    k1: 0,
	    k2: 0,
	    k3: 0,
	    k4: 0,
	    kernelMatrix: 'kernelMatrix',
	    kernelUnitLength: 'kernelUnitLength',
	    kerning: 0,
	    keyPoints: 'keyPoints',
	    keySplines: 'keySplines',
	    keyTimes: 'keyTimes',
	    lengthAdjust: 'lengthAdjust',
	    letterSpacing: 'letter-spacing',
	    lightingColor: 'lighting-color',
	    limitingConeAngle: 'limitingConeAngle',
	    local: 0,
	    markerEnd: 'marker-end',
	    markerMid: 'marker-mid',
	    markerStart: 'marker-start',
	    markerHeight: 'markerHeight',
	    markerUnits: 'markerUnits',
	    markerWidth: 'markerWidth',
	    mask: 0,
	    maskContentUnits: 'maskContentUnits',
	    maskUnits: 'maskUnits',
	    mathematical: 0,
	    mode: 0,
	    numOctaves: 'numOctaves',
	    offset: 0,
	    opacity: 0,
	    operator: 0,
	    order: 0,
	    orient: 0,
	    orientation: 0,
	    origin: 0,
	    overflow: 0,
	    overlinePosition: 'overline-position',
	    overlineThickness: 'overline-thickness',
	    paintOrder: 'paint-order',
	    panose1: 'panose-1',
	    pathLength: 'pathLength',
	    patternContentUnits: 'patternContentUnits',
	    patternTransform: 'patternTransform',
	    patternUnits: 'patternUnits',
	    pointerEvents: 'pointer-events',
	    points: 0,
	    pointsAtX: 'pointsAtX',
	    pointsAtY: 'pointsAtY',
	    pointsAtZ: 'pointsAtZ',
	    preserveAlpha: 'preserveAlpha',
	    preserveAspectRatio: 'preserveAspectRatio',
	    primitiveUnits: 'primitiveUnits',
	    r: 0,
	    radius: 0,
	    refX: 'refX',
	    refY: 'refY',
	    renderingIntent: 'rendering-intent',
	    repeatCount: 'repeatCount',
	    repeatDur: 'repeatDur',
	    requiredExtensions: 'requiredExtensions',
	    requiredFeatures: 'requiredFeatures',
	    restart: 0,
	    result: 0,
	    rotate: 0,
	    rx: 0,
	    ry: 0,
	    scale: 0,
	    seed: 0,
	    shapeRendering: 'shape-rendering',
	    slope: 0,
	    spacing: 0,
	    specularConstant: 'specularConstant',
	    specularExponent: 'specularExponent',
	    speed: 0,
	    spreadMethod: 'spreadMethod',
	    startOffset: 'startOffset',
	    stdDeviation: 'stdDeviation',
	    stemh: 0,
	    stemv: 0,
	    stitchTiles: 'stitchTiles',
	    stopColor: 'stop-color',
	    stopOpacity: 'stop-opacity',
	    strikethroughPosition: 'strikethrough-position',
	    strikethroughThickness: 'strikethrough-thickness',
	    string: 0,
	    stroke: 0,
	    strokeDasharray: 'stroke-dasharray',
	    strokeDashoffset: 'stroke-dashoffset',
	    strokeLinecap: 'stroke-linecap',
	    strokeLinejoin: 'stroke-linejoin',
	    strokeMiterlimit: 'stroke-miterlimit',
	    strokeOpacity: 'stroke-opacity',
	    strokeWidth: 'stroke-width',
	    surfaceScale: 'surfaceScale',
	    systemLanguage: 'systemLanguage',
	    tableValues: 'tableValues',
	    targetX: 'targetX',
	    targetY: 'targetY',
	    textAnchor: 'text-anchor',
	    textDecoration: 'text-decoration',
	    textRendering: 'text-rendering',
	    textLength: 'textLength',
	    to: 0,
	    transform: 0,
	    u1: 0,
	    u2: 0,
	    underlinePosition: 'underline-position',
	    underlineThickness: 'underline-thickness',
	    unicode: 0,
	    unicodeBidi: 'unicode-bidi',
	    unicodeRange: 'unicode-range',
	    unitsPerEm: 'units-per-em',
	    vAlphabetic: 'v-alphabetic',
	    vHanging: 'v-hanging',
	    vIdeographic: 'v-ideographic',
	    vMathematical: 'v-mathematical',
	    values: 0,
	    vectorEffect: 'vector-effect',
	    version: 0,
	    vertAdvY: 'vert-adv-y',
	    vertOriginX: 'vert-origin-x',
	    vertOriginY: 'vert-origin-y',
	    viewBox: 'viewBox',
	    viewTarget: 'viewTarget',
	    visibility: 0,
	    widths: 0,
	    wordSpacing: 'word-spacing',
	    writingMode: 'writing-mode',
	    x: 0,
	    xHeight: 'x-height',
	    x1: 0,
	    x2: 0,
	    xChannelSelector: 'xChannelSelector',
	    xlinkActuate: 'xlink:actuate',
	    xlinkArcrole: 'xlink:arcrole',
	    xlinkHref: 'xlink:href',
	    xlinkRole: 'xlink:role',
	    xlinkShow: 'xlink:show',
	    xlinkTitle: 'xlink:title',
	    xlinkType: 'xlink:type',
	    xmlBase: 'xml:base',
	    xmlns: 0,
	    xmlnsXlink: 'xmlns:xlink',
	    xmlLang: 'xml:lang',
	    xmlSpace: 'xml:space',
	    y: 0,
	    y1: 0,
	    y2: 0,
	    yChannelSelector: 'yChannelSelector',
	    z: 0,
	    zoomAndPan: 'zoomAndPan'
	};

	var SVGDOMPropertyConfig = {
	    props: {},
	    attrNS: {
	        xlinkActuate: xlink,
	        xlinkArcrole: xlink,
	        xlinkHref: xlink,
	        xlinkRole: xlink,
	        xlinkShow: xlink,
	        xlinkTitle: xlink,
	        xlinkType: xlink,
	        xmlBase: xml,
	        xmlLang: xml,
	        xmlSpace: xml
	    },
	    domAttrs: {},
	    domProps: {}
	};

	Object.keys(ATTRS).map(function (key) {
	    SVGDOMPropertyConfig.props[key] = 0;
	    if (ATTRS[key]) {
	        SVGDOMPropertyConfig.domAttrs[key] = ATTRS[key];
	    }
	});

	// merge html and svg config into properties
	mergeConfigToProperties(HTMLDOMPropertyConfig);
	mergeConfigToProperties(SVGDOMPropertyConfig);

	function mergeConfigToProperties(config) {
	    var
	    // all react/react-lite supporting property names in here
	    props = config.props;
	    var
	    // attributes namespace in here
	    attrNS = config.attrNS;
	    var
	    // propName in props which should use to be dom-attribute in here
	    domAttrs = config.domAttrs;
	    var
	    // propName in props which should use to be dom-property in here
	    domProps = config.domProps;

	    for (var propName in props) {
	        if (!props.hasOwnProperty(propName)) {
	            continue;
	        }
	        var propConfig = props[propName];
	        properties[propName] = {
	            attributeName: domAttrs.hasOwnProperty(propName) ? domAttrs[propName] : propName.toLowerCase(),
	            propertyName: domProps.hasOwnProperty(propName) ? domProps[propName] : propName,
	            attributeNamespace: attrNS.hasOwnProperty(propName) ? attrNS[propName] : null,
	            mustUseProperty: checkMask(propConfig, MUST_USE_PROPERTY),
	            hasBooleanValue: checkMask(propConfig, HAS_BOOLEAN_VALUE),
	            hasNumericValue: checkMask(propConfig, HAS_NUMERIC_VALUE),
	            hasPositiveNumericValue: checkMask(propConfig, HAS_POSITIVE_NUMERIC_VALUE),
	            hasOverloadedBooleanValue: checkMask(propConfig, HAS_OVERLOADED_BOOLEAN_VALUE)
	        };
	    }
	}

	function checkMask(value, bitmask) {
	    return (value & bitmask) === bitmask;
	}

	/**
	 * Sets the value for a property on a node.
	 *
	 * @param {DOMElement} node
	 * @param {string} name
	 * @param {*} value
	 */

	function setPropValue(node, name, value) {
	    var propInfo = properties.hasOwnProperty(name) && properties[name];
	    if (propInfo) {
	        // should delete value from dom
	        if (value == null || propInfo.hasBooleanValue && !value || propInfo.hasNumericValue && isNaN(value) || propInfo.hasPositiveNumericValue && value < 1 || propInfo.hasOverloadedBooleanValue && value === false) {
	            removePropValue(node, name);
	        } else if (propInfo.mustUseProperty) {
	            var propName = propInfo.propertyName;
	            // dom.value has side effect
	            if (propName !== 'value' || '' + node[propName] !== '' + value) {
	                node[propName] = value;
	            }
	        } else {
	            var attributeName = propInfo.attributeName;
	            var namespace = propInfo.attributeNamespace;

	            // `setAttribute` with objects becomes only `[object]` in IE8/9,
	            // ('' + value) makes it output the correct toString()-value.
	            if (namespace) {
	                node.setAttributeNS(namespace, attributeName, '' + value);
	            } else if (propInfo.hasBooleanValue || propInfo.hasOverloadedBooleanValue && value === true) {
	                node.setAttribute(attributeName, '');
	            } else {
	                node.setAttribute(attributeName, '' + value);
	            }
	        }
	    } else if (isCustomAttribute(name) && VALID_ATTRIBUTE_NAME_REGEX.test(name)) {
	        if (value == null) {
	            node.removeAttribute(name);
	        } else {
	            node.setAttribute(name, '' + value);
	        }
	    }
	}

	/**
	 * Deletes the value for a property on a node.
	 *
	 * @param {DOMElement} node
	 * @param {string} name
	 */

	function removePropValue(node, name) {
	    var propInfo = properties.hasOwnProperty(name) && properties[name];
	    if (propInfo) {
	        if (propInfo.mustUseProperty) {
	            var propName = propInfo.propertyName;
	            if (propInfo.hasBooleanValue) {
	                node[propName] = false;
	            } else {
	                // dom.value accept string value has side effect
	                if (propName !== 'value' || '' + node[propName] !== '') {
	                    node[propName] = '';
	                }
	            }
	        } else {
	            node.removeAttribute(propInfo.attributeName);
	        }
	    } else if (isCustomAttribute(name)) {
	        node.removeAttribute(name);
	    }
	}

	function isFn(obj) {
	    return typeof obj === 'function';
	}

	var isArr = Array.isArray;

	function noop() {}

	function identity(obj) {
	    return obj;
	}

	function pipe(fn1, fn2) {
	    return function () {
	        fn1.apply(this, arguments);
	        return fn2.apply(this, arguments);
	    };
	}

	function addItem(list, item) {
	    list[list.length] = item;
	}

	function flatEach(list, iteratee, a) {
	    var len = list.length;
	    var i = -1;

	    while (len--) {
	        var item = list[++i];
	        if (isArr(item)) {
	            flatEach(item, iteratee, a);
	        } else {
	            iteratee(item, a);
	        }
	    }
	}

	function extend(to, from) {
	    if (!from) {
	        return to;
	    }
	    var keys = Object.keys(from);
	    var i = keys.length;
	    while (i--) {
	        to[keys[i]] = from[keys[i]];
	    }
	    return to;
	}

	var uid = 0;

	function getUid() {
	    return ++uid;
	}

	var EVENT_KEYS = /^on/i;

	function setProp(elem, key, value, isCustomComponent) {
	    if (EVENT_KEYS.test(key)) {
	        addEvent(elem, key, value);
	    } else if (key === 'style') {
	        setStyle(elem.style, value);
	    } else if (key === HTML_KEY) {
	        if (value && value.__html != null) {
	            elem.innerHTML = value.__html;
	        }
	    } else if (isCustomComponent) {
	        if (value == null) {
	            elem.removeAttribute(key);
	        } else {
	            elem.setAttribute(key, '' + value);
	        }
	    } else {
	        setPropValue(elem, key, value);
	    }
	}

	function removeProp(elem, key, oldValue, isCustomComponent) {
	    if (EVENT_KEYS.test(key)) {
	        removeEvent(elem, key);
	    } else if (key === 'style') {
	        removeStyle(elem.style, oldValue);
	    } else if (key === HTML_KEY) {
	        elem.innerHTML = '';
	    } else if (isCustomComponent) {
	        elem.removeAttribute(key);
	    } else {
	        removePropValue(elem, key);
	    }
	}

	function patchProp(elem, key, value, oldValue, isCustomComponent) {
	    if (key === 'value' || key === 'checked') {
	        oldValue = elem[key];
	    }
	    if (value === oldValue) {
	        return;
	    }
	    if (value === undefined) {
	        removeProp(elem, key, oldValue, isCustomComponent);
	        return;
	    }
	    if (key === 'style') {
	        patchStyle(elem.style, oldValue, value);
	    } else {
	        setProp(elem, key, value, isCustomComponent);
	    }
	}

	function setProps(elem, props, isCustomComponent) {
	    for (var key in props) {
	        if (key !== 'children') {
	            setProp(elem, key, props[key], isCustomComponent);
	        }
	    }
	}

	function patchProps(elem, props, newProps, isCustomComponent) {
	    for (var key in props) {
	        if (key !== 'children') {
	            if (newProps.hasOwnProperty(key)) {
	                patchProp(elem, key, newProps[key], props[key], isCustomComponent);
	            } else {
	                removeProp(elem, key, props[key], isCustomComponent);
	            }
	        }
	    }
	    for (var key in newProps) {
	        if (key !== 'children' && !props.hasOwnProperty(key)) {
	            setProp(elem, key, newProps[key], isCustomComponent);
	        }
	    }
	}

	if (!Object.freeze) {
	    Object.freeze = identity;
	}

	var pendingRendering = {};
	var vnodeStore = {};
	function renderTreeIntoContainer(vnode, container, callback, parentContext) {
		if (!vnode.vtype) {
			throw new Error('cannot render ' + vnode + ' to container');
		}
		var id = container[COMPONENT_ID] || (container[COMPONENT_ID] = getUid());
		var argsCache = pendingRendering[id];

		// component lify cycle method maybe call root rendering
		// should bundle them and render by only one time
		if (argsCache) {
			if (argsCache === true) {
				pendingRendering[id] = argsCache = { vnode: vnode, callback: callback, parentContext: parentContext };
			} else {
				argsCache.vnode = vnode;
				argsCache.parentContext = parentContext;
				if (argsCache.callback) {
					argsCache.callback = argsCache.callback ? pipe(argsCache.callback, callback) : callback;
				}
			}
			return;
		}

		pendingRendering[id] = true;
		var oldVnode = null;
		var rootNode = null;
		if (oldVnode = vnodeStore[id]) {
			rootNode = compareTwoVnodes(oldVnode, vnode, container.firstChild, parentContext);
		} else {
			rootNode = initVnode(vnode, parentContext, container.namespaceURI);
			var childNode = null;
			while (childNode = container.lastChild) {
				container.removeChild(childNode);
			}
			container.appendChild(rootNode);
		}
		vnodeStore[id] = vnode;
		var isPending = updateQueue.isPending;
		updateQueue.isPending = true;
		clearPendingComponents();
		argsCache = pendingRendering[id];
		delete pendingRendering[id];

		var result = null;
		if (isArr(argsCache)) {
			result = renderTreeIntoContainer(argsCache.vnode, container, argsCache.parentContext, argsCache.callback);
		} else if (vnode.vtype === VELEMENT) {
			result = rootNode;
		} else if (vnode.vtype === VCOMPONENT) {
			result = rootNode.cache[vnode.uid];
		}

		if (!isPending) {
			updateQueue.isPending = false;
			updateQueue.batchUpdate();
		}

		if (callback) {
			callback.call(result);
		}

		return result;
	}

	function render(vnode, container, callback) {
		return renderTreeIntoContainer(vnode, container, callback);
	}

	function unstable_renderSubtreeIntoContainer(parentComponent, subVnode, container, callback) {
		var context = parentComponent.$cache.parentContext;
		return renderTreeIntoContainer(subVnode, container, callback, context);
	}

	function unmountComponentAtNode(container) {
		if (!container.nodeName) {
			throw new Error('expect node');
		}
		var id = container[COMPONENT_ID];
		var vnode = null;
		if (vnode = vnodeStore[id]) {
			destroyVnode(vnode, container.firstChild);
			container.removeChild(container.firstChild);
			delete vnodeStore[id];
			return true;
		}
		return false;
	}

	function findDOMNode(node) {
		if (node == null) {
			return null;
		}
		if (node.nodeName) {
			return node;
		}
		var component = node;
		// if component.node equal to false, component must be unmounted
		if (component.getDOMNode && component.$cache.isMounted) {
			return component.getDOMNode();
		}
		throw new Error('findDOMNode can not find Node');
	}

	var ReactDOM = Object.freeze({
		render: render,
		unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
		unmountComponentAtNode: unmountComponentAtNode,
		findDOMNode: findDOMNode
	});

	function createElement(type, props, children) {
		var vtype = null;
		if (typeof type === 'string') {
			vtype = VELEMENT;
		} else if (typeof type === 'function') {
			if (type.prototype && typeof type.prototype.forceUpdate === 'function') {
				vtype = VCOMPONENT;
			} else {
				vtype = VSTATELESS;
			}
		} else {
			throw new Error('React.createElement: unexpect type [ ' + type + ' ]');
		}

		var key = null;
		var ref = null;
		var finalProps = {};
		if (props != null) {
			for (var propKey in props) {
				if (!props.hasOwnProperty(propKey)) {
					continue;
				}
				if (propKey === 'key') {
					if (props.key !== undefined) {
						key = '' + props.key;
					}
				} else if (propKey === 'ref') {
					if (props.ref !== undefined) {
						ref = props.ref;
					}
				} else {
					finalProps[propKey] = props[propKey];
				}
			}
		}

		var defaultProps = type.defaultProps;

		if (defaultProps) {
			for (var propKey in defaultProps) {
				if (finalProps[propKey] === undefined) {
					finalProps[propKey] = defaultProps[propKey];
				}
			}
		}

		var argsLen = arguments.length;
		var finalChildren = children;

		if (argsLen > 3) {
			finalChildren = Array(argsLen - 2);
			for (var i = 2; i < argsLen; i++) {
				finalChildren[i - 2] = arguments[i];
			}
		}

		if (finalChildren !== undefined) {
			finalProps.children = finalChildren;
		}

		return createVnode(vtype, type, finalProps, key, ref);
	}

	function isValidElement(obj) {
		return obj != null && !!obj.vtype;
	}

	function cloneElement(originElem, props) {
		var type = originElem.type;
		var key = originElem.key;
		var ref = originElem.ref;

		var newProps = extend(extend({ key: key, ref: ref }, originElem.props), props);

		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}

		var vnode = createElement.apply(undefined, [type, newProps].concat(children));
		if (vnode.ref === originElem.ref) {
			vnode.refs = originElem.refs;
		}
		return vnode;
	}

	function createFactory(type) {
		var factory = function factory() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			return createElement.apply(undefined, [type].concat(args));
		};
		factory.type = type;
		return factory;
	}

	var tagNames = 'a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|main|map|mark|menu|menuitem|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr|circle|clipPath|defs|ellipse|g|image|line|linearGradient|mask|path|pattern|polygon|polyline|radialGradient|rect|stop|svg|text|tspan';
	var DOM = {};
	tagNames.split('|').forEach(function (tagName) {
		DOM[tagName] = createFactory(tagName);
	});

	var check = function check() {
	    return check;
	};
	check.isRequired = check;
	var PropTypes = {
	    "array": check,
	    "bool": check,
	    "func": check,
	    "number": check,
	    "object": check,
	    "string": check,
	    "any": check,
	    "arrayOf": check,
	    "element": check,
	    "instanceOf": check,
	    "node": check,
	    "objectOf": check,
	    "oneOf": check,
	    "oneOfType": check,
	    "shape": check
	};

	function only(children) {
		if (isValidElement(children)) {
			return children;
		}
		throw new Error('expect only one child');
	}

	function forEach(children, iteratee, context) {
		if (children == null) {
			return children;
		}
		var index = 0;
		if (isArr(children)) {
			flatEach(children, function (child) {
				iteratee.call(context, child, index++);
			});
		} else {
			iteratee.call(context, children, index);
		}
	}

	function map(children, iteratee, context) {
		if (children == null) {
			return children;
		}
		var store = [];
		var keyMap = {};
		forEach(children, function (child, index) {
			var data = {};
			data.child = iteratee.call(context, child, index) || child;
			data.isEqual = data.child === child;
			var key = data.key = getKey(child, index);
			if (keyMap.hasOwnProperty(key)) {
				keyMap[key] += 1;
			} else {
				keyMap[key] = 0;
			}
			data.index = keyMap[key];
			addItem(store, data);
		});
		var result = [];
		store.forEach(function (_ref) {
			var child = _ref.child;
			var key = _ref.key;
			var index = _ref.index;
			var isEqual = _ref.isEqual;

			if (child == null || typeof child === 'boolean') {
				return;
			}
			if (!isValidElement(child) || key == null) {
				addItem(result, child);
				return;
			}
			if (keyMap[key] !== 0) {
				key += ':' + index;
			}
			if (!isEqual) {
				key = escapeUserProvidedKey(child.key || '') + '/' + key;
			}
			child = cloneElement(child, { key: key });
			addItem(result, child);
		});
		return result;
	}

	function count(children) {
		var count = 0;
		forEach(children, function () {
			count++;
		});
		return count;
	}

	function toArray(children) {
		return map(children, identity) || [];
	}

	function getKey(child, index) {
		var key = undefined;
		if (isValidElement(child) && typeof child.key === 'string') {
			key = '.$' + child.key;
		} else {
			key = '.' + index.toString(36);
		}
		return key;
	}

	var userProvidedKeyEscapeRegex = /\/(?!\/)/g;
	function escapeUserProvidedKey(text) {
		return ('' + text).replace(userProvidedKeyEscapeRegex, '//');
	}

	var Children = Object.freeze({
		only: only,
		forEach: forEach,
		map: map,
		count: count,
		toArray: toArray
	});

	function eachMixin(mixins, iteratee) {
		mixins.forEach(function (mixin) {
			if (mixin) {
				if (isArr(mixin.mixins)) {
					eachMixin(mixin.mixins, iteratee);
				}
				iteratee(mixin);
			}
		});
	}

	function combineMixinToProto(proto, mixin) {
		for (var key in mixin) {
			if (!mixin.hasOwnProperty(key)) {
				continue;
			}
			var value = mixin[key];
			if (key === 'getInitialState') {
				addItem(proto.$getInitialStates, value);
				continue;
			}
			var curValue = proto[key];
			if (isFn(curValue) && isFn(value)) {
				proto[key] = pipe(curValue, value);
			} else {
				proto[key] = value;
			}
		}
	}

	function combineMixinToClass(Component, mixin) {
		if (mixin.propTypes) {
			Component.propTypes = Component.propTypes || {};
			extend(Component.propTypes, mixin.propTypes);
		}
		if (mixin.contextTypes) {
			Component.contextTypes = Component.contextTypes || {};
			extend(Component.contextTypes, mixin.contextTypes);
		}
		extend(Component, mixin.statics);
		if (isFn(mixin.getDefaultProps)) {
			Component.defaultProps = Component.defaultProps || {};
			extend(Component.defaultProps, mixin.getDefaultProps());
		}
	}

	function bindContext(obj, source) {
		for (var key in source) {
			if (source.hasOwnProperty(key)) {
				if (isFn(source[key])) {
					obj[key] = source[key].bind(obj);
				}
			}
		}
	}

	var Facade = function Facade() {};
	Facade.prototype = Component.prototype;

	function getInitialState() {
		var _this = this;

		var state = {};
		var setState = this.setState;
		this.setState = Facade;
		this.$getInitialStates.forEach(function (getInitialState) {
			if (isFn(getInitialState)) {
				extend(state, getInitialState.call(_this));
			}
		});
		this.setState = setState;
		return state;
	}
	function createClass(spec) {
		if (!isFn(spec.render)) {
			throw new Error('createClass: spec.render is not function');
		}
		var specMixins = spec.mixins || [];
		var mixins = specMixins.concat(spec);
		spec.mixins = null;
		function Klass(props, context) {
			Component.call(this, props, context);
			this.constructor = Klass;
			spec.autobind !== false && bindContext(this, Klass.prototype);
			this.state = this.getInitialState() || this.state;
		}
		Klass.displayName = spec.displayName;
		var proto = Klass.prototype = new Facade();
		proto.$getInitialStates = [];
		eachMixin(mixins, function (mixin) {
			combineMixinToProto(proto, mixin);
			combineMixinToClass(Klass, mixin);
		});
		proto.getInitialState = getInitialState;
		spec.mixins = specMixins;
		return Klass;
	}

	function shallowEqual(objA, objB) {
	    if (objA === objB) {
	        return true;
	    }

	    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	        return false;
	    }

	    var keysA = Object.keys(objA);
	    var keysB = Object.keys(objB);

	    if (keysA.length !== keysB.length) {
	        return false;
	    }

	    // Test for A's keys different from B.
	    for (var i = 0; i < keysA.length; i++) {
	        if (!objB.hasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	            return false;
	        }
	    }

	    return true;
	}

	function PureComponent(props, context) {
		Component.call(this, props, context);
	}

	PureComponent.prototype = Object.create(Component.prototype);
	PureComponent.prototype.constructor = PureComponent;
	PureComponent.prototype.isPureReactComponent = true;
	PureComponent.prototype.shouldComponentUpdate = shallowCompare;

	function shallowCompare(nextProps, nextState) {
		return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
	}

	var React = extend({
	    version: '0.15.1',
	    cloneElement: cloneElement,
	    isValidElement: isValidElement,
	    createElement: createElement,
	    createFactory: createFactory,
	    Component: Component,
	    PureComponent: PureComponent,
	    createClass: createClass,
	    Children: Children,
	    PropTypes: PropTypes,
	    DOM: DOM
	}, ReactDOM);

	React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOM;

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	The following batches are equivalent:

	var beautify_js = require('js-beautify');
	var beautify_js = require('js-beautify').js;
	var beautify_js = require('js-beautify').js_beautify;

	var beautify_css = require('js-beautify').css;
	var beautify_css = require('js-beautify').css_beautify;

	var beautify_html = require('js-beautify').html;
	var beautify_html = require('js-beautify').html_beautify;

	All methods returned accept two arguments, the source string and an options object.
	**/

	function get_beautify(js_beautify, css_beautify, html_beautify) {
	    // the default is js
	    var beautify = function(src, config) {
	        return js_beautify.js_beautify(src, config);
	    };

	    // short aliases
	    beautify.js = js_beautify.js_beautify;
	    beautify.css = css_beautify.css_beautify;
	    beautify.html = html_beautify.html_beautify;

	    // legacy aliases
	    beautify.js_beautify = js_beautify.js_beautify;
	    beautify.css_beautify = css_beautify.css_beautify;
	    beautify.html_beautify = html_beautify.html_beautify;

	    return beautify;
	}

	if (true) {
	    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(3),
	        __webpack_require__(4),
	        __webpack_require__(5)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(js_beautify, css_beautify, html_beautify) {
	        return get_beautify(js_beautify, css_beautify, html_beautify);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
	    (function(mod) {
	        var js_beautify = require('./lib/beautify');
	        var css_beautify = require('./lib/beautify-css');
	        var html_beautify = require('./lib/beautify-html');

	        mod.exports = get_beautify(js_beautify, css_beautify, html_beautify);

	    })(module);
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
	/*

	  The MIT License (MIT)

	  Copyright (c) 2007-2013 Einar Lielmanis and contributors.

	  Permission is hereby granted, free of charge, to any person
	  obtaining a copy of this software and associated documentation files
	  (the "Software"), to deal in the Software without restriction,
	  including without limitation the rights to use, copy, modify, merge,
	  publish, distribute, sublicense, and/or sell copies of the Software,
	  and to permit persons to whom the Software is furnished to do so,
	  subject to the following conditions:

	  The above copyright notice and this permission notice shall be
	  included in all copies or substantial portions of the Software.

	  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
	  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	  SOFTWARE.

	 JS Beautifier
	---------------


	  Written by Einar Lielmanis, <einar@jsbeautifier.org>
	      http://jsbeautifier.org/

	  Originally converted to javascript by Vital, <vital76@gmail.com>
	  "End braces on own line" added by Chris J. Shull, <chrisjshull@gmail.com>
	  Parsing improvements for brace-less statements by Liam Newman <bitwiseman@gmail.com>


	  Usage:
	    js_beautify(js_source_text);
	    js_beautify(js_source_text, options);

	  The options are:
	    indent_size (default 4)          - indentation size,
	    indent_char (default space)      - character to indent with,
	    preserve_newlines (default true) - whether existing line breaks should be preserved,
	    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk,

	    jslint_happy (default false) - if true, then jslint-stricter mode is enforced.

	            jslint_happy        !jslint_happy
	            ---------------------------------
	            function ()         function()

	            switch () {         switch() {
	            case 1:               case 1:
	              break;                break;
	            }                   }

	    space_after_anon_function (default false) - should the space before an anonymous function's parens be added, "function()" vs "function ()",
	          NOTE: This option is overriden by jslint_happy (i.e. if jslint_happy is true, space_after_anon_function is true by design)

	    brace_style (default "collapse") - "collapse-preserve-inline" | "collapse" | "expand" | "end-expand" | "none"
	            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.

	    space_before_conditional (default true) - should the space before conditional statement be added, "if(true)" vs "if (true)",

	    unescape_strings (default false) - should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"

	    wrap_line_length (default unlimited) - lines should wrap at next opportunity after this number of characters.
	          NOTE: This is not a hard limit. Lines will continue until a point where a newline would
	                be preserved if it were present.

	    end_with_newline (default false)  - end output with a newline


	    e.g

	    js_beautify(js_source_text, {
	      'indent_size': 1,
	      'indent_char': '\t'
	    });

	*/

	// Object.values polyfill found here:
	// http://tokenposts.blogspot.com.au/2012/04/javascript-objectkeys-browser.html
	if (!Object.values) {
	    Object.values = function(o) {
	        if (o !== Object(o)) {
	            throw new TypeError('Object.values called on a non-object');
	        }
	        var k = [],
	            p;
	        for (p in o) {
	            if (Object.prototype.hasOwnProperty.call(o, p)) {
	                k.push(o[p]);
	            }
	        }
	        return k;
	    };
	}

	(function() {

	    function js_beautify(js_source_text, options) {

	        var acorn = {};
	        (function(exports) {
	            /* jshint curly: false */
	            // This section of code is taken from acorn.
	            //
	            // Acorn was written by Marijn Haverbeke and released under an MIT
	            // license. The Unicode regexps (for identifiers and whitespace) were
	            // taken from [Esprima](http://esprima.org) by Ariya Hidayat.
	            //
	            // Git repositories for Acorn are available at
	            //
	            //     http://marijnhaverbeke.nl/git/acorn
	            //     https://github.com/marijnh/acorn.git

	            // ## Character categories

	            // Big ugly regular expressions that match characters in the
	            // whitespace, identifier, and identifier-start categories. These
	            // are only applied when a character is found to actually have a
	            // code point above 128.

	            var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
	            var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
	            var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
	            var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
	            var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

	            // Whether a single character denotes a newline.

	            exports.newline = /[\n\r\u2028\u2029]/;

	            // Matches a whole line break (where CRLF is considered a single
	            // line break). Used to count lines.

	            // in javascript, these two differ
	            // in python they are the same, different methods are called on them
	            exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
	            exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');


	            // Test whether a given character code starts an identifier.

	            exports.isIdentifierStart = function(code) {
	                // permit $ (36) and @ (64). @ is used in ES7 decorators.
	                if (code < 65) return code === 36 || code === 64;
	                // 65 through 91 are uppercase letters.
	                if (code < 91) return true;
	                // permit _ (95).
	                if (code < 97) return code === 95;
	                // 97 through 123 are lowercase letters.
	                if (code < 123) return true;
	                return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
	            };

	            // Test whether a given character is part of an identifier.

	            exports.isIdentifierChar = function(code) {
	                if (code < 48) return code === 36;
	                if (code < 58) return true;
	                if (code < 65) return false;
	                if (code < 91) return true;
	                if (code < 97) return code === 95;
	                if (code < 123) return true;
	                return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
	            };
	        })(acorn);
	        /* jshint curly: true */

	        function in_array(what, arr) {
	            for (var i = 0; i < arr.length; i += 1) {
	                if (arr[i] === what) {
	                    return true;
	                }
	            }
	            return false;
	        }

	        function trim(s) {
	            return s.replace(/^\s+|\s+$/g, '');
	        }

	        function ltrim(s) {
	            return s.replace(/^\s+/g, '');
	        }

	        // function rtrim(s) {
	        //     return s.replace(/\s+$/g, '');
	        // }

	        function sanitizeOperatorPosition(opPosition) {
	            opPosition = opPosition || OPERATOR_POSITION.before_newline;

	            var validPositionValues = Object.values(OPERATOR_POSITION);

	            if (!in_array(opPosition, validPositionValues)) {
	                throw new Error("Invalid Option Value: The option 'operator_position' must be one of the following values\n" +
	                    validPositionValues +
	                    "\nYou passed in: '" + opPosition + "'");
	            }

	            return opPosition;
	        }

	        var OPERATOR_POSITION = {
	            before_newline: 'before-newline',
	            after_newline: 'after-newline',
	            preserve_newline: 'preserve-newline',
	        };

	        var OPERATOR_POSITION_BEFORE_OR_PRESERVE = [OPERATOR_POSITION.before_newline, OPERATOR_POSITION.preserve_newline];

	        var MODE = {
	            BlockStatement: 'BlockStatement', // 'BLOCK'
	            Statement: 'Statement', // 'STATEMENT'
	            ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
	            ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
	            ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
	            Conditional: 'Conditional', //'(COND-EXPRESSION)',
	            Expression: 'Expression' //'(EXPRESSION)'
	        };

	        function Beautifier(js_source_text, options) {
	            "use strict";
	            var output;
	            var tokens = [],
	                token_pos;
	            var Tokenizer;
	            var current_token;
	            var last_type, last_last_text, indent_string;
	            var flags, previous_flags, flag_store;
	            var prefix;

	            var handlers, opt;
	            var baseIndentString = '';

	            handlers = {
	                'TK_START_EXPR': handle_start_expr,
	                'TK_END_EXPR': handle_end_expr,
	                'TK_START_BLOCK': handle_start_block,
	                'TK_END_BLOCK': handle_end_block,
	                'TK_WORD': handle_word,
	                'TK_RESERVED': handle_word,
	                'TK_SEMICOLON': handle_semicolon,
	                'TK_STRING': handle_string,
	                'TK_EQUALS': handle_equals,
	                'TK_OPERATOR': handle_operator,
	                'TK_COMMA': handle_comma,
	                'TK_BLOCK_COMMENT': handle_block_comment,
	                'TK_COMMENT': handle_comment,
	                'TK_DOT': handle_dot,
	                'TK_UNKNOWN': handle_unknown,
	                'TK_EOF': handle_eof
	            };

	            function create_flags(flags_base, mode) {
	                var next_indent_level = 0;
	                if (flags_base) {
	                    next_indent_level = flags_base.indentation_level;
	                    if (!output.just_added_newline() &&
	                        flags_base.line_indent_level > next_indent_level) {
	                        next_indent_level = flags_base.line_indent_level;
	                    }
	                }

	                var next_flags = {
	                    mode: mode,
	                    parent: flags_base,
	                    last_text: flags_base ? flags_base.last_text : '', // last token text
	                    last_word: flags_base ? flags_base.last_word : '', // last 'TK_WORD' passed
	                    declaration_statement: false,
	                    declaration_assignment: false,
	                    multiline_frame: false,
	                    inline_frame: false,
	                    if_block: false,
	                    else_block: false,
	                    do_block: false,
	                    do_while: false,
	                    import_block: false,
	                    in_case_statement: false, // switch(..){ INSIDE HERE }
	                    in_case: false, // we're on the exact line with "case 0:"
	                    case_body: false, // the indented case-action block
	                    indentation_level: next_indent_level,
	                    line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
	                    start_line_index: output.get_line_number(),
	                    ternary_depth: 0
	                };
	                return next_flags;
	            }

	            // Some interpreters have unexpected results with foo = baz || bar;
	            options = options ? options : {};
	            opt = {};

	            // compatibility
	            if (options.braces_on_own_line !== undefined) { //graceful handling of deprecated option
	                opt.brace_style = options.braces_on_own_line ? "expand" : "collapse";
	            }
	            opt.brace_style = options.brace_style ? options.brace_style : (opt.brace_style ? opt.brace_style : "collapse");

	            // graceful handling of deprecated option
	            if (opt.brace_style === "expand-strict") {
	                opt.brace_style = "expand";
	            }

	            opt.indent_size = options.indent_size ? parseInt(options.indent_size, 10) : 4;
	            opt.indent_char = options.indent_char ? options.indent_char : ' ';
	            opt.eol = options.eol ? options.eol : 'auto';
	            opt.preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
	            opt.break_chained_methods = (options.break_chained_methods === undefined) ? false : options.break_chained_methods;
	            opt.max_preserve_newlines = (options.max_preserve_newlines === undefined) ? 0 : parseInt(options.max_preserve_newlines, 10);
	            opt.space_in_paren = (options.space_in_paren === undefined) ? false : options.space_in_paren;
	            opt.space_in_empty_paren = (options.space_in_empty_paren === undefined) ? false : options.space_in_empty_paren;
	            opt.jslint_happy = (options.jslint_happy === undefined) ? false : options.jslint_happy;
	            opt.space_after_anon_function = (options.space_after_anon_function === undefined) ? false : options.space_after_anon_function;
	            opt.keep_array_indentation = (options.keep_array_indentation === undefined) ? false : options.keep_array_indentation;
	            opt.space_before_conditional = (options.space_before_conditional === undefined) ? true : options.space_before_conditional;
	            opt.unescape_strings = (options.unescape_strings === undefined) ? false : options.unescape_strings;
	            opt.wrap_line_length = (options.wrap_line_length === undefined) ? 0 : parseInt(options.wrap_line_length, 10);
	            opt.e4x = (options.e4x === undefined) ? false : options.e4x;
	            opt.end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
	            opt.comma_first = (options.comma_first === undefined) ? false : options.comma_first;
	            opt.operator_position = sanitizeOperatorPosition(options.operator_position);

	            // For testing of beautify ignore:start directive
	            opt.test_output_raw = (options.test_output_raw === undefined) ? false : options.test_output_raw;

	            // force opt.space_after_anon_function to true if opt.jslint_happy
	            if (opt.jslint_happy) {
	                opt.space_after_anon_function = true;
	            }

	            if (options.indent_with_tabs) {
	                opt.indent_char = '\t';
	                opt.indent_size = 1;
	            }

	            if (opt.eol === 'auto') {
	                opt.eol = '\n';
	                if (js_source_text && acorn.lineBreak.test(js_source_text || '')) {
	                    opt.eol = js_source_text.match(acorn.lineBreak)[0];
	                }
	            }

	            opt.eol = opt.eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

	            //----------------------------------
	            indent_string = '';
	            while (opt.indent_size > 0) {
	                indent_string += opt.indent_char;
	                opt.indent_size -= 1;
	            }

	            var preindent_index = 0;
	            if (js_source_text && js_source_text.length) {
	                while ((js_source_text.charAt(preindent_index) === ' ' ||
	                        js_source_text.charAt(preindent_index) === '\t')) {
	                    baseIndentString += js_source_text.charAt(preindent_index);
	                    preindent_index += 1;
	                }
	                js_source_text = js_source_text.substring(preindent_index);
	            }

	            last_type = 'TK_START_BLOCK'; // last token type
	            last_last_text = ''; // pre-last token text
	            output = new Output(indent_string, baseIndentString);

	            // If testing the ignore directive, start with output disable set to true
	            output.raw = opt.test_output_raw;


	            // Stack of parsing/formatting states, including MODE.
	            // We tokenize, parse, and output in an almost purely a forward-only stream of token input
	            // and formatted output.  This makes the beautifier less accurate than full parsers
	            // but also far more tolerant of syntax errors.
	            //
	            // For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
	            // MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
	            // encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
	            // most full parsers would die, but the beautifier gracefully falls back to
	            // MODE.BlockStatement and continues on.
	            flag_store = [];
	            set_mode(MODE.BlockStatement);

	            this.beautify = function() {

	                /*jshint onevar:true */
	                var local_token, sweet_code;
	                Tokenizer = new tokenizer(js_source_text, opt, indent_string);
	                tokens = Tokenizer.tokenize();
	                token_pos = 0;

	                function get_local_token() {
	                    local_token = get_token();
	                    return local_token;
	                }

	                while (get_local_token()) {
	                    for (var i = 0; i < local_token.comments_before.length; i++) {
	                        // The cleanest handling of inline comments is to treat them as though they aren't there.
	                        // Just continue formatting and the behavior should be logical.
	                        // Also ignore unknown tokens.  Again, this should result in better behavior.
	                        handle_token(local_token.comments_before[i]);
	                    }
	                    handle_token(local_token);

	                    last_last_text = flags.last_text;
	                    last_type = local_token.type;
	                    flags.last_text = local_token.text;

	                    token_pos += 1;
	                }

	                sweet_code = output.get_code();
	                if (opt.end_with_newline) {
	                    sweet_code += '\n';
	                }

	                if (opt.eol !== '\n') {
	                    sweet_code = sweet_code.replace(/[\n]/g, opt.eol);
	                }

	                return sweet_code;
	            };

	            function handle_token(local_token) {
	                var newlines = local_token.newlines;
	                var keep_whitespace = opt.keep_array_indentation && is_array(flags.mode);

	                if (keep_whitespace) {
	                    for (var i = 0; i < newlines; i += 1) {
	                        print_newline(i > 0);
	                    }
	                } else {
	                    if (opt.max_preserve_newlines && newlines > opt.max_preserve_newlines) {
	                        newlines = opt.max_preserve_newlines;
	                    }

	                    if (opt.preserve_newlines) {
	                        if (local_token.newlines > 1) {
	                            print_newline();
	                            for (var j = 1; j < newlines; j += 1) {
	                                print_newline(true);
	                            }
	                        }
	                    }
	                }

	                current_token = local_token;
	                handlers[current_token.type]();
	            }

	            // we could use just string.split, but
	            // IE doesn't like returning empty strings
	            function split_linebreaks(s) {
	                //return s.split(/\x0d\x0a|\x0a/);

	                s = s.replace(acorn.allLineBreaks, '\n');
	                var out = [],
	                    idx = s.indexOf("\n");
	                while (idx !== -1) {
	                    out.push(s.substring(0, idx));
	                    s = s.substring(idx + 1);
	                    idx = s.indexOf("\n");
	                }
	                if (s.length) {
	                    out.push(s);
	                }
	                return out;
	            }

	            var newline_restricted_tokens = ['break', 'contiue', 'return', 'throw'];

	            function allow_wrap_or_preserved_newline(force_linewrap) {
	                force_linewrap = (force_linewrap === undefined) ? false : force_linewrap;

	                // Never wrap the first token on a line
	                if (output.just_added_newline()) {
	                    return;
	                }

	                var shouldPreserveOrForce = (opt.preserve_newlines && current_token.wanted_newline) || force_linewrap;
	                var operatorLogicApplies = in_array(flags.last_text, Tokenizer.positionable_operators) || in_array(current_token.text, Tokenizer.positionable_operators);

	                if (operatorLogicApplies) {
	                    var shouldPrintOperatorNewline = (
	                            in_array(flags.last_text, Tokenizer.positionable_operators) &&
	                            in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)
	                        ) ||
	                        in_array(current_token.text, Tokenizer.positionable_operators);
	                    shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;
	                }

	                if (shouldPreserveOrForce) {
	                    print_newline(false, true);
	                } else if (opt.wrap_line_length) {
	                    if (last_type === 'TK_RESERVED' && in_array(flags.last_text, newline_restricted_tokens)) {
	                        // These tokens should never have a newline inserted
	                        // between them and the following expression.
	                        return;
	                    }
	                    var proposed_line_length = output.current_line.get_character_count() + current_token.text.length +
	                        (output.space_before_token ? 1 : 0);
	                    if (proposed_line_length >= opt.wrap_line_length) {
	                        print_newline(false, true);
	                    }
	                }
	            }

	            function print_newline(force_newline, preserve_statement_flags) {
	                if (!preserve_statement_flags) {
	                    if (flags.last_text !== ';' && flags.last_text !== ',' && flags.last_text !== '=' && last_type !== 'TK_OPERATOR') {
	                        while (flags.mode === MODE.Statement && !flags.if_block && !flags.do_block) {
	                            restore_mode();
	                        }
	                    }
	                }

	                if (output.add_new_line(force_newline)) {
	                    flags.multiline_frame = true;
	                }
	            }

	            function print_token_line_indentation() {
	                if (output.just_added_newline()) {
	                    if (opt.keep_array_indentation && is_array(flags.mode) && current_token.wanted_newline) {
	                        output.current_line.push(current_token.whitespace_before);
	                        output.space_before_token = false;
	                    } else if (output.set_indent(flags.indentation_level)) {
	                        flags.line_indent_level = flags.indentation_level;
	                    }
	                }
	            }

	            function print_token(printable_token) {
	                if (output.raw) {
	                    output.add_raw_token(current_token);
	                    return;
	                }

	                if (opt.comma_first && last_type === 'TK_COMMA' &&
	                    output.just_added_newline()) {
	                    if (output.previous_line.last() === ',') {
	                        var popped = output.previous_line.pop();
	                        // if the comma was already at the start of the line,
	                        // pull back onto that line and reprint the indentation
	                        if (output.previous_line.is_empty()) {
	                            output.previous_line.push(popped);
	                            output.trim(true);
	                            output.current_line.pop();
	                            output.trim();
	                        }

	                        // add the comma in front of the next token
	                        print_token_line_indentation();
	                        output.add_token(',');
	                        output.space_before_token = true;
	                    }
	                }

	                printable_token = printable_token || current_token.text;
	                print_token_line_indentation();
	                output.add_token(printable_token);
	            }

	            function indent() {
	                flags.indentation_level += 1;
	            }

	            function deindent() {
	                if (flags.indentation_level > 0 &&
	                    ((!flags.parent) || flags.indentation_level > flags.parent.indentation_level)) {
	                    flags.indentation_level -= 1;

	                }
	            }

	            function set_mode(mode) {
	                if (flags) {
	                    flag_store.push(flags);
	                    previous_flags = flags;
	                } else {
	                    previous_flags = create_flags(null, mode);
	                }

	                flags = create_flags(previous_flags, mode);
	            }

	            function is_array(mode) {
	                return mode === MODE.ArrayLiteral;
	            }

	            function is_expression(mode) {
	                return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
	            }

	            function restore_mode() {
	                if (flag_store.length > 0) {
	                    previous_flags = flags;
	                    flags = flag_store.pop();
	                    if (previous_flags.mode === MODE.Statement) {
	                        output.remove_redundant_indentation(previous_flags);
	                    }
	                }
	            }

	            function start_of_object_property() {
	                return flags.parent.mode === MODE.ObjectLiteral && flags.mode === MODE.Statement && (
	                    (flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set'])));
	            }

	            function start_of_statement() {
	                if (
	                    (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD') ||
	                    (last_type === 'TK_RESERVED' && flags.last_text === 'do') ||
	                    (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['return', 'throw']) && !current_token.wanted_newline) ||
	                    (last_type === 'TK_RESERVED' && flags.last_text === 'else' && !(current_token.type === 'TK_RESERVED' && current_token.text === 'if')) ||
	                    (last_type === 'TK_END_EXPR' && (previous_flags.mode === MODE.ForInitializer || previous_flags.mode === MODE.Conditional)) ||
	                    (last_type === 'TK_WORD' && flags.mode === MODE.BlockStatement &&
	                        !flags.in_case &&
	                        !(current_token.text === '--' || current_token.text === '++') &&
	                        last_last_text !== 'function' &&
	                        current_token.type !== 'TK_WORD' && current_token.type !== 'TK_RESERVED') ||
	                    (flags.mode === MODE.ObjectLiteral && (
	                        (flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set']))))
	                ) {

	                    set_mode(MODE.Statement);
	                    indent();

	                    if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD') {
	                        flags.declaration_statement = true;
	                    }

	                    // Issue #276:
	                    // If starting a new statement with [if, for, while, do], push to a new line.
	                    // if (a) if (b) if(c) d(); else e(); else f();
	                    if (!start_of_object_property()) {
	                        allow_wrap_or_preserved_newline(
	                            current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['do', 'for', 'if', 'while']));
	                    }

	                    return true;
	                }
	                return false;
	            }

	            function all_lines_start_with(lines, c) {
	                for (var i = 0; i < lines.length; i++) {
	                    var line = trim(lines[i]);
	                    if (line.charAt(0) !== c) {
	                        return false;
	                    }
	                }
	                return true;
	            }

	            function each_line_matches_indent(lines, indent) {
	                var i = 0,
	                    len = lines.length,
	                    line;
	                for (; i < len; i++) {
	                    line = lines[i];
	                    // allow empty lines to pass through
	                    if (line && line.indexOf(indent) !== 0) {
	                        return false;
	                    }
	                }
	                return true;
	            }

	            function is_special_word(word) {
	                return in_array(word, ['case', 'return', 'do', 'if', 'throw', 'else']);
	            }

	            function get_token(offset) {
	                var index = token_pos + (offset || 0);
	                return (index < 0 || index >= tokens.length) ? null : tokens[index];
	            }

	            function handle_start_expr() {
	                if (start_of_statement()) {
	                    // The conditional starts the statement if appropriate.
	                }

	                var next_mode = MODE.Expression;
	                if (current_token.text === '[') {

	                    if (last_type === 'TK_WORD' || flags.last_text === ')') {
	                        // this is array index specifier, break immediately
	                        // a[x], fn()[x]
	                        if (last_type === 'TK_RESERVED' && in_array(flags.last_text, Tokenizer.line_starters)) {
	                            output.space_before_token = true;
	                        }
	                        set_mode(next_mode);
	                        print_token();
	                        indent();
	                        if (opt.space_in_paren) {
	                            output.space_before_token = true;
	                        }
	                        return;
	                    }

	                    next_mode = MODE.ArrayLiteral;
	                    if (is_array(flags.mode)) {
	                        if (flags.last_text === '[' ||
	                            (flags.last_text === ',' && (last_last_text === ']' || last_last_text === '}'))) {
	                            // ], [ goes to new line
	                            // }, [ goes to new line
	                            if (!opt.keep_array_indentation) {
	                                print_newline();
	                            }
	                        }
	                    }

	                } else {
	                    if (last_type === 'TK_RESERVED' && flags.last_text === 'for') {
	                        next_mode = MODE.ForInitializer;
	                    } else if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['if', 'while'])) {
	                        next_mode = MODE.Conditional;
	                    } else {
	                        // next_mode = MODE.Expression;
	                    }
	                }

	                if (flags.last_text === ';' || last_type === 'TK_START_BLOCK') {
	                    print_newline();
	                } else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || flags.last_text === '.') {
	                    // TODO: Consider whether forcing this is required.  Review failing tests when removed.
	                    allow_wrap_or_preserved_newline(current_token.wanted_newline);
	                    // do nothing on (( and )( and ][ and ]( and .(
	                } else if (!(last_type === 'TK_RESERVED' && current_token.text === '(') && last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
	                    output.space_before_token = true;
	                } else if ((last_type === 'TK_RESERVED' && (flags.last_word === 'function' || flags.last_word === 'typeof')) ||
	                    (flags.last_text === '*' && last_last_text === 'function')) {
	                    // function() vs function ()
	                    if (opt.space_after_anon_function) {
	                        output.space_before_token = true;
	                    }
	                } else if (last_type === 'TK_RESERVED' && (in_array(flags.last_text, Tokenizer.line_starters) || flags.last_text === 'catch')) {
	                    if (opt.space_before_conditional) {
	                        output.space_before_token = true;
	                    }
	                }

	                // Should be a space between await and an IIFE
	                if (current_token.text === '(' && last_type === 'TK_RESERVED' && flags.last_word === 'await') {
	                    output.space_before_token = true;
	                }

	                // Support of this kind of newline preservation.
	                // a = (b &&
	                //     (c || d));
	                if (current_token.text === '(') {
	                    if (last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
	                        if (!start_of_object_property()) {
	                            allow_wrap_or_preserved_newline();
	                        }
	                    }
	                }

	                // Support preserving wrapped arrow function expressions
	                // a.b('c',
	                //     () => d.e
	                // )
	                if (current_token.text === '(' && last_type !== 'TK_WORD' && last_type !== 'TK_RESERVED') {
	                    allow_wrap_or_preserved_newline();
	                }

	                set_mode(next_mode);
	                print_token();
	                if (opt.space_in_paren) {
	                    output.space_before_token = true;
	                }

	                // In all cases, if we newline while inside an expression it should be indented.
	                indent();
	            }

	            function handle_end_expr() {
	                // statements inside expressions are not valid syntax, but...
	                // statements must all be closed when their container closes
	                while (flags.mode === MODE.Statement) {
	                    restore_mode();
	                }

	                if (flags.multiline_frame) {
	                    allow_wrap_or_preserved_newline(current_token.text === ']' && is_array(flags.mode) && !opt.keep_array_indentation);
	                }

	                if (opt.space_in_paren) {
	                    if (last_type === 'TK_START_EXPR' && !opt.space_in_empty_paren) {
	                        // () [] no inner space in empty parens like these, ever, ref #320
	                        output.trim();
	                        output.space_before_token = false;
	                    } else {
	                        output.space_before_token = true;
	                    }
	                }
	                if (current_token.text === ']' && opt.keep_array_indentation) {
	                    print_token();
	                    restore_mode();
	                } else {
	                    restore_mode();
	                    print_token();
	                }
	                output.remove_redundant_indentation(previous_flags);

	                // do {} while () // no statement required after
	                if (flags.do_while && previous_flags.mode === MODE.Conditional) {
	                    previous_flags.mode = MODE.Expression;
	                    flags.do_block = false;
	                    flags.do_while = false;

	                }
	            }

	            function handle_start_block() {
	                // Check if this is should be treated as a ObjectLiteral
	                var next_token = get_token(1);
	                var second_token = get_token(2);
	                if (second_token && (
	                        (in_array(second_token.text, [':', ',']) && in_array(next_token.type, ['TK_STRING', 'TK_WORD', 'TK_RESERVED'])) ||
	                        (in_array(next_token.text, ['get', 'set']) && in_array(second_token.type, ['TK_WORD', 'TK_RESERVED']))
	                    )) {
	                    // We don't support TypeScript,but we didn't break it for a very long time.
	                    // We'll try to keep not breaking it.
	                    if (!in_array(last_last_text, ['class', 'interface'])) {
	                        set_mode(MODE.ObjectLiteral);
	                    } else {
	                        set_mode(MODE.BlockStatement);
	                    }
	                } else if (last_type === 'TK_OPERATOR' && flags.last_text === '=>') {
	                    // arrow function: (param1, paramN) => { statements }
	                    set_mode(MODE.BlockStatement);
	                } else if (in_array(last_type, ['TK_EQUALS', 'TK_START_EXPR', 'TK_COMMA', 'TK_OPERATOR']) ||
	                    (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['return', 'throw', 'import']))
	                ) {
	                    // Detecting shorthand function syntax is difficult by scanning forward,
	                    //     so check the surrounding context.
	                    // If the block is being returned, imported, passed as arg,
	                    //     assigned with = or assigned in a nested object, treat as an ObjectLiteral.
	                    set_mode(MODE.ObjectLiteral);
	                } else {
	                    set_mode(MODE.BlockStatement);
	                }

	                var empty_braces = !next_token.comments_before.length && next_token.text === '}';
	                var empty_anonymous_function = empty_braces && flags.last_word === 'function' &&
	                    last_type === 'TK_END_EXPR';


	                if (opt.brace_style === "expand" ||
	                    (opt.brace_style === "none" && current_token.wanted_newline)) {
	                    if (last_type !== 'TK_OPERATOR' &&
	                        (empty_anonymous_function ||
	                            last_type === 'TK_EQUALS' ||
	                            (last_type === 'TK_RESERVED' && is_special_word(flags.last_text) && flags.last_text !== 'else'))) {
	                        output.space_before_token = true;
	                    } else {
	                        print_newline(false, true);
	                    }
	                } else { // collapse
	                    if (opt.brace_style === 'collapse-preserve-inline') {
	                        // search forward for a newline wanted inside this block
	                        var index = 0;
	                        var check_token = null;
	                        flags.inline_frame = true;
	                        do {
	                            index += 1;
	                            check_token = get_token(index);
	                            if (check_token.wanted_newline) {
	                                flags.inline_frame = false;
	                                break;
	                            }
	                        } while (check_token.type !== 'TK_EOF' &&
	                            !(check_token.type === 'TK_END_BLOCK' && check_token.opened === current_token));
	                    }

	                    if (is_array(previous_flags.mode) && (last_type === 'TK_START_EXPR' || last_type === 'TK_COMMA')) {
	                        // if we're preserving inline,
	                        // allow newline between comma and next brace.
	                        if (last_type === 'TK_COMMA' || opt.space_in_paren) {
	                            output.space_before_token = true;
	                        }

	                        if (opt.brace_style === 'collapse-preserve-inline' &&
	                            (last_type === 'TK_COMMA' || (last_type === 'TK_START_EXPR' && flags.inline_frame))) {
	                            allow_wrap_or_preserved_newline();
	                            previous_flags.multiline_frame = previous_flags.multiline_frame || flags.multiline_frame;
	                            flags.multiline_frame = false;
	                        }
	                    } else if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
	                        if (last_type === 'TK_START_BLOCK') {
	                            print_newline();
	                        } else {
	                            output.space_before_token = true;
	                        }
	                    }
	                }
	                print_token();
	                indent();
	            }

	            function handle_end_block() {
	                // statements must all be closed when their container closes
	                while (flags.mode === MODE.Statement) {
	                    restore_mode();
	                }
	                var empty_braces = last_type === 'TK_START_BLOCK';

	                if (opt.brace_style === "expand") {
	                    if (!empty_braces) {
	                        print_newline();
	                    }
	                } else {
	                    // skip {}
	                    if (!empty_braces) {
	                        if (flags.inline_frame) {
	                            output.space_before_token = true;
	                        } else if (is_array(flags.mode) && opt.keep_array_indentation) {
	                            // we REALLY need a newline here, but newliner would skip that
	                            opt.keep_array_indentation = false;
	                            print_newline();
	                            opt.keep_array_indentation = true;

	                        } else {
	                            print_newline();
	                        }
	                    }
	                }
	                restore_mode();
	                print_token();
	            }

	            function handle_word() {
	                if (current_token.type === 'TK_RESERVED') {
	                    if (in_array(current_token.text, ['set', 'get']) && flags.mode !== MODE.ObjectLiteral) {
	                        current_token.type = 'TK_WORD';
	                    } else if (in_array(current_token.text, ['as', 'from']) && !flags.import_block) {
	                        current_token.type = 'TK_WORD';
	                    } else if (flags.mode === MODE.ObjectLiteral) {
	                        var next_token = get_token(1);
	                        if (next_token.text === ':') {
	                            current_token.type = 'TK_WORD';
	                        }
	                    }
	                }

	                if (start_of_statement()) {
	                    // The conditional starts the statement if appropriate.
	                } else if (current_token.wanted_newline && !is_expression(flags.mode) &&
	                    (last_type !== 'TK_OPERATOR' || (flags.last_text === '--' || flags.last_text === '++')) &&
	                    last_type !== 'TK_EQUALS' &&
	                    (opt.preserve_newlines || !(last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const', 'set', 'get'])))) {

	                    print_newline();
	                }

	                if (flags.do_block && !flags.do_while) {
	                    if (current_token.type === 'TK_RESERVED' && current_token.text === 'while') {
	                        // do {} ## while ()
	                        output.space_before_token = true;
	                        print_token();
	                        output.space_before_token = true;
	                        flags.do_while = true;
	                        return;
	                    } else {
	                        // do {} should always have while as the next word.
	                        // if we don't see the expected while, recover
	                        print_newline();
	                        flags.do_block = false;
	                    }
	                }

	                // if may be followed by else, or not
	                // Bare/inline ifs are tricky
	                // Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();
	                if (flags.if_block) {
	                    if (!flags.else_block && (current_token.type === 'TK_RESERVED' && current_token.text === 'else')) {
	                        flags.else_block = true;
	                    } else {
	                        while (flags.mode === MODE.Statement) {
	                            restore_mode();
	                        }
	                        flags.if_block = false;
	                        flags.else_block = false;
	                    }
	                }

	                if (current_token.type === 'TK_RESERVED' && (current_token.text === 'case' || (current_token.text === 'default' && flags.in_case_statement))) {
	                    print_newline();
	                    if (flags.case_body || opt.jslint_happy) {
	                        // switch cases following one another
	                        deindent();
	                        flags.case_body = false;
	                    }
	                    print_token();
	                    flags.in_case = true;
	                    flags.in_case_statement = true;
	                    return;
	                }

	                if (current_token.type === 'TK_RESERVED' && current_token.text === 'function') {
	                    if (in_array(flags.last_text, ['}', ';']) || (output.just_added_newline() && !in_array(flags.last_text, ['[', '{', ':', '=', ',']))) {
	                        // make sure there is a nice clean space of at least one blank line
	                        // before a new function definition
	                        if (!output.just_added_blankline() && !current_token.comments_before.length) {
	                            print_newline();
	                            print_newline(true);
	                        }
	                    }
	                    if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD') {
	                        if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set', 'new', 'return', 'export', 'async'])) {
	                            output.space_before_token = true;
	                        } else if (last_type === 'TK_RESERVED' && flags.last_text === 'default' && last_last_text === 'export') {
	                            output.space_before_token = true;
	                        } else {
	                            print_newline();
	                        }
	                    } else if (last_type === 'TK_OPERATOR' || flags.last_text === '=') {
	                        // foo = function
	                        output.space_before_token = true;
	                    } else if (!flags.multiline_frame && (is_expression(flags.mode) || is_array(flags.mode))) {
	                        // (function
	                    } else {
	                        print_newline();
	                    }
	                }

	                if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
	                    if (!start_of_object_property()) {
	                        allow_wrap_or_preserved_newline();
	                    }
	                }

	                if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['function', 'get', 'set'])) {
	                    print_token();
	                    flags.last_word = current_token.text;
	                    return;
	                }

	                prefix = 'NONE';

	                if (last_type === 'TK_END_BLOCK') {

	                    if (!(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally', 'from']))) {
	                        prefix = 'NEWLINE';
	                    } else {
	                        if (opt.brace_style === "expand" ||
	                            opt.brace_style === "end-expand" ||
	                            (opt.brace_style === "none" && current_token.wanted_newline)) {
	                            prefix = 'NEWLINE';
	                        } else {
	                            prefix = 'SPACE';
	                            output.space_before_token = true;
	                        }
	                    }
	                } else if (last_type === 'TK_SEMICOLON' && flags.mode === MODE.BlockStatement) {
	                    // TODO: Should this be for STATEMENT as well?
	                    prefix = 'NEWLINE';
	                } else if (last_type === 'TK_SEMICOLON' && is_expression(flags.mode)) {
	                    prefix = 'SPACE';
	                } else if (last_type === 'TK_STRING') {
	                    prefix = 'NEWLINE';
	                } else if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' ||
	                    (flags.last_text === '*' && last_last_text === 'function')) {
	                    prefix = 'SPACE';
	                } else if (last_type === 'TK_START_BLOCK') {
	                    if (flags.inline_frame) {
	                        prefix = 'SPACE';
	                    } else {
	                        prefix = 'NEWLINE';
	                    }
	                } else if (last_type === 'TK_END_EXPR') {
	                    output.space_before_token = true;
	                    prefix = 'NEWLINE';
	                }

	                if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, Tokenizer.line_starters) && flags.last_text !== ')') {
	                    if (flags.last_text === 'else' || flags.last_text === 'export') {
	                        prefix = 'SPACE';
	                    } else {
	                        prefix = 'NEWLINE';
	                    }

	                }

	                if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally'])) {
	                    if (!(last_type === 'TK_END_BLOCK' && previous_flags.mode === MODE.BlockStatement) ||
	                        opt.brace_style === "expand" ||
	                        opt.brace_style === "end-expand" ||
	                        (opt.brace_style === "none" && current_token.wanted_newline)) {
	                        print_newline();
	                    } else {
	                        output.trim(true);
	                        var line = output.current_line;
	                        // If we trimmed and there's something other than a close block before us
	                        // put a newline back in.  Handles '} // comment' scenario.
	                        if (line.last() !== '}') {
	                            print_newline();
	                        }
	                        output.space_before_token = true;
	                    }
	                } else if (prefix === 'NEWLINE') {
	                    if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
	                        // no newline between 'return nnn'
	                        output.space_before_token = true;
	                    } else if (last_type !== 'TK_END_EXPR') {
	                        if ((last_type !== 'TK_START_EXPR' || !(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['var', 'let', 'const']))) && flags.last_text !== ':') {
	                            // no need to force newline on 'var': for (var x = 0...)
	                            if (current_token.type === 'TK_RESERVED' && current_token.text === 'if' && flags.last_text === 'else') {
	                                // no newline for } else if {
	                                output.space_before_token = true;
	                            } else {
	                                print_newline();
	                            }
	                        }
	                    } else if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, Tokenizer.line_starters) && flags.last_text !== ')') {
	                        print_newline();
	                    }
	                } else if (flags.multiline_frame && is_array(flags.mode) && flags.last_text === ',' && last_last_text === '}') {
	                    print_newline(); // }, in lists get a newline treatment
	                } else if (prefix === 'SPACE') {
	                    output.space_before_token = true;
	                }
	                print_token();
	                flags.last_word = current_token.text;

	                if (current_token.type === 'TK_RESERVED') {
	                    if (current_token.text === 'do') {
	                        flags.do_block = true;
	                    } else if (current_token.text === 'if') {
	                        flags.if_block = true;
	                    } else if (current_token.text === 'import') {
	                        flags.import_block = true;
	                    } else if (flags.import_block && current_token.type === 'TK_RESERVED' && current_token.text === 'from') {
	                        flags.import_block = false;
	                    }
	                }
	            }

	            function handle_semicolon() {
	                if (start_of_statement()) {
	                    // The conditional starts the statement if appropriate.
	                    // Semicolon can be the start (and end) of a statement
	                    output.space_before_token = false;
	                }
	                while (flags.mode === MODE.Statement && !flags.if_block && !flags.do_block) {
	                    restore_mode();
	                }

	                // hacky but effective for the moment
	                if (flags.import_block) {
	                    flags.import_block = false;
	                }
	                print_token();
	            }

	            function handle_string() {
	                if (start_of_statement()) {
	                    // The conditional starts the statement if appropriate.
	                    // One difference - strings want at least a space before
	                    output.space_before_token = true;
	                } else if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' || flags.inline_frame) {
	                    output.space_before_token = true;
	                } else if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
	                    if (!start_of_object_property()) {
	                        allow_wrap_or_preserved_newline();
	                    }
	                } else {
	                    print_newline();
	                }
	                print_token();
	            }

	            function handle_equals() {
	                if (start_of_statement()) {
	                    // The conditional starts the statement if appropriate.
	                }

	                if (flags.declaration_statement) {
	                    // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
	                    flags.declaration_assignment = true;
	                }
	                output.space_before_token = true;
	                print_token();
	                output.space_before_token = true;
	            }

	            function handle_comma() {
	                print_token();
	                output.space_before_token = true;
	                if (flags.declaration_statement) {
	                    if (is_expression(flags.parent.mode)) {
	                        // do not break on comma, for(var a = 1, b = 2)
	                        flags.declaration_assignment = false;
	                    }

	                    if (flags.declaration_assignment) {
	                        flags.declaration_assignment = false;
	                        print_newline(false, true);
	                    } else if (opt.comma_first) {
	                        // for comma-first, we want to allow a newline before the comma
	                        // to turn into a newline after the comma, which we will fixup later
	                        allow_wrap_or_preserved_newline();
	                    }
	                } else if (flags.mode === MODE.ObjectLiteral ||
	                    (flags.mode === MODE.Statement && flags.parent.mode === MODE.ObjectLiteral)) {
	                    if (flags.mode === MODE.Statement) {
	                        restore_mode();
	                    }

	                    if (!flags.inline_frame) {
	                        print_newline();
	                    }
	                } else if (opt.comma_first) {
	                    // EXPR or DO_BLOCK
	                    // for comma-first, we want to allow a newline before the comma
	                    // to turn into a newline after the comma, which we will fixup later
	                    allow_wrap_or_preserved_newline();
	                }
	            }

	            function handle_operator() {
	                if (start_of_statement()) {
	                    // The conditional starts the statement if appropriate.
	                }

	                if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
	                    // "return" had a special handling in TK_WORD. Now we need to return the favor
	                    output.space_before_token = true;
	                    print_token();
	                    return;
	                }

	                // hack for actionscript's import .*;
	                if (current_token.text === '*' && last_type === 'TK_DOT') {
	                    print_token();
	                    return;
	                }

	                if (current_token.text === '::') {
	                    // no spaces around exotic namespacing syntax operator
	                    print_token();
	                    return;
	                }

	                // Allow line wrapping between operators when operator_position is
	                //   set to before or preserve
	                if (last_type === 'TK_OPERATOR' && in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)) {
	                    allow_wrap_or_preserved_newline();
	                }

	                if (current_token.text === ':' && flags.in_case) {
	                    flags.case_body = true;
	                    indent();
	                    print_token();
	                    print_newline();
	                    flags.in_case = false;
	                    return;
	                }

	                var space_before = true;
	                var space_after = true;
	                var in_ternary = false;
	                var isGeneratorAsterisk = current_token.text === '*' && last_type === 'TK_RESERVED' && flags.last_text === 'function';
	                var isUnary = in_array(current_token.text, ['-', '+']) && (
	                    in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) ||
	                    in_array(flags.last_text, Tokenizer.line_starters) ||
	                    flags.last_text === ','
	                );

	                if (current_token.text === ':') {
	                    if (flags.ternary_depth === 0) {
	                        // Colon is invalid javascript outside of ternary and object, but do our best to guess what was meant.
	                        space_before = false;
	                    } else {
	                        flags.ternary_depth -= 1;
	                        in_ternary = true;
	                    }
	                } else if (current_token.text === '?') {
	                    flags.ternary_depth += 1;
	                }

	                // let's handle the operator_position option prior to any conflicting logic
	                if (!isUnary && !isGeneratorAsterisk && opt.preserve_newlines && in_array(current_token.text, Tokenizer.positionable_operators)) {
	                    var isColon = current_token.text === ':';
	                    var isTernaryColon = (isColon && in_ternary);
	                    var isOtherColon = (isColon && !in_ternary);

	                    switch (opt.operator_position) {
	                        case OPERATOR_POSITION.before_newline:
	                            // if the current token is : and it's not a ternary statement then we set space_before to false
	                            output.space_before_token = !isOtherColon;

	                            print_token();

	                            if (!isColon || isTernaryColon) {
	                                allow_wrap_or_preserved_newline();
	                            }

	                            output.space_before_token = true;
	                            return;

	                        case OPERATOR_POSITION.after_newline:
	                            // if the current token is anything but colon, or (via deduction) it's a colon and in a ternary statement,
	                            //   then print a newline.

	                            output.space_before_token = true;

	                            if (!isColon || isTernaryColon) {
	                                if (get_token(1).wanted_newline) {
	                                    print_newline(false, true);
	                                } else {
	                                    allow_wrap_or_preserved_newline();
	                                }
	                            } else {
	                                output.space_before_token = false;
	                            }

	                            print_token();

	                            output.space_before_token = true;
	                            return;

	                        case OPERATOR_POSITION.preserve_newline:
	                            if (!isOtherColon) {
	                                allow_wrap_or_preserved_newline();
	                            }

	                            // if we just added a newline, or the current token is : and it's not a ternary statement,
	                            //   then we set space_before to false
	                            space_before = !(output.just_added_newline() || isOtherColon);

	                            output.space_before_token = space_before;
	                            print_token();
	                            output.space_before_token = true;
	                            return;
	                    }
	                }

	                if (in_array(current_token.text, ['--', '++', '!', '~']) || isUnary) {
	                    // unary operators (and binary +/- pretending to be unary) special cases

	                    space_before = false;
	                    space_after = false;

	                    // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
	                    // if there is a newline between -- or ++ and anything else we should preserve it.
	                    if (current_token.wanted_newline && (current_token.text === '--' || current_token.text === '++')) {
	                        print_newline(false, true);
	                    }

	                    if (flags.last_text === ';' && is_expression(flags.mode)) {
	                        // for (;; ++i)
	                        //        ^^^
	                        space_before = true;
	                    }

	                    if (last_type === 'TK_RESERVED') {
	                        space_before = true;
	                    } else if (last_type === 'TK_END_EXPR') {
	                        space_before = !(flags.last_text === ']' && (current_token.text === '--' || current_token.text === '++'));
	                    } else if (last_type === 'TK_OPERATOR') {
	                        // a++ + ++b;
	                        // a - -b
	                        space_before = in_array(current_token.text, ['--', '-', '++', '+']) && in_array(flags.last_text, ['--', '-', '++', '+']);
	                        // + and - are not unary when preceeded by -- or ++ operator
	                        // a-- + b
	                        // a * +b
	                        // a - -b
	                        if (in_array(current_token.text, ['+', '-']) && in_array(flags.last_text, ['--', '++'])) {
	                            space_after = true;
	                        }
	                    }


	                    if (((flags.mode === MODE.BlockStatement && !flags.inline_frame) || flags.mode === MODE.Statement) &&
	                        (flags.last_text === '{' || flags.last_text === ';')) {
	                        // { foo; --i }
	                        // foo(); --bar;
	                        print_newline();
	                    }
	                } else if (isGeneratorAsterisk) {
	                    space_before = false;
	                    space_after = false;
	                }
	                output.space_before_token = output.space_before_token || space_before;
	                print_token();
	                output.space_before_token = space_after;
	            }

	            function handle_block_comment() {
	                if (output.raw) {
	                    output.add_raw_token(current_token);
	                    if (current_token.directives && current_token.directives.preserve === 'end') {
	                        // If we're testing the raw output behavior, do not allow a directive to turn it off.
	                        output.raw = opt.test_output_raw;
	                    }
	                    return;
	                }

	                if (current_token.directives) {
	                    print_newline(false, true);
	                    print_token();
	                    if (current_token.directives.preserve === 'start') {
	                        output.raw = true;
	                    }
	                    print_newline(false, true);
	                    return;
	                }

	                // inline block
	                if (!acorn.newline.test(current_token.text) && !current_token.wanted_newline) {
	                    output.space_before_token = true;
	                    print_token();
	                    output.space_before_token = true;
	                    return;
	                }

	                var lines = split_linebreaks(current_token.text);
	                var j; // iterator for this case
	                var javadoc = false;
	                var starless = false;
	                var lastIndent = current_token.whitespace_before;
	                var lastIndentLength = lastIndent.length;

	                // block comment starts with a new line
	                print_newline(false, true);
	                if (lines.length > 1) {
	                    javadoc = all_lines_start_with(lines.slice(1), '*');
	                    starless = each_line_matches_indent(lines.slice(1), lastIndent);
	                }

	                // first line always indented
	                print_token(lines[0]);
	                for (j = 1; j < lines.length; j++) {
	                    print_newline(false, true);
	                    if (javadoc) {
	                        // javadoc: reformat and re-indent
	                        print_token(' ' + ltrim(lines[j]));
	                    } else if (starless && lines[j].length > lastIndentLength) {
	                        // starless: re-indent non-empty content, avoiding trim
	                        print_token(lines[j].substring(lastIndentLength));
	                    } else {
	                        // normal comments output raw
	                        output.add_token(lines[j]);
	                    }
	                }

	                // for comments of more than one line, make sure there's a new line after
	                print_newline(false, true);
	            }

	            function handle_comment() {
	                if (current_token.wanted_newline) {
	                    print_newline(false, true);
	                } else {
	                    output.trim(true);
	                }

	                output.space_before_token = true;
	                print_token();
	                print_newline(false, true);
	            }

	            function handle_dot() {
	                if (start_of_statement()) {
	                    // The conditional starts the statement if appropriate.
	                }

	                if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
	                    output.space_before_token = true;
	                } else {
	                    // allow preserved newlines before dots in general
	                    // force newlines on dots after close paren when break_chained - for bar().baz()
	                    allow_wrap_or_preserved_newline(flags.last_text === ')' && opt.break_chained_methods);
	                }

	                print_token();
	            }

	            function handle_unknown() {
	                print_token();

	                if (current_token.text[current_token.text.length - 1] === '\n') {
	                    print_newline();
	                }
	            }

	            function handle_eof() {
	                // Unwind any open statements
	                while (flags.mode === MODE.Statement) {
	                    restore_mode();
	                }
	            }
	        }


	        function OutputLine(parent) {
	            var _character_count = 0;
	            // use indent_count as a marker for lines that have preserved indentation
	            var _indent_count = -1;

	            var _items = [];
	            var _empty = true;

	            this.set_indent = function(level) {
	                _character_count = parent.baseIndentLength + level * parent.indent_length;
	                _indent_count = level;
	            };

	            this.get_character_count = function() {
	                return _character_count;
	            };

	            this.is_empty = function() {
	                return _empty;
	            };

	            this.last = function() {
	                if (!this._empty) {
	                    return _items[_items.length - 1];
	                } else {
	                    return null;
	                }
	            };

	            this.push = function(input) {
	                _items.push(input);
	                _character_count += input.length;
	                _empty = false;
	            };

	            this.pop = function() {
	                var item = null;
	                if (!_empty) {
	                    item = _items.pop();
	                    _character_count -= item.length;
	                    _empty = _items.length === 0;
	                }
	                return item;
	            };

	            this.remove_indent = function() {
	                if (_indent_count > 0) {
	                    _indent_count -= 1;
	                    _character_count -= parent.indent_length;
	                }
	            };

	            this.trim = function() {
	                while (this.last() === ' ') {
	                    _items.pop();
	                    _character_count -= 1;
	                }
	                _empty = _items.length === 0;
	            };

	            this.toString = function() {
	                var result = '';
	                if (!this._empty) {
	                    if (_indent_count >= 0) {
	                        result = parent.indent_cache[_indent_count];
	                    }
	                    result += _items.join('');
	                }
	                return result;
	            };
	        }

	        function Output(indent_string, baseIndentString) {
	            baseIndentString = baseIndentString || '';
	            this.indent_cache = [baseIndentString];
	            this.baseIndentLength = baseIndentString.length;
	            this.indent_length = indent_string.length;
	            this.raw = false;

	            var lines = [];
	            this.baseIndentString = baseIndentString;
	            this.indent_string = indent_string;
	            this.previous_line = null;
	            this.current_line = null;
	            this.space_before_token = false;

	            this.add_outputline = function() {
	                this.previous_line = this.current_line;
	                this.current_line = new OutputLine(this);
	                lines.push(this.current_line);
	            };

	            // initialize
	            this.add_outputline();


	            this.get_line_number = function() {
	                return lines.length;
	            };

	            // Using object instead of string to allow for later expansion of info about each line
	            this.add_new_line = function(force_newline) {
	                if (this.get_line_number() === 1 && this.just_added_newline()) {
	                    return false; // no newline on start of file
	                }

	                if (force_newline || !this.just_added_newline()) {
	                    if (!this.raw) {
	                        this.add_outputline();
	                    }
	                    return true;
	                }

	                return false;
	            };

	            this.get_code = function() {
	                var sweet_code = lines.join('\n').replace(/[\r\n\t ]+$/, '');
	                return sweet_code;
	            };

	            this.set_indent = function(level) {
	                // Never indent your first output indent at the start of the file
	                if (lines.length > 1) {
	                    while (level >= this.indent_cache.length) {
	                        this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
	                    }

	                    this.current_line.set_indent(level);
	                    return true;
	                }
	                this.current_line.set_indent(0);
	                return false;
	            };

	            this.add_raw_token = function(token) {
	                for (var x = 0; x < token.newlines; x++) {
	                    this.add_outputline();
	                }
	                this.current_line.push(token.whitespace_before);
	                this.current_line.push(token.text);
	                this.space_before_token = false;
	            };

	            this.add_token = function(printable_token) {
	                this.add_space_before_token();
	                this.current_line.push(printable_token);
	            };

	            this.add_space_before_token = function() {
	                if (this.space_before_token && !this.just_added_newline()) {
	                    this.current_line.push(' ');
	                }
	                this.space_before_token = false;
	            };

	            this.remove_redundant_indentation = function(frame) {
	                // This implementation is effective but has some issues:
	                //     - can cause line wrap to happen too soon due to indent removal
	                //           after wrap points are calculated
	                // These issues are minor compared to ugly indentation.

	                if (frame.multiline_frame ||
	                    frame.mode === MODE.ForInitializer ||
	                    frame.mode === MODE.Conditional) {
	                    return;
	                }

	                // remove one indent from each line inside this section
	                var index = frame.start_line_index;

	                var output_length = lines.length;
	                while (index < output_length) {
	                    lines[index].remove_indent();
	                    index++;
	                }
	            };

	            this.trim = function(eat_newlines) {
	                eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;

	                this.current_line.trim(indent_string, baseIndentString);

	                while (eat_newlines && lines.length > 1 &&
	                    this.current_line.is_empty()) {
	                    lines.pop();
	                    this.current_line = lines[lines.length - 1];
	                    this.current_line.trim();
	                }

	                this.previous_line = lines.length > 1 ? lines[lines.length - 2] : null;
	            };

	            this.just_added_newline = function() {
	                return this.current_line.is_empty();
	            };

	            this.just_added_blankline = function() {
	                if (this.just_added_newline()) {
	                    if (lines.length === 1) {
	                        return true; // start of the file and newline = blank
	                    }

	                    var line = lines[lines.length - 2];
	                    return line.is_empty();
	                }
	                return false;
	            };
	        }


	        var Token = function(type, text, newlines, whitespace_before, parent) {
	            this.type = type;
	            this.text = text;
	            this.comments_before = [];
	            this.newlines = newlines || 0;
	            this.wanted_newline = newlines > 0;
	            this.whitespace_before = whitespace_before || '';
	            this.parent = parent || null;
	            this.opened = null;
	            this.directives = null;
	        };

	        function tokenizer(input, opts) {

	            var whitespace = "\n\r\t ".split('');
	            var digit = /[0-9]/;
	            var digit_bin = /[01]/;
	            var digit_oct = /[01234567]/;
	            var digit_hex = /[0123456789abcdefABCDEF]/;

	            this.positionable_operators = '!= !== % & && * ** + - / : < << <= == === > >= >> >>> ? ^ | ||'.split(' ');
	            var punct = this.positionable_operators.concat(
	                // non-positionable operators - these do not follow operator position settings
	                '! %= &= *= **= ++ += , -- -= /= :: <<= = => >>= >>>= ^= |= ~'.split(' '));

	            // words which should always start on new line.
	            this.line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export'.split(',');
	            var reserved_words = this.line_starters.concat(['do', 'in', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof', 'yield', 'async', 'await', 'from', 'as']);

	            //  /* ... */ comment ends with nearest */ or end of file
	            var block_comment_pattern = /([\s\S]*?)((?:\*\/)|$)/g;

	            // comment ends just before nearest linefeed or end of file
	            var comment_pattern = /([^\n\r\u2028\u2029]*)/g;

	            var directives_block_pattern = /\/\* beautify( \w+[:]\w+)+ \*\//g;
	            var directive_pattern = / (\w+)[:](\w+)/g;
	            var directives_end_ignore_pattern = /([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g;

	            var template_pattern = /((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;

	            var n_newlines, whitespace_before_token, in_html_comment, tokens, parser_pos;
	            var input_length;

	            this.tokenize = function() {
	                // cache the source's length.
	                input_length = input.length;
	                parser_pos = 0;
	                in_html_comment = false;
	                tokens = [];

	                var next, last;
	                var token_values;
	                var open = null;
	                var open_stack = [];
	                var comments = [];

	                while (!(last && last.type === 'TK_EOF')) {
	                    token_values = tokenize_next();
	                    next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
	                    while (next.type === 'TK_COMMENT' || next.type === 'TK_BLOCK_COMMENT' || next.type === 'TK_UNKNOWN') {
	                        if (next.type === 'TK_BLOCK_COMMENT') {
	                            next.directives = token_values[2];
	                        }
	                        comments.push(next);
	                        token_values = tokenize_next();
	                        next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
	                    }

	                    if (comments.length) {
	                        next.comments_before = comments;
	                        comments = [];
	                    }

	                    if (next.type === 'TK_START_BLOCK' || next.type === 'TK_START_EXPR') {
	                        next.parent = last;
	                        open_stack.push(open);
	                        open = next;
	                    } else if ((next.type === 'TK_END_BLOCK' || next.type === 'TK_END_EXPR') &&
	                        (open && (
	                            (next.text === ']' && open.text === '[') ||
	                            (next.text === ')' && open.text === '(') ||
	                            (next.text === '}' && open.text === '{')))) {
	                        next.parent = open.parent;
	                        next.opened = open;

	                        open = open_stack.pop();
	                    }

	                    tokens.push(next);
	                    last = next;
	                }

	                return tokens;
	            };

	            function get_directives(text) {
	                if (!text.match(directives_block_pattern)) {
	                    return null;
	                }

	                var directives = {};
	                directive_pattern.lastIndex = 0;
	                var directive_match = directive_pattern.exec(text);

	                while (directive_match) {
	                    directives[directive_match[1]] = directive_match[2];
	                    directive_match = directive_pattern.exec(text);
	                }

	                return directives;
	            }

	            function tokenize_next() {
	                var resulting_string;
	                var whitespace_on_this_line = [];

	                n_newlines = 0;
	                whitespace_before_token = '';

	                if (parser_pos >= input_length) {
	                    return ['', 'TK_EOF'];
	                }

	                var last_token;
	                if (tokens.length) {
	                    last_token = tokens[tokens.length - 1];
	                } else {
	                    // For the sake of tokenizing we can pretend that there was on open brace to start
	                    last_token = new Token('TK_START_BLOCK', '{');
	                }


	                var c = input.charAt(parser_pos);
	                parser_pos += 1;

	                while (in_array(c, whitespace)) {

	                    if (acorn.newline.test(c)) {
	                        if (!(c === '\n' && input.charAt(parser_pos - 2) === '\r')) {
	                            n_newlines += 1;
	                            whitespace_on_this_line = [];
	                        }
	                    } else {
	                        whitespace_on_this_line.push(c);
	                    }

	                    if (parser_pos >= input_length) {
	                        return ['', 'TK_EOF'];
	                    }

	                    c = input.charAt(parser_pos);
	                    parser_pos += 1;
	                }

	                if (whitespace_on_this_line.length) {
	                    whitespace_before_token = whitespace_on_this_line.join('');
	                }

	                if (digit.test(c) || (c === '.' && digit.test(input.charAt(parser_pos)))) {
	                    var allow_decimal = true;
	                    var allow_e = true;
	                    var local_digit = digit;

	                    if (c === '0' && parser_pos < input_length && /[XxOoBb]/.test(input.charAt(parser_pos))) {
	                        // switch to hex/oct/bin number, no decimal or e, just hex/oct/bin digits
	                        allow_decimal = false;
	                        allow_e = false;
	                        if (/[Bb]/.test(input.charAt(parser_pos))) {
	                            local_digit = digit_bin;
	                        } else if (/[Oo]/.test(input.charAt(parser_pos))) {
	                            local_digit = digit_oct;
	                        } else {
	                            local_digit = digit_hex;
	                        }
	                        c += input.charAt(parser_pos);
	                        parser_pos += 1;
	                    } else if (c === '.') {
	                        // Already have a decimal for this literal, don't allow another
	                        allow_decimal = false;
	                    } else {
	                        // we know this first loop will run.  It keeps the logic simpler.
	                        c = '';
	                        parser_pos -= 1;
	                    }

	                    // Add the digits
	                    while (parser_pos < input_length && local_digit.test(input.charAt(parser_pos))) {
	                        c += input.charAt(parser_pos);
	                        parser_pos += 1;

	                        if (allow_decimal && parser_pos < input_length && input.charAt(parser_pos) === '.') {
	                            c += input.charAt(parser_pos);
	                            parser_pos += 1;
	                            allow_decimal = false;
	                        } else if (allow_e && parser_pos < input_length && /[Ee]/.test(input.charAt(parser_pos))) {
	                            c += input.charAt(parser_pos);
	                            parser_pos += 1;

	                            if (parser_pos < input_length && /[+-]/.test(input.charAt(parser_pos))) {
	                                c += input.charAt(parser_pos);
	                                parser_pos += 1;
	                            }

	                            allow_e = false;
	                            allow_decimal = false;
	                        }
	                    }

	                    return [c, 'TK_WORD'];
	                }

	                if (acorn.isIdentifierStart(input.charCodeAt(parser_pos - 1))) {
	                    if (parser_pos < input_length) {
	                        while (acorn.isIdentifierChar(input.charCodeAt(parser_pos))) {
	                            c += input.charAt(parser_pos);
	                            parser_pos += 1;
	                            if (parser_pos === input_length) {
	                                break;
	                            }
	                        }
	                    }

	                    if (!(last_token.type === 'TK_DOT' ||
	                            (last_token.type === 'TK_RESERVED' && in_array(last_token.text, ['set', 'get']))) &&
	                        in_array(c, reserved_words)) {
	                        if (c === 'in') { // hack for 'in' operator
	                            return [c, 'TK_OPERATOR'];
	                        }
	                        return [c, 'TK_RESERVED'];
	                    }

	                    return [c, 'TK_WORD'];
	                }

	                if (c === '(' || c === '[') {
	                    return [c, 'TK_START_EXPR'];
	                }

	                if (c === ')' || c === ']') {
	                    return [c, 'TK_END_EXPR'];
	                }

	                if (c === '{') {
	                    return [c, 'TK_START_BLOCK'];
	                }

	                if (c === '}') {
	                    return [c, 'TK_END_BLOCK'];
	                }

	                if (c === ';') {
	                    return [c, 'TK_SEMICOLON'];
	                }

	                if (c === '/') {
	                    var comment = '';
	                    var comment_match;
	                    // peek for comment /* ... */
	                    if (input.charAt(parser_pos) === '*') {
	                        parser_pos += 1;
	                        block_comment_pattern.lastIndex = parser_pos;
	                        comment_match = block_comment_pattern.exec(input);
	                        comment = '/*' + comment_match[0];
	                        parser_pos += comment_match[0].length;
	                        var directives = get_directives(comment);
	                        if (directives && directives.ignore === 'start') {
	                            directives_end_ignore_pattern.lastIndex = parser_pos;
	                            comment_match = directives_end_ignore_pattern.exec(input);
	                            comment += comment_match[0];
	                            parser_pos += comment_match[0].length;
	                        }
	                        comment = comment.replace(acorn.allLineBreaks, '\n');
	                        return [comment, 'TK_BLOCK_COMMENT', directives];
	                    }
	                    // peek for comment // ...
	                    if (input.charAt(parser_pos) === '/') {
	                        parser_pos += 1;
	                        comment_pattern.lastIndex = parser_pos;
	                        comment_match = comment_pattern.exec(input);
	                        comment = '//' + comment_match[0];
	                        parser_pos += comment_match[0].length;
	                        return [comment, 'TK_COMMENT'];
	                    }

	                }

	                var startXmlRegExp = /^<([-a-zA-Z:0-9_.]+|{.+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{.+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.+?}))*\s*(\/?)\s*>/;

	                if (c === '`' || c === "'" || c === '"' || // string
	                    (
	                        (c === '/') || // regexp
	                        (opts.e4x && c === "<" && input.slice(parser_pos - 1).match(startXmlRegExp)) // xml
	                    ) && ( // regex and xml can only appear in specific locations during parsing
	                        (last_token.type === 'TK_RESERVED' && in_array(last_token.text, ['return', 'case', 'throw', 'else', 'do', 'typeof', 'yield'])) ||
	                        (last_token.type === 'TK_END_EXPR' && last_token.text === ')' &&
	                            last_token.parent && last_token.parent.type === 'TK_RESERVED' && in_array(last_token.parent.text, ['if', 'while', 'for'])) ||
	                        (in_array(last_token.type, ['TK_COMMENT', 'TK_START_EXPR', 'TK_START_BLOCK',
	                            'TK_END_BLOCK', 'TK_OPERATOR', 'TK_EQUALS', 'TK_EOF', 'TK_SEMICOLON', 'TK_COMMA'
	                        ]))
	                    )) {

	                    var sep = c,
	                        esc = false,
	                        has_char_escapes = false;

	                    resulting_string = c;

	                    if (sep === '/') {
	                        //
	                        // handle regexp
	                        //
	                        var in_char_class = false;
	                        while (parser_pos < input_length &&
	                            ((esc || in_char_class || input.charAt(parser_pos) !== sep) &&
	                                !acorn.newline.test(input.charAt(parser_pos)))) {
	                            resulting_string += input.charAt(parser_pos);
	                            if (!esc) {
	                                esc = input.charAt(parser_pos) === '\\';
	                                if (input.charAt(parser_pos) === '[') {
	                                    in_char_class = true;
	                                } else if (input.charAt(parser_pos) === ']') {
	                                    in_char_class = false;
	                                }
	                            } else {
	                                esc = false;
	                            }
	                            parser_pos += 1;
	                        }
	                    } else if (opts.e4x && sep === '<') {
	                        //
	                        // handle e4x xml literals
	                        //

	                        var xmlRegExp = /<(\/?)([-a-zA-Z:0-9_.]+|{.+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{.+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.+?}))*\s*(\/?)\s*>/g;
	                        var xmlStr = input.slice(parser_pos - 1);
	                        var match = xmlRegExp.exec(xmlStr);
	                        if (match && match.index === 0) {
	                            var rootTag = match[2];
	                            var depth = 0;
	                            while (match) {
	                                var isEndTag = !!match[1];
	                                var tagName = match[2];
	                                var isSingletonTag = (!!match[match.length - 1]) || (tagName.slice(0, 8) === "![CDATA[");
	                                if (tagName === rootTag && !isSingletonTag) {
	                                    if (isEndTag) {
	                                        --depth;
	                                    } else {
	                                        ++depth;
	                                    }
	                                }
	                                if (depth <= 0) {
	                                    break;
	                                }
	                                match = xmlRegExp.exec(xmlStr);
	                            }
	                            var xmlLength = match ? match.index + match[0].length : xmlStr.length;
	                            xmlStr = xmlStr.slice(0, xmlLength);
	                            parser_pos += xmlLength - 1;
	                            xmlStr = xmlStr.replace(acorn.allLineBreaks, '\n');
	                            return [xmlStr, "TK_STRING"];
	                        }
	                    } else {
	                        //
	                        // handle string
	                        //
	                        var parse_string = function(delimiter, allow_unescaped_newlines, start_sub) {
	                            // Template strings can travers lines without escape characters.
	                            // Other strings cannot
	                            var current_char;
	                            while (parser_pos < input_length) {
	                                current_char = input.charAt(parser_pos);
	                                if (!(esc || (current_char !== delimiter &&
	                                        (allow_unescaped_newlines || !acorn.newline.test(current_char))))) {
	                                    break;
	                                }

	                                // Handle \r\n linebreaks after escapes or in template strings
	                                if ((esc || allow_unescaped_newlines) && acorn.newline.test(current_char)) {
	                                    if (current_char === '\r' && input.charAt(parser_pos + 1) === '\n') {
	                                        parser_pos += 1;
	                                        current_char = input.charAt(parser_pos);
	                                    }
	                                    resulting_string += '\n';
	                                } else {
	                                    resulting_string += current_char;
	                                }
	                                if (esc) {
	                                    if (current_char === 'x' || current_char === 'u') {
	                                        has_char_escapes = true;
	                                    }
	                                    esc = false;
	                                } else {
	                                    esc = current_char === '\\';
	                                }

	                                parser_pos += 1;

	                                if (start_sub && resulting_string.indexOf(start_sub, resulting_string.length - start_sub.length) !== -1) {
	                                    if (delimiter === '`') {
	                                        parse_string('}', allow_unescaped_newlines, '`');
	                                    } else {
	                                        parse_string('`', allow_unescaped_newlines, '${');
	                                    }
	                                }
	                            }
	                        };

	                        if (sep === '`') {
	                            parse_string('`', true, '${');
	                        } else {
	                            parse_string(sep);
	                        }
	                    }

	                    if (has_char_escapes && opts.unescape_strings) {
	                        resulting_string = unescape_string(resulting_string);
	                    }

	                    if (parser_pos < input_length && input.charAt(parser_pos) === sep) {
	                        resulting_string += sep;
	                        parser_pos += 1;

	                        if (sep === '/') {
	                            // regexps may have modifiers /regexp/MOD , so fetch those, too
	                            // Only [gim] are valid, but if the user puts in garbage, do what we can to take it.
	                            while (parser_pos < input_length && acorn.isIdentifierStart(input.charCodeAt(parser_pos))) {
	                                resulting_string += input.charAt(parser_pos);
	                                parser_pos += 1;
	                            }
	                        }
	                    }
	                    return [resulting_string, 'TK_STRING'];
	                }

	                if (c === '#') {

	                    if (tokens.length === 0 && input.charAt(parser_pos) === '!') {
	                        // shebang
	                        resulting_string = c;
	                        while (parser_pos < input_length && c !== '\n') {
	                            c = input.charAt(parser_pos);
	                            resulting_string += c;
	                            parser_pos += 1;
	                        }
	                        return [trim(resulting_string) + '\n', 'TK_UNKNOWN'];
	                    }



	                    // Spidermonkey-specific sharp variables for circular references
	                    // https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
	                    // http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
	                    var sharp = '#';
	                    if (parser_pos < input_length && digit.test(input.charAt(parser_pos))) {
	                        do {
	                            c = input.charAt(parser_pos);
	                            sharp += c;
	                            parser_pos += 1;
	                        } while (parser_pos < input_length && c !== '#' && c !== '=');
	                        if (c === '#') {
	                            //
	                        } else if (input.charAt(parser_pos) === '[' && input.charAt(parser_pos + 1) === ']') {
	                            sharp += '[]';
	                            parser_pos += 2;
	                        } else if (input.charAt(parser_pos) === '{' && input.charAt(parser_pos + 1) === '}') {
	                            sharp += '{}';
	                            parser_pos += 2;
	                        }
	                        return [sharp, 'TK_WORD'];
	                    }
	                }

	                if (c === '<' && (input.charAt(parser_pos) === '?' || input.charAt(parser_pos) === '%')) {
	                    template_pattern.lastIndex = parser_pos - 1;
	                    var template_match = template_pattern.exec(input);
	                    if (template_match) {
	                        c = template_match[0];
	                        parser_pos += c.length - 1;
	                        c = c.replace(acorn.allLineBreaks, '\n');
	                        return [c, 'TK_STRING'];
	                    }
	                }

	                if (c === '<' && input.substring(parser_pos - 1, parser_pos + 3) === '<!--') {
	                    parser_pos += 3;
	                    c = '<!--';
	                    while (!acorn.newline.test(input.charAt(parser_pos)) && parser_pos < input_length) {
	                        c += input.charAt(parser_pos);
	                        parser_pos++;
	                    }
	                    in_html_comment = true;
	                    return [c, 'TK_COMMENT'];
	                }

	                if (c === '-' && in_html_comment && input.substring(parser_pos - 1, parser_pos + 2) === '-->') {
	                    in_html_comment = false;
	                    parser_pos += 2;
	                    return ['-->', 'TK_COMMENT'];
	                }

	                if (c === '.') {
	                    return [c, 'TK_DOT'];
	                }

	                if (in_array(c, punct)) {
	                    while (parser_pos < input_length && in_array(c + input.charAt(parser_pos), punct)) {
	                        c += input.charAt(parser_pos);
	                        parser_pos += 1;
	                        if (parser_pos >= input_length) {
	                            break;
	                        }
	                    }

	                    if (c === ',') {
	                        return [c, 'TK_COMMA'];
	                    } else if (c === '=') {
	                        return [c, 'TK_EQUALS'];
	                    } else {
	                        return [c, 'TK_OPERATOR'];
	                    }
	                }

	                return [c, 'TK_UNKNOWN'];
	            }


	            function unescape_string(s) {
	                var esc = false,
	                    out = '',
	                    pos = 0,
	                    s_hex = '',
	                    escaped = 0,
	                    c;

	                while (esc || pos < s.length) {

	                    c = s.charAt(pos);
	                    pos++;

	                    if (esc) {
	                        esc = false;
	                        if (c === 'x') {
	                            // simple hex-escape \x24
	                            s_hex = s.substr(pos, 2);
	                            pos += 2;
	                        } else if (c === 'u') {
	                            // unicode-escape, \u2134
	                            s_hex = s.substr(pos, 4);
	                            pos += 4;
	                        } else {
	                            // some common escape, e.g \n
	                            out += '\\' + c;
	                            continue;
	                        }
	                        if (!s_hex.match(/^[0123456789abcdefABCDEF]+$/)) {
	                            // some weird escaping, bail out,
	                            // leaving whole string intact
	                            return s;
	                        }

	                        escaped = parseInt(s_hex, 16);

	                        if (escaped >= 0x00 && escaped < 0x20) {
	                            // leave 0x00...0x1f escaped
	                            if (c === 'x') {
	                                out += '\\x' + s_hex;
	                            } else {
	                                out += '\\u' + s_hex;
	                            }
	                            continue;
	                        } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
	                            // single-quote, apostrophe, backslash - escape these
	                            out += '\\' + String.fromCharCode(escaped);
	                        } else if (c === 'x' && escaped > 0x7e && escaped <= 0xff) {
	                            // we bail out on \x7f..\xff,
	                            // leaving whole string escaped,
	                            // as it's probably completely binary
	                            return s;
	                        } else {
	                            out += String.fromCharCode(escaped);
	                        }
	                    } else if (c === '\\') {
	                        esc = true;
	                    } else {
	                        out += c;
	                    }
	                }
	                return out;
	            }
	        }

	        var beautifier = new Beautifier(js_source_text, options);
	        return beautifier.beautify();

	    }

	    if (true) {
	        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return { js_beautify: js_beautify };
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        // Add support for CommonJS. Just put this file somewhere on your require.paths
	        // and you will be able to `var js_beautify = require("beautify").js_beautify`.
	        exports.js_beautify = js_beautify;
	    } else if (typeof window !== "undefined") {
	        // If we're running a web page and don't have either of the above, add our one global
	        window.js_beautify = js_beautify;
	    } else if (typeof global !== "undefined") {
	        // If we don't even have window, try global.
	        global.js_beautify = js_beautify;
	    }

	}());

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
	/*

	  The MIT License (MIT)

	  Copyright (c) 2007-2013 Einar Lielmanis and contributors.

	  Permission is hereby granted, free of charge, to any person
	  obtaining a copy of this software and associated documentation files
	  (the "Software"), to deal in the Software without restriction,
	  including without limitation the rights to use, copy, modify, merge,
	  publish, distribute, sublicense, and/or sell copies of the Software,
	  and to permit persons to whom the Software is furnished to do so,
	  subject to the following conditions:

	  The above copyright notice and this permission notice shall be
	  included in all copies or substantial portions of the Software.

	  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
	  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	  SOFTWARE.


	 CSS Beautifier
	---------------

	    Written by Harutyun Amirjanyan, (amirjanyan@gmail.com)

	    Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
	        http://jsbeautifier.org/

	    Usage:
	        css_beautify(source_text);
	        css_beautify(source_text, options);

	    The options are (default in brackets):
	        indent_size (4)                         — indentation size,
	        indent_char (space)                     — character to indent with,
	        selector_separator_newline (true)       - separate selectors with newline or
	                                                  not (e.g. "a,\nbr" or "a, br")
	        end_with_newline (false)                - end with a newline
	        newline_between_rules (true)            - add a new line after every css rule
	        space_around_selector_separator (false) - ensure space around selector separators:
	                                                  '>', '+', '~' (e.g. "a>b" -> "a > b")
	    e.g

	    css_beautify(css_source_text, {
	      'indent_size': 1,
	      'indent_char': '\t',
	      'selector_separator': ' ',
	      'end_with_newline': false,
	      'newline_between_rules': true,
	      'space_around_selector_separator': true
	    });
	*/

	// http://www.w3.org/TR/CSS21/syndata.html#tokenization
	// http://www.w3.org/TR/css3-syntax/

	(function() {
	    function css_beautify(source_text, options) {
	        options = options || {};
	        source_text = source_text || '';
	        // HACK: newline parsing inconsistent. This brute force normalizes the input.
	        source_text = source_text.replace(/\r\n|[\r\u2028\u2029]/g, '\n');

	        var indentSize = options.indent_size || 4;
	        var indentCharacter = options.indent_char || ' ';
	        var selectorSeparatorNewline = (options.selector_separator_newline === undefined) ? true : options.selector_separator_newline;
	        var end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
	        var newline_between_rules = (options.newline_between_rules === undefined) ? true : options.newline_between_rules;
	        var spaceAroundSelectorSeparator = (options.space_around_selector_separator === undefined) ? false : options.space_around_selector_separator;
	        var eol = options.eol ? options.eol : '\n';

	        // compatibility
	        if (typeof indentSize === "string") {
	            indentSize = parseInt(indentSize, 10);
	        }

	        if (options.indent_with_tabs) {
	            indentCharacter = '\t';
	            indentSize = 1;
	        }

	        eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');


	        // tokenizer
	        var whiteRe = /^\s+$/;

	        var pos = -1,
	            ch;
	        var parenLevel = 0;

	        function next() {
	            ch = source_text.charAt(++pos);
	            return ch || '';
	        }

	        function peek(skipWhitespace) {
	            var result = '';
	            var prev_pos = pos;
	            if (skipWhitespace) {
	                eatWhitespace();
	            }
	            result = source_text.charAt(pos + 1) || '';
	            pos = prev_pos - 1;
	            next();
	            return result;
	        }

	        function eatString(endChars) {
	            var start = pos;
	            while (next()) {
	                if (ch === "\\") {
	                    next();
	                } else if (endChars.indexOf(ch) !== -1) {
	                    break;
	                } else if (ch === "\n") {
	                    break;
	                }
	            }
	            return source_text.substring(start, pos + 1);
	        }

	        function peekString(endChar) {
	            var prev_pos = pos;
	            var str = eatString(endChar);
	            pos = prev_pos - 1;
	            next();
	            return str;
	        }

	        function eatWhitespace() {
	            var result = '';
	            while (whiteRe.test(peek())) {
	                next();
	                result += ch;
	            }
	            return result;
	        }

	        function skipWhitespace() {
	            var result = '';
	            if (ch && whiteRe.test(ch)) {
	                result = ch;
	            }
	            while (whiteRe.test(next())) {
	                result += ch;
	            }
	            return result;
	        }

	        function eatComment(singleLine) {
	            var start = pos;
	            singleLine = peek() === "/";
	            next();
	            while (next()) {
	                if (!singleLine && ch === "*" && peek() === "/") {
	                    next();
	                    break;
	                } else if (singleLine && ch === "\n") {
	                    return source_text.substring(start, pos);
	                }
	            }

	            return source_text.substring(start, pos) + ch;
	        }


	        function lookBack(str) {
	            return source_text.substring(pos - str.length, pos).toLowerCase() ===
	                str;
	        }

	        // Nested pseudo-class if we are insideRule
	        // and the next special character found opens
	        // a new block
	        function foundNestedPseudoClass() {
	            var openParen = 0;
	            for (var i = pos + 1; i < source_text.length; i++) {
	                var ch = source_text.charAt(i);
	                if (ch === "{") {
	                    return true;
	                } else if (ch === '(') {
	                    // pseudoclasses can contain ()
	                    openParen += 1;
	                } else if (ch === ')') {
	                    if (openParen === 0) {
	                        return false;
	                    }
	                    openParen -= 1;
	                } else if (ch === ";" || ch === "}") {
	                    return false;
	                }
	            }
	            return false;
	        }

	        // printer
	        var basebaseIndentString = source_text.match(/^[\t ]*/)[0];
	        var singleIndent = new Array(indentSize + 1).join(indentCharacter);
	        var indentLevel = 0;
	        var nestedLevel = 0;

	        function indent() {
	            indentLevel++;
	            basebaseIndentString += singleIndent;
	        }

	        function outdent() {
	            indentLevel--;
	            basebaseIndentString = basebaseIndentString.slice(0, -indentSize);
	        }

	        var print = {};
	        print["{"] = function(ch) {
	            print.singleSpace();
	            output.push(ch);
	            print.newLine();
	        };
	        print["}"] = function(ch) {
	            print.newLine();
	            output.push(ch);
	            print.newLine();
	        };

	        print._lastCharWhitespace = function() {
	            return whiteRe.test(output[output.length - 1]);
	        };

	        print.newLine = function(keepWhitespace) {
	            if (output.length) {
	                if (!keepWhitespace && output[output.length - 1] !== '\n') {
	                    print.trim();
	                }

	                output.push('\n');

	                if (basebaseIndentString) {
	                    output.push(basebaseIndentString);
	                }
	            }
	        };
	        print.singleSpace = function() {
	            if (output.length && !print._lastCharWhitespace()) {
	                output.push(' ');
	            }
	        };

	        print.preserveSingleSpace = function() {
	            if (isAfterSpace) {
	                print.singleSpace();
	            }
	        };

	        print.trim = function() {
	            while (print._lastCharWhitespace()) {
	                output.pop();
	            }
	        };


	        var output = [];
	        /*_____________________--------------------_____________________*/

	        var insideRule = false;
	        var insidePropertyValue = false;
	        var enteringConditionalGroup = false;
	        var top_ch = '';
	        var last_top_ch = '';

	        while (true) {
	            var whitespace = skipWhitespace();
	            var isAfterSpace = whitespace !== '';
	            var isAfterNewline = whitespace.indexOf('\n') !== -1;
	            last_top_ch = top_ch;
	            top_ch = ch;

	            if (!ch) {
	                break;
	            } else if (ch === '/' && peek() === '*') { /* css comment */
	                var header = indentLevel === 0;

	                if (isAfterNewline || header) {
	                    print.newLine();
	                }

	                output.push(eatComment());
	                print.newLine();
	                if (header) {
	                    print.newLine(true);
	                }
	            } else if (ch === '/' && peek() === '/') { // single line comment
	                if (!isAfterNewline && last_top_ch !== '{') {
	                    print.trim();
	                }
	                print.singleSpace();
	                output.push(eatComment());
	                print.newLine();
	            } else if (ch === '@') {
	                print.preserveSingleSpace();

	                // deal with less propery mixins @{...}
	                if (peek() === '{') {
	                    output.push(eatString('}'));
	                } else {
	                    output.push(ch);

	                    // strip trailing space, if present, for hash property checks
	                    var variableOrRule = peekString(": ,;{}()[]/='\"");

	                    if (variableOrRule.match(/[ :]$/)) {
	                        // we have a variable or pseudo-class, add it and insert one space before continuing
	                        next();
	                        variableOrRule = eatString(": ").replace(/\s$/, '');
	                        output.push(variableOrRule);
	                        print.singleSpace();
	                    }

	                    variableOrRule = variableOrRule.replace(/\s$/, '');

	                    // might be a nesting at-rule
	                    if (variableOrRule in css_beautify.NESTED_AT_RULE) {
	                        nestedLevel += 1;
	                        if (variableOrRule in css_beautify.CONDITIONAL_GROUP_RULE) {
	                            enteringConditionalGroup = true;
	                        }
	                    }
	                }
	            } else if (ch === '#' && peek() === '{') {
	                print.preserveSingleSpace();
	                output.push(eatString('}'));
	            } else if (ch === '{') {
	                if (peek(true) === '}') {
	                    eatWhitespace();
	                    next();
	                    print.singleSpace();
	                    output.push("{}");
	                    print.newLine();
	                    if (newline_between_rules && indentLevel === 0) {
	                        print.newLine(true);
	                    }
	                } else {
	                    indent();
	                    print["{"](ch);
	                    // when entering conditional groups, only rulesets are allowed
	                    if (enteringConditionalGroup) {
	                        enteringConditionalGroup = false;
	                        insideRule = (indentLevel > nestedLevel);
	                    } else {
	                        // otherwise, declarations are also allowed
	                        insideRule = (indentLevel >= nestedLevel);
	                    }
	                }
	            } else if (ch === '}') {
	                outdent();
	                print["}"](ch);
	                insideRule = false;
	                insidePropertyValue = false;
	                if (nestedLevel) {
	                    nestedLevel--;
	                }
	                if (newline_between_rules && indentLevel === 0) {
	                    print.newLine(true);
	                }
	            } else if (ch === ":") {
	                eatWhitespace();
	                if ((insideRule || enteringConditionalGroup) &&
	                    !(lookBack("&") || foundNestedPseudoClass())) {
	                    // 'property: value' delimiter
	                    // which could be in a conditional group query
	                    insidePropertyValue = true;
	                    output.push(':');
	                    print.singleSpace();
	                } else {
	                    // sass/less parent reference don't use a space
	                    // sass nested pseudo-class don't use a space
	                    if (peek() === ":") {
	                        // pseudo-element
	                        next();
	                        output.push("::");
	                    } else {
	                        // pseudo-class
	                        output.push(':');
	                    }
	                }
	            } else if (ch === '"' || ch === '\'') {
	                print.preserveSingleSpace();
	                output.push(eatString(ch));
	            } else if (ch === ';') {
	                insidePropertyValue = false;
	                output.push(ch);
	                print.newLine();
	            } else if (ch === '(') { // may be a url
	                if (lookBack("url")) {
	                    output.push(ch);
	                    eatWhitespace();
	                    if (next()) {
	                        if (ch !== ')' && ch !== '"' && ch !== '\'') {
	                            output.push(eatString(')'));
	                        } else {
	                            pos--;
	                        }
	                    }
	                } else {
	                    parenLevel++;
	                    print.preserveSingleSpace();
	                    output.push(ch);
	                    eatWhitespace();
	                }
	            } else if (ch === ')') {
	                output.push(ch);
	                parenLevel--;
	            } else if (ch === ',') {
	                output.push(ch);
	                eatWhitespace();
	                if (selectorSeparatorNewline && !insidePropertyValue && parenLevel < 1) {
	                    print.newLine();
	                } else {
	                    print.singleSpace();
	                }
	            } else if (ch === '>' || ch === '+' || ch === '~') {
	                //handl selector separator spacing
	                if (spaceAroundSelectorSeparator && !insidePropertyValue && parenLevel < 1) {
	                    print.singleSpace();
	                    output.push(ch);
	                    print.singleSpace();
	                } else {
	                    output.push(ch);
	                }
	            } else if (ch === ']') {
	                output.push(ch);
	            } else if (ch === '[') {
	                print.preserveSingleSpace();
	                output.push(ch);
	            } else if (ch === '=') { // no whitespace before or after
	                eatWhitespace();
	                ch = '=';
	                output.push(ch);
	            } else {
	                print.preserveSingleSpace();
	                output.push(ch);
	            }
	        }


	        var sweetCode = '';
	        if (basebaseIndentString) {
	            sweetCode += basebaseIndentString;
	        }

	        sweetCode += output.join('').replace(/[\r\n\t ]+$/, '');

	        // establish end_with_newline
	        if (end_with_newline) {
	            sweetCode += '\n';
	        }

	        if (eol !== '\n') {
	            sweetCode = sweetCode.replace(/[\n]/g, eol);
	        }

	        return sweetCode;
	    }

	    // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
	    css_beautify.NESTED_AT_RULE = {
	        "@page": true,
	        "@font-face": true,
	        "@keyframes": true,
	        // also in CONDITIONAL_GROUP_RULE below
	        "@media": true,
	        "@supports": true,
	        "@document": true
	    };
	    css_beautify.CONDITIONAL_GROUP_RULE = {
	        "@media": true,
	        "@supports": true,
	        "@document": true
	    };

	    /*global define */
	    if (true) {
	        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return {
	                css_beautify: css_beautify
	            };
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        // Add support for CommonJS. Just put this file somewhere on your require.paths
	        // and you will be able to `var html_beautify = require("beautify").html_beautify`.
	        exports.css_beautify = css_beautify;
	    } else if (typeof window !== "undefined") {
	        // If we're running a web page and don't have either of the above, add our one global
	        window.css_beautify = css_beautify;
	    } else if (typeof global !== "undefined") {
	        // If we don't even have window, try global.
	        global.css_beautify = css_beautify;
	    }

	}());

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
	/*

	  The MIT License (MIT)

	  Copyright (c) 2007-2013 Einar Lielmanis and contributors.

	  Permission is hereby granted, free of charge, to any person
	  obtaining a copy of this software and associated documentation files
	  (the "Software"), to deal in the Software without restriction,
	  including without limitation the rights to use, copy, modify, merge,
	  publish, distribute, sublicense, and/or sell copies of the Software,
	  and to permit persons to whom the Software is furnished to do so,
	  subject to the following conditions:

	  The above copyright notice and this permission notice shall be
	  included in all copies or substantial portions of the Software.

	  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
	  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	  SOFTWARE.


	 Style HTML
	---------------

	  Written by Nochum Sossonko, (nsossonko@hotmail.com)

	  Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
	    http://jsbeautifier.org/

	  Usage:
	    style_html(html_source);

	    style_html(html_source, options);

	  The options are:
	    indent_inner_html (default false)  — indent <head> and <body> sections,
	    indent_size (default 4)          — indentation size,
	    indent_char (default space)      — character to indent with,
	    wrap_line_length (default 250)            -  maximum amount of characters per line (0 = disable)
	    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none"
	            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
	    unformatted (defaults to inline tags) - list of tags, that shouldn't be reformatted
	    indent_scripts (default normal)  - "keep"|"separate"|"normal"
	    preserve_newlines (default true) - whether existing line breaks before elements should be preserved
	                                        Only works before elements, not inside tags or for text.
	    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk
	    indent_handlebars (default false) - format and indent {{#foo}} and {{/foo}}
	    end_with_newline (false)          - end with a newline
	    extra_liners (default [head,body,/html]) -List of tags that should have an extra newline before them.

	    e.g.

	    style_html(html_source, {
	      'indent_inner_html': false,
	      'indent_size': 2,
	      'indent_char': ' ',
	      'wrap_line_length': 78,
	      'brace_style': 'expand',
	      'preserve_newlines': true,
	      'max_preserve_newlines': 5,
	      'indent_handlebars': false,
	      'extra_liners': ['/html']
	    });
	*/

	(function() {

	    // function trim(s) {
	    //     return s.replace(/^\s+|\s+$/g, '');
	    // }

	    function ltrim(s) {
	        return s.replace(/^\s+/g, '');
	    }

	    function rtrim(s) {
	        return s.replace(/\s+$/g, '');
	    }

	    function style_html(html_source, options, js_beautify, css_beautify) {
	        //Wrapper function to invoke all the necessary constructors and deal with the output.

	        var multi_parser,
	            indent_inner_html,
	            indent_size,
	            indent_character,
	            wrap_line_length,
	            brace_style,
	            unformatted,
	            preserve_newlines,
	            max_preserve_newlines,
	            indent_handlebars,
	            wrap_attributes,
	            wrap_attributes_indent_size,
	            end_with_newline,
	            extra_liners,
	            eol;

	        options = options || {};

	        // backwards compatibility to 1.3.4
	        if ((options.wrap_line_length === undefined || parseInt(options.wrap_line_length, 10) === 0) &&
	            (options.max_char !== undefined && parseInt(options.max_char, 10) !== 0)) {
	            options.wrap_line_length = options.max_char;
	        }

	        indent_inner_html = (options.indent_inner_html === undefined) ? false : options.indent_inner_html;
	        indent_size = (options.indent_size === undefined) ? 4 : parseInt(options.indent_size, 10);
	        indent_character = (options.indent_char === undefined) ? ' ' : options.indent_char;
	        brace_style = (options.brace_style === undefined) ? 'collapse' : options.brace_style;
	        wrap_line_length = parseInt(options.wrap_line_length, 10) === 0 ? 32786 : parseInt(options.wrap_line_length || 250, 10);
	        unformatted = options.unformatted || [
	            // https://www.w3.org/TR/html5/dom.html#phrasing-content
	            'a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite',
	            'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img',
	            'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript',
	            'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', /* 'script', */ 'select', 'small',
	            'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var',
	            'video', 'wbr', 'text',
	            // prexisting - not sure of full effect of removing, leaving in
	            'acronym', 'address', 'big', 'dt', 'ins', 'small', 'strike', 'tt',
	            'pre',
	            'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
	        ];
	        preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
	        max_preserve_newlines = preserve_newlines ?
	            (isNaN(parseInt(options.max_preserve_newlines, 10)) ? 32786 : parseInt(options.max_preserve_newlines, 10)) :
	            0;
	        indent_handlebars = (options.indent_handlebars === undefined) ? false : options.indent_handlebars;
	        wrap_attributes = (options.wrap_attributes === undefined) ? 'auto' : options.wrap_attributes;
	        wrap_attributes_indent_size = (isNaN(parseInt(options.wrap_attributes_indent_size, 10))) ? indent_size : parseInt(options.wrap_attributes_indent_size, 10);
	        end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
	        extra_liners = (typeof options.extra_liners === 'object') && options.extra_liners ?
	            options.extra_liners.concat() : (typeof options.extra_liners === 'string') ?
	            options.extra_liners.split(',') : 'head,body,/html'.split(',');
	        eol = options.eol ? options.eol : '\n';

	        if (options.indent_with_tabs) {
	            indent_character = '\t';
	            indent_size = 1;
	        }

	        eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

	        function Parser() {

	            this.pos = 0; //Parser position
	            this.token = '';
	            this.current_mode = 'CONTENT'; //reflects the current Parser mode: TAG/CONTENT
	            this.tags = { //An object to hold tags, their position, and their parent-tags, initiated with default values
	                parent: 'parent1',
	                parentcount: 1,
	                parent1: ''
	            };
	            this.tag_type = '';
	            this.token_text = this.last_token = this.last_text = this.token_type = '';
	            this.newlines = 0;
	            this.indent_content = indent_inner_html;

	            this.Utils = { //Uilities made available to the various functions
	                whitespace: "\n\r\t ".split(''),

	                single_token: [
	                    // HTLM void elements - aka self-closing tags - aka singletons
	                    // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
	                    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen',
	                    'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr',
	                    // NOTE: Optional tags - are not understood.
	                    // https://www.w3.org/TR/html5/syntax.html#optional-tags
	                    // The rules for optional tags are too complex for a simple list
	                    // Also, the content of these tags should still be indented in many cases.
	                    // 'li' is a good exmple.

	                    // Doctype and xml elements
	                    '!doctype', '?xml',
	                    // ?php tag
	                    '?php',
	                    // other tags that were in this list, keeping just in case
	                    'basefont', 'isindex'
	                ],
	                extra_liners: extra_liners, //for tags that need a line of whitespace before them
	                in_array: function(what, arr) {
	                    for (var i = 0; i < arr.length; i++) {
	                        if (what === arr[i]) {
	                            return true;
	                        }
	                    }
	                    return false;
	                }
	            };

	            // Return true if the given text is composed entirely of whitespace.
	            this.is_whitespace = function(text) {
	                for (var n = 0; n < text.length; n++) {
	                    if (!this.Utils.in_array(text.charAt(n), this.Utils.whitespace)) {
	                        return false;
	                    }
	                }
	                return true;
	            };

	            this.traverse_whitespace = function() {
	                var input_char = '';

	                input_char = this.input.charAt(this.pos);
	                if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
	                    this.newlines = 0;
	                    while (this.Utils.in_array(input_char, this.Utils.whitespace)) {
	                        if (preserve_newlines && input_char === '\n' && this.newlines <= max_preserve_newlines) {
	                            this.newlines += 1;
	                        }

	                        this.pos++;
	                        input_char = this.input.charAt(this.pos);
	                    }
	                    return true;
	                }
	                return false;
	            };

	            // Append a space to the given content (string array) or, if we are
	            // at the wrap_line_length, append a newline/indentation.
	            // return true if a newline was added, false if a space was added
	            this.space_or_wrap = function(content) {
	                if (this.line_char_count >= this.wrap_line_length) { //insert a line when the wrap_line_length is reached
	                    this.print_newline(false, content);
	                    this.print_indentation(content);
	                    return true;
	                } else {
	                    this.line_char_count++;
	                    content.push(' ');
	                    return false;
	                }
	            };

	            this.get_content = function() { //function to capture regular content between tags
	                var input_char = '',
	                    content = [];

	                while (this.input.charAt(this.pos) !== '<') {
	                    if (this.pos >= this.input.length) {
	                        return content.length ? content.join('') : ['', 'TK_EOF'];
	                    }

	                    if (this.traverse_whitespace()) {
	                        this.space_or_wrap(content);
	                        continue;
	                    }

	                    if (indent_handlebars) {
	                        // Handlebars parsing is complicated.
	                        // {{#foo}} and {{/foo}} are formatted tags.
	                        // {{something}} should get treated as content, except:
	                        // {{else}} specifically behaves like {{#if}} and {{/if}}
	                        var peek3 = this.input.substr(this.pos, 3);
	                        if (peek3 === '{{#' || peek3 === '{{/') {
	                            // These are tags and not content.
	                            break;
	                        } else if (peek3 === '{{!') {
	                            return [this.get_tag(), 'TK_TAG_HANDLEBARS_COMMENT'];
	                        } else if (this.input.substr(this.pos, 2) === '{{') {
	                            if (this.get_tag(true) === '{{else}}') {
	                                break;
	                            }
	                        }
	                    }

	                    input_char = this.input.charAt(this.pos);
	                    this.pos++;
	                    this.line_char_count++;
	                    content.push(input_char); //letter at-a-time (or string) inserted to an array
	                }
	                return content.length ? content.join('') : '';
	            };

	            this.get_contents_to = function(name) { //get the full content of a script or style to pass to js_beautify
	                if (this.pos === this.input.length) {
	                    return ['', 'TK_EOF'];
	                }
	                var content = '';
	                var reg_match = new RegExp('</' + name + '\\s*>', 'igm');
	                reg_match.lastIndex = this.pos;
	                var reg_array = reg_match.exec(this.input);
	                var end_script = reg_array ? reg_array.index : this.input.length; //absolute end of script
	                if (this.pos < end_script) { //get everything in between the script tags
	                    content = this.input.substring(this.pos, end_script);
	                    this.pos = end_script;
	                }
	                return content;
	            };

	            this.record_tag = function(tag) { //function to record a tag and its parent in this.tags Object
	                if (this.tags[tag + 'count']) { //check for the existence of this tag type
	                    this.tags[tag + 'count']++;
	                    this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
	                } else { //otherwise initialize this tag type
	                    this.tags[tag + 'count'] = 1;
	                    this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
	                }
	                this.tags[tag + this.tags[tag + 'count'] + 'parent'] = this.tags.parent; //set the parent (i.e. in the case of a div this.tags.div1parent)
	                this.tags.parent = tag + this.tags[tag + 'count']; //and make this the current parent (i.e. in the case of a div 'div1')
	            };

	            this.retrieve_tag = function(tag) { //function to retrieve the opening tag to the corresponding closer
	                if (this.tags[tag + 'count']) { //if the openener is not in the Object we ignore it
	                    var temp_parent = this.tags.parent; //check to see if it's a closable tag.
	                    while (temp_parent) { //till we reach '' (the initial value);
	                        if (tag + this.tags[tag + 'count'] === temp_parent) { //if this is it use it
	                            break;
	                        }
	                        temp_parent = this.tags[temp_parent + 'parent']; //otherwise keep on climbing up the DOM Tree
	                    }
	                    if (temp_parent) { //if we caught something
	                        this.indent_level = this.tags[tag + this.tags[tag + 'count']]; //set the indent_level accordingly
	                        this.tags.parent = this.tags[temp_parent + 'parent']; //and set the current parent
	                    }
	                    delete this.tags[tag + this.tags[tag + 'count'] + 'parent']; //delete the closed tags parent reference...
	                    delete this.tags[tag + this.tags[tag + 'count']]; //...and the tag itself
	                    if (this.tags[tag + 'count'] === 1) {
	                        delete this.tags[tag + 'count'];
	                    } else {
	                        this.tags[tag + 'count']--;
	                    }
	                }
	            };

	            this.indent_to_tag = function(tag) {
	                // Match the indentation level to the last use of this tag, but don't remove it.
	                if (!this.tags[tag + 'count']) {
	                    return;
	                }
	                var temp_parent = this.tags.parent;
	                while (temp_parent) {
	                    if (tag + this.tags[tag + 'count'] === temp_parent) {
	                        break;
	                    }
	                    temp_parent = this.tags[temp_parent + 'parent'];
	                }
	                if (temp_parent) {
	                    this.indent_level = this.tags[tag + this.tags[tag + 'count']];
	                }
	            };

	            this.get_tag = function(peek) { //function to get a full tag and parse its type
	                var input_char = '',
	                    content = [],
	                    comment = '',
	                    space = false,
	                    first_attr = true,
	                    tag_start, tag_end,
	                    tag_start_char,
	                    orig_pos = this.pos,
	                    orig_line_char_count = this.line_char_count;

	                peek = peek !== undefined ? peek : false;

	                do {
	                    if (this.pos >= this.input.length) {
	                        if (peek) {
	                            this.pos = orig_pos;
	                            this.line_char_count = orig_line_char_count;
	                        }
	                        return content.length ? content.join('') : ['', 'TK_EOF'];
	                    }

	                    input_char = this.input.charAt(this.pos);
	                    this.pos++;

	                    if (this.Utils.in_array(input_char, this.Utils.whitespace)) { //don't want to insert unnecessary space
	                        space = true;
	                        continue;
	                    }

	                    if (input_char === "'" || input_char === '"') {
	                        input_char += this.get_unformatted(input_char);
	                        space = true;

	                    }

	                    if (input_char === '=') { //no space before =
	                        space = false;
	                    }

	                    if (content.length && content[content.length - 1] !== '=' && input_char !== '>' && space) {
	                        //no space after = or before >
	                        var wrapped = this.space_or_wrap(content);
	                        var indentAttrs = wrapped && input_char !== '/' && wrap_attributes !== 'force';
	                        space = false;
	                        if (!first_attr && wrap_attributes === 'force' && input_char !== '/') {
	                            this.print_newline(false, content);
	                            this.print_indentation(content);
	                            indentAttrs = true;
	                        }
	                        if (indentAttrs) {
	                            //indent attributes an auto or forced line-wrap
	                            for (var count = 0; count < wrap_attributes_indent_size; count++) {
	                                content.push(indent_character);
	                            }
	                        }
	                        for (var i = 0; i < content.length; i++) {
	                            if (content[i] === ' ') {
	                                first_attr = false;
	                                break;
	                            }
	                        }
	                    }

	                    if (indent_handlebars && tag_start_char === '<') {
	                        // When inside an angle-bracket tag, put spaces around
	                        // handlebars not inside of strings.
	                        if ((input_char + this.input.charAt(this.pos)) === '{{') {
	                            input_char += this.get_unformatted('}}');
	                            if (content.length && content[content.length - 1] !== ' ' && content[content.length - 1] !== '<') {
	                                input_char = ' ' + input_char;
	                            }
	                            space = true;
	                        }
	                    }

	                    if (input_char === '<' && !tag_start_char) {
	                        tag_start = this.pos - 1;
	                        tag_start_char = '<';
	                    }

	                    if (indent_handlebars && !tag_start_char) {
	                        if (content.length >= 2 && content[content.length - 1] === '{' && content[content.length - 2] === '{') {
	                            if (input_char === '#' || input_char === '/' || input_char === '!') {
	                                tag_start = this.pos - 3;
	                            } else {
	                                tag_start = this.pos - 2;
	                            }
	                            tag_start_char = '{';
	                        }
	                    }

	                    this.line_char_count++;
	                    content.push(input_char); //inserts character at-a-time (or string)

	                    if (content[1] && (content[1] === '!' || content[1] === '?' || content[1] === '%')) { //if we're in a comment, do something special
	                        // We treat all comments as literals, even more than preformatted tags
	                        // we just look for the appropriate close tag
	                        content = [this.get_comment(tag_start)];
	                        break;
	                    }

	                    if (indent_handlebars && content[1] && content[1] === '{' && content[2] && content[2] === '!') { //if we're in a comment, do something special
	                        // We treat all comments as literals, even more than preformatted tags
	                        // we just look for the appropriate close tag
	                        content = [this.get_comment(tag_start)];
	                        break;
	                    }

	                    if (indent_handlebars && tag_start_char === '{' && content.length > 2 && content[content.length - 2] === '}' && content[content.length - 1] === '}') {
	                        break;
	                    }
	                } while (input_char !== '>');

	                var tag_complete = content.join('');
	                var tag_index;
	                var tag_offset;

	                if (tag_complete.indexOf(' ') !== -1) { //if there's whitespace, thats where the tag name ends
	                    tag_index = tag_complete.indexOf(' ');
	                } else if (tag_complete.charAt(0) === '{') {
	                    tag_index = tag_complete.indexOf('}');
	                } else { //otherwise go with the tag ending
	                    tag_index = tag_complete.indexOf('>');
	                }
	                if (tag_complete.charAt(0) === '<' || !indent_handlebars) {
	                    tag_offset = 1;
	                } else {
	                    tag_offset = tag_complete.charAt(2) === '#' ? 3 : 2;
	                }
	                var tag_check = tag_complete.substring(tag_offset, tag_index).toLowerCase();
	                if (tag_complete.charAt(tag_complete.length - 2) === '/' ||
	                    this.Utils.in_array(tag_check, this.Utils.single_token)) { //if this tag name is a single tag type (either in the list or has a closing /)
	                    if (!peek) {
	                        this.tag_type = 'SINGLE';
	                    }
	                } else if (indent_handlebars && tag_complete.charAt(0) === '{' && tag_check === 'else') {
	                    if (!peek) {
	                        this.indent_to_tag('if');
	                        this.tag_type = 'HANDLEBARS_ELSE';
	                        this.indent_content = true;
	                        this.traverse_whitespace();
	                    }
	                } else if (this.is_unformatted(tag_check, unformatted)) { // do not reformat the "unformatted" tags
	                    comment = this.get_unformatted('</' + tag_check + '>', tag_complete); //...delegate to get_unformatted function
	                    content.push(comment);
	                    tag_end = this.pos - 1;
	                    this.tag_type = 'SINGLE';
	                } else if (tag_check === 'script' &&
	                    (tag_complete.search('type') === -1 ||
	                        (tag_complete.search('type') > -1 &&
	                            tag_complete.search(/\b(text|application)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json)/) > -1))) {
	                    if (!peek) {
	                        this.record_tag(tag_check);
	                        this.tag_type = 'SCRIPT';
	                    }
	                } else if (tag_check === 'style' &&
	                    (tag_complete.search('type') === -1 ||
	                        (tag_complete.search('type') > -1 && tag_complete.search('text/css') > -1))) {
	                    if (!peek) {
	                        this.record_tag(tag_check);
	                        this.tag_type = 'STYLE';
	                    }
	                } else if (tag_check.charAt(0) === '!') { //peek for <! comment
	                    // for comments content is already correct.
	                    if (!peek) {
	                        this.tag_type = 'SINGLE';
	                        this.traverse_whitespace();
	                    }
	                } else if (!peek) {
	                    if (tag_check.charAt(0) === '/') { //this tag is a double tag so check for tag-ending
	                        this.retrieve_tag(tag_check.substring(1)); //remove it and all ancestors
	                        this.tag_type = 'END';
	                    } else { //otherwise it's a start-tag
	                        this.record_tag(tag_check); //push it on the tag stack
	                        if (tag_check.toLowerCase() !== 'html') {
	                            this.indent_content = true;
	                        }
	                        this.tag_type = 'START';
	                    }

	                    // Allow preserving of newlines after a start or end tag
	                    if (this.traverse_whitespace()) {
	                        this.space_or_wrap(content);
	                    }

	                    if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) { //check if this double needs an extra line
	                        this.print_newline(false, this.output);
	                        if (this.output.length && this.output[this.output.length - 2] !== '\n') {
	                            this.print_newline(true, this.output);
	                        }
	                    }
	                }

	                if (peek) {
	                    this.pos = orig_pos;
	                    this.line_char_count = orig_line_char_count;
	                }

	                return content.join(''); //returns fully formatted tag
	            };

	            this.get_comment = function(start_pos) { //function to return comment content in its entirety
	                // this is will have very poor perf, but will work for now.
	                var comment = '',
	                    delimiter = '>',
	                    matched = false;

	                this.pos = start_pos;
	                var input_char = this.input.charAt(this.pos);
	                this.pos++;

	                while (this.pos <= this.input.length) {
	                    comment += input_char;

	                    // only need to check for the delimiter if the last chars match
	                    if (comment.charAt(comment.length - 1) === delimiter.charAt(delimiter.length - 1) &&
	                        comment.indexOf(delimiter) !== -1) {
	                        break;
	                    }

	                    // only need to search for custom delimiter for the first few characters
	                    if (!matched && comment.length < 10) {
	                        if (comment.indexOf('<![if') === 0) { //peek for <![if conditional comment
	                            delimiter = '<![endif]>';
	                            matched = true;
	                        } else if (comment.indexOf('<![cdata[') === 0) { //if it's a <[cdata[ comment...
	                            delimiter = ']]>';
	                            matched = true;
	                        } else if (comment.indexOf('<![') === 0) { // some other ![ comment? ...
	                            delimiter = ']>';
	                            matched = true;
	                        } else if (comment.indexOf('<!--') === 0) { // <!-- comment ...
	                            delimiter = '-->';
	                            matched = true;
	                        } else if (comment.indexOf('{{!') === 0) { // {{! handlebars comment
	                            delimiter = '}}';
	                            matched = true;
	                        } else if (comment.indexOf('<?') === 0) { // {{! handlebars comment
	                            delimiter = '?>';
	                            matched = true;
	                        } else if (comment.indexOf('<%') === 0) { // {{! handlebars comment
	                            delimiter = '%>';
	                            matched = true;
	                        }
	                    }

	                    input_char = this.input.charAt(this.pos);
	                    this.pos++;
	                }

	                return comment;
	            };

	            function tokenMatcher(delimiter) {
	                var token = '';

	                var add = function(str) {
	                    var newToken = token + str.toLowerCase();
	                    token = newToken.length <= delimiter.length ? newToken : newToken.substr(newToken.length - delimiter.length, delimiter.length);
	                };

	                var doesNotMatch = function() {
	                    return token.indexOf(delimiter) === -1;
	                };

	                return {
	                    add: add,
	                    doesNotMatch: doesNotMatch
	                };
	            }

	            this.get_unformatted = function(delimiter, orig_tag) { //function to return unformatted content in its entirety
	                if (orig_tag && orig_tag.toLowerCase().indexOf(delimiter) !== -1) {
	                    return '';
	                }
	                var input_char = '';
	                var content = '';
	                var space = true;

	                var delimiterMatcher = tokenMatcher(delimiter);

	                do {

	                    if (this.pos >= this.input.length) {
	                        return content;
	                    }

	                    input_char = this.input.charAt(this.pos);
	                    this.pos++;

	                    if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
	                        if (!space) {
	                            this.line_char_count--;
	                            continue;
	                        }
	                        if (input_char === '\n' || input_char === '\r') {
	                            content += '\n';
	                            /*  Don't change tab indention for unformatted blocks.  If using code for html editing, this will greatly affect <pre> tags if they are specified in the 'unformatted array'
	                for (var i=0; i<this.indent_level; i++) {
	                  content += this.indent_string;
	                }
	                space = false; //...and make sure other indentation is erased
	                */
	                            this.line_char_count = 0;
	                            continue;
	                        }
	                    }
	                    content += input_char;
	                    delimiterMatcher.add(input_char);
	                    this.line_char_count++;
	                    space = true;

	                    if (indent_handlebars && input_char === '{' && content.length && content.charAt(content.length - 2) === '{') {
	                        // Handlebars expressions in strings should also be unformatted.
	                        content += this.get_unformatted('}}');
	                        // Don't consider when stopping for delimiters.
	                    }
	                } while (delimiterMatcher.doesNotMatch());

	                return content;
	            };

	            this.get_token = function() { //initial handler for token-retrieval
	                var token;

	                if (this.last_token === 'TK_TAG_SCRIPT' || this.last_token === 'TK_TAG_STYLE') { //check if we need to format javascript
	                    var type = this.last_token.substr(7);
	                    token = this.get_contents_to(type);
	                    if (typeof token !== 'string') {
	                        return token;
	                    }
	                    return [token, 'TK_' + type];
	                }
	                if (this.current_mode === 'CONTENT') {
	                    token = this.get_content();
	                    if (typeof token !== 'string') {
	                        return token;
	                    } else {
	                        return [token, 'TK_CONTENT'];
	                    }
	                }

	                if (this.current_mode === 'TAG') {
	                    token = this.get_tag();
	                    if (typeof token !== 'string') {
	                        return token;
	                    } else {
	                        var tag_name_type = 'TK_TAG_' + this.tag_type;
	                        return [token, tag_name_type];
	                    }
	                }
	            };

	            this.get_full_indent = function(level) {
	                level = this.indent_level + level || 0;
	                if (level < 1) {
	                    return '';
	                }

	                return Array(level + 1).join(this.indent_string);
	            };

	            this.is_unformatted = function(tag_check, unformatted) {
	                //is this an HTML5 block-level link?
	                if (!this.Utils.in_array(tag_check, unformatted)) {
	                    return false;
	                }

	                if (tag_check.toLowerCase() !== 'a' || !this.Utils.in_array('a', unformatted)) {
	                    return true;
	                }

	                //at this point we have an  tag; is its first child something we want to remain
	                //unformatted?
	                var next_tag = this.get_tag(true /* peek. */ );

	                // test next_tag to see if it is just html tag (no external content)
	                var tag = (next_tag || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);

	                // if next_tag comes back but is not an isolated tag, then
	                // let's treat the 'a' tag as having content
	                // and respect the unformatted option
	                if (!tag || this.Utils.in_array(tag, unformatted)) {
	                    return true;
	                } else {
	                    return false;
	                }
	            };

	            this.printer = function(js_source, indent_character, indent_size, wrap_line_length, brace_style) { //handles input/output and some other printing functions

	                this.input = js_source || ''; //gets the input for the Parser

	                // HACK: newline parsing inconsistent. This brute force normalizes the input.
	                this.input = this.input.replace(/\r\n|[\r\u2028\u2029]/g, '\n');

	                this.output = [];
	                this.indent_character = indent_character;
	                this.indent_string = '';
	                this.indent_size = indent_size;
	                this.brace_style = brace_style;
	                this.indent_level = 0;
	                this.wrap_line_length = wrap_line_length;
	                this.line_char_count = 0; //count to see if wrap_line_length was exceeded

	                for (var i = 0; i < this.indent_size; i++) {
	                    this.indent_string += this.indent_character;
	                }

	                this.print_newline = function(force, arr) {
	                    this.line_char_count = 0;
	                    if (!arr || !arr.length) {
	                        return;
	                    }
	                    if (force || (arr[arr.length - 1] !== '\n')) { //we might want the extra line
	                        if ((arr[arr.length - 1] !== '\n')) {
	                            arr[arr.length - 1] = rtrim(arr[arr.length - 1]);
	                        }
	                        arr.push('\n');
	                    }
	                };

	                this.print_indentation = function(arr) {
	                    for (var i = 0; i < this.indent_level; i++) {
	                        arr.push(this.indent_string);
	                        this.line_char_count += this.indent_string.length;
	                    }
	                };

	                this.print_token = function(text) {
	                    // Avoid printing initial whitespace.
	                    if (this.is_whitespace(text) && !this.output.length) {
	                        return;
	                    }
	                    if (text || text !== '') {
	                        if (this.output.length && this.output[this.output.length - 1] === '\n') {
	                            this.print_indentation(this.output);
	                            text = ltrim(text);
	                        }
	                    }
	                    this.print_token_raw(text);
	                };

	                this.print_token_raw = function(text) {
	                    // If we are going to print newlines, truncate trailing
	                    // whitespace, as the newlines will represent the space.
	                    if (this.newlines > 0) {
	                        text = rtrim(text);
	                    }

	                    if (text && text !== '') {
	                        if (text.length > 1 && text.charAt(text.length - 1) === '\n') {
	                            // unformatted tags can grab newlines as their last character
	                            this.output.push(text.slice(0, -1));
	                            this.print_newline(false, this.output);
	                        } else {
	                            this.output.push(text);
	                        }
	                    }

	                    for (var n = 0; n < this.newlines; n++) {
	                        this.print_newline(n > 0, this.output);
	                    }
	                    this.newlines = 0;
	                };

	                this.indent = function() {
	                    this.indent_level++;
	                };

	                this.unindent = function() {
	                    if (this.indent_level > 0) {
	                        this.indent_level--;
	                    }
	                };
	            };
	            return this;
	        }

	        /*_____________________--------------------_____________________*/

	        multi_parser = new Parser(); //wrapping functions Parser
	        multi_parser.printer(html_source, indent_character, indent_size, wrap_line_length, brace_style); //initialize starting values

	        while (true) {
	            var t = multi_parser.get_token();
	            multi_parser.token_text = t[0];
	            multi_parser.token_type = t[1];

	            if (multi_parser.token_type === 'TK_EOF') {
	                break;
	            }

	            switch (multi_parser.token_type) {
	                case 'TK_TAG_START':
	                    multi_parser.print_newline(false, multi_parser.output);
	                    multi_parser.print_token(multi_parser.token_text);
	                    if (multi_parser.indent_content) {
	                        multi_parser.indent();
	                        multi_parser.indent_content = false;
	                    }
	                    multi_parser.current_mode = 'CONTENT';
	                    break;
	                case 'TK_TAG_STYLE':
	                case 'TK_TAG_SCRIPT':
	                    multi_parser.print_newline(false, multi_parser.output);
	                    multi_parser.print_token(multi_parser.token_text);
	                    multi_parser.current_mode = 'CONTENT';
	                    break;
	                case 'TK_TAG_END':
	                    //Print new line only if the tag has no content and has child
	                    if (multi_parser.last_token === 'TK_CONTENT' && multi_parser.last_text === '') {
	                        var tag_name = multi_parser.token_text.match(/\w+/)[0];
	                        var tag_extracted_from_last_output = null;
	                        if (multi_parser.output.length) {
	                            tag_extracted_from_last_output = multi_parser.output[multi_parser.output.length - 1].match(/(?:<|{{#)\s*(\w+)/);
	                        }
	                        if (tag_extracted_from_last_output === null ||
	                            (tag_extracted_from_last_output[1] !== tag_name && !multi_parser.Utils.in_array(tag_extracted_from_last_output[1], unformatted))) {
	                            multi_parser.print_newline(false, multi_parser.output);
	                        }
	                    }
	                    multi_parser.print_token(multi_parser.token_text);
	                    multi_parser.current_mode = 'CONTENT';
	                    break;
	                case 'TK_TAG_SINGLE':
	                    // Don't add a newline before elements that should remain unformatted.
	                    var tag_check = multi_parser.token_text.match(/^\s*<([a-z-]+)/i);
	                    if (!tag_check || !multi_parser.Utils.in_array(tag_check[1], unformatted)) {
	                        multi_parser.print_newline(false, multi_parser.output);
	                    }
	                    multi_parser.print_token(multi_parser.token_text);
	                    multi_parser.current_mode = 'CONTENT';
	                    break;
	                case 'TK_TAG_HANDLEBARS_ELSE':
	                    // Don't add a newline if opening {{#if}} tag is on the current line
	                    var foundIfOnCurrentLine = false;
	                    for (var lastCheckedOutput = multi_parser.output.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
	                        if (multi_parser.output[lastCheckedOutput] === '\n') {
	                            break;
	                        } else {
	                            if (multi_parser.output[lastCheckedOutput].match(/{{#if/)) {
	                                foundIfOnCurrentLine = true;
	                                break;
	                            }
	                        }
	                    }
	                    if (!foundIfOnCurrentLine) {
	                        multi_parser.print_newline(false, multi_parser.output);
	                    }
	                    multi_parser.print_token(multi_parser.token_text);
	                    if (multi_parser.indent_content) {
	                        multi_parser.indent();
	                        multi_parser.indent_content = false;
	                    }
	                    multi_parser.current_mode = 'CONTENT';
	                    break;
	                case 'TK_TAG_HANDLEBARS_COMMENT':
	                    multi_parser.print_token(multi_parser.token_text);
	                    multi_parser.current_mode = 'TAG';
	                    break;
	                case 'TK_CONTENT':
	                    multi_parser.print_token(multi_parser.token_text);
	                    multi_parser.current_mode = 'TAG';
	                    break;
	                case 'TK_STYLE':
	                case 'TK_SCRIPT':
	                    if (multi_parser.token_text !== '') {
	                        multi_parser.print_newline(false, multi_parser.output);
	                        var text = multi_parser.token_text,
	                            _beautifier,
	                            script_indent_level = 1;
	                        if (multi_parser.token_type === 'TK_SCRIPT') {
	                            _beautifier = typeof js_beautify === 'function' && js_beautify;
	                        } else if (multi_parser.token_type === 'TK_STYLE') {
	                            _beautifier = typeof css_beautify === 'function' && css_beautify;
	                        }

	                        if (options.indent_scripts === "keep") {
	                            script_indent_level = 0;
	                        } else if (options.indent_scripts === "separate") {
	                            script_indent_level = -multi_parser.indent_level;
	                        }

	                        var indentation = multi_parser.get_full_indent(script_indent_level);
	                        if (_beautifier) {

	                            // call the Beautifier if avaliable
	                            var Child_options = function() {
	                                this.eol = '\n';
	                            };
	                            Child_options.prototype = options;
	                            var child_options = new Child_options();
	                            text = _beautifier(text.replace(/^\s*/, indentation), child_options);
	                        } else {
	                            // simply indent the string otherwise
	                            var white = text.match(/^\s*/)[0];
	                            var _level = white.match(/[^\n\r]*$/)[0].split(multi_parser.indent_string).length - 1;
	                            var reindent = multi_parser.get_full_indent(script_indent_level - _level);
	                            text = text.replace(/^\s*/, indentation)
	                                .replace(/\r\n|\r|\n/g, '\n' + reindent)
	                                .replace(/\s+$/, '');
	                        }
	                        if (text) {
	                            multi_parser.print_token_raw(text);
	                            multi_parser.print_newline(true, multi_parser.output);
	                        }
	                    }
	                    multi_parser.current_mode = 'TAG';
	                    break;
	                default:
	                    // We should not be getting here but we don't want to drop input on the floor
	                    // Just output the text and move on
	                    if (multi_parser.token_text !== '') {
	                        multi_parser.print_token(multi_parser.token_text);
	                    }
	                    break;
	            }
	            multi_parser.last_token = multi_parser.token_type;
	            multi_parser.last_text = multi_parser.token_text;
	        }
	        var sweet_code = multi_parser.output.join('').replace(/[\r\n\t ]+$/, '');

	        // establish end_with_newline
	        if (end_with_newline) {
	            sweet_code += '\n';
	        }

	        if (eol !== '\n') {
	            sweet_code = sweet_code.replace(/[\n]/g, eol);
	        }

	        return sweet_code;
	    }

	    if (true) {
	        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(requireamd) {
	            var js_beautify = __webpack_require__(3);
	            var css_beautify = __webpack_require__(4);

	            return {
	                html_beautify: function(html_source, options) {
	                    return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
	                }
	            };
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        // Add support for CommonJS. Just put this file somewhere on your require.paths
	        // and you will be able to `var html_beautify = require("beautify").html_beautify`.
	        var js_beautify = require('./beautify.js');
	        var css_beautify = require('./beautify-css.js');

	        exports.html_beautify = function(html_source, options) {
	            return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
	        };
	    } else if (typeof window !== "undefined") {
	        // If we're running a web page and don't have either of the above, add our one global
	        window.html_beautify = function(html_source, options) {
	            return style_html(html_source, options, window.js_beautify, window.css_beautify);
	        };
	    } else if (typeof global !== "undefined") {
	        // If we don't even have window, try global.
	        global.html_beautify = function(html_source, options) {
	            return style_html(html_source, options, global.js_beautify, global.css_beautify);
	        };
	    }

	}());

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*! highlight.js v9.6.0 | BSD3 License | git.io/hljslicense */
	!function (e) {
	  var n = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self; false ? e(exports) : n && (n.hljs = e({}), "function" == "function" && __webpack_require__(7) && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return n.hljs;
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)));
	}(function (e) {
	  function n(e) {
	    return e.replace(/[&<>]/gm, function (e) {
	      return I[e];
	    });
	  }function t(e) {
	    return e.nodeName.toLowerCase();
	  }function r(e, n) {
	    var t = e && e.exec(n);return t && 0 === t.index;
	  }function a(e) {
	    return k.test(e);
	  }function i(e) {
	    var n,
	        t,
	        r,
	        i,
	        o = e.className + " ";if (o += e.parentNode ? e.parentNode.className : "", t = B.exec(o)) return R(t[1]) ? t[1] : "no-highlight";for (o = o.split(/\s+/), n = 0, r = o.length; r > n; n++) {
	      if (i = o[n], a(i) || R(i)) return i;
	    }
	  }function o(e, n) {
	    var t,
	        r = {};for (t in e) {
	      r[t] = e[t];
	    }if (n) for (t in n) {
	      r[t] = n[t];
	    }return r;
	  }function u(e) {
	    var n = [];return function r(e, a) {
	      for (var i = e.firstChild; i; i = i.nextSibling) {
	        3 === i.nodeType ? a += i.nodeValue.length : 1 === i.nodeType && (n.push({ event: "start", offset: a, node: i }), a = r(i, a), t(i).match(/br|hr|img|input/) || n.push({ event: "stop", offset: a, node: i }));
	      }return a;
	    }(e, 0), n;
	  }function c(e, r, a) {
	    function i() {
	      return e.length && r.length ? e[0].offset !== r[0].offset ? e[0].offset < r[0].offset ? e : r : "start" === r[0].event ? e : r : e.length ? e : r;
	    }function o(e) {
	      function r(e) {
	        return " " + e.nodeName + '="' + n(e.value) + '"';
	      }l += "<" + t(e) + w.map.call(e.attributes, r).join("") + ">";
	    }function u(e) {
	      l += "</" + t(e) + ">";
	    }function c(e) {
	      ("start" === e.event ? o : u)(e.node);
	    }for (var s = 0, l = "", f = []; e.length || r.length;) {
	      var g = i();if (l += n(a.substr(s, g[0].offset - s)), s = g[0].offset, g === e) {
	        f.reverse().forEach(u);do {
	          c(g.splice(0, 1)[0]), g = i();
	        } while (g === e && g.length && g[0].offset === s);f.reverse().forEach(o);
	      } else "start" === g[0].event ? f.push(g[0].node) : f.pop(), c(g.splice(0, 1)[0]);
	    }return l + n(a.substr(s));
	  }function s(e) {
	    function n(e) {
	      return e && e.source || e;
	    }function t(t, r) {
	      return new RegExp(n(t), "m" + (e.cI ? "i" : "") + (r ? "g" : ""));
	    }function r(a, i) {
	      if (!a.compiled) {
	        if (a.compiled = !0, a.k = a.k || a.bK, a.k) {
	          var u = {},
	              c = function c(n, t) {
	            e.cI && (t = t.toLowerCase()), t.split(" ").forEach(function (e) {
	              var t = e.split("|");u[t[0]] = [n, t[1] ? Number(t[1]) : 1];
	            });
	          };"string" == typeof a.k ? c("keyword", a.k) : E(a.k).forEach(function (e) {
	            c(e, a.k[e]);
	          }), a.k = u;
	        }a.lR = t(a.l || /\w+/, !0), i && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), a.bR = t(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = t(a.e)), a.tE = n(a.e) || "", a.eW && i.tE && (a.tE += (a.e ? "|" : "") + i.tE)), a.i && (a.iR = t(a.i)), null == a.r && (a.r = 1), a.c || (a.c = []);var s = [];a.c.forEach(function (e) {
	          e.v ? e.v.forEach(function (n) {
	            s.push(o(e, n));
	          }) : s.push("self" === e ? a : e);
	        }), a.c = s, a.c.forEach(function (e) {
	          r(e, a);
	        }), a.starts && r(a.starts, i);var l = a.c.map(function (e) {
	          return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b;
	        }).concat([a.tE, a.i]).map(n).filter(Boolean);a.t = l.length ? t(l.join("|"), !0) : { exec: function exec() {
	            return null;
	          } };
	      }
	    }r(e);
	  }function l(e, t, a, i) {
	    function o(e, n) {
	      var t, a;for (t = 0, a = n.c.length; a > t; t++) {
	        if (r(n.c[t].bR, e)) return n.c[t];
	      }
	    }function u(e, n) {
	      if (r(e.eR, n)) {
	        for (; e.endsParent && e.parent;) {
	          e = e.parent;
	        }return e;
	      }return e.eW ? u(e.parent, n) : void 0;
	    }function c(e, n) {
	      return !a && r(n.iR, e);
	    }function g(e, n) {
	      var t = N.cI ? n[0].toLowerCase() : n[0];return e.k.hasOwnProperty(t) && e.k[t];
	    }function h(e, n, t, r) {
	      var a = r ? "" : y.classPrefix,
	          i = '<span class="' + a,
	          o = t ? "" : C;return i += e + '">', i + n + o;
	    }function p() {
	      var e, t, r, a;if (!E.k) return n(B);for (a = "", t = 0, E.lR.lastIndex = 0, r = E.lR.exec(B); r;) {
	        a += n(B.substr(t, r.index - t)), e = g(E, r), e ? (M += e[1], a += h(e[0], n(r[0]))) : a += n(r[0]), t = E.lR.lastIndex, r = E.lR.exec(B);
	      }return a + n(B.substr(t));
	    }function d() {
	      var e = "string" == typeof E.sL;if (e && !x[E.sL]) return n(B);var t = e ? l(E.sL, B, !0, L[E.sL]) : f(B, E.sL.length ? E.sL : void 0);return E.r > 0 && (M += t.r), e && (L[E.sL] = t.top), h(t.language, t.value, !1, !0);
	    }function b() {
	      k += null != E.sL ? d() : p(), B = "";
	    }function v(e) {
	      k += e.cN ? h(e.cN, "", !0) : "", E = Object.create(e, { parent: { value: E } });
	    }function m(e, n) {
	      if (B += e, null == n) return b(), 0;var t = o(n, E);if (t) return t.skip ? B += n : (t.eB && (B += n), b(), t.rB || t.eB || (B = n)), v(t, n), t.rB ? 0 : n.length;var r = u(E, n);if (r) {
	        var a = E;a.skip ? B += n : (a.rE || a.eE || (B += n), b(), a.eE && (B = n));do {
	          E.cN && (k += C), E.skip || (M += E.r), E = E.parent;
	        } while (E !== r.parent);return r.starts && v(r.starts, ""), a.rE ? 0 : n.length;
	      }if (c(n, E)) throw new Error('Illegal lexeme "' + n + '" for mode "' + (E.cN || "<unnamed>") + '"');return B += n, n.length || 1;
	    }var N = R(e);if (!N) throw new Error('Unknown language: "' + e + '"');s(N);var w,
	        E = i || N,
	        L = {},
	        k = "";for (w = E; w !== N; w = w.parent) {
	      w.cN && (k = h(w.cN, "", !0) + k);
	    }var B = "",
	        M = 0;try {
	      for (var I, j, O = 0;;) {
	        if (E.t.lastIndex = O, I = E.t.exec(t), !I) break;j = m(t.substr(O, I.index - O), I[0]), O = I.index + j;
	      }for (m(t.substr(O)), w = E; w.parent; w = w.parent) {
	        w.cN && (k += C);
	      }return { r: M, value: k, language: e, top: E };
	    } catch (T) {
	      if (T.message && -1 !== T.message.indexOf("Illegal")) return { r: 0, value: n(t) };throw T;
	    }
	  }function f(e, t) {
	    t = t || y.languages || E(x);var r = { r: 0, value: n(e) },
	        a = r;return t.filter(R).forEach(function (n) {
	      var t = l(n, e, !1);t.language = n, t.r > a.r && (a = t), t.r > r.r && (a = r, r = t);
	    }), a.language && (r.second_best = a), r;
	  }function g(e) {
	    return y.tabReplace || y.useBR ? e.replace(M, function (e, n) {
	      return y.useBR && "\n" === e ? "<br>" : y.tabReplace ? n.replace(/\t/g, y.tabReplace) : void 0;
	    }) : e;
	  }function h(e, n, t) {
	    var r = n ? L[n] : t,
	        a = [e.trim()];return e.match(/\bhljs\b/) || a.push("hljs"), -1 === e.indexOf(r) && a.push(r), a.join(" ").trim();
	  }function p(e) {
	    var n,
	        t,
	        r,
	        o,
	        s,
	        p = i(e);a(p) || (y.useBR ? (n = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), n.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : n = e, s = n.textContent, r = p ? l(p, s, !0) : f(s), t = u(n), t.length && (o = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), o.innerHTML = r.value, r.value = c(t, u(o), s)), r.value = g(r.value), e.innerHTML = r.value, e.className = h(e.className, p, r.language), e.result = { language: r.language, re: r.r }, r.second_best && (e.second_best = { language: r.second_best.language, re: r.second_best.r }));
	  }function d(e) {
	    y = o(y, e);
	  }function b() {
	    if (!b.called) {
	      b.called = !0;var e = document.querySelectorAll("pre code");w.forEach.call(e, p);
	    }
	  }function v() {
	    addEventListener("DOMContentLoaded", b, !1), addEventListener("load", b, !1);
	  }function m(n, t) {
	    var r = x[n] = t(e);r.aliases && r.aliases.forEach(function (e) {
	      L[e] = n;
	    });
	  }function N() {
	    return E(x);
	  }function R(e) {
	    return e = (e || "").toLowerCase(), x[e] || x[L[e]];
	  }var w = [],
	      E = Object.keys,
	      x = {},
	      L = {},
	      k = /^(no-?highlight|plain|text)$/i,
	      B = /\blang(?:uage)?-([\w-]+)\b/i,
	      M = /((^(<[^>]+>|\t|)+|(?:\n)))/gm,
	      C = "</span>",
	      y = { classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: void 0 },
	      I = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };return e.highlight = l, e.highlightAuto = f, e.fixMarkup = g, e.highlightBlock = p, e.configure = d, e.initHighlighting = b, e.initHighlightingOnLoad = v, e.registerLanguage = m, e.listLanguages = N, e.getLanguage = R, e.inherit = o, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = { b: "\\\\[\\s\\S]", r: 0 }, e.ASM = { cN: "string", b: "'", e: "'", i: "\\n", c: [e.BE] }, e.QSM = { cN: "string", b: '"', e: '"', i: "\\n", c: [e.BE] }, e.PWM = { b: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/ }, e.C = function (n, t, r) {
	    var a = e.inherit({ cN: "comment", b: n, e: t, c: [] }, r || {});return a.c.push(e.PWM), a.c.push({ cN: "doctag", b: "(?:TODO|FIXME|NOTE|BUG|XXX):", r: 0 }), a;
	  }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = { cN: "number", b: e.NR, r: 0 }, e.CNM = { cN: "number", b: e.CNR, r: 0 }, e.BNM = { cN: "number", b: e.BNR, r: 0 }, e.CSSNM = { cN: "number", b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?", r: 0 }, e.RM = { cN: "regexp", b: /\//, e: /\/[gimuy]*/, i: /\n/, c: [e.BE, { b: /\[/, e: /\]/, r: 0, c: [e.BE] }] }, e.TM = { cN: "title", b: e.IR, r: 0 }, e.UTM = { cN: "title", b: e.UIR, r: 0 }, e.METHOD_GUARD = { b: "\\.\\s*" + e.UIR, r: 0 }, e;
	});hljs.registerLanguage("xml", function (s) {
	  var e = "[A-Za-z0-9\\._:-]+",
	      t = { eW: !0, i: /</, r: 0, c: [{ cN: "attr", b: e, r: 0 }, { b: /=\s*/, r: 0, c: [{ cN: "string", endsParent: !0, v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }, { b: /[^\s"'=<>`]+/ }] }] }] };return { aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist"], cI: !0, c: [{ cN: "meta", b: "<!DOCTYPE", e: ">", r: 10, c: [{ b: "\\[", e: "\\]" }] }, s.C("<!--", "-->", { r: 10 }), { b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10 }, { b: /<\?(php)?/, e: /\?>/, sL: "php", c: [{ b: "/\\*", e: "\\*/", skip: !0 }] }, { cN: "tag", b: "<style(?=\\s|>|$)", e: ">", k: { name: "style" }, c: [t], starts: { e: "</style>", rE: !0, sL: ["css", "xml"] } }, { cN: "tag", b: "<script(?=\\s|>|$)", e: ">", k: { name: "script" }, c: [t], starts: { e: "</script>", rE: !0, sL: ["actionscript", "javascript", "handlebars", "xml"] } }, { cN: "meta", v: [{ b: /<\?xml/, e: /\?>/, r: 10 }, { b: /<\?\w+/, e: /\?>/ }] }, { cN: "tag", b: "</?", e: "/?>", c: [{ cN: "name", b: /[^\/><\s]+/, r: 0 }, t] }] };
	});hljs.registerLanguage("javascript", function (e) {
	  return { aliases: ["js", "jsx"], k: { keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as", literal: "true false null undefined NaN Infinity", built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise" }, c: [{ cN: "meta", r: 10, b: /^\s*['"]use (strict|asm)['"]/ }, { cN: "meta", b: /^#!/, e: /$/ }, e.ASM, e.QSM, { cN: "string", b: "`", e: "`", c: [e.BE, { cN: "subst", b: "\\$\\{", e: "\\}" }] }, e.CLCM, e.CBCM, { cN: "number", v: [{ b: "\\b(0[bB][01]+)" }, { b: "\\b(0[oO][0-7]+)" }, { b: e.CNR }], r: 0 }, { b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*", k: "return throw case", c: [e.CLCM, e.CBCM, e.RM, { b: /</, e: /(\/\w+|\w+\/)>/, sL: "xml", c: [{ b: /<\w+\s*\/>/, skip: !0 }, { b: /<\w+/, e: /(\/\w+|\w+\/)>/, skip: !0, c: ["self"] }] }], r: 0 }, { cN: "function", bK: "function", e: /\{/, eE: !0, c: [e.inherit(e.TM, { b: /[A-Za-z$_][0-9A-Za-z$_]*/ }), { cN: "params", b: /\(/, e: /\)/, eB: !0, eE: !0, c: [e.CLCM, e.CBCM] }], i: /\[|%/ }, { b: /\$[(.]/ }, e.METHOD_GUARD, { cN: "class", bK: "class", e: /[{;=]/, eE: !0, i: /[:"\[\]]/, c: [{ bK: "extends" }, e.UTM] }, { bK: "constructor", e: /\{/, eE: !0 }], i: /#(?!!)/ };
	});hljs.registerLanguage("css", function (e) {
	  var c = "[a-zA-Z-][a-zA-Z0-9_-]*",
	      t = { b: /[A-Z\_\.\-]+\s*:/, rB: !0, e: ";", eW: !0, c: [{ cN: "attribute", b: /\S/, e: ":", eE: !0, starts: { eW: !0, eE: !0, c: [{ b: /[\w-]+\(/, rB: !0, c: [{ cN: "built_in", b: /[\w-]+/ }, { b: /\(/, e: /\)/, c: [e.ASM, e.QSM] }] }, e.CSSNM, e.QSM, e.ASM, e.CBCM, { cN: "number", b: "#[0-9A-Fa-f]+" }, { cN: "meta", b: "!important" }] } }] };return { cI: !0, i: /[=\/|'\$]/, c: [e.CBCM, { cN: "selector-id", b: /#[A-Za-z0-9_-]+/ }, { cN: "selector-class", b: /\.[A-Za-z0-9_-]+/ }, { cN: "selector-attr", b: /\[/, e: /\]/, i: "$" }, { cN: "selector-pseudo", b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/ }, { b: "@(font-face|page)", l: "[a-z-]+", k: "font-face page" }, { b: "@", e: "[{;]", i: /:/, c: [{ cN: "keyword", b: /\w+/ }, { b: /\s/, eW: !0, eE: !0, r: 0, c: [e.ASM, e.QSM, e.CSSNM] }] }, { cN: "selector-tag", b: c, r: 0 }, { b: "{", e: "}", i: /\S/, c: [e.CBCM, t] }] };
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./obsidian.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./obsidian.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "/**\n * Obsidian style\n * ported by Alexander Marenin (http://github.com/ioncreature)\n */\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  background: #282b2e;\n}\n\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-literal,\n.hljs-selector-id {\n  color: #93c763;\n}\n\n.hljs-number {\n  color: #ffcd22;\n}\n\n.hljs {\n  color: #e0e2e4;\n}\n\n.hljs-attribute {\n  color: #668bb0;\n}\n\n.hljs-code,\n.hljs-class .hljs-title,\n.hljs-section {\n  color: white;\n}\n\n.hljs-regexp,\n.hljs-link {\n  color: #d39745;\n}\n\n.hljs-meta {\n  color: #557182;\n}\n\n.hljs-tag,\n.hljs-name,\n.hljs-bullet,\n.hljs-subst,\n.hljs-emphasis,\n.hljs-type,\n.hljs-built_in,\n.hljs-selector-attr,\n.hljs-selector-pseudo,\n.hljs-addition,\n.hljs-variable,\n.hljs-template-tag,\n.hljs-template-variable {\n  color: #8cbbad;\n}\n\n.hljs-string,\n.hljs-symbol {\n  color: #ec7600;\n}\n\n.hljs-comment,\n.hljs-quote,\n.hljs-deletion {\n  color: #818e96;\n}\n\n.hljs-selector-class {\n  color: #A082BD\n}\n\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-literal,\n.hljs-doctag,\n.hljs-title,\n.hljs-section,\n.hljs-type,\n.hljs-name,\n.hljs-strong {\n  font-weight: bold;\n}", ""]);

	// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(opts) {
	  return new IFrame(opts)
	}

	function IFrame(opts) {
	  if (!opts) opts = {}
	  this.opts = opts
	  this.container = opts.container || document.body
	  this.setHTML(opts)
	}

	IFrame.prototype.parseHTMLOptions = function(opts) {
	  if (typeof opts === 'string') opts = {html: opts}
	  if (!opts) opts = {}
	  if (opts.body || opts.head) {
	    if (!opts.body) opts.body = ""
	    if (!opts.head) opts.head = ""
	    opts.html = '<!DOCTYPE html><html><head>' + opts.head + '</head><body>' + opts.body + '</body></html>'
	  }
	  if (!opts.sandboxAttributes) opts.sandboxAttributes = ['allow-scripts']
	  return opts
	}

	IFrame.prototype.remove = function() {
	  if (this.iframe) this.container.removeChild(this.iframe)
	}

	IFrame.prototype.setHTML = function(opts) {
	  opts = this.parseHTMLOptions(opts)
	  if (!opts.html && !opts.src) return
	  this.remove()
	  
	  // if src is passed in use that (this mode ignores body/head/html options)
	  if (opts.src) {
	    var targetUrl = opts.src
	  } else {
	    // create a blob for opts.html and set as iframe `src` attribute
	    var blob = new Blob([opts.html], { encoding: 'UTF-8', type: 'text/html' })
	    var U = typeof URL !== 'undefined' ? URL : webkitURL
	    var targetUrl = U.createObjectURL(blob)    
	  }
	  // create temporary iframe for generating HTML string
	  // element is inserted into the DOM as a string so that the security policies do not interfere
	  // see: https://gist.github.com/kumavis/8202447
	  var tempIframe = document.createElement('iframe')
	  tempIframe.src = targetUrl
	  tempIframe.setAttribute('scrolling', this.opts.scrollingDisabled ? 'no' : 'yes')
	  tempIframe.style.width = '100%'
	  tempIframe.style.height = '100%'
	  tempIframe.style.border = '0'
	  tempIframe.sandbox = opts.sandboxAttributes.join(' ')
	  if (opts.name) tempIframe.setAttribute('name', opts.name)
	  // generate HTML string
	  var htmlSrc = tempIframe.outerHTML
	  // insert HTML into container
	  this.container.insertAdjacentHTML('beforeend', htmlSrc)
	  // retrieve created iframe from DOM
	  var neighborIframes = this.container.querySelectorAll('iframe')
	  this.iframe = neighborIframes[neighborIframes.length-1]
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "\"use strict\";var _typeof=typeof Symbol===\"function\"&&typeof Symbol.iterator===\"symbol\"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol===\"function\"&&obj.constructor===Symbol?\"symbol\":typeof obj;};/*! p5.js v0.5.0 May 02, 2016 */!function(a){if(\"object\"==(typeof exports===\"undefined\"?\"undefined\":_typeof(exports))&&\"undefined\"!=typeof module)module.exports=a();else if(\"function\"==typeof define&&define.amd)define([],a);else{var b;b=\"undefined\"!=typeof window?window:\"undefined\"!=typeof global?global:\"undefined\"!=typeof self?self:this,b.p5=a();}}(function(){var define,module,exports;return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i=\"function\"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error(\"Cannot find module '\"+g+\"'\");throw j.code=\"MODULE_NOT_FOUND\",j;}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a);},k,k.exports,a,b,c,d);}return c[g].exports;}for(var f=\"function\"==typeof require&&require,g=0;g<d.length;g++){e(d[g]);}return e;}({1:[function(a,b,c){},{}],2:[function(a,b,c){\"use strict\";c.argument=function(a,b){if(!a)throw new Error(b);},c.assert=c.argument;},{}],3:[function(a,b,c){\"use strict\";function d(a,b,c,d,e){a.beginPath(),a.moveTo(b,c),a.lineTo(d,e),a.stroke();}c.line=d;},{}],4:[function(a,b,c){\"use strict\";function d(a){this.font=a;}function e(a){this.cmap=a;}function f(a,b){this.encoding=a,this.charset=b;}function g(a){var b;switch(a.version){case 1:this.names=c.standardNames.slice();break;case 2:for(this.names=new Array(a.numberOfGlyphs),b=0;b<a.numberOfGlyphs;b++){a.glyphNameIndex[b]<c.standardNames.length?this.names[b]=c.standardNames[a.glyphNameIndex[b]]:this.names[b]=a.names[a.glyphNameIndex[b]-c.standardNames.length];}break;case 2.5:for(this.names=new Array(a.numberOfGlyphs),b=0;b<a.numberOfGlyphs;b++){this.names[b]=c.standardNames[b+a.glyphNameIndex[b]];}break;case 3:this.names=[];}}function h(a){for(var b,c=a.tables.cmap.glyphIndexMap,d=Object.keys(c),e=0;e<d.length;e+=1){var f=d[e],g=c[f];b=a.glyphs.get(g),b.addUnicode(parseInt(f));}for(e=0;e<a.glyphs.length;e+=1){b=a.glyphs.get(e),a.cffEncoding?b.name=a.cffEncoding.charset[e]:b.name=a.glyphNames.glyphIndexToName(e);}}var i=[\".notdef\",\"space\",\"exclam\",\"quotedbl\",\"numbersign\",\"dollar\",\"percent\",\"ampersand\",\"quoteright\",\"parenleft\",\"parenright\",\"asterisk\",\"plus\",\"comma\",\"hyphen\",\"period\",\"slash\",\"zero\",\"one\",\"two\",\"three\",\"four\",\"five\",\"six\",\"seven\",\"eight\",\"nine\",\"colon\",\"semicolon\",\"less\",\"equal\",\"greater\",\"question\",\"at\",\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\",\"H\",\"I\",\"J\",\"K\",\"L\",\"M\",\"N\",\"O\",\"P\",\"Q\",\"R\",\"S\",\"T\",\"U\",\"V\",\"W\",\"X\",\"Y\",\"Z\",\"bracketleft\",\"backslash\",\"bracketright\",\"asciicircum\",\"underscore\",\"quoteleft\",\"a\",\"b\",\"c\",\"d\",\"e\",\"f\",\"g\",\"h\",\"i\",\"j\",\"k\",\"l\",\"m\",\"n\",\"o\",\"p\",\"q\",\"r\",\"s\",\"t\",\"u\",\"v\",\"w\",\"x\",\"y\",\"z\",\"braceleft\",\"bar\",\"braceright\",\"asciitilde\",\"exclamdown\",\"cent\",\"sterling\",\"fraction\",\"yen\",\"florin\",\"section\",\"currency\",\"quotesingle\",\"quotedblleft\",\"guillemotleft\",\"guilsinglleft\",\"guilsinglright\",\"fi\",\"fl\",\"endash\",\"dagger\",\"daggerdbl\",\"periodcentered\",\"paragraph\",\"bullet\",\"quotesinglbase\",\"quotedblbase\",\"quotedblright\",\"guillemotright\",\"ellipsis\",\"perthousand\",\"questiondown\",\"grave\",\"acute\",\"circumflex\",\"tilde\",\"macron\",\"breve\",\"dotaccent\",\"dieresis\",\"ring\",\"cedilla\",\"hungarumlaut\",\"ogonek\",\"caron\",\"emdash\",\"AE\",\"ordfeminine\",\"Lslash\",\"Oslash\",\"OE\",\"ordmasculine\",\"ae\",\"dotlessi\",\"lslash\",\"oslash\",\"oe\",\"germandbls\",\"onesuperior\",\"logicalnot\",\"mu\",\"trademark\",\"Eth\",\"onehalf\",\"plusminus\",\"Thorn\",\"onequarter\",\"divide\",\"brokenbar\",\"degree\",\"thorn\",\"threequarters\",\"twosuperior\",\"registered\",\"minus\",\"eth\",\"multiply\",\"threesuperior\",\"copyright\",\"Aacute\",\"Acircumflex\",\"Adieresis\",\"Agrave\",\"Aring\",\"Atilde\",\"Ccedilla\",\"Eacute\",\"Ecircumflex\",\"Edieresis\",\"Egrave\",\"Iacute\",\"Icircumflex\",\"Idieresis\",\"Igrave\",\"Ntilde\",\"Oacute\",\"Ocircumflex\",\"Odieresis\",\"Ograve\",\"Otilde\",\"Scaron\",\"Uacute\",\"Ucircumflex\",\"Udieresis\",\"Ugrave\",\"Yacute\",\"Ydieresis\",\"Zcaron\",\"aacute\",\"acircumflex\",\"adieresis\",\"agrave\",\"aring\",\"atilde\",\"ccedilla\",\"eacute\",\"ecircumflex\",\"edieresis\",\"egrave\",\"iacute\",\"icircumflex\",\"idieresis\",\"igrave\",\"ntilde\",\"oacute\",\"ocircumflex\",\"odieresis\",\"ograve\",\"otilde\",\"scaron\",\"uacute\",\"ucircumflex\",\"udieresis\",\"ugrave\",\"yacute\",\"ydieresis\",\"zcaron\",\"exclamsmall\",\"Hungarumlautsmall\",\"dollaroldstyle\",\"dollarsuperior\",\"ampersandsmall\",\"Acutesmall\",\"parenleftsuperior\",\"parenrightsuperior\",\"266 ff\",\"onedotenleader\",\"zerooldstyle\",\"oneoldstyle\",\"twooldstyle\",\"threeoldstyle\",\"fouroldstyle\",\"fiveoldstyle\",\"sixoldstyle\",\"sevenoldstyle\",\"eightoldstyle\",\"nineoldstyle\",\"commasuperior\",\"threequartersemdash\",\"periodsuperior\",\"questionsmall\",\"asuperior\",\"bsuperior\",\"centsuperior\",\"dsuperior\",\"esuperior\",\"isuperior\",\"lsuperior\",\"msuperior\",\"nsuperior\",\"osuperior\",\"rsuperior\",\"ssuperior\",\"tsuperior\",\"ff\",\"ffi\",\"ffl\",\"parenleftinferior\",\"parenrightinferior\",\"Circumflexsmall\",\"hyphensuperior\",\"Gravesmall\",\"Asmall\",\"Bsmall\",\"Csmall\",\"Dsmall\",\"Esmall\",\"Fsmall\",\"Gsmall\",\"Hsmall\",\"Ismall\",\"Jsmall\",\"Ksmall\",\"Lsmall\",\"Msmall\",\"Nsmall\",\"Osmall\",\"Psmall\",\"Qsmall\",\"Rsmall\",\"Ssmall\",\"Tsmall\",\"Usmall\",\"Vsmall\",\"Wsmall\",\"Xsmall\",\"Ysmall\",\"Zsmall\",\"colonmonetary\",\"onefitted\",\"rupiah\",\"Tildesmall\",\"exclamdownsmall\",\"centoldstyle\",\"Lslashsmall\",\"Scaronsmall\",\"Zcaronsmall\",\"Dieresissmall\",\"Brevesmall\",\"Caronsmall\",\"Dotaccentsmall\",\"Macronsmall\",\"figuredash\",\"hypheninferior\",\"Ogoneksmall\",\"Ringsmall\",\"Cedillasmall\",\"questiondownsmall\",\"oneeighth\",\"threeeighths\",\"fiveeighths\",\"seveneighths\",\"onethird\",\"twothirds\",\"zerosuperior\",\"foursuperior\",\"fivesuperior\",\"sixsuperior\",\"sevensuperior\",\"eightsuperior\",\"ninesuperior\",\"zeroinferior\",\"oneinferior\",\"twoinferior\",\"threeinferior\",\"fourinferior\",\"fiveinferior\",\"sixinferior\",\"seveninferior\",\"eightinferior\",\"nineinferior\",\"centinferior\",\"dollarinferior\",\"periodinferior\",\"commainferior\",\"Agravesmall\",\"Aacutesmall\",\"Acircumflexsmall\",\"Atildesmall\",\"Adieresissmall\",\"Aringsmall\",\"AEsmall\",\"Ccedillasmall\",\"Egravesmall\",\"Eacutesmall\",\"Ecircumflexsmall\",\"Edieresissmall\",\"Igravesmall\",\"Iacutesmall\",\"Icircumflexsmall\",\"Idieresissmall\",\"Ethsmall\",\"Ntildesmall\",\"Ogravesmall\",\"Oacutesmall\",\"Ocircumflexsmall\",\"Otildesmall\",\"Odieresissmall\",\"OEsmall\",\"Oslashsmall\",\"Ugravesmall\",\"Uacutesmall\",\"Ucircumflexsmall\",\"Udieresissmall\",\"Yacutesmall\",\"Thornsmall\",\"Ydieresissmall\",\"001.000\",\"001.001\",\"001.002\",\"001.003\",\"Black\",\"Bold\",\"Book\",\"Light\",\"Medium\",\"Regular\",\"Roman\",\"Semibold\"],j=[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"space\",\"exclam\",\"quotedbl\",\"numbersign\",\"dollar\",\"percent\",\"ampersand\",\"quoteright\",\"parenleft\",\"parenright\",\"asterisk\",\"plus\",\"comma\",\"hyphen\",\"period\",\"slash\",\"zero\",\"one\",\"two\",\"three\",\"four\",\"five\",\"six\",\"seven\",\"eight\",\"nine\",\"colon\",\"semicolon\",\"less\",\"equal\",\"greater\",\"question\",\"at\",\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\",\"H\",\"I\",\"J\",\"K\",\"L\",\"M\",\"N\",\"O\",\"P\",\"Q\",\"R\",\"S\",\"T\",\"U\",\"V\",\"W\",\"X\",\"Y\",\"Z\",\"bracketleft\",\"backslash\",\"bracketright\",\"asciicircum\",\"underscore\",\"quoteleft\",\"a\",\"b\",\"c\",\"d\",\"e\",\"f\",\"g\",\"h\",\"i\",\"j\",\"k\",\"l\",\"m\",\"n\",\"o\",\"p\",\"q\",\"r\",\"s\",\"t\",\"u\",\"v\",\"w\",\"x\",\"y\",\"z\",\"braceleft\",\"bar\",\"braceright\",\"asciitilde\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"exclamdown\",\"cent\",\"sterling\",\"fraction\",\"yen\",\"florin\",\"section\",\"currency\",\"quotesingle\",\"quotedblleft\",\"guillemotleft\",\"guilsinglleft\",\"guilsinglright\",\"fi\",\"fl\",\"\",\"endash\",\"dagger\",\"daggerdbl\",\"periodcentered\",\"\",\"paragraph\",\"bullet\",\"quotesinglbase\",\"quotedblbase\",\"quotedblright\",\"guillemotright\",\"ellipsis\",\"perthousand\",\"\",\"questiondown\",\"\",\"grave\",\"acute\",\"circumflex\",\"tilde\",\"macron\",\"breve\",\"dotaccent\",\"dieresis\",\"\",\"ring\",\"cedilla\",\"\",\"hungarumlaut\",\"ogonek\",\"caron\",\"emdash\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"AE\",\"\",\"ordfeminine\",\"\",\"\",\"\",\"\",\"Lslash\",\"Oslash\",\"OE\",\"ordmasculine\",\"\",\"\",\"\",\"\",\"\",\"ae\",\"\",\"\",\"\",\"dotlessi\",\"\",\"\",\"lslash\",\"oslash\",\"oe\",\"germandbls\"],k=[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"space\",\"exclamsmall\",\"Hungarumlautsmall\",\"\",\"dollaroldstyle\",\"dollarsuperior\",\"ampersandsmall\",\"Acutesmall\",\"parenleftsuperior\",\"parenrightsuperior\",\"twodotenleader\",\"onedotenleader\",\"comma\",\"hyphen\",\"period\",\"fraction\",\"zerooldstyle\",\"oneoldstyle\",\"twooldstyle\",\"threeoldstyle\",\"fouroldstyle\",\"fiveoldstyle\",\"sixoldstyle\",\"sevenoldstyle\",\"eightoldstyle\",\"nineoldstyle\",\"colon\",\"semicolon\",\"commasuperior\",\"threequartersemdash\",\"periodsuperior\",\"questionsmall\",\"\",\"asuperior\",\"bsuperior\",\"centsuperior\",\"dsuperior\",\"esuperior\",\"\",\"\",\"isuperior\",\"\",\"\",\"lsuperior\",\"msuperior\",\"nsuperior\",\"osuperior\",\"\",\"\",\"rsuperior\",\"ssuperior\",\"tsuperior\",\"\",\"ff\",\"fi\",\"fl\",\"ffi\",\"ffl\",\"parenleftinferior\",\"\",\"parenrightinferior\",\"Circumflexsmall\",\"hyphensuperior\",\"Gravesmall\",\"Asmall\",\"Bsmall\",\"Csmall\",\"Dsmall\",\"Esmall\",\"Fsmall\",\"Gsmall\",\"Hsmall\",\"Ismall\",\"Jsmall\",\"Ksmall\",\"Lsmall\",\"Msmall\",\"Nsmall\",\"Osmall\",\"Psmall\",\"Qsmall\",\"Rsmall\",\"Ssmall\",\"Tsmall\",\"Usmall\",\"Vsmall\",\"Wsmall\",\"Xsmall\",\"Ysmall\",\"Zsmall\",\"colonmonetary\",\"onefitted\",\"rupiah\",\"Tildesmall\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"exclamdownsmall\",\"centoldstyle\",\"Lslashsmall\",\"\",\"\",\"Scaronsmall\",\"Zcaronsmall\",\"Dieresissmall\",\"Brevesmall\",\"Caronsmall\",\"\",\"Dotaccentsmall\",\"\",\"\",\"Macronsmall\",\"\",\"\",\"figuredash\",\"hypheninferior\",\"\",\"\",\"Ogoneksmall\",\"Ringsmall\",\"Cedillasmall\",\"\",\"\",\"\",\"onequarter\",\"onehalf\",\"threequarters\",\"questiondownsmall\",\"oneeighth\",\"threeeighths\",\"fiveeighths\",\"seveneighths\",\"onethird\",\"twothirds\",\"\",\"\",\"zerosuperior\",\"onesuperior\",\"twosuperior\",\"threesuperior\",\"foursuperior\",\"fivesuperior\",\"sixsuperior\",\"sevensuperior\",\"eightsuperior\",\"ninesuperior\",\"zeroinferior\",\"oneinferior\",\"twoinferior\",\"threeinferior\",\"fourinferior\",\"fiveinferior\",\"sixinferior\",\"seveninferior\",\"eightinferior\",\"nineinferior\",\"centinferior\",\"dollarinferior\",\"periodinferior\",\"commainferior\",\"Agravesmall\",\"Aacutesmall\",\"Acircumflexsmall\",\"Atildesmall\",\"Adieresissmall\",\"Aringsmall\",\"AEsmall\",\"Ccedillasmall\",\"Egravesmall\",\"Eacutesmall\",\"Ecircumflexsmall\",\"Edieresissmall\",\"Igravesmall\",\"Iacutesmall\",\"Icircumflexsmall\",\"Idieresissmall\",\"Ethsmall\",\"Ntildesmall\",\"Ogravesmall\",\"Oacutesmall\",\"Ocircumflexsmall\",\"Otildesmall\",\"Odieresissmall\",\"OEsmall\",\"Oslashsmall\",\"Ugravesmall\",\"Uacutesmall\",\"Ucircumflexsmall\",\"Udieresissmall\",\"Yacutesmall\",\"Thornsmall\",\"Ydieresissmall\"],l=[\".notdef\",\".null\",\"nonmarkingreturn\",\"space\",\"exclam\",\"quotedbl\",\"numbersign\",\"dollar\",\"percent\",\"ampersand\",\"quotesingle\",\"parenleft\",\"parenright\",\"asterisk\",\"plus\",\"comma\",\"hyphen\",\"period\",\"slash\",\"zero\",\"one\",\"two\",\"three\",\"four\",\"five\",\"six\",\"seven\",\"eight\",\"nine\",\"colon\",\"semicolon\",\"less\",\"equal\",\"greater\",\"question\",\"at\",\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\",\"H\",\"I\",\"J\",\"K\",\"L\",\"M\",\"N\",\"O\",\"P\",\"Q\",\"R\",\"S\",\"T\",\"U\",\"V\",\"W\",\"X\",\"Y\",\"Z\",\"bracketleft\",\"backslash\",\"bracketright\",\"asciicircum\",\"underscore\",\"grave\",\"a\",\"b\",\"c\",\"d\",\"e\",\"f\",\"g\",\"h\",\"i\",\"j\",\"k\",\"l\",\"m\",\"n\",\"o\",\"p\",\"q\",\"r\",\"s\",\"t\",\"u\",\"v\",\"w\",\"x\",\"y\",\"z\",\"braceleft\",\"bar\",\"braceright\",\"asciitilde\",\"Adieresis\",\"Aring\",\"Ccedilla\",\"Eacute\",\"Ntilde\",\"Odieresis\",\"Udieresis\",\"aacute\",\"agrave\",\"acircumflex\",\"adieresis\",\"atilde\",\"aring\",\"ccedilla\",\"eacute\",\"egrave\",\"ecircumflex\",\"edieresis\",\"iacute\",\"igrave\",\"icircumflex\",\"idieresis\",\"ntilde\",\"oacute\",\"ograve\",\"ocircumflex\",\"odieresis\",\"otilde\",\"uacute\",\"ugrave\",\"ucircumflex\",\"udieresis\",\"dagger\",\"degree\",\"cent\",\"sterling\",\"section\",\"bullet\",\"paragraph\",\"germandbls\",\"registered\",\"copyright\",\"trademark\",\"acute\",\"dieresis\",\"notequal\",\"AE\",\"Oslash\",\"infinity\",\"plusminus\",\"lessequal\",\"greaterequal\",\"yen\",\"mu\",\"partialdiff\",\"summation\",\"product\",\"pi\",\"integral\",\"ordfeminine\",\"ordmasculine\",\"Omega\",\"ae\",\"oslash\",\"questiondown\",\"exclamdown\",\"logicalnot\",\"radical\",\"florin\",\"approxequal\",\"Delta\",\"guillemotleft\",\"guillemotright\",\"ellipsis\",\"nonbreakingspace\",\"Agrave\",\"Atilde\",\"Otilde\",\"OE\",\"oe\",\"endash\",\"emdash\",\"quotedblleft\",\"quotedblright\",\"quoteleft\",\"quoteright\",\"divide\",\"lozenge\",\"ydieresis\",\"Ydieresis\",\"fraction\",\"currency\",\"guilsinglleft\",\"guilsinglright\",\"fi\",\"fl\",\"daggerdbl\",\"periodcentered\",\"quotesinglbase\",\"quotedblbase\",\"perthousand\",\"Acircumflex\",\"Ecircumflex\",\"Aacute\",\"Edieresis\",\"Egrave\",\"Iacute\",\"Icircumflex\",\"Idieresis\",\"Igrave\",\"Oacute\",\"Ocircumflex\",\"apple\",\"Ograve\",\"Uacute\",\"Ucircumflex\",\"Ugrave\",\"dotlessi\",\"circumflex\",\"tilde\",\"macron\",\"breve\",\"dotaccent\",\"ring\",\"cedilla\",\"hungarumlaut\",\"ogonek\",\"caron\",\"Lslash\",\"lslash\",\"Scaron\",\"scaron\",\"Zcaron\",\"zcaron\",\"brokenbar\",\"Eth\",\"eth\",\"Yacute\",\"yacute\",\"Thorn\",\"thorn\",\"minus\",\"multiply\",\"onesuperior\",\"twosuperior\",\"threesuperior\",\"onehalf\",\"onequarter\",\"threequarters\",\"franc\",\"Gbreve\",\"gbreve\",\"Idotaccent\",\"Scedilla\",\"scedilla\",\"Cacute\",\"cacute\",\"Ccaron\",\"ccaron\",\"dcroat\"];d.prototype.charToGlyphIndex=function(a){var b=a.charCodeAt(0),c=this.font.glyphs;if(!c)return null;for(var d=0;d<c.length;d+=1){for(var e=c.get(d),f=0;f<e.unicodes.length;f+=1){if(e.unicodes[f]===b)return d;}}},e.prototype.charToGlyphIndex=function(a){return this.cmap.glyphIndexMap[a.charCodeAt(0)]||0;},f.prototype.charToGlyphIndex=function(a){var b=a.charCodeAt(0),c=this.encoding[b];return this.charset.indexOf(c);},g.prototype.nameToGlyphIndex=function(a){return this.names.indexOf(a);},g.prototype.glyphIndexToName=function(a){return this.names[a];},c.cffStandardStrings=i,c.cffStandardEncoding=j,c.cffExpertEncoding=k,c.standardNames=l,c.DefaultEncoding=d,c.CmapEncoding=e,c.CffEncoding=f,c.GlyphNames=g,c.addGlyphNames=h;},{}],5:[function(a,b,c){\"use strict\";function d(a){a=a||{},this.familyName=a.familyName||\" \",this.styleName=a.styleName||\" \",this.designer=a.designer||\" \",this.designerURL=a.designerURL||\" \",this.manufacturer=a.manufacturer||\" \",this.manufacturerURL=a.manufacturerURL||\" \",this.license=a.license||\" \",this.licenseURL=a.licenseURL||\" \",this.version=a.version||\"Version 0.1\",this.description=a.description||\" \",this.copyright=a.copyright||\" \",this.trademark=a.trademark||\" \",this.unitsPerEm=a.unitsPerEm||1e3,this.ascender=a.ascender,this.descender=a.descender,this.supported=!0,this.glyphs=new h.GlyphSet(this,a.glyphs||[]),this.encoding=new g.DefaultEncoding(this),this.tables={};}var e=a(\"./path\"),f=a(\"./tables/sfnt\"),g=a(\"./encoding\"),h=a(\"./glyphset\");d.prototype.hasChar=function(a){return null!==this.encoding.charToGlyphIndex(a);},d.prototype.charToGlyphIndex=function(a){return this.encoding.charToGlyphIndex(a);},d.prototype.charToGlyph=function(a){var b=this.charToGlyphIndex(a),c=this.glyphs.get(b);return c||(c=this.glyphs.get(0)),c;},d.prototype.stringToGlyphs=function(a){for(var b=[],c=0;c<a.length;c+=1){var d=a[c];b.push(this.charToGlyph(d));}return b;},d.prototype.nameToGlyphIndex=function(a){return this.glyphNames.nameToGlyphIndex(a);},d.prototype.nameToGlyph=function(a){var b=this.nametoGlyphIndex(a),c=this.glyphs.get(b);return c||(c=this.glyphs.get(0)),c;},d.prototype.glyphIndexToName=function(a){return this.glyphNames.glyphIndexToName?this.glyphNames.glyphIndexToName(a):\"\";},d.prototype.getKerningValue=function(a,b){a=a.index||a,b=b.index||b;var c=this.getGposKerningValue;return c?c(a,b):this.kerningPairs[a+\",\"+b]||0;},d.prototype.forEachGlyph=function(a,b,c,d,e,f){if(this.supported){b=void 0!==b?b:0,c=void 0!==c?c:0,d=void 0!==d?d:72,e=e||{};for(var g=void 0===e.kerning?!0:e.kerning,h=1/this.unitsPerEm*d,i=this.stringToGlyphs(a),j=0;j<i.length;j+=1){var k=i[j];if(f(k,b,c,d,e),k.advanceWidth&&(b+=k.advanceWidth*h),g&&j<i.length-1){var l=this.getKerningValue(k,i[j+1]);b+=l*h;}}}},d.prototype.getPath=function(a,b,c,d,f){var g=new e.Path();return this.forEachGlyph(a,b,c,d,f,function(a,b,c,d){var e=a.getPath(b,c,d);g.extend(e);}),g;},d.prototype.draw=function(a,b,c,d,e,f){this.getPath(b,c,d,e,f).draw(a);},d.prototype.drawPoints=function(a,b,c,d,e,f){this.forEachGlyph(b,c,d,e,f,function(b,c,d,e){b.drawPoints(a,c,d,e);});},d.prototype.drawMetrics=function(a,b,c,d,e,f){this.forEachGlyph(b,c,d,e,f,function(b,c,d,e){b.drawMetrics(a,c,d,e);});},d.prototype.validate=function(){function a(a,b){a||c.push(b);}function b(b){a(d[b]&&d[b].trim().length>0,\"No \"+b+\" specified.\");}var c=[],d=this;b(\"familyName\"),b(\"weightName\"),b(\"manufacturer\"),b(\"copyright\"),b(\"version\"),a(this.unitsPerEm>0,\"No unitsPerEm specified.\");},d.prototype.toTables=function(){return f.fontToTable(this);},d.prototype.toBuffer=function(){for(var a=this.toTables(),b=a.encode(),c=new ArrayBuffer(b.length),d=new Uint8Array(c),e=0;e<b.length;e++){d[e]=b[e];}return c;},d.prototype.download=function(){var a=this.familyName.replace(/\\s/g,\"\")+\"-\"+this.styleName+\".otf\",b=this.toBuffer();window.requestFileSystem=window.requestFileSystem||window.webkitRequestFileSystem,window.requestFileSystem(window.TEMPORARY,b.byteLength,function(c){c.root.getFile(a,{create:!0},function(a){a.createWriter(function(c){var d=new DataView(b),e=new Blob([d],{type:\"font/opentype\"});c.write(e),c.addEventListener(\"writeend\",function(){location.href=a.toURL();},!1);});});},function(a){throw a;});},c.Font=d;},{\"./encoding\":4,\"./glyphset\":7,\"./path\":10,\"./tables/sfnt\":25}],6:[function(a,b,c){\"use strict\";function d(a,b){var c=b||{commands:[]};return{configurable:!0,get:function get(){return\"function\"==typeof c&&(c=c()),c;},set:function set(a){c=a;}};}function e(a){this.bindConstructorValues(a);}var f=a(\"./check\"),g=a(\"./draw\"),h=a(\"./path\");e.prototype.bindConstructorValues=function(a){this.index=a.index||0,this.name=a.name||null,this.unicode=a.unicode||void 0,this.unicodes=a.unicodes||void 0!==a.unicode?[a.unicode]:[],a.xMin&&(this.xMin=a.xMin),a.yMin&&(this.yMin=a.yMin),a.xMax&&(this.xMax=a.xMax),a.yMax&&(this.yMax=a.yMax),a.advanceWidth&&(this.advanceWidth=a.advanceWidth),Object.defineProperty(this,\"path\",d(this,a.path));},e.prototype.addUnicode=function(a){0===this.unicodes.length&&(this.unicode=a),this.unicodes.push(a);},e.prototype.getPath=function(a,b,c){a=void 0!==a?a:0,b=void 0!==b?b:0,c=void 0!==c?c:72;for(var d=1/this.path.unitsPerEm*c,e=new h.Path(),f=this.path.commands,g=0;g<f.length;g+=1){var i=f[g];\"M\"===i.type?e.moveTo(a+i.x*d,b+-i.y*d):\"L\"===i.type?e.lineTo(a+i.x*d,b+-i.y*d):\"Q\"===i.type?e.quadraticCurveTo(a+i.x1*d,b+-i.y1*d,a+i.x*d,b+-i.y*d):\"C\"===i.type?e.curveTo(a+i.x1*d,b+-i.y1*d,a+i.x2*d,b+-i.y2*d,a+i.x*d,b+-i.y*d):\"Z\"===i.type&&e.closePath();}return e;},e.prototype.getContours=function(){if(void 0===this.points)return[];for(var a=[],b=[],c=0;c<this.points.length;c+=1){var d=this.points[c];b.push(d),d.lastPointOfContour&&(a.push(b),b=[]);}return f.argument(0===b.length,\"There are still points left in the current contour.\"),a;},e.prototype.getMetrics=function(){for(var a=this.path.commands,b=[],c=[],d=0;d<a.length;d+=1){var e=a[d];\"Z\"!==e.type&&(b.push(e.x),c.push(e.y)),(\"Q\"===e.type||\"C\"===e.type)&&(b.push(e.x1),c.push(e.y1)),\"C\"===e.type&&(b.push(e.x2),c.push(e.y2));}var f={xMin:Math.min.apply(null,b),yMin:Math.min.apply(null,c),xMax:Math.max.apply(null,b),yMax:Math.max.apply(null,c),leftSideBearing:0};return f.rightSideBearing=this.advanceWidth-f.leftSideBearing-(f.xMax-f.xMin),f;},e.prototype.draw=function(a,b,c,d){this.getPath(b,c,d).draw(a);},e.prototype.drawPoints=function(a,b,c,d){function e(b,c,d,e){var f=2*Math.PI;a.beginPath();for(var g=0;g<b.length;g+=1){a.moveTo(c+b[g].x*e,d+b[g].y*e),a.arc(c+b[g].x*e,d+b[g].y*e,2,0,f,!1);}a.closePath(),a.fill();}b=void 0!==b?b:0,c=void 0!==c?c:0,d=void 0!==d?d:24;for(var f=1/this.path.unitsPerEm*d,g=[],h=[],i=this.path,j=0;j<i.commands.length;j+=1){var k=i.commands[j];void 0!==k.x&&g.push({x:k.x,y:-k.y}),void 0!==k.x1&&h.push({x:k.x1,y:-k.y1}),void 0!==k.x2&&h.push({x:k.x2,y:-k.y2});}a.fillStyle=\"blue\",e(g,b,c,f),a.fillStyle=\"red\",e(h,b,c,f);},e.prototype.drawMetrics=function(a,b,c,d){var e;b=void 0!==b?b:0,c=void 0!==c?c:0,d=void 0!==d?d:24,e=1/this.path.unitsPerEm*d,a.lineWidth=1,a.strokeStyle=\"black\",g.line(a,b,-1e4,b,1e4),g.line(a,-1e4,c,1e4,c);var f=this.xMin||0,h=this.yMin||0,i=this.xMax||0,j=this.yMax||0,k=this.advanceWidth||0;a.strokeStyle=\"blue\",g.line(a,b+f*e,-1e4,b+f*e,1e4),g.line(a,b+i*e,-1e4,b+i*e,1e4),g.line(a,-1e4,c+-h*e,1e4,c+-h*e),g.line(a,-1e4,c+-j*e,1e4,c+-j*e),a.strokeStyle=\"green\",g.line(a,b+k*e,-1e4,b+k*e,1e4);},c.Glyph=e;},{\"./check\":2,\"./draw\":3,\"./path\":10}],7:[function(a,b,c){\"use strict\";function d(a,b){if(this.font=a,this.glyphs={},Array.isArray(b))for(var c=0;c<b.length;c++){this.glyphs[c]=b[c];}this.length=b&&b.length||0;}function e(a,b){return new h.Glyph({index:b,font:a});}function f(a,b,c,d,e,f){return function(){var g=new h.Glyph({index:b,font:a});return g.path=function(){c(g,d,e);var b=f(a.glyphs,g);return b.unitsPerEm=a.unitsPerEm,b;},g;};}function g(a,b,c,d){return function(){var e=new h.Glyph({index:b,font:a});return e.path=function(){var b=c(a,e,d);return b.unitsPerEm=a.unitsPerEm,b;},e;};}var h=a(\"./glyph\");d.prototype.get=function(a){return\"function\"==typeof this.glyphs[a]&&(this.glyphs[a]=this.glyphs[a]()),this.glyphs[a];},d.prototype.push=function(a,b){this.glyphs[a]=b,this.length++;},c.GlyphSet=d,c.glyphLoader=e,c.ttfGlyphLoader=f,c.cffGlyphLoader=g;},{\"./glyph\":6}],8:[function(a,b,c){\"use strict\";function d(a){for(var b=new ArrayBuffer(a.length),c=new Uint8Array(b),d=0;d<a.length;d+=1){c[d]=a[d];}return b;}function e(b,c){var e=a(\"fs\");e.readFile(b,function(a,b){return a?c(a.message):void c(null,d(b));});}function f(a,b){var c=new XMLHttpRequest();c.open(\"get\",a,!0),c.responseType=\"arraybuffer\",c.onload=function(){return 200!==c.status?b(\"Font could not be loaded: \"+c.statusText):b(null,c.response);},c.send();}function g(a){var b,c,d,e,f,g,h,k=new j.Font(),m=new DataView(a,0),A=l.getFixed(m,0);if(1===A)k.outlinesFormat=\"truetype\";else{if(A=l.getTag(m,0),\"OTTO\"!==A)throw new Error(\"Unsupported OpenType version \"+A);k.outlinesFormat=\"cff\";}for(var B=l.getUShort(m,4),C=12,D=0;B>D;D+=1){var E=l.getTag(m,C),F=l.getULong(m,C+8);switch(E){case\"cmap\":k.tables.cmap=n.parse(m,F),k.encoding=new i.CmapEncoding(k.tables.cmap),k.encoding||(k.supported=!1);break;case\"head\":k.tables.head=r.parse(m,F),k.unitsPerEm=k.tables.head.unitsPerEm,b=k.tables.head.indexToLocFormat;break;case\"hhea\":k.tables.hhea=s.parse(m,F),k.ascender=k.tables.hhea.ascender,k.descender=k.tables.hhea.descender,k.numberOfHMetrics=k.tables.hhea.numberOfHMetrics;break;case\"hmtx\":c=F;break;case\"maxp\":k.tables.maxp=w.parse(m,F),k.numGlyphs=k.tables.maxp.numGlyphs;break;case\"name\":k.tables.name=x.parse(m,F),k.familyName=k.tables.name.fontFamily,k.styleName=k.tables.name.fontSubfamily;break;case\"OS/2\":k.tables.os2=y.parse(m,F);break;case\"post\":k.tables.post=z.parse(m,F),k.glyphNames=new i.GlyphNames(k.tables.post);break;case\"glyf\":d=F;break;case\"loca\":e=F;break;case\"CFF \":f=F;break;case\"kern\":g=F;break;case\"GPOS\":h=F;}C+=16;}if(d&&e){var G=0===b,H=v.parse(m,e,k.numGlyphs,G);k.glyphs=p.parse(m,d,H,k),t.parse(m,c,k.numberOfHMetrics,k.numGlyphs,k.glyphs),i.addGlyphNames(k);}else f?(o.parse(m,f,k),i.addGlyphNames(k)):k.supported=!1;return k.supported&&(g?k.kerningPairs=u.parse(m,g):k.kerningPairs={},h&&q.parse(m,h,k)),k;}function h(a,b){var c=\"undefined\"==typeof window,d=c?e:f;d(a,function(a,c){if(a)return b(a);var d=g(c);return d.supported?b(null,d):b(\"Font is not supported (is this a Postscript font?)\");});}var i=a(\"./encoding\"),j=a(\"./font\"),k=a(\"./glyph\"),l=a(\"./parse\"),m=a(\"./path\"),n=a(\"./tables/cmap\"),o=a(\"./tables/cff\"),p=a(\"./tables/glyf\"),q=a(\"./tables/gpos\"),r=a(\"./tables/head\"),s=a(\"./tables/hhea\"),t=a(\"./tables/hmtx\"),u=a(\"./tables/kern\"),v=a(\"./tables/loca\"),w=a(\"./tables/maxp\"),x=a(\"./tables/name\"),y=a(\"./tables/os2\"),z=a(\"./tables/post\");c._parse=l,c.Font=j.Font,c.Glyph=k.Glyph,c.Path=m.Path,c.parse=g,c.load=h;},{\"./encoding\":4,\"./font\":5,\"./glyph\":6,\"./parse\":9,\"./path\":10,\"./tables/cff\":12,\"./tables/cmap\":13,\"./tables/glyf\":14,\"./tables/gpos\":15,\"./tables/head\":16,\"./tables/hhea\":17,\"./tables/hmtx\":18,\"./tables/kern\":19,\"./tables/loca\":20,\"./tables/maxp\":21,\"./tables/name\":22,\"./tables/os2\":23,\"./tables/post\":24,fs:1}],9:[function(a,b,c){\"use strict\";function d(a,b){this.data=a,this.offset=b,this.relativeOffset=0;}c.getByte=function(a,b){return a.getUint8(b);},c.getCard8=c.getByte,c.getUShort=function(a,b){return a.getUint16(b,!1);},c.getCard16=c.getUShort,c.getShort=function(a,b){return a.getInt16(b,!1);},c.getULong=function(a,b){return a.getUint32(b,!1);},c.getFixed=function(a,b){var c=a.getInt16(b,!1),d=a.getUint16(b+2,!1);return c+d/65535;},c.getTag=function(a,b){for(var c=\"\",d=b;b+4>d;d+=1){c+=String.fromCharCode(a.getInt8(d));}return c;},c.getOffset=function(a,b,c){for(var d=0,e=0;c>e;e+=1){d<<=8,d+=a.getUint8(b+e);}return d;},c.getBytes=function(a,b,c){for(var d=[],e=b;c>e;e+=1){d.push(a.getUint8(e));}return d;},c.bytesToString=function(a){for(var b=\"\",c=0;c<a.length;c+=1){b+=String.fromCharCode(a[c]);}return b;};var e={\"byte\":1,uShort:2,\"short\":2,uLong:4,fixed:4,longDateTime:8,tag:4};d.prototype.parseByte=function(){var a=this.data.getUint8(this.offset+this.relativeOffset);return this.relativeOffset+=1,a;},d.prototype.parseChar=function(){var a=this.data.getInt8(this.offset+this.relativeOffset);return this.relativeOffset+=1,a;},d.prototype.parseCard8=d.prototype.parseByte,d.prototype.parseUShort=function(){var a=this.data.getUint16(this.offset+this.relativeOffset);return this.relativeOffset+=2,a;},d.prototype.parseCard16=d.prototype.parseUShort,d.prototype.parseSID=d.prototype.parseUShort,d.prototype.parseOffset16=d.prototype.parseUShort,d.prototype.parseShort=function(){var a=this.data.getInt16(this.offset+this.relativeOffset);return this.relativeOffset+=2,a;},d.prototype.parseF2Dot14=function(){var a=this.data.getInt16(this.offset+this.relativeOffset)/16384;return this.relativeOffset+=2,a;},d.prototype.parseULong=function(){var a=c.getULong(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,a;},d.prototype.parseFixed=function(){var a=c.getFixed(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,a;},d.prototype.parseOffset16List=d.prototype.parseUShortList=function(a){for(var b=new Array(a),d=this.data,e=this.offset+this.relativeOffset,f=0;a>f;f++){b[f]=c.getUShort(d,e),e+=2;}return this.relativeOffset+=2*a,b;},d.prototype.parseString=function(a){var b=this.data,c=this.offset+this.relativeOffset,d=\"\";this.relativeOffset+=a;for(var e=0;a>e;e++){d+=String.fromCharCode(b.getUint8(c+e));}return d;},d.prototype.parseTag=function(){return this.parseString(4);},d.prototype.parseLongDateTime=function(){var a=c.getULong(this.data,this.offset+this.relativeOffset+4);return this.relativeOffset+=8,a;},d.prototype.parseFixed=function(){var a=c.getULong(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,a/65536;},d.prototype.parseVersion=function(){var a=c.getUShort(this.data,this.offset+this.relativeOffset),b=c.getUShort(this.data,this.offset+this.relativeOffset+2);return this.relativeOffset+=4,a+b/4096/10;},d.prototype.skip=function(a,b){void 0===b&&(b=1),this.relativeOffset+=e[a]*b;},c.Parser=d;},{}],10:[function(a,b,c){\"use strict\";function d(){this.commands=[],this.fill=\"black\",this.stroke=null,this.strokeWidth=1;}d.prototype.moveTo=function(a,b){this.commands.push({type:\"M\",x:a,y:b});},d.prototype.lineTo=function(a,b){this.commands.push({type:\"L\",x:a,y:b});},d.prototype.curveTo=d.prototype.bezierCurveTo=function(a,b,c,d,e,f){this.commands.push({type:\"C\",x1:a,y1:b,x2:c,y2:d,x:e,y:f});},d.prototype.quadTo=d.prototype.quadraticCurveTo=function(a,b,c,d){this.commands.push({type:\"Q\",x1:a,y1:b,x:c,y:d});},d.prototype.close=d.prototype.closePath=function(){this.commands.push({type:\"Z\"});},d.prototype.extend=function(a){a.commands&&(a=a.commands),Array.prototype.push.apply(this.commands,a);},d.prototype.draw=function(a){a.beginPath();for(var b=0;b<this.commands.length;b+=1){var c=this.commands[b];\"M\"===c.type?a.moveTo(c.x,c.y):\"L\"===c.type?a.lineTo(c.x,c.y):\"C\"===c.type?a.bezierCurveTo(c.x1,c.y1,c.x2,c.y2,c.x,c.y):\"Q\"===c.type?a.quadraticCurveTo(c.x1,c.y1,c.x,c.y):\"Z\"===c.type&&a.closePath();}this.fill&&(a.fillStyle=this.fill,a.fill()),this.stroke&&(a.strokeStyle=this.stroke,a.lineWidth=this.strokeWidth,a.stroke());},d.prototype.toPathData=function(a){function b(b){return Math.round(b)===b?\"\"+Math.round(b):b.toFixed(a);}function c(){for(var a=\"\",c=0;c<arguments.length;c+=1){var d=arguments[c];d>=0&&c>0&&(a+=\" \"),a+=b(d);}return a;}a=void 0!==a?a:2;for(var d=\"\",e=0;e<this.commands.length;e+=1){var f=this.commands[e];\"M\"===f.type?d+=\"M\"+c(f.x,f.y):\"L\"===f.type?d+=\"L\"+c(f.x,f.y):\"C\"===f.type?d+=\"C\"+c(f.x1,f.y1,f.x2,f.y2,f.x,f.y):\"Q\"===f.type?d+=\"Q\"+c(f.x1,f.y1,f.x,f.y):\"Z\"===f.type&&(d+=\"Z\");}return d;},d.prototype.toSVG=function(a){var b='<path d=\"';return b+=this.toPathData(a),b+='\"',this.fill&\"black\"!==this.fill&&(b+=null===this.fill?' fill=\"none\"':' fill=\"'+this.fill+'\"'),this.stroke&&(b+=' stroke=\"'+this.stroke+'\" stroke-width=\"'+this.strokeWidth+'\"'),b+=\"/>\";},c.Path=d;},{}],11:[function(a,b,c){\"use strict\";function d(a,b,c){var d;for(d=0;d<b.length;d+=1){var e=b[d];this[e.name]=e.value;}if(this.tableName=a,this.fields=b,c){var f=Object.keys(c);for(d=0;d<f.length;d+=1){var g=f[d],h=c[g];void 0!==this[g]&&(this[g]=h);}}}var e=a(\"./check\"),f=a(\"./types\").encode,g=a(\"./types\").sizeOf;d.prototype.sizeOf=function(){for(var a=0,b=0;b<this.fields.length;b+=1){var c=this.fields[b],d=this[c.name];if(void 0===d&&(d=c.value),\"function\"==typeof d.sizeOf)a+=d.sizeOf();else{var f=g[c.type];e.assert(\"function\"==typeof f,\"Could not find sizeOf function for field\"+c.name),a+=f(d);}}return a;},d.prototype.encode=function(){return f.TABLE(this);},c.Table=d;},{\"./check\":2,\"./types\":26}],12:[function(a,b,c){\"use strict\";function d(a,b){if(a===b)return!0;if(Array.isArray(a)&&Array.isArray(b)){if(a.length!==b.length)return!1;for(var c=0;c<a.length;c+=1){if(!d(a[c],b[c]))return!1;}return!0;}return!1;}function e(a,b,c){var d,e,f,g=[],h=[],i=J.getCard16(a,b);if(0!==i){var j=J.getByte(a,b+2);e=b+(i+1)*j+2;var k=b+3;for(d=0;i+1>d;d+=1){g.push(J.getOffset(a,k,j)),k+=j;}f=e+g[i];}else f=b+2;for(d=0;d<g.length-1;d+=1){var l=J.getBytes(a,e+g[d],e+g[d+1]);c&&(l=c(l)),h.push(l);}return{objects:h,startOffset:b,endOffset:f};}function f(a){for(var b=\"\",c=15,d=[\"0\",\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\".\",\"E\",\"E-\",null,\"-\"];;){var e=a.parseByte(),f=e>>4,g=15&e;if(f===c)break;if(b+=d[f],g===c)break;b+=d[g];}return parseFloat(b);}function g(a,b){var c,d,e,g;if(28===b)return c=a.parseByte(),d=a.parseByte(),c<<8|d;if(29===b)return c=a.parseByte(),d=a.parseByte(),e=a.parseByte(),g=a.parseByte(),c<<24|d<<16|e<<8|g;if(30===b)return f(a);if(b>=32&&246>=b)return b-139;if(b>=247&&250>=b)return c=a.parseByte(),256*(b-247)+c+108;if(b>=251&&254>=b)return c=a.parseByte(),256*-(b-251)-c-108;throw new Error(\"Invalid b0 \"+b);}function h(a){for(var b={},c=0;c<a.length;c+=1){var d,e=a[c][0],f=a[c][1];if(d=1===f.length?f[0]:f,b.hasOwnProperty(e))throw new Error(\"Object \"+b+\" already has key \"+e);b[e]=d;}return b;}function i(a,b,c){b=void 0!==b?b:0;var d=new J.Parser(a,b),e=[],f=[];for(c=void 0!==c?c:a.length;d.relativeOffset<c;){var i=d.parseByte();21>=i?(12===i&&(i=1200+d.parseByte()),e.push([i,f]),f=[]):f.push(g(d,i));}return h(e);}function j(a,b){return b=390>=b?H.cffStandardStrings[b]:a[b-391];}function k(a,b,c){for(var d={},e=0;e<b.length;e+=1){var f=b[e],g=a[f.op];void 0===g&&(g=void 0!==f.value?f.value:null),\"SID\"===f.type&&(g=j(c,g)),d[f.name]=g;}return d;}function l(a,b){var c={};return c.formatMajor=J.getCard8(a,b),c.formatMinor=J.getCard8(a,b+1),c.size=J.getCard8(a,b+2),c.offsetSize=J.getCard8(a,b+3),c.startOffset=b,c.endOffset=b+4,c;}function m(a,b){var c=i(a,0,a.byteLength);return k(c,M,b);}function n(a,b,c,d){var e=i(a,b,c);return k(e,N,d);}function o(a,b,c,d){var e,f,g,h=new J.Parser(a,b);c-=1;var i=[\".notdef\"],k=h.parseCard8();if(0===k)for(e=0;c>e;e+=1){f=h.parseSID(),i.push(j(d,f));}else if(1===k)for(;i.length<=c;){for(f=h.parseSID(),g=h.parseCard8(),e=0;g>=e;e+=1){i.push(j(d,f)),f+=1;}}else{if(2!==k)throw new Error(\"Unknown charset format \"+k);for(;i.length<=c;){for(f=h.parseSID(),g=h.parseCard16(),e=0;g>=e;e+=1){i.push(j(d,f)),f+=1;}}}return i;}function p(a,b,c){var d,e,f={},g=new J.Parser(a,b),h=g.parseCard8();if(0===h){var i=g.parseCard8();for(d=0;i>d;d+=1){e=g.parseCard8(),f[e]=d;}}else{if(1!==h)throw new Error(\"Unknown encoding format \"+h);var j=g.parseCard8();for(e=1,d=0;j>d;d+=1){for(var k=g.parseCard8(),l=g.parseCard8(),m=k;k+l>=m;m+=1){f[m]=e,e+=1;}}}return new H.CffEncoding(f,c);}function q(a,b,c){function d(a,b){p&&k.closePath(),k.moveTo(a,b),p=!0;}function e(){var b;b=l.length%2!==0,b&&!n&&(o=l.shift()+a.nominalWidthX),m+=l.length>>1,l.length=0,n=!0;}function f(c){for(var s,t,u,v,w,x,y,z,A,B,C,D,E=0;E<c.length;){var F=c[E];switch(E+=1,F){case 1:e();break;case 3:e();break;case 4:l.length>1&&!n&&(o=l.shift()+a.nominalWidthX,n=!0),r+=l.pop(),d(q,r);break;case 5:for(;l.length>0;){q+=l.shift(),r+=l.shift(),k.lineTo(q,r);}break;case 6:for(;l.length>0&&(q+=l.shift(),k.lineTo(q,r),0!==l.length);){r+=l.shift(),k.lineTo(q,r);}break;case 7:for(;l.length>0&&(r+=l.shift(),k.lineTo(q,r),0!==l.length);){q+=l.shift(),k.lineTo(q,r);}break;case 8:for(;l.length>0;){g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j+l.shift(),k.curveTo(g,h,i,j,q,r);}break;case 10:w=l.pop()+a.subrsBias,x=a.subrs[w],x&&f(x);break;case 11:return;case 12:switch(F=c[E],E+=1,F){case 35:g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),y=i+l.shift(),z=j+l.shift(),A=y+l.shift(),B=z+l.shift(),C=A+l.shift(),D=B+l.shift(),q=C+l.shift(),r=D+l.shift(),l.shift(),k.curveTo(g,h,i,j,y,z),k.curveTo(A,B,C,D,q,r);break;case 34:g=q+l.shift(),h=r,i=g+l.shift(),j=h+l.shift(),y=i+l.shift(),z=j,A=y+l.shift(),B=j,C=A+l.shift(),D=r,q=C+l.shift(),k.curveTo(g,h,i,j,y,z),k.curveTo(A,B,C,D,q,r);break;case 36:g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),y=i+l.shift(),z=j,A=y+l.shift(),B=j,C=A+l.shift(),D=B+l.shift(),q=C+l.shift(),k.curveTo(g,h,i,j,y,z),k.curveTo(A,B,C,D,q,r);break;case 37:g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),y=i+l.shift(),z=j+l.shift(),A=y+l.shift(),B=z+l.shift(),C=A+l.shift(),D=B+l.shift(),Math.abs(C-q)>Math.abs(D-r)?q=C+l.shift():r=D+l.shift(),k.curveTo(g,h,i,j,y,z),k.curveTo(A,B,C,D,q,r);break;default:console.log(\"Glyph \"+b.index+\": unknown operator 1200\"+F),l.length=0;}break;case 14:l.length>0&&!n&&(o=l.shift()+a.nominalWidthX,n=!0),p&&(k.closePath(),p=!1);break;case 18:e();break;case 19:case 20:e(),E+=m+7>>3;break;case 21:l.length>2&&!n&&(o=l.shift()+a.nominalWidthX,n=!0),r+=l.pop(),q+=l.pop(),d(q,r);break;case 22:l.length>1&&!n&&(o=l.shift()+a.nominalWidthX,n=!0),q+=l.pop(),d(q,r);break;case 23:e();break;case 24:for(;l.length>2;){g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j+l.shift(),k.curveTo(g,h,i,j,q,r);}q+=l.shift(),r+=l.shift(),k.lineTo(q,r);break;case 25:for(;l.length>6;){q+=l.shift(),r+=l.shift(),k.lineTo(q,r);}g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j+l.shift(),k.curveTo(g,h,i,j,q,r);break;case 26:for(l.length%2&&(q+=l.shift());l.length>0;){g=q,h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i,r=j+l.shift(),k.curveTo(g,h,i,j,q,r);}break;case 27:for(l.length%2&&(r+=l.shift());l.length>0;){g=q+l.shift(),h=r,i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j,k.curveTo(g,h,i,j,q,r);}break;case 28:s=c[E],t=c[E+1],l.push((s<<24|t<<16)>>16),E+=2;break;case 29:w=l.pop()+a.gsubrsBias,x=a.gsubrs[w],x&&f(x);break;case 30:for(;l.length>0&&(g=q,h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j+(1===l.length?l.shift():0),k.curveTo(g,h,i,j,q,r),0!==l.length);){g=q+l.shift(),h=r,i=g+l.shift(),j=h+l.shift(),r=j+l.shift(),q=i+(1===l.length?l.shift():0),k.curveTo(g,h,i,j,q,r);}break;case 31:for(;l.length>0&&(g=q+l.shift(),h=r,i=g+l.shift(),j=h+l.shift(),r=j+l.shift(),q=i+(1===l.length?l.shift():0),k.curveTo(g,h,i,j,q,r),0!==l.length);){g=q,h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j+(1===l.length?l.shift():0),k.curveTo(g,h,i,j,q,r);}break;default:32>F?console.log(\"Glyph \"+b.index+\": unknown operator \"+F):247>F?l.push(F-139):251>F?(s=c[E],E+=1,l.push(256*(F-247)+s+108)):255>F?(s=c[E],E+=1,l.push(256*-(F-251)-s-108)):(s=c[E],t=c[E+1],u=c[E+2],v=c[E+3],E+=4,l.push((s<<24|t<<16|u<<8|v)/65536));}}}var g,h,i,j,k=new K.Path(),l=[],m=0,n=!1,o=a.defaultWidthX,p=!1,q=0,r=0;return f(c),b.advanceWidth=o,k;}function r(a){var b;return b=a.length<1240?107:a.length<33900?1131:32768;}function s(a,b,c){c.tables.cff={};var d=l(a,b),f=e(a,d.endOffset,J.bytesToString),g=e(a,f.endOffset),h=e(a,g.endOffset,J.bytesToString),i=e(a,h.endOffset);c.gsubrs=i.objects,c.gsubrsBias=r(c.gsubrs);var j=new DataView(new Uint8Array(g.objects[0]).buffer),k=m(j,h.objects);c.tables.cff.topDict=k;var s=b+k[\"private\"][1],t=n(a,s,k[\"private\"][0],h.objects);if(c.defaultWidthX=t.defaultWidthX,c.nominalWidthX=t.nominalWidthX,0!==t.subrs){var u=s+t.subrs,v=e(a,u);c.subrs=v.objects,c.subrsBias=r(c.subrs);}else c.subrs=[],c.subrsBias=0;var w=e(a,b+k.charStrings);c.nGlyphs=w.objects.length;var x=o(a,b+k.charset,c.nGlyphs,h.objects);0===k.encoding?c.cffEncoding=new H.CffEncoding(H.cffStandardEncoding,x):1===k.encoding?c.cffEncoding=new H.CffEncoding(H.cffExpertEncoding,x):c.cffEncoding=p(a,b+k.encoding,x),c.encoding=c.encoding||c.cffEncoding,c.glyphs=new I.GlyphSet(c);for(var y=0;y<c.nGlyphs;y+=1){var z=w.objects[y];c.glyphs.push(y,I.cffGlyphLoader(c,y,q,z));}}function t(a,b){var c,d=H.cffStandardStrings.indexOf(a);return d>=0&&(c=d),d=b.indexOf(a),d>=0?c=d+H.cffStandardStrings.length:(c=H.cffStandardStrings.length+b.length,b.push(a)),c;}function u(){return new L.Table(\"Header\",[{name:\"major\",type:\"Card8\",value:1},{name:\"minor\",type:\"Card8\",value:0},{name:\"hdrSize\",type:\"Card8\",value:4},{name:\"major\",type:\"Card8\",value:1}]);}function v(a){var b=new L.Table(\"Name INDEX\",[{name:\"names\",type:\"INDEX\",value:[]}]);b.names=[];for(var c=0;c<a.length;c+=1){b.names.push({name:\"name_\"+c,type:\"NAME\",value:a[c]});}return b;}function w(a,b,c){for(var e={},f=0;f<a.length;f+=1){var g=a[f],h=b[g.name];void 0===h||d(h,g.value)||(\"SID\"===g.type&&(h=t(h,c)),e[g.op]={name:g.name,type:g.type,value:h});}return e;}function x(a,b){var c=new L.Table(\"Top DICT\",[{name:\"dict\",type:\"DICT\",value:{}}]);return c.dict=w(M,a,b),c;}function y(a){var b=new L.Table(\"Top DICT INDEX\",[{name:\"topDicts\",type:\"INDEX\",value:[]}]);return b.topDicts=[{name:\"topDict_0\",type:\"TABLE\",value:a}],b;}function z(a){var b=new L.Table(\"String INDEX\",[{name:\"strings\",type:\"INDEX\",value:[]}]);b.strings=[];for(var c=0;c<a.length;c+=1){b.strings.push({name:\"string_\"+c,type:\"STRING\",value:a[c]});}return b;}function A(){return new L.Table(\"Global Subr INDEX\",[{name:\"subrs\",type:\"INDEX\",value:[]}]);}function B(a,b){for(var c=new L.Table(\"Charsets\",[{name:\"format\",type:\"Card8\",value:0}]),d=0;d<a.length;d+=1){var e=a[d],f=t(e,b);c.fields.push({name:\"glyph_\"+d,type:\"SID\",value:f});}return c;}function C(a){var b=[],c=a.path;b.push({name:\"width\",type:\"NUMBER\",value:a.advanceWidth});for(var d=0,e=0,f=0;f<c.commands.length;f+=1){var g,h,i=c.commands[f];if(\"Q\"===i.type){var j=1/3,k=2/3;i={type:\"C\",x:i.x,y:i.y,x1:j*d+k*i.x1,y1:j*e+k*i.y1,x2:j*i.x+k*i.x1,y2:j*i.y+k*i.y1};}if(\"M\"===i.type)g=Math.round(i.x-d),h=Math.round(i.y-e),b.push({name:\"dx\",type:\"NUMBER\",value:g}),b.push({name:\"dy\",type:\"NUMBER\",value:h}),b.push({name:\"rmoveto\",type:\"OP\",value:21}),d=Math.round(i.x),e=Math.round(i.y);else if(\"L\"===i.type)g=Math.round(i.x-d),h=Math.round(i.y-e),b.push({name:\"dx\",type:\"NUMBER\",value:g}),b.push({name:\"dy\",type:\"NUMBER\",value:h}),b.push({name:\"rlineto\",type:\"OP\",value:5}),d=Math.round(i.x),e=Math.round(i.y);else if(\"C\"===i.type){var l=Math.round(i.x1-d),m=Math.round(i.y1-e),n=Math.round(i.x2-i.x1),o=Math.round(i.y2-i.y1);g=Math.round(i.x-i.x2),h=Math.round(i.y-i.y2),b.push({name:\"dx1\",type:\"NUMBER\",value:l}),b.push({name:\"dy1\",type:\"NUMBER\",value:m}),b.push({name:\"dx2\",type:\"NUMBER\",value:n}),b.push({name:\"dy2\",type:\"NUMBER\",value:o}),b.push({name:\"dx\",type:\"NUMBER\",value:g}),b.push({name:\"dy\",type:\"NUMBER\",value:h}),b.push({name:\"rrcurveto\",type:\"OP\",value:8}),d=Math.round(i.x),e=Math.round(i.y);}}return b.push({name:\"endchar\",type:\"OP\",value:14}),b;}function D(a){for(var b=new L.Table(\"CharStrings INDEX\",[{name:\"charStrings\",type:\"INDEX\",value:[]}]),c=0;c<a.length;c+=1){var d=a.get(c),e=C(d);b.charStrings.push({name:d.name,type:\"CHARSTRING\",value:e});}return b;}function E(a,b){var c=new L.Table(\"Private DICT\",[{name:\"dict\",type:\"DICT\",value:{}}]);return c.dict=w(N,a,b),c;}function F(a){var b=new L.Table(\"Private DICT INDEX\",[{name:\"privateDicts\",type:\"INDEX\",value:[]}]);return b.privateDicts=[{name:\"privateDict_0\",type:\"TABLE\",value:a}],b;}function G(a,b){for(var c,d=new L.Table(\"CFF \",[{name:\"header\",type:\"TABLE\"},{name:\"nameIndex\",type:\"TABLE\"},{name:\"topDictIndex\",type:\"TABLE\"},{name:\"stringIndex\",type:\"TABLE\"},{name:\"globalSubrIndex\",type:\"TABLE\"},{name:\"charsets\",type:\"TABLE\"},{name:\"charStringsIndex\",type:\"TABLE\"},{name:\"privateDictIndex\",type:\"TABLE\"}]),e=1/b.unitsPerEm,f={version:b.version,fullName:b.fullName,familyName:b.familyName,weight:b.weightName,fontMatrix:[e,0,0,e,0,0],charset:999,encoding:0,charStrings:999,\"private\":[0,999]},g={},h=[],i=1;i<a.length;i+=1){c=a.get(i),h.push(c.name);}var j=[];d.header=u(),d.nameIndex=v([b.postScriptName]);var k=x(f,j);d.topDictIndex=y(k),d.globalSubrIndex=A(),d.charsets=B(h,j),d.charStringsIndex=D(a);var l=E(g,j);d.privateDictIndex=F(l),d.stringIndex=z(j);var m=d.header.sizeOf()+d.nameIndex.sizeOf()+d.topDictIndex.sizeOf()+d.stringIndex.sizeOf()+d.globalSubrIndex.sizeOf();return f.charset=m,f.encoding=0,f.charStrings=f.charset+d.charsets.sizeOf(),f[\"private\"][1]=f.charStrings+d.charStringsIndex.sizeOf(),k=x(f,j),d.topDictIndex=y(k),d;}var H=a(\"../encoding\"),I=a(\"../glyphset\"),J=a(\"../parse\"),K=a(\"../path\"),L=a(\"../table\"),M=[{name:\"version\",op:0,type:\"SID\"},{name:\"notice\",op:1,type:\"SID\"},{name:\"copyright\",op:1200,type:\"SID\"},{name:\"fullName\",op:2,type:\"SID\"},{name:\"familyName\",op:3,type:\"SID\"},{name:\"weight\",op:4,type:\"SID\"},{name:\"isFixedPitch\",op:1201,type:\"number\",value:0},{name:\"italicAngle\",op:1202,type:\"number\",value:0},{name:\"underlinePosition\",op:1203,type:\"number\",value:-100},{name:\"underlineThickness\",op:1204,type:\"number\",value:50},{name:\"paintType\",op:1205,type:\"number\",value:0},{name:\"charstringType\",op:1206,type:\"number\",value:2},{name:\"fontMatrix\",op:1207,type:[\"real\",\"real\",\"real\",\"real\",\"real\",\"real\"],value:[.001,0,0,.001,0,0]},{name:\"uniqueId\",op:13,type:\"number\"},{name:\"fontBBox\",op:5,type:[\"number\",\"number\",\"number\",\"number\"],value:[0,0,0,0]},{name:\"strokeWidth\",op:1208,type:\"number\",value:0},{name:\"xuid\",op:14,type:[],value:null},{name:\"charset\",op:15,type:\"offset\",value:0},{name:\"encoding\",op:16,type:\"offset\",value:0},{name:\"charStrings\",op:17,type:\"offset\",value:0},{name:\"private\",op:18,type:[\"number\",\"offset\"],value:[0,0]}],N=[{name:\"subrs\",op:19,type:\"offset\",value:0},{name:\"defaultWidthX\",op:20,type:\"number\",value:0},{name:\"nominalWidthX\",op:21,type:\"number\",value:0}];c.parse=s,c.make=G;},{\"../encoding\":4,\"../glyphset\":7,\"../parse\":9,\"../path\":10,\"../table\":11}],13:[function(a,b,c){\"use strict\";function d(a,b){var c,d={};d.version=i.getUShort(a,b),h.argument(0===d.version,\"cmap table version should be 0.\"),d.numTables=i.getUShort(a,b+2);var e=-1;for(c=0;c<d.numTables;c+=1){var f=i.getUShort(a,b+4+8*c),g=i.getUShort(a,b+4+8*c+2);if(3===f&&(1===g||0===g)){e=i.getULong(a,b+4+8*c+4);break;}}if(-1===e)return null;var j=new i.Parser(a,b+e);d.format=j.parseUShort(),h.argument(4===d.format,\"Only format 4 cmap tables are supported.\"),d.length=j.parseUShort(),d.language=j.parseUShort();var k;d.segCount=k=j.parseUShort()>>1,j.skip(\"uShort\",3),d.glyphIndexMap={};var l=new i.Parser(a,b+e+14),m=new i.Parser(a,b+e+16+2*k),n=new i.Parser(a,b+e+16+4*k),o=new i.Parser(a,b+e+16+6*k),p=b+e+16+8*k;for(c=0;k-1>c;c+=1){for(var q,r=l.parseUShort(),s=m.parseUShort(),t=n.parseShort(),u=o.parseUShort(),v=s;r>=v;v+=1){0!==u?(p=o.offset+o.relativeOffset-2,p+=u,p+=2*(v-s),q=i.getUShort(a,p),0!==q&&(q=q+t&65535)):q=v+t&65535,d.glyphIndexMap[v]=q;}}return d;}function e(a,b,c){a.segments.push({end:b,start:b,delta:-(b-c),offset:0});}function f(a){a.segments.push({end:65535,start:65535,delta:1,offset:0});}function g(a){var b,c=new j.Table(\"cmap\",[{name:\"version\",type:\"USHORT\",value:0},{name:\"numTables\",type:\"USHORT\",value:1},{name:\"platformID\",type:\"USHORT\",value:3},{name:\"encodingID\",type:\"USHORT\",value:1},{name:\"offset\",type:\"ULONG\",value:12},{name:\"format\",type:\"USHORT\",value:4},{name:\"length\",type:\"USHORT\",value:0},{name:\"language\",type:\"USHORT\",value:0},{name:\"segCountX2\",type:\"USHORT\",value:0},{name:\"searchRange\",type:\"USHORT\",value:0},{name:\"entrySelector\",type:\"USHORT\",value:0},{name:\"rangeShift\",type:\"USHORT\",value:0}]);for(c.segments=[],b=0;b<a.length;b+=1){for(var d=a.get(b),g=0;g<d.unicodes.length;g+=1){e(c,d.unicodes[g],b);}c.segments=c.segments.sort(function(a,b){return a.start-b.start;});}f(c);var h;h=c.segments.length,c.segCountX2=2*h,c.searchRange=2*Math.pow(2,Math.floor(Math.log(h)/Math.log(2))),c.entrySelector=Math.log(c.searchRange/2)/Math.log(2),c.rangeShift=c.segCountX2-c.searchRange;var i=[],k=[],l=[],m=[],n=[];for(b=0;h>b;b+=1){var o=c.segments[b];i=i.concat({name:\"end_\"+b,type:\"USHORT\",value:o.end}),k=k.concat({name:\"start_\"+b,type:\"USHORT\",value:o.start}),l=l.concat({name:\"idDelta_\"+b,type:\"SHORT\",value:o.delta}),m=m.concat({name:\"idRangeOffset_\"+b,type:\"USHORT\",value:o.offset}),void 0!==o.glyphId&&(n=n.concat({name:\"glyph_\"+b,type:\"USHORT\",value:o.glyphId}));}return c.fields=c.fields.concat(i),c.fields.push({name:\"reservedPad\",type:\"USHORT\",value:0}),c.fields=c.fields.concat(k),c.fields=c.fields.concat(l),c.fields=c.fields.concat(m),c.fields=c.fields.concat(n),c.length=14+2*i.length+2+2*k.length+2*l.length+2*m.length+2*n.length,c;}var h=a(\"../check\"),i=a(\"../parse\"),j=a(\"../table\");c.parse=d,c.make=g;},{\"../check\":2,\"../parse\":9,\"../table\":11}],14:[function(a,b,c){\"use strict\";function d(a,b,c,d,e){var f;return(b&d)>0?(f=a.parseByte(),0===(b&e)&&(f=-f),f=c+f):f=(b&e)>0?c:c+a.parseShort(),f;}function e(a,b,c){var e=new m.Parser(b,c);a.numberOfContours=e.parseShort(),a.xMin=e.parseShort(),a.yMin=e.parseShort(),a.xMax=e.parseShort(),a.yMax=e.parseShort();var f,g;if(a.numberOfContours>0){var h,i=a.endPointIndices=[];for(h=0;h<a.numberOfContours;h+=1){i.push(e.parseUShort());}for(a.instructionLength=e.parseUShort(),a.instructions=[],h=0;h<a.instructionLength;h+=1){a.instructions.push(e.parseByte());}var j=i[i.length-1]+1;for(f=[],h=0;j>h;h+=1){if(g=e.parseByte(),f.push(g),(8&g)>0)for(var l=e.parseByte(),n=0;l>n;n+=1){f.push(g),h+=1;}}if(k.argument(f.length===j,\"Bad flags.\"),i.length>0){var o,p=[];if(j>0){for(h=0;j>h;h+=1){g=f[h],o={},o.onCurve=!!(1&g),o.lastPointOfContour=i.indexOf(h)>=0,p.push(o);}var q=0;for(h=0;j>h;h+=1){g=f[h],o=p[h],o.x=d(e,g,q,2,16),q=o.x;}var r=0;for(h=0;j>h;h+=1){g=f[h],o=p[h],o.y=d(e,g,r,4,32),r=o.y;}}a.points=p;}else a.points=[];}else if(0===a.numberOfContours)a.points=[];else{a.isComposite=!0,a.points=[],a.components=[];for(var s=!0;s;){f=e.parseUShort();var t={glyphIndex:e.parseUShort(),xScale:1,scale01:0,scale10:0,yScale:1,dx:0,dy:0};(1&f)>0?(t.dx=e.parseShort(),t.dy=e.parseShort()):(t.dx=e.parseChar(),t.dy=e.parseChar()),(8&f)>0?t.xScale=t.yScale=e.parseF2Dot14():(64&f)>0?(t.xScale=e.parseF2Dot14(),t.yScale=e.parseF2Dot14()):(128&f)>0&&(t.xScale=e.parseF2Dot14(),t.scale01=e.parseF2Dot14(),t.scale10=e.parseF2Dot14(),t.yScale=e.parseF2Dot14()),a.components.push(t),s=!!(32&f);}}}function f(a,b){for(var c=[],d=0;d<a.length;d+=1){var e=a[d],f={x:b.xScale*e.x+b.scale01*e.y+b.dx,y:b.scale10*e.x+b.yScale*e.y+b.dy,onCurve:e.onCurve,lastPointOfContour:e.lastPointOfContour};c.push(f);}return c;}function g(a){for(var b=[],c=[],d=0;d<a.length;d+=1){var e=a[d];c.push(e),e.lastPointOfContour&&(b.push(c),c=[]);}return k.argument(0===c.length,\"There are still points left in the current contour.\"),b;}function h(a){var b=new n.Path();if(!a)return b;for(var c=g(a),d=0;d<c.length;d+=1){var e,f,h=c[d],i=h[0],j=h[h.length-1];i.onCurve?(e=null,f=!0):(i=j.onCurve?j:{x:(i.x+j.x)/2,y:(i.y+j.y)/2},e=i,f=!1),b.moveTo(i.x,i.y);for(var k=f?1:0;k<h.length;k+=1){var l=h[k],m=0===k?i:h[k-1];if(m.onCurve&&l.onCurve)b.lineTo(l.x,l.y);else if(m.onCurve&&!l.onCurve)e=l;else if(m.onCurve||l.onCurve){if(m.onCurve||!l.onCurve)throw new Error(\"Invalid state.\");b.quadraticCurveTo(e.x,e.y,l.x,l.y),e=null;}else{var o={x:(m.x+l.x)/2,y:(m.y+l.y)/2};b.quadraticCurveTo(m.x,m.y,o.x,o.y),e=l;}}i!==j&&(e?b.quadraticCurveTo(e.x,e.y,i.x,i.y):b.lineTo(i.x,i.y));}return b.closePath(),b;}function i(a,b){if(b.isComposite)for(var c=0;c<b.components.length;c+=1){var d=b.components[c],e=a.get(d.glyphIndex);if(e.points){var g=f(e.points,d);b.points=b.points.concat(g);}}return h(b.points);}function j(a,b,c,d){var f,g=new l.GlyphSet(d);for(f=0;f<c.length-1;f+=1){var h=c[f],j=c[f+1];h!==j?g.push(f,l.ttfGlyphLoader(d,f,e,a,b+h,i)):g.push(f,l.glyphLoader(d,f));}return g;}var k=a(\"../check\"),l=a(\"../glyphset\"),m=a(\"../parse\"),n=a(\"../path\");c.parse=j;},{\"../check\":2,\"../glyphset\":7,\"../parse\":9,\"../path\":10}],15:[function(a,b,c){\"use strict\";function d(a,b){for(var c=new k.Parser(a,b),d=c.parseUShort(),e=[],f=0;d>f;f++){e[c.parseTag()]={offset:c.parseUShort()};}return e;}function e(a,b){var c=new k.Parser(a,b),d=c.parseUShort(),e=c.parseUShort();if(1===d)return c.parseUShortList(e);if(2===d){for(var f=[];e--;){for(var g=c.parseUShort(),h=c.parseUShort(),i=c.parseUShort(),j=g;h>=j;j++){f[i++]=j;}}return f;}}function f(a,b){var c=new k.Parser(a,b),d=c.parseUShort();if(1===d){var e=c.parseUShort(),f=c.parseUShort(),g=c.parseUShortList(f);return function(a){return g[a-e]||0;};}if(2===d){for(var h=c.parseUShort(),i=[],j=[],l=[],m=0;h>m;m++){i[m]=c.parseUShort(),j[m]=c.parseUShort(),l[m]=c.parseUShort();}return function(a){for(var b=0,c=i.length-1;c>b;){var d=b+c+1>>1;a<i[d]?c=d-1:b=d;}return i[b]<=a&&a<=j[b]?l[b]||0:0;};}}function g(a,b){var c,d,g=new k.Parser(a,b),h=g.parseUShort(),i=g.parseUShort(),j=e(a,b+i),l=g.parseUShort(),m=g.parseUShort();if(4===l&&0===m){var n={};if(1===h){for(var o=g.parseUShort(),p=[],q=g.parseOffset16List(o),r=0;o>r;r++){var s=q[r],t=n[s];if(!t){t={},g.relativeOffset=s;for(var u=g.parseUShort();u--;){var v=g.parseUShort();l&&(c=g.parseShort()),m&&(d=g.parseShort()),t[v]=c;}}p[j[r]]=t;}return function(a,b){var c=p[a];return c?c[b]:void 0;};}if(2===h){for(var w=g.parseUShort(),x=g.parseUShort(),y=g.parseUShort(),z=g.parseUShort(),A=f(a,b+w),B=f(a,b+x),C=[],D=0;y>D;D++){for(var E=C[D]=[],F=0;z>F;F++){l&&(c=g.parseShort()),m&&(d=g.parseShort()),E[F]=c;}}var G={};for(D=0;D<j.length;D++){G[j[D]]=1;}return function(a,b){if(G[a]){var c=A(a),d=B(b),e=C[c];return e?e[d]:void 0;}};}}}function h(a,b){var c=new k.Parser(a,b),d=c.parseUShort(),e=c.parseUShort(),f=16&e,h=c.parseUShort(),i=c.parseOffset16List(h),j={lookupType:d,lookupFlag:e,markFilteringSet:f?c.parseUShort():-1};if(2===d){for(var l=[],m=0;h>m;m++){l.push(g(a,b+i[m]));}j.getKerningValue=function(a,b){for(var c=l.length;c--;){var d=l[c](a,b);if(void 0!==d)return d;}return 0;};}return j;}function i(a,b,c){var e=new k.Parser(a,b),f=e.parseFixed();j.argument(1===f,\"Unsupported GPOS table version.\"),d(a,b+e.parseUShort()),d(a,b+e.parseUShort());var g=e.parseUShort();e.relativeOffset=g;for(var i=e.parseUShort(),l=e.parseOffset16List(i),m=b+g,n=0;i>n;n++){var o=h(a,m+l[n]);2!==o.lookupType||c.getGposKerningValue||(c.getGposKerningValue=o.getKerningValue);}}var j=a(\"../check\"),k=a(\"../parse\");c.parse=i;},{\"../check\":2,\"../parse\":9}],16:[function(a,b,c){\"use strict\";function d(a,b){var c={},d=new g.Parser(a,b);return c.version=d.parseVersion(),c.fontRevision=Math.round(1e3*d.parseFixed())/1e3,c.checkSumAdjustment=d.parseULong(),c.magicNumber=d.parseULong(),f.argument(1594834165===c.magicNumber,\"Font header has wrong magic number.\"),c.flags=d.parseUShort(),c.unitsPerEm=d.parseUShort(),c.created=d.parseLongDateTime(),c.modified=d.parseLongDateTime(),c.xMin=d.parseShort(),c.yMin=d.parseShort(),c.xMax=d.parseShort(),c.yMax=d.parseShort(),c.macStyle=d.parseUShort(),c.lowestRecPPEM=d.parseUShort(),c.fontDirectionHint=d.parseShort(),c.indexToLocFormat=d.parseShort(),c.glyphDataFormat=d.parseShort(),c;}function e(a){return new h.Table(\"head\",[{name:\"version\",type:\"FIXED\",value:65536},{name:\"fontRevision\",type:\"FIXED\",value:65536},{name:\"checkSumAdjustment\",type:\"ULONG\",value:0},{name:\"magicNumber\",type:\"ULONG\",value:1594834165},{name:\"flags\",type:\"USHORT\",value:0},{name:\"unitsPerEm\",type:\"USHORT\",value:1e3},{name:\"created\",type:\"LONGDATETIME\",value:0},{name:\"modified\",type:\"LONGDATETIME\",value:0},{name:\"xMin\",type:\"SHORT\",value:0},{name:\"yMin\",type:\"SHORT\",value:0},{name:\"xMax\",type:\"SHORT\",value:0},{name:\"yMax\",type:\"SHORT\",value:0},{name:\"macStyle\",type:\"USHORT\",value:0},{name:\"lowestRecPPEM\",type:\"USHORT\",value:0},{name:\"fontDirectionHint\",type:\"SHORT\",value:2},{name:\"indexToLocFormat\",type:\"SHORT\",value:0},{name:\"glyphDataFormat\",type:\"SHORT\",value:0}],a);}var f=a(\"../check\"),g=a(\"../parse\"),h=a(\"../table\");c.parse=d,c.make=e;},{\"../check\":2,\"../parse\":9,\"../table\":11}],17:[function(a,b,c){\"use strict\";function d(a,b){var c={},d=new f.Parser(a,b);return c.version=d.parseVersion(),c.ascender=d.parseShort(),c.descender=d.parseShort(),c.lineGap=d.parseShort(),c.advanceWidthMax=d.parseUShort(),c.minLeftSideBearing=d.parseShort(),c.minRightSideBearing=d.parseShort(),c.xMaxExtent=d.parseShort(),c.caretSlopeRise=d.parseShort(),c.caretSlopeRun=d.parseShort(),c.caretOffset=d.parseShort(),d.relativeOffset+=8,c.metricDataFormat=d.parseShort(),c.numberOfHMetrics=d.parseUShort(),c;}function e(a){return new g.Table(\"hhea\",[{name:\"version\",type:\"FIXED\",value:65536},{name:\"ascender\",type:\"FWORD\",value:0},{name:\"descender\",type:\"FWORD\",value:0},{name:\"lineGap\",type:\"FWORD\",value:0},{name:\"advanceWidthMax\",type:\"UFWORD\",value:0},{name:\"minLeftSideBearing\",type:\"FWORD\",value:0},{name:\"minRightSideBearing\",type:\"FWORD\",value:0},{name:\"xMaxExtent\",type:\"FWORD\",value:0},{name:\"caretSlopeRise\",type:\"SHORT\",value:1},{name:\"caretSlopeRun\",type:\"SHORT\",value:0},{name:\"caretOffset\",type:\"SHORT\",value:0},{name:\"reserved1\",type:\"SHORT\",value:0},{name:\"reserved2\",type:\"SHORT\",value:0},{name:\"reserved3\",type:\"SHORT\",value:0},{name:\"reserved4\",type:\"SHORT\",value:0},{name:\"metricDataFormat\",type:\"SHORT\",value:0},{name:\"numberOfHMetrics\",type:\"USHORT\",value:0}],a);}var f=a(\"../parse\"),g=a(\"../table\");c.parse=d,c.make=e;},{\"../parse\":9,\"../table\":11}],18:[function(a,b,c){\"use strict\";function d(a,b,c,d,e){for(var g,h,i=new f.Parser(a,b),j=0;d>j;j+=1){c>j&&(g=i.parseUShort(),h=i.parseShort());var k=e.get(j);k.advanceWidth=g,k.leftSideBearing=h;}}function e(a){for(var b=new g.Table(\"hmtx\",[]),c=0;c<a.length;c+=1){var d=a.get(c),e=d.advanceWidth||0,f=d.leftSideBearing||0;b.fields.push({name:\"advanceWidth_\"+c,type:\"USHORT\",value:e}),b.fields.push({name:\"leftSideBearing_\"+c,type:\"SHORT\",value:f});}return b;}var f=a(\"../parse\"),g=a(\"../table\");c.parse=d,c.make=e;},{\"../parse\":9,\"../table\":11}],19:[function(a,b,c){\"use strict\";function d(a,b){var c={},d=new f.Parser(a,b),g=d.parseUShort();e.argument(0===g,\"Unsupported kern table version.\"),d.skip(\"uShort\",1);var h=d.parseUShort();e.argument(0===h,\"Unsupported kern sub-table version.\"),d.skip(\"uShort\",2);var i=d.parseUShort();d.skip(\"uShort\",3);for(var j=0;i>j;j+=1){var k=d.parseUShort(),l=d.parseUShort(),m=d.parseShort();c[k+\",\"+l]=m;}return c;}var e=a(\"../check\"),f=a(\"../parse\");c.parse=d;},{\"../check\":2,\"../parse\":9}],20:[function(a,b,c){\"use strict\";function d(a,b,c,d){for(var f=new e.Parser(a,b),g=d?f.parseUShort:f.parseULong,h=[],i=0;c+1>i;i+=1){var j=g.call(f);d&&(j*=2),h.push(j);}return h;}var e=a(\"../parse\");c.parse=d;},{\"../parse\":9}],21:[function(a,b,c){\"use strict\";function d(a,b){var c={},d=new f.Parser(a,b);return c.version=d.parseVersion(),c.numGlyphs=d.parseUShort(),1===c.version&&(c.maxPoints=d.parseUShort(),c.maxContours=d.parseUShort(),c.maxCompositePoints=d.parseUShort(),c.maxCompositeContours=d.parseUShort(),c.maxZones=d.parseUShort(),c.maxTwilightPoints=d.parseUShort(),c.maxStorage=d.parseUShort(),c.maxFunctionDefs=d.parseUShort(),c.maxInstructionDefs=d.parseUShort(),c.maxStackElements=d.parseUShort(),c.maxSizeOfInstructions=d.parseUShort(),c.maxComponentElements=d.parseUShort(),c.maxComponentDepth=d.parseUShort()),c;}function e(a){return new g.Table(\"maxp\",[{name:\"version\",type:\"FIXED\",value:20480},{name:\"numGlyphs\",type:\"USHORT\",value:a}]);}var f=a(\"../parse\"),g=a(\"../table\");c.parse=d,c.make=e;},{\"../parse\":9,\"../table\":11}],22:[function(a,b,c){\"use strict\";function d(a,b){var c={},d=new j.Parser(a,b);c.format=d.parseUShort();for(var e=d.parseUShort(),f=d.offset+d.parseUShort(),g=0,h=0;e>h;h++){var i=d.parseUShort(),k=d.parseUShort(),m=d.parseUShort(),n=d.parseUShort(),o=l[n],p=d.parseUShort(),q=d.parseUShort();if(3===i&&1===k&&1033===m){for(var r=[],s=p/2,t=0;s>t;t++,q+=2){r[t]=j.getShort(a,f+q);}var u=String.fromCharCode.apply(null,r);o?c[o]=u:(g++,c[\"unknown\"+g]=u);}}return 1===c.format&&(c.langTagCount=d.parseUShort()),c;}function e(a,b,c,d,e,f){return new k.Table(\"NameRecord\",[{name:\"platformID\",type:\"USHORT\",value:a},{name:\"encodingID\",type:\"USHORT\",value:b},{name:\"languageID\",type:\"USHORT\",value:c},{name:\"nameID\",type:\"USHORT\",value:d},{name:\"length\",type:\"USHORT\",value:e},{name:\"offset\",type:\"USHORT\",value:f}]);}function f(a,b,c,d){var f=i.STRING(c);return a.records.push(e(1,0,0,b,f.length,d)),a.strings.push(f),d+=f.length;}function g(a,b,c,d){var f=i.UTF16(c);return a.records.push(e(3,1,1033,b,f.length,d)),a.strings.push(f),d+=f.length;}function h(a){var b=new k.Table(\"name\",[{name:\"format\",type:\"USHORT\",value:0},{name:\"count\",type:\"USHORT\",value:0},{name:\"stringOffset\",type:\"USHORT\",value:0}]);b.records=[],b.strings=[];var c,d,e=0;for(c=0;c<l.length;c+=1){void 0!==a[l[c]]&&(d=a[l[c]],e=f(b,c,d,e));}for(c=0;c<l.length;c+=1){void 0!==a[l[c]]&&(d=a[l[c]],e=g(b,c,d,e));}for(b.count=b.records.length,b.stringOffset=6+12*b.count,c=0;c<b.records.length;c+=1){b.fields.push({name:\"record_\"+c,type:\"TABLE\",value:b.records[c]});}for(c=0;c<b.strings.length;c+=1){b.fields.push({name:\"string_\"+c,type:\"LITERAL\",value:b.strings[c]});}return b;}var i=a(\"../types\").encode,j=a(\"../parse\"),k=a(\"../table\"),l=[\"copyright\",\"fontFamily\",\"fontSubfamily\",\"uniqueID\",\"fullName\",\"version\",\"postScriptName\",\"trademark\",\"manufacturer\",\"designer\",\"description\",\"manufacturerURL\",\"designerURL\",\"licence\",\"licenceURL\",\"reserved\",\"preferredFamily\",\"preferredSubfamily\",\"compatibleFullName\",\"sampleText\",\"postScriptFindFontName\",\"wwsFamily\",\"wwsSubfamily\"];c.parse=d,c.make=h;},{\"../parse\":9,\"../table\":11,\"../types\":26}],23:[function(a,b,c){\"use strict\";function d(a){for(var b=0;b<i.length;b+=1){var c=i[b];if(a>=c.begin&&a<c.end)return b;}return-1;}function e(a,b){var c={},d=new g.Parser(a,b);c.version=d.parseUShort(),c.xAvgCharWidth=d.parseShort(),c.usWeightClass=d.parseUShort(),c.usWidthClass=d.parseUShort(),c.fsType=d.parseUShort(),c.ySubscriptXSize=d.parseShort(),c.ySubscriptYSize=d.parseShort(),c.ySubscriptXOffset=d.parseShort(),c.ySubscriptYOffset=d.parseShort(),c.ySuperscriptXSize=d.parseShort(),c.ySuperscriptYSize=d.parseShort(),c.ySuperscriptXOffset=d.parseShort(),c.ySuperscriptYOffset=d.parseShort(),c.yStrikeoutSize=d.parseShort(),c.yStrikeoutPosition=d.parseShort(),c.sFamilyClass=d.parseShort(),c.panose=[];for(var e=0;10>e;e++){c.panose[e]=d.parseByte();}return c.ulUnicodeRange1=d.parseULong(),c.ulUnicodeRange2=d.parseULong(),c.ulUnicodeRange3=d.parseULong(),c.ulUnicodeRange4=d.parseULong(),c.achVendID=String.fromCharCode(d.parseByte(),d.parseByte(),d.parseByte(),d.parseByte()),c.fsSelection=d.parseUShort(),c.usFirstCharIndex=d.parseUShort(),c.usLastCharIndex=d.parseUShort(),c.sTypoAscender=d.parseShort(),c.sTypoDescender=d.parseShort(),c.sTypoLineGap=d.parseShort(),c.usWinAscent=d.parseUShort(),c.usWinDescent=d.parseUShort(),c.version>=1&&(c.ulCodePageRange1=d.parseULong(),c.ulCodePageRange2=d.parseULong()),c.version>=2&&(c.sxHeight=d.parseShort(),c.sCapHeight=d.parseShort(),c.usDefaultChar=d.parseUShort(),c.usBreakChar=d.parseUShort(),c.usMaxContent=d.parseUShort()),c;}function f(a){return new h.Table(\"OS/2\",[{name:\"version\",type:\"USHORT\",value:3},{name:\"xAvgCharWidth\",type:\"SHORT\",value:0},{name:\"usWeightClass\",type:\"USHORT\",value:0},{name:\"usWidthClass\",type:\"USHORT\",value:0},{name:\"fsType\",type:\"USHORT\",value:0},{name:\"ySubscriptXSize\",type:\"SHORT\",value:650},{name:\"ySubscriptYSize\",type:\"SHORT\",value:699},{name:\"ySubscriptXOffset\",type:\"SHORT\",value:0},{name:\"ySubscriptYOffset\",type:\"SHORT\",value:140},{name:\"ySuperscriptXSize\",type:\"SHORT\",value:650},{name:\"ySuperscriptYSize\",type:\"SHORT\",value:699},{name:\"ySuperscriptXOffset\",type:\"SHORT\",value:0},{name:\"ySuperscriptYOffset\",type:\"SHORT\",value:479},{name:\"yStrikeoutSize\",type:\"SHORT\",value:49},{name:\"yStrikeoutPosition\",type:\"SHORT\",value:258},{name:\"sFamilyClass\",type:\"SHORT\",value:0},{name:\"bFamilyType\",type:\"BYTE\",value:0},{name:\"bSerifStyle\",type:\"BYTE\",value:0},{name:\"bWeight\",type:\"BYTE\",value:0},{name:\"bProportion\",type:\"BYTE\",value:0},{name:\"bContrast\",type:\"BYTE\",value:0},{name:\"bStrokeVariation\",type:\"BYTE\",value:0},{name:\"bArmStyle\",type:\"BYTE\",value:0},{name:\"bLetterform\",type:\"BYTE\",value:0},{name:\"bMidline\",type:\"BYTE\",value:0},{name:\"bXHeight\",type:\"BYTE\",value:0},{name:\"ulUnicodeRange1\",type:\"ULONG\",value:0},{name:\"ulUnicodeRange2\",type:\"ULONG\",value:0},{name:\"ulUnicodeRange3\",type:\"ULONG\",value:0},{name:\"ulUnicodeRange4\",type:\"ULONG\",value:0},{name:\"achVendID\",type:\"CHARARRAY\",value:\"XXXX\"},{name:\"fsSelection\",type:\"USHORT\",value:0},{name:\"usFirstCharIndex\",type:\"USHORT\",value:0},{name:\"usLastCharIndex\",type:\"USHORT\",value:0},{name:\"sTypoAscender\",type:\"SHORT\",value:0},{name:\"sTypoDescender\",type:\"SHORT\",value:0},{name:\"sTypoLineGap\",type:\"SHORT\",value:0},{name:\"usWinAscent\",type:\"USHORT\",value:0},{name:\"usWinDescent\",type:\"USHORT\",value:0},{name:\"ulCodePageRange1\",type:\"ULONG\",value:0},{name:\"ulCodePageRange2\",type:\"ULONG\",value:0},{name:\"sxHeight\",type:\"SHORT\",value:0},{name:\"sCapHeight\",type:\"SHORT\",value:0},{name:\"usDefaultChar\",type:\"USHORT\",value:0},{name:\"usBreakChar\",type:\"USHORT\",value:0},{name:\"usMaxContext\",type:\"USHORT\",value:0}],a);}var g=a(\"../parse\"),h=a(\"../table\"),i=[{begin:0,end:127},{begin:128,end:255},{begin:256,end:383},{begin:384,end:591},{begin:592,end:687},{begin:688,end:767},{begin:768,end:879},{begin:880,end:1023},{begin:11392,end:11519},{begin:1024,end:1279},{begin:1328,end:1423},{begin:1424,end:1535},{begin:42240,end:42559},{begin:1536,end:1791},{begin:1984,end:2047},{begin:2304,end:2431},{begin:2432,end:2559},{begin:2560,end:2687},{begin:2688,end:2815},{begin:2816,end:2943},{begin:2944,end:3071},{begin:3072,end:3199},{begin:3200,end:3327},{begin:3328,end:3455},{begin:3584,end:3711},{begin:3712,end:3839},{begin:4256,end:4351},{begin:6912,end:7039},{begin:4352,end:4607},{begin:7680,end:7935},{begin:7936,end:8191},{begin:8192,end:8303},{begin:8304,end:8351},{begin:8352,end:8399},{begin:8400,end:8447},{begin:8448,end:8527},{begin:8528,end:8591},{begin:8592,end:8703},{begin:8704,end:8959},{begin:8960,end:9215},{begin:9216,end:9279},{begin:9280,end:9311},{begin:9312,end:9471},{begin:9472,end:9599},{begin:9600,end:9631},{begin:9632,end:9727},{begin:9728,end:9983},{begin:9984,end:10175},{begin:12288,end:12351},{begin:12352,end:12447},{begin:12448,end:12543},{begin:12544,end:12591},{begin:12592,end:12687},{begin:43072,end:43135},{begin:12800,end:13055},{begin:13056,end:13311},{begin:44032,end:55215},{begin:55296,end:57343},{begin:67840,end:67871},{begin:19968,end:40959},{begin:57344,end:63743},{begin:12736,end:12783},{begin:64256,end:64335},{begin:64336,end:65023},{begin:65056,end:65071},{begin:65040,end:65055},{begin:65104,end:65135},{begin:65136,end:65279},{begin:65280,end:65519},{begin:65520,end:65535},{begin:3840,end:4095},{begin:1792,end:1871},{begin:1920,end:1983},{begin:3456,end:3583},{begin:4096,end:4255},{begin:4608,end:4991},{begin:5024,end:5119},{begin:5120,end:5759},{begin:5760,end:5791},{begin:5792,end:5887},{begin:6016,end:6143},{begin:6144,end:6319},{begin:10240,end:10495},{begin:40960,end:42127},{begin:5888,end:5919},{begin:66304,end:66351},{begin:66352,end:66383},{begin:66560,end:66639},{begin:118784,end:119039},{begin:119808,end:120831},{begin:1044480,end:1048573},{begin:65024,end:65039},{begin:917504,end:917631},{begin:6400,end:6479},{begin:6480,end:6527},{begin:6528,end:6623},{begin:6656,end:6687},{begin:11264,end:11359},{begin:11568,end:11647},{begin:19904,end:19967},{begin:43008,end:43055},{begin:65536,end:65663},{begin:65856,end:65935},{begin:66432,end:66463},{begin:66464,end:66527},{begin:66640,end:66687},{begin:66688,end:66735},{begin:67584,end:67647},{begin:68096,end:68191},{begin:119552,end:119647},{begin:73728,end:74751},{begin:119648,end:119679},{begin:7040,end:7103},{begin:7168,end:7247},{begin:7248,end:7295},{begin:43136,end:43231},{begin:43264,end:43311},{begin:43312,end:43359},{begin:43520,end:43615},{begin:65936,end:65999},{begin:66e3,end:66047},{begin:66208,end:66271},{begin:127024,end:127135}];c.unicodeRanges=i,c.getUnicodeRange=d,c.parse=e,c.make=f;},{\"../parse\":9,\"../table\":11}],24:[function(a,b,c){\"use strict\";function d(a,b){var c,d={},e=new g.Parser(a,b);switch(d.version=e.parseVersion(),d.italicAngle=e.parseFixed(),d.underlinePosition=e.parseShort(),d.underlineThickness=e.parseShort(),d.isFixedPitch=e.parseULong(),d.minMemType42=e.parseULong(),d.maxMemType42=e.parseULong(),d.minMemType1=e.parseULong(),d.maxMemType1=e.parseULong(),d.version){case 1:d.names=f.standardNames.slice();break;case 2:for(d.numberOfGlyphs=e.parseUShort(),d.glyphNameIndex=new Array(d.numberOfGlyphs),c=0;c<d.numberOfGlyphs;c++){d.glyphNameIndex[c]=e.parseUShort();}for(d.names=[],c=0;c<d.numberOfGlyphs;c++){if(d.glyphNameIndex[c]>=f.standardNames.length){var h=e.parseChar();d.names.push(e.parseString(h));}}break;case 2.5:for(d.numberOfGlyphs=e.parseUShort(),d.offset=new Array(d.numberOfGlyphs),c=0;c<d.numberOfGlyphs;c++){d.offset[c]=e.parseChar();}}return d;}function e(){return new h.Table(\"post\",[{name:\"version\",type:\"FIXED\",value:196608},{name:\"italicAngle\",type:\"FIXED\",value:0},{name:\"underlinePosition\",type:\"FWORD\",value:0},{name:\"underlineThickness\",type:\"FWORD\",value:0},{name:\"isFixedPitch\",type:\"ULONG\",value:0},{name:\"minMemType42\",type:\"ULONG\",value:0},{name:\"maxMemType42\",type:\"ULONG\",value:0},{name:\"minMemType1\",type:\"ULONG\",value:0},{name:\"maxMemType1\",type:\"ULONG\",value:0}]);}var f=a(\"../encoding\"),g=a(\"../parse\"),h=a(\"../table\");c.parse=d,c.make=e;},{\"../encoding\":4,\"../parse\":9,\"../table\":11}],25:[function(a,b,c){\"use strict\";function d(a){return Math.log(a)/Math.log(2)|0;}function e(a){for(;a.length%4!==0;){a.push(0);}for(var b=0,c=0;c<a.length;c+=4){b+=(a[c]<<24)+(a[c+1]<<16)+(a[c+2]<<8)+a[c+3];}return b%=Math.pow(2,32);}function f(a,b,c,d){return new l.Table(\"Table Record\",[{name:\"tag\",type:\"TAG\",value:void 0!==a?a:\"\"},{name:\"checkSum\",type:\"ULONG\",value:void 0!==b?b:0},{name:\"offset\",type:\"ULONG\",value:void 0!==c?c:0},{name:\"length\",type:\"ULONG\",value:void 0!==d?d:0}]);}function g(a){var b=new l.Table(\"sfnt\",[{name:\"version\",type:\"TAG\",value:\"OTTO\"},{name:\"numTables\",type:\"USHORT\",value:0},{name:\"searchRange\",type:\"USHORT\",value:0},{name:\"entrySelector\",type:\"USHORT\",value:0},{name:\"rangeShift\",type:\"USHORT\",value:0}]);b.tables=a,b.numTables=a.length;var c=Math.pow(2,d(b.numTables));b.searchRange=16*c,b.entrySelector=d(c),b.rangeShift=16*b.numTables-b.searchRange;for(var g=[],h=[],i=b.sizeOf()+f().sizeOf()*b.numTables;i%4!==0;){i+=1,h.push({name:\"padding\",type:\"BYTE\",value:0});}for(var j=0;j<a.length;j+=1){var m=a[j];k.argument(4===m.tableName.length,\"Table name\"+m.tableName+\" is invalid.\");var n=m.sizeOf(),o=f(m.tableName,e(m.encode()),i,n);for(g.push({name:o.tag+\" Table Record\",type:\"TABLE\",value:o}),h.push({name:m.tableName+\" table\",type:\"TABLE\",value:m}),i+=n,k.argument(!isNaN(i),\"Something went wrong calculating the offset.\");i%4!==0;){i+=1,h.push({name:\"padding\",type:\"BYTE\",value:0});}}return g.sort(function(a,b){return a.value.tag>b.value.tag?1:-1;}),b.fields=b.fields.concat(g),b.fields=b.fields.concat(h),b;}function h(a,b,c){for(var d=0;d<b.length;d+=1){var e=a.charToGlyphIndex(b[d]);if(e>0){var f=a.glyphs.get(e);return f.getMetrics();}}return c;}function i(a){for(var b=0,c=0;c<a.length;c+=1){b+=a[c];}return b/a.length;}function j(a){for(var b,c=[],d=[],f=[],j=[],k=[],l=[],v=[],w=0,x=0,y=0,z=0,A=0,B=0;B<a.glyphs.length;B+=1){var C=a.glyphs.get(B),D=0|C.unicode;(b>D||null===b)&&(b=D),D>w&&(w=D);var E=t.getUnicodeRange(D);if(32>E)x|=1<<E;else if(64>E)y|=1<<E-32;else if(96>E)z|=1<<E-64;else{if(!(123>E))throw new Error(\"Unicode ranges bits > 123 are reserved for internal usage\");A|=1<<E-96;}if(\".notdef\"!==C.name){var F=C.getMetrics();c.push(F.xMin),d.push(F.yMin),f.push(F.xMax),j.push(F.yMax),l.push(F.leftSideBearing),v.push(F.rightSideBearing),k.push(C.advanceWidth);}}var G={xMin:Math.min.apply(null,c),yMin:Math.min.apply(null,d),xMax:Math.max.apply(null,f),yMax:Math.max.apply(null,j),advanceWidthMax:Math.max.apply(null,k),advanceWidthAvg:i(k),minLeftSideBearing:Math.min.apply(null,l),maxLeftSideBearing:Math.max.apply(null,l),minRightSideBearing:Math.min.apply(null,v)};G.ascender=void 0!==a.ascender?a.ascender:G.yMax,G.descender=void 0!==a.descender?a.descender:G.yMin;var H=o.make({unitsPerEm:a.unitsPerEm,xMin:G.xMin,yMin:G.yMin,xMax:G.xMax,yMax:G.yMax}),I=p.make({ascender:G.ascender,descender:G.descender,advanceWidthMax:G.advanceWidthMax,minLeftSideBearing:G.minLeftSideBearing,minRightSideBearing:G.minRightSideBearing,xMaxExtent:G.maxLeftSideBearing+(G.xMax-G.xMin),numberOfHMetrics:a.glyphs.length}),J=r.make(a.glyphs.length),K=t.make({xAvgCharWidth:Math.round(G.advanceWidthAvg),usWeightClass:500,usWidthClass:5,usFirstCharIndex:b,usLastCharIndex:w,ulUnicodeRange1:x,ulUnicodeRange2:y,ulUnicodeRange3:z,ulUnicodeRange4:A,sTypoAscender:G.ascender,sTypoDescender:G.descender,sTypoLineGap:0,usWinAscent:G.ascender,usWinDescent:-G.descender,sxHeight:h(a,\"xyvw\",{yMax:0}).yMax,sCapHeight:h(a,\"HIKLEFJMNTZBDPRAGOQSUVWXY\",G).yMax,usBreakChar:a.hasChar(\" \")?32:0}),L=q.make(a.glyphs),M=m.make(a.glyphs),N=a.familyName+\" \"+a.styleName,O=a.familyName.replace(/\\s/g,\"\")+\"-\"+a.styleName,P=s.make({copyright:a.copyright,fontFamily:a.familyName,fontSubfamily:a.styleName,uniqueID:a.manufacturer+\":\"+N,fullName:N,version:a.version,postScriptName:O,trademark:a.trademark,manufacturer:a.manufacturer,designer:a.designer,description:a.description,manufacturerURL:a.manufacturerURL,designerURL:a.designerURL,license:a.license,licenseURL:a.licenseURL,preferredFamily:a.familyName,preferredSubfamily:a.styleName}),Q=u.make(),R=n.make(a.glyphs,{version:a.version,fullName:N,familyName:a.familyName,weightName:a.styleName,postScriptName:O,unitsPerEm:a.unitsPerEm}),S=[H,I,J,K,P,M,Q,R,L],T=g(S),U=T.encode(),V=e(U),W=T.fields,X=!1;for(B=0;B<W.length;B+=1){if(\"head table\"===W[B].name){W[B].value.checkSumAdjustment=2981146554-V,X=!0;break;}}if(!X)throw new Error(\"Could not find head table with checkSum to adjust.\");return T;}var k=a(\"../check\"),l=a(\"../table\"),m=a(\"./cmap\"),n=a(\"./cff\"),o=a(\"./head\"),p=a(\"./hhea\"),q=a(\"./hmtx\"),r=a(\"./maxp\"),s=a(\"./name\"),t=a(\"./os2\"),u=a(\"./post\");c.computeCheckSum=e,c.make=g,c.fontToTable=j;},{\"../check\":2,\"../table\":11,\"./cff\":12,\"./cmap\":13,\"./head\":16,\"./hhea\":17,\"./hmtx\":18,\"./maxp\":21,\"./name\":22,\"./os2\":23,\"./post\":24}],26:[function(a,b,c){\"use strict\";function d(a){return function(){return a;};}var e=a(\"./check\"),f=32768,g=2147483648,h={},i={},j={};i.BYTE=function(a){return e.argument(a>=0&&255>=a,\"Byte value should be between 0 and 255.\"),[a];},j.BYTE=d(1),i.CHAR=function(a){return[a.charCodeAt(0)];},j.BYTE=d(1),i.CHARARRAY=function(a){for(var b=[],c=0;c<a.length;c+=1){b.push(a.charCodeAt(c));}return b;},j.CHARARRAY=function(a){return a.length;},i.USHORT=function(a){return[a>>8&255,255&a];},j.USHORT=d(2),i.SHORT=function(a){return a>=f&&(a=-(2*f-a)),[a>>8&255,255&a];},j.SHORT=d(2),i.UINT24=function(a){return[a>>16&255,a>>8&255,255&a];},j.UINT24=d(3),i.ULONG=function(a){return[a>>24&255,a>>16&255,a>>8&255,255&a];},j.ULONG=d(4),i.LONG=function(a){return a>=g&&(a=-(2*g-a)),[a>>24&255,a>>16&255,a>>8&255,255&a];},j.LONG=d(4),i.FIXED=i.ULONG,j.FIXED=j.ULONG,i.FWORD=i.SHORT,j.FWORD=j.SHORT,i.UFWORD=i.USHORT,j.UFWORD=j.USHORT,i.LONGDATETIME=function(){return[0,0,0,0,0,0,0,0];},j.LONGDATETIME=d(8),i.TAG=function(a){return e.argument(4===a.length,\"Tag should be exactly 4 ASCII characters.\"),[a.charCodeAt(0),a.charCodeAt(1),a.charCodeAt(2),a.charCodeAt(3)];},j.TAG=d(4),i.Card8=i.BYTE,j.Card8=j.BYTE,i.Card16=i.USHORT,j.Card16=j.USHORT,i.OffSize=i.BYTE,j.OffSize=j.BYTE,i.SID=i.USHORT,j.SID=j.USHORT,i.NUMBER=function(a){return a>=-107&&107>=a?[a+139]:a>=108&&1131>=a?(a-=108,[(a>>8)+247,255&a]):a>=-1131&&-108>=a?(a=-a-108,[(a>>8)+251,255&a]):a>=-32768&&32767>=a?i.NUMBER16(a):i.NUMBER32(a);},j.NUMBER=function(a){return i.NUMBER(a).length;},i.NUMBER16=function(a){return[28,a>>8&255,255&a];},j.NUMBER16=d(2),i.NUMBER32=function(a){return[29,a>>24&255,a>>16&255,a>>8&255,255&a];},j.NUMBER32=d(4),i.REAL=function(a){var b=a.toString(),c=/\\.(\\d*?)(?:9{5,20}|0{5,20})\\d{0,2}(?:e(.+)|$)/.exec(b);if(c){var d=parseFloat(\"1e\"+((c[2]?+c[2]:0)+c[1].length));b=(Math.round(a*d)/d).toString();}var e,f,g=\"\";for(e=0,f=b.length;f>e;e+=1){var h=b[e];g+=\"e\"===h?\"-\"===b[++e]?\"c\":\"b\":\".\"===h?\"a\":\"-\"===h?\"e\":h;}g+=1&g.length?\"f\":\"ff\";var i=[30];for(e=0,f=g.length;f>e;e+=2){i.push(parseInt(g.substr(e,2),16));}return i;},j.REAL=function(a){return i.REAL(a).length;},i.NAME=i.CHARARRAY,j.NAME=j.CHARARRAY,i.STRING=i.CHARARRAY,j.STRING=j.CHARARRAY,i.UTF16=function(a){for(var b=[],c=0;c<a.length;c+=1){b.push(0),b.push(a.charCodeAt(c));}return b;},j.UTF16=function(a){return 2*a.length;},i.INDEX=function(a){var b,c=1,d=[c],e=[],f=0;for(b=0;b<a.length;b+=1){var g=i.OBJECT(a[b]);Array.prototype.push.apply(e,g),f+=g.length,c+=g.length,d.push(c);}if(0===e.length)return[0,0];var h=[],j=1+Math.floor(Math.log(f)/Math.log(2))/8|0,k=[void 0,i.BYTE,i.USHORT,i.UINT24,i.ULONG][j];for(b=0;b<d.length;b+=1){var l=k(d[b]);Array.prototype.push.apply(h,l);}return Array.prototype.concat(i.Card16(a.length),i.OffSize(j),h,e);},j.INDEX=function(a){return i.INDEX(a).length;},i.DICT=function(a){for(var b=[],c=Object.keys(a),d=c.length,e=0;d>e;e+=1){var f=parseInt(c[e],0),g=a[f];b=b.concat(i.OPERAND(g.value,g.type)),b=b.concat(i.OPERATOR(f));}return b;},j.DICT=function(a){return i.DICT(a).length;},i.OPERATOR=function(a){return 1200>a?[a]:[12,a-1200];},i.OPERAND=function(a,b){var c=[];if(Array.isArray(b))for(var d=0;d<b.length;d+=1){e.argument(a.length===b.length,\"Not enough arguments given for type\"+b),c=c.concat(i.OPERAND(a[d],b[d]));}else if(\"SID\"===b)c=c.concat(i.NUMBER(a));else if(\"offset\"===b)c=c.concat(i.NUMBER32(a));else if(\"number\"===b)c=c.concat(i.NUMBER(a));else{if(\"real\"!==b)throw new Error(\"Unknown operand type \"+b);c=c.concat(i.REAL(a));}return c;},i.OP=i.BYTE,j.OP=j.BYTE;var k=\"function\"==typeof WeakMap&&new WeakMap();i.CHARSTRING=function(a){if(k&&k.has(a))return k.get(a);for(var b=[],c=a.length,d=0;c>d;d+=1){var e=a[d];b=b.concat(i[e.type](e.value));}return k&&k.set(a,b),b;},j.CHARSTRING=function(a){return i.CHARSTRING(a).length;},i.OBJECT=function(a){var b=i[a.type];return e.argument(void 0!==b,\"No encoding function for type \"+a.type),b(a.value);},i.TABLE=function(a){for(var b=[],c=a.fields.length,d=0;c>d;d+=1){var f=a.fields[d],g=i[f.type];e.argument(void 0!==g,\"No encoding function for field type \"+f.type);var h=a[f.name];void 0===h&&(h=f.value);var j=g(h);b=b.concat(j);}return b;},i.LITERAL=function(a){return a;},j.LITERAL=function(a){return a.length;},c.decode=h,c.encode=i,c.sizeOf=j;},{\"./check\":2}],27:[function(_dereq_,module,exports){!function(a,b,c){\"undefined\"!=typeof module&&module.exports?module.exports=c():\"function\"==typeof define&&define.amd?define(c):b[a]=c();}(\"reqwest\",this,function(){function succeed(a){var b=protocolRe.exec(a.url);return b=b&&b[1]||window.location.protocol,httpsRe.test(b)?twoHundo.test(a.request.status):!!a.request.response;}function handleReadyState(a,b,c){return function(){return a._aborted?c(a.request):a._timedOut?c(a.request,\"Request is aborted: timeout\"):void(a.request&&4==a.request[readyState]&&(a.request.onreadystatechange=noop,succeed(a)?b(a.request):c(a.request)));};}function setHeaders(a,b){var c,d=b.headers||{};d.Accept=d.Accept||defaultHeaders.accept[b.type]||defaultHeaders.accept[\"*\"];var e=\"function\"==typeof FormData&&b.data instanceof FormData;b.crossOrigin||d[requestedWith]||(d[requestedWith]=defaultHeaders.requestedWith),d[contentType]||e||(d[contentType]=b.contentType||defaultHeaders.contentType);for(c in d){d.hasOwnProperty(c)&&\"setRequestHeader\"in a&&a.setRequestHeader(c,d[c]);}}function setCredentials(a,b){\"undefined\"!=typeof b.withCredentials&&\"undefined\"!=typeof a.withCredentials&&(a.withCredentials=!!b.withCredentials);}function generalCallback(a){lastValue=a;}function urlappend(a,b){return a+(/\\?/.test(a)?\"&\":\"?\")+b;}function handleJsonp(a,b,c,d){var e=uniqid++,f=a.jsonpCallback||\"callback\",g=a.jsonpCallbackName||reqwest.getcallbackPrefix(e),h=new RegExp(\"((^|\\\\?|&)\"+f+\")=([^&]+)\"),i=d.match(h),j=doc.createElement(\"script\"),k=0,l=-1!==navigator.userAgent.indexOf(\"MSIE 10.0\");return i?\"?\"===i[3]?d=d.replace(h,\"$1=\"+g):g=i[3]:d=urlappend(d,f+\"=\"+g),win[g]=generalCallback,j.type=\"text/javascript\",j.src=d,j.async=!0,\"undefined\"==typeof j.onreadystatechange||l||(j.htmlFor=j.id=\"_reqwest_\"+e),j.onload=j.onreadystatechange=function(){return j[readyState]&&\"complete\"!==j[readyState]&&\"loaded\"!==j[readyState]||k?!1:(j.onload=j.onreadystatechange=null,j.onclick&&j.onclick(),b(lastValue),lastValue=void 0,head.removeChild(j),void(k=1));},head.appendChild(j),{abort:function abort(){j.onload=j.onreadystatechange=null,c({},\"Request is aborted: timeout\",{}),lastValue=void 0,head.removeChild(j),k=1;}};}function getRequest(a,b){var c,d=this.o,e=(d.method||\"GET\").toUpperCase(),f=\"string\"==typeof d?d:d.url,g=d.processData!==!1&&d.data&&\"string\"!=typeof d.data?reqwest.toQueryString(d.data):d.data||null,h=!1;return\"jsonp\"!=d.type&&\"GET\"!=e||!g||(f=urlappend(f,g),g=null),\"jsonp\"==d.type?handleJsonp(d,a,b,f):(c=d.xhr&&d.xhr(d)||xhr(d),c.open(e,f,d.async===!1?!1:!0),setHeaders(c,d),setCredentials(c,d),win[xDomainRequest]&&c instanceof win[xDomainRequest]?(c.onload=a,c.onerror=b,c.onprogress=function(){},h=!0):c.onreadystatechange=handleReadyState(this,a,b),d.before&&d.before(c),h?setTimeout(function(){c.send(g);},200):c.send(g),c);}function Reqwest(a,b){this.o=a,this.fn=b,init.apply(this,arguments);}function setType(a){return a.match(\"json\")?\"json\":a.match(\"javascript\")?\"js\":a.match(\"text\")?\"html\":a.match(\"xml\")?\"xml\":void 0;}function init(o,fn){function complete(a){for(o.timeout&&clearTimeout(self.timeout),self.timeout=null;self._completeHandlers.length>0;){self._completeHandlers.shift()(a);}}function success(resp){var type=o.type||resp&&setType(resp.getResponseHeader(\"Content-Type\"));resp=\"jsonp\"!==type?self.request:resp;var filteredResponse=globalSetupOptions.dataFilter(resp.responseText,type),r=filteredResponse;try{resp.responseText=r;}catch(e){}if(r)switch(type){case\"json\":try{resp=win.JSON?win.JSON.parse(r):eval(\"(\"+r+\")\");}catch(err){return error(resp,\"Could not parse JSON in response\",err);}break;case\"js\":resp=eval(r);break;case\"html\":resp=r;break;case\"xml\":resp=resp.responseXML&&resp.responseXML.parseError&&resp.responseXML.parseError.errorCode&&resp.responseXML.parseError.reason?null:resp.responseXML;}for(self._responseArgs.resp=resp,self._fulfilled=!0,fn(resp),self._successHandler(resp);self._fulfillmentHandlers.length>0;){resp=self._fulfillmentHandlers.shift()(resp);}complete(resp);}function timedOut(){self._timedOut=!0,self.request.abort();}function error(a,b,c){for(a=self.request,self._responseArgs.resp=a,self._responseArgs.msg=b,self._responseArgs.t=c,self._erred=!0;self._errorHandlers.length>0;){self._errorHandlers.shift()(a,b,c);}complete(a);}this.url=\"string\"==typeof o?o:o.url,this.timeout=null,this._fulfilled=!1,this._successHandler=function(){},this._fulfillmentHandlers=[],this._errorHandlers=[],this._completeHandlers=[],this._erred=!1,this._responseArgs={};var self=this;fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){timedOut();},o.timeout)),o.success&&(this._successHandler=function(){o.success.apply(o,arguments);}),o.error&&this._errorHandlers.push(function(){o.error.apply(o,arguments);}),o.complete&&this._completeHandlers.push(function(){o.complete.apply(o,arguments);}),this.request=getRequest.call(this,success,error);}function reqwest(a,b){return new Reqwest(a,b);}function normalize(a){return a?a.replace(/\\r?\\n/g,\"\\r\\n\"):\"\";}function serial(a,b){var c,d,e,f,g=a.name,h=a.tagName.toLowerCase(),i=function i(a){a&&!a.disabled&&b(g,normalize(a.attributes.value&&a.attributes.value.specified?a.value:a.text));};if(!a.disabled&&g)switch(h){case\"input\":/reset|button|image|file/i.test(a.type)||(c=/checkbox/i.test(a.type),d=/radio/i.test(a.type),e=a.value,(!(c||d)||a.checked)&&b(g,normalize(c&&\"\"===e?\"on\":e)));break;case\"textarea\":b(g,normalize(a.value));break;case\"select\":if(\"select-one\"===a.type.toLowerCase())i(a.selectedIndex>=0?a.options[a.selectedIndex]:null);else for(f=0;a.length&&f<a.length;f++){a.options[f].selected&&i(a.options[f]);}}}function eachFormElement(){var a,b,c=this,d=function d(a,b){var d,e,f;for(d=0;d<b.length;d++){for(f=a[byTag](b[d]),e=0;e<f.length;e++){serial(f[e],c);}}};for(b=0;b<arguments.length;b++){a=arguments[b],/input|select|textarea/i.test(a.tagName)&&serial(a,c),d(a,[\"input\",\"select\",\"textarea\"]);}}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments));}function serializeHash(){var a={};return eachFormElement.apply(function(b,c){b in a?(a[b]&&!isArray(a[b])&&(a[b]=[a[b]]),a[b].push(c)):a[b]=c;},arguments),a;}function buildParams(a,b,c,d){var e,f,g,h=/\\[\\]$/;if(isArray(b))for(f=0;b&&f<b.length;f++){g=b[f],c||h.test(a)?d(a,g):buildParams(a+\"[\"+(\"object\"==(typeof g===\"undefined\"?\"undefined\":_typeof(g))?f:\"\")+\"]\",g,c,d);}else if(b&&\"[object Object]\"===b.toString())for(e in b){buildParams(a+\"[\"+e+\"]\",b[e],c,d);}else d(a,b);}var win=window,doc=document,httpsRe=/^http/,protocolRe=/(^\\w+):\\/\\//,twoHundo=/^(20\\d|1223)$/,byTag=\"getElementsByTagName\",readyState=\"readyState\",contentType=\"Content-Type\",requestedWith=\"X-Requested-With\",head=doc[byTag](\"head\")[0],uniqid=0,callbackPrefix=\"reqwest_\"+ +new Date(),lastValue,xmlHttpRequest=\"XMLHttpRequest\",xDomainRequest=\"XDomainRequest\",noop=function noop(){},isArray=\"function\"==typeof Array.isArray?Array.isArray:function(a){return a instanceof Array;},defaultHeaders={contentType:\"application/x-www-form-urlencoded\",requestedWith:xmlHttpRequest,accept:{\"*\":\"text/javascript, text/html, application/xml, text/xml, */*\",xml:\"application/xml, text/xml\",html:\"text/html\",text:\"text/plain\",json:\"application/json, text/javascript\",js:\"application/javascript, text/javascript\"}},xhr=function xhr(a){if(a.crossOrigin===!0){var b=win[xmlHttpRequest]?new XMLHttpRequest():null;if(b&&\"withCredentials\"in b)return b;if(win[xDomainRequest])return new XDomainRequest();throw new Error(\"Browser does not support cross-origin requests\");}return win[xmlHttpRequest]?new XMLHttpRequest():new ActiveXObject(\"Microsoft.XMLHTTP\");},globalSetupOptions={dataFilter:function dataFilter(a){return a;}};return Reqwest.prototype={abort:function abort(){this._aborted=!0,this.request.abort();},retry:function retry(){init.call(this,this.o,this.fn);},then:function then(a,b){return a=a||function(){},b=b||function(){},this._fulfilled?this._responseArgs.resp=a(this._responseArgs.resp):this._erred?b(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):(this._fulfillmentHandlers.push(a),this._errorHandlers.push(b)),this;},always:function always(a){return this._fulfilled||this._erred?a(this._responseArgs.resp):this._completeHandlers.push(a),this;},fail:function fail(a){return this._erred?a(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):this._errorHandlers.push(a),this;},\"catch\":function _catch(a){return this.fail(a);}},reqwest.serializeArray=function(){var a=[];return eachFormElement.apply(function(b,c){a.push({name:b,value:c});},arguments),a;},reqwest.serialize=function(){if(0===arguments.length)return\"\";var a,b,c=Array.prototype.slice.call(arguments,0);return a=c.pop(),a&&a.nodeType&&c.push(a)&&(a=null),a&&(a=a.type),b=\"map\"==a?serializeHash:\"array\"==a?reqwest.serializeArray:serializeQueryString,b.apply(null,c);},reqwest.toQueryString=function(a,b){var c,d,e=b||!1,f=[],g=encodeURIComponent,h=function h(a,b){b=\"function\"==typeof b?b():null==b?\"\":b,f[f.length]=g(a)+\"=\"+g(b);};if(isArray(a))for(d=0;a&&d<a.length;d++){h(a[d].name,a[d].value);}else for(c in a){a.hasOwnProperty(c)&&buildParams(c,a[c],e,h);}return f.join(\"&\").replace(/%20/g,\"+\");},reqwest.getcallbackPrefix=function(){return callbackPrefix;},reqwest.compat=function(a,b){return a&&(a.type&&(a.method=a.type)&&delete a.type,a.dataType&&(a.type=a.dataType),a.jsonpCallback&&(a.jsonpCallbackName=a.jsonpCallback)&&delete a.jsonpCallback,a.jsonp&&(a.jsonpCallback=a.jsonp)),new Reqwest(a,b);},reqwest.ajaxSetup=function(a){a=a||{};for(var b in a){globalSetupOptions[b]=a[b];}},reqwest;});},{}],28:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");d.prototype.camera=function(a,b,c){for(var d=new Array(arguments.length),e=0;e<d.length;++e){d[e]=arguments[e];}this._validateParameters(\"camera\",d,[\"Number\",\"Number\",\"Number\"]),this._renderer.translate(-a,-b,-c);},d.prototype.perspective=function(a,b,c,e){for(var f=new Array(arguments.length),g=0;g<f.length;++g){f[g]=arguments[g];}this._validateParameters(\"perspective\",f,[\"Number\",\"Number\",\"Number\",\"Number\"]),this._renderer.uPMatrix=d.Matrix.identity(),this._renderer.uPMatrix.perspective(a,b,c,e),this._renderer._setCamera=!0;},d.prototype.ortho=function(a,b,c,e,f,g){for(var h=new Array(arguments.length),i=0;i<h.length;++i){h[i]=arguments[i];}this._validateParameters(\"ortho\",h,[\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\"]),a/=this.width,b/=this.width,e/=this.height,c/=this.height,this._renderer.uPMatrix=d.Matrix.identity(),this._renderer.uPMatrix.ortho(a,b,c,e,f,g),this._renderer._setCamera=!0;},b.exports=d;},{\"../core/core\":49}],29:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");d.prototype.orbitControl=function(){return this.mouseIsPressed&&(this.rotateY((this.mouseX-this.width/2)/(this.width/2)),this.rotateX((this.mouseY-this.height/2)/(this.width/2))),this;},b.exports=d;},{\"../core/core\":49}],30:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");d.prototype.ambientLight=function(a,b,c,d){var e=this._renderer.GL,f=this._renderer._getShader(\"lightVert\",\"lightTextureFrag\");e.useProgram(f),f.uAmbientColor=e.getUniformLocation(f,\"uAmbientColor[\"+this._renderer.ambientLightCount+\"]\");var g=this._renderer._pInst.color.apply(this._renderer._pInst,arguments),h=g._array;return e.uniform3f(f.uAmbientColor,h[0],h[1],h[2]),f.uMaterialColor=e.getUniformLocation(f,\"uMaterialColor\"),e.uniform4f(f.uMaterialColor,1,1,1,1),this._renderer.ambientLightCount++,f.uAmbientLightCount=e.getUniformLocation(f,\"uAmbientLightCount\"),e.uniform1i(f.uAmbientLightCount,this._renderer.ambientLightCount),this;},d.prototype.directionalLight=function(a,b,c,d,e,f,g){var h=this._renderer.GL,i=this._renderer._getShader(\"lightVert\",\"lightTextureFrag\");h.useProgram(i),i.uDirectionalColor=h.getUniformLocation(i,\"uDirectionalColor[\"+this._renderer.directionalLightCount+\"]\");var j=this._renderer._pInst.color.apply(this._renderer._pInst,[a,b,c]),k=j._array;h.uniform3f(i.uDirectionalColor,k[0],k[1],k[2]);var l,m,n;if(\"number\"==typeof arguments[arguments.length-1])l=arguments[arguments.length-3],m=arguments[arguments.length-2],n=arguments[arguments.length-1];else try{l=arguments[arguments.length-1].x,m=arguments[arguments.length-1].y,n=arguments[arguments.length-1].z;}catch(o){throw o;}return i.uLightingDirection=h.getUniformLocation(i,\"uLightingDirection[\"+this._renderer.directionalLightCount+\"]\"),h.uniform3f(i.uLightingDirection,l,m,n),i.uMaterialColor=h.getUniformLocation(i,\"uMaterialColor\"),h.uniform4f(i.uMaterialColor,1,1,1,1),this._renderer.directionalLightCount++,i.uDirectionalLightCount=h.getUniformLocation(i,\"uDirectionalLightCount\"),h.uniform1i(i.uDirectionalLightCount,this._renderer.directionalLightCount),this;},d.prototype.pointLight=function(a,b,c,d,e,f,g){var h=this._renderer.GL,i=this._renderer._getShader(\"lightVert\",\"lightTextureFrag\");h.useProgram(i),i.uPointLightColor=h.getUniformLocation(i,\"uPointLightColor[\"+this._renderer.pointLightCount+\"]\");var j=this._renderer._pInst.color.apply(this._renderer._pInst,[a,b,c]),k=j._array;h.uniform3f(i.uPointLightColor,k[0],k[1],k[2]);var l,m,n;if(\"number\"==typeof arguments[arguments.length-1])l=arguments[arguments.length-3],m=arguments[arguments.length-2],n=arguments[arguments.length-1];else try{l=arguments[arguments.length-1].x,m=arguments[arguments.length-1].y,n=arguments[arguments.length-1].z;}catch(o){throw o;}return i.uPointLightLocation=h.getUniformLocation(i,\"uPointLightLocation[\"+this._renderer.pointLightCount+\"]\"),h.uniform3f(i.uPointLightLocation,l,m,n),i.uMaterialColor=h.getUniformLocation(i,\"uMaterialColor\"),h.uniform4f(i.uMaterialColor,1,1,1,1),this._renderer.pointLightCount++,i.uPointLightCount=h.getUniformLocation(i,\"uPointLightCount\"),h.uniform1i(i.uPointLightCount,this._renderer.pointLightCount),this;},b.exports=d;},{\"../core/core\":49}],31:[function(a,b,c){\"use strict\";function d(a,b){for(var c={v:[],vt:[],vn:[]},d={},f=0;f<b.length;++f){var g=b[f].trim().split(/\\b\\s+/);if(g.length>0)if(\"v\"===g[0]||\"vn\"===g[0]){var h=new e.Vector(parseFloat(g[1]),parseFloat(g[2]),parseFloat(g[3]));c[g[0]].push(h);}else if(\"vt\"===g[0]){var i=[parseFloat(g[1]),parseFloat(g[2])];c[g[0]].push(i);}else if(\"f\"===g[0])for(var j=3;j<g.length;++j){for(var k=[],l=[1,j-1,j],m=0;m<l.length;++m){var n=g[l[m]],o=0;if(void 0!==d[n])o=d[n];else{for(var p=n.split(\"/\"),q=0;q<p.length;q++){p[q]=parseInt(p[q])-1;}o=d[n]=a.vertices.length,a.vertices.push(c.v[p[0]].copy()),c.vt[p[1]]?a.uvs.push(c.vt[p[1]].slice()):a.uvs.push([0,0]),c.vn[p[2]]&&a.vertexNormals.push(c.vn[p[2]].copy());}k.push(o);}a.faces.push(k);}}return 0===a.vertexNormals.length&&a.computeNormals(),a;}var e=a(\"../core/core\");a(\"./p5.Geometry\"),e.prototype.loadModel=function(a){var b=new e.Geometry();return b.gid=a,this.loadStrings(a,function(a){d(b,a);}.bind(this)),b;},e.prototype.model=function(a){a.vertices.length>0&&(this._renderer.geometryInHash(a.gid)||this._renderer.createBuffers(a.gid,a),this._renderer.drawBuffers(a.gid));},b.exports=e;},{\"../core/core\":49,\"./p5.Geometry\":33}],32:[function(a,b,c){\"use strict\";function d(a){return 0===(a&a-1);}var e=a(\"../core/core\");e.prototype.normalMaterial=function(){return this._renderer._getShader(\"normalVert\",\"normalFrag\"),this;},e.prototype.texture=function(a){var b=this._renderer.GL,c=this._renderer._getShader(\"lightVert\",\"lightTextureFrag\");if(b.useProgram(c),a instanceof e.Image){if(!a.isTexture){var f=b.createTexture();a.createTexture(f),b.bindTexture(b.TEXTURE_2D,f),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,1),a._setProperty(\"isTexture\",!0);}a.loadPixels();var g=new Uint8Array(a.pixels);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,a.width,a.height,0,b.RGBA,b.UNSIGNED_BYTE,g);}else if(a instanceof e.MediaElement){if(!a.loadedmetadata)return;b.texImage2D(b.TEXTURE_2D,0,b.RGBA,b.RGBA,b.UNSIGNED_BYTE,a.elt);}return d(a.width)&&d(a.height)?b.generateMipmap(b.TEXTURE_2D):(b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE)),b.uniform1i(b.getUniformLocation(c,\"uSampler\"),0),b.uniform1i(b.getUniformLocation(c,\"isTexture\"),!0),this;},e.prototype.ambientMaterial=function(a,b,c,d){var e=this._renderer.GL,f=this._renderer._getShader(\"lightVert\",\"lightTextureFrag\");e.useProgram(f),f.uMaterialColor=e.getUniformLocation(f,\"uMaterialColor\");var g=this._renderer._applyColorBlend(a,b,c,d);return e.uniform4f(f.uMaterialColor,g[0],g[1],g[2],g[3]),f.uSpecular=e.getUniformLocation(f,\"uSpecular\"),e.uniform1i(f.uSpecular,!1),e.uniform1i(e.getUniformLocation(f,\"isTexture\"),!1),this;},e.prototype.specularMaterial=function(a,b,c,d){var e=this._renderer.GL,f=this._renderer._getShader(\"lightVert\",\"lightTextureFrag\");e.useProgram(f),e.uniform1i(e.getUniformLocation(f,\"isTexture\"),!1),f.uMaterialColor=e.getUniformLocation(f,\"uMaterialColor\");var g=this._renderer._applyColorBlend(a,b,c,d);return e.uniform4f(f.uMaterialColor,g[0],g[1],g[2],g[3]),f.uSpecular=e.getUniformLocation(f,\"uSpecular\"),e.uniform1i(f.uSpecular,!0),this;},e.Renderer3D.prototype._applyColorBlend=function(a,b,c,d){var e=this.GL,f=this._pInst.color.apply(this._pInst,arguments),g=f._array;return g[g.length-1]<1?(e.depthMask(!1),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA)):(e.depthMask(!0),e.disable(e.BLEND)),g;},b.exports=e;},{\"../core/core\":49}],33:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");d.Geometry=function(a,b,c){return this.vertices=[],this.vertexNormals=[],this.faces=[],this.uvs=[],this.detailX=void 0!==a?a:1,this.detailY=void 0!==b?b:1,c instanceof Function&&c.call(this),this;},d.Geometry.prototype.computeFaces=function(){for(var a,b,c,d,e=this.detailX+1,f=0;f<this.detailY;f++){for(var g=0;g<this.detailX;g++){a=f*e+g,b=f*e+g+1,c=(f+1)*e+g+1,d=(f+1)*e+g,this.faces.push([a,b,d]),this.faces.push([d,b,c]);}}return this;},d.Geometry.prototype._getFaceNormal=function(a,b){var c=this.faces[a],e=this.vertices[c[b%3]],f=this.vertices[c[(b+1)%3]],g=this.vertices[c[(b+2)%3]],h=d.Vector.cross(d.Vector.sub(f,e),d.Vector.sub(g,e)),i=d.Vector.mag(h)/(d.Vector.mag(d.Vector.sub(f,e))*d.Vector.mag(d.Vector.sub(g,e)));return h=h.normalize(),h.mult(Math.asin(i));},d.Geometry.prototype.computeNormals=function(){for(var a=0;a<this.vertices.length;a++){for(var b=new d.Vector(),c=0;c<this.faces.length;c++){(this.faces[c][0]===a||this.faces[c][1]===a||this.faces[c][2]===a)&&(b=b.add(this._getFaceNormal(c,a)));}b=b.normalize(),this.vertexNormals.push(b);}},d.Geometry.prototype.averageNormals=function(){for(var a=0;a<=this.detailY;a++){var b=this.detailX+1,c=d.Vector.add(this.vertexNormals[a*b],this.vertexNormals[a*b+this.detailX]);c=d.Vector.div(c,2),this.vertexNormals[a*b]=c,this.vertexNormals[a*b+this.detailX]=c;}return this;},d.Geometry.prototype.averagePoleNormals=function(){for(var a=new d.Vector(0,0,0),b=0;b<this.detailX;b++){a.add(this.vertexNormals[b]);}for(a=d.Vector.div(a,this.detailX),b=0;b<this.detailX;b++){this.vertexNormals[b]=a;}for(a=new d.Vector(0,0,0),b=this.vertices.length-1;b>this.vertices.length-1-this.detailX;b--){a.add(this.vertexNormals[b]);}for(a=d.Vector.div(a,this.detailX),b=this.vertices.length-1;b>this.vertices.length-1-this.detailX;b--){this.vertexNormals[b]=a;}return this;},b.exports=d.Geometry;},{\"../core/core\":49}],34:[function(a,b,c){\"use strict\";var d=a(\"../core/core\"),e=a(\"../math/polargeometry\"),f=a(\"../core/constants\"),g=\"undefined\"!=typeof Float32Array?Float32Array:Array;d.Matrix=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}return a[0]instanceof d?(this.p5=a[0],\"mat3\"===a[1]?this.mat3=a[2]||new g([1,0,0,0,1,0,0,0,1]):this.mat4=a[1]||new g([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])):\"mat3\"===a[0]?this.mat3=a[1]||new g([1,0,0,0,1,0,0,0,1]):this.mat4=a[0]||new g([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this;},d.Matrix.prototype.set=function(a){return a instanceof d.Matrix?(this.mat4=a.mat4,this):a instanceof g?(this.mat4=a,this):this;},d.Matrix.prototype.get=function(){return new d.Matrix(this.mat4);},d.Matrix.prototype.copy=function(){var a=new d.Matrix();return a.mat4[0]=this.mat4[0],a.mat4[1]=this.mat4[1],a.mat4[2]=this.mat4[2],a.mat4[3]=this.mat4[3],a.mat4[4]=this.mat4[4],a.mat4[5]=this.mat4[5],a.mat4[6]=this.mat4[6],a.mat4[7]=this.mat4[7],a.mat4[8]=this.mat4[8],a.mat4[9]=this.mat4[9],a.mat4[10]=this.mat4[10],a.mat4[11]=this.mat4[11],a.mat4[12]=this.mat4[12],a.mat4[13]=this.mat4[13],a.mat4[14]=this.mat4[14],a.mat4[15]=this.mat4[15],a;},d.Matrix.identity=function(){return new d.Matrix();},d.Matrix.prototype.transpose=function(a){var b,c,e,f,h,i;return a instanceof d.Matrix?(b=a.mat4[1],c=a.mat4[2],e=a.mat4[3],f=a.mat4[6],h=a.mat4[7],i=a.mat4[11],this.mat4[0]=a.mat4[0],this.mat4[1]=a.mat4[4],this.mat4[2]=a.mat4[8],this.mat4[3]=a.mat4[12],this.mat4[4]=b,this.mat4[5]=a.mat4[5],this.mat4[6]=a.mat4[9],this.mat4[7]=a.mat4[13],this.mat4[8]=c,this.mat4[9]=f,this.mat4[10]=a.mat4[10],this.mat4[11]=a.mat4[14],this.mat4[12]=e,this.mat4[13]=h,this.mat4[14]=i,this.mat4[15]=a.mat4[15]):a instanceof g&&(b=a[1],c=a[2],e=a[3],f=a[6],h=a[7],i=a[11],this.mat4[0]=a[0],this.mat4[1]=a[4],this.mat4[2]=a[8],this.mat4[3]=a[12],this.mat4[4]=b,this.mat4[5]=a[5],this.mat4[6]=a[9],this.mat4[7]=a[13],this.mat4[8]=c,this.mat4[9]=f,this.mat4[10]=a[10],this.mat4[11]=a[14],this.mat4[12]=e,this.mat4[13]=h,this.mat4[14]=i,this.mat4[15]=a[15]),this;},d.Matrix.prototype.invert=function(a){var b,c,e,f,h,i,j,k,l,m,n,o,p,q,r,s;a instanceof d.Matrix?(b=a.mat4[0],c=a.mat4[1],e=a.mat4[2],f=a.mat4[3],h=a.mat4[4],i=a.mat4[5],j=a.mat4[6],k=a.mat4[7],l=a.mat4[8],m=a.mat4[9],n=a.mat4[10],o=a.mat4[11],p=a.mat4[12],q=a.mat4[13],r=a.mat4[14],s=a.mat4[15]):a instanceof g&&(b=a[0],c=a[1],e=a[2],f=a[3],h=a[4],i=a[5],j=a[6],k=a[7],l=a[8],m=a[9],n=a[10],o=a[11],p=a[12],q=a[13],r=a[14],s=a[15]);var t=b*i-c*h,u=b*j-e*h,v=b*k-f*h,w=c*j-e*i,x=c*k-f*i,y=e*k-f*j,z=l*q-m*p,A=l*r-n*p,B=l*s-o*p,C=m*r-n*q,D=m*s-o*q,E=n*s-o*r,F=t*E-u*D+v*C+w*B-x*A+y*z;return F?(F=1/F,this.mat4[0]=(i*E-j*D+k*C)*F,this.mat4[1]=(e*D-c*E-f*C)*F,this.mat4[2]=(q*y-r*x+s*w)*F,this.mat4[3]=(n*x-m*y-o*w)*F,this.mat4[4]=(j*B-h*E-k*A)*F,this.mat4[5]=(b*E-e*B+f*A)*F,this.mat4[6]=(r*v-p*y-s*u)*F,this.mat4[7]=(l*y-n*v+o*u)*F,this.mat4[8]=(h*D-i*B+k*z)*F,this.mat4[9]=(c*B-b*D-f*z)*F,this.mat4[10]=(p*x-q*v+s*t)*F,this.mat4[11]=(m*v-l*x-o*t)*F,this.mat4[12]=(i*A-h*C-j*z)*F,this.mat4[13]=(b*C-c*A+e*z)*F,this.mat4[14]=(q*u-p*w-r*t)*F,this.mat4[15]=(l*w-m*u+n*t)*F,this):null;},d.Matrix.prototype.invert3x3=function(){var a=this.mat3[0],b=this.mat3[1],c=this.mat3[2],d=this.mat3[3],e=this.mat3[4],f=this.mat3[5],g=this.mat3[6],h=this.mat3[7],i=this.mat3[8],j=i*e-f*h,k=-i*d+f*g,l=h*d-e*g,m=a*j+b*k+c*l;return m?(m=1/m,this.mat3[0]=j*m,this.mat3[1]=(-i*b+c*h)*m,this.mat3[2]=(f*b-c*e)*m,this.mat3[3]=k*m,this.mat3[4]=(i*a-c*g)*m,this.mat3[5]=(-f*a+c*d)*m,this.mat3[6]=l*m,this.mat3[7]=(-h*a+b*g)*m,this.mat3[8]=(e*a-b*d)*m,this):null;},d.Matrix.prototype.transpose3x3=function(a){var b=a[1],c=a[2],d=a[5];return this.mat3[1]=a[3],this.mat3[2]=a[6],this.mat3[3]=b,this.mat3[5]=a[7],this.mat3[6]=c,this.mat3[7]=d,this;},d.Matrix.prototype.inverseTranspose=function(a){return void 0===this.mat3?console.error(\"sorry, this function only works with mat3\"):(this.mat3[0]=a.mat4[0],this.mat3[1]=a.mat4[1],this.mat3[2]=a.mat4[2],this.mat3[3]=a.mat4[4],this.mat3[4]=a.mat4[5],this.mat3[5]=a.mat4[6],this.mat3[6]=a.mat4[8],this.mat3[7]=a.mat4[9],this.mat3[8]=a.mat4[10]),this.invert3x3().transpose3x3(this.mat3),this;},d.Matrix.prototype.determinant=function(){var a=this.mat4[0]*this.mat4[5]-this.mat4[1]*this.mat4[4],b=this.mat4[0]*this.mat4[6]-this.mat4[2]*this.mat4[4],c=this.mat4[0]*this.mat4[7]-this.mat4[3]*this.mat4[4],d=this.mat4[1]*this.mat4[6]-this.mat4[2]*this.mat4[5],e=this.mat4[1]*this.mat4[7]-this.mat4[3]*this.mat4[5],f=this.mat4[2]*this.mat4[7]-this.mat4[3]*this.mat4[6],g=this.mat4[8]*this.mat4[13]-this.mat4[9]*this.mat4[12],h=this.mat4[8]*this.mat4[14]-this.mat4[10]*this.mat4[12],i=this.mat4[8]*this.mat4[15]-this.mat4[11]*this.mat4[12],j=this.mat4[9]*this.mat4[14]-this.mat4[10]*this.mat4[13],k=this.mat4[9]*this.mat4[15]-this.mat4[11]*this.mat4[13],l=this.mat4[10]*this.mat4[15]-this.mat4[11]*this.mat4[14];return a*l-b*k+c*j+d*i-e*h+f*g;},d.Matrix.prototype.mult=function(a){var b=new g(16),c=new g(16);a instanceof d.Matrix?c=a.mat4:a instanceof g&&(c=a);var e=this.mat4[0],f=this.mat4[1],h=this.mat4[2],i=this.mat4[3];return b[0]=e*c[0]+f*c[4]+h*c[8]+i*c[12],b[1]=e*c[1]+f*c[5]+h*c[9]+i*c[13],b[2]=e*c[2]+f*c[6]+h*c[10]+i*c[14],b[3]=e*c[3]+f*c[7]+h*c[11]+i*c[15],e=this.mat4[4],f=this.mat4[5],h=this.mat4[6],i=this.mat4[7],b[4]=e*c[0]+f*c[4]+h*c[8]+i*c[12],b[5]=e*c[1]+f*c[5]+h*c[9]+i*c[13],b[6]=e*c[2]+f*c[6]+h*c[10]+i*c[14],b[7]=e*c[3]+f*c[7]+h*c[11]+i*c[15],e=this.mat4[8],f=this.mat4[9],h=this.mat4[10],i=this.mat4[11],b[8]=e*c[0]+f*c[4]+h*c[8]+i*c[12],b[9]=e*c[1]+f*c[5]+h*c[9]+i*c[13],b[10]=e*c[2]+f*c[6]+h*c[10]+i*c[14],b[11]=e*c[3]+f*c[7]+h*c[11]+i*c[15],e=this.mat4[12],f=this.mat4[13],h=this.mat4[14],i=this.mat4[15],b[12]=e*c[0]+f*c[4]+h*c[8]+i*c[12],b[13]=e*c[1]+f*c[5]+h*c[9]+i*c[13],b[14]=e*c[2]+f*c[6]+h*c[10]+i*c[14],b[15]=e*c[3]+f*c[7]+h*c[11]+i*c[15],this.mat4=b,this;},d.Matrix.prototype.scale=function(){for(var a,b,c,e=new Array(arguments.length),f=0;f<e.length;f++){e[f]=arguments[f];}e[0]instanceof d.Vector?(a=e[0].x,b=e[0].y,c=e[0].z):e[0]instanceof Array&&(a=e[0][0],b=e[0][1],c=e[0][2]);var h=new g(16);return h[0]=this.mat4[0]*a,h[1]=this.mat4[1]*a,h[2]=this.mat4[2]*a,h[3]=this.mat4[3]*a,h[4]=this.mat4[4]*b,h[5]=this.mat4[5]*b,h[6]=this.mat4[6]*b,h[7]=this.mat4[7]*b,h[8]=this.mat4[8]*c,h[9]=this.mat4[9]*c,h[10]=this.mat4[10]*c,h[11]=this.mat4[11]*c,h[12]=this.mat4[12],h[13]=this.mat4[13],h[14]=this.mat4[14],h[15]=this.mat4[15],this.mat4=h,this;},d.Matrix.prototype.rotate=function(a,b){var c,g,h,i,j;this.p5?this.p5._angleMode===f.DEGREES&&(i=e.degreesToRadians(a)):i=a,b instanceof d.Vector?(c=b.x,g=b.y,h=b.z):b instanceof Array&&(c=b[0],g=b[1],h=b[2]),j=Math.sqrt(c*c+g*g+h*h),c*=1/j,g*=1/j,h*=1/j;var k=this.mat4[0],l=this.mat4[1],m=this.mat4[2],n=this.mat4[3],o=this.mat4[4],p=this.mat4[5],q=this.mat4[6],r=this.mat4[7],s=this.mat4[8],t=this.mat4[9],u=this.mat4[10],v=this.mat4[11],w=Math.sin(i),x=Math.cos(i),y=1-x,z=c*c*y+x,A=g*c*y+h*w,B=h*c*y-g*w,C=c*g*y-h*w,D=g*g*y+x,E=h*g*y+c*w,F=c*h*y+g*w,G=g*h*y-c*w,H=h*h*y+x;return this.mat4[0]=k*z+o*A+s*B,this.mat4[1]=l*z+p*A+t*B,this.mat4[2]=m*z+q*A+u*B,this.mat4[3]=n*z+r*A+v*B,this.mat4[4]=k*C+o*D+s*E,this.mat4[5]=l*C+p*D+t*E,this.mat4[6]=m*C+q*D+u*E,this.mat4[7]=n*C+r*D+v*E,this.mat4[8]=k*F+o*G+s*H,this.mat4[9]=l*F+p*G+t*H,this.mat4[10]=m*F+q*G+u*H,this.mat4[11]=n*F+r*G+v*H,this;},d.Matrix.prototype.translate=function(a){var b=a[0],c=a[1],d=a[2]||0;this.mat4[12]=this.mat4[0]*b+this.mat4[4]*c+this.mat4[8]*d+this.mat4[12],this.mat4[13]=this.mat4[1]*b+this.mat4[5]*c+this.mat4[9]*d+this.mat4[13],this.mat4[14]=this.mat4[2]*b+this.mat4[6]*c+this.mat4[10]*d+this.mat4[14],this.mat4[15]=this.mat4[3]*b+this.mat4[7]*c+this.mat4[11]*d+this.mat4[15];},d.Matrix.prototype.rotateX=function(a){this.rotate(a,[1,0,0]);},d.Matrix.prototype.rotateY=function(a){this.rotate(a,[0,1,0]);},d.Matrix.prototype.rotateZ=function(a){this.rotate(a,[0,0,1]);},d.Matrix.prototype.perspective=function(a,b,c,d){var e=1/Math.tan(a/2),f=1/(c-d);return this.mat4[0]=e/b,this.mat4[1]=0,this.mat4[2]=0,this.mat4[3]=0,this.mat4[4]=0,this.mat4[5]=e,this.mat4[6]=0,this.mat4[7]=0,this.mat4[8]=0,this.mat4[9]=0,this.mat4[10]=(d+c)*f,this.mat4[11]=-1,this.mat4[12]=0,this.mat4[13]=0,this.mat4[14]=2*d*c*f,this.mat4[15]=0,this;},d.Matrix.prototype.ortho=function(a,b,c,d,e,f){var g=1/(a-b),h=1/(c-d),i=1/(e-f);return this.mat4[0]=-2*g,this.mat4[1]=0,this.mat4[2]=0,this.mat4[3]=0,this.mat4[4]=0,this.mat4[5]=-2*h,this.mat4[6]=0,this.mat4[7]=0,this.mat4[8]=0,this.mat4[9]=0,this.mat4[10]=2*i,this.mat4[11]=0,this.mat4[12]=(a+b)*g,this.mat4[13]=(d+c)*h,this.mat4[14]=(f+e)*i,this.mat4[15]=1,this;},b.exports=d.Matrix;},{\"../core/constants\":48,\"../core/core\":49,\"../math/polargeometry\":79}],35:[function(a,b,c){\"use strict\";var d=a(\"../core/core\"),e=a(\"../core/constants\");d.Renderer3D.prototype.beginShape=function(a){return this.immediateMode.shapeMode=void 0!==a?a:e.LINE_STRIP,void 0===this.immediateMode.vertexPositions?(this.immediateMode.vertexPositions=[],this.immediateMode.vertexColors=[],this.immediateMode.vertexBuffer=this.GL.createBuffer(),this.immediateMode.colorBuffer=this.GL.createBuffer()):(this.immediateMode.vertexPositions.length=0,this.immediateMode.vertexColors.length=0),this.isImmediateDrawing=!0,this;},d.Renderer3D.prototype.vertex=function(a,b,c){this.immediateMode.vertexPositions.push(a,b,c);var d=this.curFillColor||[.5,.5,.5,1];return this.immediateMode.vertexColors.push(d[0],d[1],d[2],d[3]),this;},d.Renderer3D.prototype.endShape=function(a,b,c,d,f,g){var h=this.GL;if(this._bindImmediateBuffers(this.immediateMode.vertexPositions,this.immediateMode.vertexColors),a)if(\"fill\"===this.drawMode)switch(this.immediateMode.shapeMode){case e.LINE_STRIP:this.immediateMode.shapeMode=e.TRIANGLE_FAN;break;case e.LINES:this.immediateMode.shapeMode=e.TRIANGLE_FAN;break;case e.TRIANGLES:this.immediateMode.shapeMode=e.TRIANGLE_FAN;}else switch(this.immediateMode.shapeMode){case e.LINE_STRIP:this.immediateMode.shapeMode=e.LINE_LOOP;break;case e.LINES:this.immediateMode.shapeMode=e.LINE_LOOP;}if(this.immediateMode.shapeMode===e.QUADS||this.immediateMode.shapeMode===e.QUAD_STRIP)throw new Error(\"sorry, \"+this.immediateMode.shapeMode+\" not yet implemented in webgl mode.\");return h.enable(h.BLEND),h.drawArrays(this.immediateMode.shapeMode,0,this.immediateMode.vertexPositions.length/3),this.immediateMode.vertexPositions.length=0,this.immediateMode.vertexColors.length=0,this.isImmediateDrawing=!1,this;},d.Renderer3D.prototype._bindImmediateBuffers=function(a,b){this._setDefaultCamera();var c=this.GL,d=this._getCurShaderId(),e=this.mHash[d];return e.vertexPositionAttribute=c.getAttribLocation(e,\"aPosition\"),c.enableVertexAttribArray(e.vertexPositionAttribute),c.bindBuffer(c.ARRAY_BUFFER,this.immediateMode.vertexBuffer),c.bufferData(c.ARRAY_BUFFER,new Float32Array(a),c.DYNAMIC_DRAW),c.vertexAttribPointer(e.vertexPositionAttribute,3,c.FLOAT,!1,0,0),e.vertexColorAttribute=c.getAttribLocation(e,\"aVertexColor\"),c.enableVertexAttribArray(e.vertexColorAttribute),c.bindBuffer(c.ARRAY_BUFFER,this.immediateMode.colorBuffer),c.bufferData(c.ARRAY_BUFFER,new Float32Array(b),c.DYNAMIC_DRAW),c.vertexAttribPointer(e.vertexColorAttribute,4,c.FLOAT,!1,0,0),this._setMatrixUniforms(d),this;},d.Renderer3D.prototype._getColorVertexShader=function(){var a,b=this.GL,c=\"immediateVert|vertexColorFrag\";return this.materialInHash(c)?a=this.mHash[c]:(a=this._initShaders(\"immediateVert\",\"vertexColorFrag\",!0),this.mHash[c]=a,a.vertexColorAttribute=b.getAttribLocation(a,\"aVertexColor\"),b.enableVertexAttribArray(a.vertexColorAttribute)),a;},b.exports=d.Renderer3D;},{\"../core/constants\":48,\"../core/core\":49}],36:[function(a,b,c){\"use strict\";function d(a){return a.length>0?a.reduce(function(a,b){return a.concat(b);}):[];}function e(a){return d(a.map(function(a){return[a.x,a.y,a.z];}));}var f=a(\"../core/core\"),g=0;f.Renderer3D.prototype._initBufferDefaults=function(a){if(g++,g>1e3){var b=Object.keys(this.gHash)[0];delete this.gHash[b],g--;}var c=this.GL;this.gHash[a]={},this.gHash[a].vertexBuffer=c.createBuffer(),this.gHash[a].normalBuffer=c.createBuffer(),this.gHash[a].uvBuffer=c.createBuffer(),this.gHash[a].indexBuffer=c.createBuffer();},f.Renderer3D.prototype.createBuffers=function(a,b){var c=this.GL;this._setDefaultCamera(),this._initBufferDefaults(a);var f=this.mHash[this._getCurShaderId()];this.gHash[a].numberOfItems=3*b.faces.length,c.bindBuffer(c.ARRAY_BUFFER,this.gHash[a].vertexBuffer),c.bufferData(c.ARRAY_BUFFER,new Float32Array(e(b.vertices)),c.STATIC_DRAW),f.vertexPositionAttribute=c.getAttribLocation(f,\"aPosition\"),c.enableVertexAttribArray(f.vertexPositionAttribute),c.vertexAttribPointer(f.vertexPositionAttribute,3,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,this.gHash[a].normalBuffer),c.bufferData(c.ARRAY_BUFFER,new Float32Array(e(b.vertexNormals)),c.STATIC_DRAW),f.vertexNormalAttribute=c.getAttribLocation(f,\"aNormal\"),c.enableVertexAttribArray(f.vertexNormalAttribute),c.vertexAttribPointer(f.vertexNormalAttribute,3,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,this.gHash[a].uvBuffer),c.bufferData(c.ARRAY_BUFFER,new Float32Array(d(b.uvs)),c.STATIC_DRAW),f.textureCoordAttribute=c.getAttribLocation(f,\"aTexCoord\"),c.enableVertexAttribArray(f.textureCoordAttribute),c.vertexAttribPointer(f.textureCoordAttribute,2,c.FLOAT,!1,0,0),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this.gHash[a].indexBuffer),c.bufferData(c.ELEMENT_ARRAY_BUFFER,new Uint16Array(d(b.faces)),c.STATIC_DRAW);},f.Renderer3D.prototype.drawBuffers=function(a){this._setDefaultCamera();var b=this.GL,c=this._getCurShaderId(),d=this.mHash[c];return b.bindBuffer(b.ARRAY_BUFFER,this.gHash[a].vertexBuffer),b.vertexAttribPointer(d.vertexPositionAttribute,3,b.FLOAT,!1,0,0),b.bindBuffer(b.ARRAY_BUFFER,this.gHash[a].normalBuffer),b.vertexAttribPointer(d.vertexNormalAttribute,3,b.FLOAT,!1,0,0),b.bindBuffer(b.ARRAY_BUFFER,this.gHash[a].uvBuffer),b.vertexAttribPointer(d.textureCoordAttribute,2,b.FLOAT,!1,0,0),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,this.gHash[a].indexBuffer),this._setMatrixUniforms(c),b.drawElements(b.TRIANGLES,this.gHash[a].numberOfItems,b.UNSIGNED_SHORT,0),this;},b.exports=f.Renderer3D;},{\"../core/core\":49}],37:[function(a,b,c){\"use strict\";var d=a(\"../core/core\"),e=a(\"./shader\");a(\"../core/p5.Renderer\"),a(\"./p5.Matrix\");var f=[],g=1e3,h={alpha:!0,depth:!0,stencil:!0,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1};d.Renderer3D=function(a,b,c){return d.Renderer.call(this,a,b,c),this._initContext(),this.isP3D=!0,this.GL=this.drawingContext,this.ambientLightCount=0,this.directionalLightCount=0,this.pointLightCount=0,this._isSetCamera=!1,this.uMVMatrix=new d.Matrix(),this.uPMatrix=new d.Matrix(),this.uNMatrix=new d.Matrix(\"mat3\"),this.gHash={},this.mHash={},this.isImmediateDrawing=!1,this.immediateMode={},this.curFillColor=[.5,.5,.5,1],this.curStrokeColor=[.5,.5,.5,1],this.pointSize=5,this;},d.Renderer3D.prototype=Object.create(d.Renderer.prototype),d.Renderer3D.prototype._initContext=function(){try{if(this.drawingContext=this.canvas.getContext(\"webgl\",h)||this.canvas.getContext(\"experimental-webgl\",h),null===this.drawingContext)throw new Error(\"Error creating webgl context\");console.log(\"p5.Renderer3D: enabled webgl context\");var a=this.drawingContext;a.enable(a.DEPTH_TEST),a.depthFunc(a.LEQUAL),a.viewport(0,0,a.drawingBufferWidth,a.drawingBufferHeight);}catch(b){throw new Error(b);}},d.Renderer3D.prototype._setDefaultCamera=function(){if(!this._isSetCamera){var a=this.width,b=this.height;this.uPMatrix=d.Matrix.identity(),this.uPMatrix.perspective(60/180*Math.PI,a/b,.1,100),this._isSetCamera=!0;}},d.Renderer3D.prototype._update=function(){this.uMVMatrix=d.Matrix.identity(),this.translate(0,0,-800),this.ambientLightCount=0,this.directionalLightCount=0,this.pointLightCount=0;},d.Renderer3D.prototype.background=function(){var a=this.GL,b=this._pInst.color.apply(this._pInst,arguments),c=b.levels[0]/255,d=b.levels[1]/255,e=b.levels[2]/255,f=b.levels[3]/255;a.clearColor(c,d,e,f),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT);},d.Renderer3D.prototype._initShaders=function(a,b,c){var d=this.GL,f=d.createShader(d.VERTEX_SHADER);if(d.shaderSource(f,e[a]),d.compileShader(f),!d.getShaderParameter(f,d.COMPILE_STATUS))return alert(\"Yikes! An error occurred compiling the shaders:\"+d.getShaderInfoLog(f)),null;var g=d.createShader(d.FRAGMENT_SHADER);if(d.shaderSource(g,e[b]),d.compileShader(g),!d.getShaderParameter(g,d.COMPILE_STATUS))return alert(\"Darn! An error occurred compiling the shaders:\"+d.getShaderInfoLog(g)),null;var h=d.createProgram();return d.attachShader(h,f),d.attachShader(h,g),d.linkProgram(h),d.getProgramParameter(h,d.LINK_STATUS)||alert(\"Snap! Error linking shader program\"),this._getLocation(h,c),h;},d.Renderer3D.prototype._getLocation=function(a,b){var c=this.GL;c.useProgram(a),a.uResolution=c.getUniformLocation(a,\"uResolution\"),c.uniform1f(a.uResolution,g),a.uPMatrixUniform=c.getUniformLocation(a,\"uProjectionMatrix\"),a.uMVMatrixUniform=c.getUniformLocation(a,\"uModelViewMatrix\"),void 0===b&&(a.uNMatrixUniform=c.getUniformLocation(a,\"uNormalMatrix\"),a.samplerUniform=c.getUniformLocation(a,\"uSampler\"));},d.Renderer3D.prototype._setUniform1f=function(a,b,c){var d=this.GL,e=this.mHash[a];return d.useProgram(e),e[b]=d.getUniformLocation(e,b),d.uniform1f(e[b],c),this;},d.Renderer3D.prototype._setMatrixUniforms=function(a){var b=this.GL,c=this.mHash[a];b.useProgram(c),b.uniformMatrix4fv(c.uPMatrixUniform,!1,this.uPMatrix.mat4),b.uniformMatrix4fv(c.uMVMatrixUniform,!1,this.uMVMatrix.mat4),b.uniformMatrix3fv(c.uNMatrixUniform,!1,this.uNMatrix.mat3);},d.Renderer3D.prototype._getShader=function(a,b,c){var d=a+\"|\"+b;if(!this.materialInHash(d)){var e=this._initShaders(a,b,c);this.mHash[d]=e;}return this.curShaderId=d,this.mHash[this.curShaderId];},d.Renderer3D.prototype._getCurShaderId=function(){var a,b;return\"fill\"!==this.drawMode&&void 0===this.curShaderId?(a=\"normalVert|normalFrag\",b=this._initShaders(\"normalVert\",\"normalFrag\"),this.mHash[a]=b,this.curShaderId=a):this.isImmediateDrawing&&\"fill\"===this.drawMode&&(a=\"immediateVert|vertexColorFrag\",b=this._initShaders(\"immediateVert\",\"vertexColorFrag\"),this.mHash[a]=b,this.curShaderId=a),this.curShaderId;},d.Renderer3D.prototype.fill=function(a,b,c,d){var e,f=this.GL,g=this._applyColorBlend(a,b,c,d);return this.curFillColor=g,this.drawMode=\"fill\",this.isImmediateDrawing?(e=this._getShader(\"immediateVert\",\"vertexColorFrag\"),f.useProgram(e)):(e=this._getShader(\"normalVert\",\"basicFrag\"),f.useProgram(e),e.uMaterialColor=f.getUniformLocation(e,\"uMaterialColor\"),f.uniform4f(e.uMaterialColor,g[0],g[1],g[2],g[3])),this;},d.Renderer3D.prototype.stroke=function(a,b,c,d){var e=this._pInst.color.apply(this._pInst,arguments),f=e._array;return this.curStrokeColor=f,this.drawMode=\"stroke\",this;},d.Renderer3D.prototype._strokeCheck=function(){if(\"stroke\"===this.drawMode)throw new Error(\"stroke for shapes in 3D not yet implemented, use fill for now :(\");},d.Renderer3D.prototype.strokeWeight=function(a){return this.pointSize=a,this;},d.Renderer3D.prototype.geometryInHash=function(a){return void 0!==this.gHash[a];},d.Renderer3D.prototype.materialInHash=function(a){return void 0!==this.mHash[a];},d.Renderer3D.prototype.resize=function(a,b){var c=this.GL;d.Renderer.prototype.resize.call(this,a,b),c.viewport(0,0,c.drawingBufferWidth,c.drawingBufferHeight);},d.Renderer3D.prototype.clear=function(){var a=this.GL;a.clearColor(arguments[0],arguments[1],arguments[2],arguments[3]),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT);},d.Renderer3D.prototype.translate=function(a,b,c){return a/=g,b=-b/g,c/=g,this.uMVMatrix.translate([a,b,c]),this;},d.Renderer3D.prototype.scale=function(a,b,c){return this.uMVMatrix.scale([a,b,c]),this;},d.Renderer3D.prototype.rotate=function(a,b){return this.uMVMatrix.rotate(a,b),this.uNMatrix.inverseTranspose(this.uMVMatrix),this;},d.Renderer3D.prototype.rotateX=function(a){return this.rotate(a,[1,0,0]),this;},d.Renderer3D.prototype.rotateY=function(a){return this.rotate(a,[0,1,0]),this;},d.Renderer3D.prototype.rotateZ=function(a){return this.rotate(a,[0,0,1]),this;},d.Renderer3D.prototype.push=function(){f.push(this.uMVMatrix.copy());},d.Renderer3D.prototype.pop=function(){if(0===f.length)throw new Error(\"Invalid popMatrix!\");this.uMVMatrix=f.pop();},d.Renderer3D.prototype._applyTextProperties=function(){console.error(\"text commands not yet implemented in webgl\");},b.exports=d.Renderer3D;},{\"../core/core\":49,\"../core/p5.Renderer\":55,\"./p5.Matrix\":34,\"./shader\":39}],38:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");a(\"./p5.Geometry\"),d.prototype.plane=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}var c=a[0]||50,e=a[1]||c,f=\"number\"==typeof a[2]?a[2]:1,g=\"number\"==typeof a[3]?a[3]:1,h=\"plane|\"+c+\"|\"+e+\"|\"+f+\"|\"+g;if(!this._renderer.geometryInHash(h)){var i=function i(){for(var a,b,f,g=0;g<=this.detailY;g++){b=g/this.detailY;for(var h=0;h<=this.detailX;h++){a=h/this.detailX,f=new d.Vector(c*a-c/2,e*b-e/2,0),this.vertices.push(f),this.uvs.push([a,b]);}}},j=new d.Geometry(f,g,i);j.computeFaces().computeNormals(),this._renderer.createBuffers(h,j);}this._renderer.drawBuffers(h);},d.prototype.box=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}var c=a[0]||50,e=a[1]||c,f=a[2]||c,g=\"number\"==typeof a[3]?a[3]:4,h=\"number\"==typeof a[4]?a[4]:4,i=\"box|\"+c+\"|\"+e+\"|\"+f+\"|\"+g+\"|\"+h;if(!this._renderer.geometryInHash(i)){var j=function j(){for(var a=[[0,4,2,6],[1,3,5,7],[0,1,4,5],[2,6,3,7],[0,2,1,3],[4,5,6,7]],b=0,g=0;g<a.length;g++){for(var h=a[g],i=4*g,j=0;4>j;j++){var k=h[j],l=new d.Vector((2*(1&k)-1)*c/2,((2&k)-1)*e/2,((4&k)/2-1)*f/2);this.vertices.push(l),this.uvs.push([1&j,(2&j)/2]),b++;}this.faces.push([i,i+1,i+2]),this.faces.push([i+2,i+1,i+3]);}},k=new d.Geometry(g,h,j);k.computeNormals(),this._renderer.createBuffers(i,k);}return this._renderer.drawBuffers(i),this;},d.prototype.sphere=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}var c=a[0]||50,e=\"number\"==typeof a[1]?a[1]:24,f=\"number\"==typeof a[2]?a[2]:16,g=\"sphere|\"+c+\"|\"+e+\"|\"+f;if(!this._renderer.geometryInHash(g)){var h=function h(){for(var a,b,e,f=0;f<=this.detailY;f++){b=f/this.detailY;for(var g=0;g<=this.detailX;g++){a=g/this.detailX;var h=2*Math.PI*a,i=Math.PI*b-Math.PI/2;e=new d.Vector(c*Math.cos(i)*Math.sin(h),c*Math.sin(i),c*Math.cos(i)*Math.cos(h)),this.vertices.push(e),this.uvs.push([a,b]);}}},i=new d.Geometry(e,f,h);i.computeFaces().computeNormals(),this._renderer.createBuffers(g,i);}return this._renderer.drawBuffers(g),this;};var e=function e(a,b,c,_e,f,g,h){_e=3>_e?3:_e,f=1>f?1:f,g=void 0===g?!0:g,h=void 0===h?!0:h;var i,j,k=(g?2:0)+(h?2:0),l=_e+1,m=Math.atan2(a-b,c),n=g?-2:0,o=f+(h?2:0);for(i=n;o>=i;++i){var p,q=i/f,r=c*q;for(0>i?(r=0,q=1,p=a):i>f?(r=c,q=1,p=b):p=a+(b-a)*(i/f),(-2===i||i===f+2)&&(p=0,q=0),r-=c/2,j=0;l>j;++j){this.vertices.push(new d.Vector(Math.sin(j*Math.PI*2/_e)*p,r,Math.cos(j*Math.PI*2/_e)*p)),this.vertexNormals.push(new d.Vector(0>i||i>f?0:Math.sin(j*Math.PI*2/_e)*Math.cos(m),0>i?-1:i>f?1:Math.sin(m),0>i||i>f?0:Math.cos(j*Math.PI*2/_e)*Math.cos(m))),this.uvs.push([j/_e,q]);}}for(i=0;f+k>i;++i){for(j=0;_e>j;++j){this.faces.push([l*(i+0)+0+j,l*(i+0)+1+j,l*(i+1)+1+j]),this.faces.push([l*(i+0)+0+j,l*(i+1)+1+j,l*(i+1)+0+j]);}}};d.prototype.cylinder=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}var c=a[0]||50,f=a[1]||c,g=\"number\"==typeof a[2]?a[2]:24,h=\"number\"==typeof a[3]?a[3]:16,i=\"cylinder|\"+c+\"|\"+f+\"|\"+g+\"|\"+h;if(!this._renderer.geometryInHash(i)){var j=new d.Geometry(g,h);e.call(j,c,c,f,g,h,!0,!0),j.computeNormals(),this._renderer.createBuffers(i,j);}return this._renderer.drawBuffers(i),this;},d.prototype.cone=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}var c=a[0]||50,f=a[1]||c,g=\"number\"==typeof a[2]?a[2]:24,h=\"number\"==typeof a[3]?a[3]:16,i=\"cone|\"+c+\"|\"+f+\"|\"+g+\"|\"+h;if(!this._renderer.geometryInHash(i)){var j=new d.Geometry(g,h);e.call(j,c,0,f,g,h,!0,!0),j.computeNormals(),this._renderer.createBuffers(i,j);}return this._renderer.drawBuffers(i),this;},d.prototype.ellipsoid=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}var c=\"number\"==typeof a[2]?a[2]:24,e=\"number\"==typeof a[3]?a[3]:24,f=a[0]||50,g=a[1]||f,h=a[2]||f,i=\"ellipsoid|\"+f+\"|\"+g+\"|\"+h+\"|\"+c+\"|\"+e;if(!this._renderer.geometryInHash(i)){var j=function j(){for(var a,b,c,e=0;e<=this.detailY;e++){b=e/this.detailY;for(var i=0;i<=this.detailX;i++){a=i/this.detailX;var j=2*Math.PI*a,k=Math.PI*b-Math.PI/2;c=new d.Vector(f*Math.cos(k)*Math.sin(j),g*Math.sin(k),h*Math.cos(k)*Math.cos(j)),this.vertices.push(c),this.uvs.push([a,b]);}}},k=new d.Geometry(c,e,j);k.computeFaces().computeNormals(),this._renderer.createBuffers(i,k);}return this._renderer.drawBuffers(i),this;},d.prototype.torus=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}var c=\"number\"==typeof a[2]?a[2]:24,e=\"number\"==typeof a[3]?a[3]:16,f=a[0]||50,g=a[1]||10,h=\"torus|\"+f+\"|\"+g+\"|\"+c+\"|\"+e;if(!this._renderer.geometryInHash(h)){var i=function i(){for(var a,b,c,e=0;e<=this.detailY;e++){b=e/this.detailY;for(var h=0;h<=this.detailX;h++){a=h/this.detailX;var i=2*Math.PI*a,j=2*Math.PI*b;c=new d.Vector((f+g*Math.cos(j))*Math.cos(i),(f+g*Math.cos(j))*Math.sin(i),g*Math.sin(j)),this.vertices.push(c),this.uvs.push([a,b]);}}},j=new d.Geometry(c,e,i);j.computeFaces().computeNormals(),this._renderer.createBuffers(h,j);}return this._renderer.drawBuffers(h),this;},d.Renderer3D.prototype.point=function(a,b,c){return console.log(\"point not yet implemented in webgl\"),this;},d.Renderer3D.prototype.triangle=function(a){var b=a[0],c=a[1],e=a[2],f=a[3],g=a[4],h=a[5],i=a[6],j=a[7],k=a[8],l=\"tri|\"+b+\"|\"+c+\"|\"+e+\"|\"+f+\"|\"+g+\"|\"+h+i+\"|\"+j+\"|\"+k;if(!this.geometryInHash(l)){var m=function m(){var a=[];a.push(new d.Vector(b,c,e)),a.push(new d.Vector(f,g,h)),a.push(new d.Vector(i,j,k)),this.vertices=a,this.faces=[[0,1,2]],this.uvs=[[0,0],[0,1],[1,1]];},n=new d.Geometry(1,1,m);n.computeNormals(),this.createBuffers(l,n);}return this.drawBuffers(l),this;},d.Renderer3D.prototype.ellipse=function(a){var b=a[0],c=a[1],e=a[2],f=a[3],g=a[4],h=a[5]||24,i=a[6]||16,j=\"ellipse|\"+a[0]+\"|\"+a[1]+\"|\"+a[2]+\"|\"+a[3]+\"|\"+a[4];if(!this.geometryInHash(j)){var k=function k(){for(var a,h,i,j=0;j<=this.detailY;j++){h=j/this.detailY;for(var k=0;k<=this.detailX;k++){a=k/this.detailX;var l=2*Math.PI*a;if(0===h)i=new d.Vector(b,c,e);else{var m=b+f*Math.sin(l),n=c+g*Math.cos(l),o=e;i=new d.Vector(m,n,o);}this.vertices.push(i),this.uvs.push([a,h]);}}},l=new d.Geometry(h,i,k);l.computeFaces().computeNormals(),this.createBuffers(j,l);}return this.drawBuffers(j),this;},d.Renderer3D.prototype.rect=function(a){var b=\"rect|\"+a[0]+\"|\"+a[1]+\"|\"+a[2]+\"|\"+a[3]+\"|\"+a[4],c=a[0],e=a[1],f=a[2],g=a[3],h=a[4],i=a[5]||24,j=a[6]||16;if(!this.geometryInHash(b)){var k=function k(){for(var a,b,i,j=0;j<=this.detailY;j++){b=j/this.detailY;for(var k=0;k<=this.detailX;k++){a=k/this.detailX,i=new d.Vector((c+g)*a,(e+h)*b,f),this.vertices.push(i),this.uvs.push([a,b]);}}},l=new d.Geometry(i,j,k);l.computeFaces().computeNormals(),this.createBuffers(b,l);}return this.drawBuffers(b),this;},d.Renderer3D.prototype.quad=function(a){var b=a[0],c=a[1],e=a[2],f=a[3],g=a[4],h=a[5],i=a[6],j=a[7],k=a[8],l=a[9],m=a[10],n=a[11],o=\"quad|\"+b+\"|\"+c+\"|\"+e+\"|\"+f+\"|\"+g+\"|\"+h+i+\"|\"+j+\"|\"+k+l+\"|\"+m+\"|\"+n;if(!this.geometryInHash(o)){var p=function p(){this.vertices.push(new d.Vector(b,c,e)),this.vertices.push(new d.Vector(f,g,h)),this.vertices.push(new d.Vector(i,j,k)),this.vertices.push(new d.Vector(l,m,n));},q=new d.Geometry(2,2,p);q.computeNormals().computeUVs(),q.faces=[[0,1,2],[2,3,1]],this.createBuffers(o,q);}return this.drawBuffers(o),this;},d.Renderer3D.prototype.bezier=function(a){var b=a[12]||20;this.beginShape();for(var c=[0,0,0,0],d=[0,0,0],e=0;b>=e;e++){c[0]=Math.pow(1-e/b,3),c[1]=3*(e/b)*Math.pow(1-e/b,2),c[2]=3*Math.pow(e/b,2)*(1-e/b),c[3]=Math.pow(e/b,3),d[0]=a[0]*c[0]+a[3]*c[1]+a[6]*c[2]+a[9]*c[3],d[1]=a[1]*c[0]+a[4]*c[1]+a[7]*c[2]+a[10]*c[3],d[2]=a[2]*c[0]+a[5]*c[1]+a[8]*c[2]+a[11]*c[3],this.vertex(d[0],d[1],d[2]);}return this.endShape(),this;},d.Renderer3D.prototype.curve=function(a){var b=a[12];this.beginShape();for(var c=[0,0,0,0],d=[0,0,0],e=0;b>=e;e++){c[0]=.5*Math.pow(e/b,3),c[1]=.5*Math.pow(e/b,2),c[2]=e/b*.5,c[3]=.5,d[0]=c[0]*(-a[0]+3*a[3]-3*a[6]+a[9])+c[1]*(2*a[0]-5*a[3]+4*a[6]-a[9])+c[2]*(-a[0]+a[6])+2*c[3]*a[3],d[1]=c[0]*(-a[1]+3*a[4]-3*a[7]+a[10])+c[1]*(2*a[1]-5*a[4]+4*a[7]-a[10])+c[2]*(-a[1]+a[7])+2*c[3]*a[4],d[2]=c[0]*(-a[2]+3*a[5]-3*a[8]+a[11])+c[1]*(2*a[2]-5*a[5]+4*a[8]-a[11])+c[2]*(-a[2]+a[8])+2*c[3]*a[5],this.vertex(d[0],d[1],d[2]);}return this.endShape(),this;},b.exports=d;},{\"../core/core\":49,\"./p5.Geometry\":33}],39:[function(a,b,c){b.exports={immediateVert:\"attribute vec3 aPosition;\\nattribute vec4 aVertexColor;\\n\\nuniform mat4 uModelViewMatrix;\\nuniform mat4 uProjectionMatrix;\\nuniform float uResolution;\\nuniform float uPointSize;\\n\\nvarying vec4 vColor;\\nvoid main(void) {\\n  vec4 positionVec4 = vec4(aPosition / uResolution *vec3(1.0, -1.0, 1.0), 1.0);\\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\\n  vColor = aVertexColor;\\n  gl_PointSize = uPointSize;\\n}\",vertexColorVert:\"attribute vec3 aPosition;\\nattribute vec4 aVertexColor;\\n\\nuniform mat4 uModelViewMatrix;\\nuniform mat4 uProjectionMatrix;\\nuniform float uResolution;\\n\\nvarying vec4 vColor;\\n\\nvoid main(void) {\\n  vec4 positionVec4 = vec4(aPosition / uResolution * vec3(1.0, -1.0, 1.0), 1.0);\\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\\n  vColor = aVertexColor;\\n}\",vertexColorFrag:\"precision mediump float;\\nvarying vec4 vColor;\\nvoid main(void) {\\n  gl_FragColor = vColor;\\n}\",normalVert:\"attribute vec3 aPosition;\\nattribute vec3 aNormal;\\nattribute vec2 aTexCoord;\\n\\nuniform mat4 uModelViewMatrix;\\nuniform mat4 uProjectionMatrix;\\nuniform mat3 uNormalMatrix;\\nuniform float uResolution;\\n\\nvarying vec3 vVertexNormal;\\nvarying highp vec2 vVertTexCoord;\\n\\nvoid main(void) {\\n  vec4 positionVec4 = vec4(aPosition / uResolution, 1.0);\\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\\n  vVertexNormal = vec3( uNormalMatrix * aNormal );\\n  vVertTexCoord = aTexCoord;\\n}\",normalFrag:\"precision mediump float;\\nvarying vec3 vVertexNormal;\\nvoid main(void) {\\n  gl_FragColor = vec4(vVertexNormal, 1.0);\\n}\",basicFrag:\"precision mediump float;\\nvarying vec3 vVertexNormal;\\nuniform vec4 uMaterialColor;\\nvoid main(void) {\\n  gl_FragColor = uMaterialColor;\\n}\",lightVert:\"attribute vec3 aPosition;\\nattribute vec3 aNormal;\\nattribute vec2 aTexCoord;\\n\\nuniform mat4 uModelViewMatrix;\\nuniform mat4 uProjectionMatrix;\\nuniform mat3 uNormalMatrix;\\nuniform float uResolution;\\nuniform int uAmbientLightCount;\\nuniform int uDirectionalLightCount;\\nuniform int uPointLightCount;\\n\\nuniform vec3 uAmbientColor[8];\\nuniform vec3 uLightingDirection[8];\\nuniform vec3 uDirectionalColor[8];\\nuniform vec3 uPointLightLocation[8];\\nuniform vec3 uPointLightColor[8];\\nuniform bool uSpecular;\\n\\nvarying vec3 vVertexNormal;\\nvarying vec2 vVertTexCoord;\\nvarying vec3 vLightWeighting;\\n\\nvec3 ambientLightFactor = vec3(0.0, 0.0, 0.0);\\nvec3 directionalLightFactor = vec3(0.0, 0.0, 0.0);\\nvec3 pointLightFactor = vec3(0.0, 0.0, 0.0);\\nvec3 pointLightFactor2 = vec3(0.0, 0.0, 0.0);\\n\\nvoid main(void){\\n\\n  vec4 positionVec4 = vec4(aPosition / uResolution, 1.0);\\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\\n\\n  vec3 vertexNormal = vec3( uNormalMatrix * aNormal );\\n  vVertexNormal = vertexNormal;\\n  vVertTexCoord = aTexCoord;\\n\\n  vec4 mvPosition = uModelViewMatrix * vec4(aPosition / uResolution, 1.0);\\n  vec3 eyeDirection = normalize(-mvPosition.xyz);\\n\\n  float shininess = 32.0;\\n  float specularFactor = 2.0;\\n  float diffuseFactor = 0.3;\\n\\n  for(int i = 0; i < 8; i++){\\n    if(uAmbientLightCount == i) break;\\n    ambientLightFactor += uAmbientColor[i];\\n  }\\n\\n  for(int j = 0; j < 8; j++){\\n    if(uDirectionalLightCount == j) break;\\n    vec3 dir = uLightingDirection[j];\\n    float directionalLightWeighting = max(dot(vertexNormal, dir), 0.0);\\n    directionalLightFactor += uDirectionalColor[j] * directionalLightWeighting;\\n  }\\n\\n  for(int k = 0; k < 8; k++){\\n    if(uPointLightCount == k) break;\\n    vec3 loc = uPointLightLocation[k];\\n    //loc = loc / uResolution;\\n    vec3 lightDirection = normalize(loc - mvPosition.xyz);\\n\\n    float directionalLightWeighting = max(dot(vertexNormal, lightDirection), 0.0);\\n    pointLightFactor += uPointLightColor[k] * directionalLightWeighting;\\n\\n    //factor2 for specular\\n    vec3 reflectionDirection = reflect(-lightDirection, vertexNormal);\\n    float specularLightWeighting = pow(max(dot(reflectionDirection, eyeDirection), 0.0), shininess);\\n\\n    pointLightFactor2 += uPointLightColor[k] * (specularFactor * specularLightWeighting\\n      +  directionalLightWeighting * diffuseFactor);\\n  }\\n  \\n  if(!uSpecular){\\n    vLightWeighting =  ambientLightFactor + directionalLightFactor + pointLightFactor;\\n  }else{\\n    vLightWeighting = ambientLightFactor + directionalLightFactor + pointLightFactor2;\\n  }\\n\\n}\",lightTextureFrag:\"precision mediump float;\\n\\nuniform vec4 uMaterialColor;\\nuniform sampler2D uSampler;\\nuniform bool isTexture;\\n\\nvarying vec3 vLightWeighting;\\nvarying highp vec2 vVertTexCoord;\\n\\nvoid main(void) {\\n  if(!isTexture){\\n    gl_FragColor = vec4(vec3(uMaterialColor.rgb * vLightWeighting), uMaterialColor.a);\\n  }else{\\n    vec4 textureColor = texture2D(uSampler, vVertTexCoord);\\n    if(vLightWeighting == vec3(0., 0., 0.)){\\n      gl_FragColor = textureColor;\\n    }else{\\n      gl_FragColor = vec4(vec3(textureColor.rgb * vLightWeighting), textureColor.a); \\n    }\\n  }\\n}\"};},{}],40:[function(a,b,c){\"use strict\";var d=a(\"./core/core\");a(\"./color/p5.Color\"),a(\"./core/p5.Element\"),a(\"./typography/p5.Font\"),a(\"./core/p5.Graphics\"),a(\"./core/p5.Renderer2D\"),a(\"./image/p5.Image\"),a(\"./math/p5.Vector\"),a(\"./io/p5.TableRow\"),a(\"./io/p5.Table\"),a(\"./io/p5.XML\"),a(\"./color/creating_reading\"),a(\"./color/setting\"),a(\"./core/constants\"),a(\"./utilities/conversion\"),a(\"./utilities/array_functions\"),a(\"./utilities/string_functions\"),a(\"./core/environment\"),a(\"./image/image\"),a(\"./image/loading_displaying\"),a(\"./image/pixels\"),a(\"./io/files\"),a(\"./events/keyboard\"),a(\"./events/acceleration\"),a(\"./events/mouse\"),a(\"./utilities/time_date\"),a(\"./events/touch\"),a(\"./math/math\"),a(\"./math/calculation\"),a(\"./math/random\"),a(\"./math/noise\"),a(\"./math/trigonometry\"),a(\"./core/rendering\"),a(\"./core/2d_primitives\"),a(\"./core/attributes\"),a(\"./core/curves\"),a(\"./core/vertex\"),a(\"./core/structure\"),a(\"./core/transform\"),a(\"./typography/attributes\"),a(\"./typography/loading_displaying\"),a(\"./3d/p5.Renderer3D\"),a(\"./3d/p5.Geometry\"),a(\"./3d/p5.Renderer3D.Retained\"),a(\"./3d/p5.Renderer3D.Immediate\"),a(\"./3d/primitives\"),a(\"./3d/loading\"),a(\"./3d/p5.Matrix\"),a(\"./3d/material\"),a(\"./3d/light\"),a(\"./3d/shader\"),a(\"./3d/camera\"),a(\"./3d/interaction\");var e=function e(){window.PHANTOMJS||window.mocha||(window.setup&&\"function\"==typeof window.setup||window.draw&&\"function\"==typeof window.draw)&&new d();};\"complete\"===document.readyState?e():window.addEventListener(\"load\",e,!1),b.exports=d;},{\"./3d/camera\":28,\"./3d/interaction\":29,\"./3d/light\":30,\"./3d/loading\":31,\"./3d/material\":32,\"./3d/p5.Geometry\":33,\"./3d/p5.Matrix\":34,\"./3d/p5.Renderer3D\":37,\"./3d/p5.Renderer3D.Immediate\":35,\"./3d/p5.Renderer3D.Retained\":36,\"./3d/primitives\":38,\"./3d/shader\":39,\"./color/creating_reading\":42,\"./color/p5.Color\":43,\"./color/setting\":44,\"./core/2d_primitives\":45,\"./core/attributes\":46,\"./core/constants\":48,\"./core/core\":49,\"./core/curves\":50,\"./core/environment\":51,\"./core/p5.Element\":53,\"./core/p5.Graphics\":54,\"./core/p5.Renderer2D\":56,\"./core/rendering\":57,\"./core/structure\":59,\"./core/transform\":60,\"./core/vertex\":61,\"./events/acceleration\":62,\"./events/keyboard\":63,\"./events/mouse\":64,\"./events/touch\":65,\"./image/image\":67,\"./image/loading_displaying\":68,\"./image/p5.Image\":69,\"./image/pixels\":70,\"./io/files\":71,\"./io/p5.Table\":72,\"./io/p5.TableRow\":73,\"./io/p5.XML\":74,\"./math/calculation\":75,\"./math/math\":76,\"./math/noise\":77,\"./math/p5.Vector\":78,\"./math/random\":80,\"./math/trigonometry\":81,\"./typography/attributes\":82,\"./typography/loading_displaying\":83,\"./typography/p5.Font\":84,\"./utilities/array_functions\":85,\"./utilities/conversion\":86,\"./utilities/string_functions\":87,\"./utilities/time_date\":88}],41:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");d.ColorConversion={},d.ColorConversion._hsbaToHSLA=function(a){var b=a[0],c=a[1],d=a[2],e=(2-c)*d/2;return 0!==e&&(1===e?c=0:.5>e?c/=2-c:c=c*d/(2-2*e)),[b,c,e,a[3]];},d.ColorConversion._hsbaToRGBA=function(a){var b=6*a[0],c=a[1],d=a[2],e=[];if(0===c)e=[d,d,d,a[3]];else{var f,g,h,i=Math.floor(b),j=d*(1-c),k=d*(1-c*(b-i)),l=d*(1-c*(1+i-b));0===i?(f=d,g=l,h=j):1===i?(f=k,g=d,h=j):2===i?(f=j,g=d,h=l):3===i?(f=j,g=k,h=d):4===i?(f=l,g=j,h=d):(f=d,g=j,h=k),e=[f,g,h,a[3]];}return e;},d.ColorConversion._hslaToHSBA=function(a){var b,c=a[0],d=a[1],e=a[2];return b=.5>e?(1+d)*e:e+d-e*d,d=2*(b-e)/b,[c,d,b,a[3]];},d.ColorConversion._hslaToRGBA=function(a){var b=6*a[0],c=a[1],d=a[2],e=[];if(0===c)e=[d,d,d,a[3]];else{var f;f=.5>d?(1+c)*d:d+c-d*c;var g=2*d-f,h=function h(a,b,c){return 0>a?a+=6:a>=6&&(a-=6),1>a?b+(c-b)*a:3>a?c:4>a?b+(c-b)*(4-a):b;};e=[h(b+2,g,f),h(b,g,f),h(b-2,g,f),a[3]];}return e;},d.ColorConversion._rgbaToHSBA=function(a){var b,c,d=a[0],e=a[1],f=a[2],g=Math.max(d,e,f),h=g-Math.min(d,e,f);return 0===h?(b=0,c=0):(c=h/g,d===g?b=(e-f)/h:e===g?b=2+(f-d)/h:f===g&&(b=4+(d-e)/h),0>b?b+=6:b>=6&&(b-=6)),[b/6,c,g,a[3]];},d.ColorConversion._rgbaToHSLA=function(a){var b,c,d=a[0],e=a[1],f=a[2],g=Math.max(d,e,f),h=Math.min(d,e,f),i=g+h,j=g-h;return 0===j?(b=0,c=0):(c=1>i?j/i:j/(2-j),d===g?b=(e-f)/j:e===g?b=2+(f-d)/j:f===g&&(b=4+(d-e)/j),0>b?b+=6:b>=6&&(b-=6)),[b/6,c,i/2,a[3]];},b.exports=d.ColorConversion;},{\"../core/core\":49}],42:[function(a,b,c){\"use strict\";var d=a(\"../core/core\"),e=a(\"../core/constants\");a(\"./p5.Color\"),d.prototype.alpha=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getAlpha();throw new Error(\"Needs p5.Color or pixel array as argument.\");},d.prototype.blue=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getBlue();throw new Error(\"Needs p5.Color or pixel array as argument.\");},d.prototype.brightness=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getBrightness();throw new Error(\"Needs p5.Color or pixel array as argument.\");},d.prototype.color=function(){return arguments[0]instanceof d.Color?arguments[0]:arguments[0]instanceof Array?this instanceof d.Renderer?new d.Color(this,arguments[0]):new d.Color(this._renderer,arguments[0]):this instanceof d.Renderer?new d.Color(this,arguments):new d.Color(this._renderer,arguments);},d.prototype.green=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getGreen();throw new Error(\"Needs p5.Color or pixel array as argument.\");},d.prototype.hue=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getHue();throw new Error(\"Needs p5.Color or pixel array as argument.\");},d.prototype.lerpColor=function(a,b,c){var d,f,g,h,i,j,k=this._renderer._colorMode,l=this._renderer._colorMaxes;if(k===e.RGB)i=a.levels.map(function(a){return a/255;}),j=b.levels.map(function(a){return a/255;});else if(k===e.HSB)a._getBrightness(),b._getBrightness(),i=a.hsba,j=b.hsba;else{if(k!==e.HSL)throw new Error(k+\"cannot be used for interpolation.\");a._getLightness(),b._getLightness(),i=a.hsla,j=b.hsla;}return c=Math.max(Math.min(c,1),0),d=this.lerp(i[0],j[0],c),f=this.lerp(i[1],j[1],c),g=this.lerp(i[2],j[2],c),h=this.lerp(i[3],j[3],c),d*=l[k][0],f*=l[k][1],g*=l[k][2],h*=l[k][3],this.color(d,f,g,h);},d.prototype.lightness=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getLightness();throw new Error(\"Needs p5.Color or pixel array as argument.\");},d.prototype.red=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getRed();throw new Error(\"Needs p5.Color or pixel array as argument.\");},d.prototype.saturation=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getSaturation();throw new Error(\"Needs p5.Color or pixel array as argument.\");},b.exports=d;},{\"../core/constants\":48,\"../core/core\":49,\"./p5.Color\":43}],43:[function(a,b,c){var d=a(\"../core/core\"),e=a(\"../core/constants\"),f=a(\"./color_conversion\");d.Color=function(a,b){if(this.mode=a._colorMode,this.maxes=a._colorMaxes,this.mode!==e.RGB&&this.mode!==e.HSL&&this.mode!==e.HSB)throw new Error(this.mode+\" is an invalid colorMode.\");return this._array=d.Color._parseInputs.apply(a,b),this.levels=this._array.map(function(a){return Math.round(255*a);}),this;},d.Color.prototype.toString=function(){var a=this.levels;return a[3]=this._array[3],\"rgba(\"+a[0]+\",\"+a[1]+\",\"+a[2]+\",\"+a[3]+\")\";},d.Color.prototype._getAlpha=function(){return this._array[3]*this.maxes[this.mode][3];},d.Color.prototype._getBlue=function(){return this._array[2]*this.maxes[e.RGB][2];},d.Color.prototype._getBrightness=function(){return this.hsba||(this.hsba=f._rgbaToHSBA(this._array)),this.hsba[2]*this.maxes[e.HSB][2];},d.Color.prototype._getGreen=function(){return this._array[1]*this.maxes[e.RGB][1];},d.Color.prototype._getHue=function(){return this.mode===e.HSB?(this.hsba||(this.hsba=f._rgbaToHSBA(this._array)),this.hsba[0]*this.maxes[e.HSB][0]):(this.hsla||(this.hsla=f._rgbaToHSLA(this._array)),this.hsla[0]*this.maxes[e.HSL][0]);},d.Color.prototype._getLightness=function(){return this.hsla||(this.hsla=f._rgbaToHSLA(this._array)),this.hsla[2]*this.maxes[e.HSL][2];},d.Color.prototype._getRed=function(){return this._array[0]*this.maxes[e.RGB][0];},d.Color.prototype._getSaturation=function(){return this.mode===e.HSB?(this.hsba||(this.hsba=f._rgbaToHSBA(this._array)),this.hsba[1]*this.maxes[e.HSB][1]):(this.hsla||(this.hsla=f._rgbaToHSLA(this._array)),this.hsla[1]*this.maxes[e.HSL][1]);};var g={aliceblue:\"#f0f8ff\",antiquewhite:\"#faebd7\",aqua:\"#00ffff\",aquamarine:\"#7fffd4\",azure:\"#f0ffff\",beige:\"#f5f5dc\",bisque:\"#ffe4c4\",black:\"#000000\",blanchedalmond:\"#ffebcd\",blue:\"#0000ff\",blueviolet:\"#8a2be2\",brown:\"#a52a2a\",burlywood:\"#deb887\",cadetblue:\"#5f9ea0\",chartreuse:\"#7fff00\",chocolate:\"#d2691e\",coral:\"#ff7f50\",cornflowerblue:\"#6495ed\",cornsilk:\"#fff8dc\",crimson:\"#dc143c\",cyan:\"#00ffff\",darkblue:\"#00008b\",darkcyan:\"#008b8b\",darkgoldenrod:\"#b8860b\",darkgray:\"#a9a9a9\",darkgreen:\"#006400\",darkgrey:\"#a9a9a9\",darkkhaki:\"#bdb76b\",darkmagenta:\"#8b008b\",darkolivegreen:\"#556b2f\",darkorange:\"#ff8c00\",darkorchid:\"#9932cc\",darkred:\"#8b0000\",darksalmon:\"#e9967a\",darkseagreen:\"#8fbc8f\",darkslateblue:\"#483d8b\",darkslategray:\"#2f4f4f\",darkslategrey:\"#2f4f4f\",darkturquoise:\"#00ced1\",darkviolet:\"#9400d3\",deeppink:\"#ff1493\",deepskyblue:\"#00bfff\",dimgray:\"#696969\",dimgrey:\"#696969\",dodgerblue:\"#1e90ff\",firebrick:\"#b22222\",floralwhite:\"#fffaf0\",forestgreen:\"#228b22\",fuchsia:\"#ff00ff\",gainsboro:\"#dcdcdc\",ghostwhite:\"#f8f8ff\",gold:\"#ffd700\",goldenrod:\"#daa520\",gray:\"#808080\",green:\"#008000\",greenyellow:\"#adff2f\",grey:\"#808080\",honeydew:\"#f0fff0\",hotpink:\"#ff69b4\",indianred:\"#cd5c5c\",indigo:\"#4b0082\",ivory:\"#fffff0\",khaki:\"#f0e68c\",lavender:\"#e6e6fa\",lavenderblush:\"#fff0f5\",lawngreen:\"#7cfc00\",lemonchiffon:\"#fffacd\",lightblue:\"#add8e6\",lightcoral:\"#f08080\",lightcyan:\"#e0ffff\",lightgoldenrodyellow:\"#fafad2\",lightgray:\"#d3d3d3\",lightgreen:\"#90ee90\",lightgrey:\"#d3d3d3\",lightpink:\"#ffb6c1\",lightsalmon:\"#ffa07a\",lightseagreen:\"#20b2aa\",lightskyblue:\"#87cefa\",lightslategray:\"#778899\",lightslategrey:\"#778899\",lightsteelblue:\"#b0c4de\",lightyellow:\"#ffffe0\",lime:\"#00ff00\",limegreen:\"#32cd32\",linen:\"#faf0e6\",magenta:\"#ff00ff\",maroon:\"#800000\",mediumaquamarine:\"#66cdaa\",mediumblue:\"#0000cd\",mediumorchid:\"#ba55d3\",mediumpurple:\"#9370db\",mediumseagreen:\"#3cb371\",mediumslateblue:\"#7b68ee\",mediumspringgreen:\"#00fa9a\",mediumturquoise:\"#48d1cc\",mediumvioletred:\"#c71585\",midnightblue:\"#191970\",mintcream:\"#f5fffa\",mistyrose:\"#ffe4e1\",moccasin:\"#ffe4b5\",navajowhite:\"#ffdead\",navy:\"#000080\",oldlace:\"#fdf5e6\",olive:\"#808000\",olivedrab:\"#6b8e23\",orange:\"#ffa500\",orangered:\"#ff4500\",orchid:\"#da70d6\",palegoldenrod:\"#eee8aa\",palegreen:\"#98fb98\",paleturquoise:\"#afeeee\",palevioletred:\"#db7093\",papayawhip:\"#ffefd5\",peachpuff:\"#ffdab9\",peru:\"#cd853f\",pink:\"#ffc0cb\",plum:\"#dda0dd\",powderblue:\"#b0e0e6\",purple:\"#800080\",red:\"#ff0000\",rosybrown:\"#bc8f8f\",royalblue:\"#4169e1\",saddlebrown:\"#8b4513\",salmon:\"#fa8072\",sandybrown:\"#f4a460\",seagreen:\"#2e8b57\",seashell:\"#fff5ee\",sienna:\"#a0522d\",silver:\"#c0c0c0\",skyblue:\"#87ceeb\",slateblue:\"#6a5acd\",slategray:\"#708090\",slategrey:\"#708090\",snow:\"#fffafa\",springgreen:\"#00ff7f\",steelblue:\"#4682b4\",tan:\"#d2b48c\",teal:\"#008080\",thistle:\"#d8bfd8\",tomato:\"#ff6347\",turquoise:\"#40e0d0\",violet:\"#ee82ee\",wheat:\"#f5deb3\",white:\"#ffffff\",whitesmoke:\"#f5f5f5\",yellow:\"#ffff00\",yellowgreen:\"#9acd32\"},h=/\\s*/,i=/(\\d{1,3})/,j=/((?:\\d+(?:\\.\\d+)?)|(?:\\.\\d+))/,k=new RegExp(j.source+\"%\"),l={HEX3:/^#([a-f0-9])([a-f0-9])([a-f0-9])$/i,HEX6:/^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i,RGB:new RegExp([\"^rgb\\\\(\",i.source,\",\",i.source,\",\",i.source,\"\\\\)$\"].join(h.source),\"i\"),RGB_PERCENT:new RegExp([\"^rgb\\\\(\",k.source,\",\",k.source,\",\",k.source,\"\\\\)$\"].join(h.source),\"i\"),RGBA:new RegExp([\"^rgba\\\\(\",i.source,\",\",i.source,\",\",i.source,\",\",j.source,\"\\\\)$\"].join(h.source),\"i\"),RGBA_PERCENT:new RegExp([\"^rgba\\\\(\",k.source,\",\",k.source,\",\",k.source,\",\",j.source,\"\\\\)$\"].join(h.source),\"i\"),HSL:new RegExp([\"^hsl\\\\(\",i.source,\",\",k.source,\",\",k.source,\"\\\\)$\"].join(h.source),\"i\"),HSLA:new RegExp([\"^hsla\\\\(\",i.source,\",\",k.source,\",\",k.source,\",\",j.source,\"\\\\)$\"].join(h.source),\"i\"),HSB:new RegExp([\"^hsb\\\\(\",i.source,\",\",k.source,\",\",k.source,\"\\\\)$\"].join(h.source),\"i\"),HSBA:new RegExp([\"^hsba\\\\(\",i.source,\",\",k.source,\",\",k.source,\",\",j.source,\"\\\\)$\"].join(h.source),\"i\")};d.Color._parseInputs=function(){var a=arguments.length,b=this._colorMode,c=this._colorMaxes,h=[];if(a>=3)return h[0]=arguments[0]/c[b][0],h[1]=arguments[1]/c[b][1],h[2]=arguments[2]/c[b][2],\"number\"==typeof arguments[3]?h[3]=arguments[3]/c[b][3]:h[3]=1,h=h.map(function(a){return Math.max(Math.min(a,1),0);}),b===e.HSL?f._hslaToRGBA(h):b===e.HSB?f._hsbaToRGBA(h):h;if(1===a&&\"string\"==typeof arguments[0]){var i=arguments[0].trim().toLowerCase();if(g[i])return d.Color._parseInputs.apply(this,[g[i]]);if(l.HEX3.test(i))return h=l.HEX3.exec(i).slice(1).map(function(a){return parseInt(a+a,16)/255;}),h[3]=1,h;if(l.HEX6.test(i))return h=l.HEX6.exec(i).slice(1).map(function(a){return parseInt(a,16)/255;}),h[3]=1,h;if(l.RGB.test(i))return h=l.RGB.exec(i).slice(1).map(function(a){return a/255;}),h[3]=1,h;if(l.RGB_PERCENT.test(i))return h=l.RGB_PERCENT.exec(i).slice(1).map(function(a){return parseFloat(a)/100;}),h[3]=1,h;if(l.RGBA.test(i))return h=l.RGBA.exec(i).slice(1).map(function(a,b){return 3===b?parseFloat(a):a/255;});if(l.RGBA_PERCENT.test(i))return h=l.RGBA_PERCENT.exec(i).slice(1).map(function(a,b){return 3===b?parseFloat(a):parseFloat(a)/100;});if(l.HSL.test(i)?(h=l.HSL.exec(i).slice(1).map(function(a,b){return 0===b?parseInt(a,10)/360:parseInt(a,10)/100;}),h[3]=1):l.HSLA.test(i)&&(h=l.HSLA.exec(i).slice(1).map(function(a,b){return 0===b?parseInt(a,10)/360:3===b?parseFloat(a):parseInt(a,10)/100;})),h.length)return f._hslaToRGBA(h);if(l.HSB.test(i)?(h=l.HSB.exec(i).slice(1).map(function(a,b){return 0===b?parseInt(a,10)/360:parseInt(a,10)/100;}),h[3]=1):l.HSBA.test(i)&&(h=l.HSBA.exec(i).slice(1).map(function(a,b){return 0===b?parseInt(a,10)/360:3===b?parseFloat(a):parseInt(a,10)/100;})),h.length)return f._hsbaToRGBA(h);h=[1,1,1,1];}else{if(1!==a&&2!==a||\"number\"!=typeof arguments[0])throw new Error(arguments+\"is not a valid color representation.\");h[0]=arguments[0]/c[b][2],h[1]=arguments[0]/c[b][2],h[2]=arguments[0]/c[b][2],\"number\"==typeof arguments[1]?h[3]=arguments[1]/c[b][3]:h[3]=1,h=h.map(function(a){return Math.max(Math.min(a,1),0);});}return h;},b.exports=d.Color;},{\"../core/constants\":48,\"../core/core\":49,\"./color_conversion\":41}],44:[function(a,b,c){\"use strict\";var d=a(\"../core/core\"),e=a(\"../core/constants\");a(\"./p5.Color\"),d.prototype.background=function(){return arguments[0]instanceof d.Image?this.image(arguments[0],0,0,this.width,this.height):this._renderer.background.apply(this._renderer,arguments),this;},d.prototype.clear=function(){return this._renderer.clear(),this;},d.prototype.colorMode=function(){if(arguments[0]===e.RGB||arguments[0]===e.HSB||arguments[0]===e.HSL){this._renderer._colorMode=arguments[0];var a=this._renderer._colorMaxes[this._renderer._colorMode];2===arguments.length?(a[0]=arguments[1],a[1]=arguments[1],a[2]=arguments[1],a[3]=arguments[1]):4===arguments.length?(a[0]=arguments[1],a[1]=arguments[2],a[2]=arguments[3]):5===arguments.length&&(a[0]=arguments[1],a[1]=arguments[2],a[2]=arguments[3],a[3]=arguments[4]);}return this;},d.prototype.fill=function(){return this._renderer._setProperty(\"_fillSet\",!0),this._renderer._setProperty(\"_doFill\",!0),this._renderer.fill.apply(this._renderer,arguments),this;},d.prototype.noFill=function(){return this._renderer._setProperty(\"_doFill\",!1),this;},d.prototype.noStroke=function(){return this._renderer._setProperty(\"_doStroke\",!1),this;},d.prototype.stroke=function(){return this._renderer._setProperty(\"_strokeSet\",!0),this._renderer._setProperty(\"_doStroke\",!0),this._renderer.stroke.apply(this._renderer,arguments),this;},b.exports=d;},{\"../core/constants\":48,\"../core/core\":49,\"./p5.Color\":43}],45:[function(a,b,c){\"use strict\";var d=a(\"./core\"),e=a(\"./constants\");a(\"./error_helpers\"),d.prototype.arc=function(a,b,c,d,f,g,h){for(var i=new Array(arguments.length),j=0;j<i.length;++j){i[j]=arguments[j];}if(!this._renderer._doStroke&&!this._renderer._doFill)return this;for(this._angleMode===e.DEGREES&&(f=this.radians(f),g=this.radians(g));0>f;){f+=e.TWO_PI;}for(;0>g;){g+=e.TWO_PI;}return f%=e.TWO_PI,g%=e.TWO_PI,g===f&&(g+=e.TWO_PI),f=f<=e.HALF_PI?Math.atan(c/d*Math.tan(f)):f>e.HALF_PI&&f<=3*e.HALF_PI?Math.atan(c/d*Math.tan(f))+e.PI:Math.atan(c/d*Math.tan(f))+e.TWO_PI,g=g<=e.HALF_PI?Math.atan(c/d*Math.tan(g)):g>e.HALF_PI&&g<=3*e.HALF_PI?Math.atan(c/d*Math.tan(g))+e.PI:Math.atan(c/d*Math.tan(g))+e.TWO_PI,f>g&&(g+=e.TWO_PI),c=Math.abs(c),d=Math.abs(d),this._renderer.arc(a,b,c,d,f,g,h),this;},d.prototype.ellipse=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}return this._renderer.isP3D?(a[3]<0&&(a[3]=Math.abs(a[3])),a[4]<0&&(a[4]=Math.abs(a[4]))):(a[2]<0&&(a[2]=Math.abs(a[2])),a[3]<0&&(a[3]=Math.abs(a[3]))),this._renderer._doStroke||this._renderer._doFill?(this._renderer.isP3D?this._renderer.ellipse(a):this._renderer.ellipse(a[0],a[1],a[2],a[3]),this):this;},d.prototype.line=function(){if(!this._renderer._doStroke)return this;for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}return this._renderer.isP3D?this._renderer.line(a[0],a[1],a[2],a[3],a[4],a[5]):this._renderer.line(a[0],a[1],a[2],a[3]),this;},d.prototype.point=function(){if(!this._renderer._doStroke)return this;for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}return this._renderer.isP3D?this._renderer.point(a[0],a[1],a[2]):this._renderer.point(a[0],a[1]),this;},d.prototype.quad=function(){if(!this._renderer._doStroke&&!this._renderer._doFill)return this;for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}return this._renderer.isP3D?this._renderer.quad(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11]):this._renderer.quad(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]),this;},d.prototype.rect=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}return this._renderer.isP3D?(a[3]<0&&(a[3]=Math.abs(a[3])),a[4]<0&&(a[4]=Math.abs(a[4]))):(a[2]<0&&(a[2]=Math.abs(a[2])),a[3]<0&&(a[3]=Math.abs(a[3]))),this._renderer._doStroke||this._renderer._doFill?(this._renderer.rect(a),this):void 0;},d.prototype.triangle=function(){if(!this._renderer._doStroke&&!this._renderer._doFill)return this;for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}return this._renderer.isP3D?this._renderer.triangle(a):this._renderer.triangle(a[0],a[1],a[2],a[3],a[4],a[5]),this;},b.exports=d;},{\"./constants\":48,\"./core\":49,\"./error_helpers\":52}],46:[function(a,b,c){\"use strict\";var d=a(\"./core\"),e=a(\"./constants\");d.prototype.ellipseMode=function(a){return(a===e.CORNER||a===e.CORNERS||a===e.RADIUS||a===e.CENTER)&&(this._renderer._ellipseMode=a),this;},d.prototype.noSmooth=function(){return this._renderer.noSmooth(),this;},d.prototype.rectMode=function(a){return(a===e.CORNER||a===e.CORNERS||a===e.RADIUS||a===e.CENTER)&&(this._renderer._rectMode=a),this;},d.prototype.smooth=function(){return this._renderer.smooth(),this;},d.prototype.strokeCap=function(a){return(a===e.ROUND||a===e.SQUARE||a===e.PROJECT)&&this._renderer.strokeCap(a),this;},d.prototype.strokeJoin=function(a){return(a===e.ROUND||a===e.BEVEL||a===e.MITER)&&this._renderer.strokeJoin(a),this;},d.prototype.strokeWeight=function(a){return this._renderer.strokeWeight(a),this;},b.exports=d;},{\"./constants\":48,\"./core\":49}],47:[function(a,b,c){var d=a(\"./constants\");b.exports={modeAdjust:function modeAdjust(a,b,c,e,f){return f===d.CORNER?{x:a,y:b,w:c,h:e}:f===d.CORNERS?{x:a,y:b,w:c-a,h:e-b}:f===d.RADIUS?{x:a-c,y:b-e,w:2*c,h:2*e}:f===d.CENTER?{x:a-.5*c,y:b-.5*e,w:c,h:e}:void 0;},arcModeAdjust:function arcModeAdjust(a,b,c,e,f){return f===d.CORNER?{x:a+.5*c,y:b+.5*e,w:c,h:e}:f===d.CORNERS?{x:a,y:b,w:c+a,h:e+b}:f===d.RADIUS?{x:a,y:b,w:2*c,h:2*e}:f===d.CENTER?{x:a,y:b,w:c,h:e}:void 0;}};},{\"./constants\":48}],48:[function(a,b,c){var d=Math.PI;b.exports={P2D:\"p2d\",WEBGL:\"webgl\",ARROW:\"default\",CROSS:\"crosshair\",HAND:\"pointer\",MOVE:\"move\",TEXT:\"text\",WAIT:\"wait\",HALF_PI:d/2,PI:d,QUARTER_PI:d/4,TAU:2*d,TWO_PI:2*d,DEGREES:\"degrees\",RADIANS:\"radians\",CORNER:\"corner\",CORNERS:\"corners\",RADIUS:\"radius\",RIGHT:\"right\",LEFT:\"left\",CENTER:\"center\",TOP:\"top\",BOTTOM:\"bottom\",BASELINE:\"alphabetic\",POINTS:0,LINES:1,LINE_STRIP:3,LINE_LOOP:2,TRIANGLES:4,TRIANGLE_FAN:6,TRIANGLE_STRIP:5,QUADS:\"quads\",QUAD_STRIP:\"quad_strip\",CLOSE:\"close\",OPEN:\"open\",CHORD:\"chord\",PIE:\"pie\",PROJECT:\"square\",SQUARE:\"butt\",ROUND:\"round\",BEVEL:\"bevel\",MITER:\"miter\",RGB:\"rgb\",HSB:\"hsb\",HSL:\"hsl\",AUTO:\"auto\",ALT:18,BACKSPACE:8,CONTROL:17,DELETE:46,DOWN_ARROW:40,ENTER:13,ESCAPE:27,LEFT_ARROW:37,OPTION:18,RETURN:13,RIGHT_ARROW:39,SHIFT:16,TAB:9,UP_ARROW:38,BLEND:\"normal\",ADD:\"lighter\",DARKEST:\"darken\",LIGHTEST:\"lighten\",DIFFERENCE:\"difference\",EXCLUSION:\"exclusion\",MULTIPLY:\"multiply\",SCREEN:\"screen\",REPLACE:\"source-over\",OVERLAY:\"overlay\",HARD_LIGHT:\"hard-light\",SOFT_LIGHT:\"soft-light\",DODGE:\"color-dodge\",BURN:\"color-burn\",THRESHOLD:\"threshold\",GRAY:\"gray\",OPAQUE:\"opaque\",INVERT:\"invert\",POSTERIZE:\"posterize\",DILATE:\"dilate\",ERODE:\"erode\",BLUR:\"blur\",NORMAL:\"normal\",ITALIC:\"italic\",BOLD:\"bold\",_DEFAULT_TEXT_FILL:\"#000000\",_DEFAULT_LEADMULT:1.25,_CTX_MIDDLE:\"middle\",LINEAR:\"linear\",QUADRATIC:\"quadratic\",BEZIER:\"bezier\",CURVE:\"curve\",_DEFAULT_STROKE:\"#000000\",_DEFAULT_FILL:\"#FFFFFF\"};},{}],49:[function(a,b,c){\"use strict\";a(\"./shim\");var d=a(\"./constants\"),e=function e(a,b,c){2===arguments.length&&\"boolean\"==typeof b&&(c=b,b=void 0),this._setupDone=!1,this._pixelDensity=Math.ceil(window.devicePixelRatio)||1,this._userNode=b,this._curElement=null,this._elements=[],this._requestAnimId=0,this._preloadCount=0,this._isGlobal=!1,this._loop=!0,this._styles=[],this._defaultCanvasSize={width:100,height:100},this._events={mousemove:null,mousedown:null,mouseup:null,dragend:null,dragover:null,click:null,mouseover:null,mouseout:null,keydown:null,keyup:null,keypress:null,touchstart:null,touchmove:null,touchend:null,resize:null,blur:null},this._events.wheel=null,this._loadingScreenId=\"p5_loading\",window.DeviceOrientationEvent&&(this._events.deviceorientation=null),window.DeviceMotionEvent&&!window._isNodeWebkit&&(this._events.devicemotion=null),this._start=function(){this._userNode&&\"string\"==typeof this._userNode&&(this._userNode=document.getElementById(this._userNode)),this.createCanvas(this._defaultCanvasSize.width,this._defaultCanvasSize.height,\"p2d\",!0);var a=this.preload||window.preload;if(a){var b=document.getElementById(this._loadingScreenId);if(!b){b=document.createElement(\"div\"),b.innerHTML=\"Loading...\",b.style.position=\"absolute\",b.id=this._loadingScreenId;var c=this._userNode||document.body;c.appendChild(b);}for(var d in this._preloadMethods){this._preloadMethods[d]=this._preloadMethods[d]||e;var f=this._preloadMethods[d];(f===e.prototype||f===e)&&(f=this._isGlobal?window:this),this._registeredPreloadMethods[d]=f[d],f[d]=this._wrapPreload(f,d);}a(),this._runIfPreloadsAreDone();}else this._setup(),this._runFrames(),this._draw();}.bind(this),this._runIfPreloadsAreDone=function(){var a=this._isGlobal?window:this;if(0===a._preloadCount){var b=document.getElementById(a._loadingScreenId);b&&b.parentNode.removeChild(b),a._setup(),a._runFrames(),a._draw();}},this._decrementPreload=function(){var a=this._isGlobal?window:this;a._setProperty(\"_preloadCount\",a._preloadCount-1),a._runIfPreloadsAreDone();},this._wrapPreload=function(a,b){return function(){this._incrementPreload();var c=Array.prototype.slice.call(arguments);return c.push(this._decrementPreload.bind(this)),this._registeredPreloadMethods[b].apply(a,c);}.bind(this);},this._incrementPreload=function(){var a=this._isGlobal?window:this;a._setProperty(\"_preloadCount\",a._preloadCount+1);},this._setup=function(){var a=this._isGlobal?window:this;if(\"function\"==typeof a.preload)for(var b in this._preloadMethods){a[b]=this._preloadMethods[b][b],a[b]&&this&&(a[b]=a[b].bind(this));}\"function\"==typeof a.setup&&a.setup();for(var c=document.getElementsByTagName(\"canvas\"),d=0;d<c.length;d++){var e=c[d];\"true\"===e.dataset.hidden&&(e.style.visibility=\"\",delete e.dataset.hidden);}this._setupDone=!0;}.bind(this),this._draw=function(){var a=window.performance.now(),b=a-this._lastFrameTime,c=1e3/this._targetFrameRate,d=5;(!this._loop||b>=c-d)&&(this._renderer.isP3D&&this._renderer._update(),this._setProperty(\"frameCount\",this.frameCount+1),this._updateMouseCoords(),this._updateTouchCoords(),this.redraw(),this._frameRate=1e3/(a-this._lastFrameTime),this._lastFrameTime=a),this._loop&&(this._requestAnimId=window.requestAnimationFrame(this._draw));}.bind(this),this._runFrames=function(){this._updateInterval&&clearInterval(this._updateInterval);}.bind(this),this._setProperty=function(a,b){this[a]=b,this._isGlobal&&(window[a]=b);}.bind(this),this.remove=function(){if(this._curElement){this._loop=!1,this._requestAnimId&&window.cancelAnimationFrame(this._requestAnimId);for(var a in this._events){window.removeEventListener(a,this._events[a]);}for(var b=0;b<this._elements.length;b++){var c=this._elements[b];c.elt.parentNode&&c.elt.parentNode.removeChild(c.elt);for(var d in c._events){c.elt.removeEventListener(d,c._events[d]);}}var f=this;if(this._registeredMethods.remove.forEach(function(a){\"undefined\"!=typeof a&&a.call(f);}),this._isGlobal){for(var g in e.prototype){try{delete window[g];}catch(h){window[g]=void 0;}}for(var i in this){if(this.hasOwnProperty(i))try{delete window[i];}catch(h){window[i]=void 0;}}}}}.bind(this),this._registeredMethods.init.forEach(function(a){\"undefined\"!=typeof a&&a.call(this);},this);var d=this._createFriendlyGlobalFunctionBinder();if(a)a(this);else{this._isGlobal=!0;for(var f in e.prototype){if(\"function\"==typeof e.prototype[f]){var g=f.substring(2);this._events.hasOwnProperty(g)||d(f,e.prototype[f].bind(this));}else d(f,e.prototype[f]);}for(var h in this){this.hasOwnProperty(h)&&d(h,this[h]);}}for(var i in this._events){var j=this[\"_on\"+i];if(j){var k=j.bind(this);window.addEventListener(i,k),this._events[i]=k;}}var l=function(){this._setProperty(\"focused\",!0);}.bind(this),m=function(){this._setProperty(\"focused\",!1);}.bind(this);window.addEventListener(\"focus\",l),window.addEventListener(\"blur\",m),this.registerMethod(\"remove\",function(){window.removeEventListener(\"focus\",l),window.removeEventListener(\"blur\",m);}),c?this._start():\"complete\"===document.readyState?this._start():window.addEventListener(\"load\",this._start.bind(this),!1);};for(var f in d){e.prototype[f]=d[f];}e.prototype._preloadMethods={loadJSON:e.prototype,loadImage:e.prototype,loadStrings:e.prototype,loadXML:e.prototype,loadShape:e.prototype,loadTable:e.prototype,loadFont:e.prototype},e.prototype._registeredMethods={init:[],pre:[],post:[],remove:[]},e.prototype._registeredPreloadMethods={},e.prototype.registerPreloadMethod=function(a,b){e.prototype._preloadMethods.hasOwnProperty(a)||(e.prototype._preloadMethods[a]=b);},e.prototype.registerMethod=function(a,b){e.prototype._registeredMethods.hasOwnProperty(a)||(e.prototype._registeredMethods[a]=[]),e.prototype._registeredMethods[a].push(b);},e.prototype._createFriendlyGlobalFunctionBinder=function(a){a=a||{};var b=a.globalObject||window;a.log||console.log.bind(console);return function(a,c){b[a]=c;};},b.exports=e;},{\"./constants\":48,\"./shim\":58}],50:[function(a,b,c){\"use strict\";var d=a(\"./core\");a(\"./error_helpers\");var e=20,f=20;d.prototype.bezier=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}return this._renderer.isP3D?this._validateParameters(\"bezier\",a,[\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\"]):this._validateParameters(\"bezier\",a,[\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\"]),this._renderer._doStroke?(this._renderer.isP3D?(a.push(e),this._renderer.bezier(a)):this._renderer.bezier(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]),this):this;},d.prototype.bezierDetail=function(a){return e=a,this;},d.prototype.bezierPoint=function(a,b,c,d,e){var f=1-e;return Math.pow(f,3)*a+3*Math.pow(f,2)*e*b+3*f*Math.pow(e,2)*c+Math.pow(e,3)*d;},d.prototype.bezierTangent=function(a,b,c,d,e){var f=1-e;return 3*d*Math.pow(e,2)-3*c*Math.pow(e,2)+6*c*f*e-6*b*f*e+3*b*Math.pow(f,2)-3*a*Math.pow(f,2);},d.prototype.curve=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}return this._renderer.isP3D?this._validateParameters(\"curve\",a,[\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\"]):this._validateParameters(\"curve\",a,[\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\",\"Number\"]),this._renderer._doStroke?(this._renderer.isP3D?(a.push(f),this._renderer.curve(a)):this._renderer.curve(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]),this):this;},d.prototype.curveDetail=function(a){return f=a,this;},d.prototype.curveTightness=function(a){this._renderer._curveTightness=a;},d.prototype.curvePoint=function(a,b,c,d,e){var f=e*e*e,g=e*e,h=-.5*f+g-.5*e,i=1.5*f-2.5*g+1,j=-1.5*f+2*g+.5*e,k=.5*f-.5*g;return a*h+b*i+c*j+d*k;},d.prototype.curveTangent=function(a,b,c,d,e){var f=e*e,g=-3*f/2+2*e-.5,h=9*f/2-5*e,i=-9*f/2+4*e+.5,j=3*f/2-e;return a*g+b*h+c*i+d*j;},b.exports=d;},{\"./core\":49,\"./error_helpers\":52}],51:[function(a,b,c){\"use strict\";function d(a){var b=document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled;if(!b)throw new Error(\"Fullscreen not enabled in this browser.\");a.requestFullscreen?a.requestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.webkitRequestFullscreen?a.webkitRequestFullscreen():a.msRequestFullscreen&&a.msRequestFullscreen();}function e(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen();}var f=a(\"./core\"),g=a(\"./constants\"),h=[g.ARROW,g.CROSS,g.HAND,g.MOVE,g.TEXT,g.WAIT];f.prototype._frameRate=0,f.prototype._lastFrameTime=window.performance.now(),f.prototype._targetFrameRate=60,window.console&&console.log?f.prototype.print=function(a){try{var b=JSON.parse(JSON.stringify(a));console.log(b);}catch(c){console.log(a);}}:f.prototype.print=function(){},f.prototype.println=f.prototype.print,f.prototype.frameCount=0,f.prototype.focused=document.hasFocus(),f.prototype.cursor=function(a,b,c){var d=\"auto\",e=this._curElement.elt;if(h.indexOf(a)>-1)d=a;else if(\"string\"==typeof a){var f=\"\";b&&c&&\"number\"==typeof b&&\"number\"==typeof c&&(f=b+\" \"+c),d=\"http://\"!==a.substring(0,6)?\"url(\"+a+\") \"+f+\", auto\":/\\.(cur|jpg|jpeg|gif|png|CUR|JPG|JPEG|GIF|PNG)$/.test(a)?\"url(\"+a+\") \"+f+\", auto\":a;}e.style.cursor=d;},f.prototype.frameRate=function(a){return\"number\"!=typeof a||0>=a?this._frameRate:(this._setProperty(\"_targetFrameRate\",a),this._runFrames(),this);},f.prototype.getFrameRate=function(){return this.frameRate();},f.prototype.setFrameRate=function(a){return this.frameRate(a);},f.prototype.noCursor=function(){this._curElement.elt.style.cursor=\"none\";},f.prototype.displayWidth=screen.width,f.prototype.displayHeight=screen.height,f.prototype.windowWidth=window.innerWidth,f.prototype.windowHeight=window.innerHeight,f.prototype._onresize=function(a){this._setProperty(\"windowWidth\",window.innerWidth),this._setProperty(\"windowHeight\",window.innerHeight);var b,c=this._isGlobal?window:this;\"function\"==typeof c.windowResized&&(b=c.windowResized(a),void 0===b||b||a.preventDefault());},f.prototype.width=0,f.prototype.height=0,f.prototype.fullscreen=function(a){return\"undefined\"==typeof a?document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement:void(a?d(document.documentElement):e());},f.prototype.pixelDensity=function(a){return\"number\"!=typeof a?this._pixelDensity:(this._pixelDensity=a,void this.resizeCanvas(this.width,this.height,!0));},f.prototype.displayDensity=function(){return window.devicePixelRatio;},f.prototype.getURL=function(){return location.href;},f.prototype.getURLPath=function(){return location.pathname.split(\"/\").filter(function(a){return\"\"!==a;});},f.prototype.getURLParams=function(){for(var a,b=/[?&]([^&=]+)(?:[&=])([^&=]+)/gim,c={};null!=(a=b.exec(location.search));){a.index===b.lastIndex&&b.lastIndex++,c[a[1]]=a[2];}return c;},b.exports=f;},{\"./constants\":48,\"./core\":49}],52:[function(a,b,c){\"use strict\";function d(a,b,c){if(a.match(/^p5\\./)){var d=a.split(\".\");return c instanceof i[d[1]];}return\"Boolean\"===a||a.toLowerCase()===b||r.indexOf(a)>-1&&q(c);}function e(a,b,c){j&&(f(),j=!1),\"undefined\"===o(c)?c=\"#B40033\":\"number\"===o(c)&&(c=w[c]);}function f(){var a=\"transparent\",b=\"#ED225D\",c=\"#ED225D\",d=\"white\";console.log(\"%c    _ \\n /\\\\| |/\\\\ \\n \\\\ ` ' /  \\n / , . \\\\  \\n \\\\/|_|\\\\/ \\n\\n%c> p5.js says: Welcome! This is your friendly debugger. To turn me off switch to using “p5.min.js”.\",\"background-color:\"+a+\";color:\"+b+\";\",\"background-color:\"+c+\";color:\"+d+\";\");}function g(){var b={},c=function c(a){return Object.getOwnPropertyNames(a).filter(function(a){return\"_\"===a[0]?!1:a in b?!1:(b[a]=!0,!0);}).map(function(b){var c;return c=\"function\"==typeof a[b]?\"function\":b===b.toUpperCase()?\"constant\":\"variable\",{name:b,type:c};});};y=[].concat(c(i.prototype),c(a(\"./constants\"))),y.sort(function(a,b){return b.name.length-a.name.length;});}function h(a,b){b||(b=console.log.bind(console)),y||g(),y.some(function(c){return a.message&&-1!==a.message.indexOf(c.name)?(b(\"%cDid you just try to use p5.js's \"+c.name+(\"function\"===c.type?\"() \":\" \")+c.type+\"? If so, you may want to move it into your sketch's setup() function.\\n\\nFor more details, see: \"+z,\"color: #B40033\"),!0):void 0;});}for(var i=a(\"./core\"),j=!1,k={},l=k.toString,m=[\"Boolean\",\"Number\",\"String\",\"Function\",\"Array\",\"Date\",\"RegExp\",\"Object\",\"Error\"],n=0;n<m.length;n++){k[\"[object \"+m[n]+\"]\"]=m[n].toLowerCase();}var o=function o(a){return null==a?a+\"\":\"object\"==(typeof a===\"undefined\"?\"undefined\":_typeof(a))||\"function\"==typeof a?k[l.call(a)]||\"object\":typeof a===\"undefined\"?\"undefined\":_typeof(a);},p=Array.isArray||function(a){return\"array\"===o(a);},q=function q(a){return!p(a)&&a-parseFloat(a)+1>=0;},r=[\"Number\",\"Integer\",\"Number/Constant\"],s=0,t=1,u=2,v=3,w=[\"#2D7BB6\",\"#EE9900\",\"#4DB200\",\"#C83C00\"];i.prototype._validateParameters=function(a,b,c){p(c[0])||(c=[c]);for(var f,g=Math.abs(b.length-c[0].length),h=0,i=1,j=c.length;j>i;i++){var k=Math.abs(b.length-c[i].length);g>=k&&(h=i,g=k);}var l=\"X\";g>0&&(f=\"You wrote \"+a+\"(\",b.length>0&&(f+=l+Array(b.length).join(\",\"+l)),f+=\"). \"+a+\" was expecting \"+c[h].length+\" parameters. Try \"+a+\"(\",c[h].length>0&&(f+=l+Array(c[h].length).join(\",\"+l)),f+=\").\",c.length>1&&(f+=\" \"+a+\" takes different numbers of parameters depending on what you want to do. Click this link to learn more: \"),e(f,a,s));for(var m=0;m<c.length;m++){for(var n=0;n<c[m].length&&n<b.length;n++){var q=c[m][n],r=o(b[n]);\"undefined\"===r||null===r?e(\"It looks like \"+a+\" received an empty variable in spot #\"+(n+1)+\". If not intentional, this is often a problem with scope: [link to scope].\",a,t):\"*\"===q||d(q,r,b[n])||(f=a+\" was expecting a \"+q.toLowerCase()+\" for parameter #\"+(n+1)+\", received \",f+=\"string\"===r?'\"'+b[n]+'\"':b[n],f+=\" instead.\",c.length>1&&(f+=\" \"+a+\" takes different numbers of parameters depending on what you want to do. Click this link to learn more:\"),e(f,a,u));}}},i.prototype._validateParameters=function(){return!0;};var x={0:{fileType:\"image\",method:\"loadImage\",message:\" hosting the image online,\"},1:{fileType:\"XML file\",method:\"loadXML\"},2:{fileType:\"table file\",method:\"loadTable\"},3:{fileType:\"text file\",method:\"loadStrings\"}};i._friendlyFileLoadError=function(a,b){var c=x[a],d=\"It looks like there was a problem loading your \"+c.fileType+\". Try checking if the file path%c [\"+b+\"] %cis correct,\"+(c.message||\"\")+\" or running a local server.\";e(d,c.method,v);};var y=null,z=\"https://github.com/processing/p5.js/wiki/Frequently-Asked-Questions#why-cant-i-assign-variables-using-p5-functions-and-variables-before-setup\";i.prototype._helpForMisusedAtTopLevelCode=h,\"complete\"!==document.readyState&&(window.addEventListener(\"error\",h,!1),window.addEventListener(\"load\",function(){window.removeEventListener(\"error\",h,!1);})),b.exports=i;},{\"./constants\":48,\"./core\":49}],53:[function(a,b,c){function d(a,b,c){var d=b.bind(c);c.elt.addEventListener(a,d,!1),c._events[a]=d;}var e=a(\"./core\");e.Element=function(a,b){this.elt=a,this._pInst=b,this._events={},this.width=this.elt.offsetWidth,this.height=this.elt.offsetHeight;},e.Element.prototype.parent=function(a){return 0===arguments.length?this.elt.parentNode:(\"string\"==typeof a?(\"#\"===a[0]&&(a=a.substring(1)),a=document.getElementById(a)):a instanceof e.Element&&(a=a.elt),a.appendChild(this.elt),this);},e.Element.prototype.id=function(a){return 0===arguments.length?this.elt.id:(this.elt.id=a,this.width=this.elt.offsetWidth,this.height=this.elt.offsetHeight,this);},e.Element.prototype[\"class\"]=function(a){return 0===arguments.length?this.elt.className:(this.elt.className=a,this);},e.Element.prototype.mousePressed=function(a){return d(\"mousedown\",a,this),d(\"touchstart\",a,this),this;},e.Element.prototype.mouseWheel=function(a){return d(\"wheel\",a,this),this;},e.Element.prototype.mouseReleased=function(a){return d(\"mouseup\",a,this),d(\"touchend\",a,this),this;},e.Element.prototype.mouseClicked=function(a){return d(\"click\",a,this),this;},e.Element.prototype.mouseMoved=function(a){return d(\"mousemove\",a,this),d(\"touchmove\",a,this),this;},e.Element.prototype.mouseOver=function(a){return d(\"mouseover\",a,this),this;},e.Element.prototype.changed=function(a){return d(\"change\",a,this),this;},e.Element.prototype.input=function(a){return d(\"input\",a,this),this;},e.Element.prototype.mouseOut=function(a){return d(\"mouseout\",a,this),this;},e.Element.prototype.touchStarted=function(a){return d(\"touchstart\",a,this),d(\"mousedown\",a,this),this;},e.Element.prototype.touchMoved=function(a){return d(\"touchmove\",a,this),d(\"mousemove\",a,this),this;},e.Element.prototype.touchEnded=function(a){return d(\"touchend\",a,this),d(\"mouseup\",a,this),this;},e.Element.prototype.dragOver=function(a){return d(\"dragover\",a,this),this;},e.Element.prototype.dragLeave=function(a){return d(\"dragleave\",a,this),this;},e.Element.prototype.drop=function(a,b){function c(b){var c=new e.File(b);return function(b){c.data=b.target.result,a(c);};}return window.File&&window.FileReader&&window.FileList&&window.Blob?(d(\"dragover\",function(a){a.stopPropagation(),a.preventDefault();},this),d(\"dragleave\",function(a){a.stopPropagation(),a.preventDefault();},this),arguments.length>1&&d(\"drop\",b,this),d(\"drop\",function(a){a.stopPropagation(),a.preventDefault();for(var b=a.dataTransfer.files,d=0;d<b.length;d++){var e=b[d],f=new FileReader();f.onload=c(e),e.type.indexOf(\"text\")>-1?f.readAsText(e):f.readAsDataURL(e);}},this)):console.log(\"The File APIs are not fully supported in this browser.\"),this;},e.Element.prototype._setProperty=function(a,b){this[a]=b;},b.exports=e.Element;},{\"./core\":49}],54:[function(a,b,c){var d=a(\"./core\"),e=a(\"./constants\");d.Graphics=function(a,b,c,f){var g=c||e.P2D,h=document.createElement(\"canvas\"),i=this._userNode||document.body;i.appendChild(h),d.Element.call(this,h,f,!1),this._styles=[],this.width=a,this.height=b,this._pixelDensity=f._pixelDensity,g===e.WEBGL?this._renderer=new d.Renderer3D(h,this,!1):this._renderer=new d.Renderer2D(h,this,!1),this._renderer.resize(a,b),this._renderer._applyDefaults(),f._elements.push(this);for(var j in d.prototype){this[j]||(\"function\"==typeof d.prototype[j]?this[j]=d.prototype[j].bind(this):this[j]=d.prototype[j]);}return this;},d.Graphics.prototype=Object.create(d.Element.prototype),b.exports=d.Graphics;},{\"./constants\":48,\"./core\":49}],55:[function(a,b,c){function d(a){var b=0,c=0;if(a.offsetParent){do{b+=a.offsetLeft,c+=a.offsetTop;}while(a=a.offsetParent);}else b+=a.offsetLeft,c+=a.offsetTop;return[b,c];}var e=a(\"./core\"),f=a(\"../core/constants\");e.Renderer=function(a,b,c){e.Element.call(this,a,b),this.canvas=a,this._pInst=b,c?(this._isMainCanvas=!0,this._pInst._setProperty(\"_curElement\",this),this._pInst._setProperty(\"canvas\",this.canvas),this._pInst._setProperty(\"width\",this.width),this._pInst._setProperty(\"height\",this.height)):(this.canvas.style.display=\"none\",this._styles=[]),this._textSize=12,this._textLeading=15,this._textFont=\"sans-serif\",this._textStyle=f.NORMAL,this._textAscent=null,this._textDescent=null,this._rectMode=f.CORNER,this._ellipseMode=f.CENTER,this._curveTightness=0,this._imageMode=f.CORNER,this._tint=null,this._doStroke=!0,this._doFill=!0,this._strokeSet=!1,this._fillSet=!1,this._colorMode=f.RGB,this._colorMaxes={rgb:[255,255,255,255],hsb:[360,100,100,1],hsl:[360,100,100,1]};},e.Renderer.prototype=Object.create(e.Element.prototype),e.Renderer.prototype.resize=function(a,b){this.width=a,this.height=b,this.elt.width=a*this._pInst._pixelDensity,this.elt.height=b*this._pInst._pixelDensity,this.elt.style.width=a+\"px\",this.elt.style.height=b+\"px\",this._isMainCanvas&&(this._pInst._setProperty(\"width\",this.width),this._pInst._setProperty(\"height\",this.height));},e.Renderer.prototype.textLeading=function(a){return arguments.length&&arguments[0]?(this._setProperty(\"_textLeading\",a),this):this._textLeading;},e.Renderer.prototype.textSize=function(a){return arguments.length&&arguments[0]?(this._setProperty(\"_textSize\",a),this._setProperty(\"_textLeading\",a*f._DEFAULT_LEADMULT),this._applyTextProperties()):this._textSize;},e.Renderer.prototype.textStyle=function(a){return arguments.length&&arguments[0]?((a===f.NORMAL||a===f.ITALIC||a===f.BOLD)&&this._setProperty(\"_textStyle\",a),this._applyTextProperties()):this._textStyle;},e.Renderer.prototype.textAscent=function(){return null===this._textAscent&&this._updateTextMetrics(),this._textAscent;},e.Renderer.prototype.textDescent=function(){return null===this._textDescent&&this._updateTextMetrics(),this._textDescent;},e.Renderer.prototype._applyDefaults=function(){return this;},e.Renderer.prototype._isOpenType=function(a){return a=a||this._textFont,\"object\"==(typeof a===\"undefined\"?\"undefined\":_typeof(a))&&a.font&&a.font.supported;},e.Renderer.prototype._updateTextMetrics=function(){if(this._isOpenType())return this._setProperty(\"_textAscent\",this._textFont._textAscent()),this._setProperty(\"_textDescent\",this._textFont._textDescent()),this;var a=document.createElement(\"span\");a.style.fontFamily=this._textFont,a.style.fontSize=this._textSize+\"px\",a.innerHTML=\"ABCjgq|\";var b=document.createElement(\"div\");b.style.display=\"inline-block\",b.style.width=\"1px\",b.style.height=\"0px\";var c=document.createElement(\"div\");c.appendChild(a),c.appendChild(b),c.style.height=\"0px\",c.style.overflow=\"hidden\",document.body.appendChild(c),b.style.verticalAlign=\"baseline\";var e=d(b),f=d(a),g=e[1]-f[1];b.style.verticalAlign=\"bottom\",e=d(b),f=d(a);var h=e[1]-f[1],i=h-g;return document.body.removeChild(c),this._setProperty(\"_textAscent\",g),this._setProperty(\"_textDescent\",i),this;},b.exports=e.Renderer;},{\"../core/constants\":48,\"./core\":49}],56:[function(a,b,c){var d=a(\"./core\"),e=a(\"./canvas\"),f=a(\"./constants\"),g=a(\"../image/filters\");a(\"./p5.Renderer\");var h=\"rgba(0,0,0,0)\";d.Renderer2D=function(a,b,c){return d.Renderer.call(this,a,b,c),this.drawingContext=this.canvas.getContext(\"2d\"),this._pInst._setProperty(\"drawingContext\",this.drawingContext),this;},d.Renderer2D.prototype=Object.create(d.Renderer.prototype),d.Renderer2D.prototype._applyDefaults=function(){this.drawingContext.fillStyle=f._DEFAULT_FILL,this.drawingContext.strokeStyle=f._DEFAULT_STROKE,this.drawingContext.lineCap=f.ROUND,this.drawingContext.font=\"normal 12px sans-serif\";},d.Renderer2D.prototype.resize=function(a,b){d.Renderer.prototype.resize.call(this,a,b),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity);},d.Renderer2D.prototype.background=function(){if(this.drawingContext.save(),this.drawingContext.setTransform(1,0,0,1,0,0),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity),arguments[0]instanceof d.Image)this._pInst.image(arguments[0],0,0,this.width,this.height);else{var a=this.drawingContext.fillStyle,b=this._pInst.color.apply(this,arguments),c=b.toString();this.drawingContext.fillStyle=c,this.drawingContext.fillRect(0,0,this.width,this.height),this.drawingContext.fillStyle=a;}this.drawingContext.restore();},d.Renderer2D.prototype.clear=function(){this.drawingContext.clearRect(0,0,this.width,this.height);},d.Renderer2D.prototype.fill=function(){var a=this.drawingContext,b=this._pInst.color.apply(this,arguments);a.fillStyle=b.toString();},d.Renderer2D.prototype.stroke=function(){var a=this.drawingContext,b=this._pInst.color.apply(this,arguments);a.strokeStyle=b.toString();},d.Renderer2D.prototype.image=function(a,b,c,e,f,g,h,i,j){var k;try{this._tint&&(d.MediaElement&&a instanceof d.MediaElement&&a.loadPixels(),a.canvas&&(k=this._getTintedImageCanvas(a))),k||(k=a.canvas||a.elt),this.drawingContext.drawImage(k,b,c,e,f,g,h,i,j);}catch(l){if(\"NS_ERROR_NOT_AVAILABLE\"!==l.name)throw l;}},d.Renderer2D.prototype._getTintedImageCanvas=function(a){if(!a.canvas)return a;var b=g._toPixels(a.canvas),c=document.createElement(\"canvas\");c.width=a.canvas.width,c.height=a.canvas.height;for(var d=c.getContext(\"2d\"),e=d.createImageData(a.canvas.width,a.canvas.height),f=e.data,h=0;h<b.length;h+=4){var i=b[h],j=b[h+1],k=b[h+2],l=b[h+3];f[h]=i*this._tint[0]/255,f[h+1]=j*this._tint[1]/255,f[h+2]=k*this._tint[2]/255,f[h+3]=l*this._tint[3]/255;}return d.putImageData(e,0,0),c;},d.Renderer2D.prototype.blendMode=function(a){this.drawingContext.globalCompositeOperation=a;},d.Renderer2D.prototype.blend=function(){var a=this.drawingContext.globalCompositeOperation,b=arguments[arguments.length-1],c=Array.prototype.slice.call(arguments,0,arguments.length-1);this.drawingContext.globalCompositeOperation=b,this._pInst?this._pInst.copy.apply(this._pInst,c):this.copy.apply(this,c),this.drawingContext.globalCompositeOperation=a;},d.Renderer2D.prototype.copy=function(){var a,b,c,e,f,g,h,i,j;if(9===arguments.length)a=arguments[0],b=arguments[1],c=arguments[2],e=arguments[3],f=arguments[4],g=arguments[5],h=arguments[6],i=arguments[7],j=arguments[8];else{if(8!==arguments.length)throw new Error(\"Signature not supported\");a=this._pInst,b=arguments[0],c=arguments[1],e=arguments[2],f=arguments[3],g=arguments[4],h=arguments[5],i=arguments[6],j=arguments[7];}d.Renderer2D._copyHelper(a,b,c,e,f,g,h,i,j);},d.Renderer2D._copyHelper=function(a,b,c,d,e,f,g,h,i){var j=a.canvas.width/a.width;this.drawingContext.drawImage(a.canvas,j*b,j*c,j*d,j*e,f,g,h,i);},d.Renderer2D.prototype.get=function(a,b,c,e){if(void 0===a&&void 0===b&&void 0===c&&void 0===e?(a=0,b=0,c=this.width,e=this.height):void 0===c&&void 0===e&&(c=1,e=1),0>a+c||0>b+e||a>this.width||b>this.height)return[0,0,0,255];var f=this._pInst||this,g=f._pixelDensity;if(this.loadPixels.call(f),a=Math.floor(a),b=Math.floor(b),1===c&&1===e)return[f.pixels[4*g*(b*this.width+a)],f.pixels[g*(4*(b*this.width+a)+1)],f.pixels[g*(4*(b*this.width+a)+2)],f.pixels[g*(4*(b*this.width+a)+3)]];var h=a*g,i=b*g,j=Math.min(c,f.width),k=Math.min(e,f.height),l=j*g,m=k*g,n=new d.Image(j,k);return n.canvas.getContext(\"2d\").drawImage(this.canvas,h,i,l,m,0,0,j,k),n;},d.Renderer2D.prototype.loadPixels=function(){var a=this._pixelDensity||this._pInst._pixelDensity,b=this.width*a,c=this.height*a,d=this.drawingContext.getImageData(0,0,b,c);this._pInst?(this._pInst._setProperty(\"imageData\",d),this._pInst._setProperty(\"pixels\",d.data)):(this._setProperty(\"imageData\",d),this._setProperty(\"pixels\",d.data));},d.Renderer2D.prototype.set=function(a,b,c){if(a=Math.floor(a),b=Math.floor(b),c instanceof d.Image)this.drawingContext.save(),this.drawingContext.setTransform(1,0,0,1,0,0),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity),this.drawingContext.drawImage(c.canvas,a,b),this.loadPixels.call(this._pInst),this.drawingContext.restore();else{var e=this._pInst||this,f=0,g=0,h=0,i=0,j=4*(b*e._pixelDensity*this.width*e._pixelDensity+a*e._pixelDensity);if(e.imageData||e.loadPixels.call(e),\"number\"==typeof c)j<e.pixels.length&&(f=c,g=c,h=c,i=255);else if(c instanceof Array){if(c.length<4)throw new Error(\"pixel array must be of the form [R, G, B, A]\");j<e.pixels.length&&(f=c[0],g=c[1],h=c[2],i=c[3]);}else c instanceof d.Color&&j<e.pixels.length&&(f=c.levels[0],g=c.levels[1],h=c.levels[2],i=c.levels[3]);for(var k=0;k<e._pixelDensity;k++){for(var l=0;l<e._pixelDensity;l++){j=4*((b*e._pixelDensity+l)*this.width*e._pixelDensity+(a*e._pixelDensity+k)),e.pixels[j]=f,e.pixels[j+1]=g,e.pixels[j+2]=h,e.pixels[j+3]=i;}}}},d.Renderer2D.prototype.updatePixels=function(a,b,c,d){var e=this._pixelDensity||this._pInst._pixelDensity;void 0===a&&void 0===b&&void 0===c&&void 0===d&&(a=0,b=0,c=this.width,d=this.height),c*=e,d*=e,this._pInst?this.drawingContext.putImageData(this._pInst.imageData,a,b,0,0,c,d):this.drawingContext.putImageData(this.imageData,a,b,0,0,c,d);},d.Renderer2D.prototype._acuteArcToBezier=function(a,b){var c=b/2,d=Math.cos(c),e=Math.sin(c),f=1/Math.tan(c),g=a+c,h=Math.cos(g),i=Math.sin(g),j=(4-d)/3,k=e+(d-j)*f;return{ax:Math.cos(a),ay:Math.sin(a),bx:j*h+k*i,by:j*i-k*h,cx:j*h-k*i,cy:j*i+k*h,dx:Math.cos(a+b),dy:Math.sin(a+b)};},d.Renderer2D.prototype.arc=function(a,b,c,d,g,h,i){for(var j=this.drawingContext,k=e.arcModeAdjust(a,b,c,d,this._ellipseMode),l=k.w/2,m=k.h/2,n=1e-5,o=0,p=[];h-g>n;){o=Math.min(h-g,f.HALF_PI),p.push(this._acuteArcToBezier(g,o)),g+=o;}return this._doFill&&(j.beginPath(),p.forEach(function(a,b){0===b&&j.moveTo(k.x+a.ax*l,k.y+a.ay*m),j.bezierCurveTo(k.x+a.bx*l,k.y+a.by*m,k.x+a.cx*l,k.y+a.cy*m,k.x+a.dx*l,k.y+a.dy*m);}),(i===f.PIE||null==i)&&j.lineTo(k.x,k.y),j.closePath(),j.fill()),this._doStroke&&(j.beginPath(),p.forEach(function(a,b){0===b&&j.moveTo(k.x+a.ax*l,k.y+a.ay*m),j.bezierCurveTo(k.x+a.bx*l,k.y+a.by*m,k.x+a.cx*l,k.y+a.cy*m,k.x+a.dx*l,k.y+a.dy*m);}),i===f.PIE?(j.lineTo(k.x,k.y),j.closePath()):i===f.CHORD&&j.closePath(),j.stroke()),this;},d.Renderer2D.prototype.ellipse=function(a,b,c,d){var f=this.drawingContext,g=this._doFill,i=this._doStroke;if(g&&!i){if(f.fillStyle===h)return this;}else if(!g&&i&&f.strokeStyle===h)return this;var j=e.modeAdjust(a,b,c,d,this._ellipseMode),k=.5522847498,l=j.w/2*k,m=j.h/2*k,n=j.x+j.w,o=j.y+j.h,p=j.x+j.w/2,q=j.y+j.h/2;f.beginPath(),f.moveTo(j.x,q),f.bezierCurveTo(j.x,q-m,p-l,j.y,p,j.y),f.bezierCurveTo(p+l,j.y,n,q-m,n,q),f.bezierCurveTo(n,q+m,p+l,o,p,o),f.bezierCurveTo(p-l,o,j.x,q+m,j.x,q),f.closePath(),g&&f.fill(),i&&f.stroke();},d.Renderer2D.prototype.line=function(a,b,c,d){var e=this.drawingContext;return this._doStroke?e.strokeStyle===h?this:(e.lineWidth%2===1&&e.translate(.5,.5),e.beginPath(),e.moveTo(a,b),e.lineTo(c,d),e.stroke(),e.lineWidth%2===1&&e.translate(-.5,-.5),this):this;},d.Renderer2D.prototype.point=function(a,b){var c=this.drawingContext,d=c.strokeStyle,e=c.fillStyle;return this._doStroke?c.strokeStyle===h?this:(a=Math.round(a),b=Math.round(b),c.fillStyle=d,c.lineWidth>1?(c.beginPath(),c.arc(a,b,c.lineWidth/2,0,f.TWO_PI,!1),c.fill()):c.fillRect(a,b,1,1),void(c.fillStyle=e)):this;},d.Renderer2D.prototype.quad=function(a,b,c,d,e,f,g,i){var j=this.drawingContext,k=this._doFill,l=this._doStroke;if(k&&!l){if(j.fillStyle===h)return this;}else if(!k&&l&&j.strokeStyle===h)return this;return j.beginPath(),j.moveTo(a,b),j.lineTo(c,d),j.lineTo(e,f),j.lineTo(g,i),j.closePath(),k&&j.fill(),l&&j.stroke(),this;},d.Renderer2D.prototype.rect=function(a){var b=a[0],c=a[1],d=a[2],f=a[3],g=a[4],i=a[5],j=a[6],k=a[7],l=this.drawingContext,m=this._doFill,n=this._doStroke;if(m&&!n){if(l.fillStyle===h)return this;}else if(!m&&n&&l.strokeStyle===h)return this;var o=e.modeAdjust(b,c,d,f,this._rectMode);if(this._doStroke&&l.lineWidth%2===1&&l.translate(.5,.5),l.beginPath(),\"undefined\"==typeof g)l.rect(o.x,o.y,o.w,o.h);else{\"undefined\"==typeof i&&(i=g),\"undefined\"==typeof j&&(j=i),\"undefined\"==typeof k&&(k=j);var p=o.x,q=o.y,r=o.w,s=o.h,t=r/2,u=s/2;2*g>r&&(g=t),2*g>s&&(g=u),2*i>r&&(i=t),2*i>s&&(i=u),2*j>r&&(j=t),2*j>s&&(j=u),2*k>r&&(k=t),2*k>s&&(k=u),l.beginPath(),l.moveTo(p+g,q),l.arcTo(p+r,q,p+r,q+s,i),l.arcTo(p+r,q+s,p,q+s,j),l.arcTo(p,q+s,p,q,k),l.arcTo(p,q,p+r,q,g),l.closePath();}return this._doFill&&l.fill(),this._doStroke&&l.stroke(),this._doStroke&&l.lineWidth%2===1&&l.translate(-.5,-.5),this;},d.Renderer2D.prototype.triangle=function(a,b,c,d,e,f){var g=this.drawingContext,i=this._doFill,j=this._doStroke;if(i&&!j){if(g.fillStyle===h)return this;}else if(!i&&j&&g.strokeStyle===h)return this;g.beginPath(),g.moveTo(a,b),g.lineTo(c,d),g.lineTo(e,f),g.closePath(),i&&g.fill(),j&&g.stroke();},d.Renderer2D.prototype.endShape=function(a,b,c,d,e,g,h){if(0===b.length)return this;if(!this._doStroke&&!this._doFill)return this;var i,j=a===f.CLOSE;j&&!g&&b.push(b[0]);var k,l,m=b.length;if(!c||h!==f.POLYGON&&null!==h){if(!d||h!==f.POLYGON&&null!==h){if(!e||h!==f.POLYGON&&null!==h){if(h===f.POINTS)for(k=0;m>k;k++){i=b[k],this._doStroke&&this._pInst.stroke(i[6]),this._pInst.point(i[0],i[1]);}else if(h===f.LINES)for(k=0;m>k+1;k+=2){i=b[k],this._doStroke&&this._pInst.stroke(b[k+1][6]),this._pInst.line(i[0],i[1],b[k+1][0],b[k+1][1]);}else if(h===f.TRIANGLES)for(k=0;m>k+2;k+=3){i=b[k],this.drawingContext.beginPath(),this.drawingContext.moveTo(i[0],i[1]),this.drawingContext.lineTo(b[k+1][0],b[k+1][1]),this.drawingContext.lineTo(b[k+2][0],b[k+2][1]),this.drawingContext.lineTo(i[0],i[1]),this._doFill&&(this._pInst.fill(b[k+2][5]),this.drawingContext.fill()),this._doStroke&&(this._pInst.stroke(b[k+2][6]),this.drawingContext.stroke()),this.drawingContext.closePath();}else if(h===f.TRIANGLE_STRIP)for(k=0;m>k+1;k++){i=b[k],this.drawingContext.beginPath(),this.drawingContext.moveTo(b[k+1][0],b[k+1][1]),this.drawingContext.lineTo(i[0],i[1]),this._doStroke&&this._pInst.stroke(b[k+1][6]),this._doFill&&this._pInst.fill(b[k+1][5]),m>k+2&&(this.drawingContext.lineTo(b[k+2][0],b[k+2][1]),this._doStroke&&this._pInst.stroke(b[k+2][6]),this._doFill&&this._pInst.fill(b[k+2][5])),this._doFillStrokeClose();}else if(h===f.TRIANGLE_FAN){if(m>2)for(this.drawingContext.beginPath(),this.drawingContext.moveTo(b[0][0],b[0][1]),this.drawingContext.lineTo(b[1][0],b[1][1]),this.drawingContext.lineTo(b[2][0],b[2][1]),this._doFill&&this._pInst.fill(b[2][5]),this._doStroke&&this._pInst.stroke(b[2][6]),this._doFillStrokeClose(),k=3;m>k;k++){i=b[k],this.drawingContext.beginPath(),this.drawingContext.moveTo(b[0][0],b[0][1]),this.drawingContext.lineTo(b[k-1][0],b[k-1][1]),this.drawingContext.lineTo(i[0],i[1]),this._doFill&&this._pInst.fill(i[5]),this._doStroke&&this._pInst.stroke(i[6]),this._doFillStrokeClose();}}else if(h===f.QUADS)for(k=0;m>k+3;k+=4){for(i=b[k],this.drawingContext.beginPath(),this.drawingContext.moveTo(i[0],i[1]),l=1;4>l;l++){this.drawingContext.lineTo(b[k+l][0],b[k+l][1]);}this.drawingContext.lineTo(i[0],i[1]),this._doFill&&this._pInst.fill(b[k+3][5]),this._doStroke&&this._pInst.stroke(b[k+3][6]),this._doFillStrokeClose();}else if(h===f.QUAD_STRIP){if(m>3)for(k=0;m>k+1;k+=2){i=b[k],this.drawingContext.beginPath(),m>k+3?(this.drawingContext.moveTo(b[k+2][0],b[k+2][1]),this.drawingContext.lineTo(i[0],i[1]),this.drawingContext.lineTo(b[k+1][0],b[k+1][1]),this.drawingContext.lineTo(b[k+3][0],b[k+3][1]),this._doFill&&this._pInst.fill(b[k+3][5]),this._doStroke&&this._pInst.stroke(b[k+3][6])):(this.drawingContext.moveTo(i[0],i[1]),this.drawingContext.lineTo(b[k+1][0],b[k+1][1])),this._doFillStrokeClose();}}else{for(this.drawingContext.beginPath(),this.drawingContext.moveTo(b[0][0],b[0][1]),k=1;m>k;k++){i=b[k],i.isVert&&(i.moveTo?this.drawingContext.moveTo(i[0],i[1]):this.drawingContext.lineTo(i[0],i[1]));}this._doFillStrokeClose();}}else{for(this.drawingContext.beginPath(),k=0;m>k;k++){b[k].isVert?b[k].moveTo?this.drawingContext.moveTo([0],b[k][1]):this.drawingContext.lineTo(b[k][0],b[k][1]):this.drawingContext.quadraticCurveTo(b[k][0],b[k][1],b[k][2],b[k][3]);}this._doFillStrokeClose();}}else{for(this.drawingContext.beginPath(),k=0;m>k;k++){b[k].isVert?b[k].moveTo?this.drawingContext.moveTo(b[k][0],b[k][1]):this.drawingContext.lineTo(b[k][0],b[k][1]):this.drawingContext.bezierCurveTo(b[k][0],b[k][1],b[k][2],b[k][3],b[k][4],b[k][5]);}this._doFillStrokeClose();}}else if(m>3){var n=[],o=1-this._curveTightness;for(this.drawingContext.beginPath(),this.drawingContext.moveTo(b[1][0],b[1][1]),k=1;m>k+2;k++){i=b[k],n[0]=[i[0],i[1]],n[1]=[i[0]+(o*b[k+1][0]-o*b[k-1][0])/6,i[1]+(o*b[k+1][1]-o*b[k-1][1])/6],n[2]=[b[k+1][0]+(o*b[k][0]-o*b[k+2][0])/6,b[k+1][1]+(o*b[k][1]-o*b[k+2][1])/6],n[3]=[b[k+1][0],b[k+1][1]],this.drawingContext.bezierCurveTo(n[1][0],n[1][1],n[2][0],n[2][1],n[3][0],n[3][1]);}j&&this.drawingContext.lineTo(b[k+1][0],b[k+1][1]),this._doFillStrokeClose();}return c=!1,d=!1,e=!1,g=!1,j&&b.pop(),this;},d.Renderer2D.prototype.noSmooth=function(){return\"imageSmoothingEnabled\"in this.drawingContext?this.drawingContext.imageSmoothingEnabled=!1:\"mozImageSmoothingEnabled\"in this.drawingContext?this.drawingContext.mozImageSmoothingEnabled=!1:\"webkitImageSmoothingEnabled\"in this.drawingContext?this.drawingContext.webkitImageSmoothingEnabled=!1:\"msImageSmoothingEnabled\"in this.drawingContext&&(this.drawingContext.msImageSmoothingEnabled=!1),this;},d.Renderer2D.prototype.smooth=function(){return\"imageSmoothingEnabled\"in this.drawingContext?this.drawingContext.imageSmoothingEnabled=!0:\"mozImageSmoothingEnabled\"in this.drawingContext?this.drawingContext.mozImageSmoothingEnabled=!0:\"webkitImageSmoothingEnabled\"in this.drawingContext?this.drawingContext.webkitImageSmoothingEnabled=!0:\"msImageSmoothingEnabled\"in this.drawingContext&&(this.drawingContext.msImageSmoothingEnabled=!0),this;},d.Renderer2D.prototype.strokeCap=function(a){return(a===f.ROUND||a===f.SQUARE||a===f.PROJECT)&&(this.drawingContext.lineCap=a),this;},d.Renderer2D.prototype.strokeJoin=function(a){return(a===f.ROUND||a===f.BEVEL||a===f.MITER)&&(this.drawingContext.lineJoin=a),this;},d.Renderer2D.prototype.strokeWeight=function(a){return\"undefined\"==typeof a||0===a?this.drawingContext.lineWidth=1e-4:this.drawingContext.lineWidth=a,this;},d.Renderer2D.prototype._getFill=function(){return this.drawingContext.fillStyle;},d.Renderer2D.prototype._getStroke=function(){return this.drawingContext.strokeStyle;},d.Renderer2D.prototype.bezier=function(a,b,c,d,e,f,g,h){return this._pInst.beginShape(),this._pInst.vertex(a,b),this._pInst.bezierVertex(c,d,e,f,g,h),this._pInst.endShape(),this;},d.Renderer2D.prototype.curve=function(a,b,c,d,e,f,g,h){return this._pInst.beginShape(),this._pInst.curveVertex(a,b),this._pInst.curveVertex(c,d),this._pInst.curveVertex(e,f),this._pInst.curveVertex(g,h),this._pInst.endShape(),this;},d.Renderer2D.prototype._doFillStrokeClose=function(){this._doFill&&this.drawingContext.fill(),this._doStroke&&this.drawingContext.stroke(),this.drawingContext.closePath();},d.Renderer2D.prototype.applyMatrix=function(a,b,c,d,e,f){this.drawingContext.transform(a,b,c,d,e,f);},d.Renderer2D.prototype.resetMatrix=function(){return this.drawingContext.setTransform(1,0,0,1,0,0),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity),this;},d.Renderer2D.prototype.rotate=function(a){this.drawingContext.rotate(a);},d.Renderer2D.prototype.scale=function(a,b){return this.drawingContext.scale(a,b),this;},d.Renderer2D.prototype.shearX=function(a){return this._pInst._angleMode===f.DEGREES&&(a=this._pInst.degrees(a)),this.drawingContext.transform(1,0,this._pInst.tan(a),1,0,0),this;},d.Renderer2D.prototype.shearY=function(a){return this._pInst._angleMode===f.DEGREES&&(a=this._pInst.degrees(a)),this.drawingContext.transform(1,this._pInst.tan(a),0,1,0,0),this;},d.Renderer2D.prototype.translate=function(a,b){return this.drawingContext.translate(a,b),this;},d.Renderer2D.prototype.text=function(a,b,c,d,e){var g,h,i,j,k,l,m,n,o,p,q=this._pInst,r=Number.MAX_VALUE;if(this._doFill||this._doStroke){if(\"string\"!=typeof a&&(a=a.toString()),a=a.replace(/(\\t)/g,\"  \"),g=a.split(\"\\n\"),\"undefined\"!=typeof d){for(o=0,i=0;i<g.length;i++){for(k=\"\",n=g[i].split(\" \"),h=0;h<n.length;h++){l=k+n[h]+\" \",m=this.textWidth(l),m>d?(k=n[h]+\" \",o+=q.textLeading()):k=l;}}switch(this._rectMode===f.CENTER&&(b-=d/2,c-=e/2),this.drawingContext.textAlign){case f.CENTER:b+=d/2;break;case f.RIGHT:b+=d;}if(\"undefined\"!=typeof e){switch(this.drawingContext.textBaseline){case f.BOTTOM:c+=e-o;break;case f._CTX_MIDDLE:c+=(e-o)/2;break;case f.BASELINE:p=!0,this.drawingContext.textBaseline=f.TOP;}r=c+e-q.textAscent();}for(i=0;i<g.length;i++){for(k=\"\",n=g[i].split(\" \"),h=0;h<n.length;h++){l=k+n[h]+\" \",m=this.textWidth(l),m>d&&k.length>0?(this._renderText(q,k,b,c,r),k=n[h]+\" \",c+=q.textLeading()):k=l;}this._renderText(q,k,b,c,r),c+=q.textLeading();}}else{var s=(.5*g.length-.5)*q.textLeading();for(j=0;j<g.length;j++){this._renderText(q,g[j],b,c-s,r),c+=q.textLeading();}}return p&&(this.drawingContext.textBaseline=f.BASELINE),q;}},d.Renderer2D.prototype._renderText=function(a,b,c,d,e){return d>=e?void 0:(a.push(),this._isOpenType()?this._textFont._renderPath(b,c,d,{renderer:this}):(this._doStroke&&this._strokeSet&&this.drawingContext.strokeText(b,c,d),this._doFill&&(this.drawingContext.fillStyle=this._fillSet?this.drawingContext.fillStyle:f._DEFAULT_TEXT_FILL,this.drawingContext.fillText(b,c,d))),a.pop(),a);},d.Renderer2D.prototype.textWidth=function(a){return this._isOpenType()?this._textFont._textWidth(a):this.drawingContext.measureText(a).width;},d.Renderer2D.prototype.textAlign=function(a,b){if(arguments.length)return(a===f.LEFT||a===f.RIGHT||a===f.CENTER)&&(this.drawingContext.textAlign=a),(b===f.TOP||b===f.BOTTOM||b===f.CENTER||b===f.BASELINE)&&(b===f.CENTER?this.drawingContext.textBaseline=f._CTX_MIDDLE:this.drawingContext.textBaseline=b),this._pInst;var c=this.drawingContext.textBaseline;return c===f._CTX_MIDDLE&&(c=f.CENTER),{horizontal:this.drawingContext.textAlign,vertical:c};},d.Renderer2D.prototype._applyTextProperties=function(){var a,b=this._pInst;return this._setProperty(\"_textAscent\",null),this._setProperty(\"_textDescent\",null),a=this._textFont,this._isOpenType()&&(a=this._textFont.font.familyName,this._setProperty(\"_textStyle\",this._textFont.font.styleName)),this.drawingContext.font=this._textStyle+\" \"+this._textSize+\"px \"+a,b;},d.Renderer2D.prototype.push=function(){this.drawingContext.save();},d.Renderer2D.prototype.pop=function(){this.drawingContext.restore();},b.exports=d.Renderer2D;},{\"../image/filters\":66,\"./canvas\":47,\"./constants\":48,\"./core\":49,\"./p5.Renderer\":55}],57:[function(a,b,c){var d=a(\"./core\"),e=a(\"./constants\");a(\"./p5.Graphics\"),a(\"./p5.Renderer2D\"),a(\"../3d/p5.Renderer3D\");var f=\"defaultCanvas0\";d.prototype.createCanvas=function(a,b,c){var g,h,i=c||e.P2D;if(arguments[3]&&(g=\"boolean\"==typeof arguments[3]?arguments[3]:!1),i===e.WEBGL)h=document.getElementById(f),h&&h.parentNode.removeChild(h),h=document.createElement(\"canvas\"),h.id=f;else if(g){h=document.createElement(\"canvas\");for(var j=0;document.getElementById(\"defaultCanvas\"+j);){j++;}f=\"defaultCanvas\"+j,h.id=f;}else h=this.canvas;return this._setupDone||(h.dataset.hidden=!0,h.style.visibility=\"hidden\"),this._userNode?this._userNode.appendChild(h):document.body.appendChild(h),i===e.WEBGL?(this._setProperty(\"_renderer\",new d.Renderer3D(h,this,!0)),this._isdefaultGraphics=!0):this._isdefaultGraphics||(this._setProperty(\"_renderer\",new d.Renderer2D(h,this,!0)),this._isdefaultGraphics=!0),this._renderer.resize(a,b),this._renderer._applyDefaults(),g&&this._elements.push(this._renderer),this._renderer;},d.prototype.resizeCanvas=function(a,b,c){if(this._renderer){var d={};for(var e in this.drawingContext){var f=this.drawingContext[e];\"object\"!=(typeof f===\"undefined\"?\"undefined\":_typeof(f))&&\"function\"!=typeof f&&(d[e]=f);}this._renderer.resize(a,b);for(var g in d){this.drawingContext[g]=d[g];}c||this.redraw();}},d.prototype.noCanvas=function(){this.canvas&&this.canvas.parentNode.removeChild(this.canvas);},d.prototype.createGraphics=function(a,b,c){return new d.Graphics(a,b,c,this);},d.prototype.blendMode=function(a){if(a!==e.BLEND&&a!==e.DARKEST&&a!==e.LIGHTEST&&a!==e.DIFFERENCE&&a!==e.MULTIPLY&&a!==e.EXCLUSION&&a!==e.SCREEN&&a!==e.REPLACE&&a!==e.OVERLAY&&a!==e.HARD_LIGHT&&a!==e.SOFT_LIGHT&&a!==e.DODGE&&a!==e.BURN&&a!==e.ADD&&a!==e.NORMAL)throw new Error(\"Mode \"+a+\" not recognized.\");this._renderer.blendMode(a);},b.exports=d;},{\"../3d/p5.Renderer3D\":37,\"./constants\":48,\"./core\":49,\"./p5.Graphics\":54,\"./p5.Renderer2D\":56}],58:[function(a,b,c){window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a,b){window.setTimeout(a,1e3/60);};}(),window.performance=window.performance||{},window.performance.now=function(){var a=Date.now();return window.performance.now||window.performance.mozNow||window.performance.msNow||window.performance.oNow||window.performance.webkitNow||function(){return Date.now()-a;};}(),function(){\"use strict\";\"undefined\"==typeof Uint8ClampedArray||Uint8ClampedArray.prototype.slice||Object.defineProperty(Uint8ClampedArray.prototype,\"slice\",{value:Array.prototype.slice,writable:!0,configurable:!0,enumerable:!1});}();},{}],59:[function(a,b,c){\"use strict\";var d=a(\"./core\");d.prototype.exit=function(){throw\"exit() not implemented, see remove()\";},d.prototype.noLoop=function(){this._loop=!1;},d.prototype.loop=function(){this._loop=!0,this._draw();},d.prototype.push=function(){this._renderer.push(),this._styles.push({_doStroke:this._renderer._doStroke,_strokeSet:this._renderer._strokeSet,_doFill:this._renderer._doFill,_fillSet:this._renderer._fillSet,_tint:this._renderer._tint,_imageMode:this._renderer._imageMode,_rectMode:this._renderer._rectMode,_ellipseMode:this._renderer._ellipseMode,_colorMode:this._renderer._colorMode,_textFont:this._renderer._textFont,_textLeading:this._renderer._textLeading,_textSize:this._renderer._textSize,_textStyle:this._renderer._textStyle});},d.prototype.pop=function(){this._renderer.pop();var a=this._styles.pop();for(var b in a){this._renderer[b]=a[b];}},d.prototype.pushStyle=function(){throw new Error(\"pushStyle() not used, see push()\");},d.prototype.popStyle=function(){throw new Error(\"popStyle() not used, see pop()\");},d.prototype.redraw=function(){var a=this.setup||window.setup,b=this.draw||window.draw;if(\"function\"==typeof b){this.resetMatrix.bind(this),\"undefined\"==typeof a&&this.scale(this._pixelDensity,this._pixelDensity);var c=this;this._registeredMethods.pre.forEach(function(a){a.call(c);}),b(),this._registeredMethods.post.forEach(function(a){a.call(c);});}},d.prototype.size=function(){var a=\"size() is not a valid p5 function, to set the size of the \";throw a+=\"drawing canvas, please use createCanvas() instead\";},b.exports=d;},{\"./core\":49}],60:[function(a,b,c){\"use strict\";var d=a(\"./core\"),e=a(\"./constants\");d.prototype.applyMatrix=function(a,b,c,d,e,f){return this._renderer.applyMatrix(a,b,c,d,e,f),this;},d.prototype.popMatrix=function(){throw new Error(\"popMatrix() not used, see pop()\");},d.prototype.printMatrix=function(){throw new Error(\"printMatrix() not implemented\");},d.prototype.pushMatrix=function(){throw new Error(\"pushMatrix() not used, see push()\");},d.prototype.resetMatrix=function(){return this._renderer.resetMatrix(),this;},d.prototype.rotate=function(){var a=arguments[0];return this._angleMode===e.DEGREES&&(a=this.radians(a)),arguments.length>1?this._renderer.rotate(a,arguments[1]):this._renderer.rotate(a),this;},d.prototype.rotateX=function(a){for(var b=new Array(arguments.length),c=0;c<b.length;++c){b[c]=arguments[c];}if(!this._renderer.isP3D)throw\"not supported in p2d. Please use webgl mode\";return this._validateParameters(\"rotateX\",b,[[\"Number\"]]),this._renderer.rotateX(a),this;},d.prototype.rotateY=function(a){if(!this._renderer.isP3D)throw\"not supported in p2d. Please use webgl mode\";for(var b=new Array(arguments.length),c=0;c<b.length;++c){b[c]=arguments[c];}return this._validateParameters(\"rotateY\",b,[[\"Number\"]]),this._renderer.rotateY(a),this;},d.prototype.rotateZ=function(a){if(!this._renderer.isP3D)throw\"not supported in p2d. Please use webgl mode\";for(var b=new Array(arguments.length),c=0;c<b.length;++c){b[c]=arguments[c];}return this._validateParameters(\"rotateZ\",b,[[\"Number\"]]),this._renderer.rotateZ(a),this;},d.prototype.scale=function(){for(var a,b,c,e=new Array(arguments.length),f=0;f<e.length;f++){e[f]=arguments[f];}return e[0]instanceof d.Vector?(a=e[0].x,b=e[0].y,c=e[0].z):e[0]instanceof Array?(a=e[0][0],b=e[0][1],c=e[0][2]||1):1===e.length?a=b=c=e[0]:(a=e[0],b=e[1],c=e[2]||1),this._renderer.isP3D?this._renderer.scale.call(this._renderer,a,b,c):this._renderer.scale.call(this._renderer,a,b),this;},d.prototype.shearX=function(a){return this._angleMode===e.DEGREES&&(a=this.radians(a)),this._renderer.shearX(a),this;},d.prototype.shearY=function(a){return this._angleMode===e.DEGREES&&(a=this.radians(a)),this._renderer.shearY(a),this;},d.prototype.translate=function(a,b,c){for(var d=new Array(arguments.length),e=0;e<d.length;++e){d[e]=arguments[e];}return this._renderer.isP3D?(this._validateParameters(\"translate\",d,[[\"Number\",\"Number\",\"Number\"]]),this._renderer.translate(a,b,c)):(this._validateParameters(\"translate\",d,[[\"Number\",\"Number\"]]),this._renderer.translate(a,b)),this;},b.exports=d;},{\"./constants\":48,\"./core\":49}],61:[function(a,b,c){\"use strict\";var d=a(\"./core\"),e=a(\"./constants\"),f=null,g=[],h=[],i=!1,j=!1,k=!1,l=!1,m=!0;d.prototype.beginContour=function(){return h=[],l=!0,this;},d.prototype.beginShape=function(a){return f=a===e.POINTS||a===e.LINES||a===e.TRIANGLES||a===e.TRIANGLE_FAN||a===e.TRIANGLE_STRIP||a===e.QUADS||a===e.QUAD_STRIP?a:null,this._renderer.isP3D?this._renderer.beginShape(a):(g=[],h=[]),this;},d.prototype.bezierVertex=function(a,b,c,d,e,f){if(0===g.length)throw\"vertex() must be used once before calling bezierVertex()\";i=!0;for(var j=[],k=0;k<arguments.length;k++){j[k]=arguments[k];}return j.isVert=!1,l?h.push(j):g.push(j),this;},d.prototype.curveVertex=function(a,b){return j=!0,this.vertex(a,b),this;},d.prototype.endContour=function(){var a=h[0].slice();a.isVert=h[0].isVert,a.moveTo=!1,h.push(a),m&&(g.push(g[0]),m=!1);for(var b=0;b<h.length;b++){g.push(h[b]);}return this;},d.prototype.endShape=function(a){if(this._renderer.isP3D)this._renderer.endShape(a,j,i,k,l,f);else{if(0===g.length)return this;if(!this._renderer._doStroke&&!this._renderer._doFill)return this;var b=a===e.CLOSE;b&&!l&&g.push(g[0]),this._renderer.endShape(a,g,j,i,k,l,f),j=!1,i=!1,k=!1,l=!1,m=!0,b&&g.pop();}return this;},d.prototype.quadraticVertex=function(a,b,c,d){if(this._contourInited){var f={};return f.x=a,f.y=b,f.x3=c,f.y3=d,f.type=e.QUADRATIC,this._contourVertices.push(f),this;}if(!(g.length>0))throw\"vertex() must be used once before calling quadraticVertex()\";k=!0;for(var i=[],j=0;j<arguments.length;j++){i[j]=arguments[j];}return i.isVert=!1,l?h.push(i):g.push(i),this;},d.prototype.vertex=function(a,b,c){for(var d=new Array(arguments.length),e=0;e<d.length;++e){d[e]=arguments[e];}if(this._renderer.isP3D)this._validateParameters(\"vertex\",d,[[\"Number\",\"Number\",\"Number\"]]),this._renderer.vertex(arguments[0],arguments[1],arguments[2]);else{this._validateParameters(\"vertex\",d,[[\"Number\",\"Number\"],[\"Number\",\"Number\",\"Number\"]]);var f=[];f.isVert=!0,f[0]=a,f[1]=b,f[2]=0,f[3]=0,f[4]=0,f[5]=this._renderer._getFill(),f[6]=this._renderer._getStroke(),c&&(f.moveTo=c),l?(0===h.length&&(f.moveTo=!0),h.push(f)):g.push(f);}return this;},b.exports=d;},{\"./constants\":48,\"./core\":49}],62:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");d.prototype.deviceOrientation=void 0,d.prototype.accelerationX=0,d.prototype.accelerationY=0,d.prototype.accelerationZ=0,d.prototype.pAccelerationX=0,d.prototype.pAccelerationY=0,d.prototype.pAccelerationZ=0,d.prototype._updatePAccelerations=function(){this._setProperty(\"pAccelerationX\",this.accelerationX),this._setProperty(\"pAccelerationY\",this.accelerationY),this._setProperty(\"pAccelerationZ\",this.accelerationZ);},d.prototype.rotationX=0,d.prototype.rotationY=0,d.prototype.rotationZ=0,d.prototype.pRotationX=0,d.prototype.pRotationY=0,d.prototype.pRotationZ=0;var e,f,g,h=0,i=0,j=0,k=\"clockwise\",l=\"clockwise\",m=\"clockwise\";d.prototype._updatePRotations=function(){this._setProperty(\"pRotationX\",this.rotationX),this._setProperty(\"pRotationY\",this.rotationY),this._setProperty(\"pRotationZ\",this.rotationZ);},d.prototype.turnAxis=void 0;var n=.5,o=30;d.prototype.setMoveThreshold=function(a){\"number\"==typeof a&&(n=a);},d.prototype.setShakeThreshold=function(a){\"number\"==typeof a&&(o=a);},d.prototype._ondeviceorientation=function(a){this._updatePRotations(),this._setProperty(\"rotationX\",a.beta),this._setProperty(\"rotationY\",a.gamma),this._setProperty(\"rotationZ\",a.alpha),this._handleMotion();},d.prototype._ondevicemotion=function(a){this._updatePAccelerations(),this._setProperty(\"accelerationX\",2*a.acceleration.x),this._setProperty(\"accelerationY\",2*a.acceleration.y),this._setProperty(\"accelerationZ\",2*a.acceleration.z),this._handleMotion();},d.prototype._handleMotion=function(){90===window.orientation||-90===window.orientation?this._setProperty(\"deviceOrientation\",\"landscape\"):0===window.orientation?this._setProperty(\"deviceOrientation\",\"portrait\"):void 0===window.orientation&&this._setProperty(\"deviceOrientation\",\"undefined\");var a=this.deviceMoved||window.deviceMoved;\"function\"==typeof a&&(Math.abs(this.accelerationX-this.pAccelerationX)>n||Math.abs(this.accelerationY-this.pAccelerationY)>n||Math.abs(this.accelerationZ-this.pAccelerationZ)>n)&&a();var b=this.deviceTurned||window.deviceTurned;if(\"function\"==typeof b){var c=this.rotationX+180,d=this.pRotationX+180,p=h+180;c-d>0&&270>c-d||-270>c-d?k=\"clockwise\":(0>c-d||c-d>270)&&(k=\"counter-clockwise\"),k!==e&&(p=c),Math.abs(c-p)>90&&Math.abs(c-p)<270&&(p=c,this._setProperty(\"turnAxis\",\"X\"),b()),e=k,h=p-180;var q=this.rotationY+180,r=this.pRotationY+180,s=i+180;q-r>0&&270>q-r||-270>q-r?l=\"clockwise\":(0>q-r||q-this.pRotationY>270)&&(l=\"counter-clockwise\"),l!==f&&(s=q),Math.abs(q-s)>90&&Math.abs(q-s)<270&&(s=q,this._setProperty(\"turnAxis\",\"Y\"),b()),f=l,i=s-180,this.rotationZ-this.pRotationZ>0&&this.rotationZ-this.pRotationZ<270||this.rotationZ-this.pRotationZ<-270?m=\"clockwise\":(this.rotationZ-this.pRotationZ<0||this.rotationZ-this.pRotationZ>270)&&(m=\"counter-clockwise\"),m!==g&&(j=this.rotationZ),Math.abs(this.rotationZ-j)>90&&Math.abs(this.rotationZ-j)<270&&(j=this.rotationZ,this._setProperty(\"turnAxis\",\"Z\"),b()),g=m,this._setProperty(\"turnAxis\",void 0);}var t=this.deviceShaken||window.deviceShaken;if(\"function\"==typeof t){var u,v;null!==this.pAccelerationX&&(u=Math.abs(this.accelerationX-this.pAccelerationX),v=Math.abs(this.accelerationY-this.pAccelerationY)),u+v>o&&t();}},b.exports=d;},{\"../core/core\":49}],63:[function(a,b,c){\"use strict\";var d=a(\"../core/core\"),e={};d.prototype.isKeyPressed=!1,d.prototype.keyIsPressed=!1,d.prototype.key=\"\",d.prototype.keyCode=0,d.prototype._onkeydown=function(a){if(!e[a.which]){this._setProperty(\"isKeyPressed\",!0),this._setProperty(\"keyIsPressed\",!0),this._setProperty(\"keyCode\",a.which),e[a.which]=!0;var b=String.fromCharCode(a.which);b||(b=a.which),this._setProperty(\"key\",b);var c=this.keyPressed||window.keyPressed;if(\"function\"==typeof c&&!a.charCode){var d=c(a);d===!1&&a.preventDefault();}}},d.prototype._onkeyup=function(a){var b=this.keyReleased||window.keyReleased;this._setProperty(\"isKeyPressed\",!1),this._setProperty(\"keyIsPressed\",!1),this._setProperty(\"_lastKeyCodeTyped\",null),e[a.which]=!1;var c=String.fromCharCode(a.which);if(c||(c=a.which),this._setProperty(\"key\",c),this._setProperty(\"keyCode\",a.which),\"function\"==typeof b){var d=b(a);d===!1&&a.preventDefault();}},d.prototype._onkeypress=function(a){if(a.which!==this._lastKeyCodeTyped){this._setProperty(\"keyCode\",a.which),this._setProperty(\"_lastKeyCodeTyped\",a.which),this._setProperty(\"key\",String.fromCharCode(a.which));var b=this.keyTyped||window.keyTyped;if(\"function\"==typeof b){var c=b(a);c===!1&&a.preventDefault();}}},d.prototype._onblur=function(a){e={};},d.prototype.keyIsDown=function(a){return e[a];},b.exports=d;},{\"../core/core\":49}],64:[function(a,b,c){\"use strict\";function d(a,b){var c=a.getBoundingClientRect();return{x:b.clientX-c.left,y:b.clientY-c.top};}var e=a(\"../core/core\"),f=a(\"../core/constants\");e.prototype._nextMouseX=0,e.prototype._nextMouseY=0,e.prototype.mouseX=0,e.prototype.mouseY=0,e.prototype.pmouseX=0,e.prototype.pmouseY=0,e.prototype.winMouseX=0,e.prototype.winMouseY=0,e.prototype.pwinMouseX=0,e.prototype.pwinMouseY=0,e.prototype.mouseButton=0,e.prototype.mouseIsPressed=!1,e.prototype.isMousePressed=!1,e.prototype._updateNextMouseCoords=function(a){if(\"touchstart\"===a.type||\"touchmove\"===a.type||\"touchend\"===a.type||a.touches)this._setProperty(\"_nextMouseX\",this._nextTouchX),this._setProperty(\"_nextMouseY\",this._nextTouchY);else if(null!==this._curElement){var b=d(this._curElement.elt,a);this._setProperty(\"_nextMouseX\",b.x),this._setProperty(\"_nextMouseY\",b.y);}this._setProperty(\"winMouseX\",a.pageX),this._setProperty(\"winMouseY\",a.pageY);},e.prototype._updateMouseCoords=function(){this._setProperty(\"pmouseX\",this.mouseX),this._setProperty(\"pmouseY\",this.mouseY),this._setProperty(\"mouseX\",this._nextMouseX),this._setProperty(\"mouseY\",this._nextMouseY),this._setProperty(\"pwinMouseX\",this.winMouseX),this._setProperty(\"pwinMouseY\",this.winMouseY);},e.prototype._setMouseButton=function(a){1===a.button?this._setProperty(\"mouseButton\",f.CENTER):2===a.button?this._setProperty(\"mouseButton\",f.RIGHT):this._setProperty(\"mouseButton\",f.LEFT);},e.prototype._onmousemove=function(a){var b,c=this._isGlobal?window:this;this._updateNextMouseCoords(a),this._updateNextTouchCoords(a),this.isMousePressed?\"function\"==typeof c.mouseDragged?(b=c.mouseDragged(a),b===!1&&a.preventDefault()):\"function\"==typeof c.touchMoved&&(b=c.touchMoved(a),b===!1&&a.preventDefault()):\"function\"==typeof c.mouseMoved&&(b=c.mouseMoved(a),b===!1&&a.preventDefault());},e.prototype._onmousedown=function(a){var b,c=this._isGlobal?window:this;this._setProperty(\"isMousePressed\",!0),this._setProperty(\"mouseIsPressed\",!0),this._setMouseButton(a),this._updateNextMouseCoords(a),this._updateNextTouchCoords(a),\"function\"==typeof c.mousePressed?(b=c.mousePressed(a),b===!1&&a.preventDefault()):\"function\"==typeof c.touchStarted&&(b=c.touchStarted(a),b===!1&&a.preventDefault());},e.prototype._onmouseup=function(a){var b,c=this._isGlobal?window:this;this._setProperty(\"isMousePressed\",!1),this._setProperty(\"mouseIsPressed\",!1),\"function\"==typeof c.mouseReleased?(b=c.mouseReleased(a),b===!1&&a.preventDefault()):\"function\"==typeof c.touchEnded&&(b=c.touchEnded(a),b===!1&&a.preventDefault());},e.prototype._ondragend=e.prototype._onmouseup,e.prototype._ondragover=e.prototype._onmousemove,e.prototype._onclick=function(a){var b=this._isGlobal?window:this;if(\"function\"==typeof b.mouseClicked){var c=b.mouseClicked(a);c===!1&&a.preventDefault();}},e.prototype._onwheel=function(a){var b=this._isGlobal?window:this;if(\"function\"==typeof b.mouseWheel){a.delta=a.deltaY;var c=b.mouseWheel(a);c===!1&&a.preventDefault();}},b.exports=e;},{\"../core/constants\":48,\"../core/core\":49}],65:[function(a,b,c){\"use strict\";function d(a,b,c){c=c||0;var d=a.getBoundingClientRect(),e=b.touches[c]||b.changedTouches[c];return{x:e.clientX-d.left,y:e.clientY-d.top,id:e.identifier};}var e=a(\"../core/core\");e.prototype._nextTouchX=0,e.prototype._nextTouchY=0,e.prototype.touchX=0,e.prototype.touchY=0,e.prototype.ptouchX=0,e.prototype.ptouchY=0,e.prototype.touches=[],e.prototype.touchIsDown=!1,e.prototype._updateNextTouchCoords=function(a){if(\"mousedown\"!==a.type&&\"mousemove\"!==a.type&&\"mouseup\"!==a.type&&a.touches){if(null!==this._curElement){var b=d(this._curElement.elt,a,0);this._setProperty(\"_nextTouchX\",b.x),this._setProperty(\"_nextTouchY\",b.y);for(var c=[],e=0;e<a.touches.length;e++){c[e]=d(this._curElement.elt,a,e);}this._setProperty(\"touches\",c);}}else this._setProperty(\"_nextTouchX\",this._nextMouseX),this._setProperty(\"_nextTouchY\",this._nextMouseY);},e.prototype._updateTouchCoords=function(){this._setProperty(\"ptouchX\",this.touchX),this._setProperty(\"ptouchY\",this.touchY),this._setProperty(\"touchX\",this._nextTouchX),this._setProperty(\"touchY\",this._nextTouchY);},e.prototype._ontouchstart=function(a){var b,c=this._isGlobal?window:this;this._updateNextTouchCoords(a),this._updateNextMouseCoords(a),this._setProperty(\"touchIsDown\",!0),\"function\"==typeof c.touchStarted?(b=c.touchStarted(a),b===!1&&a.preventDefault()):\"function\"==typeof c.mousePressed&&(b=c.mousePressed(a),b===!1&&a.preventDefault());},e.prototype._ontouchmove=function(a){var b,c=this._isGlobal?window:this;this._updateNextTouchCoords(a),this._updateNextMouseCoords(a),\"function\"==typeof c.touchMoved?(b=c.touchMoved(a),b===!1&&a.preventDefault()):\"function\"==typeof c.mouseDragged&&(b=c.mouseDragged(a),b===!1&&a.preventDefault());},e.prototype._ontouchend=function(a){this._updateNextTouchCoords(a),this._updateNextMouseCoords(a),0===this.touches.length&&this._setProperty(\"touchIsDown\",!1);var b,c=this._isGlobal?window:this;\"function\"==typeof c.touchEnded?(b=c.touchEnded(a),b===!1&&a.preventDefault()):\"function\"==typeof c.mouseReleased&&(b=c.mouseReleased(a),b===!1&&a.preventDefault());},b.exports=e;},{\"../core/core\":49}],66:[function(a,b,c){\"use strict\";function d(a){var b=3.5*a|0;if(b=1>b?1:248>b?b:248,g!==b){g=b,h=1+g<<1,i=new Int32Array(h),j=new Array(h);for(var c=0;h>c;c++){j[c]=new Int32Array(256);}for(var d,e,f,k,l=1,m=b-1;b>l;l++){i[b+l]=i[m]=e=m*m,f=j[b+l],k=j[m--];for(var n=0;256>n;n++){f[n]=k[n]=e*n;}}d=i[b]=b*b,f=j[b];for(var o=0;256>o;o++){f[o]=d*o;}}}function e(a,b){for(var c=f._toPixels(a),e=a.width,k=a.height,l=e*k,m=new Int32Array(l),n=0;l>n;n++){m[n]=f._getARGB(c,n);}var o,p,q,r,s,t,u,v,w,x,y=new Int32Array(l),z=new Int32Array(l),A=new Int32Array(l),B=new Int32Array(l),C=0;d(b);var D,E,F,G;for(E=0;k>E;E++){for(D=0;e>D;D++){if(r=q=p=s=o=0,t=D-g,0>t)x=-t,t=0;else{if(t>=e)break;x=0;}for(F=x;h>F&&!(t>=e);F++){var H=m[t+C];G=j[F],s+=G[(-16777216&H)>>>24],p+=G[(16711680&H)>>16],q+=G[(65280&H)>>8],r+=G[255&H],o+=i[F],t++;}u=C+D,y[u]=s/o,z[u]=p/o,A[u]=q/o,B[u]=r/o;}C+=e;}for(C=0,v=-g,w=v*e,E=0;k>E;E++){for(D=0;e>D;D++){if(r=q=p=s=o=0,0>v)x=u=-v,t=D;else{if(v>=k)break;x=0,u=v,t=D+w;}for(F=x;h>F&&!(u>=k);F++){G=j[F],s+=G[y[t]],p+=G[z[t]],q+=G[A[t]],r+=G[B[t]],o+=i[F],u++,t+=e;}m[D+C]=s/o<<24|p/o<<16|q/o<<8|r/o;}C+=e,w+=e,v++;}f._setPixels(c,m);}var f={};f._toPixels=function(a){return a instanceof ImageData?a.data:a.getContext(\"2d\").getImageData(0,0,a.width,a.height).data;},f._getARGB=function(a,b){var c=4*b;return a[c+3]<<24&4278190080|a[c]<<16&16711680|a[c+1]<<8&65280|255&a[c+2];},f._setPixels=function(a,b){for(var c=0,d=0,e=a.length;e>d;d++){c=4*d,a[c+0]=(16711680&b[d])>>>16,a[c+1]=(65280&b[d])>>>8,a[c+2]=255&b[d],a[c+3]=(4278190080&b[d])>>>24;}},f._toImageData=function(a){return a instanceof ImageData?a:a.getContext(\"2d\").getImageData(0,0,a.width,a.height);},f._createImageData=function(a,b){return f._tmpCanvas=document.createElement(\"canvas\"),f._tmpCtx=f._tmpCanvas.getContext(\"2d\"),this._tmpCtx.createImageData(a,b);},f.apply=function(a,b,c){var d=a.getContext(\"2d\"),e=d.getImageData(0,0,a.width,a.height),f=b(e,c);f instanceof ImageData?d.putImageData(f,0,0,0,0,a.width,a.height):d.putImageData(e,0,0,0,0,a.width,a.height);},f.threshold=function(a,b){var c=f._toPixels(a);void 0===b&&(b=.5);for(var d=Math.floor(255*b),e=0;e<c.length;e+=4){var g,h=c[e],i=c[e+1],j=c[e+2],k=.2126*h+.7152*i+.0722*j;g=k>=d?255:0,c[e]=c[e+1]=c[e+2]=g;}},f.gray=function(a){for(var b=f._toPixels(a),c=0;c<b.length;c+=4){var d=b[c],e=b[c+1],g=b[c+2],h=.2126*d+.7152*e+.0722*g;b[c]=b[c+1]=b[c+2]=h;}},f.opaque=function(a){for(var b=f._toPixels(a),c=0;c<b.length;c+=4){b[c+3]=255;}return b;},f.invert=function(a){for(var b=f._toPixels(a),c=0;c<b.length;c+=4){b[c]=255-b[c],b[c+1]=255-b[c+1],b[c+2]=255-b[c+2];}},f.posterize=function(a,b){var c=f._toPixels(a);if(2>b||b>255)throw new Error(\"Level must be greater than 2 and less than 255 for posterize\");for(var d=b-1,e=0;e<c.length;e+=4){var g=c[e],h=c[e+1],i=c[e+2];c[e]=255*(g*b>>8)/d,c[e+1]=255*(h*b>>8)/d,c[e+2]=255*(i*b>>8)/d;}},f.dilate=function(a){for(var b,c,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t=f._toPixels(a),u=0,v=t.length?t.length/4:0,w=new Int32Array(v);v>u;){for(b=u,c=u+a.width;c>u;){d=e=f._getARGB(t,u),i=u-1,h=u+1,j=u-a.width,k=u+a.width,b>i&&(i=u),h>=c&&(h=u),0>j&&(j=0),k>=v&&(k=u),n=f._getARGB(t,j),m=f._getARGB(t,i),o=f._getARGB(t,k),l=f._getARGB(t,h),g=77*(d>>16&255)+151*(d>>8&255)+28*(255&d),q=77*(m>>16&255)+151*(m>>8&255)+28*(255&m),p=77*(l>>16&255)+151*(l>>8&255)+28*(255&l),r=77*(n>>16&255)+151*(n>>8&255)+28*(255&n),s=77*(o>>16&255)+151*(o>>8&255)+28*(255&o),q>g&&(e=m,g=q),p>g&&(e=l,g=p),r>g&&(e=n,g=r),s>g&&(e=o,g=s),w[u++]=e;}}f._setPixels(t,w);},f.erode=function(a){for(var b,c,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t=f._toPixels(a),u=0,v=t.length?t.length/4:0,w=new Int32Array(v);v>u;){for(b=u,c=u+a.width;c>u;){d=e=f._getARGB(t,u),i=u-1,h=u+1,j=u-a.width,k=u+a.width,b>i&&(i=u),h>=c&&(h=u),0>j&&(j=0),k>=v&&(k=u),n=f._getARGB(t,j),m=f._getARGB(t,i),o=f._getARGB(t,k),l=f._getARGB(t,h),g=77*(d>>16&255)+151*(d>>8&255)+28*(255&d),q=77*(m>>16&255)+151*(m>>8&255)+28*(255&m),p=77*(l>>16&255)+151*(l>>8&255)+28*(255&l),r=77*(n>>16&255)+151*(n>>8&255)+28*(255&n),s=77*(o>>16&255)+151*(o>>8&255)+28*(255&o),g>q&&(e=m,g=q),g>p&&(e=l,g=p),g>r&&(e=n,g=r),g>s&&(e=o,g=s),w[u++]=e;}}f._setPixels(t,w);};var g,h,i,j;f.blur=function(a,b){e(a,b);},b.exports=f;},{}],67:[function(a,b,c){\"use strict\";var d=a(\"../core/core\"),e=[];d.prototype.createImage=function(a,b){return new d.Image(a,b);},d.prototype.saveCanvas=function(){var a,b,c;if(3===arguments.length?(a=arguments[0],b=arguments[1],c=arguments[2]):2===arguments.length?\"object\"==_typeof(arguments[0])?(a=arguments[0],b=arguments[1]):(b=arguments[0],c=arguments[1]):1===arguments.length&&(\"object\"==_typeof(arguments[0])?a=arguments[0]:b=arguments[0]),a instanceof d.Element&&(a=a.elt),a instanceof HTMLCanvasElement||(a=null),c||(c=d.prototype._checkFileExtension(b,c)[1],\"\"===c&&(c=\"png\")),a||this._curElement&&this._curElement.elt&&(a=this._curElement.elt),d.prototype._isSafari()){var e=\"Hello, Safari user!\\n\";e+=\"Now capturing a screenshot...\\n\",e+=\"To save this image,\\n\",e+=\"go to File --> Save As.\\n\",alert(e),window.location.href=a.toDataURL();}else{var f;if(\"undefined\"==typeof c)c=\"png\",f=\"image/png\";else switch(c){case\"png\":f=\"image/png\";break;case\"jpeg\":f=\"image/jpeg\";break;case\"jpg\":f=\"image/jpeg\";break;default:f=\"image/png\";}var g=\"image/octet-stream\",h=a.toDataURL(f);h=h.replace(f,g),d.prototype.downloadFile(h,b,c);}},d.prototype.saveFrames=function(a,b,c,f,g){var h=c||3;h=d.prototype.constrain(h,0,15),h=1e3*h;var i=f||15;i=d.prototype.constrain(i,0,22);var j=0,k=d.prototype._makeFrame,l=this._curElement.elt,m=setInterval(function(){k(a+j,b,l),j++;},1e3/i);setTimeout(function(){if(clearInterval(m),g)g(e);else for(var a=0;a<e.length;a++){var b=e[a];d.prototype.downloadFile(b.imageData,b.filename,b.ext);}e=[];},h+.01);},d.prototype._makeFrame=function(a,b,c){var d;d=this?this._curElement.elt:c;var f;if(b)switch(b.toLowerCase()){case\"png\":f=\"image/png\";break;case\"jpeg\":f=\"image/jpeg\";break;case\"jpg\":f=\"image/jpeg\";break;default:f=\"image/png\";}else b=\"png\",f=\"image/png\";var g=\"image/octet-stream\",h=d.toDataURL(f);h=h.replace(f,g);var i={};i.imageData=h,i.filename=a,i.ext=b,e.push(i);},b.exports=d;},{\"../core/core\":49}],68:[function(a,b,c){\"use strict\";function d(a,b){return a>0&&b>a?a:b;}var e=a(\"../core/core\"),f=a(\"./filters\"),g=a(\"../core/canvas\"),h=a(\"../core/constants\");a(\"../core/error_helpers\"),e.prototype.loadImage=function(a,b,c){var d=new Image(),f=new e.Image(1,1,this),g=e._getDecrementPreload.apply(this,arguments);return d.onload=function(){f.width=f.canvas.width=d.width,f.height=f.canvas.height=d.height,f.drawingContext.drawImage(d,0,0),\"function\"==typeof b&&b(f),g&&b!==g&&g();},d.onerror=function(a){e._friendlyFileLoadError(0,d.src),\"function\"==typeof c&&c!==g&&c(a);},0!==a.indexOf(\"data:image/\")&&(d.crossOrigin=\"Anonymous\"),d.src=a,f;},e.prototype.image=function(a,b,c,e,f,h,i,j,k){if(arguments.length<=5){if(h=b||0,i=c||0,b=0,c=0,a.elt&&a.elt.videoWidth&&!a.canvas){var l=a.elt.videoWidth,m=a.elt.videoHeight;j=e||a.elt.width,k=f||a.elt.width*m/l,e=l,f=m;}else j=e||a.width,k=f||a.height,e=a.width,f=a.height;}else{if(9!==arguments.length)throw\"Wrong number of arguments to image()\";b=b||0,c=c||0,e=d(e,a.width),f=d(f,a.height),h=h||0,i=i||0,j=j||a.width,k=k||a.height;}var n=g.modeAdjust(h,i,j,k,this._renderer._imageMode);this._renderer.image(a,b,c,e,f,n.x,n.y,n.w,n.h);},e.prototype.tint=function(){var a=this.color.apply(this,arguments);this._renderer._tint=a.levels;},e.prototype.noTint=function(){this._renderer._tint=null;},e.prototype._getTintedImageCanvas=function(a){if(!a.canvas)return a;var b=f._toPixels(a.canvas),c=document.createElement(\"canvas\");c.width=a.canvas.width,c.height=a.canvas.height;for(var d=c.getContext(\"2d\"),e=d.createImageData(a.canvas.width,a.canvas.height),g=e.data,h=0;h<b.length;h+=4){var i=b[h],j=b[h+1],k=b[h+2],l=b[h+3];g[h]=i*this._renderer._tint[0]/255,g[h+1]=j*this._renderer._tint[1]/255,g[h+2]=k*this._renderer._tint[2]/255,g[h+3]=l*this._renderer._tint[3]/255;}return d.putImageData(e,0,0),c;},e.prototype.imageMode=function(a){(a===h.CORNER||a===h.CORNERS||a===h.CENTER)&&(this._renderer._imageMode=a);},b.exports=e;},{\"../core/canvas\":47,\"../core/constants\":48,\"../core/core\":49,\"../core/error_helpers\":52,\"./filters\":66}],69:[function(a,b,c){\"use strict\";var d=a(\"../core/core\"),e=a(\"./filters\");d.Image=function(a,b){this.width=a,this.height=b,this.canvas=document.createElement(\"canvas\"),this.canvas.width=this.width,this.canvas.height=this.height,this.drawingContext=this.canvas.getContext(\"2d\"),this._pixelDensity=1,this.isTexture=!1,this.pixels=[];},d.Image.prototype._setProperty=function(a,b){this[a]=b;},d.Image.prototype.loadPixels=function(){d.Renderer2D.prototype.loadPixels.call(this);},d.Image.prototype.updatePixels=function(a,b,c,e){d.Renderer2D.prototype.updatePixels.call(this,a,b,c,e);},d.Image.prototype.get=function(a,b,c,e){return d.Renderer2D.prototype.get.call(this,a,b,c,e);},d.Image.prototype.set=function(a,b,c){d.Renderer2D.prototype.set.call(this,a,b,c);},d.Image.prototype.resize=function(a,b){0===a&&0===b?(a=this.canvas.width,b=this.canvas.height):0===a?a=this.canvas.width*b/this.canvas.height:0===b&&(b=this.canvas.height*a/this.canvas.width);var c=document.createElement(\"canvas\");c.width=a,c.height=b,c.getContext(\"2d\").drawImage(this.canvas,0,0,this.canvas.width,this.canvas.height,0,0,c.width,c.height),this.canvas.width=this.width=a,this.canvas.height=this.height=b,this.drawingContext.drawImage(c,0,0,a,b,0,0,a,b),this.pixels.length>0&&this.loadPixels();},d.Image.prototype.copy=function(){d.prototype.copy.apply(this,arguments);},d.Image.prototype.mask=function(a){void 0===a&&(a=this);var b=this.drawingContext.globalCompositeOperation,c=1;a instanceof d.Renderer&&(c=a._pInst._pixelDensity);var e=[a,0,0,c*a.width,c*a.height,0,0,this.width,this.height];this.drawingContext.globalCompositeOperation=\"destination-in\",this.copy.apply(this,e),this.drawingContext.globalCompositeOperation=b;},d.Image.prototype.filter=function(a,b){e.apply(this.canvas,e[a.toLowerCase()],b);},d.Image.prototype.blend=function(){d.prototype.blend.apply(this,arguments);},d.Image.prototype.save=function(a,b){var c;if(b)switch(b.toLowerCase()){case\"png\":c=\"image/png\";break;case\"jpeg\":c=\"image/jpeg\";break;case\"jpg\":c=\"image/jpeg\";break;default:c=\"image/png\";}else b=\"png\",c=\"image/png\";var e=\"image/octet-stream\",f=this.canvas.toDataURL(c);f=f.replace(c,e),d.prototype.downloadFile(f,a,b);},d.Image.prototype.createTexture=function(a){return this;},b.exports=d.Image;},{\"../core/core\":49,\"./filters\":66}],70:[function(a,b,c){\"use strict\";var d=a(\"../core/core\"),e=a(\"./filters\");a(\"../color/p5.Color\"),d.prototype.pixels=[],d.prototype.blend=function(){this._renderer?this._renderer.blend.apply(this._renderer,arguments):d.Renderer2D.prototype.blend.apply(this,arguments);},d.prototype.copy=function(){d.Renderer2D._copyHelper.apply(this,arguments);},d.prototype.filter=function(a,b){e.apply(this.canvas,e[a.toLowerCase()],b);},d.prototype.get=function(a,b,c,d){return this._renderer.get(a,b,c,d);},d.prototype.loadPixels=function(){this._renderer.loadPixels();},d.prototype.set=function(a,b,c){this._renderer.set(a,b,c);},d.prototype.updatePixels=function(a,b,c,d){0!==this.pixels.length&&this._renderer.updatePixels(a,b,c,d);},b.exports=d;},{\"../color/p5.Color\":43,\"../core/core\":49,\"./filters\":66}],71:[function(a,b,c){\"use strict\";function d(a,b){var c={};if(b=b||[],\"undefined\"==typeof b)for(var d=0;d<a.length;d++){b[d.toString()]=d;}for(var e=0;e<b.length;e++){var f=b[e],g=a[e];c[f]=g;}return c;}function e(a){return a.replace(/&/g,\"&amp;\").replace(/</g,\"&lt;\").replace(/>/g,\"&gt;\").replace(/\"/g,\"&quot;\").replace(/'/g,\"&#039;\");}function f(a,b){b&&b!==!0&&\"true\"!==b||(b=\"\"),a||(a=\"untitled\");var c=\"\";return a&&a.indexOf(\".\")>-1&&(c=a.split(\".\").pop()),b&&c!==b&&(c=b,a=a+\".\"+c),[a,c];}function g(a){document.body.removeChild(a.target);}var h=a(\"../core/core\"),i=a(\"reqwest\"),j=a(\"opentype.js\");a(\"../core/error_helpers\"),h._getDecrementPreload=function(){var a=arguments[arguments.length-1];return(window.preload||this&&this.preload)&&\"function\"==typeof a?a:null;},h.prototype.loadFont=function(a,b,c){var d=new h.Font(this),e=h._getDecrementPreload.apply(this,arguments);return j.load(a,function(f,g){if(f){if(\"undefined\"!=typeof c&&c!==e)return c(f);throw f;}d.font=g,\"undefined\"!=typeof b&&b(d),e&&b!==e&&e();var h,i,j=[\"ttf\",\"otf\",\"woff\",\"woff2\"],k=a.split(\"\\\\\").pop().split(\"/\").pop(),l=k.lastIndexOf(\".\"),m=1>l?null:k.substr(l+1);j.indexOf(m)>-1&&(h=k.substr(0,l),i=document.createElement(\"style\"),i.appendChild(document.createTextNode(\"\\n@font-face {\\nfont-family: \"+h+\";\\nsrc: url(\"+a+\");\\n}\\n\")),document.head.appendChild(i));}),d;},h.prototype.createInput=function(){throw\"not yet implemented\";},h.prototype.createReader=function(){throw\"not yet implemented\";},h.prototype.loadBytes=function(){throw\"not yet implemented\";},h.prototype.loadJSON=function(){for(var a,b=arguments[0],c=arguments[1],d=h._getDecrementPreload.apply(this,arguments),e=[],f=\"json\",g=2;g<arguments.length;g++){var j=arguments[g];\"string\"==typeof j?(\"jsonp\"===j||\"json\"===j)&&(f=j):\"function\"==typeof j&&(a=j);}return i({url:b,type:f,crossOrigin:!0,error:function error(b){a?a(b):console.log(b.statusText);},success:function success(a){for(var b in a){e[b]=a[b];}\"undefined\"!=typeof c&&c(a),d&&c!==d&&d();}}),e;},h.prototype.loadStrings=function(a,b,c){var d=[],e=new XMLHttpRequest(),f=h._getDecrementPreload.apply(this,arguments);return e.addEventListener(\"error\",function(a){c?c(a):console.log(a.responseText);}),e.open(\"GET\",a,!0),e.onreadystatechange=function(){if(4===e.readyState)if(200===e.status){var a=e.responseText.match(/[^\\r\\n]+/g);for(var g in a){d[g]=a[g];}\"undefined\"!=typeof b&&b(d),f&&b!==f&&f();}else c?c(e):console.log(e.statusText);},e.send(null),d;},h.prototype.loadTable=function(a){for(var b=null,c=[],e=!1,f=\",\",g=!1,j=h._getDecrementPreload.apply(this,arguments),k=1;k<arguments.length;k++){if(\"function\"==typeof arguments[k]&&arguments[k]!==j)b=arguments[k];else if(\"string\"==typeof arguments[k])if(c.push(arguments[k]),\"header\"===arguments[k]&&(e=!0),\"csv\"===arguments[k]){if(g)throw new Error(\"Cannot set multiple separator types.\");f=\",\",g=!0;}else if(\"tsv\"===arguments[k]){if(g)throw new Error(\"Cannot set multiple separator types.\");f=\"\t\",g=!0;}}var l=new h.Table();return i({url:a,crossOrigin:!0,type:\"csv\"}).then(function(a){a=a.responseText;for(var c,g={},i=0,m=1,n=2,o=4,p='\"',q=\"\\r\",r=\"\\n\",s=[],t=0,u=null,v=function v(){g.escaped=!1,u=[],x();},w=function w(){g.currentState=o,s.push(u),u=null;},x=function x(){g.currentState=i,g.token=\"\";},y=function y(){u.push(g.token),x();};;){if(c=a[t++],null==c){if(g.escaped)throw new Error(\"Unclosed quote in file.\");if(u){y(),w();break;}}if(null===u&&v(),g.currentState===i){if(c===p){g.escaped=!0,g.currentState=m;continue;}g.currentState=m;}g.currentState===m&&g.escaped?c===p?a[t]===p?(g.token+=p,t++):(g.escaped=!1,g.currentState=n):g.token+=c:c===q?(a[t]===r&&t++,y(),w()):c===r?(y(),w()):c===f?y():g.currentState===m&&(g.token+=c);}if(e)l.columns=s.shift();else for(k=0;k<s[0].length;k++){l.columns[k]=\"null\";}var z;for(k=0;k<s.length&&(k!==s.length-1||1!==s[k].length||\"undefined\"!==s[k][0]);k++){z=new h.TableRow(),z.arr=s[k],z.obj=d(s[k],l.columns),l.addRow(z);}null!==b&&b(l),j&&b!==j&&j();}).fail(function(c,d){h._friendlyFileLoadError(2,a),\"undefined\"!=typeof b&&b!==j&&b(!1);}),l;},h.prototype.parseXML=function(a){var b,c=new h.XML();if(a.children.length){for(b=0;b<a.children.length;b++){var d=parseXML(a.children[b]);c.addChild(d);}c.setName(a.nodeName),c._setCont(a.textContent),c._setAttributes(a);for(var e=0;e<c.children.length;e++){c.children[e].parent=c;}return c;}return c.setName(a.nodeName),c._setCont(a.textContent),c._setAttributes(a),c;},h.prototype.loadXML=function(a,b,c){var d={},e=h._getDecrementPreload.apply(this,arguments);return i({url:a,type:\"xml\",crossOrigin:!0,error:function error(a){c?c(a):console.log(a.statusText);}}).then(function(a){var c=parseXML(a.documentElement);for(var f in c){d[f]=c[f];}\"undefined\"!=typeof b&&b(d),e&&b!==e&&e();}),d;},h.prototype.selectFolder=function(){throw\"not yet implemented\";},h.prototype.selectInput=function(){throw\"not yet implemented\";},h.prototype.httpGet=function(){var a=Array.prototype.slice.call(arguments);a.push(\"GET\"),h.prototype.httpDo.apply(this,a);},h.prototype.httpPost=function(){var a=Array.prototype.slice.call(arguments);a.push(\"POST\"),h.prototype.httpDo.apply(this,a);},h.prototype.httpDo=function(){if(\"object\"==_typeof(arguments[0]))i(arguments[0]);else{for(var a,b,c=\"GET\",d=arguments[0],e={},f=\"\",g=1;g<arguments.length;g++){var h=arguments[g];\"string\"==typeof h?\"GET\"===h||\"POST\"===h||\"PUT\"===h?c=h:f=h:\"object\"==(typeof h===\"undefined\"?\"undefined\":_typeof(h))?e=h:\"function\"==typeof h&&(a?b=h:a=h);}\"\"===f&&(f=-1!==d.indexOf(\"json\")?\"json\":-1!==d.indexOf(\"xml\")?\"xml\":\"text\"),i({url:d,method:c,data:e,type:f,crossOrigin:!0,success:function success(b){\"undefined\"!=typeof a&&a(\"text\"===f?b.response:b);},error:function error(a){b?b(a):console.log(a.statusText);}});}},window.URL=window.URL||window.webkitURL,h.prototype._pWriters=[],h.prototype.beginRaw=function(){throw\"not yet implemented\";},h.prototype.beginRecord=function(){throw\"not yet implemented\";},h.prototype.createOutput=function(){throw\"not yet implemented\";},h.prototype.createWriter=function(a,b){var c;for(var d in h.prototype._pWriters){if(h.prototype._pWriters[d].name===a)return c=new h.PrintWriter(a+window.millis(),b),h.prototype._pWriters.push(c),c;}return c=new h.PrintWriter(a,b),h.prototype._pWriters.push(c),c;},h.prototype.endRaw=function(){throw\"not yet implemented\";},h.prototype.endRecord=function(){throw\"not yet implemented\";},h.PrintWriter=function(a,b){var c=this;this.name=a,this.content=\"\",this.print=function(a){this.content+=a;},this.println=function(a){this.content+=a+\"\\n\";},this.flush=function(){this.content=\"\";},this.close=function(){var d=[];d.push(this.content),h.prototype.writeFile(d,a,b);for(var e in h.prototype._pWriters){h.prototype._pWriters[e].name===this.name&&h.prototype._pWriters.splice(e,1);}c.flush(),c={};};},h.prototype.saveBytes=function(){throw\"not yet implemented\";},h.prototype.save=function(a,b,c){var d=arguments,e=this._curElement.elt;if(0===d.length)return void h.prototype.saveCanvas(e);if(d[0]instanceof h.Renderer||d[0]instanceof h.Graphics)return void h.prototype.saveCanvas(d[0].elt,d[1],d[2]);if(1===d.length&&\"string\"==typeof d[0])h.prototype.saveCanvas(e,d[0]);else{var g=f(d[1],d[2])[1];switch(g){case\"json\":return void h.prototype.saveJSON(d[0],d[1],d[2]);case\"txt\":return void h.prototype.saveStrings(d[0],d[1],d[2]);default:d[0]instanceof Array?h.prototype.saveStrings(d[0],d[1],d[2]):d[0]instanceof h.Table?h.prototype.saveTable(d[0],d[1],d[2],d[3]):d[0]instanceof h.Image?h.prototype.saveCanvas(d[0].canvas,d[1]):d[0]instanceof h.SoundFile&&h.prototype.saveSound(d[0],d[1],d[2],d[3]);}}},h.prototype.saveJSON=function(a,b,c){var d;d=c?JSON.stringify(a):JSON.stringify(a,void 0,2),console.log(d),this.saveStrings(d.split(\"\\n\"),b,\"json\");},h.prototype.saveJSONObject=h.prototype.saveJSON,h.prototype.saveJSONArray=h.prototype.saveJSON,h.prototype.saveStream=function(){throw\"not yet implemented\";},h.prototype.saveStrings=function(a,b,c){for(var d=c||\"txt\",e=this.createWriter(b,d),f=0;f<a.length;f++){f<a.length-1?e.println(a[f]):e.print(a[f]);}e.close(),e.flush();},h.prototype.saveXML=function(){throw\"not yet implemented\";},h.prototype.selectOutput=function(){throw\"not yet implemented\";},h.prototype.saveTable=function(a,b,c){var d=this.createWriter(b,c),f=a.columns,g=\",\";if(\"tsv\"===c&&(g=\"\t\"),\"html\"!==c){if(\"0\"!==f[0])for(var h=0;h<f.length;h++){h<f.length-1?d.print(f[h]+g):d.println(f[h]);}for(var i=0;i<a.rows.length;i++){var j;for(j=0;j<a.rows[i].arr.length;j++){j<a.rows[i].arr.length-1?d.print(a.rows[i].arr[j]+g):i<a.rows.length-1?d.println(a.rows[i].arr[j]):d.print(a.rows[i].arr[j]);}}}else{d.println(\"<html>\"),d.println(\"<head>\");var k='  <meta http-equiv=\"content-type\" content';if(k+='=\"text/html;charset=utf-8\" />',d.println(k),d.println(\"</head>\"),d.println(\"<body>\"),d.println(\"  <table>\"),\"0\"!==f[0]){d.println(\"    <tr>\");for(var l=0;l<f.length;l++){var m=e(f[l]);d.println(\"      <td>\"+m),d.println(\"      </td>\");}d.println(\"    </tr>\");}for(var n=0;n<a.rows.length;n++){d.println(\"    <tr>\");for(var o=0;o<a.columns.length;o++){var p=a.rows[n].getString(o),q=e(p);d.println(\"      <td>\"+q),d.println(\"      </td>\");}d.println(\"    </tr>\");}d.println(\"  </table>\"),d.println(\"</body>\"),d.print(\"</html>\");}d.close(),d.flush();},h.prototype.writeFile=function(a,b,c){var d=\"application/octet-stream\";h.prototype._isSafari()&&(d=\"text/plain\");var e=new Blob(a,{type:d}),f=window.URL.createObjectURL(e);h.prototype.downloadFile(f,b,c);},h.prototype.downloadFile=function(a,b,c){var d=f(b,c),e=d[0],i=d[1],j=document.createElement(\"a\");if(j.href=a,j.download=e,j.onclick=g,j.style.display=\"none\",document.body.appendChild(j),h.prototype._isSafari()){var k=\"Hello, Safari user! To download this file...\\n\";k+=\"1. Go to File --> Save As.\\n\",k+='2. Choose \"Page Source\" as the Format.\\n',k+='3. Name it with this extension: .\"'+i+'\"',alert(k);}j.click(),a=null;},h.prototype._checkFileExtension=f,h.prototype._isSafari=function(){var a=Object.prototype.toString.call(window.HTMLElement);return a.indexOf(\"Constructor\")>0;},b.exports=h;},{\"../core/core\":49,\"../core/error_helpers\":52,\"opentype.js\":8,reqwest:27}],72:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");d.Table=function(a){this.columns=[],this.rows=[];},d.Table.prototype.addRow=function(a){var b=a||new d.TableRow();if(\"undefined\"==typeof b.arr||\"undefined\"==typeof b.obj)throw\"invalid TableRow: \"+b;return b.table=this,this.rows.push(b),b;},d.Table.prototype.removeRow=function(a){this.rows[a].table=null;var b=this.rows.splice(a+1,this.rows.length);this.rows.pop(),this.rows=this.rows.concat(b);},d.Table.prototype.getRow=function(a){return this.rows[a];},d.Table.prototype.getRows=function(){return this.rows;},d.Table.prototype.findRow=function(a,b){if(\"string\"==typeof b){for(var c=0;c<this.rows.length;c++){if(this.rows[c].obj[b]===a)return this.rows[c];}}else for(var d=0;d<this.rows.length;d++){if(this.rows[d].arr[b]===a)return this.rows[d];}return null;},d.Table.prototype.findRows=function(a,b){var c=[];if(\"string\"==typeof b)for(var d=0;d<this.rows.length;d++){this.rows[d].obj[b]===a&&c.push(this.rows[d]);}else for(var e=0;e<this.rows.length;e++){this.rows[e].arr[b]===a&&c.push(this.rows[e]);}return c;},d.Table.prototype.matchRow=function(a,b){if(\"number\"==typeof b){for(var c=0;c<this.rows.length;c++){if(this.rows[c].arr[b].match(a))return this.rows[c];}}else for(var d=0;d<this.rows.length;d++){if(this.rows[d].obj[b].match(a))return this.rows[d];}return null;},d.Table.prototype.matchRows=function(a,b){var c=[];if(\"number\"==typeof b)for(var d=0;d<this.rows.length;d++){this.rows[d].arr[b].match(a)&&c.push(this.rows[d]);}else for(var e=0;e<this.rows.length;e++){this.rows[e].obj[b].match(a)&&c.push(this.rows[e]);}return c;},d.Table.prototype.getColumn=function(a){var b=[];if(\"string\"==typeof a)for(var c=0;c<this.rows.length;c++){b.push(this.rows[c].obj[a]);}else for(var d=0;d<this.rows.length;d++){b.push(this.rows[d].arr[a]);}return b;},d.Table.prototype.clearRows=function(){delete this.rows,this.rows=[];},d.Table.prototype.addColumn=function(a){var b=a||null;this.columns.push(b);},d.Table.prototype.getColumnCount=function(){return this.columns.length;},d.Table.prototype.getRowCount=function(){return this.rows.length;},d.Table.prototype.removeTokens=function(a,b){for(var c=function c(a){return a.replace(/[-\\/\\\\^$*+?.()|[\\]{}]/g,\"\\\\$&\");},d=[],e=0;e<a.length;e++){d.push(c(a.charAt(e)));}var f=new RegExp(d.join(\"|\"),\"g\");if(\"undefined\"==typeof b)for(var g=0;g<this.columns.length;g++){for(var h=0;h<this.rows.length;h++){var i=this.rows[h].arr[g];i=i.replace(f,\"\"),this.rows[h].arr[g]=i,this.rows[h].obj[this.columns[g]]=i;}}else if(\"string\"==typeof b)for(var j=0;j<this.rows.length;j++){var k=this.rows[j].obj[b];k=k.replace(f,\"\"),this.rows[j].obj[b]=k;var l=this.columns.indexOf(b);this.rows[j].arr[l]=k;}else for(var m=0;m<this.rows.length;m++){var n=this.rows[m].arr[b];n=n.replace(f,\"\"),this.rows[m].arr[b]=n,this.rows[m].obj[this.columns[b]]=n;}},d.Table.prototype.trim=function(a){var b=new RegExp(\" \",\"g\");if(\"undefined\"==typeof a)for(var c=0;c<this.columns.length;c++){for(var d=0;d<this.rows.length;d++){var e=this.rows[d].arr[c];e=e.replace(b,\"\"),this.rows[d].arr[c]=e,this.rows[d].obj[this.columns[c]]=e;}}else if(\"string\"==typeof a)for(var f=0;f<this.rows.length;f++){var g=this.rows[f].obj[a];g=g.replace(b,\"\"),this.rows[f].obj[a]=g;var h=this.columns.indexOf(a);this.rows[f].arr[h]=g;}else for(var i=0;i<this.rows.length;i++){var j=this.rows[i].arr[a];j=j.replace(b,\"\"),this.rows[i].arr[a]=j,this.rows[i].obj[this.columns[a]]=j;}},d.Table.prototype.removeColumn=function(a){var b,c;\"string\"==typeof a?(b=a,c=this.columns.indexOf(a),console.log(\"string\")):(c=a,b=this.columns[a]);var d=this.columns.splice(c+1,this.columns.length);this.columns.pop(),this.columns=this.columns.concat(d);for(var e=0;e<this.rows.length;e++){var f=this.rows[e].arr,g=f.splice(c+1,f.length);f.pop(),this.rows[e].arr=f.concat(g),delete this.rows[e].obj[b];}},d.Table.prototype.set=function(a,b,c){this.rows[a].set(b,c);},d.Table.prototype.setNum=function(a,b,c){this.rows[a].setNum(b,c);},d.Table.prototype.setString=function(a,b,c){this.rows[a].setString(b,c);},d.Table.prototype.get=function(a,b){return this.rows[a].get(b);},d.Table.prototype.getNum=function(a,b){return this.rows[a].getNum(b);},d.Table.prototype.getString=function(a,b){return this.rows[a].getString(b);},d.Table.prototype.getObject=function(a){for(var b,c,d,e={},f=0;f<this.rows.length;f++){if(b=this.rows[f].obj,\"string\"==typeof a){if(c=this.columns.indexOf(a),!(c>=0))throw'This table has no column named \"'+a+'\"';d=b[a],e[d]=b;}else e[f]=this.rows[f].obj;}return e;},d.Table.prototype.getArray=function(){for(var a=[],b=0;b<this.rows.length;b++){a.push(this.rows[b].arr);}return a;},b.exports=d.Table;},{\"../core/core\":49}],73:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");d.TableRow=function(a,b){var c=[],d={};a&&(b=b||\",\",c=a.split(b));for(var e=0;e<c.length;e++){var f=e,g=c[e];d[f]=g;}this.arr=c,this.obj=d,this.table=null;},d.TableRow.prototype.set=function(a,b){if(\"string\"==typeof a){var c=this.table.columns.indexOf(a);if(!(c>=0))throw'This table has no column named \"'+a+'\"';this.obj[a]=b,this.arr[c]=b;}else{if(!(a<this.table.columns.length))throw\"Column #\"+a+\" is out of the range of this table\";this.arr[a]=b;var d=this.table.columns[a];this.obj[d]=b;}},d.TableRow.prototype.setNum=function(a,b){var c=parseFloat(b,10);this.set(a,c);},d.TableRow.prototype.setString=function(a,b){var c=b.toString();this.set(a,c);},d.TableRow.prototype.get=function(a){return\"string\"==typeof a?this.obj[a]:this.arr[a];},d.TableRow.prototype.getNum=function(a){var b;if(b=\"string\"==typeof a?parseFloat(this.obj[a],10):parseFloat(this.arr[a],10),\"NaN\"===b.toString())throw\"Error: \"+this.obj[a]+\" is NaN (Not a Number)\";return b;},d.TableRow.prototype.getString=function(a){return\"string\"==typeof a?this.obj[a].toString():this.arr[a].toString();},b.exports=d.TableRow;},{\"../core/core\":49}],74:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");d.XML=function(){this.name=null,this.attributes={},this.children=[],this.parent=null,this.content=null;},d.XML.prototype.getParent=function(){return this.parent;},d.XML.prototype.getName=function(){return this.name;},d.XML.prototype.setName=function(a){this.name=a;},d.XML.prototype.hasChildren=function(){return this.children.length>0;},d.XML.prototype.listChildren=function(){return this.children.map(function(a){return a.name;});},d.XML.prototype.getChildren=function(a){return a?this.children.filter(function(b){return b.name===a;}):this.children;},d.XML.prototype.getChild=function(a){return\"string\"==typeof a?this.children.find(function(b){return b.name===a;}):this.children[a];},d.XML.prototype.addChild=function(a){a instanceof d.XML&&this.children.push(a);},d.XML.prototype.removeChild=function(a){var b=-1;if(\"string\"==typeof a){for(var c=0;c<this.children.length;c++){if(this.children[c].name===a){b=c;break;}}}else b=a;-1!==b&&this.children.splice(b,1);},d.XML.prototype.getAttributeCount=function(){return Object.keys(this.attributes).length;},d.XML.prototype.listAttributes=function(){return Object.keys(this.attributes);},d.XML.prototype.hasAttribute=function(a){return this.attributes[a]?!0:!1;},d.XML.prototype.getNumber=function(a,b){return Number(this.attributes[a])||b||0;},d.XML.prototype.getString=function(a,b){return String(this.attributes[a])||b||null;},d.XML.prototype.setAttribute=function(a,b){this.attributes[a]&&(this.attributes[a]=b);},d.XML.prototype.getContent=function(a){return this.content||a||null;},d.XML.prototype.setContent=function(a){this.children.length||(this.content=a);},d.XML.prototype._setCont=function(a){var b;b=a,b=b.replace(/\\s\\s+/g,\",\"),this.content=b;},d.XML.prototype._setAttributes=function(a){var b,c={};for(b=0;b<a.attributes.length;b++){c[a.attributes[b].nodeName]=a.attributes[b].nodeValue;}this.attributes=c;},b.exports=d.XML;},{\"../core/core\":49}],75:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");d.prototype.abs=Math.abs,d.prototype.ceil=Math.ceil,d.prototype.constrain=function(a,b,c){return Math.max(Math.min(a,c),b);},d.prototype.dist=function(a,b,c,d,e,f){return 4===arguments.length?Math.sqrt((c-a)*(c-a)+(d-b)*(d-b)):6===arguments.length?Math.sqrt((d-a)*(d-a)+(e-b)*(e-b)+(f-c)*(f-c)):void 0;},d.prototype.exp=Math.exp,d.prototype.floor=Math.floor,d.prototype.lerp=function(a,b,c){return c*(b-a)+a;},d.prototype.log=Math.log,d.prototype.mag=function(a,b){return Math.sqrt(a*a+b*b);},d.prototype.map=function(a,b,c,d,e){return(a-b)/(c-b)*(e-d)+d;},d.prototype.max=function(){return arguments[0]instanceof Array?Math.max.apply(null,arguments[0]):Math.max.apply(null,arguments);},d.prototype.min=function(){return arguments[0]instanceof Array?Math.min.apply(null,arguments[0]):Math.min.apply(null,arguments);},d.prototype.norm=function(a,b,c){return this.map(a,b,c,0,1);},d.prototype.pow=Math.pow,d.prototype.round=Math.round,d.prototype.sq=function(a){return a*a;},d.prototype.sqrt=Math.sqrt,b.exports=d;},{\"../core/core\":49}],76:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");d.prototype.createVector=function(a,b,c){return this instanceof d?new d.Vector(this,arguments):new d.Vector(a,b,c);},b.exports=d;},{\"../core/core\":49}],77:[function(a,b,c){\"use strict\";var d,e=a(\"../core/core\"),f=4,g=1<<f,h=8,i=1<<h,j=4095,k=4,l=.5,m=function m(a){return .5*(1-Math.cos(a*Math.PI));};e.prototype.noise=function(a,b,c){if(b=b||0,c=c||0,null==d){d=new Array(j+1);for(var e=0;j+1>e;e++){d[e]=Math.random();}}0>a&&(a=-a),0>b&&(b=-b),0>c&&(c=-c);for(var n,o,p,q,r,s=Math.floor(a),t=Math.floor(b),u=Math.floor(c),v=a-s,w=b-t,x=c-u,y=0,z=.5,A=0;k>A;A++){var B=s+(t<<f)+(u<<h);n=m(v),o=m(w),p=d[B&j],p+=n*(d[B+1&j]-p),q=d[B+g&j],q+=n*(d[B+g+1&j]-q),p+=o*(q-p),B+=i,q=d[B&j],q+=n*(d[B+1&j]-q),r=d[B+g&j],r+=n*(d[B+g+1&j]-r),q+=o*(r-q),p+=m(x)*(q-p),y+=p*z,z*=l,s<<=1,v*=2,t<<=1,w*=2,u<<=1,x*=2,v>=1&&(s++,v--),w>=1&&(t++,w--),x>=1&&(u++,x--);}return y;},e.prototype.noiseDetail=function(a,b){a>0&&(k=a),b>0&&(l=b);},e.prototype.noiseSeed=function(a){var b=function(){var a,b,c=4294967296,d=1664525,e=1013904223;return{setSeed:function setSeed(d){b=a=(null==d?Math.random()*c:d)>>>0;},getSeed:function getSeed(){return a;},rand:function rand(){return b=(d*b+e)%c,b/c;}};}();b.setSeed(a),d=new Array(j+1);for(var c=0;j+1>c;c++){d[c]=b.rand();}},b.exports=e;},{\"../core/core\":49}],78:[function(a,b,c){\"use strict\";var d=a(\"../core/core\"),e=a(\"./polargeometry\"),f=a(\"../core/constants\");d.Vector=function(){var a,b,c;arguments[0]instanceof d?(this.p5=arguments[0],a=arguments[1][0]||0,b=arguments[1][1]||0,c=arguments[1][2]||0):(a=arguments[0]||0,b=arguments[1]||0,c=arguments[2]||0),this.x=a,this.y=b,this.z=c;},d.Vector.prototype.toString=function(){return\"p5.Vector Object : [\"+this.x+\", \"+this.y+\", \"+this.z+\"]\";},d.Vector.prototype.set=function(a,b,c){return a instanceof d.Vector?(this.x=a.x||0,this.y=a.y||0,this.z=a.z||0,this):a instanceof Array?(this.x=a[0]||0,this.y=a[1]||0,this.z=a[2]||0,this):(this.x=a||0,this.y=b||0,this.z=c||0,this);},d.Vector.prototype.copy=function(){return this.p5?new d.Vector(this.p5,[this.x,this.y,this.z]):new d.Vector(this.x,this.y,this.z);},d.Vector.prototype.add=function(a,b,c){return a instanceof d.Vector?(this.x+=a.x||0,this.y+=a.y||0,this.z+=a.z||0,this):a instanceof Array?(this.x+=a[0]||0,this.y+=a[1]||0,this.z+=a[2]||0,this):(this.x+=a||0,this.y+=b||0,this.z+=c||0,this);},d.Vector.prototype.sub=function(a,b,c){return a instanceof d.Vector?(this.x-=a.x||0,this.y-=a.y||0,this.z-=a.z||0,this):a instanceof Array?(this.x-=a[0]||0,this.y-=a[1]||0,this.z-=a[2]||0,this):(this.x-=a||0,this.y-=b||0,this.z-=c||0,this);},d.Vector.prototype.mult=function(a){return this.x*=a||0,this.y*=a||0,this.z*=a||0,this;},d.Vector.prototype.div=function(a){return this.x/=a,this.y/=a,this.z/=a,this;},d.Vector.prototype.mag=function(){return Math.sqrt(this.magSq());},d.Vector.prototype.magSq=function(){var a=this.x,b=this.y,c=this.z;return a*a+b*b+c*c;},d.Vector.prototype.dot=function(a,b,c){return a instanceof d.Vector?this.dot(a.x,a.y,a.z):this.x*(a||0)+this.y*(b||0)+this.z*(c||0);},d.Vector.prototype.cross=function(a){var b=this.y*a.z-this.z*a.y,c=this.z*a.x-this.x*a.z,e=this.x*a.y-this.y*a.x;return this.p5?new d.Vector(this.p5,[b,c,e]):new d.Vector(b,c,e);},d.Vector.prototype.dist=function(a){var b=a.copy().sub(this);return b.mag();},d.Vector.prototype.normalize=function(){return this.div(this.mag());},d.Vector.prototype.limit=function(a){var b=this.magSq();return b>a*a&&(this.div(Math.sqrt(b)),this.mult(a)),this;},d.Vector.prototype.setMag=function(a){return this.normalize().mult(a);},d.Vector.prototype.heading=function(){var a=Math.atan2(this.y,this.x);return this.p5?this.p5._angleMode===f.RADIANS?a:e.radiansToDegrees(a):a;},d.Vector.prototype.rotate=function(a){this.p5&&this.p5._angleMode===f.DEGREES&&(a=e.degreesToRadians(a));var b=this.heading()+a,c=this.mag();return this.x=Math.cos(b)*c,this.y=Math.sin(b)*c,this;},d.Vector.prototype.lerp=function(a,b,c,e){return a instanceof d.Vector?this.lerp(a.x,a.y,a.z,b):(this.x+=(a-this.x)*e||0,this.y+=(b-this.y)*e||0,this.z+=(c-this.z)*e||0,this);},d.Vector.prototype.array=function(){return[this.x||0,this.y||0,this.z||0];},d.Vector.prototype.equals=function(a,b,c){var e,f,g;return a instanceof d.Vector?(e=a.x||0,f=a.y||0,g=a.z||0):a instanceof Array?(e=a[0]||0,f=a[1]||0,g=a[2]||0):(e=a||0,f=b||0,g=c||0),this.x===e&&this.y===f&&this.z===g;},d.Vector.fromAngle=function(a){return this.p5&&this.p5._angleMode===f.DEGREES&&(a=e.degreesToRadians(a)),this.p5?new d.Vector(this.p5,[Math.cos(a),Math.sin(a),0]):new d.Vector(Math.cos(a),Math.sin(a),0);},d.Vector.random2D=function(){var a;return a=this.p5?this.p5._angleMode===f.DEGREES?this.p5.random(360):this.p5.random(f.TWO_PI):Math.random()*Math.PI*2,this.fromAngle(a);},d.Vector.random3D=function(){var a,b;this.p5?(a=this.p5.random(0,f.TWO_PI),b=this.p5.random(-1,1)):(a=Math.random()*Math.PI*2,b=2*Math.random()-1);var c=Math.sqrt(1-b*b)*Math.cos(a),e=Math.sqrt(1-b*b)*Math.sin(a);return this.p5?new d.Vector(this.p5,[c,e,b]):new d.Vector(c,e,b);},d.Vector.add=function(a,b,c){return c?c.set(a):c=a.copy(),c.add(b),c;},d.Vector.sub=function(a,b,c){return c?c.set(a):c=a.copy(),c.sub(b),c;},d.Vector.mult=function(a,b,c){return c?c.set(a):c=a.copy(),c.mult(b),c;},d.Vector.div=function(a,b,c){return c?c.set(a):c=a.copy(),c.div(b),c;},d.Vector.dot=function(a,b){return a.dot(b);},d.Vector.cross=function(a,b){return a.cross(b);},d.Vector.dist=function(a,b){return a.dist(b);},d.Vector.lerp=function(a,b,c,d){return d?d.set(a):d=a.copy(),d.lerp(b,c),d;},d.Vector.angleBetween=function(a,b){var c=Math.acos(a.dot(b)/(a.mag()*b.mag()));return this.p5&&this.p5._angleMode===f.DEGREES&&(c=e.radiansToDegrees(c)),c;},d.Vector.mag=function(a){var b=a.x,c=a.y,d=a.z,e=b*b+c*c+d*d;return Math.sqrt(e);},b.exports=d.Vector;},{\"../core/constants\":48,\"../core/core\":49,\"./polargeometry\":79}],79:[function(a,b,c){b.exports={degreesToRadians:function degreesToRadians(a){return 2*Math.PI*a/360;},radiansToDegrees:function radiansToDegrees(a){return 360*a/(2*Math.PI);}};},{}],80:[function(a,b,c){\"use strict\";var d=a(\"../core/core\"),e=!1,f=function(){var a,b,c=4294967296,d=1664525,e=1013904223;return{setSeed:function setSeed(d){b=a=(null==d?Math.random()*c:d)>>>0;},getSeed:function getSeed(){return a;},rand:function rand(){return b=(d*b+e)%c,b/c;}};}();d.prototype.randomSeed=function(a){f.setSeed(a),e=!0;},d.prototype.random=function(a,b){var c;if(c=e?f.rand():Math.random(),0===arguments.length)return c;if(1===arguments.length)return c*a;if(a>b){var d=a;a=b,b=d;}return c*(b-a)+a;};var g,h=!1;d.prototype.randomGaussian=function(a,b){var c,d,e,f;if(h)c=g,h=!1;else{do{d=this.random(2)-1,e=this.random(2)-1,f=d*d+e*e;}while(f>=1);f=Math.sqrt(-2*Math.log(f)/f),c=d*f,g=e*f,h=!0;}var i=a||0,j=b||1;return c*j+i;},b.exports=d;},{\"../core/core\":49}],81:[function(a,b,c){\"use strict\";var d=a(\"../core/core\"),e=a(\"./polargeometry\"),f=a(\"../core/constants\");d.prototype._angleMode=f.RADIANS,d.prototype.acos=function(a){return this._angleMode===f.RADIANS?Math.acos(a):e.radiansToDegrees(Math.acos(a));},d.prototype.asin=function(a){return this._angleMode===f.RADIANS?Math.asin(a):e.radiansToDegrees(Math.asin(a));},d.prototype.atan=function(a){return this._angleMode===f.RADIANS?Math.atan(a):e.radiansToDegrees(Math.atan(a));},d.prototype.atan2=function(a,b){return this._angleMode===f.RADIANS?Math.atan2(a,b):e.radiansToDegrees(Math.atan2(a,b));},d.prototype.cos=function(a){return this._angleMode===f.RADIANS?Math.cos(a):Math.cos(this.radians(a));},d.prototype.sin=function(a){return this._angleMode===f.RADIANS?Math.sin(a):Math.sin(this.radians(a));},d.prototype.tan=function(a){return this._angleMode===f.RADIANS?Math.tan(a):Math.tan(this.radians(a));},d.prototype.degrees=function(a){return e.radiansToDegrees(a);},d.prototype.radians=function(a){return e.degreesToRadians(a);},d.prototype.angleMode=function(a){(a===f.DEGREES||a===f.RADIANS)&&(this._angleMode=a);},b.exports=d;},{\"../core/constants\":48,\"../core/core\":49,\"./polargeometry\":79}],82:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");d.prototype.textAlign=function(a,b){return this._renderer.textAlign.apply(this._renderer,arguments);},d.prototype.textLeading=function(a){return this._renderer.textLeading.apply(this._renderer,arguments);},d.prototype.textSize=function(a){return this._renderer.textSize.apply(this._renderer,arguments);},d.prototype.textStyle=function(a){return this._renderer.textStyle.apply(this._renderer,arguments);},d.prototype.textWidth=function(a){return this._renderer.textWidth.apply(this._renderer,arguments);},d.prototype.textAscent=function(){return this._renderer.textAscent();},d.prototype.textDescent=function(){return this._renderer.textDescent();},d.prototype._updateTextMetrics=function(){return this._renderer._updateTextMetrics();},b.exports=d;},{\"../core/core\":49}],83:[function(a,b,c){\"use strict\";var d=a(\"../core/core\"),e=a(\"../core/constants\");a(\"../core/error_helpers\"),d.prototype.text=function(a,b,c,d,e){for(var f=new Array(arguments.length),g=0;g<f.length;++g){f[g]=arguments[g];}return this._validateParameters(\"text\",f,[[\"*\",\"Number\",\"Number\"],[\"*\",\"Number\",\"Number\",\"Number\",\"Number\"]]),this._renderer._doFill||this._renderer._doStroke?this._renderer.text.apply(this._renderer,arguments):this;},d.prototype.textFont=function(a,b){if(arguments.length){if(!a)throw Error(\"null font passed to textFont\");return this._renderer._setProperty(\"_textFont\",a),b&&(this._renderer._setProperty(\"_textSize\",b),this._renderer._setProperty(\"_textLeading\",b*e._DEFAULT_LEADMULT)),this._renderer._applyTextProperties();}return this;},b.exports=d;},{\"../core/constants\":48,\"../core/core\":49,\"../core/error_helpers\":52}],84:[function(a,b,c){\"use strict\";function d(a,b){for(var c=h(b,{sampleFactor:.1,simplifyThreshold:0}),d=n(a,0,1),f=d/(d*c.sampleFactor),g=[],i=0;d>i;i+=f){g.push(n(a,i));}return c.simplifyThreshold&&e(g,c.simplifyThreshold),g;}function e(a,b){b=\"undefined\"==typeof b?0:b;for(var c=0,d=a.length-1;a.length>3&&d>=0;--d){j(i(a,d-1),i(a,d),i(a,d+1),b)&&(a.splice(d%a.length,1),c++);}return c;}function f(a){for(var b,c=[],d=0;d<a.length;d++){\"M\"===a[d].type&&(b&&c.push(b),b=[]),b.push(g(a[d]));}return c.push(b),c;}function g(a){var b=[a.type];return\"M\"===a.type||\"L\"===a.type?b.push(a.x,a.y):\"C\"===a.type?b.push(a.x1,a.y1,a.x2,a.y2,a.x,a.y):\"Q\"===a.type&&b.push(a.x1,a.y1,a.x,a.y),b;}function h(a,b){if(\"object\"!=(typeof a===\"undefined\"?\"undefined\":_typeof(a)))a=b;else for(var c in b){\"undefined\"==typeof a[c]&&(a[c]=b[c]);}return a;}function i(a,b){var c=a.length;return a[0>b?b%c+c:b%c];}function j(a,b,c,d){if(!d)return 0===k(a,b,c);\"undefined\"==typeof j.tmpPoint1&&(j.tmpPoint1=[],j.tmpPoint2=[]);var e=j.tmpPoint1,f=j.tmpPoint2;e.x=b.x-a.x,e.y=b.y-a.y,f.x=c.x-b.x,f.y=c.y-b.y;var g=e.x*f.x+e.y*f.y,h=Math.sqrt(e.x*e.x+e.y*e.y),i=Math.sqrt(f.x*f.x+f.y*f.y),l=Math.acos(g/(h*i));return d>l;}function k(a,b,c){return(b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1]);}function l(a,b,c,d,e,f,g,h,i){var j=1-i,k=Math.pow(j,3),l=Math.pow(j,2),m=i*i,n=m*i,o=k*a+3*l*i*c+3*j*i*i*e+n*g,p=k*b+3*l*i*d+3*j*i*i*f+n*h,q=a+2*i*(c-a)+m*(e-2*c+a),r=b+2*i*(d-b)+m*(f-2*d+b),s=c+2*i*(e-c)+m*(g-2*e+c),t=d+2*i*(f-d)+m*(h-2*f+d),u=j*a+i*c,v=j*b+i*d,w=j*e+i*g,x=j*f+i*h,y=90-180*Math.atan2(q-s,r-t)/Math.PI;return(q>s||t>r)&&(y+=180),{x:o,y:p,m:{x:q,y:r},n:{x:s,y:t},start:{x:u,y:v},end:{x:w,y:x},alpha:y};}function m(a,b,c,d,e,f,g,h,i){return null==i?u(a,b,c,d,e,f,g,h):l(a,b,c,d,e,f,g,h,v(a,b,c,d,e,f,g,h,i));}function n(a,b,c){a=p(a);for(var d,e,f,g,h,i=\"\",j={},k=0,n=0,o=a.length;o>n;n++){if(f=a[n],\"M\"===f[0])d=+f[1],e=+f[2];else{if(g=m(d,e,f[1],f[2],f[3],f[4],f[5],f[6]),k+g>b&&!c)return h=m(d,e,f[1],f[2],f[3],f[4],f[5],f[6],b-k),{x:h.x,y:h.y,alpha:h.alpha};k+=g,d=+f[5],e=+f[6];}i+=f.shift()+f;}return j.end=i,h=c?k:l(d,e,f[0],f[1],f[2],f[3],f[4],f[5],1),h.alpha&&(h={x:h.x,y:h.y,alpha:h.alpha}),h;}function o(a){var b=[],c=0,d=0,e=0,f=0,g=0;\"M\"===a[0][0]&&(c=+a[0][1],d=+a[0][2],e=c,f=d,g++,b[0]=[\"M\",c,d]);for(var h,i,j,k=3===a.length&&\"M\"===a[0][0]&&\"R\"===a[1][0].toUpperCase()&&\"Z\"===a[2][0].toUpperCase(),l=g,m=a.length;m>l;l++){if(b.push(i=[]),j=a[l],j[0]!==String.prototype.toUpperCase.call(j[0]))switch(i[0]=String.prototype.toUpperCase.call(j[0]),i[0]){case\"A\":i[1]=j[1],i[2]=j[2],i[3]=j[3],i[4]=j[4],i[5]=j[5],i[6]=+(j[6]+c),i[7]=+(j[7]+d);break;case\"V\":i[1]=+j[1]+d;break;case\"H\":i[1]=+j[1]+c;break;case\"R\":h=[c,d].concat(j.slice(1));for(var n=2,o=h.length;o>n;n++){h[n]=+h[n]+c,h[++n]=+h[n]+d;}b.pop(),b=b.concat(r(h,k));break;case\"M\":e=+j[1]+c,f=+j[2]+d;break;default:for(n=1,o=j.length;o>n;n++){i[n]=+j[n]+(n%2?c:d);}}else if(\"R\"===j[0])h=[c,d].concat(j.slice(1)),b.pop(),b=b.concat(r(h,k)),i=[\"R\"].concat(j.slice(-2));else for(var p=0,q=j.length;q>p;p++){i[p]=j[p];}switch(i[0]){case\"Z\":c=e,d=f;break;case\"H\":c=i[1];break;case\"V\":d=i[1];break;case\"M\":e=i[i.length-2],f=i[i.length-1];break;default:c=i[i.length-2],d=i[i.length-1];}}return b;}function p(a,b){for(var c=o(a),d=b&&o(b),e={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},f={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},g=function g(a,b,c){var d,e,f={T:1,Q:1};if(!a)return[\"C\",b.x,b.y,b.x,b.y,b.x,b.y];switch((a[0]in f)||(b.qx=b.qy=null),a[0]){case\"M\":b.X=a[1],b.Y=a[2];break;case\"A\":a=[\"C\"].concat(q.apply(0,[b.x,b.y].concat(a.slice(1))));break;case\"S\":\"C\"===c||\"S\"===c?(d=2*b.x-b.bx,e=2*b.y-b.by):(d=b.x,e=b.y),a=[\"C\",d,e].concat(a.slice(1));break;case\"T\":\"Q\"===c||\"T\"===c?(b.qx=2*b.x-b.qx,b.qy=2*b.y-b.qy):(b.qx=b.x,b.qy=b.y),a=[\"C\"].concat(t(b.x,b.y,b.qx,b.qy,a[1],a[2]));break;case\"Q\":b.qx=a[1],b.qy=a[2],a=[\"C\"].concat(t(b.x,b.y,a[1],a[2],a[3],a[4]));break;case\"L\":a=[\"C\"].concat(s(b.x,b.y,a[1],a[2]));break;case\"H\":a=[\"C\"].concat(s(b.x,b.y,a[1],b.y));break;case\"V\":a=[\"C\"].concat(s(b.x,b.y,b.x,a[1]));break;case\"Z\":a=[\"C\"].concat(s(b.x,b.y,b.X,b.Y));}return a;},h=function h(a,b){if(a[b].length>7){a[b].shift();for(var e=a[b];e.length;){j[b]=\"A\",d&&(k[b]=\"A\"),a.splice(b++,0,[\"C\"].concat(e.splice(0,6)));}a.splice(b,1),p=Math.max(c.length,d&&d.length||0);}},i=function i(a,b,e,f,g){a&&b&&\"M\"===a[g][0]&&\"M\"!==b[g][0]&&(b.splice(g,0,[\"M\",f.x,f.y]),e.bx=0,e.by=0,e.x=a[g][1],e.y=a[g][2],p=Math.max(c.length,d&&d.length||0));},j=[],k=[],l=\"\",m=\"\",n=0,p=Math.max(c.length,d&&d.length||0);p>n;n++){c[n]&&(l=c[n][0]),\"C\"!==l&&(j[n]=l,n&&(m=j[n-1])),c[n]=g(c[n],e,m),\"A\"!==j[n]&&\"C\"===l&&(j[n]=\"C\"),h(c,n),d&&(d[n]&&(l=d[n][0]),\"C\"!==l&&(k[n]=l,n&&(m=k[n-1])),d[n]=g(d[n],f,m),\"A\"!==k[n]&&\"C\"===l&&(k[n]=\"C\"),h(d,n)),i(c,d,e,f,n),i(d,c,f,e,n);var r=c[n],u=d&&d[n],v=r.length,w=d&&u.length;e.x=r[v-2],e.y=r[v-1],e.bx=parseFloat(r[v-4])||e.x,e.by=parseFloat(r[v-3])||e.y,f.bx=d&&(parseFloat(u[w-4])||f.x),f.by=d&&(parseFloat(u[w-3])||f.y),f.x=d&&u[w-2],f.y=d&&u[w-1];}return d?[c,d]:c;}function q(a,b,c,d,e,f,g,h,i,j){var k,l,m,n,o,p=Math.PI,r=120*p/180,s=p/180*(+e||0),t=[],u=function u(a,b,c){var d=a*Math.cos(c)-b*Math.sin(c),e=a*Math.sin(c)+b*Math.cos(c);return{x:d,y:e};};if(j)k=j[0],l=j[1],m=j[2],n=j[3];else{o=u(a,b,-s),a=o.x,b=o.y,o=u(h,i,-s),h=o.x,i=o.y;var v=(a-h)/2,w=(b-i)/2,x=v*v/(c*c)+w*w/(d*d);x>1&&(x=Math.sqrt(x),c=x*c,d=x*d);var y=c*c,z=d*d,A=(f===g?-1:1)*Math.sqrt(Math.abs((y*z-y*w*w-z*v*v)/(y*w*w+z*v*v)));m=A*c*w/d+(a+h)/2,n=A*-d*v/c+(b+i)/2,k=Math.asin(((b-n)/d).toFixed(9)),l=Math.asin(((i-n)/d).toFixed(9)),k=m>a?p-k:k,l=m>h?p-l:l,0>k&&(k=2*p+k),0>l&&(l=2*p+l),g&&k>l&&(k-=2*p),!g&&l>k&&(l-=2*p);}var B=l-k;if(Math.abs(B)>r){var C=l,D=h,E=i;l=k+r*(g&&l>k?1:-1),h=m+c*Math.cos(l),i=n+d*Math.sin(l),t=q(h,i,c,d,e,0,g,D,E,[l,C,m,n]);}B=l-k;var F=Math.cos(k),G=Math.sin(k),H=Math.cos(l),I=Math.sin(l),J=Math.tan(B/4),K=4/3*c*J,L=4/3*d*J,M=[a,b],N=[a+K*G,b-L*F],O=[h+K*I,i-L*H],P=[h,i];if(N[0]=2*M[0]-N[0],N[1]=2*M[1]-N[1],j)return[N,O,P].concat(t);t=[N,O,P].concat(t).join().split(\",\");for(var Q=[],R=0,S=t.length;S>R;R++){Q[R]=R%2?u(t[R-1],t[R],s).y:u(t[R],t[R+1],s).x;}return Q;}function r(a,b){for(var c=[],d=0,e=a.length;e-2*!b>d;d+=2){var f=[{x:+a[d-2],y:+a[d-1]},{x:+a[d],y:+a[d+1]},{x:+a[d+2],y:+a[d+3]},{x:+a[d+4],y:+a[d+5]}];b?d?e-4===d?f[3]={x:+a[0],y:+a[1]}:e-2===d&&(f[2]={x:+a[0],y:+a[1]},f[3]={x:+a[2],y:+a[3]}):f[0]={x:+a[e-2],y:+a[e-1]}:e-4===d?f[3]=f[2]:d||(f[0]={x:+a[d],y:+a[d+1]}),c.push([\"C\",(-f[0].x+6*f[1].x+f[2].x)/6,(-f[0].y+6*f[1].y+f[2].y)/6,(f[1].x+6*f[2].x-f[3].x)/6,(f[1].y+6*f[2].y-f[3].y)/6,f[2].x,f[2].y]);}return c;}function s(a,b,c,d){return[a,b,c,d,c,d];}function t(a,b,c,d,e,f){var g=1/3,h=2/3;return[g*a+h*c,g*b+h*d,g*e+h*c,g*f+h*d,e,f];}function u(a,b,c,d,e,f,g,h,i){null==i&&(i=1),i=i>1?1:0>i?0:i;for(var j=i/2,k=12,l=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],m=0,n=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],o=0;k>o;o++){var p=j*l[o]+j,q=w(p,a,c,e,g),r=w(p,b,d,f,h),s=q*q+r*r;m+=n[o]*Math.sqrt(s);}return j*m;}function v(a,b,c,d,e,f,g,h,i){if(!(0>i||u(a,b,c,d,e,f,g,h)<i)){var j,k=1,l=k/2,m=k-l,n=.01;for(j=u(a,b,c,d,e,f,g,h,m);Math.abs(j-i)>n;){l/=2,m+=(i>j?1:-1)*l,j=u(a,b,c,d,e,f,g,h,m);}return m;}}function w(a,b,c,d,e){var f=-3*b+9*c-9*d+3*e,g=a*f+6*b-12*c+6*d;return a*g-3*b+3*c;}function x(){for(var a=new Array(arguments.length),b=0;b<a.length;++b){a[b]=arguments[b];}b=a.length;for(var c=\"\";b--;){c+=a[b]===Object(a[b])?JSON.stringify(a[b]):a[b];}return c;}var y=a(\"../core/core\"),z=a(\"../core/constants\");y.Font=function(a){this.parent=a,this.cache={},this.font=void 0;},y.Font.prototype.list=function(){throw\"not yet implemented\";},y.Font.prototype.textBounds=function(a,b,c,d,e){b=void 0!==b?b:0,c=void 0!==c?c:0,d=d||this.parent._renderer._textSize;var f=this.cache[x(\"textBounds\",a,b,c,d)];if(!f){var g,h,i,j,k=[],l=[],m=this,n=this._scale(d);this.font.forEachGlyph(a,b,c,d,e,function(a,b,c,e){k.push(b),l.push(c);var f=a.getMetrics();\"space\"!==a.name?(k.push(b+f.xMax*n),l.push(c+-f.yMin*n),l.push(c+-f.yMax*n)):k.push(b+m.font.charToGlyph(\" \").advanceWidth*m._scale(d));}),g=Math.max(0,Math.min.apply(null,k)),h=Math.max(0,Math.min.apply(null,l)),i=Math.max(0,Math.max.apply(null,k)),j=Math.max(0,Math.max.apply(null,l)),f={x:g,y:h,h:j-h,w:i-g,advance:g-b},this.cache[x(\"textBounds\",a,b,c,d)]=f;}return f;},y.Font.prototype.textToPoints=function(a,b,c,e,g){var h=0,i=[],j=this._getGlyphs(a);e=e||this.parent._renderer._textSize;for(var k=0;k<j.length;k++){for(var l=j[k].getPath(b,c,e),m=f(l.commands),n=0;n<m.length;n++){for(var o=d(m[n],g),p=0;p<o.length;p++){o[p].x+=h,i.push(o[p]);}}h+=j[k].advanceWidth*this._scale(e);}return i;},y.Font.prototype._getGlyphs=function(a){return this.font.stringToGlyphs(a);},y.Font.prototype._getPath=function(a,b,c,d){var e=this.parent,f=e._renderer.drawingContext,g=this._handleAlignment(e,f,a,b,c);return this.font.getPath(a,g.x,g.y,e._renderer._textSize,d);},y.Font.prototype._getPathData=function(a,b,c,d){var e=3;return\"string\"==typeof a&&arguments.length>2?a=this._getPath(a,b,c,d):\"object\"==(typeof b===\"undefined\"?\"undefined\":_typeof(b))&&(d=b),d&&\"number\"==typeof d.decimals&&(e=d.decimals),a.toPathData(e);},y.Font.prototype._getSVG=function(a,b,c,d){var e=3;return\"string\"==typeof a&&arguments.length>2?a=this._getPath(a,b,c,d):\"object\"==(typeof b===\"undefined\"?\"undefined\":_typeof(b))&&(d=b),d&&(\"number\"==typeof d.decimals&&(e=d.decimals),\"number\"==typeof d.strokeWidth&&(a.strokeWidth=d.strokeWidth),\"undefined\"!=typeof d.fill&&(a.fill=d.fill),\"undefined\"!=typeof d.stroke&&(a.stroke=d.stroke)),a.toSVG(e);},y.Font.prototype._renderPath=function(a,b,c,d){var e,f=d&&d.renderer||this.parent._renderer,g=f.drawingContext;e=\"object\"==(typeof a===\"undefined\"?\"undefined\":_typeof(a))&&a.commands?a.commands:this._getPath(a,b,c,f._textSize,d).commands,g.beginPath();for(var h=0;h<e.length;h+=1){var i=e[h];\"M\"===i.type?g.moveTo(i.x,i.y):\"L\"===i.type?g.lineTo(i.x,i.y):\"C\"===i.type?g.bezierCurveTo(i.x1,i.y1,i.x2,i.y2,i.x,i.y):\"Q\"===i.type?g.quadraticCurveTo(i.x1,i.y1,i.x,i.y):\"Z\"===i.type&&g.closePath();}return f._doStroke&&f._strokeSet&&g.stroke(),f._doFill&&(g.fillStyle=f._fillSet?g.fillStyle:z._DEFAULT_TEXT_FILL,g.fill()),this;},y.Font.prototype._textWidth=function(a,b){if(\" \"===a)return this.font.charToGlyph(\" \").advanceWidth*this._scale(b);var c=this.textBounds(a,0,0,b);return c.w+c.advance;},y.Font.prototype._textAscent=function(a){return this.font.ascender*this._scale(a);},y.Font.prototype._textDescent=function(a){return-this.font.descender*this._scale(a);},y.Font.prototype._scale=function(a){return 1/this.font.unitsPerEm*(a||this.parent._renderer._textSize);},y.Font.prototype._handleAlignment=function(a,b,c,d,e){var f=this._textWidth(c),g=this._textAscent(),h=this._textDescent(),i=g+h;return b.textAlign===z.CENTER?d-=f/2:b.textAlign===z.RIGHT&&(d-=f),b.textBaseline===z.TOP?e+=i:b.textBaseline===z._CTX_MIDDLE?e+=i/2-h:b.textBaseline===z.BOTTOM&&(e-=h),{x:d,y:e};},b.exports=y.Font;},{\"../core/constants\":48,\"../core/core\":49}],85:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");d.prototype.append=function(a,b){return a.push(b),a;},d.prototype.arrayCopy=function(a,b,c,d,e){var f,g;\"undefined\"!=typeof e?(g=Math.min(e,a.length),f=d,a=a.slice(b,g+b)):(\"undefined\"!=typeof c?(g=c,g=Math.min(g,a.length)):g=a.length,f=0,c=b,a=a.slice(0,g)),Array.prototype.splice.apply(c,[f,g].concat(a));},d.prototype.concat=function(a,b){return a.concat(b);},d.prototype.reverse=function(a){return a.reverse();},d.prototype.shorten=function(a){return a.pop(),a;},d.prototype.shuffle=function(a,b){var c=ArrayBuffer&&ArrayBuffer.isView&&ArrayBuffer.isView(a);a=b||c?a:a.slice();for(var d,e,f=a.length;f>1;){d=Math.random()*f|0,e=a[--f],a[f]=a[d],a[d]=e;}return a;},d.prototype.sort=function(a,b){var c=b?a.slice(0,Math.min(b,a.length)):a,d=b?a.slice(Math.min(b,a.length)):[];return c=\"string\"==typeof c[0]?c.sort():c.sort(function(a,b){return a-b;}),c.concat(d);},d.prototype.splice=function(a,b,c){return Array.prototype.splice.apply(a,[c,0].concat(b)),a;},d.prototype.subset=function(a,b,c){return\"undefined\"!=typeof c?a.slice(b,b+c):a.slice(b,a.length);},b.exports=d;},{\"../core/core\":49}],86:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");d.prototype[\"float\"]=function(a){return parseFloat(a);},d.prototype[\"int\"]=function(a,b){return\"string\"==typeof a?(b=b||10,parseInt(a,b)):\"number\"==typeof a?0|a:\"boolean\"==typeof a?a?1:0:a instanceof Array?a.map(function(a){return d.prototype[\"int\"](a,b);}):void 0;},d.prototype.str=function(a){return a instanceof Array?a.map(d.prototype.str):String(a);},d.prototype[\"boolean\"]=function(a){return\"number\"==typeof a?0!==a:\"string\"==typeof a?\"true\"===a.toLowerCase():\"boolean\"==typeof a?a:a instanceof Array?a.map(d.prototype[\"boolean\"]):void 0;},d.prototype[\"byte\"]=function(a){var b=d.prototype[\"int\"](a,10);return\"number\"==typeof b?(b+128)%256-128:b instanceof Array?b.map(d.prototype[\"byte\"]):void 0;},d.prototype[\"char\"]=function(a){return\"number\"!=typeof a||isNaN(a)?a instanceof Array?a.map(d.prototype[\"char\"]):\"string\"==typeof a?d.prototype[\"char\"](parseInt(a,10)):void 0:String.fromCharCode(a);},d.prototype.unchar=function(a){return\"string\"==typeof a&&1===a.length?a.charCodeAt(0):a instanceof Array?a.map(d.prototype.unchar):void 0;},d.prototype.hex=function(a,b){if(b=void 0===b||null===b?b=8:b,a instanceof Array)return a.map(function(a){return d.prototype.hex(a,b);});if(\"number\"==typeof a){0>a&&(a=4294967295+a+1);for(var c=Number(a).toString(16).toUpperCase();c.length<b;){c=\"0\"+c;}return c.length>=b&&(c=c.substring(c.length-b,c.length)),c;}},d.prototype.unhex=function(a){return a instanceof Array?a.map(d.prototype.unhex):parseInt(\"0x\"+a,16);},b.exports=d;},{\"../core/core\":49}],87:[function(a,b,c){\"use strict\";function d(){var a=arguments[0],b=0>a,c=b?a.toString().substring(1):a.toString(),d=c.indexOf(\".\"),e=-1!==d?c.substring(0,d):c,f=-1!==d?c.substring(d+1):\"\",g=b?\"-\":\"\";if(3===arguments.length){var h=\"\";(-1!==d||arguments[2]-f.length>0)&&(h=\".\"),f.length>arguments[2]&&(f=f.substring(0,arguments[2]));for(var i=0;i<arguments[1]-e.length;i++){g+=\"0\";}g+=e,g+=h,g+=f;for(var j=0;j<arguments[2]-f.length;j++){g+=\"0\";}return g;}for(var k=0;k<Math.max(arguments[1]-e.length,0);k++){g+=\"0\";}return g+=c;}function e(){var a=arguments[0].toString(),b=a.indexOf(\".\"),c=-1!==b?a.substring(b):\"\",d=-1!==b?a.substring(0,b):a;if(d=d.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g,\",\"),0===arguments[1])c=\"\";else if(void 0!==arguments[1])if(arguments[1]>c.length){c+=-1===b?\".\":\"\";for(var e=arguments[1]-c.length+1,f=0;e>f;f++){c+=\"0\";}}else c=c.substring(0,arguments[1]+1);return d+c;}function f(){return parseFloat(arguments[0])>0?\"+\"+arguments[0].toString():arguments[0].toString();}function g(){return parseFloat(arguments[0])>0?\" \"+arguments[0].toString():arguments[0].toString();}var h=a(\"../core/core\");h.prototype.join=function(a,b){return a.join(b);},h.prototype.match=function(a,b){return a.match(b);},h.prototype.matchAll=function(a,b){for(var c=new RegExp(b,\"g\"),d=c.exec(a),e=[];null!==d;){e.push(d),d=c.exec(a);}return e;},h.prototype.nf=function(){if(arguments[0]instanceof Array){var a=arguments[1],b=arguments[2];return arguments[0].map(function(c){return d(c,a,b);});}var c=Object.prototype.toString.call(arguments[0]);return\"[object Arguments]\"===c?3===arguments[0].length?this.nf(arguments[0][0],arguments[0][1],arguments[0][2]):2===arguments[0].length?this.nf(arguments[0][0],arguments[0][1]):this.nf(arguments[0][0]):d.apply(this,arguments);},h.prototype.nfc=function(){if(arguments[0]instanceof Array){var a=arguments[1];return arguments[0].map(function(b){return e(b,a);});}return e.apply(this,arguments);},h.prototype.nfp=function(){var a=this.nf.apply(this,arguments);return a instanceof Array?a.map(f):f(a);},h.prototype.nfs=function(){var a=this.nf.apply(this,arguments);return a instanceof Array?a.map(g):g(a);},h.prototype.split=function(a,b){return a.split(b);},h.prototype.splitTokens=function(){var a,b,c,d;return d=arguments[1],arguments.length>1?(c=/\\]/g.exec(d),b=/\\[/g.exec(d),b&&c?(d=d.slice(0,c.index)+d.slice(c.index+1),b=/\\[/g.exec(d),d=d.slice(0,b.index)+d.slice(b.index+1),a=new RegExp(\"[\\\\[\"+d+\"\\\\]]\",\"g\")):c?(d=d.slice(0,c.index)+d.slice(c.index+1),a=new RegExp(\"[\"+d+\"\\\\]]\",\"g\")):b?(d=d.slice(0,b.index)+d.slice(b.index+1),a=new RegExp(\"[\"+d+\"\\\\[]\",\"g\")):a=new RegExp(\"[\"+d+\"]\",\"g\")):a=/\\s/g,arguments[0].split(a).filter(function(a){return a;});},h.prototype.trim=function(a){return a instanceof Array?a.map(this.trim):a.trim();},b.exports=h;},{\"../core/core\":49}],88:[function(a,b,c){\"use strict\";var d=a(\"../core/core\");d.prototype.day=function(){return new Date().getDate();},d.prototype.hour=function(){return new Date().getHours();},d.prototype.minute=function(){return new Date().getMinutes();},d.prototype.millis=function(){return window.performance.now();},d.prototype.month=function(){return new Date().getMonth()+1;},d.prototype.second=function(){return new Date().getSeconds();},d.prototype.year=function(){return new Date().getFullYear();},b.exports=d;},{\"../core/core\":49}]},{},[40])(40);});"

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "!function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return t[o].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p=\"\",e(0)}([function(t,e,n){n(1),n(3),n(5)},function(t,e,n){var o=n(2);p5.prototype.registerMethod(\"init\",function(){this.gifWorkers=2,this.gifQuality=100,this.gifFps=60,this._gif=null,this._gifRendering=!1,this._gifStartFrameCount=null,this._getLastFrame=!1,this._gifStopCondition=null,this._gifDefaultFinishedCallback=function(t){window.open(URL.createObjectURL(t))}}),p5.prototype.startGif=function(t){var e=this._isGlobal?window:this;return e._gif=new o({workers:e.gifWorkers,quality:e.gifQuality}),e._gifStartFrameCount=e.frameCount,e._getLastFrame=!1,e._gifStopCondition=t||function(){return!1},e._gif.addListener(\"finished\",e._gifDefaultFinishedCallback),e._gif},p5.prototype.abortGif=function(){var t=this._isGlobal?window:this;t._gif&&(t._gif.abort(),t._gif=null,t._gifRendering=!1,window.dispatchEvent(new Event(\"noGif\")))},p5.prototype.stopGif=function(){var t=this._isGlobal?window:this;t._getLastFrame=!0},p5.prototype._stopGif=function(){var t=this._isGlobal?window:this;t._gif.render(),t._gif.on(\"finished\",function(){t._gifRendering=!1,t._gif=null}),t._gifRendering=!0},p5.prototype.registerMethod(\"post\",function(){var t=this._isGlobal?window:this;t._gif&&!t._gifRendering&&t.frameCount>t._gifStartFrameCount&&(t._gif.addFrame(t._curElement.elt,{delay:1e3/t.gifFps,copy:!0}),t._gifStopCondition()!==!0&&t._getLastFrame!==!0||t._stopGif())})},function(t,e){var n=\"(function(b){function a(b,d){if({}.hasOwnProperty.call(a.cache,b))return a.cache[b];var e=a.resolve(b);if(!e)throw new Error('Failed to resolve module '+b);var c={id:b,require:a,filename:b,exports:{},loaded:!1,parent:d,children:[]};d&&d.children.push(c);var f=b.slice(0,b.lastIndexOf('/')+1);return a.cache[b]=c.exports,e.call(c.exports,c,c.exports,f,b),c.loaded=!0,a.cache[b]=c.exports}a.modules={},a.cache={},a.resolve=function(b){return{}.hasOwnProperty.call(a.modules,b)?a.modules[b]:void 0},a.define=function(b,c){a.modules[b]=c},a.define('/gif.worker.coffee',function(d,e,f,g){var b,c;b=a('/GIFEncoder.js',d),c=function(a){var c,e,d,f;return c=new b(a.width,a.height),a.index===0?c.writeHeader():c.firstFrame=!1,c.setTransparent(a.transparent),c.setRepeat(a.repeat),c.setDelay(a.delay),c.setQuality(a.quality),c.addFrame(a.data),a.last&&c.finish(),d=c.stream(),a.data=d.pages,a.cursor=d.cursor,a.pageSize=d.constructor.pageSize,a.canTransfer?(f=function(c){for(var b=0,d=a.data.length;b<d;++b)e=a.data[b],c.push(e.buffer);return c}.call(this,[]),self.postMessage(a,f)):self.postMessage(a)},self.onmessage=function(a){return c(a.data)}}),a.define('/GIFEncoder.js',function(e,h,i,j){function c(){this.page=-1,this.pages=[],this.newPage()}function b(a,b){this.width=~~a,this.height=~~b,this.transparent=null,this.transIndex=0,this.repeat=-1,this.delay=0,this.image=null,this.pixels=null,this.indexedPixels=null,this.colorDepth=null,this.colorTab=null,this.usedEntry=new Array,this.palSize=7,this.dispose=-1,this.firstFrame=!0,this.sample=10,this.out=new c}var f=a('/TypedNeuQuant.js',e),g=a('/LZWEncoder.js',e);c.pageSize=4096,c.charMap={};for(var d=0;d<256;d++)c.charMap[d]=String.fromCharCode(d);c.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(c.pageSize),this.cursor=0},c.prototype.getData=function(){var d='';for(var a=0;a<this.pages.length;a++)for(var b=0;b<c.pageSize;b++)d+=c.charMap[this.pages[a][b]];return d},c.prototype.writeByte=function(a){this.cursor>=c.pageSize&&this.newPage(),this.pages[this.page][this.cursor++]=a},c.prototype.writeUTFBytes=function(b){for(var c=b.length,a=0;a<c;a++)this.writeByte(b.charCodeAt(a))},c.prototype.writeBytes=function(b,d,e){for(var c=e||b.length,a=d||0;a<c;a++)this.writeByte(b[a])},b.prototype.setDelay=function(a){this.delay=Math.round(a/10)},b.prototype.setFrameRate=function(a){this.delay=Math.round(100/a)},b.prototype.setDispose=function(a){a>=0&&(this.dispose=a)},b.prototype.setRepeat=function(a){this.repeat=a},b.prototype.setTransparent=function(a){this.transparent=a},b.prototype.addFrame=function(a){this.image=a,this.getImagePixels(),this.analyzePixels(),this.firstFrame&&(this.writeLSD(),this.writePalette(),this.repeat>=0&&this.writeNetscapeExt()),this.writeGraphicCtrlExt(),this.writeImageDesc(),this.firstFrame||this.writePalette(),this.writePixels(),this.firstFrame=!1},b.prototype.finish=function(){this.out.writeByte(59)},b.prototype.setQuality=function(a){a<1&&(a=1),this.sample=a},b.prototype.writeHeader=function(){this.out.writeUTFBytes('GIF89a')},b.prototype.analyzePixels=function(){var g=this.pixels.length,d=g/3;this.indexedPixels=new Uint8Array(d);var a=new f(this.pixels,this.sample);a.buildColormap(),this.colorTab=a.getColormap();var b=0;for(var c=0;c<d;c++){var e=a.lookupRGB(this.pixels[b++]&255,this.pixels[b++]&255,this.pixels[b++]&255);this.usedEntry[e]=!0,this.indexedPixels[c]=e}this.pixels=null,this.colorDepth=8,this.palSize=7,this.transparent!==null&&(this.transIndex=this.findClosest(this.transparent))},b.prototype.findClosest=function(e){if(this.colorTab===null)return-1;var k=(e&16711680)>>16,l=(e&65280)>>8,m=e&255,c=0,d=16777216,j=this.colorTab.length;for(var a=0;a<j;){var f=k-(this.colorTab[a++]&255),g=l-(this.colorTab[a++]&255),h=m-(this.colorTab[a]&255),i=f*f+g*g+h*h,b=parseInt(a/3);this.usedEntry[b]&&i<d&&(d=i,c=b),a++}return c},b.prototype.getImagePixels=function(){var a=this.width,g=this.height;this.pixels=new Uint8Array(a*g*3);var b=this.image,c=0;for(var d=0;d<g;d++)for(var e=0;e<a;e++){var f=d*a*4+e*4;this.pixels[c++]=b[f],this.pixels[c++]=b[f+1],this.pixels[c++]=b[f+2]}},b.prototype.writeGraphicCtrlExt=function(){this.out.writeByte(33),this.out.writeByte(249),this.out.writeByte(4);var b,a;this.transparent===null?(b=0,a=0):(b=1,a=2),this.dispose>=0&&(a=dispose&7),a<<=2,this.out.writeByte(0|a|0|b),this.writeShort(this.delay),this.out.writeByte(this.transIndex),this.out.writeByte(0)},b.prototype.writeImageDesc=function(){this.out.writeByte(44),this.writeShort(0),this.writeShort(0),this.writeShort(this.width),this.writeShort(this.height),this.firstFrame?this.out.writeByte(0):this.out.writeByte(128|this.palSize)},b.prototype.writeLSD=function(){this.writeShort(this.width),this.writeShort(this.height),this.out.writeByte(240|this.palSize),this.out.writeByte(0),this.out.writeByte(0)},b.prototype.writeNetscapeExt=function(){this.out.writeByte(33),this.out.writeByte(255),this.out.writeByte(11),this.out.writeUTFBytes('NETSCAPE2.0'),this.out.writeByte(3),this.out.writeByte(1),this.writeShort(this.repeat),this.out.writeByte(0)},b.prototype.writePalette=function(){this.out.writeBytes(this.colorTab);var b=768-this.colorTab.length;for(var a=0;a<b;a++)this.out.writeByte(0)},b.prototype.writeShort=function(a){this.out.writeByte(a&255),this.out.writeByte(a>>8&255)},b.prototype.writePixels=function(){var a=new g(this.width,this.height,this.indexedPixels,this.colorDepth);a.encode(this.out)},b.prototype.stream=function(){return this.out},e.exports=b}),a.define('/LZWEncoder.js',function(e,g,h,i){function f(y,D,C,B){function w(a,b){r[f++]=a,f>=254&&t(b)}function x(b){u(a),k=i+2,j=!0,l(i,b)}function u(b){for(var a=0;a<b;++a)h[a]=-1}function A(z,r){var g,t,d,e,y,w,s;for(q=z,j=!1,n_bits=q,m=p(n_bits),i=1<<z-1,o=i+1,k=i+2,f=0,e=v(),s=0,g=a;g<65536;g*=2)++s;s=8-s,w=a,u(w),l(i,r);a:while((t=v())!=c){if(g=(t<<b)+e,d=t<<s^e,h[d]===g){e=n[d];continue}if(h[d]>=0){y=w-d,d===0&&(y=1);do if((d-=y)<0&&(d+=w),h[d]===g){e=n[d];continue a}while(h[d]>=0)}l(e,r),e=t,k<1<<b?(n[d]=k++,h[d]=g):x(r)}l(e,r),l(o,r)}function z(a){a.writeByte(s),remaining=y*D,curPixel=0,A(s+1,a),a.writeByte(0)}function t(a){f>0&&(a.writeByte(f),a.writeBytes(r,0,f),f=0)}function p(a){return(1<<a)-1}function v(){if(remaining===0)return c;--remaining;var a=C[curPixel++];return a&255}function l(a,c){g&=d[e],e>0?g|=a<<e:g=a,e+=n_bits;while(e>=8)w(g&255,c),g>>=8,e-=8;if((k>m||j)&&(j?(m=p(n_bits=q),j=!1):(++n_bits,n_bits==b?m=1<<b:m=p(n_bits))),a==o){while(e>0)w(g&255,c),g>>=8,e-=8;t(c)}}var s=Math.max(2,B),r=new Uint8Array(256),h=new Int32Array(a),n=new Int32Array(a),g,e=0,f,k=0,m,j=!1,q,i,o;this.encode=z}var c=-1,b=12,a=5003,d=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];e.exports=f}),a.define('/TypedNeuQuant.js',function(A,F,E,D){function C(A,B){function I(){o=[],q=new Int32Array(256),t=new Int32Array(a),y=new Int32Array(a),z=new Int32Array(a>>3);var c,d;for(c=0;c<a;c++)d=(c<<b+8)/a,o[c]=new Float64Array([d,d,d,0]),y[c]=e/a,t[c]=0}function J(){for(var c=0;c<a;c++)o[c][0]>>=b,o[c][1]>>=b,o[c][2]>>=b,o[c][3]=c}function K(b,a,c,e,f){o[a][0]-=b*(o[a][0]-c)/d,o[a][1]-=b*(o[a][1]-e)/d,o[a][2]-=b*(o[a][2]-f)/d}function L(j,e,n,l,k){var h=Math.abs(e-j),i=Math.min(e+j,a),g=e+1,f=e-1,m=1,b,d;while(g<i||f>h)d=z[m++],g<i&&(b=o[g++],b[0]-=d*(b[0]-n)/c,b[1]-=d*(b[1]-l)/c,b[2]-=d*(b[2]-k)/c),f>h&&(b=o[f--],b[0]-=d*(b[0]-n)/c,b[1]-=d*(b[1]-l)/c,b[2]-=d*(b[2]-k)/c)}function C(p,s,q){var h=2147483647,k=h,d=-1,m=d,c,j,e,n,l;for(c=0;c<a;c++)j=o[c],e=Math.abs(j[0]-p)+Math.abs(j[1]-s)+Math.abs(j[2]-q),e<h&&(h=e,d=c),n=e-(t[c]>>i-b),n<k&&(k=n,m=c),l=y[c]>>g,y[c]-=l,t[c]+=l<<f;return y[d]+=x,t[d]-=r,m}function D(){var d,b,e,c,h,g,f=0,i=0;for(d=0;d<a;d++){for(e=o[d],h=d,g=e[1],b=d+1;b<a;b++)c=o[b],c[1]<g&&(h=b,g=c[1]);if(c=o[h],d!=h&&(b=c[0],c[0]=e[0],e[0]=b,b=c[1],c[1]=e[1],e[1]=b,b=c[2],c[2]=e[2],e[2]=b,b=c[3],c[3]=e[3],e[3]=b),g!=f){for(q[f]=i+d>>1,b=f+1;b<g;b++)q[b]=d;f=g,i=d}}for(q[f]=i+n>>1,b=f+1;b<256;b++)q[b]=n}function E(j,i,k){var b,d,c,e=1e3,h=-1,f=q[i],g=f-1;while(f<a||g>=0)f<a&&(d=o[f],c=d[1]-i,c>=e?f=a:(f++,c<0&&(c=-c),b=d[0]-j,b<0&&(b=-b),c+=b,c<e&&(b=d[2]-k,b<0&&(b=-b),c+=b,c<e&&(e=c,h=d[3])))),g>=0&&(d=o[g],c=i-d[1],c>=e?g=-1:(g--,c<0&&(c=-c),b=d[0]-j,b<0&&(b=-b),c+=b,c<e&&(b=d[2]-k,b<0&&(b=-b),c+=b,c<e&&(e=c,h=d[3]))));return h}function F(){var c,f=A.length,D=30+(B-1)/3,y=f/(3*B),q=~~(y/w),n=d,o=u,a=o>>h;for(a<=1&&(a=0),c=0;c<a;c++)z[c]=n*((a*a-c*c)*m/(a*a));var i;f<s?(B=1,i=3):f%l!==0?i=3*l:f%k!==0?i=3*k:f%p!==0?i=3*p:i=3*j;var r,t,x,e,g=0;c=0;while(c<y)if(r=(A[g]&255)<<b,t=(A[g+1]&255)<<b,x=(A[g+2]&255)<<b,e=C(r,t,x),K(n,e,r,t,x),a!==0&&L(a,e,r,t,x),g+=i,g>=f&&(g-=f),c++,q===0&&(q=1),c%q===0)for(n-=n/D,o-=o/v,a=o>>h,a<=1&&(a=0),e=0;e<a;e++)z[e]=n*((a*a-e*e)*m/(a*a))}function G(){I(),F(),J(),D()}function H(){var b=[],g=[];for(var c=0;c<a;c++)g[o[c][3]]=c;var d=0;for(var e=0;e<a;e++){var f=g[e];b[d++]=o[f][0],b[d++]=o[f][1],b[d++]=o[f][2]}return b}var o,q,t,y,z;this.buildColormap=G,this.getColormap=H,this.lookupRGB=E}var w=100,a=256,n=a-1,b=4,i=16,e=1<<i,f=10,B=1<<f,g=10,x=e>>g,r=e<<f-g,z=a>>3,h=6,t=1<<h,u=z*t,v=30,o=10,d=1<<o,q=8,m=1<<q,y=o+q,c=1<<y,l=499,k=491,p=487,j=503,s=3*j;A.exports=C}),a('/gif.worker.coffee')}.call(this,this))\";window.URL=window.URL||window.webkitURL;var o;try{o=new Blob([n],{type:\"application/javascript\"})}catch(i){window.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder,o=new BlobBuilder,o.append(n),o=o.getBlob()}var r=URL.createObjectURL(o);(function(e){function n(t,e){if({}.hasOwnProperty.call(n.cache,t))return n.cache[t];var o=n.resolve(t);if(!o)throw new Error(\"Failed to resolve module \"+t);var i={id:t,require:n,filename:t,exports:{},loaded:!1,parent:e,children:[]};e&&e.children.push(i);var r=t.slice(0,t.lastIndexOf(\"/\")+1);return n.cache[t]=i.exports,o.call(i.exports,i,i.exports,r,t),i.loaded=!0,n.cache[t]=i.exports}n.modules={},n.cache={},n.resolve=function(t){return{}.hasOwnProperty.call(n.modules,t)?n.modules[t]:void 0},n.define=function(t,e){n.modules[t]=e};var o=function(t){return t=\"/\",{title:\"browser\",version:\"v0.10.26\",browser:!0,env:{},argv:[],nextTick:e.setImmediate||function(t){setTimeout(t,0)},cwd:function(){return t},chdir:function(e){t=e}}}();n.define(\"/gif.coffee\",function(t,e,o,i){function s(t,e){return{}.hasOwnProperty.call(t,e)}function a(t,e){for(var n=0,o=e.length;n<o;++n)if(n in e&&e[n]===t)return!0;return!1}function l(t,e){function n(){this.constructor=t}for(var o in e)s(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t}var d,c,u,h,p;u=n(\"events\",t).EventEmitter,d=n(\"/browser.coffee\",t),p=function(t){function e(t){var e,n;this.running=!1,this.options={},this.frames=[],this.freeWorkers=[],this.activeWorkers=[],this.setOptions(t);for(e in c)n=c[e],null!=this.options[e]?this.options[e]:this.options[e]=n}return l(e,t),c={workerScript:\"gif.worker.js\",workers:2,repeat:0,background:\"#fff\",quality:10,width:null,height:null,transparent:null},h={delay:500,copy:!1},e.prototype.setOption=function(t,e){return this.options[t]=e,null==this._canvas||\"width\"!==t&&\"height\"!==t?void 0:this._canvas[t]=e},e.prototype.setOptions=function(t){var e,n;return function(o){for(e in t)s(t,e)&&(n=t[e],o.push(this.setOption(e,n)));return o}.call(this,[])},e.prototype.addFrame=function(t,e){var n,o;null==e&&(e={}),n={},n.transparent=this.options.transparent;for(o in h)n[o]=e[o]||h[o];if(null!=this.options.width||this.setOption(\"width\",t.width),null!=this.options.height||this.setOption(\"height\",t.height),\"undefined\"!=typeof ImageData&&null!=ImageData&&t instanceof ImageData)n.data=t.data;else if(\"undefined\"!=typeof CanvasRenderingContext2D&&null!=CanvasRenderingContext2D&&t instanceof CanvasRenderingContext2D||\"undefined\"!=typeof WebGLRenderingContext&&null!=WebGLRenderingContext&&t instanceof WebGLRenderingContext)e.copy?n.data=this.getContextData(t):n.context=t;else{if(null==t.childNodes)throw new Error(\"Invalid image\");e.copy?n.data=this.getImageData(t):n.image=t}return this.frames.push(n)},e.prototype.render=function(){var t,e;if(this.running)throw new Error(\"Already running\");if(null==this.options.width||null==this.options.height)throw new Error(\"Width and height must be set prior to rendering\");this.running=!0,this.nextFrame=0,this.finishedFrames=0,this.imageParts=function(e){for(var n=function(){var t;t=[];for(var e=0;0<=this.frames.length?e<this.frames.length:e>this.frames.length;0<=this.frames.length?++e:--e)t.push(e);return t}.apply(this,arguments),o=0,i=n.length;o<i;++o)t=n[o],e.push(null);return e}.call(this,[]),e=this.spawnWorkers();for(var n=function(){var t;t=[];for(var n=0;0<=e?n<e:n>e;0<=e?++n:--n)t.push(n);return t}.apply(this,arguments),o=0,i=n.length;o<i;++o)t=n[o],this.renderNextFrame();return this.emit(\"start\"),this.emit(\"progress\",0)},e.prototype.abort=function(){for(var t;;){if(t=this.activeWorkers.shift(),!(null!=t))break;console.log(\"killing active worker\"),t.terminate()}return this.running=!1,this.emit(\"abort\")},e.prototype.spawnWorkers=function(){var t;return t=Math.min(this.options.workers,this.frames.length),function(){var e;e=[];for(var n=this.freeWorkers.length;this.freeWorkers.length<=t?n<t:n>t;this.freeWorkers.length<=t?++n:--n)e.push(n);return e}.apply(this,arguments).forEach(function(t){return function(e){var n;return console.log(\"spawning worker \"+e),n=new Worker(r),n.onmessage=function(t){return function(e){return t.activeWorkers.splice(t.activeWorkers.indexOf(n),1),t.freeWorkers.push(n),t.frameFinished(e.data)}}(t),t.freeWorkers.push(n)}}(this)),t},e.prototype.frameFinished=function(t){return console.log(\"frame \"+t.index+\" finished - \"+this.activeWorkers.length+\" active\"),this.finishedFrames++,this.emit(\"progress\",this.finishedFrames/this.frames.length),this.imageParts[t.index]=t,a(null,this.imageParts)?this.renderNextFrame():this.finishRendering()},e.prototype.finishRendering=function(){var t,e,n,o,i,r,s;i=0;for(var a=0,l=this.imageParts.length;a<l;++a)e=this.imageParts[a],i+=(e.data.length-1)*e.pageSize+e.cursor;i+=e.pageSize-e.cursor,console.log(\"rendering finished - filesize \"+Math.round(i/1e3)+\"kb\"),t=new Uint8Array(i),r=0;for(var d=0,c=this.imageParts.length;d<c;++d){e=this.imageParts[d];for(var u=0,h=e.data.length;u<h;++u)s=e.data[u],n=u,t.set(s,r),r+=n===e.data.length-1?e.cursor:e.pageSize}return o=new Blob([t],{type:\"image/gif\"}),this.emit(\"finished\",o,t)},e.prototype.renderNextFrame=function(){var t,e,n;if(0===this.freeWorkers.length)throw new Error(\"No free workers\");return this.nextFrame>=this.frames.length?void 0:(t=this.frames[this.nextFrame++],n=this.freeWorkers.shift(),e=this.getTask(t),console.log(\"starting frame \"+(e.index+1)+\" of \"+this.frames.length),this.activeWorkers.push(n),n.postMessage(e))},e.prototype.getContextData=function(t){return t.getImageData(0,0,this.options.width,this.options.height).data},e.prototype.getImageData=function(t){var e;return null!=this._canvas||(this._canvas=document.createElement(\"canvas\"),this._canvas.width=this.options.width,this._canvas.height=this.options.height),e=this._canvas.getContext(\"2d\"),e.setFill=this.options.background,e.fillRect(0,0,this.options.width,this.options.height),e.drawImage(t,0,0),this.getContextData(e)},e.prototype.getTask=function(t){var e,n;if(e=this.frames.indexOf(t),n={index:e,last:e===this.frames.length-1,delay:t.delay,transparent:t.transparent,width:this.options.width,height:this.options.height,quality:this.options.quality,repeat:this.options.repeat,canTransfer:\"chrome\"===d.name},null!=t.data)n.data=t.data;else if(null!=t.context)n.data=this.getContextData(t.context);else{if(null==t.image)throw new Error(\"Invalid frame\");n.data=this.getImageData(t.image)}return n},e}(u),t.exports=p}),n.define(\"/browser.coffee\",function(t,e,n,o){var i,r,s,a,l;a=navigator.userAgent.toLowerCase(),s=navigator.platform.toLowerCase(),l=a.match(/(opera|ie|firefox|chrome|version)[\\s\\/:]([\\w\\d\\.]+)?.*?(safari|version[\\s\\/:]([\\w\\d\\.]+)|$)/)||[null,\"unknown\",0],r=\"ie\"===l[1]&&document.documentMode,i={name:\"version\"===l[1]?l[3]:l[1],version:r||parseFloat(\"opera\"===l[1]&&l[4]?l[4]:l[2]),platform:{name:a.match(/ip(?:ad|od|hone)/)?\"ios\":(a.match(/(?:webos|android)/)||s.match(/mac|win|linux/)||[\"other\"])[0]}},i[i.name]=!0,i[i.name+parseInt(i.version,10)]=!0,i.platform[i.platform.name]=!0,t.exports=i}),n.define(\"events\",function(t,e,n,i){o.EventEmitter||(o.EventEmitter=function(){});var r=e.EventEmitter=o.EventEmitter,s=\"function\"==typeof Array.isArray?Array.isArray:function(t){return\"[object Array]\"===Object.prototype.toString.call(t)},a=10;r.prototype.setMaxListeners=function(t){this._events||(this._events={}),this._events.maxListeners=t},r.prototype.emit=function(t){if(\"error\"===t&&(!this._events||!this._events.error||s(this._events.error)&&!this._events.error.length))throw arguments[1]instanceof Error?arguments[1]:new Error(\"Uncaught, unspecified 'error' event.\");if(!this._events)return!1;var e=this._events[t];if(!e)return!1;if(\"function\"!=typeof e){if(s(e)){for(var n=Array.prototype.slice.call(arguments,1),o=e.slice(),i=0,r=o.length;i<r;i++)o[i].apply(this,n);return!0}return!1}switch(arguments.length){case 1:e.call(this);break;case 2:e.call(this,arguments[1]);break;case 3:e.call(this,arguments[1],arguments[2]);break;default:var n=Array.prototype.slice.call(arguments,1);e.apply(this,n)}return!0},r.prototype.addListener=function(t,e){if(\"function\"!=typeof e)throw new Error(\"addListener only takes instances of Function\");if(this._events||(this._events={}),this.emit(\"newListener\",t,e),this._events[t])if(s(this._events[t])){if(!this._events[t].warned){var n;n=void 0!==this._events.maxListeners?this._events.maxListeners:a,n&&n>0&&this._events[t].length>n&&(this._events[t].warned=!0,console.error(\"(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.\",this._events[t].length),console.trace())}this._events[t].push(e)}else this._events[t]=[this._events[t],e];else this._events[t]=e;return this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(t,e){var n=this;return n.on(t,function o(){n.removeListener(t,o),e.apply(this,arguments)}),this},r.prototype.removeListener=function(t,e){if(\"function\"!=typeof e)throw new Error(\"removeListener only takes instances of Function\");if(!this._events||!this._events[t])return this;var n=this._events[t];if(s(n)){var o=n.indexOf(e);if(o<0)return this;n.splice(o,1),0==n.length&&delete this._events[t]}else this._events[t]===e&&delete this._events[t];return this},r.prototype.removeAllListeners=function(t){return t&&this._events&&this._events[t]&&(this._events[t]=null),this},r.prototype.listeners=function(t){return this._events||(this._events={}),this._events[t]||(this._events[t]=[]),s(this._events[t])||(this._events[t]=[this._events[t]]),this._events[t]}}),e.GIF=n(\"/gif.coffee\"),t.exports=e.GIF}).call(this,this)},function(t,e,n){var o=n(4);p5.prototype.createGUI=function(t){var e=this._isGlobal?window:this;return e.gui=new o.GUI(t),e.gui}},function(t,e){var n=n||{};n.gui=n.gui||{},n.utils=n.utils||{},n.controllers=n.controllers||{},n.dom=n.dom||{},n.color=n.color||{},n.utils.css=function(){return{load:function(t,e){e=e||document;var n=e.createElement(\"link\");n.type=\"text/css\",n.rel=\"stylesheet\",n.href=t,e.getElementsByTagName(\"head\")[0].appendChild(n)},inject:function(t,e){e=e||document;var n=document.createElement(\"style\");n.type=\"text/css\",n.innerHTML=t,e.getElementsByTagName(\"head\")[0].appendChild(n)}}}(),n.utils.common=function(){var t=Array.prototype.forEach,e=Array.prototype.slice;return{BREAK:{},extend:function(t){return this.each(e.call(arguments,1),function(e){for(var n in e)this.isUndefined(e[n])||(t[n]=e[n])},this),t},defaults:function(t){return this.each(e.call(arguments,1),function(e){for(var n in e)this.isUndefined(t[n])&&(t[n]=e[n])},this),t},compose:function(){var t=e.call(arguments);return function(){for(var n=e.call(arguments),o=t.length-1;o>=0;o--)n=[t[o].apply(this,n)];return n[0]}},each:function(e,n,o){if(e)if(t&&e.forEach&&e.forEach===t)e.forEach(n,o);else if(e.length===e.length+0){for(var i=0,r=e.length;i<r;i++)if(i in e&&n.call(o,e[i],i)===this.BREAK)return}else for(var i in e)if(n.call(o,e[i],i)===this.BREAK)return},defer:function(t){setTimeout(t,0)},toArray:function(t){return t.toArray?t.toArray():e.call(t)},isUndefined:function(t){return void 0===t},isNull:function(t){return null===t},isNaN:function(t){return t!==t},isArray:Array.isArray||function(t){return t.constructor===Array},isObject:function(t){return t===Object(t)},isNumber:function(t){return t===t+0},isString:function(t){return t===t+\"\"},isBoolean:function(t){return t===!1||t===!0},isFunction:function(t){return\"[object Function]\"===Object.prototype.toString.call(t)}}}(),n.controllers.Controller=function(t){var e=function(t,e){this.initialValue=t[e],this.domElement=document.createElement(\"div\"),this.object=t,this.property=e,this.__onChange=void 0,this.__onFinishChange=void 0};return t.extend(e.prototype,{onChange:function(t){return this.__onChange=t,this},onFinishChange:function(t){return this.__onFinishChange=t,this},setValue:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this},getValue:function(){return this.object[this.property]},updateDisplay:function(){return this},isModified:function(){return this.initialValue!==this.getValue()}}),e}(n.utils.common),n.dom.dom=function(t){function e(e){if(\"0\"===e||t.isUndefined(e))return 0;var n=e.match(i);return t.isNull(n)?0:parseFloat(n[1])}var n={HTMLEvents:[\"change\"],MouseEvents:[\"click\",\"mousemove\",\"mousedown\",\"mouseup\",\"mouseover\"],KeyboardEvents:[\"keydown\"]},o={};t.each(n,function(e,n){t.each(e,function(t){o[t]=n})});var i=/(\\d+(\\.\\d+)?)px/,r={makeSelectable:function(t,e){void 0!==t&&void 0!==t.style&&(t.onselectstart=e?function(){return!1}:function(){},t.style.MozUserSelect=e?\"auto\":\"none\",t.style.KhtmlUserSelect=e?\"auto\":\"none\",t.unselectable=e?\"on\":\"off\")},makeFullscreen:function(e,n,o){t.isUndefined(n)&&(n=!0),t.isUndefined(o)&&(o=!0),e.style.position=\"absolute\",n&&(e.style.left=0,e.style.right=0),o&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,n,i,r){i=i||{};var s=o[n];if(!s)throw new Error(\"Event type \"+n+\" not supported.\");var a=document.createEvent(s);switch(s){case\"MouseEvents\":var l=i.x||i.clientX||0,d=i.y||i.clientY||0;a.initMouseEvent(n,i.bubbles||!1,i.cancelable||!0,window,i.clickCount||1,0,0,l,d,!1,!1,!1,!1,0,null);break;case\"KeyboardEvents\":var c=a.initKeyboardEvent||a.initKeyEvent;t.defaults(i,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),c(n,i.bubbles||!1,i.cancelable,window,i.ctrlKey,i.altKey,i.shiftKey,i.metaKey,i.keyCode,i.charCode);break;default:a.initEvent(n,i.bubbles||!1,i.cancelable||!0)}t.defaults(a,r),e.dispatchEvent(a)},bind:function(t,e,n,o){return o=o||!1,t.addEventListener?t.addEventListener(e,n,o):t.attachEvent&&t.attachEvent(\"on\"+e,n),r},unbind:function(t,e,n,o){return o=o||!1,t.removeEventListener?t.removeEventListener(e,n,o):t.detachEvent&&t.detachEvent(\"on\"+e,n),r},addClass:function(t,e){if(void 0===t.className)t.className=e;else if(t.className!==e){var n=t.className.split(/ +/);n.indexOf(e)==-1&&(n.push(e),t.className=n.join(\" \").replace(/^\\s+/,\"\").replace(/\\s+$/,\"\"))}return r},removeClass:function(t,e){if(e)if(void 0===t.className);else if(t.className===e)t.removeAttribute(\"class\");else{var n=t.className.split(/ +/),o=n.indexOf(e);o!=-1&&(n.splice(o,1),t.className=n.join(\" \"))}else t.className=void 0;return r},hasClass:function(t,e){return new RegExp(\"(?:^|\\\\s+)\"+e+\"(?:\\\\s+|$)\").test(t.className)||!1},getWidth:function(t){var n=getComputedStyle(t);return e(n[\"border-left-width\"])+e(n[\"border-right-width\"])+e(n[\"padding-left\"])+e(n[\"padding-right\"])+e(n.width)},getHeight:function(t){var n=getComputedStyle(t);return e(n[\"border-top-width\"])+e(n[\"border-bottom-width\"])+e(n[\"padding-top\"])+e(n[\"padding-bottom\"])+e(n.height)},getOffset:function(t){var e={left:0,top:0};if(t.offsetParent)do e.left+=t.offsetLeft,e.top+=t.offsetTop;while(t=t.offsetParent);return e},isActive:function(t){return t===document.activeElement&&(t.type||t.href)}};return r}(n.utils.common),n.controllers.OptionController=function(t,e,n){var o=function(t,i,r){o.superclass.call(this,t,i);var s=this;if(this.__select=document.createElement(\"select\"),n.isArray(r)){var a={};n.each(r,function(t){a[t]=t}),r=a}n.each(r,function(t,e){var n=document.createElement(\"option\");n.innerHTML=e,n.setAttribute(\"value\",t),s.__select.appendChild(n)}),this.updateDisplay(),e.bind(this.__select,\"change\",function(){var t=this.options[this.selectedIndex].value;s.setValue(t)}),this.domElement.appendChild(this.__select)};return o.superclass=t,n.extend(o.prototype,t.prototype,{setValue:function(t){var e=o.superclass.prototype.setValue.call(this,t);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),e},updateDisplay:function(){return this.__select.value=this.getValue(),o.superclass.prototype.updateDisplay.call(this)}}),o}(n.controllers.Controller,n.dom.dom,n.utils.common),n.controllers.NumberController=function(t,e){function n(t){return t=t.toString(),t.indexOf(\".\")>-1?t.length-t.indexOf(\".\")-1:0}var o=function(t,i,r){o.superclass.call(this,t,i),r=r||{},this.__min=r.min,this.__max=r.max,this.__step=r.step,e.isUndefined(this.__step)?0==this.initialValue?this.__impliedStep=1:this.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(this.initialValue))/Math.LN10))/10:this.__impliedStep=this.__step,this.__precision=n(this.__impliedStep)};return o.superclass=t,e.extend(o.prototype,t.prototype,{setValue:function(t){return void 0!==this.__min&&t<this.__min?t=this.__min:void 0!==this.__max&&t>this.__max&&(t=this.__max),void 0!==this.__step&&t%this.__step!=0&&(t=Math.round(t/this.__step)*this.__step),o.superclass.prototype.setValue.call(this,t)},min:function(t){return this.__min=t,this},max:function(t){return this.__max=t,this},step:function(t){return this.__step=t,this.__impliedStep=t,this.__precision=n(t),this}}),o}(n.controllers.Controller,n.utils.common),n.controllers.NumberControllerBox=function(t,e,n){function o(t,e){var n=Math.pow(10,e);return Math.round(t*n)/n}var i=function(t,o,r){function s(){var t=parseFloat(h.__input.value);n.isNaN(t)||h.setValue(t)}function a(){s(),h.__onFinishChange&&h.__onFinishChange.call(h,h.getValue())}function l(t){e.bind(window,\"mousemove\",d),e.bind(window,\"mouseup\",c),u=t.clientY}function d(t){var e=u-t.clientY;h.setValue(h.getValue()+e*h.__impliedStep),u=t.clientY}function c(){e.unbind(window,\"mousemove\",d),e.unbind(window,\"mouseup\",c)}this.__truncationSuspended=!1,i.superclass.call(this,t,o,r);var u,h=this;this.__input=document.createElement(\"input\"),this.__input.setAttribute(\"type\",\"text\"),e.bind(this.__input,\"change\",s),e.bind(this.__input,\"blur\",a),e.bind(this.__input,\"mousedown\",l),e.bind(this.__input,\"keydown\",function(t){13===t.keyCode&&(h.__truncationSuspended=!0,this.blur(),h.__truncationSuspended=!1)}),this.updateDisplay(),this.domElement.appendChild(this.__input)};return i.superclass=t,n.extend(i.prototype,t.prototype,{updateDisplay:function(){return this.__input.value=this.__truncationSuspended?this.getValue():o(this.getValue(),this.__precision),i.superclass.prototype.updateDisplay.call(this)}}),i}(n.controllers.NumberController,n.dom.dom,n.utils.common),n.controllers.NumberControllerSlider=function(t,e,n,o,i){function r(t,e,n,o,i){return o+(i-o)*((t-e)/(n-e))}var s=function(t,n,o,i,a){function l(t){e.bind(window,\"mousemove\",d),e.bind(window,\"mouseup\",c),d(t)}function d(t){t.preventDefault();var n=e.getOffset(u.__background),o=e.getWidth(u.__background);return u.setValue(r(t.clientX,n.left,n.left+o,u.__min,u.__max)),!1}function c(){e.unbind(window,\"mousemove\",d),e.unbind(window,\"mouseup\",c),u.__onFinishChange&&u.__onFinishChange.call(u,u.getValue())}s.superclass.call(this,t,n,{min:o,max:i,step:a});var u=this;this.__background=document.createElement(\"div\"),this.__foreground=document.createElement(\"div\"),e.bind(this.__background,\"mousedown\",l),e.addClass(this.__background,\"slider\"),e.addClass(this.__foreground,\"slider-fg\"),this.updateDisplay(),this.__background.appendChild(this.__foreground),this.domElement.appendChild(this.__background)};return s.superclass=t,s.useDefaultStyles=function(){n.inject(i)},o.extend(s.prototype,t.prototype,{updateDisplay:function(){var t=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=100*t+\"%\",s.superclass.prototype.updateDisplay.call(this)}}),s}(n.controllers.NumberController,n.dom.dom,n.utils.css,n.utils.common,\"/**\\n * dat-gui JavaScript Controller Library\\n * http://code.google.com/p/dat-gui\\n *\\n * Copyright 2011 Data Arts Team, Google Creative Lab\\n *\\n * Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n * you may not use this file except in compliance with the License.\\n * You may obtain a copy of the License at\\n *\\n * http://www.apache.org/licenses/LICENSE-2.0\\n */\\n\\n.slider {\\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\\n  height: 1em;\\n  border-radius: 1em;\\n  background-color: #eee;\\n  padding: 0 0.5em;\\n  overflow: hidden;\\n}\\n\\n.slider-fg {\\n  padding: 1px 0 2px 0;\\n  background-color: #aaa;\\n  height: 1em;\\n  margin-left: -0.5em;\\n  padding-right: 0.5em;\\n  border-radius: 1em 0 0 1em;\\n}\\n\\n.slider-fg:after {\\n  display: inline-block;\\n  border-radius: 1em;\\n  background-color: #fff;\\n  border:  1px solid #aaa;\\n  content: '';\\n  float: right;\\n  margin-right: -1em;\\n  margin-top: -1px;\\n  height: 0.9em;\\n  width: 0.9em;\\n}\"),n.controllers.FunctionController=function(t,e,n){var o=function(t,n,i){o.superclass.call(this,t,n);var r=this;this.__button=document.createElement(\"div\"),this.__button.innerHTML=void 0===i?\"Fire\":i,e.bind(this.__button,\"click\",function(t){return t.preventDefault(),r.fire(),!1}),e.addClass(this.__button,\"button\"),this.domElement.appendChild(this.__button)};return o.superclass=t,n.extend(o.prototype,t.prototype,{fire:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}),o}(n.controllers.Controller,n.dom.dom,n.utils.common),n.controllers.BooleanController=function(t,e,n){var o=function(t,n){function i(){r.setValue(!r.__prev)}o.superclass.call(this,t,n);var r=this;this.__prev=this.getValue(),this.__checkbox=document.createElement(\"input\"),\nthis.__checkbox.setAttribute(\"type\",\"checkbox\"),e.bind(this.__checkbox,\"change\",i,!1),this.domElement.appendChild(this.__checkbox),this.updateDisplay()};return o.superclass=t,n.extend(o.prototype,t.prototype,{setValue:function(t){var e=o.superclass.prototype.setValue.call(this,t);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),e},updateDisplay:function(){return this.getValue()===!0?(this.__checkbox.setAttribute(\"checked\",\"checked\"),this.__checkbox.checked=!0):this.__checkbox.checked=!1,o.superclass.prototype.updateDisplay.call(this)}}),o}(n.controllers.Controller,n.dom.dom,n.utils.common),n.color.toString=function(t){return function(e){if(1==e.a||t.isUndefined(e.a)){for(var n=e.hex.toString(16);n.length<6;)n=\"0\"+n;return\"#\"+n}return\"rgba(\"+Math.round(e.r)+\",\"+Math.round(e.g)+\",\"+Math.round(e.b)+\",\"+e.a+\")\"}}(n.utils.common),n.color.interpret=function(t,e){var n,o,i=function(){o=!1;var t=arguments.length>1?e.toArray(arguments):arguments[0];return e.each(r,function(i){if(i.litmus(t))return e.each(i.conversions,function(i,r){if(n=i.read(t),o===!1&&n!==!1)return o=n,n.conversionName=r,n.conversion=i,e.BREAK}),e.BREAK}),o},r=[{litmus:e.isString,conversions:{THREE_CHAR_HEX:{read:function(t){var e=t.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return null!==e&&{space:\"HEX\",hex:parseInt(\"0x\"+e[1].toString()+e[1].toString()+e[2].toString()+e[2].toString()+e[3].toString()+e[3].toString())}},write:t},SIX_CHAR_HEX:{read:function(t){var e=t.match(/^#([A-F0-9]{6})$/i);return null!==e&&{space:\"HEX\",hex:parseInt(\"0x\"+e[1].toString())}},write:t},CSS_RGB:{read:function(t){var e=t.match(/^rgb\\(\\s*(.+)\\s*,\\s*(.+)\\s*,\\s*(.+)\\s*\\)/);return null!==e&&{space:\"RGB\",r:parseFloat(e[1]),g:parseFloat(e[2]),b:parseFloat(e[3])}},write:t},CSS_RGBA:{read:function(t){var e=t.match(/^rgba\\(\\s*(.+)\\s*,\\s*(.+)\\s*,\\s*(.+)\\s*\\,\\s*(.+)\\s*\\)/);return null!==e&&{space:\"RGB\",r:parseFloat(e[1]),g:parseFloat(e[2]),b:parseFloat(e[3]),a:parseFloat(e[4])}},write:t}}},{litmus:e.isNumber,conversions:{HEX:{read:function(t){return{space:\"HEX\",hex:t,conversionName:\"HEX\"}},write:function(t){return t.hex}}}},{litmus:e.isArray,conversions:{RGB_ARRAY:{read:function(t){return 3==t.length&&{space:\"RGB\",r:t[0],g:t[1],b:t[2]}},write:function(t){return[t.r,t.g,t.b]}},RGBA_ARRAY:{read:function(t){return 4==t.length&&{space:\"RGB\",r:t[0],g:t[1],b:t[2],a:t[3]}},write:function(t){return[t.r,t.g,t.b,t.a]}}}},{litmus:e.isObject,conversions:{RGBA_OBJ:{read:function(t){return!!(e.isNumber(t.r)&&e.isNumber(t.g)&&e.isNumber(t.b)&&e.isNumber(t.a))&&{space:\"RGB\",r:t.r,g:t.g,b:t.b,a:t.a}},write:function(t){return{r:t.r,g:t.g,b:t.b,a:t.a}}},RGB_OBJ:{read:function(t){return!!(e.isNumber(t.r)&&e.isNumber(t.g)&&e.isNumber(t.b))&&{space:\"RGB\",r:t.r,g:t.g,b:t.b}},write:function(t){return{r:t.r,g:t.g,b:t.b}}},HSVA_OBJ:{read:function(t){return!!(e.isNumber(t.h)&&e.isNumber(t.s)&&e.isNumber(t.v)&&e.isNumber(t.a))&&{space:\"HSV\",h:t.h,s:t.s,v:t.v,a:t.a}},write:function(t){return{h:t.h,s:t.s,v:t.v,a:t.a}}},HSV_OBJ:{read:function(t){return!!(e.isNumber(t.h)&&e.isNumber(t.s)&&e.isNumber(t.v))&&{space:\"HSV\",h:t.h,s:t.s,v:t.v}},write:function(t){return{h:t.h,s:t.s,v:t.v}}}}}];return i}(n.color.toString,n.utils.common),n.GUI=n.gui.GUI=function(t,e,n,o,i,r,s,a,l,d,c,u,h,p,f){function g(t,e,n,r){if(void 0===e[n])throw new Error(\"Object \"+e+' has no property \"'+n+'\"');var s;if(r.color)s=new c(t,e,n);else{var a=[e,n].concat(r.factoryArgs);s=o.apply(t,a)}r.before instanceof i&&(r.before=r.before.__li),_(t,s),p.addClass(s.domElement,\"c\");var l=document.createElement(\"span\");p.addClass(l,\"property-name\"),l.innerHTML=s.property;var d=document.createElement(\"div\");d.appendChild(l),d.appendChild(s.domElement);var u=m(t,d,r.before);return p.addClass(u,U.CLASS_CONTROLLER_ROW),p.addClass(u,typeof s.getValue()),b(t,u,s),t.__controllers.push(s),s}function m(t,e,n){var o=document.createElement(\"li\");return e&&o.appendChild(e),n?t.__ul.insertBefore(o,params.before):t.__ul.appendChild(o),t.onResize(),o}function b(t,e,n){if(n.__li=e,n.__gui=t,f.extend(n,{options:function(e){return arguments.length>1?(n.remove(),g(t,n.object,n.property,{before:n.__li.nextElementSibling,factoryArgs:[f.toArray(arguments)]})):f.isArray(e)||f.isObject(e)?(n.remove(),g(t,n.object,n.property,{before:n.__li.nextElementSibling,factoryArgs:[e]})):void 0},name:function(t){return n.__li.firstElementChild.firstElementChild.innerHTML=t,n},listen:function(){return n.__gui.listen(n),n},remove:function(){return n.__gui.remove(n),n}}),n instanceof l){var o=new a(n.object,n.property,{min:n.__min,max:n.__max,step:n.__step});f.each([\"updateDisplay\",\"onChange\",\"onFinishChange\"],function(t){var e=n[t],i=o[t];n[t]=o[t]=function(){var t=Array.prototype.slice.call(arguments);return e.apply(n,t),i.apply(o,t)}}),p.addClass(e,\"has-slider\"),n.domElement.insertBefore(o.domElement,n.domElement.firstElementChild)}else if(n instanceof a){var i=function(e){return f.isNumber(n.__min)&&f.isNumber(n.__max)?(n.remove(),g(t,n.object,n.property,{before:n.__li.nextElementSibling,factoryArgs:[n.__min,n.__max,n.__step]})):e};n.min=f.compose(i,n.min),n.max=f.compose(i,n.max)}else n instanceof r?(p.bind(e,\"click\",function(){p.fakeEvent(n.__checkbox,\"click\")}),p.bind(n.__checkbox,\"click\",function(t){t.stopPropagation()})):n instanceof s?(p.bind(e,\"click\",function(){p.fakeEvent(n.__button,\"click\")}),p.bind(e,\"mouseover\",function(){p.addClass(n.__button,\"hover\")}),p.bind(e,\"mouseout\",function(){p.removeClass(n.__button,\"hover\")})):n instanceof c&&(p.addClass(e,\"color\"),n.updateDisplay=f.compose(function(t){return e.style.borderLeftColor=n.__color.toString(),t},n.updateDisplay),n.updateDisplay());n.setValue=f.compose(function(e){return t.getRoot().__preset_select&&n.isModified()&&E(t.getRoot(),!0),e},n.setValue)}function _(t,e){var n=t.getRoot(),o=n.__rememberedObjects.indexOf(e.object);if(o!=-1){var i=n.__rememberedObjectIndecesToControllers[o];if(void 0===i&&(i={},n.__rememberedObjectIndecesToControllers[o]=i),i[e.property]=e,n.load&&n.load.remembered){var r,s=n.load.remembered;if(s[t.preset])r=s[t.preset];else{if(!s[O])return;r=s[O]}if(r[o]&&void 0!==r[o][e.property]){var a=r[o][e.property];e.initialValue=a,e.setValue(a)}}}}function y(t,e){return document.location.href+\".\"+e}function v(t){function e(){d.style.display=t.useLocalStorage?\"block\":\"none\"}var n=t.__save_row=document.createElement(\"li\");p.addClass(t.domElement,\"has-save\"),t.__ul.insertBefore(n,t.__ul.firstChild),p.addClass(n,\"save-row\");var o=document.createElement(\"span\");o.innerHTML=\"&nbsp;\",p.addClass(o,\"button gears\");var i=document.createElement(\"span\");i.innerHTML=\"Save\",p.addClass(i,\"button\"),p.addClass(i,\"save\");var r=document.createElement(\"span\");r.innerHTML=\"New\",p.addClass(r,\"button\"),p.addClass(r,\"save-as\");var s=document.createElement(\"span\");s.innerHTML=\"Revert\",p.addClass(s,\"button\"),p.addClass(s,\"revert\");var a=t.__preset_select=document.createElement(\"select\");if(t.load&&t.load.remembered?f.each(t.load.remembered,function(e,n){C(t,n,n==t.preset)}):C(t,O,!1),p.bind(a,\"change\",function(){for(var e=0;e<t.__preset_select.length;e++)t.__preset_select[e].innerHTML=t.__preset_select[e].value;t.preset=this.value}),n.appendChild(a),n.appendChild(o),n.appendChild(i),n.appendChild(r),n.appendChild(s),F){var l=document.getElementById(\"dg-save-locally\"),d=document.getElementById(\"dg-local-explain\");l.style.display=\"block\";var c=document.getElementById(\"dg-local-storage\");\"true\"===localStorage.getItem(y(t,\"isLocal\"))&&c.setAttribute(\"checked\",\"checked\"),e(),p.bind(c,\"change\",function(){t.useLocalStorage=!t.useLocalStorage,e()})}var u=document.getElementById(\"dg-new-constructor\");p.bind(u,\"keydown\",function(t){!t.metaKey||67!==t.which&&67!=t.keyCode||S.hide()}),p.bind(o,\"click\",function(){u.innerHTML=JSON.stringify(t.getSaveObject(),void 0,2),S.show(),u.focus(),u.select()}),p.bind(i,\"click\",function(){t.save()}),p.bind(r,\"click\",function(){var e=prompt(\"Enter a new preset name.\");e&&t.saveAs(e)}),p.bind(s,\"click\",function(){t.revert()})}function w(t){function e(e){return e.preventDefault(),i=e.clientX,p.addClass(t.__closeButton,U.CLASS_DRAG),p.bind(window,\"mousemove\",n),p.bind(window,\"mouseup\",o),!1}function n(e){return e.preventDefault(),t.width+=i-e.clientX,t.onResize(),i=e.clientX,!1}function o(){p.removeClass(t.__closeButton,U.CLASS_DRAG),p.unbind(window,\"mousemove\",n),p.unbind(window,\"mouseup\",o)}t.__resize_handle=document.createElement(\"div\"),f.extend(t.__resize_handle.style,{width:\"6px\",marginLeft:\"-3px\",height:\"200px\",cursor:\"ew-resize\",position:\"absolute\"});var i;p.bind(t.__resize_handle,\"mousedown\",e),p.bind(t.__closeButton,\"mousedown\",e),t.domElement.insertBefore(t.__resize_handle,t.domElement.firstElementChild)}function A(t,e){t.domElement.style.width=e+\"px\",t.__save_row&&t.autoPlace&&(t.__save_row.style.width=e+\"px\"),t.__closeButton&&(t.__closeButton.style.width=e+\"px\")}function x(t,e){var n={};return f.each(t.__rememberedObjects,function(o,i){var r={},s=t.__rememberedObjectIndecesToControllers[i];f.each(s,function(t,n){r[n]=e?t.initialValue:t.getValue()}),n[i]=r}),n}function C(t,e,n){var o=document.createElement(\"option\");o.innerHTML=e,o.value=e,t.__preset_select.appendChild(o),n&&(t.__preset_select.selectedIndex=t.__preset_select.length-1)}function k(t){for(var e=0;e<t.__preset_select.length;e++)t.__preset_select[e].value==t.preset&&(t.__preset_select.selectedIndex=e)}function E(t,e){var n=t.__preset_select[t.__preset_select.selectedIndex];e?n.innerHTML=n.value+\"*\":n.innerHTML=n.value}function B(t){0!=t.length&&u(function(){B(t)}),f.each(t,function(t){t.updateDisplay()})}t.inject(n);var S,L,I=\"dg\",T=72,R=20,O=\"Default\",F=function(){try{return\"localStorage\"in window&&null!==window.localStorage}catch(t){return!1}}(),D=!0,M=!1,P=[],U=function(t){function e(){var t=n.getRoot();t.width+=1,f.defer(function(){t.width-=1})}var n=this;this.domElement=document.createElement(\"div\"),this.__ul=document.createElement(\"ul\"),this.domElement.appendChild(this.__ul),p.addClass(this.domElement,I),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],t=t||{},t=f.defaults(t,{autoPlace:!0,width:U.DEFAULT_WIDTH}),t=f.defaults(t,{resizable:t.autoPlace,hideable:t.autoPlace}),f.isUndefined(t.load)?t.load={preset:O}:t.preset&&(t.load.preset=t.preset),f.isUndefined(t.parent)&&t.hideable&&P.push(this),t.resizable=f.isUndefined(t.parent)&&t.resizable,t.autoPlace&&f.isUndefined(t.scrollable)&&(t.scrollable=!0);var o,i=F&&\"true\"===localStorage.getItem(y(this,\"isLocal\"));if(Object.defineProperties(this,{parent:{get:function(){return t.parent}},scrollable:{get:function(){return t.scrollable}},autoPlace:{get:function(){return t.autoPlace}},preset:{get:function(){return n.parent?n.getRoot().preset:t.load.preset},set:function(e){n.parent?n.getRoot().preset=e:t.load.preset=e,k(this),n.revert()}},width:{get:function(){return t.width},set:function(e){t.width=e,A(n,e)}},name:{get:function(){return t.name},set:function(e){t.name=e,s&&(s.innerHTML=t.name)}},closed:{get:function(){return t.closed},set:function(e){t.closed=e,t.closed?p.addClass(n.__ul,U.CLASS_CLOSED):p.removeClass(n.__ul,U.CLASS_CLOSED),this.onResize(),n.__closeButton&&(n.__closeButton.innerHTML=e?U.TEXT_OPEN:U.TEXT_CLOSED)}},load:{get:function(){return t.load}},useLocalStorage:{get:function(){return i},set:function(t){F&&(i=t,t?p.bind(window,\"unload\",o):p.unbind(window,\"unload\",o),localStorage.setItem(y(n,\"isLocal\"),t))}}}),f.isUndefined(t.parent)){if(t.closed=!1,p.addClass(this.domElement,U.CLASS_MAIN),p.makeSelectable(this.domElement,!1),F&&i){n.useLocalStorage=!0;var r=localStorage.getItem(y(this,\"gui\"));r&&(t.load=JSON.parse(r))}this.__closeButton=document.createElement(\"div\"),this.__closeButton.innerHTML=U.TEXT_CLOSED,p.addClass(this.__closeButton,U.CLASS_CLOSE_BUTTON),this.domElement.appendChild(this.__closeButton),p.bind(this.__closeButton,\"click\",function(){n.closed=!n.closed})}else{void 0===t.closed&&(t.closed=!0);var s=document.createTextNode(t.name);p.addClass(s,\"controller-name\");var a=m(n,s),l=function(t){return t.preventDefault(),n.closed=!n.closed,n.parent.onResize(),!1};p.addClass(this.__ul,U.CLASS_CLOSED),p.addClass(a,\"title\"),p.bind(a,\"click\",l),t.closed||(this.closed=!1)}t.autoPlace&&(f.isUndefined(t.parent)&&(D&&(L=document.createElement(\"div\"),p.addClass(L,I),p.addClass(L,U.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(L),D=!1),L.appendChild(this.domElement),p.addClass(this.domElement,U.CLASS_AUTO_PLACE)),this.parent||A(n,t.width)),p.bind(window,\"resize\",function(){n.onResize()}),p.bind(this.__ul,\"webkitTransitionEnd\",function(){n.onResize()}),p.bind(this.__ul,\"transitionend\",function(){n.onResize()}),p.bind(this.__ul,\"oTransitionEnd\",function(){n.onResize()}),this.onResize(),t.resizable&&w(this),o=function(){F&&\"true\"===localStorage.getItem(y(n,\"isLocal\"))&&localStorage.setItem(y(n,\"gui\"),JSON.stringify(n.getSaveObject()))},this.saveToLocalStorageIfPossible=o;n.getRoot();t.parent||e()};return U.toggleHide=function(){M=!M,f.each(P,function(t){t.domElement.style.zIndex=M?-999:999,t.domElement.style.opacity=M?0:1})},U.CLASS_AUTO_PLACE=\"a\",U.CLASS_AUTO_PLACE_CONTAINER=\"ac\",U.CLASS_MAIN=\"main\",U.CLASS_CONTROLLER_ROW=\"cr\",U.CLASS_TOO_TALL=\"taller-than-window\",U.CLASS_CLOSED=\"closed\",U.CLASS_CLOSE_BUTTON=\"close-button\",U.CLASS_DRAG=\"drag\",U.DEFAULT_WIDTH=240,U.TEXT_CLOSED=\"Close Controls\",U.TEXT_OPEN=\"Open Controls\",p.bind(window,\"keydown\",function(t){\"text\"===document.activeElement.type||t.which!==T&&t.keyCode!=T||U.toggleHide()},!1),f.extend(U.prototype,{setObject:function(t){this._defTarget=t},def:function(t,e){var n=this._defTarget||window;return void 0!==e&&(n[t]=e),g(this,n,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},defColor:function(t,e){var n=this._defTarget||window;return void 0!==e&&(n[t]=e),g(this,n,t,{color:!0})},add:function(t,e){return g(this,t,e,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(t,e){return g(this,t,e,{color:!0})},remove:function(t){this.__ul.removeChild(t.__li),this.__controllers.splice(this.__controllers.indexOf(t),1);var e=this;f.defer(function(){e.onResize()})},destroy:function(){this.autoPlace&&L.removeChild(this.domElement)},addFolder:function(t){if(void 0!==this.__folders[t])throw new Error('You already have a folder in this GUI by the name \"'+t+'\"');var e={name:t,parent:this};e.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[t]&&(e.closed=this.load.folders[t].closed,e.load=this.load.folders[t]);var n=new U(e);this.__folders[t]=n;var o=m(this,n.domElement);return p.addClass(o,\"folder\"),n},open:function(){this.closed=!1},close:function(){this.closed=!0},onResize:function(){var t=this.getRoot();if(t.scrollable){var e=p.getOffset(t.__ul).top,n=0;f.each(t.__ul.childNodes,function(e){t.autoPlace&&e===t.__save_row||(n+=p.getHeight(e))}),window.innerHeight-e-R<n?(p.addClass(t.domElement,U.CLASS_TOO_TALL),t.__ul.style.height=window.innerHeight-e-R+\"px\"):(p.removeClass(t.domElement,U.CLASS_TOO_TALL),t.__ul.style.height=\"auto\")}t.__resize_handle&&f.defer(function(){t.__resize_handle.style.height=t.__ul.offsetHeight+\"px\"}),t.__closeButton&&(t.__closeButton.style.width=t.width+\"px\")},remember:function(){if(f.isUndefined(S)&&(S=new h,S.domElement.innerHTML=e),this.parent)throw new Error(\"You can only call remember on a top level GUI.\");var t=this;f.each(Array.prototype.slice.call(arguments),function(e){0==t.__rememberedObjects.length&&v(t),t.__rememberedObjects.indexOf(e)==-1&&t.__rememberedObjects.push(e)}),this.autoPlace&&A(this,this.width)},getRoot:function(){for(var t=this;t.parent;)t=t.parent;return t},getSaveObject:function(){var t=this.load;return t.closed=this.closed,this.__rememberedObjects.length>0&&(t.preset=this.preset,t.remembered||(t.remembered={}),t.remembered[this.preset]=x(this)),t.folders={},f.each(this.__folders,function(e,n){t.folders[n]=e.getSaveObject()}),t},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=x(this),E(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(t){this.load.remembered||(this.load.remembered={},this.load.remembered[O]=x(this,!0)),this.load.remembered[t]=x(this),this.preset=t,C(this,t,!0),this.saveToLocalStorageIfPossible()},revert:function(t){f.each(this.__controllers,function(e){this.getRoot().load.remembered?_(t||this.getRoot(),e):e.setValue(e.initialValue)},this),f.each(this.__folders,function(t){t.revert(t)}),t||E(this.getRoot(),!1)},listen:function(t){var e=0==this.__listening.length;this.__listening.push(t),e&&B(this.__listening)}}),U}(n.utils.css,'<div id=\"dg-save\" class=\"dg dialogue\">\\n\\n  Here\\'s the new load parameter for your <code>GUI</code>\\'s constructor:\\n\\n  <textarea id=\"dg-new-constructor\"></textarea>\\n\\n  <div id=\"dg-save-locally\">\\n\\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\\n    values to <code>localStorage</code> on exit.\\n\\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\\n      override those passed to <code>dat.GUI</code>\\'s constructor. This makes it\\n      easier to work incrementally, but <code>localStorage</code> is fragile,\\n      and your friends may not see the same values you do.\\n      \\n    </div>\\n    \\n  </div>\\n\\n</div>',\".dg {\\n  /** Clear list styles */\\n  /* Auto-place container */\\n  /* Auto-placed GUI's */\\n  /* Line items that don't contain folders. */\\n  /** Folder names */\\n  /** Hides closed items */\\n  /** Controller row */\\n  /** Name-half (left) */\\n  /** Controller-half (right) */\\n  /** Controller placement */\\n  /** Shorter number boxes when slider is present. */\\n  /** Ensure the entire boolean and function row shows a hand */ }\\n  .dg ul {\\n    list-style: none;\\n    margin: 0;\\n    padding: 0;\\n    width: 100%;\\n    clear: both; }\\n  .dg.ac {\\n    position: fixed;\\n    top: 0;\\n    left: 0;\\n    right: 0;\\n    height: 0;\\n    z-index: 0; }\\n  .dg:not(.ac) .main {\\n    /** Exclude mains in ac so that we don't hide close button */\\n    overflow: hidden; }\\n  .dg.main {\\n    -webkit-transition: opacity 0.1s linear;\\n    -o-transition: opacity 0.1s linear;\\n    -moz-transition: opacity 0.1s linear;\\n    transition: opacity 0.1s linear; }\\n    .dg.main.taller-than-window {\\n      overflow-y: auto; }\\n      .dg.main.taller-than-window .close-button {\\n        opacity: 1;\\n        /* TODO, these are style notes */\\n        margin-top: -1px;\\n        border-top: 1px solid #2c2c2c; }\\n    .dg.main ul.closed .close-button {\\n      opacity: 1 !important; }\\n    .dg.main:hover .close-button,\\n    .dg.main .close-button.drag {\\n      opacity: 1; }\\n    .dg.main .close-button {\\n      /*opacity: 0;*/\\n      -webkit-transition: opacity 0.1s linear;\\n      -o-transition: opacity 0.1s linear;\\n      -moz-transition: opacity 0.1s linear;\\n      transition: opacity 0.1s linear;\\n      border: 0;\\n      position: absolute;\\n      line-height: 19px;\\n      height: 20px;\\n      /* TODO, these are style notes */\\n      cursor: pointer;\\n      text-align: center;\\n      background-color: #000; }\\n      .dg.main .close-button:hover {\\n        background-color: #111; }\\n  .dg.a {\\n    float: right;\\n    margin-right: 15px;\\n    overflow-x: hidden; }\\n    .dg.a.has-save > ul {\\n      margin-top: 27px; }\\n      .dg.a.has-save > ul.closed {\\n        margin-top: 0; }\\n    .dg.a .save-row {\\n      position: fixed;\\n      top: 0;\\n      z-index: 1002; }\\n  .dg li {\\n    -webkit-transition: height 0.1s ease-out;\\n    -o-transition: height 0.1s ease-out;\\n    -moz-transition: height 0.1s ease-out;\\n    transition: height 0.1s ease-out; }\\n  .dg li:not(.folder) {\\n    cursor: auto;\\n    height: 27px;\\n    line-height: 27px;\\n    overflow: hidden;\\n    padding: 0 4px 0 5px; }\\n  .dg li.folder {\\n    padding: 0;\\n    border-left: 4px solid rgba(0, 0, 0, 0); }\\n  .dg li.title {\\n    cursor: pointer;\\n    margin-left: -4px; }\\n  .dg .closed li:not(.title),\\n  .dg .closed ul li,\\n  .dg .closed ul li > * {\\n    height: 0;\\n    overflow: hidden;\\n    border: 0; }\\n  .dg .cr {\\n    clear: both;\\n    padding-left: 3px;\\n    height: 27px; }\\n  .dg .property-name {\\n    cursor: default;\\n    float: left;\\n    clear: left;\\n    width: 40%;\\n    overflow: hidden;\\n    text-overflow: ellipsis; }\\n  .dg .c {\\n    float: left;\\n    width: 60%; }\\n  .dg .c input[type=text] {\\n    border: 0;\\n    margin-top: 4px;\\n    padding: 3px;\\n    width: 100%;\\n    float: right; }\\n  .dg .has-slider input[type=text] {\\n    width: 30%;\\n    /*display: none;*/\\n    margin-left: 0; }\\n  .dg .slider {\\n    float: left;\\n    width: 66%;\\n    margin-left: -5px;\\n    margin-right: 0;\\n    height: 19px;\\n    margin-top: 4px; }\\n  .dg .slider-fg {\\n    height: 100%; }\\n  .dg .c input[type=checkbox] {\\n    margin-top: 9px; }\\n  .dg .c select {\\n    margin-top: 5px; }\\n  .dg .cr.function,\\n  .dg .cr.function .property-name,\\n  .dg .cr.function *,\\n  .dg .cr.boolean,\\n  .dg .cr.boolean * {\\n    cursor: pointer; }\\n  .dg .selector {\\n    display: none;\\n    position: absolute;\\n    margin-left: -9px;\\n    margin-top: 23px;\\n    z-index: 10; }\\n  .dg .c:hover .selector,\\n  .dg .selector.drag {\\n    display: block; }\\n  .dg li.save-row {\\n    padding: 0; }\\n    .dg li.save-row .button {\\n      display: inline-block;\\n      padding: 0px 6px; }\\n  .dg.dialogue {\\n    background-color: #222;\\n    width: 460px;\\n    padding: 15px;\\n    font-size: 13px;\\n    line-height: 15px; }\\n\\n/* TODO Separate style and structure */\\n#dg-new-constructor {\\n  padding: 10px;\\n  color: #222;\\n  font-family: Monaco, monospace;\\n  font-size: 10px;\\n  border: 0;\\n  resize: none;\\n  box-shadow: inset 1px 1px 1px #888;\\n  word-wrap: break-word;\\n  margin: 12px 0;\\n  display: block;\\n  width: 440px;\\n  overflow-y: scroll;\\n  height: 100px;\\n  position: relative; }\\n\\n#dg-local-explain {\\n  display: none;\\n  font-size: 11px;\\n  line-height: 17px;\\n  border-radius: 3px;\\n  background-color: #333;\\n  padding: 8px;\\n  margin-top: 10px; }\\n  #dg-local-explain code {\\n    font-size: 10px; }\\n\\n#dat-gui-save-locally {\\n  display: none; }\\n\\n/** Main type */\\n.dg {\\n  color: #eee;\\n  font: 11px 'Lucida Grande', sans-serif;\\n  text-shadow: 0 -1px 0 #111;\\n  /** Auto place */\\n  /* Controller row, <li> */\\n  /** Controllers */ }\\n  .dg.main {\\n    /** Scrollbar */ }\\n    .dg.main::-webkit-scrollbar {\\n      width: 5px;\\n      background: #1a1a1a; }\\n    .dg.main::-webkit-scrollbar-corner {\\n      height: 0;\\n      display: none; }\\n    .dg.main::-webkit-scrollbar-thumb {\\n      border-radius: 5px;\\n      background: #676767; }\\n  .dg li:not(.folder) {\\n    background: #1a1a1a;\\n    border-bottom: 1px solid #2c2c2c; }\\n  .dg li.save-row {\\n    line-height: 25px;\\n    background: #dad5cb;\\n    border: 0; }\\n    .dg li.save-row select {\\n      margin-left: 5px;\\n      width: 108px; }\\n    .dg li.save-row .button {\\n      margin-left: 5px;\\n      margin-top: 1px;\\n      border-radius: 2px;\\n      font-size: 9px;\\n      line-height: 7px;\\n      padding: 4px 4px 5px 4px;\\n      background: #c5bdad;\\n      color: #fff;\\n      text-shadow: 0 1px 0 #b0a58f;\\n      box-shadow: 0 -1px 0 #b0a58f;\\n      cursor: pointer; }\\n      .dg li.save-row .button.gears {\\n        background: #c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;\\n        height: 7px;\\n        width: 8px; }\\n      .dg li.save-row .button:hover {\\n        background-color: #bab19e;\\n        box-shadow: 0 -1px 0 #b0a58f; }\\n  .dg li.folder {\\n    border-bottom: 0; }\\n  .dg li.title {\\n    padding-left: 16px;\\n    background: black url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;\\n    cursor: pointer;\\n    border-bottom: 1px solid rgba(255, 255, 255, 0.2); }\\n  .dg .closed li.title {\\n    background-image: url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==); }\\n  .dg .cr.boolean {\\n    border-left: 3px solid #806787; }\\n  .dg .cr.function {\\n    border-left: 3px solid #e61d5f; }\\n  .dg .cr.number {\\n    border-left: 3px solid #2fa1d6; }\\n    .dg .cr.number input[type=text] {\\n      color: #2fa1d6; }\\n  .dg .cr.string {\\n    border-left: 3px solid #1ed36f; }\\n    .dg .cr.string input[type=text] {\\n      color: #1ed36f; }\\n  .dg .cr.function:hover, .dg .cr.boolean:hover {\\n    background: #111; }\\n  .dg .c input[type=text] {\\n    background: #303030;\\n    outline: none; }\\n    .dg .c input[type=text]:hover {\\n      background: #3c3c3c; }\\n    .dg .c input[type=text]:focus {\\n      background: #494949;\\n      color: #fff; }\\n  .dg .c .slider {\\n    background: #303030;\\n    cursor: ew-resize; }\\n  .dg .c .slider-fg {\\n    background: #2fa1d6; }\\n  .dg .c .slider:hover {\\n    background: #3c3c3c; }\\n    .dg .c .slider:hover .slider-fg {\\n      background: #44abda; }\\n\",n.controllers.factory=function(t,e,n,o,i,r,s){return function(a,l){var d=a[l];return s.isArray(arguments[2])||s.isObject(arguments[2])?new t(a,l,arguments[2]):s.isNumber(d)?s.isNumber(arguments[2])&&s.isNumber(arguments[3])?new n(a,l,arguments[2],arguments[3]):new e(a,l,{min:arguments[2],max:arguments[3]}):s.isString(d)?new o(a,l):s.isFunction(d)?new i(a,l,\"\"):s.isBoolean(d)?new r(a,l):void 0}}(n.controllers.OptionController,n.controllers.NumberControllerBox,n.controllers.NumberControllerSlider,n.controllers.StringController=function(t,e,n){var o=function(t,n){function i(){s.setValue(s.__input.value)}function r(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}o.superclass.call(this,t,n);var s=this;this.__input=document.createElement(\"input\"),this.__input.setAttribute(\"type\",\"text\"),e.bind(this.__input,\"keyup\",i),e.bind(this.__input,\"change\",i),e.bind(this.__input,\"blur\",r),e.bind(this.__input,\"keydown\",function(t){13===t.keyCode&&this.blur()}),this.updateDisplay(),this.domElement.appendChild(this.__input)};return o.superclass=t,n.extend(o.prototype,t.prototype,{updateDisplay:function(){return e.isActive(this.__input)||(this.__input.value=this.getValue()),o.superclass.prototype.updateDisplay.call(this)}}),o}(n.controllers.Controller,n.dom.dom,n.utils.common),n.controllers.FunctionController,n.controllers.BooleanController,n.utils.common),n.controllers.Controller,n.controllers.BooleanController,n.controllers.FunctionController,n.controllers.NumberControllerBox,n.controllers.NumberControllerSlider,n.controllers.OptionController,n.controllers.ColorController=function(t,e,n,o,i){function r(t,e,n,o){t.style.background=\"\",i.each(l,function(i){t.style.cssText+=\"background: \"+i+\"linear-gradient(\"+e+\", \"+n+\" 0%, \"+o+\" 100%); \"})}function s(t){t.style.background=\"\",t.style.cssText+=\"background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);\",t.style.cssText+=\"background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);\",t.style.cssText+=\"background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);\",t.style.cssText+=\"background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);\",t.style.cssText+=\"background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);\"}var a=function(t,l,d){function c(t){f(t),e.bind(window,\"mousemove\",f),e.bind(window,\"mouseup\",u)}function u(){e.unbind(window,\"mousemove\",f),e.unbind(window,\"mouseup\",u)}function h(){var t=o(this.value);t!==!1?(m.__color.__state=t,m.setValue(m.__color.toOriginal())):this.value=m.__color.toString()}function p(){e.unbind(window,\"mousemove\",g),e.unbind(window,\"mouseup\",p)}function f(n){n.preventDefault();var o=e.getWidth(m.__saturation_field),i=e.getOffset(m.__saturation_field),r=(n.clientX-i.left+document.body.scrollLeft)/o,s=1-(n.clientY-i.top+document.body.scrollTop+t.getRoot().domElement.scrollTop)/o;return s>1?s=1:s<0&&(s=0),r>1?r=1:r<0&&(r=0),m.__color.v=s,m.__color.s=r,m.setValue(m.__color.toOriginal()),!1}function g(n){n.preventDefault();var o=e.getHeight(m.__hue_field),i=e.getOffset(m.__hue_field),r=1-(n.clientY-i.top+document.body.scrollTop+t.getRoot().domElement.scrollTop)/o;return r>1?r=1:r<0&&(r=0),m.__color.h=360*r,m.setValue(m.__color.toOriginal()),!1}a.superclass.call(this,l,d),this.__color=new n(this.getValue()),this.__temp=new n(0);var m=this;this.domElement=document.createElement(\"div\"),e.makeSelectable(this.domElement,!1),this.__selector=document.createElement(\"div\"),this.__selector.className=\"selector\",this.__saturation_field=document.createElement(\"div\"),this.__saturation_field.className=\"saturation-field\",this.__field_knob=document.createElement(\"div\"),this.__field_knob.className=\"field-knob\",this.__field_knob_border=\"2px solid \",this.__hue_knob=document.createElement(\"div\"),this.__hue_knob.className=\"hue-knob\",this.__hue_field=document.createElement(\"div\"),this.__hue_field.className=\"hue-field\",this.__input=document.createElement(\"input\"),this.__input.type=\"text\",this.__input_textShadow=\"0 1px 1px \",e.bind(this.__input,\"keydown\",function(t){13===t.keyCode&&h.call(this)}),e.bind(this.__input,\"blur\",h),e.bind(this.__selector,\"mousedown\",function(t){e.addClass(this,\"drag\").bind(window,\"mouseup\",function(t){e.removeClass(m.__selector,\"drag\")})});var b=document.createElement(\"div\");i.extend(this.__selector.style,{width:\"122px\",height:\"102px\",padding:\"3px\",backgroundColor:\"#222\",boxShadow:\"0px 1px 3px rgba(0,0,0,0.3)\"}),i.extend(this.__field_knob.style,{position:\"absolute\",width:\"12px\",height:\"12px\",border:this.__field_knob_border+(this.__color.v<.5?\"#fff\":\"#000\"),boxShadow:\"0px 1px 3px rgba(0,0,0,0.5)\",borderRadius:\"12px\",zIndex:1}),i.extend(this.__hue_knob.style,{position:\"absolute\",width:\"15px\",height:\"2px\",borderRight:\"4px solid #fff\",zIndex:1}),i.extend(this.__saturation_field.style,{width:\"100px\",height:\"100px\",border:\"1px solid #555\",marginRight:\"3px\",display:\"inline-block\",cursor:\"pointer\"}),i.extend(b.style,{width:\"100%\",height:\"100%\",background:\"none\"}),r(b,\"top\",\"rgba(0,0,0,0)\",\"#000\"),i.extend(this.__hue_field.style,{width:\"15px\",height:\"100px\",display:\"inline-block\",border:\"1px solid #555\",cursor:\"ns-resize\"}),s(this.__hue_field),i.extend(this.__input.style,{outline:\"none\",textAlign:\"center\",color:\"#fff\",border:0,fontWeight:\"bold\",textShadow:this.__input_textShadow+\"rgba(0,0,0,0.7)\"}),e.bind(this.__saturation_field,\"mousedown\",c),e.bind(this.__field_knob,\"mousedown\",c),e.bind(this.__hue_field,\"mousedown\",function(t){g(t),e.bind(window,\"mousemove\",g),e.bind(window,\"mouseup\",p)}),this.__saturation_field.appendChild(b),this.__selector.appendChild(this.__field_knob),this.__selector.appendChild(this.__saturation_field),this.__selector.appendChild(this.__hue_field),this.__hue_field.appendChild(this.__hue_knob),this.domElement.appendChild(this.__input),this.domElement.appendChild(this.__selector),this.updateDisplay()};a.superclass=t,i.extend(a.prototype,t.prototype,{updateDisplay:function(){var t=o(this.getValue());if(t!==!1){var e=!1;i.each(n.COMPONENTS,function(n){if(!i.isUndefined(t[n])&&!i.isUndefined(this.__color.__state[n])&&t[n]!==this.__color.__state[n])return e=!0,{}},this),e&&i.extend(this.__color.__state,t)}i.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,a=255-s;i.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+\"px\",\nmarginTop:100*(1-this.__color.v)-7+\"px\",backgroundColor:this.__temp.toString(),border:this.__field_knob_border+\"rgb(\"+s+\",\"+s+\",\"+s+\")\"}),this.__hue_knob.style.marginTop=100*(1-this.__color.h/360)+\"px\",this.__temp.s=1,this.__temp.v=1,r(this.__saturation_field,\"left\",\"#fff\",this.__temp.toString()),i.extend(this.__input.style,{backgroundColor:this.__input.value=this.__color.toString(),color:\"rgb(\"+s+\",\"+s+\",\"+s+\")\",textShadow:this.__input_textShadow+\"rgba(\"+a+\",\"+a+\",\"+a+\",.7)\"})}});var l=[\"-moz-\",\"-o-\",\"-webkit-\",\"-ms-\",\"\"];return a}(n.controllers.Controller,n.dom.dom,n.color.Color=function(t,e,n,o){function i(t,e,n){Object.defineProperty(t,e,{get:function(){return\"RGB\"===this.__state.space?this.__state[e]:(s(this,e,n),this.__state[e])},set:function(t){\"RGB\"!==this.__state.space&&(s(this,e,n),this.__state.space=\"RGB\"),this.__state[e]=t}})}function r(t,e){Object.defineProperty(t,e,{get:function(){return\"HSV\"===this.__state.space?this.__state[e]:(a(this),this.__state[e])},set:function(t){\"HSV\"!==this.__state.space&&(a(this),this.__state.space=\"HSV\"),this.__state[e]=t}})}function s(t,n,i){if(\"HEX\"===t.__state.space)t.__state[n]=e.component_from_hex(t.__state.hex,i);else{if(\"HSV\"!==t.__state.space)throw\"Corrupted color state\";o.extend(t.__state,e.hsv_to_rgb(t.__state.h,t.__state.s,t.__state.v))}}function a(t){var n=e.rgb_to_hsv(t.r,t.g,t.b);o.extend(t.__state,{s:n.s,v:n.v}),o.isNaN(n.h)?o.isUndefined(t.__state.h)&&(t.__state.h=0):t.__state.h=n.h}var l=function(){if(this.__state=t.apply(this,arguments),this.__state===!1)throw\"Failed to interpret color arguments\";this.__state.a=this.__state.a||1};return l.COMPONENTS=[\"r\",\"g\",\"b\",\"h\",\"s\",\"v\",\"hex\",\"a\"],o.extend(l.prototype,{toString:function(){return n(this)},toOriginal:function(){return this.__state.conversion.write(this)}}),i(l.prototype,\"r\",2),i(l.prototype,\"g\",1),i(l.prototype,\"b\",0),r(l.prototype,\"h\"),r(l.prototype,\"s\"),r(l.prototype,\"v\"),Object.defineProperty(l.prototype,\"a\",{get:function(){return this.__state.a},set:function(t){this.__state.a=t}}),Object.defineProperty(l.prototype,\"hex\",{get:function(){return\"HEX\"!==!this.__state.space&&(this.__state.hex=e.rgb_to_hex(this.r,this.g,this.b)),this.__state.hex},set:function(t){this.__state.space=\"HEX\",this.__state.hex=t}}),l}(n.color.interpret,n.color.math=function(){var t;return{hsv_to_rgb:function(t,e,n){var o=Math.floor(t/60)%6,i=t/60-Math.floor(t/60),r=n*(1-e),s=n*(1-i*e),a=n*(1-(1-i)*e),l=[[n,a,r],[s,n,r],[r,n,a],[r,s,n],[a,r,n],[n,r,s]][o];return{r:255*l[0],g:255*l[1],b:255*l[2]}},rgb_to_hsv:function(t,e,n){var o,i,r=Math.min(t,e,n),s=Math.max(t,e,n),a=s-r;return 0==s?{h:NaN,s:0,v:0}:(i=a/s,o=t==s?(e-n)/a:e==s?2+(n-t)/a:4+(t-e)/a,o/=6,o<0&&(o+=1),{h:360*o,s:i,v:s/255})},rgb_to_hex:function(t,e,n){var o=this.hex_with_component(0,2,t);return o=this.hex_with_component(o,1,e),o=this.hex_with_component(o,0,n)},component_from_hex:function(t,e){return t>>8*e&255},hex_with_component:function(e,n,o){return o<<(t=8*n)|e&~(255<<t)}}}(),n.color.toString,n.utils.common),n.color.interpret,n.utils.common),n.utils.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t,e){window.setTimeout(t,1e3/60)}}(),n.dom.CenteredDiv=function(t,e){var n=function(){this.backgroundElement=document.createElement(\"div\"),e.extend(this.backgroundElement.style,{backgroundColor:\"rgba(0,0,0,0.8)\",top:0,left:0,display:\"none\",zIndex:\"1000\",opacity:0,WebkitTransition:\"opacity 0.2s linear\",transition:\"opacity 0.2s linear\"}),t.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position=\"fixed\",this.domElement=document.createElement(\"div\"),e.extend(this.domElement.style,{position:\"fixed\",display:\"none\",zIndex:\"1001\",opacity:0,WebkitTransition:\"-webkit-transform 0.2s ease-out, opacity 0.2s linear\",transition:\"transform 0.2s ease-out, opacity 0.2s linear\"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var n=this;t.bind(this.backgroundElement,\"click\",function(){n.hide()})};return n.prototype.show=function(){var t=this;this.backgroundElement.style.display=\"block\",this.domElement.style.display=\"block\",this.domElement.style.opacity=0,this.domElement.style.webkitTransform=\"scale(1.1)\",this.layout(),e.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform=\"scale(1)\"})},n.prototype.hide=function(){var e=this,n=function(){e.domElement.style.display=\"none\",e.backgroundElement.style.display=\"none\",t.unbind(e.domElement,\"webkitTransitionEnd\",n),t.unbind(e.domElement,\"transitionend\",n),t.unbind(e.domElement,\"oTransitionEnd\",n)};t.bind(this.domElement,\"webkitTransitionEnd\",n),t.bind(this.domElement,\"transitionend\",n),t.bind(this.domElement,\"oTransitionEnd\",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform=\"scale(1.1)\"},n.prototype.layout=function(){this.domElement.style.left=window.innerWidth/2-t.getWidth(this.domElement)/2+\"px\",this.domElement.style.top=window.innerHeight/2-t.getHeight(this.domElement)/2+\"px\"},n}(n.dom.dom,n.utils.common),n.dom.dom,n.utils.common),t.exports=n},function(t,e,n){p5.prototype.toggleLoop=function(){var t=this._isGlobal?window:this;this._loop?t.noLoop():t.loop()},p5.prototype.isLooping=function(){return this._loop},p5.prototype.registerInstanceMethod=function(t,e,n){var o=this._isGlobal?window:this;if((void 0===e||\"pre\"!=e&&\"post\"!=e)&&(e=\"post\"),o.hasOwnProperty(\"_registeredInstanceMethods\")||(o._registeredInstanceMethods={}),o._registeredInstanceMethods.hasOwnProperty(t)||(o._registeredInstanceMethods[t]={}),!o._registeredInstanceMethods[t].hasOwnProperty(e)){o._registeredInstanceMethods[t][e]=[];var i=o[t];\"pre\"==e?o[t]=function(){return o._registeredInstanceMethods[t].pre.forEach(function(t){\"function\"==typeof t&&t.call(this)},this),i.apply(this,arguments)}:o[t]=function(){var e=i.apply(this,arguments);return o._registeredInstanceMethods[t].post.forEach(function(t){\"function\"==typeof t&&t.call(this)},this),e}}o._registeredInstanceMethods[t][e].push(n)},p5.prototype.createToy=function(t){var e=this._isGlobal?window:this;t&&\"string\"==typeof t&&(t=document.querySelector(t)),t||(t=e._curElement.parent()),n(6);var o=n(10),i=document.createElement(\"div\");i.innerHTML=o;var r=i.firstElementChild,s=r.firstElementChild,a=s.querySelector(\".p5toy-canvas\"),l=s.querySelector(\".p5toy-menu\");t.appendChild(r),e._curElement.parent(a);var d=s.querySelector(\".p5toy-buttons\"),c=s.querySelector(\".p5toy-play\"),u=s.querySelector(\".p5toy-snapshot\"),h=s.querySelector(\".p5toy-png\"),p=s.querySelector(\".p5toy-record\"),f=s.querySelector(\".p5toy-record-progress-1\"),g=s.querySelector(\".p5toy-record-progress-2\"),m=s.querySelector(\".p5toy-gif\"),b=s.querySelector(\".p5toy-close\"),_=e.createGUI({scrollable:!1,autoPlace:!1});l.appendChild(_.domElement),e._buttonSize=60;var y=function(){var t=a.offsetWidth;s.classList.contains(\"side\")&&(t+=20+l.offsetWidth),r.style.width=t+\"px\",r.style.height=s.offsetHeight+\"px\"},v=function(){this._setupDone&&e.resizeCanvas(e.width,e.height),a.style.minHeight=a.style.minWidth=4*e._buttonSize+\"px\",_.domElement.style.maxWidth=4*e._buttonSize+\"px\",_.domElement.style.minHeight=240-d.offsetHeight+\"px\",_.domElement.style.maxHeight=Math.max(4*e._buttonSize,e.height)-d.offsetHeight+\"px\",y()}.bind(this);v(),s.addEventListener(\"keydown\",function(t){t.ctrlKey||32!=t.which||(e.toggleLoop(),t.preventDefault())}),window.addEventListener(\"keydown\",function(t){t.ctrlKey&&32==t.which&&(e.toggleLoop(),t.preventDefault())}),c.addEventListener(\"click\",function(){e.isLooping()?e.pauseButton():e.playButton()}),this.registerInstanceMethod(\"noLoop\",\"post\",function(){c.classList.add(\"paused\")}),this.registerInstanceMethod(\"loop\",\"post\",function(){c.classList.remove(\"paused\")}),u.addEventListener(\"click\",function(){e.push(),e.snapshotButton(),e.pop(),u.classList.add(\"download\");var t=e._curElement.elt.toDataURL(\"image/png\");h.setAttribute(\"href\",t)}),h.addEventListener(\"click\",function(t){u.classList.remove(\"download\"),t.stopPropagation()}),p.addEventListener(\"click\",function(){e._gif?e._gifRendering?e.abortGif():e.stopRecordButton():e.recordButton()}),this.registerInstanceMethod(\"abortGif\",\"post\",function(){f.style.width=0,f.style.marginTop=0,g.style.height=0,p.classList.remove(\"recording\"),p.classList.remove(\"download\")}),this.registerInstanceMethod(\"startGif\",\"post\",function(){p.classList.remove(\"download\"),p.classList.add(\"recording\"),e._gif.on(\"progress\",function(t){f.style.width=5*t%1*100+\"%\",f.style.marginTop=20*Math.floor(5*t)+\"%\",g.style.height=20*Math.floor(5*t)+\"%\"}),e._gif.removeListener(\"finished\",e._gifDefaultFinishedCallback),e._gif.on(\"finished\",function(t){p.classList.add(\"download\"),g.style.height=null,m.setAttribute(\"href\",URL.createObjectURL(t))})}),m.addEventListener(\"click\",function(t){p.classList.remove(\"recording\"),p.classList.remove(\"download\"),t.stopPropagation()}),b.addEventListener(\"click\",function(){s.classList.contains(\"side\")?e.collapseButton():e.expandButton()}),e.playButton=e.loop,e.pauseButton=e.noLoop,e.snapshotButton=function(){},e.recordButton=e.startGif,e.stopRecordButton=e.stopGif,e.expandToy=function(){s.classList.add(\"side\"),s.classList.remove(\"overlay\"),y()},e.collapseToy=function(){s.classList.add(\"overlay\"),s.classList.remove(\"side\"),y()},e.collapseButton=e.collapseToy,e.expandButton=e.expandToy,e.hideGUI=function(){s.classList.add(\"noGUI\"),v()},e.showGUI=function(){s.classList.remove(\"noGUI\"),v()},e.hideButtons=function(){s.classList.add(\"noButtons\"),v()},e.showButtons=function(){s.classList.remove(\"noButtons\"),v()},e.addDefaultParams=function(){var t=_.addFolder(\"Global settings\");t.add(e,\"width\").listen().onChange(v).min(0).step(5).name(\"Canvas width\"),t.add(e,\"height\").listen().onChange(v).min(0).step(5).name(\"Canvas height\"),e.targetFPS=60,t.add(e,\"targetFPS\").listen().min(0).max(60).step(1).name(\"Target framerate\").onChange(function(){e.frameRate(e.targetFPS)});var n=_.addFolder(\"Gif settings\");n.add(e,\"gifFps\").listen().min(0).max(60).step(1).name(\"Framerate\"),n.add(e,\"gifQuality\").listen().min(0).max(1e3).step(1).name(\"Quality (0=best)\"),n.add(e,\"gifWorkers\").listen().min(1).max(5).step(1).name(\"Workers\")},e.buttonSize=function(t){if(t){e._buttonSize=t;for(var n,o=0;o<d.children.length;o++)n=d.children[o],n.style.width=n.style.height=t+\"px\";return v(),e}return e._buttonSize};var w=[\"add\",\"addColor\",\"addFolder\",\"def\",\"defColor\"];w.forEach(function(t){!function(n){_[t]=function(){return 0===_.__controllers.length&&e.showGUI(),n.apply(_,arguments)}}(_[t])}),e.gui=_}},function(t,e,n){var o=n(7);\"string\"==typeof o&&(o=[[t.id,o,\"\"]]);n(9)(o,{});o.locals&&(t.exports=o.locals)},function(t,e,n){e=t.exports=n(8)(),e.push([t.id,'.p5toy-root{position:absolute;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-filter:drop-shadow(0 2px 3px rgba(0,0,0,.3));filter:drop-shadow(0 2px 3px rgba(0,0,0,.3));outline:none}.p5toy-canvas,.p5toy-root{display:-webkit-box;display:-ms-flexbox;display:flex}.p5toy-canvas{position:relative;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:-webkit-repeating-linear-gradient(135deg,#ededed,#ededed 10px,#f5f5f5 0,#f5f5f5 20px);background:repeating-linear-gradient(-45deg,#ededed,#ededed 10px,#f5f5f5 0,#f5f5f5 20px);min-width:240px;min-height:240px}.p5toy-menu{-webkit-transition:.2s ease;transition:.2s ease;overflow:hidden}.p5toy-root.side .p5toy-menu{margin-left:20px;background:#fff}.p5toy-root.overlay .p5toy-menu{opacity:0;position:absolute;top:0;right:0}.p5toy-root.overlay:hover .p5toy-menu{opacity:.4}.p5toy-root.overlay .p5toy-menu:hover{opacity:1}.p5toy-root.noGUI .p5toy-menu{background:transparent}.p5toy-buttons{display:-webkit-box;display:-ms-flexbox;display:flex}.p5toy-root.noGUI .p5toy-buttons{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.p5toy-root.noButtons .p5toy-buttons{display:none}.p5toy-button{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:60px;height:60px;cursor:pointer;position:relative}.p5toy-play{background:#6eb3ee}.p5toy-snapshot{background:#eed56e}.p5toy-record{background:#cd5c5c}.p5toy-close{background:#424242}.p5toy-close *{-webkit-backface-visibility:hidden;backface-visibility:hidden}.p5toy-play-wrapper{position:relative;width:60%;height:60%;background:inherit}.p5toy-play-bars,.p5toy-play-skew{position:absolute;width:100%;height:100%;overflow:hidden}.p5toy-play-bars:after,.p5toy-play-bars:before{content:\"\";position:absolute;width:33%;height:100%;background:#fff;-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out}.p5toy-play-bars:after{right:0}.p5toy-play.paused .p5toy-play-bars:before,.paused .p5toy-play-bars:after{width:50%}.p5toy-play-skew{background-color:inherit;visibility:hidden}.p5toy-play-skew:after,.p5toy-play-skew:before{content:\"\";position:absolute;width:100%;height:100%;background-color:inherit;visibility:visible;border-radius:50%;-webkit-transform-origin:0 50%;transform-origin:0 50%;-webkit-transition:.2s ease-in-out;transition:.2s ease-in-out}.p5toy-play-skew:before{-webkit-transform:translate(50%,-100%);transform:translate(50%,-100%)}.p5toy-play-skew:after{-webkit-transform:translate(50%,100%);transform:translate(50%,100%)}.p5toy-play.paused .p5toy-play-skew:before{-webkit-transform:translateY(-100%) skewY(.464rad);transform:translateY(-100%) skewY(.464rad);border-radius:0}.p5toy-play.paused .p5toy-play-skew:after{-webkit-transform:translateY(100%) skewY(-.464rad);transform:translateY(100%) skewY(-.464rad);border-radius:0}.p5toy-bg-button{width:100%;height:100%;top:0;left:0;background-repeat:no-repeat;background-size:75%;background-position:50%}.p5toy-snapshot-button{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAFT0lEQVR4Xu2c8VXUQBDGZypQK1AqECoQOtAKlAqECtQKhAqECsAKhAqECoQKhArG98EGjyPZneR2M7vH5D3+IblM8v1mdjczkzD5ZqoAm1p34+QAjJ3AATgAYwWMzXsEOABjBYzNewQ4gP8KiMgnIvpRWJMjZt4tbEN9+moiYCbxO2GqgVAFgJnFrwqCOQAj8auBYArAWPwqIJgBqER8cwgmACoT3xTC7AAqFd8MwmgAIvKGiD4T0TYRbaoXvOt94AURnRHRITNfjbnVUQBE5DsR7Y0x8AyPPWDmfe19qwGIyG/3eK2sdMbMO5qjVQBE5CAMO5pz+jH3CmA4So4WSQBhzP/jqk5SYCM1J2gAuPdP0l4XBRoAPvZPB3DBzFuxn2sAyHT7/ktmjmrsAAr7iAMoLHDq9A4gpVDh/Q6gsMCp068TgPOQb0HO5YaZkX952EQEeamXIUeFPNW7lDhz7G8dwDURfSWiU2a+GSOYiAAGivx4Gn095rc5j20VwJ3wzHyUQ4yQAgfI2UG0COAwiD/K41OgQkQAAlLps20tAbjFkMHMpyXVEZH3RITIelHSTnfuVgBA/O3libWUQGHCxmReHEILANTiB+E+hroEJtmuIocVEYYsiPpTA3IuCC0A+JAadkQEomP8RjlUs6EsiEn8OHZwGI5ONCecekztAKJFi1CLQK8o1vVTNkTEbiwnX7rYVDMALDU3h9b3IgLR4Z0YalbZMDTtDA1LYXWEIazIErVmAPDM3nV+EP/XKqr3/HYrAqFYV3atAK6ZuXc8D8MOikCrev4yA0QCIPS2jYgI/p89CmoFEPN+eP7UMT8VNIPdCiKClAXabrJutQJ41Tf2z9Q117vqCnPB36zqE1GNAM6ZudfDRQTdF9ql5lStrph5o+/HIoJVU9Ysao0AvjEz1vSPtvBghLF/jq13QhYRXNeXnBdQIwAsCeFpywDmbH8ZcgJEZtbVV40Ahrwve/hHPLl3GCwRhdUBGLqgmXtPB/t1RCRrG05LALLeeGocjzhC1utwAAMkHMDTSRj5mLcpz820/5KZe18uWfshKKQDHnU0QNQSa3CfhPsVqHkZinJl1vpAdXMAEfmD2IJjWjTnxlIRRTKSS4EYy8RmfxapMQKghyfjgldYRABM7zMzUg9PtsKTcSz6nlU6OpaRRDYUq6TcLSPovkAJdKggUyQTW+sQBM/3kiTqBakHm9wPJgv24IlIzPW2IIa6MLrkVo2EaN9RKMQgDV6kDlFzBICFpi0FhfupRRK0tKPdcfDzAc+5LaULBk1jFroWxnQ3o+VlT9Hwlf3Ba3lEqT0CcL3Rvp3FGwr5eoiGwgm6Jrrc0eVCayLeJXiS6ugpACEXhOJL7u6LR6ZaADAKQmrO0uwPIIuLj2tpBUAHASujOdrT0e5Y1PM7R2gJQHfNeEBDvqjECxoouCc/oKGJIu0xLQLAvam6m7UiTOiu1p46eVyrALobAwhExPHYiAjre7S1w+OLrPGT6jc2B6TuB5nK7u924DVVPLRhhdT9pc5ZfH/rEVBcoNIGHEBphRPndwAOwFgBY/MeAWsAYM5+HWO5spsf7D96eFJOmSydrk3Zb3x/8tOVmoIMHmL8s5XTPGH1z1bCrkfBJPWT3n+XLdWeWkR8LtCKdf+5BNQtkpsagEdCUsvuAJXnqyfhZbPhPV4kuJBvmaubWX33RgeiIoc8Fb6cXu7z9UY3t9ZmRw1Ba62E0c05ACPhJ88Bxte7duY9AoyROgAHYKyAsXmPAAdgrICxeY8AB2CsgLF5jwAHYKyAsXmPAAdgrICxeY8AYwD/AAgzrH/GSVQUAAAAAElFTkSuQmCC)}.p5toy-png{visibility:hidden;background-color:#eed56e;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAFd0lEQVR4Xu2c7XXVMAyGrQloJwAmgE5AOwFsQJkAmAA6Ae0ElAmACWgnoJ0ANqBMIM7bOj25vo4lx04drpVz7q8kdqJHryR/5JKzo6kFqGnv1rkzAI2dwAAYgMYWaNy9KcAANLZA4+5NAbsGgJmfOOfeOucOnXPPG79fre6vnHMXzrkzIvpdq1G0U1UBzPzJOfeu5gOusK1TInpf67mqAWDmnzvk8ZJ9r4joQLpIc74KAGY+9WFH0+euXINwVKz2YgA+5v/aFatmvsfT0pxQA0CP3j9wKlZBDQA9xf5QIMW5oAYAzpTtTl1OREU2LLoZlmTmJIDSB2xNa+n3MwACYQPQWAIGwACkLbC0hzS2/+I5znKA5YDWPt5W4aYAU4ApoMgCloRtJFzkQNLNSzuY5QDLAZIPtj1vCmhrfxuINba/ATAAgQV2dN9PKefZ+4ayqqBO9v2UwsjaN6QG0Nm+n1II6rViFYBO9/2UQlDtmBABdL7vpxSCuG9IA6DnfT+lAEQVaAD0vO+nFICYCzQAut73U0pA2pazBIAjxUPjuwF8P/BScW3YHr4/+Dxx3xfn3Hlw7ofQx3d/zw0R4RsAjH7RB36v/O+x4jmjlzw4AKnD8VMy855/+UkQsfaYGYZ6EXnjEyL6GPQxpeBr59wxEWEQlTyYGW1+kK6LnZfsUV0BUoexh2RmeO1r7QswM9QT82wtABj/kIhutEZl5uOE8iabkeyxOAAv57GE/8a8jpnx6c+W1KdeYAKaFsBB+AzMjHADJ4AqvxHRWWjVhPJWDSAm363yjJnxsQM+cdo4EgAQo8PvEjQAvhARvPn+mPDucyJ6o7guKaI1KGAqfu6PQ8BUWEm9QEQFGgAx7//jPT805sZAas6gdM0Ajoaqw1ce0bguAAhVIAII20vkEzwWclP4VeRGkpdyyJoBzFIAvHD8WVCgAgnAJREB9Dj8zK5wJOPj/FoBxOKwKgd4jwWE23rfl7Lw0kfOOQMQkTgS3pD0UPahwggHSzAkEipCSjIJewAYiCGW35aRozq9BoATwbOzxgPNFaCRKTPDoBuVyXBfImbfG3ukAiyGpAZiYgiSDCbtkpAcaOu8ZKDaHQbxFzU3jI8aPHokAMD7UaWMVYCYawBSUL23YhoBRo96/fh+oWoJVYCpBUyfj5PseCpCVIBzbgwQuWqjCqrtkA8xEi6qMgQAoQr2wumFwGCYcNsPAE1Na+CyjVLZ55us2WEppP3vAGCTrcSbUABOxQZiAIkqKjwMgHLgNLn0FwkZsUoJ4fCrAYhYQAlga1wxNBUBsBG2RtchFGEsglL4tlzGSFgIaVINs9qBmPjgijI0bCOqgomkeUFEmoWjjT58AYF5I/XRQw4YjBFVQaJqwUIMYrxqTYCZMVWNCguls/roCQCMsqUCoWwch5rLIHnD0M9Gy5Jbo3QNhQcHoHmolV8DKFlennqfGgAgVXiCHfkWuCai5B8XasYBtjEr3/DDHVU2ZsWW/uY/Ul93lm9NhL1sc+4srxG9H62KIWjompktF+g5iLH/fpyjb9OUoLSVyvNnAfDhCDkBQ3YM3a06urMkNnphtx4WhLL+2lgdgqboS/PjUh2s9Kpmly39fgZAQGsAmvn+XccGwACkLbC0hzS2vynAADROUgbAACz618xWhjZ2MANgAFpH+bZVnilg1xWwbv8uf7rSua4aCuh5nUA97z+FugaAnteMs+b+YxBqAOh5zVhc85WCXDEAP2PYowqKvR+2qwLAQ+gpFxTH/kEZ1QB0pIQqnr8IAA9hF9eMZ6/5PkgOkDqx89MWqBqCzND5FjAA+TareocBqGrO/MYMQL7Nqt5hAKqaM78xA5Bvs6p3GICq5sxv7B9SK7WO60ToTAAAAABJRU5ErkJggg==);position:absolute;z-index:10;opacity:0;-webkit-transition:.3s;transition:.3s}.p5toy-snapshot.download .p5toy-png{visibility:visible;opacity:1}.p5toy-record-button{height:60%;width:60%;background:#fff;border-radius:50%;position:relative;-webkit-transition:.3s ease;transition:.3s ease}.p5toy-record.recording .p5toy-record-button{border-radius:0}.p5toy-record.recording .p5toy-record-progress-1,.p5toy-record.recording .p5toy-record-progress-2{display:block}.p5toy-record-progress-1,.p5toy-record-progress-2{background:#79c784;margin-top:0;display:none}.p5toy-record-progress-1{height:20.5%;width:0;float:left}.p5toy-record-progress-2{height:0;width:100%}.p5toy-record.download .p5toy-record-progress-2{-webkit-transition:.2s ease-out;transition:.2s ease-out;margin-left:-33.3%;margin-top:-33.3%;width:166.67%;height:166.67%}.p5toy-gif{visibility:hidden;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAFA0lEQVR4Xu2djXHUMBCFdysAKgAqgFRAUgGhAqACkgoIFZBUQFIBUAFJBSQVkHQQKljmMbqM4/Od9Xzrk3xezzBh5nT6eZ9WWkkrn0o8RRXQoqVH4RIACneCABAACitQuPiwgABQWIHCxYcF7DoAM9sXkfcigr8vCrfXq/hbEbkUkQtVxd/Bz2gWYGZPReR7En5wBSfwRQB4p6r3Q+o6CoAk/i8ReT2kUhP8zrWIHAyBMBYAiI8hZ07PpaoesA12B5DGfACY4wMroOaEMQCcp0l3jgAwKX9gGj4GgD875O0wWiLtraq+ZL40BgBjKrBraVWV0pRKnCOWma0FwFYwp8xtpvFuXwAg6QUAUjDv5AHAW1EyvwBACuadPAB4K0rmFwBIwbyTBwBvRcn8AgApmHfyAOCtKJlfACAF804eALwVJfMLAKRg3skDgLeiZH4BgBTMO3kA8FaUzK86AGaGWJ9P6RB+V6IgEOWAs90zVUUM0MNTFQAz+yoiR2QnmlryU1U9XlS6GgBm9ntGcT8PISdVADCz0zTsTK03b1JfDEdHxQGkMR+RD3N8EPGwtu3smTd9JjzT3r/obGd9lr8NAHMa+9tWDu9orae3DQCzjvvpG3drBnAnIj+Sf33fjqE0M/QshLQjqBf/x98njQZfqepSwG97UmQFaLiX8Pvf9Anc9zlb/pA5gLWAKxE5YYNWzawtSAAA/T43rNVDjlUVLiv9BIAVkhEAPqoqIqUfPcmNfZuGmcWVJdwuwQSHZT96+q0nADP7nNEDENW88RWqWoagzjBtYusCMDAfNAUZPAQRnSaD0/okNQD4C+Ha13XM7JuIULHzraYGgMw5YKn3O92aCQCZAJbGfjOD+4lxf5MnAGQC2FNVjOEPT8cYjDXB0gTdogOfv+mXbwKg794W1h3NNcfgjlJ8DuiqQAeATjFb0E5EpOm9DAbQp2aHx9X3lZWfBwDyilCyapdVMPIqDkBEnnV4QO3VM/z9R0OQqn4JC8gwvAyfeumurJlhTni1Lvt2zzEztyEoo84ZLc9LUoMFLG0/5JwhBIA8wDl7QdequtcaTrCqxbCz0tMIAH4AkFPXMARXD+uB511FBQBfACvfHmJm2I5ovzsIVvMovCXmgBVAiAlt8CtckmsYk3AXAwIAvo5t5iNVvcg0sObqOQA4AFhkgQkY4z/+3XS92CgdSWJ+wPB02LE3P3glTHYatq88Sl+DG7pRA6b+5W0A6F1UTV3ENfW/YReUfVoMOZSfY1jiQscqArNwTBihiSu69uhDUHIR52gFdQTnLsDnbLD1jX8T+vynqsIz692K2YoFNCDMwRL+9/xGm13fCEZPwu1em+J8UEH472u3nCfU4+Ht4JAGt2PqvaI0ZKHGmmht0PoWdWz7NraADotwNdEAQCrg3UPI4kdP7t2+sAASWQAgBfNOHgC8FSXzCwCkYN7JA4C3omR+AYAUzDt5APBWlMwvAJCCeScPAN6KkvlNHgDZ3sklr2EvCLuHndFvk1OTr/CdqlI3LcfYiogf8SHAjQEA5wLxM1aZENwBoFzPKz+Z7aghWe+1q65KjgUA4eg4UdqVE7I+wDhB26/mpwyTFQACQhE3fgNJX+sLf46XkRwOER/1HsUCmoKkS9qLkPRd8Y5wzRYWfs6+BabdWUYHULh3Vl98ACiMKAAEgMIKFC4+LCAAFFagcPFhAQGgsAKFi/8Ho2JJjqqRr/AAAAAASUVORK5CYII=);position:absolute;z-index:10;opacity:0;-webkit-transition:.3s ease-in;transition:.3s ease-in}.p5toy-record.download .p5toy-gif{visibility:visible;opacity:1}.p5toy-close-button{position:relative;width:65%;height:65%;-webkit-transition:.5s;transition:.5s}.p5toy-root.overlay .p5toy-close-button{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.p5toy-close-bar{position:absolute;background:#fff;width:20%;height:100%;left:50%}.p5toy-close-bar-1{-webkit-transform:translateX(-50%) rotate(45deg);transform:translateX(-50%) rotate(45deg)}.p5toy-close-bar-2{-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.p5toy-root .dg.main.taller-than-window .close-button{border-top:1px solid #ddd}.p5toy-root .dg.main .close-button{background-color:#ccc}.p5toy-root .dg.main .close-button:hover{background-color:#ddd}.p5toy-root .dg{color:#555;text-shadow:none!important}.p5toy-root .dg.main::-webkit-scrollbar{background:#fafafa}.p5toy-root .dg.main::-webkit-scrollbar-thumb{background:#bbb}.p5toy-root .dg li:not(.folder){background:#fafafa;border-bottom:1px solid #ddd}.p5toy-root .dg li.save-row .button{text-shadow:none!important}.p5toy-root .dg li.title{background:#e8e8e8}.p5toy-root .dg .cr.boolean:hover,.p5toy-root .dg .cr.function:hover{background:#fff}.p5toy-root .dg .c input[type=text]{background:#e9e9e9}.p5toy-root .dg .c input[type=text]:hover{background:#eee}.p5toy-root .dg .c input[type=text]:focus{background:#eee;color:#555}.p5toy-root .dg .c .slider{background:#e9e9e9}.p5toy-root .dg .c .slider:hover{background:#eee}.p5toy-root .dg.ac{position:relative}.p5toy-root .dg.main.a{margin-right:0}.p5toy-root .close-button{height:0;visibility:hidden;opacity:0}.p5toy-root .dg li{-webkit-transition:none;transition:none}.p5toy-root .dg .c input[type=text]{background:#f5f2f0}.p5toy-root .dg .cr.string input[type=text]{color:#35b928}.p5toy-root .dg .cr{border-left:4px solid #e8e8e8!important}.p5toy-root .dg li.folder{border-left:none}.p5toy-root .cr.color{overflow:visible}.p5toy-root .closed .cr.color{overflow:hidden}.p5toy-root .dg .c{position:relative}.p5toy-root .dg.main{width:auto!important;height:auto;min-height:240px;overflow-y:auto;overflow-x:hidden}.p5toy-root.noGUI .dg.main{display:none}',\"\"])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push(\"@media \"+n[2]+\"{\"+n[1]+\"}\"):t.push(n[1])}return t.join(\"\")},t.i=function(e,n){\"string\"==typeof e&&(e=[[null,e,\"\"]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];\"number\"==typeof r&&(o[r]=!0)}for(i=0;i<e.length;i++){var s=e[i];\"number\"==typeof s[0]&&o[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]=\"(\"+s[2]+\") and (\"+n+\")\"),t.push(s))}},t}},function(t,e,n){function o(t,e){for(var n=0;n<t.length;n++){var o=t[n],i=p[o.id];if(i){i.refs++;for(var r=0;r<i.parts.length;r++)i.parts[r](o.parts[r]);for(;r<o.parts.length;r++)i.parts.push(d(o.parts[r],e))}else{for(var s=[],r=0;r<o.parts.length;r++)s.push(d(o.parts[r],e));p[o.id]={id:o.id,refs:1,parts:s}}}}function i(t){for(var e=[],n={},o=0;o<t.length;o++){var i=t[o],r=i[0],s=i[1],a=i[2],l=i[3],d={css:s,media:a,sourceMap:l};n[r]?n[r].parts.push(d):e.push(n[r]={id:r,parts:[d]})}return e}function r(t,e){var n=m(),o=y[y.length-1];if(\"top\"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),y.push(e);else{if(\"bottom\"!==t.insertAt)throw new Error(\"Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.\");n.appendChild(e)}}function s(t){t.parentNode.removeChild(t);var e=y.indexOf(t);e>=0&&y.splice(e,1)}function a(t){var e=document.createElement(\"style\");return e.type=\"text/css\",r(t,e),e}function l(t){var e=document.createElement(\"link\");return e.rel=\"stylesheet\",r(t,e),e}function d(t,e){var n,o,i;if(e.singleton){var r=_++;n=b||(b=a(e)),o=c.bind(null,n,r,!1),i=c.bind(null,n,r,!0)}else t.sourceMap&&\"function\"==typeof URL&&\"function\"==typeof URL.createObjectURL&&\"function\"==typeof URL.revokeObjectURL&&\"function\"==typeof Blob&&\"function\"==typeof btoa?(n=l(e),o=h.bind(null,n),i=function(){s(n),n.href&&URL.revokeObjectURL(n.href)}):(n=a(e),o=u.bind(null,n),i=function(){s(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else i()}}function c(t,e,n,o){var i=n?\"\":o.css;if(t.styleSheet)t.styleSheet.cssText=v(e,i);else{var r=document.createTextNode(i),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(r,s[e]):t.appendChild(r)}}function u(t,e){var n=e.css,o=e.media;if(o&&t.setAttribute(\"media\",o),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function h(t,e){var n=e.css,o=e.sourceMap;o&&(n+=\"\\n/*# sourceMappingURL=data:application/json;base64,\"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+\" */\");var i=new Blob([n],{type:\"text/css\"}),r=t.href;t.href=URL.createObjectURL(i),r&&URL.revokeObjectURL(r)}var p={},f=function(t){var e;return function(){return\"undefined\"==typeof e&&(e=t.apply(this,arguments)),e}},g=f(function(){return/msie [6-9]\\b/.test(window.navigator.userAgent.toLowerCase())}),m=f(function(){return document.head||document.getElementsByTagName(\"head\")[0]}),b=null,_=0,y=[];t.exports=function(t,e){e=e||{},\"undefined\"==typeof e.singleton&&(e.singleton=g()),\"undefined\"==typeof e.insertAt&&(e.insertAt=\"bottom\");var n=i(t);return o(n,e),function(t){for(var r=[],s=0;s<n.length;s++){var a=n[s],l=p[a.id];l.refs--,r.push(l)}if(t){var d=i(t);o(d,e)}for(var s=0;s<r.length;s++){var l=r[s];if(0===l.refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete p[l.id]}}}};var v=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join(\"\\n\")}}()},function(t,e){t.exports='<div class=p5toy-wrapper> <div class=\"p5toy-root side noGUI\" tabindex=0> <div class=p5toy-canvas></div> <div class=p5toy-menu> <div class=p5toy-buttons> <div class=\"p5toy-play p5toy-button\"> <div class=p5toy-play-wrapper> <div class=p5toy-play-bars></div> <div class=p5toy-play-skew></div> </div> </div> <div class=\"p5toy-snapshot p5toy-button\"> <a class=\"p5toy-png p5toy-bg-button\" target=_blank></a> <div class=\"p5toy-snapshot-button p5toy-bg-button\"></div> </div> <div class=\"p5toy-record p5toy-button\"> <a class=\"p5toy-gif p5toy-bg-button\" target=_blank></a> <div class=p5toy-record-button> <div class=p5toy-record-progress-1></div> <div class=p5toy-record-progress-2></div> </div> </div> <div class=\"p5toy-close p5toy-button\"> <div class=p5toy-close-button> <div class=\"p5toy-close-bar p5toy-close-bar-1\"></div> <div class=\"p5toy-close-bar p5toy-close-bar-2\"></div> </div> </div> </div> </div> </div> </div>'}]);"

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "@font-face {\n\tfont-family: Roboto;\n\tsrc: url(" + __webpack_require__(17) + ");\n}\n\n@font-face {\n\tfont-family: Rubik;\n\tsrc: url(" + __webpack_require__(18) + ");\n}\n\nhtml, body {\n\tbackground: whitesmoke;\n\tmargin: 0;\n\tfont-family: Roboto, sans-serif;\n\twidth: 100%;\n\theight: 100%;\n\t-webkit-backface-visibility: hidden;\n\t        backface-visibility: hidden;\n}\n\n.noselect {\n\t-webkit-user-select: none;\n\t   -moz-user-select: none;\n\t    -ms-user-select: none;\n\t        user-select: none;\n}\n\nh1 {\n\tfont-family: Rubik;\n}\n\nh3 {\n\tcolor: #e2f7e5;\n\tfont-weight: normal;\n\twhite-space: pre-wrap;\n}\n\n#app, #main {\n\twidth: 100%;\n\theight: 100%;\n\toverflow: hidden;\n}\n\n#main {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-orient: horizontal;\n\t-webkit-box-direction: normal;\n\t    -ms-flex-direction: row;\n\t        flex-direction: row;\n}\n\n#side {\n\t-webkit-box-flex: 1;\n\t    -ms-flex: 1;\n\t        flex: 1;\n\tmin-width: 400px;\n\tposition: relative;\n\tpadding: 0 16px;\n\tbackground: #79c784;\n\tcolor: white;\n    box-shadow: -2px 0px 6px rgba(0,0,0,0.2);\n\toverflow: auto;\n}\n\n.fullWidth {\n    width: calc(100% + 32px);\n    margin-left: -16px;\n}\n\n\n.header {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    background: #9fd0a6;\n    color: #1e1e1e;\n    padding: 20px 0;\n}\n\n.header .p5toyLogo {\n\tfont: bold 52px Rubik;\n\tcursor: default;\n\ttext-align: center;\n\t-webkit-box-flex: 2;\n\t    -ms-flex: 2;\n\t        flex: 2;\n}\n.p5toyLogo span:nth-child(1) {\n\tcolor: #ed1f5e;\n}\n.p5toyLogo span:nth-child(2) {\n\tcolor: white;\n}\n.p5toyLogo span:nth-child(3) {\n\tcolor: #1b96d6;\n}\n\n.header .links {\n\t-webkit-box-flex: 1;\n\t    -ms-flex: 1;\n\t        flex: 1;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-ms-flex-pack: distribute;\n\t    justify-content: space-around;\n\t-webkit-box-align: center;\n\t    -ms-flex-align: center;\n\t        align-items: center;\n}\n.header .links > a {\n\twidth: 64px;\n\theight: 64px;\n}\n\n.githubLink {\n\tbackground: url(" + __webpack_require__(19) + ");\n\tborder-radius: 50%;\n\t-webkit-transition: 200ms;\n\ttransition: 200ms;\t\n}\n.githubLink:hover {\n\tbackground-color: #79c784;\n}\n\n.p5Link {\n\tbackground: url(" + __webpack_require__(20) + ");\n}\n\n.navigation {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    background: #424242;\n    color: whitesmoke;\n    height: 40px;\n    font: 1em Rubik;\n    cursor: pointer;\n\ttext-transform: uppercase;\n}\n\n.navigation > span {\n    background: #424242;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\t\n    -webkit-transition: 200ms;\t\n    transition: 200ms;\n}\n.navigation > span:hover {\n\tbackground: #282b2e;\n}\n\n.navigation > span.disabled {\n\topacity: 0.5;\n\tcursor: default;\n}\n\n.codebox {\n\n}\n\n.sandbox {\n\t-webkit-box-flex: 2;\n\t    -ms-flex: 2;\n\t        flex: 2;\n\tposition: relative;\n\tbackground: #f9f9f9;\n}\n.sandbox iframe {\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n\tborder: 0px;\n\tmargin: 0;\n\tpadding: 0;\n}\n\n.content-hide {\n\topacity: 0;\n\t-webkit-transform: translateY(200px);\n\t        transform: translateY(200px);\n\t-webkit-transition: 200ms ease-in;\n\ttransition: 200ms ease-in;\n}\n.content-show {\n\t-webkit-animation: appear 150ms ease;\n\t        animation: appear 150ms ease;\n}\n@-webkit-keyframes appear {\n\tfrom {\n\t\topacity: 0;\n\t\t-webkit-transform: translateY(-70px);\n\t\t        transform: translateY(-70px);\n\t}\n\tto {\n\t\topacity: 1;\n\t\t-webkit-transform: translateY(0);\n\t\t        transform: translateY(0);\n\t}\n}\n@keyframes appear {\n\tfrom {\n\t\topacity: 0;\n\t\t-webkit-transform: translateY(-70px);\n\t\t        transform: translateY(-70px);\n\t}\n\tto {\n\t\topacity: 1;\n\t\t-webkit-transform: translateY(0);\n\t\t        transform: translateY(0);\n\t}\n}\n\n::-webkit-scrollbar {\n  width: 12px;\n  height: 12px;\n}\n::-webkit-scrollbar-button {\n  width: 0px;\n  height: 0px;\n}\n::-webkit-scrollbar-thumb {\n  background: #424242;\n  border: 0px none #ffffff;\n  border-radius: 0px;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: #3a3a3a;\n}\n::-webkit-scrollbar-thumb:active {\n  background: #333333;\n}\n::-webkit-scrollbar-track {\n  background: #fafafa;\n  border: 0px none #ffffff;\n  border-radius: 0px;\n}\n::-webkit-scrollbar-track:hover {\n  background: #f9f9f9;\n}\n::-webkit-scrollbar-track:active {\n  background: #eaeaea;\n}\n::-webkit-scrollbar-corner {\n  background: transparent;\n}", ""]);

	// exports


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "data:application/x-font-ttf;base64,AAEAAAASAQAABAAgR0RFRtRX1FkAAg/sAAACREdQT1NKcuCzAAISMAAAUiRHU1VCw4aZEQACZFQAABfoT1MvMqCnsaYAAAGoAAAAYGNtYXBAmkl2AAAafAAAEshjdnQgJEEG5QAAL9wAAABMZnBnbWf0XKsAAC1EAAABvGdhc3AACAATAAIP4AAAAAxnbHlmHN2bBQAAOfAAAdM2aGRteDc4ERcAABWQAAAE7GhlYWT4RqsOAAABLAAAADZoaGVhCroKggAAAWQAAAAkaG10eOiEiIgAAAIIAAATiGxvY2HgyGepAAAwKAAACcZtYXhwBxIC+QAAAYgAAAAgbmFtZTVTY1kAAg0oAAACmHBvc3T/bQBkAAIPwAAAACBwcmVwdKCP7AAALwAAAADbAAEAAAACAACEKlnoXw889QAbCAAAAAAAxPARLgAAAADQ206a+hv91QkwCHMAAAAJAAIAAAAAAAAAAQAAB2z+DAAACUn6G/5KCTAAAQAAAAAAAAAAAAAAAAAABOIAAQAABOIAjwAWAFQABQABAAAAAAAOAAACAAIUAAYAAQADBIUBkAAFAAAFmgUzAAABHwWaBTMAAAPRAGYCAAAAAgAAAAAAAAAAAOAACv9QACF/AAAAIQAAAABHT09HAEAAAP/9BgD+AABmB5oCACAAAZ8AAAAABDoFsAAgACAAAgOMAGQAAAAAAAAAAAH7AAAB+wAAAg8AoAKPAIgE7QB3BH4AbgXcAGkE+QBlAWUAZwK8AIUCyAAmA3IAHASJAE4BkgAdAjUAJQIbAJADTAASBH4AcwR+AKoEfgBdBH4AXgR+ADUEfgCaBH4AhAR+AE0EfgBwBH4AZAHwAIYBsQApBBEASARkAJgELgCGA8cASwcvAGoFOAAcBPsAqQU1AHcFPwCpBIwAqQRsAKkFcwB6BbQAqQItALcEagA1BQQAqQROAKkG/ACpBbQAqQWAAHYFDACpBYAAbQTtAKgEvwBQBMYAMQUwAIwFFwAcBxkAPQUEADkEzgAPBMoAVgIfAJIDSAAoAh8ACQNYAEADnAAEAnkAOQRaAG0EfQCMBDAAXASDAF8EPQBdAscAPAR9AGAEaACMAfEAjQHp/78EDgCNAfEAnAcDAIsEagCMBJAAWwR9AIwEjABfArUAjAQgAF8CnQAJBGkAiAPgACEGAwArA/cAKQPJABYD9wBYArUAQAHzAK8CtQATBXEAgwHzAIsEYABpBKYAWwW0AGkE2AAfAesAkwToAFoDWABmBkkAWwOTAJMDwQBmBG4AfwZKAFoDqgB4Av0AggRGAGEC7wBCAu8APgKCAHsEiACaA+kAQwIWAJMB+wB0Au8AegOjAHoDwABmBdwAVQY1AFAGOQBvA8kARAd6//IERABZBYAAdgS6AKYEwgCLBsEATgSwAH4EkQBHBIgAWwScAJUFmgAdAfoAmwRzAJoETwAiAikAIgWLAKIEiACRB6EAaAdEAGEB/ACgBYcAXQK5/+QFfgBlBJIAWwWQAIwE8wCIAgP/tAQ3AGIDxACpA40AjAOrAHgDagCBAfEAjQKtAHkCKgAyA8YAewL8AF4CWgB+AAD8pwAA/W8AAPyLAAD9XgAA/CcB7/04Ag0AtwQLAHECFwCTBHMAsQWkAB8FcQBnBT4AMgSRAHgFtQCyBJEARQW7AE0FiQBaBVIAcQSFAGQEvQCgBAIALgSIAGAEUABjBCUAbQSIAJEEjgB6ApcAwwRuACUD7ABlBMQAKQSIAJEETQBlBIgAYAQsAFEEXQCPBaMAVwWaAF8GlwB6BKEAeQRC/9oGSABKBf8AKgVkAHsIkQAxCKQAsQaCAD4FtACwBQsAogYEADIHQwAbBL8AUAW0ALEFqQAvBQcATQYsAFMF2QCvBXoAlgeHALAHwACwBhIAEAbrALIFBQCjBWQAkwcnALcFGABZBGwAYQSSAJ0DWwCaBNQALgYgABUEEABYBJ4AnARSAJwEoAAsBe8AnQSdAJwEngCcA9gAKAXNAGQEvQCcBFkAZwZ4AJwGngCRBPcAHgY2AJ0EWACdBE0AZAaHAJ0EZAAvBGj/6ARNAGcGyQAnBuQAnASJ//0EngCcBwgAnAYrAIEEVv/cBysAtwX4AJkE0gAoBEYADwcLAMkGCwC8BtEAkwXhAJYJBAC2B9EAmwQjAFAD2wBMBXEAZwSLAFsFCgAWBAMALgVxAGcEiABbBwEAnAYkAH4HCACcBisAgQUyAHUERwBkBP0AdAAA/GcAAPxxAAD9ZgAA/aQAAPobAAD6LARW/9wFGwCoBIkAjARjAKIDkACRBNsAsQQFAJEFCQCjBH4AmgaMAEQFgwA+B88AqAW0AJEIMQCwBvQAkQXuAHEE0wBtBywANAVcAB8FbwCWBGoAgwVwAIoGLwA/BL3/3gUJAKMEWgCaBbIAsQSIAJEFhwBdBKgAaASoAGkEtwA6A0kAOwT2AFcGlABZBuQAZAZWADYFKwAxBEkAUgQHAHkHwQBEBnUAPwf7AKkGoQCQBPYAdgQdAGUFrQAjBSAARgVkAJYDIABvBBQAAAgpAAAEFAAACCkAAAK5AAACCgAAAVwAAAR/AAACMAAAAaIAAADRAAAAAAAAAjQAJQI0ACUFQACiBj8AkAOmAA0BmQBgAZkAMAGXACQBmQBPAtQAaALbADwCwQAkBGkARgSPAFcCsgCKA8QAlAVaAJQA9gAmB6oARAJmAGwCZgBZA6MAOwLvADYDYAB6BKYAWwZVAB8GkACnCHYAqAdjADkGKwCMBH4AXwXaAB8EIgAqBHQAIAVIAF0FTwAfBecAegPOAGgIOgCiBQEAZwUXAJgGJgBUBtcAZAbPAGMGagBZBI8AagWOAKkErwBFBJIAqATFAD8IOgBiAgz/sASCAGUEZACYBBEAPgQvAIUECAArAkwAtQKPAG4CAwBcBPMAPARuAB8EiwA8BtQAPAbUADwE7gA8BpsAXwAAAAAIMwBbCDUAXAQgADsEngBaAfz/tgGRAGcDpACDA54AgQOfAIED9ABpBA4AaQPz/14D7wBuA6QAgQH9AJ8EhQATBFAAigR8AGAEgACKA+YAigPLAIoErABjBOMAigHoAJcDzwArBFQAigO0AIoGAgCKBOMAigS7AGAEXACKBLsAWQRKAIoEIABDBCYAKAR8AHQEZwAUBhUAMQRUACYEKwANBCMARwLvAFAC7wB6Au8AQgLvAD4C7wA2Au8AWwLvAFYC7wA6Au8ATwLvAEkDlgCPArUAngQ6AB4EwwBkBUwAsQUkALIEEwCSBT0AsgQPAJIEIABDBDMAMAQ8ABYDrwCKBGcAFAS7AGAEZwAUA4kAPgTOAIoD7wA/BWcAYAUXAGAE8gB1BXIAJgR8AGAHQQAnB08AigV0ACgEzQCKBFkAigUkAC4GCwAfBD8ARwTsAIoETgCLBMEAJwQfACIFKACKBGoAPQZRAIoGrACKBR0ACAXxAIoETgCKBHsASwZ2AIoEhwBQBBEACwZHAB8EeQCLBQkAiwU3ACMFwgBgBF8ADQSoACYGYQAmBGoAPQRqAIoFwwACBMoAXgQ/AEcEuwBgBDMAMAPjAEIIIgCKBKsAKAR9AIwEMgBcBJMAWwSMAFsDeQBXBI0AjAScAFsEPQBdBH0AYAWBAH4FrgB+BZMAsgXgAH4F4wB+A9UAoASCAIMDrwCKBFgADwTPAD4C7wBQAu8ANgLvAFsC7wBWAu8AOgLvAE8C7wBJBGsAZQQuAEoGpABgBLkAggUAAHgCBv+0AgT/tAH7AJsB+//6AfsAmwH7AIYEUACKAfsAAAI1ACUFXQAlBV0AJQSGAAAExgAxAp3/9AU4ABwFOAAcBTgAHAU4ABwFOAAcBTgAHAU4ABwFNQB3BIwAqQSMAKkEjACpBIwAqQIt/+ACLQCwAi3/6QIt/9YFtACpBYAAdgWAAHYFgAB2BYAAdgWAAHYFMACMBTAAjAUwAIwFMACMBM4ADwRaAG0EWgBtBFoAbQRaAG0EWgBtBFoAbQRaAG0EMABcBD0AXQQ9AF0EPQBdBD0AXQH6/8YB+gCWAfr/zwH6/7wEagCMBJAAWwSQAFsEkABbBJAAWwSQAFsEaQCIBGkAiARpAIgEaQCIA8kAFgPJABYFOAAcBFoAbQU4ABwEWgBtBTgAHARaAG0FNQB3BDAAXAU1AHcEMABcBTUAdwQwAFwFNQB3BDAAXAU/AKkFGQBfBIwAqQQ9AF0EjACpBD0AXQSMAKkEPQBdBIwAqQQ9AF0EjACpBD0AXQVzAHoEfQBgBXMAegR9AGAFcwB6BH0AYAVzAHoEfQBgBbQAqQRoAIwCLf+3Afr/nQIt/7YB+v+cAi3/7AH6/9ICLQAYAfH/+wItAKoGlwC3A9oAjQRqADUCA/+0BQQAqQQOAI0ETgChAfEAkwROAKkB8QBXBE4AqQKHAJwETgCpAs0AnAW0AKkEagCMBbQAqQRqAIwFtACpBGoAjARq/7wFgAB2BJAAWwWAAHYEkABbBYAAdgSQAFsE7QCoArUAjATtAKgCtQBTBO0AqAK1AGMEvwBQBCAAXwS/AFAEIABfBL8AUAQgAF8EvwBQBCAAXwS/AFAEIABfBMYAMQKdAAkExgAxAp0ACQTGADECxQAJBTAAjARpAIgFMACMBGkAiAUwAIwEaQCIBTAAjARpAIgFMACMBGkAiAUwAIwEaQCIBxkAPQYDACsEzgAPA8kAFgTOAA8EygBWA/cAWATKAFYD9wBYBMoAVgP3AFgHev/yBsEATgWAAHYEiABbBID/vgSA/74EJgAoBIUAEwSFABMEhQATBIUAEwSFABMEhQATBIUAEwR8AGAD5gCKA+YAigPmAIoD5gCKAej/vgHoAI4B6P/HAej/tATjAIoEuwBgBLsAYAS7AGAEuwBgBLsAYAR8AHQEfAB0BHwAdAR8AHQEKwANBIUAEwSFABMEhQATBHwAYAR8AGAEfABgBHwAYASAAIoD5gCKA+YAigPmAIoD5gCKA+YAigSsAGMErABjBKwAYwSsAGME4wCKAej/lQHo/5QB6P/KAegABgHoAIkDzwArBFQAigO0AIIDtACKA7QAigO0AIoE4wCKBOMAigTjAIoEuwBgBLsAYAS7AGAESgCKBEoAigRKAIoEIABDBCAAQwQgAEMEIABDBCYAKAQmACgEJgAoBHwAdAR8AHQEfAB0BHwAdAR8AHQEfAB0BhUAMQQrAA0EKwANBCMARwQjAEcEIwBHBTgAHATw//AGGP/+ApEABAWU//oFMv94BWb//QKX/5sFOAAcBPsAqQSMAKkEygBWBbQAqQItALcFBACpBvwAqQW0AKkFgAB2BQwAqQTGADEEzgAPBQQAOQIt/9YEzgAPBIUAZARQAGMEiACRApcAwwRdAI8EcwCaBJAAWwSIAJoD4AAhA/cAKQKX/+YEXQCPBJAAWwRdAI8GlwB6BIwAqQRzALEEvwBQAi0AtwIt/9YEagA1BSQAsgUEAKkFBwBNBTgAHAT7AKkEcwCxBIwAqQW0ALEG/ACpBbQAqQWAAHYFtQCyBQwAqQU1AHcExgAxBQQAOQRaAG0EPQBdBJ4AnASQAFsEfQCMBDAAXAPJABYD9wApBD0AXQNbAJoEIABfAfEAjQH6/7wB6f+/BFIAnAPJABYHGQA9BgMAKwcZAD0GAwArBxkAPQYDACsEzgAPA8kAFgFlAGcCjwCIBB4AoAID/7QBmQAwBvwAqQcDAIsFOAAcBFoAbQSMAKkFtACxBD0AXQSeAJwFiQBaBZoAXwUKABYEA//7CFkAWwlJAHYEvwBQBBAAWAU1AHcEMABcBM4ADwQCAC4CLQC3B0MAGwYgABUCLQC3BTgAHARaAG0FOAAcBFoAbQd6//IGwQBOBIwAqQQ9AF0FhwBdBDcAYgQ3AGIHQwAbBiAAFQS/AFAEEABYBbQAsQSeAJwFtACxBJ4AnAWAAHYEkABbBXEAZwSLAFsFcQBnBIsAWwVkAJMETQBkBQcATQPJABYFBwBNA8kAFgUHAE0DyQAWBXoAlgRZAGcG6wCyBjYAnQUEADkD9wApBIMAXwWpAC8EoAAsBTgAHARaAG0FOAAcBFoAbQU4ABwEWgBtBTgAHARa/8oFOAAcBFoAbQU4ABwEWgBtBTgAHARaAG0FOAAcBFoAbQU4ABwEWgBtBTgAHARaAG0FOAAcBFoAbQU4ABwEWgBtBIwAqQQ9AF0EjACpBD0AXQSMAKkEPQBdBIwAqQQ9AF0EjP/wBD3/ugSMAKkEPQBdBIwAqQQ9AF0EjACpBD0AXQItALcB+gCbAi0AowHxAIUFgAB2BJAAWwWAAHYEkABbBYAAdgSQAFsFgABHBJD/xAWAAHYEkABbBYAAdgSQAFsFgAB2BJAAWwV+AGUEkgBbBX4AZQSSAFsFfgBlBJIAWwV+AGUEkgBbBX4AZQSSAFsFMACMBGkAiAUwAIwEaQCIBZAAjATzAIgFkACMBPMAiAWQAIwE8wCIBZAAjATzAIgFkACMBPMAiATOAA8DyQAWBM4ADwPJABYEzgAPA8kAFgShAF8EoQBfBSQAsgRSAJwFtACpBJ0AnATGADED2AAoBQQAOQP3ACkFegCWBFkAZwV6AJYEWQBnBHMAsQNbAJoHQwAbBiAAFQYvAD8Evf/eBGgAjAUF/9QFBf/UBHMAAwNb//wFOAALBCf/0wW0ALEEngCcBbQAqQSdAJwG/ACpBe8AnQWpAC8EoAAsBM4ADwQCAC4FBAA5A/cAKQRQAGMEbAASBj8AkAR+AF0EfgBeBH4ANQR+AJoEkgBkBKYAhwVzAHoEfQBgBbQAqQRqAIwFOAAcBFoAOQSMAF8EPQApAi3/CgH6/vAFgAB2BJAAMwTtAFUCtf+LBTAAjARpACsEpv86BPsAqQR9AIwFPwCpBIMAXwU/AKkEgwBfBbQAqQRoAIwFBACpBA4AjQUEAKkEDgCNBE4AqQHxAIYG/ACpBwMAiwW0AKkEagCMBQwAqQR9AIwE7QCoArUAggS/AFAEIABfBMYAMQKdAAkFFwAcA+AAIQUXABwD4AAhBxkAPQYDACsEygBWA/cAWAXG/ngEhQATBCL/nwUf/7wCJP/ABMX/3wRn/1cE/P/4BIUAEwRQAIoD5gCKBCMARwTjAIoB6ACXBFQAigYCAIoEuwBgBFwAigQmACgEKwANBFQAJgHo/7QEKwANA+YAigOvAIoEIABDAegAlwHo/7QDzwArBFQAigQfACIEhQATBFAAigOvAIoD5gCKBOwAigYCAIoE4wCKBLsAYATOAIoEXACKBHwAYAQmACgEVAAmBD8ARwTjAIoEfABgBCsADQXDAAIE7ACKBB8AIgVnAGAFOAAcBFoAbQSMAKkEPQBdAAAAAQAABOQJCgQAAAICAgMGBQcGAgMDBAUCAgIEBQUFBQUFBQUFBQICBQUFBAgGBgYGBQUGBgIFBgUIBgYGBgYFBQYGCAYFBQIEAgQEAwUFBQUFAwUFAgIFAggFBQUFAwUDBQQHBAQEAwIDBgIFBQYFAgYEBwQEBQcEAwUDAwMFBAICAwQEBwcHBAgFBgUFCAUFBQUGAgUFAgYFCQgCBgMGBQYGAgUEBAQEAgMCBAMDAAAAAAACAgUCBQYGBgUGBQYGBgUFBQUFBQUFAwUEBQUFBQUFBgYHBQUHBwYKCgcGBgcIBQYGBgcHBggJBwgGBggGBQUEBQcFBQUFBwUFBAcFBQcHBgcFBQcFBQUICAUFCAcFCAcFBQgHCAcKCQUEBgUGBQYFCAcIBwYFBgAAAAAAAAUGBQUEBQUGBQcGCQYJCAcFCAYGBQYHBQYFBgUGBQUFBAYHCAcGBQUJBwkHBgUGBgYEBQkFCQMCAgUCAgEAAgIGBwQCAgICAwMDBQUDBAYBCQMDBAMEBQcHCggHBQcFBQYGBwQJBgYHCAgHBQYFBQUJAgUFBQUFAwMCBgUFCAgGBwAJCQUFAgIEBAQEBQQEBAIFBQUFBAQFBgIEBQQHBgUFBQUFBQUFBwUFBQMDAwMDAwMDAwMEAwUFBgYFBgUFBQUEBQUFBAUEBgYGBgUICAYFBQYHBQYFBQUGBQcIBgcFBQcFBQcFBgYGBQUHBQUGBQUFBQQJBQUFBQUEBQUFBQYGBgcHBAUEBQUDAwMDAwMDBQUHBQYCAgICAgIFAgIGBgUFAwYGBgYGBgYGBQUFBQICAgIGBgYGBgYGBgYGBQUFBQUFBQUFBQUFBQICAgIFBQUFBQUFBQUFBAQGBQYFBgUGBQYFBgUGBQYGBQUFBQUFBQUFBQYFBgUGBQYFBgUCAgICAgICAgIHBAUCBgUFAgUCBQMFAwYFBgUGBQUGBQYFBgUGAwYDBgMFBQUFBQUFBQUFBQMFAwUDBgUGBQYFBgUGBQYFCAcFBAUFBAUEBQQICAYFBQUFBQUF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sRCxUrG2sc2x5LH7shKyK7JEslCyXLJzsoqyobK6stGy6LL/sxizL7NGs12zdLOLs6Szu7PSs+m0ArQZtDC0R7RdtHO0jLSltLG0vbTUtOu1AbUatTC1RrVdtXa1jLWjtbq10LXmtf+2FrYttkO2XLZztou2ora4ts+25rdJt9+39rgNuCS4OrhRuGi4f7iVuKy43bj0uQq5Ibk4uU+5ZrnOulK6abp/upa6rLrDutq68bsIuxS7K7tCu1S7a7uCu5m7sLvHu9676bv0vAu8F7wjvDq8UbxdvGm8gLyXvKO8r7zEvPm9Bb0RvSi9P71LvVe9br2EvZS9q73Bvdi9774IviG+OL5Pvlu+Z75+vpS+q77Cvtm+7777vwe/E78fvza/TL9Yv2S/cL98v5O/n7+2v8y/47/5wBDAJ8BAwFnAcsCLwOjBTsFlwXzBk8GpwcLB2cHwwgfCHsI1wkvCYsJ5wpDCp8LKwvLDBcMcwzPDScNfw3jDkcOdw6nDwMPXw+3EBcQbxDHESMRhxHjEj8SmxL3E1MTtxQTFG8UxxUrFYcV3xY7F8cYIxh7GNcZMxmLGeMaOxqXHDsckxzrHUcdox3THi8eix7nH0Mfbx/HICMgUyCrINshLyFfIbsh6yJHIqMi/yNjI78j7yRHJKMk+yUrJYMlsyYLJjsmkybrJ0cnqygPKX8p2yozKpMq7ytLK6Mrzyv/LC8sXyyPLL8s7y1fLX8tny2/Ld8t/y4fLj8uXy5/Lp8uvy7fLv8vHy+DL+cwQzCfMPsxUzG/Md8x/zIfMj8yXzK/Mx8zezPXNDM0lzTzNp82vzcjN0M3Yze/OBs4OzhbOHs4mzj3ORc5NzlXOXc5lzm3Odc59zoXOjc6kzqzOtM8Hzw/PF88wz0fPT89Xz3DPeM+Pz6XPvM/Tz+rQAdAa0DPQStBh0GnQcdB90JTQnNCz0MrQ1tDi0PnRENEn0T7RRtFO0WfRgNGM0ZjRpNGw0bzRyNHQ0djR4NH30g7SFtIt0kTSW9J00nzShNKb0rLSy9LT0uzTBdMe0zfTT9Nm03zTldOu08fT4NPo0/DUCdQi1DvUU9Rq1IDUmdSx1MrU49T81RTVMdVO1VrVZtVu1XrVhtWS1Z7VtdXM1eXV/dYW1i7WR9Zf1njWkNar1sXW3tb31xDXKddC11vXdNeN16jXw9fP19vX8tgJ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AAUAJABIAAEA3gAIACUAJgAnACgAKQAqACsALAAtAC4ALwAwADEAMgAzADQANQA2ADcAOAA5ADoAOwA8AD0APgBlAGcAkgCwALEAsgCzALQAtQC2ALcAuAC5ANEA0gDTANQA1QDWANcA2ADZANoA2wDcAN0A3gDfAOAA4QDiAOMA5ADlAOYA5wDoASwBMAEyATgBOgE8AT4BPwFFAUYBfwGFAYoBjQJHAkgCSgJMAk0CTgJPAlACUQJSAlMCVAJVAlYCVwJYAlkCWgJbAlwCXQJeAl8CYAJhAmICYwJkAmUCZgKDAoUChwKJAosCjQKPApECkwKVApcCmQKbAp0CnwKhAqMCpQKnAqkCqwKtAq8CsgK0ArYCuAK6ArwCvgLAAsICxQLHAskCywLNAs8C0QLTAtUC2QLbAt0C3wLhAuMC5QLnAukC6wLtAu8C8QLyAvQC9gNTA1QDVQNWA1cDWANZA1sDXANdA14DXwNgA2EDYgNkA2UDZgNnA2gDaQNqA3oDewN8A30DfgN/A4ADgQOCA4MDhAOFA4YDhwOIA4kDigOLA4wDjQOOA48DuwO9A78D1APaA+AESQRLBE8EVwRZBF4EagACAAAABAAOD84V8jViAAEDVAAEAAABpQrSCtIGggtwCoAK/g+aDAAGiA7uDu4MRg6gCiIO7g7uD5oKigaSDGYMRgrYCqwNUg8QCl4L4gsQDBYGmA22DbYNtgwgCxAKUAxMDbAMTAsQBqYN5gtwD5oLcAasBrIGvAbCBsgMTAbOBtgNtgb+BxQHKgcwB0YHTAdSB4QHigeQDcANwAe+Du4H4AgCDVIIMA7uDu4LJg7uDu4IRg3ADcAIeAiCCIwIpg1ICLgNsAjSCOgLEAkyCUwJaAloCxAJYgloCWgJaAtwDCAK2AxMCxAN5g1IDqAOoA1ICtIK0grSCtIK0gmKCbAJugnECeIJ9AoGChgK/g+aD5oPmg+aDGYLcAtwC3ALcAtwC3ALcAr+DAAMAAwADAAO7g7uDu4O7g7uD5oPmg+aD5oPmgxGDEYMRgxGDxAL4gviC+IL4gviC+IL4gwWDBYMFgwWDbYMIAwgDCAMIAwgDEwMTAtwC+ILcAviC3AL4gr+Cv4K/gr+D5oMAAwWDAAMFgwADBYMAAwWDAAMFg7uDbYO7g7uDu4O7g7uDEYOoAoiCiIKIgoiDu4Ntg7uDbYO7g22DbYPmgwgD5oMIA+aDCAKUApQClAMZgxmDGYMRgxGDEYMRgxGDEYKrA8QDEwPEApeCl4KXgtwDAAO7g7uD5oPEAtwCoAMAApeDu4O7g6gDu4O7g+aCooMZg8QDVIO7g8QDbYMIAxMDCAMAA3mDu4O7gxGDqAOoAsmC3AKgA3mDAAO7g7uD5oKigr+DGYNUgviDBYMIAsQDEwNsAwWDUgMTAqsCqwKrA8QDEwK0grSCtIO7g22C3AL4gwADBYK2AxMCv4PEAxMDu4NUg2wDu4LcAviC3AL4gwADBYMFgwWDVINsA+aDCAMIAsQCyYMTAsmDEwLJgxMDVINsAtwC+ILcAviC3AL4gtwC+ILcAviC3AL4gtwC+ILcAviC3AL4gtwC+ILcAviC3AL4gwADBYMAAwWDAAMFgwADBYMAAwWDAAMFgwADBYMAAwWDu4O7g+aDCAPmgwgD5oMIA+aDCAPmgwgD5oMIA+aDCAMIAxGDEYPEAxMDxAMTA8QDEwOoA7uDGYNUg2wDeYNSA1SDbANtg3ADeYOoA7uDu4PEA+aAAIAhwAGAAYAAAALAAsAAQATABMAAgAlACoAAwAsADUACQA4AD4AEwBFAEYAGgBJAEoAHABMAEwAHgBRAFQAHwBWAFYAIwBaAFoAJABcAF0AJQCKAIoAJwCcAJwAKACwALQAKQC2ALgALgC6ALoAMQC8AL0AMgC/AMAANADCAMQANgDGAMsAOQDRANEAPwDTAN0AQADfAN8ASwDhAOMATADlAOcATwDpAO0AUgDwAPAAVwD1APcAWAD6APsAWwD9AP8AXQEDAQQAYAEJAQkAYgEMAQwAYwEXARkAZAErAS0AZwEwATAAagEyATIAawFJAUkAbAFsAW0AbQFvAXEAbwG6AboAcgG9Ab0AcwHEAcUAdAHIAcgAdgHKAcsAdwHNAc0AeQIoAigAegIqAisAewJHAkgAfQJKAkoAfwJMAm0AgAJvAnIAogJ3AnwApgKBAokArAKLAosAtQKNAo0AtgKPAo8AtwKRApEAuAKTApwAuQKlAqcAwwKpAqkAxgKrAqsAxwKtAq0AyAKvAq8AyQKyArIAygK0ArQAywK2ArYAzAK4ArgAzQK6AroAzgK8ArwAzwK+AsoA0ALMAswA3QLOAs4A3gLQAtAA3wLbAtsA4ALdAt0A4QLfAt8A4gLh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BB7/6wQg/+sEIv/rBCT/6wQm/+sEKP/rBCr/6wQs/+sELv/rBDD/6wQy/+sENP/qBDb/6gQ4/+oEOv/qBDz/6gQ+/+oEQP/qBEL/6ARE/+gERv/oBE0AFAAfADj/1QA6/+QAO//sAD3/3QDR/9UA1f/VARj/5AEy/9UBOv/VAmb/3QLb/9UC3f/VAt//1QLt/+wC7//dAvH/3QNY/90DZ//dA2r/3QOO/9UDoP/sA6L/7AOk/+wDpv/dA7f/5AO//90EQf/dBEP/3QRF/90ETf/VBGr/3QAaADj/sAA6/+0APf/QANH/sADV/7ABGP/tATL/sAE6/7ACZv/QAtv/sALd/7AC3/+wAu//0ALx/9ADWP/QA2f/0ANq/9ADjv+wA6b/0AO3/+0Dv//QBEH/0ARD/9AERf/QBE3/sARq/9AAEAAu/+4AOf/uAmL/7gJj/+4CZP/uAmX/7gKy/+4C4f/uAuP/7gLl/+4C5//uAun/7gLr/+4Df//uBDP/7gQ1/+4ARwAGABAACwAQAEf/6ABI/+gASf/oAEv/6ABV/+gAk//oAJj/6AC6/+gAx//oAMj/6AD2/+gBAv/oAR3/6AEh/+gBOf/oAUv/6AFM/+gBVv/oAWwAEAFtABABbwAQAXAAEAFxABACbv/oAm//6AJw/+gCcf/oAnL/6AKK/+gCjP/oAo7/6AKQ/+gCkv/oApT/6AKW/+gCmP/oApr/6AKc/+gCnv/oAqD/6AKi/+gCpP/oA2v/6AOR/+gDlf/oA5j/6AOoABADqQAQA6wAEAOz/+gDuf/oA77/6APM/+gDzv/oA8//6APb/+gD7P/oBAj/6AQK/+gEDP/oBA7/6AQQ/+gEEv/oBBT/6AQW/+gEKv/oBCz/6AQu/+gEMv/oAAEAVgAEAAAAJgCmAZwB+gIUAlYCzAPCBLgFkgYsCMYKjAteDFQOGg5MDn4O/BDiEVgSKhRMFQIWaBciF6gYBhjIGT4ewBlQGqIc4B0CHhgelh7AHuoAAQAmAE8AWABbAF8AnAC0ALYAtwC4AL8AwgDDAMQAyQDLAMwAzQDRANUA1wDYANoA4gDmAOcA6ADpAOoA7ADuAPAA9QD3APoA/wECASEBbQA9AEf/7ABI/+wASf/sAEv/7ABV/+wAk//sAJj/7AC6/+wAx//sAMj/7AD2/+wBAv/sAR3/7AEh/+wBOf/sAUv/7AFM/+wBVv/sAm7/7AJv/+wCcP/sAnH/7AJy/+wCiv/sAoz/7AKO/+wCkP/sApL/7AKU/+wClv/sApj/7AKa/+wCnP/sAp7/7AKg/+wCov/sAqT/7ANr/+wDkf/sA5X/7AOY/+wDs//sA7n/7AO+/+wDzP/sA87/7APP/+wD2//sA+z/7AQI/+wECv/sBAz/7AQO/+wEEP/sBBL/7AQU/+wEFv/sBCr/7AQs/+wELv/sBDL/7AAXAFP/7AEX/+wCeP/sAnn/7AJ6/+wCe//sAnz/7ALG/+wCyP/sAsr/7ANx/+wDd//sA5P/7APZ/+wD3f/sBBz/7AQe/+wEIP/sBCL/7AQk/+wEJv/sBCj/7AQw/+wABgAQ/4QAEv+EAW7/hAFy/4QBdv+EAXf/hAAQAC7/7AA5/+wCYv/sAmP/7AJk/+wCZf/sArL/7ALh/+wC4//sAuX/7ALn/+wC6f/sAuv/7AN//+wEM//sBDX/7AAdAAb/8gAL//IAWv/zAF3/8wC8//MBGf/zAWz/8gFt//IBb//yAXD/8gFx//ICgf/zAoL/8wLw//MDc//zA5b/8wOf//MDp//zA6j/8gOp//IDrP/yA7j/8wPA//MD4f/zA+P/8wPl//MEQv/zBET/8wRG//MAPQAn//MAK//zADP/8wA1//MAg//zAJL/8wCX//MAsv/zANL/8wEH//MBFv/zARr/8wEc//MBHv/zASD/8wE4//MBVf/zAij/8wIp//MCK//zAiz/8wJT//MCXf/zAl7/8wJf//MCYP/zAmH/8wKJ//MCi//zAo3/8wKP//MCnf/zAp//8wKh//MCo//zAsX/8wLH//MCyf/zAvr/8wNX//MDZP/zA4r/8wON//MDuv/zA73/8wPY//MD2v/zA9z/8wQb//MEHf/zBB//8wQh//MEI//zBCX/8wQn//MEKf/zBCv/8wQt//MEL//zBDH/8wSq//MAPQAn/+YAK//mADP/5gA1/+YAg//mAJL/5gCX/+YAsv/mANL/5gEH/+YBFv/mARr/5gEc/+YBHv/mASD/5gE4/+YBVf/mAij/5gIp/+YCK//mAiz/5gJT/+YCXf/mAl7/5gJf/+YCYP/mAmH/5gKJ/+YCi//mAo3/5gKP/+YCnf/mAp//5gKh/+YCo//mAsX/5gLH/+YCyf/mAvr/5gNX/+YDZP/mA4r/5gON/+YDuv/mA73/5gPY/+YD2v/mA9z/5gQb/+YEHf/mBB//5gQh/+YEI//mBCX/5gQn/+YEKf/mBCv/5gQt/+YEL//mBDH/5gSq/+YANgAl/+QAPP/SAD3/0wCx/+QAs//kANn/0gEM/+QCTP/kAk3/5AJO/+QCT//kAlD/5AJR/+QCUv/kAmb/0wKD/+QChf/kAof/5ALv/9MC8f/TA1P/5ANY/9MDW//kA2f/0wNo/9IDav/TA4P/5AOP/9IDpv/TA6//5AO//9MDwv/SA8X/5APH/+QD0P/SA+r/0gPv/+QD8f/kA/P/5AP1/+QD9//kA/n/5AP7/+QD/f/kA///5AQB/+QEA//kBAX/5ARB/9MEQ//TBEX/0wRP/9IEV//SBGr/0wAmABD/HgAS/x4AJf/NALH/zQCz/80BDP/NAW7/HgFy/x4Bdv8eAXf/HgJM/80CTf/NAk7/zQJP/80CUP/NAlH/zQJS/80Cg//NAoX/zQKH/80DU//NA1v/zQOD/80Dr//NA8X/zQPH/80D7//NA/H/zQPz/80D9f/NA/f/zQP5/80D+//NA/3/zQP//80EAf/NBAP/zQQF/80ApgBH/9wASP/cAEn/3ABL/9wAUf/zAFL/8wBT/9YAVP/zAFX/3ABZ/90AWv/hAF3/4QCT/9wAmP/cAJr/3QC6/9wAvP/hAMD/8wDH/9wAyP/cAMr/3QDr//MA7//zAPD/8wDy//MA8//zAPT/8wD2/9wA9//zAPn/8wD6//MA/f/zAP//8wEC/9wBBP/zARf/1gEZ/+EBHf/cASH/3AE1//MBOf/cAUT/8wFJ//MBS//cAUz/3AFW/9wCbv/cAm//3AJw/9wCcf/cAnL/3AJ3//MCeP/WAnn/1gJ6/9YCe//WAnz/1gJ9/90Cfv/dAn//3QKA/90Cgf/hAoL/4QKK/9wCjP/cAo7/3AKQ/9wCkv/cApT/3AKW/9wCmP/cApr/3AKc/9wCnv/cAqD/3AKi/9wCpP/cAr//8wLB//MCw//zAsT/8wLG/9YCyP/WAsr/1gLi/90C5P/dAub/3QLo/90C6v/dAuz/3QLw/+EDa//cA23/8wNv/90Dcf/WA3P/4QN2/90Dd//WA3j/3QOR/9wDkv/zA5P/1gOU//MDlf/cA5b/4QOY/9wDmf/zA57/8wOf/+EDp//hA67/8wOz/9wDtP/zA7j/4QO5/9wDvv/cA8D/4QPM/9wDzv/cA8//3APV//MD1//zA9n/1gPb/9wD3f/WA+H/4QPj/+ED5f/hA+n/8wPs/9wECP/cBAr/3AQM/9wEDv/cBBD/3AQS/9wEFP/cBBb/3AQc/9YEHv/WBCD/1gQi/9YEJP/WBCb/1gQo/9YEKv/cBCz/3AQu/9wEMP/WBDL/3AQ0/90ENv/dBDj/3QQ6/90EPP/dBD7/3QRA/90EQv/hBET/4QRG/+EESv/zBEz/8wRW//MEY//zBGX/8wRn//MAcQAG/9oAC//aAEf/8ABI//AASf/wAEv/8ABV//AAWf/vAFr/3ABd/9wAk//wAJj/8ACa/+8Auv/wALz/3ADH//AAyP/wAMr/7wD2//ABAv/wARn/3AEd//ABIf/wATn/8AFL//ABTP/wAVb/8AFs/9oBbf/aAW//2gFw/9oBcf/aAm7/8AJv//ACcP/wAnH/8AJy//ACff/vAn7/7wJ//+8CgP/vAoH/3AKC/9wCiv/wAoz/8AKO//ACkP/wApL/8AKU//AClv/wApj/8AKa//ACnP/wAp7/8AKg//ACov/wAqT/8ALi/+8C5P/vAub/7wLo/+8C6v/vAuz/7wLw/9wDa//wA2//7wNz/9wDdv/vA3j/7wOR//ADlf/wA5b/3AOY//ADn//cA6f/3AOo/9oDqf/aA6z/2gOz//ADuP/cA7n/8AO+//ADwP/cA8z/8APO//ADz//wA9v/8APh/9wD4//cA+X/3APs//AECP/wBAr/8AQM//AEDv/wBBD/8AQS//AEFP/wBBb/8AQq//AELP/wBC7/8AQy//AENP/vBDb/7wQ4/+8EOv/vBDz/7wQ+/+8EQP/vBEL/3ARE/9wERv/cADQABv+gAAv/oABZ//EAWv/FAF3/xQCa//EAvP/FAMr/8QEZ/8UBbP+gAW3/oAFv/6ABcP+gAXH/oAJ9//ECfv/xAn//8QKA//ECgf/FAoL/xQLi//EC5P/xAub/8QLo//EC6v/xAuz/8QLw/8UDb//xA3P/xQN2//EDeP/xA5b/xQOf/8UDp//FA6j/oAOp/6ADrP+gA7j/xQPA/8UD4f/FA+P/xQPl/8UENP/xBDb/8QQ4//EEOv/xBDz/8QQ+//EEQP/xBEL/xQRE/8UERv/FAD0AR//nAEj/5wBJ/+cAS//nAFX/5wCT/+cAmP/nALr/5wDH/+cAyP/nAPb/5wEC/+cBHf/nASH/5wE5/+cBS//nAUz/5wFW/+cCbv/nAm//5wJw/+cCcf/nAnL/5wKK/+cCjP/nAo7/5wKQ/+cCkv/nApT/5wKW/+cCmP/nApr/5wKc/+cCnv/nAqD/5wKi/+cCpP/nA2v/5wOR/+cDlf/nA5j/5wOz/+cDuf/nA77/5wPM/+cDzv/nA8//5wPb/+cD7P/nBAj/5wQK/+cEDP/nBA7/5wQQ/+cEEv/nBBT/5wQW/+cEKv/nBCz/5wQu/+cEMv/nAHEABgAMAAsADABH/+gASP/oAEn/6ABL/+gAU//qAFX/6ABaAAsAXQALAJP/6ACY/+gAuv/oALwACwDH/+gAyP/oAPb/6AEC/+gBF//qARkACwEd/+gBIf/oATn/6AFL/+gBTP/oAVb/6AFsAAwBbQAMAW8ADAFwAAwBcQAMAm7/6AJv/+gCcP/oAnH/6AJy/+gCeP/qAnn/6gJ6/+oCe//qAnz/6gKBAAsCggALAor/6AKM/+gCjv/oApD/6AKS/+gClP/oApb/6AKY/+gCmv/oApz/6AKe/+gCoP/oAqL/6AKk/+gCxv/qAsj/6gLK/+oC8AALA2v/6ANx/+oDcwALA3f/6gOR/+gDk//qA5X/6AOWAAsDmP/oA58ACwOnAAsDqAAMA6kADAOsAAwDs//oA7gACwO5/+gDvv/oA8AACwPM/+gDzv/oA8//6APZ/+oD2//oA93/6gPhAAsD4wALA+UACwPs/+gECP/oBAr/6AQM/+gEDv/oBBD/6AQS/+gEFP/oBBb/6AQc/+oEHv/qBCD/6gQi/+oEJP/qBCb/6gQo/+oEKv/oBCz/6AQu/+gEMP/qBDL/6ARCAAsERAALBEYACwAMAFz/7QBe/+0A7f/tAvP/7QL1/+0C9//tA5f/7QPD/+0D0f/tA+v/7QRQ/+0EWP/tAAwAXP/yAF7/8gDt//IC8//yAvX/8gL3//IDl//yA8P/8gPR//ID6//yBFD/8gRY//IAHwBa//QAXP/yAF3/9ABe//MAvP/0AO3/8gEZ//QCgf/0AoL/9ALw//QC8//zAvX/8wL3//MDc//0A5b/9AOX//IDn//0A6f/9AO4//QDwP/0A8P/8gPR//ID4f/0A+P/9APl//QD6//yBEL/9ARE//QERv/0BFD/8gRY//IAeQAG/8oAC//KADj/0gA6/9QAPP/0AD3/0wBR/9EAUv/RAFT/0QBa/+YAXP/vAF3/5gC8/+YAwP/RANH/0gDV/9IA2f/0AN3/7QDg/+EA6//RAO3/7wDv/9EA8P/RAPL/0QDz/9EA9P/RAPf/0QD5/9EA+v/RAP3/0QD//9EBBP/RARj/1AEZ/+YBMv/SATX/0QE6/9IBRP/RAUn/0QFs/8oBbf/KAW//ygFw/8oBcf/KAmb/0wJ3/9ECgf/mAoL/5gK//9ECwf/RAsP/0QLE/9EC2//SAt3/0gLf/9IC7//TAvD/5gLx/9MDWP/TA2f/0wNo//QDav/TA23/0QNz/+YDgv/tA47/0gOP//QDkv/RA5T/0QOW/+YDl//vA5n/0QOe/9EDn//mA6b/0wOn/+YDqP/KA6n/ygOs/8oDrv/RA7T/0QO3/9QDuP/mA7//0wPA/+YDwv/0A8P/7wPQ//QD0f/vA9X/0QPX/9ED4P/tA+H/5gPi/+0D4//mA+T/7QPl/+YD5v/hA+n/0QPq//QD6//vBEH/0wRC/+YEQ//TBET/5gRF/9MERv/mBEr/0QRM/9EETf/SBE//9ARQ/+8EUf/hBFP/4QRW/9EEV//0BFj/7wRj/9EEZf/RBGf/0QRq/9MAHQA4/74AWv/vAF3/7wC8/+8A0f++ANX/vgEZ/+8BMv++ATr/vgKB/+8Cgv/vAtv/vgLd/74C3/++AvD/7wNz/+8Djv++A5b/7wOf/+8Dp//vA7j/7wPA/+8D4f/vA+P/7wPl/+8EQv/vBET/7wRG/+8ETf++ADQAOP/mADr/5wA8//IAPf/nAFz/8QDR/+YA1f/mANn/8gDd/+4A4P/oAO3/8QEY/+cBMv/mATr/5gJm/+cC2//mAt3/5gLf/+YC7//nAvH/5wNY/+cDZ//nA2j/8gNq/+cDgv/uA47/5gOP//IDl//xA6b/5wO3/+cDv//nA8L/8gPD//ED0P/yA9H/8QPg/+4D4v/uA+T/7gPm/+gD6v/yA+v/8QRB/+cEQ//nBEX/5wRN/+YET//yBFD/8QRR/+gEU//oBFf/8gRY//EEav/nAIgAJQAQACf/6AAr/+gAM//oADX/6AA4/+AAOv/gAD3/3wCD/+gAkv/oAJf/6ACxABAAsv/oALMAEADR/+AA0v/oANMAEADV/+AA3AAQAOD/4QDxABAA+P/gAQMAEAEH/+gBDAAQARb/6AEY/+ABGv/oARz/6AEe/+gBIP/oATL/4AE4/+gBOv/gAVEAEAFV/+gCKP/oAin/6AIr/+gCLP/oAkwAEAJNABACTgAQAk8AEAJQABACUQAQAlIAEAJT/+gCXf/oAl7/6AJf/+gCYP/oAmH/6AJm/98CgwAQAoUAEAKHABACif/oAov/6AKN/+gCj//oAp3/6AKf/+gCof/oAqP/6ALF/+gCx//oAsn/6ALb/+AC3f/gAt//4ALv/98C8f/fAvr/6ANTABADV//oA1j/3wNbABADZP/oA2f/3wNq/98DgwAQA4r/6AON/+gDjv/gA6b/3wOvABADt//gA7r/6AO9/+gDv//fA8UAEAPHABAD2P/oA9r/6APc/+gD5v/hA+f/4APtABAD7gAQA+8AEAPxABAD8wAQA/UAEAP3ABAD+QAQA/sAEAP9ABAD/wAQBAEAEAQDABAEBQAQBBv/6AQd/+gEH//oBCH/6AQj/+gEJf/oBCf/6AQp/+gEK//oBC3/6AQv/+gEMf/oBEH/3wRD/98ERf/fBE3/4ARR/+EEUv/gBFP/4QRU/+AEaAAQBGkAEARq/98Eqv/oAC0AOP/xADr/9AA8//QAPf/wANH/8QDT//UA1f/xANn/9ADc//UA3f/zARj/9AEy//EBOv/xAVH/9QJm//AC2//xAt3/8QLf//EC7//wAvH/8ANY//ADZ//wA2j/9ANq//ADgv/zA47/8QOP//QDpv/wA7f/9AO///ADwv/0A9D/9APg//MD4v/zA+T/8wPq//QD7f/1BEH/8ARD//AERf/wBE3/8QRP//QEV//0BGj/9QRq//AAWQAlAA8AOP/mADr/5gA8AA4APf/mALEADwCzAA8A0f/mANMADgDV/+YA2QAOANwADgDdAAsA4P/lAPEADwD4/+gBAwAPAQwADwEY/+YBMv/mATr/5gFRAA4CTAAPAk0ADwJOAA8CTwAPAlAADwJRAA8CUgAPAmb/5gKDAA8ChQAPAocADwLb/+YC3f/mAt//5gLv/+YC8f/mA1MADwNY/+YDWwAPA2f/5gNoAA4Dav/mA4IACwODAA8Djv/mA48ADgOm/+YDrwAPA7f/5gO//+YDwgAOA8UADwPHAA8D0AAOA+AACwPiAAsD5AALA+b/5QPn/+gD6gAO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ABADogOiABADpAOkABADpgOmAA8DpwOnABkDqAOpAB0DrAOsAB0DrQOtAAIDrgOuABcDsAOwABMDsQOxAAUDswOzABYDtwO3AA0DuAO4ABkDvQO9AAQDvgO+ABQDvwO/AA8DwAPAABkDwQPBAAIDwgPCAA4DwwPDABsDxAPEAAIDxgPGABMDyAPIABMDywPLAAUDzAPMABYDzgPPABYD0APQAA4D0QPRABsD2APYAAMD2QPZABgD3QPdABgD3wPfABUD4APgABID4QPhABkD4gPiABID4wPjABkD5APkABID5QPlABkD6gPqAA4D6wPrABsD8APwABMD8gPyABMD9AP0ABMD9gP2ABMD+AP4ABMD+gP6ABMD/AP8ABMD/gP+ABMEAAQAABMEAgQCABMEBAQEABMEBgQGABMEBwQHAAUECAQIABYECQQJAAUECgQKABYECwQLAAUEDAQMABYEDQQNAAUEDgQOABYEDwQPAAUEEAQQABYEEQQRAAUEEgQSABYEEwQTAAUEFAQUABYEFQQVAAUEFgQWABYEFwQXAAIEGQQZAAIEGwQbAAMEHAQcABgEHQQdAAMEHgQeABgEHwQfAAMEIAQgABgEIQQhAAMEIgQiABgEIwQjAAMEJAQkABgEJQQlAAMEJgQmABgEJwQnAAMEKAQoABgEMAQwABgEMwQzAAwENQQ1AAwEQQRBAA8EQgRCABkEQwRDAA8ERAREABkERQRFAA8ERgRGABkESQRJAAkESwRLAAIETQRNAAYETwRPAA4EUARQABsEVQRVAAcEVgRWAAgEVwRXAA4EWARYABsEWwRbABcEXQRdAB8EXgReAAcEYARgAAkEZARkAAIEZgRmAAIEagRqAA8EqgSqAAMAAgFtAAYABgAHAAsACwAHABAAEAATABEAEQAXABIAEgATACUAJQARACcAJwAFACsAKwAFAC4ALgAcADMAMwAFADUANQAFADcANwAZADgAOAAKADkAOQAGADoAOgANADsAOwAJADwAPAASAD0APQAOAD4APgAUAEUARQAaAEcASQAVAEsASwAVAFEAUgAYAFMAUwAIAFQAVAAYAFUAVQAVAFcAVwAbAFkAWQALAFoAWgACAFwAXAAWAF0AXQACAF4AXgAMAIMAgwAFAJIAkgAFAJMAkwAVAJcAlwAFAJgAmAAVAJoAmgALALEAsQAR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b20EbGRub20EbGRub20EbGZyYWMEcmZyYWMEcmZyYWMEcmZyYWMEcmZyYWMEcmZyYWMEcmZyYWMEcmZyYWMEcmZyYWMEcmZyYWMEcmxpZ2EEfGxpZ2EEhGxudW0EimxudW0EimxudW0EimxudW0EimxudW0EimxudW0EimxudW0EimxudW0EimxudW0EimxudW0EimxvY2wEkGxvY2wElmxvY2wEnG51bXIEom51bXIEom51bXIEom51bXIEom51bXIEom51bXIEom51bXIEom51bXIEom51bXIEom51bXIEom9udW0EqG9udW0EqG9udW0EqG9udW0EqG9udW0EqG9udW0EqG9udW0EqG9udW0EqG9udW0EqG9udW0EqHBudW0ErnBudW0ErnBudW0ErnBudW0ErnBudW0ErnBudW0ErnBudW0ErnBudW0ErnBudW0ErnBudW0ErnNtY3AEtHNtY3AEtHNtY3AEtHNtY3AEtHNtY3AEtHNtY3AEtHNtY3AEtHNtY3AEtHNtY3AEtHNtY3AEtHNzMDEEunNzMDEEunNzMDEEunNzMDEEunNzMDEEunNzMDEEunNzMDEEunNzMDEEunNzMDEEunNzMDEEunNzMDIEwHNzMDIEwHNzMDIEwHNzMDIEwHNzMDIEwHNzMDIEwHNzMDIEwHNzMDIEwHNzMDIEwHNzMDIEwHNzMDMExnNzMDMExnNzMDMExnNzMDMExnNzMDMExnNzMDMExnNzMDMExnNzMDMExnNzMDMExnNzMDMExnNzMDQEzHNzMDQEzHNzMDQEzHNzMDQEzHNzMDQEzHNzMDQEzHNzMDQEzHNzMDQEzHNzMDQEzHNzMDQEzHNzMDUE0nNzMDUE0nNzMDUE0nNzMDUE0nNzMDUE0nNzMDUE0nNzMDUE0nNzMDUE0nNzMDUE0nNzMDUE0nNzMDYE2HNzMDYE2HNzMDYE2HNzMDYE2HNzMDYE2HNzMDYE2HNzMDYE2HNzMDYE2HNzMDYE2HNzMDYE2HNzMDcE3nNzMDcE3nNzMDcE3nNzMDcE3nNzMDcE3nNzMDcE3nNzMDcE3nNzMDcE3nNzMDcE3nNzMDcE3nRudW0E5HRudW0E5HRudW0E5HRudW0E5HRudW0E5HRudW0E5HRudW0E5HRudW0E5HRudW0E5HRudW0E5AAAAAEAAAAAAAIAAgADAAAAAQAHAAAAAQAYAAAAAwAVABYAFwAAAAIACAAJAAAAAQAJAAAAAQAUAAAAAQAEAAAAAQAGAAAAAQAFAAAAAQAZAAAAAQARAAAAAQATAAAAAQABAAAAAQAKAAAAAQALAAAAAQAMAAAAAQANAAAAAQAOAAAAAQAPAAAAAQAQAAAAAQASABsAOAPGBrQHYA3wDfAOBg4oDl4OhA6yDsYO2g7uDwAPGg9cD3oPmA/KD/wQLhBCEHoQbBB6EKYAAQAAAAEACAACAcQA3wHnAboBuwG8Ab0BvgG/AcABwQHCAcMBxAHFAcYBxwHIAckBygHLAcwBzQHOAc8B0AHRAdIB0wHoAekCRAI7AeoB6wHsAe0B7gHvAfAB8QHyAfMB9AH1AfYB9wH4AfkB+gH7AfwB/QH+AgACAQTdAgICAwIEAgUCBgIHAggCCQIKAgsCLwIPAhACEQIUAhUCFgIXAhgCGQIbAhwCHgIdAvwC/QL+Av8DAAMBAwIDAwMEAwUDBgMHAwgDCQMKAwsDDAMNAw4DDwMQAxEDEgMTAxQDFQMWAxcDGAMZAxoDGwMcAx0DHgMfAyADIQMiAyMDJAMlAyYDJwMoAykDKgMrAywDLQMuAy8DMAMxAzIDMwM0AzUDNgM3AzgDOQM6AzsDPAM9Az4DPwNAA0EDQgNDA0QDRgNFA0cDSANJA0oDSwNMA00DTgNPA1ADUQNSBKsErAStBK4ErwSwBLEEsgSzBLQEtQS2BLcEuAS5BLoEuwS8BL0EvgS/BMAEwQTCBMMExATFBMYB/wTHBMgEyQTKBMsEzATNBM4EzwTQBNEE0gTTBNQE1QTWBNgE2QTbAhoE3AIOBNcCEwINBNoCDAISAAEA3wAIACUAJgAnACgAKQAqACsALAAtAC4ALwAwADEAMgAzADQANQA2ADcAOAA5ADoAOwA8AD0APgBlAGcAhQCSALAAsQCyALMAtAC1ALYAtwC4ALkA0QDSANMA1ADVANYA1wDYANkA2gDbANwA3QDeAN8A4ADhAOIA4wDkAOUA5gDnAOgBLAEwATIBOAE6ATwBPgE/AUUBRgF/AYUBigGNAkcCSAJKAkwCTQJOAk8CUAJRAlICUwJUAlUCVgJXAlgCWQJaAlsCXAJdAl4CXwJgAmECYgJjAmQCZQJmAoMChQKHAokCiwKNAo8CkQKTApUClwKZApsCnQKfAqECowKlAqcCqQKrAq0CrwKyArQCtgK4AroCvAK+AsACwgLFAscCyQLLAs0CzwLRAtMC1QLZAtsC3QLfAuEC4wLlAucC6QLrAu0C7wLxAvIC9AL2A1MDVANVA1YDVwNYA1kDWwNcA10DXgNfA2ADYQNiA2QDZQNmA2cDaANpA2oDegN7A3wDfQN+A38DgAOBA4IDgwOEA4UDhgOHA4gDiQOKA4sDjAONA44DjwO7A70DvwPUA9oD4ARJBEsETwRXBFkEXgRqAAEAAAABAAgAAgF0ALcBugG7AbwBvQG+Ab8BwAHBAcIBwwHEAcUBxgHHAcgByQHKAcsBzAHNAc4BzwHQAdEB0gHTAv0DMAI7AfoEygTLAfsB/AH9Af4B/wIABM4EzwTRBNQE3QICAgMCBAIFAgYCBwIIAgkCCgILAfQB9QH2AfcB+AH5Ai8CDwIQAhECFAIVAhcCGQL+Av8DAAMBAwIDAwMEAwUDBgMHAwgDCQMKAwsDDAMNAw4DDwMQAxEDEgMTAxQDFQMWAxcDGAMZA08DGgMbAxwDHQMeAx8DIAMhAyIDIwMkAyUDJgMnAygDKQMqAysDLAMtAy4DLwMxAzIDMwM0AzUDNgM3AzgDOQM6AzsDPAM9Az4DPwNAA0EDQgNDA0QDRgNFA0cDSANJA0oDSwNMA00DTgNQA1EDUgTJBMwEzQTQBNIE0wIBBNUEwQTCBMMExATFBMYExwTIBNYE2ATZAhgE2wIaBNwC/AIOBNcCEwINBNoCFgIMAhIAAQC3AEUARgBHAEgASQBKAEsATABNAE4ATwBQAFEAUgBTAFQAVQBWAFcAWABZAFoAWwBcAF0AXgCHAIwAkwDpAOoA6wDsAO0A7gDvAPAA8QDyAPMA9AD1APYA9wD4APkA+gD7APwA/QD+AP8BAAEBAQIBAwEEAQUBBgEtATEBMwE5ATsBPQFAAUcCSwJnAmgCaQJqAmsCbAJtAm4CbwJwAnECcgJzAnQCdQJ2AncCeAJ5AnoCewJ8An0CfgJ/AoACgQKCAoQChgKIAooCjAKOApACkgKUApYCmAKaApwCngKgAqICpAKmAqgCqgKsAq4CswK1ArcCuQK7Ar0CvwLBAsMCxgLIAsoCzALOAtAC0gLUAtYC2gLcAt4C4ALiAuQC5gLoAuoC7ALuAvAC8wL1AvcDkAORA5IDkwOUA5UDlgOXA5gDmQOaA5sDnAOdA54DnwO8A74DwAPOA9UD2wPhBEcESgRMBFAEWARaBFsEXwRrAAYAAAAGABIAKgBCAFoAcgCKAAMAAAABABIAAQCQAAEAAAAaAAEAAQBNAAMAAAABABIAAQB4AAEAAAAaAAEAAQBOAAMAAAABABIAAQBgAAEAAAAaAAEAAQKuAAMAAAABABIAAQBIAAEAAAAaAAEAAQObAAMAAAABABIAAQAwAAEAAAAaAAEAAQOdAAMAAAABABIAAQAYAAEAAAAaAAEAAQQaAAIAAQCnAKsAAAAEAAAAAQAIAAEGHgA2AHIApACuALgAygD8AQ4BGAFKAWQBfgGQAboB7AH2AhgCMgJEAnYCiAKiAswC3gMQAxoDJAM2A2gDcgN8A4YDoAO6A8wD9gQoBDIEVARuBIAEsgTEBN4FCAUaBSQFLgU4BUIFbAWWBcAF6gYUAAYADgAUABoAIAAmACwCTAACAKcCTQACAKgCTwACAKkD8QACAKoEewACAKsD7wACAKwAAQAEBIgAAgCsAAEABAKJAAIAqAACAAYADASKAAIArASMAAIBogAGAA4AFAAaACAAJgAsAlQAAgCnAlUAAgCoBAsAAgCpBAkAAgCqBH0AAgCrBAcAAgCsAAIABgAMBHcAAgCoAqMAAgGiAAEABASOAAIArAAGAA4AFAAaACAAJgAsAlgAAgCnAlkAAgCoAqcAAgCpBBcAAgCqBH8AAgCrBBkAAgCsAAMACAAOABQEkAACAKgEkgACAKwCtAACAaIAAwAIAA4AFAK2AAIAqASUAAIArAK4AAIBogACAAYADAOtAAIAqASWAAIArAAFAAwAEgAYAB4AJAR5AAIApwK+AAIAqAJcAAIAqQSYAAIArALAAAIBogAGAA4AFAAaACAAJgAsAl0AAgCnAl4AAgCoAmAAAgCpBB0AAgCqBIEAAgCrBBsAAgCsAAEABASaAAIAqAAEAAoAEAAWABwCywACAKgEgwACAKsEnAACAKwCzQACAaIAAwAIAA4AFALRAAIAqASeAAIArALXAAIBogACAAYADASgAAIArALbAAIBogAGAA4AFAAaACAAJgAsAmIAAgCnAmMAAgCoAuEAAgCpBDUAAgCqBIUAAgCrBDMAAgCsAAIABgAMBKIAAgCpBKQAAgCsAAMACAAOABQDoAACAKcDogACAKgEpgACAKwABQAMABIAGAAeACQDpgACAKcCZgACAKgERQACAKkEQwACAKoEQQACAKwAAgAGAAwC8gACAKgEqAACAKwABgAOABQAGgAgACYALAJnAAIApwJoAAIAqAJqAAIAqQPyAAIAqgR8AAIAqwPwAAIArAABAAQEiQACAKwAAQAEAooAAgCoAAIABgAMBIsAAgCsBI0AAgGiAAYADgAUABoAIAAmACwCbwACAKcCcAACAKgEDAACAKkECgACAKoEfgACAKsECAACAKwAAQAEBHgAAgCoAAEABASPAAIArAABAAQEGgACAKwAAwAIAA4AFASRAAIAqASTAAIArAK1AAIBogADAAgADgAUArcAAgCoBJUAAgCsArkAAgGiAAIABgAMA64AAgCoBJcAAgCsAAUADAASABgAHgAkBHoAAgCnAr8AAgCoAncAAgCpBJkAAgCsAsEAAgGiAAYADgAUABoAIAAmACwCeAACAKcCeQACAKgCewACAKkEHgACAKoEggACAKsEHAACAKwAAQAEBJsAAgCoAAQACgAQABYAHALMAAIAqASEAAIAqwSdAAIArALOAAIBogADAAgADgAUAtIAAgCoBJ8AAgCsAtgAAgGiAAIABgAMBKEAAgCsAtwAAgGiAAYADgAUABoAIAAmACwCfQACAKcCfgACAKgC4gACAKkENgACAKoEhgACAKsENAACAKwAAgAGAAwEowACAKkEpQACAKwAAwAIAA4AFAOhAAIApwOjAAIAqASnAAIArAAFAAwAEgAYAB4AJAOnAAIApwKBAAIAqARGAAIAqQREAAIAqgRCAAIArAACAAYADALzAAIAqASpAAIArAABAAQC+AACAKgAAQAEAvoAAgCoAAEABAL5AAIAqAABAAQC+wACAKgABQAMABIAGAAeACQCcwACAKcCdAACAKgCqAACAKkEGAACAKoEgAACAKsABQAMABIAGAAeACQEKwACAKcEKQACAKgELwACAKkELQACAKoEMQACAKwABQAMABIAGAAeACQELAACAKcEKgACAKgEMAACAKkELgACAKoEMgACAKwABQAMABIAGAAeACQEOQACAKcENwACAKgEPQACAKkEOwACAKoEPwACAKwABQAMABIAGAAeACQEOgACAKcEOAACAKgEPgACAKkEPAACAKoEQAACAKwAAQAEBIcAAgCoAAIAEQAlACkAAAArAC0ABQAvADQACAA2ADsADgA9AD4AFABFAEkAFgBLAE0AGwBPAFQAHgBWAFsAJABdAF4AKgCBAIEALACDAIMALQCGAIYALgCJAIkALwCMAIwAMACXAJoAMQDPAM8ANQABAAAAAQAIAAEABgACAAEAAgLVAtYAAQAAAAEACAACAA4ABATeBN8E4AThAAEABAKHAogCmQKaAAQAAAABAAgAAQAmAAIACgAcAAIABgAMAaMAAgBKAagAAgBYAAEABAGpAAIAWAABAAIASgBXAAQAAAABAAgAAQBEAAIACgAUAAEABAGkAAIATQABAAQBpgACAE0ABAAAAAEACAABAB4AAgAKABQAAQAEAaUAAgBQAAEABAGnAAIAUAABAAIASgGjAAEAAAABAAgAAQAGAZUAAQABAEsAAQAAAAEACAABAAYBJwABAAEAugABAAAAAQAIAAEABgGsAAEAAQA2AAEAAAABAAgAAgAcAAIB4wHkAAEAAAABAAgAAgAKAAIB5QHmAAEAAgAvAE8AAQAAAAEACAACAB4ADAIoAioCKQIrAiwCHwIgAiECIgGuAiQCJQABAAwAJwAoACsAMwA1AEYARwBIAEsAUwBUAFUAAQAAAAEACAACAAwAAwImAicCJwABAAMASQBLAiIAAQAAAAEACAACAGYACAI9Ai0CLgIwAjECOQI6AjwAAQAAAAEACAACABYACAAbABUAFgAXABgAGQAdABQAAQAIAa0CIwRxBHIEcwR0BHUEdgABAAAAAQAIAAIAFgAIBHYCIwRxBHIEcwR0Aa0EdQABAAgAFAAVABYAFwAYABkAGwAdAAEAAAABAAgAAgAWAAgAFQAWABcAGAAZABsAHQAUAAEACAItAi4CMAIxAjkCOgI8Aj0AAQAAAAEACAABAAYBaQABAAEAEwAGAAAAAQAIAAMAAQASAAEAUgAAAAEAAAAaAAIAAgF8AXwAAAHUAd0AAQABAAAAAQAIAAEAKAHAAAEAAAABAAgAAgAaAAoCMgB6AHMAdAIzAjQCNQI2AjcCOAACAAEAFAAdAAAAAQAAAAEACAACACYAEAHUAdUB1gHXAdgB2QHaAdsB3AHdAkACPgJBAkICPwJDAAEAEAAUABUAFgAXABgAGQAaABsAHAAdAE0ATgKuA5sDnQQa"

/***/ },
/* 18 */
/***/ function(module, exports) {


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE3OEEyRTk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTE3OEEyRjk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTJDOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTJEOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FYrpWAAABrNJREFUeNrkW2ls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"

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = [{
		title: "Minimal usage",
		desc: "This is what p5.toy does to your canvas.\nTry the different buttons !",
		js: function js() {
			function setup() {
				createCanvas(400, 400);
				createToy();
			}
			function draw() {
				background("white");
				noStroke();
				push();
				translate(width / 2, height / 2);
				rotate(frameCount / 10);
				fill("#dd6666");
				ellipse(50, 0, 75, 75);
				rotate(-2 * frameCount / 10);
				fill("#6666dd");
				ellipse(125, 0, 50, 50);
				pop();
			}
		}
	}, {
		title: "Gifs (1)",
		desc: "You can configure the Record button to capture exactly what you need.",
		js: function js() {
			var angle = 0;
			function setup() {
				createCanvas(400, 400);
				createToy();
				recordButton = function recordButton() {
					angle = 0;
					startGif();
				};
				stopRecordButton = abortGif;
			}
			function draw() {
				background("white");
				noStroke();
				push();
				translate(width / 2, height / 2);
				rotate(angle);
				fill("#dd6666");
				ellipse(50, 0, 75, 75);
				rotate(-2 * angle);
				fill("#6666dd");
				ellipse(125, 0, 50, 50);
				pop();
				angle += 0.1;
				if (angle >= TAU) {
					stopGif();
				}
			}
		}
	}, {
		title: "Gifs (2)",
		desc: "You can also record a gif without the button.\nBy default it will open in a new tab once it's done.",
		js: function js() {
			var angle = 0;
			function setup() {
				createCanvas(60, 60);
				gifQuality = 0;
				startGif();
			}
			function draw() {
				background("white");
				noStroke();
				push();
				translate(width / 2, height / 2);
				rotate(angle);
				fill("#dd6666");
				ellipse(20, 0, 15, 15);
				rotate(-2 * angle);
				fill("#6666dd");
				ellipse(5, 0, 10, 10);
				pop();
				angle += 0.1;
				if (angle >= TAU) {
					stopGif();
				}
			}
		}
	}, {
		title: "Parameters",
		desc: "As soon as you add parameters, the GUI will appear and let you change them on the fly.",
		js: function js() {
			function setup() {
				createCanvas(400, 400);
				createToy();
				addDefaultParams();
				gui.defColor("bg", "#fff");
				gui.defColor("red", "#dd6666");
				gui.defColor("blue", "#6666dd");
				gui.def("time", 0).listen();
				gui.def("speed", 0.1).min(-0.5).max(0.5).step(0.01);
			}
			function draw() {
				background(bg);
				noStroke();
				push();
				translate(width / 2, height / 2);
				rotate(time);
				fill(red);
				ellipse(50, 0, width / 5, width / 5);
				rotate(-2 * time);
				fill(blue);
				ellipse(125, 0, width / 7, width / 7);
				pop();
				time += speed;
			}
		}
	}, {
		title: "Snapshot",
		desc: "You can draw something right before the snapshot is taken by configuring the Snapshot button.",
		js: function js() {
			function setup() {
				createCanvas(400, 400);
				createToy();
				snapshotButton = function snapshotButton() {
					translate(width / 2, height / 2);
					rotate(-PI / 4);
					fill(0, 100);
					textSize(40);
					textAlign(CENTER, CENTER);
					text("WATERMARK", 10, 15);
				};
			}

			function draw() {
				background("white");
				noStroke();
				push();
				translate(width / 2, height / 2);
				rotate(frameCount / 10);
				fill("#dd6666");
				ellipse(50, 0, 75, 75);
				rotate(-2 * frameCount / 10);
				fill("#6666dd");
				ellipse(125, 0, 50, 50);
				pop();
			}
		}
	}, {
		title: "Instances",
		desc: "It also works in instance mode.\nPress SPACE while a sketch if focused to play/pause it.\nPress CTRL+SPACE to toggle all instances.\n",
		html: "<div id='boxDiv'></div>",
		css: "html, body { display:flex; width:100%; height:100%; justify-content:center; align-items:center; } #boxDiv { width: 420px; display: flex; flex-wrap: wrap; }",
		js: function js() {
			for (var i = 0; i < 12; i++) {
				(function (i) {
					new p5(function (p) {
						p.setup = function () {
							var canvas = p.createCanvas(140, 140);
							canvas.parent("boxDiv");
							p.createToy();
							p.collapseToy();
							p.buttonSize(140 / 4);
							p.colorMode("hsb");
							p.noStroke();
						};
						p.draw = function () {
							p.background(0, 0, 100);
							var color = (3 * p.frameCount + p.map(i, 0, 11, 0, 360)) % 360;
							p.fill(color, 70, 80);
							p.rect(0, 0, p.width, p.height);
						};
					});
				})(i);
			}
		}
	}].map(function (e, index) {
		e.title = e.title || "Example " + (index + 1);
		e.desc = e.desc || "";
		e.html = e.html || "";
		e.css = (e.css ? e.css : "") + "html,body{width:100%;height:100%;display:flex;justify-content:center;align-items:center;margin:0;}";
		// Only keep the content of the function, and
		// remove any indentation generated by toString
		e.js = e.js ? /\{(.*)\}/.exec(e.js.toString().replace(/(\n|\t)+/g, ""))[1].trim() : "";
		return e;
	});

/***/ }
/******/ ]);