
import React from "react";
import beautify from "js-beautify";
import hljs from "./highlight.js/highlight.pack";
import "./highlight.js/styles/obsidian.css";
import Iframe from "iframe";

// To be injected in the iframe
import p5 from "raw!./p5.min.js";
import p5toy from "raw!../build/p5.toy.min.js"
const libraries = [p5, p5toy];

import "./style.css";
import examples from "./examples";

class SandBox extends React.Component {
	constructor(props) {
		super(props);
		this.baseHead = libraries.map((t) => `<script>${t}</script>`).join("");
		this.sandboxAttributes = ["allow-scripts", "allow-popups"];
	}
	getDefaultProps() {
		return {
			html: "",
			css: "",
			js: ""
		};
	}
	componentDidMount() {
		this.frame = Iframe({
			container: this.container,
			//scrollingDisabled: true,
			sandboxAttributes: this.sandboxAttributes
		});
		this.update(this.props);
	}
	componentWillReceiveProps(props) {
		this.update(props);
	}
	update(props) {
		let head = this.baseHead;
		if(props.js) head += `<script>${props.js}</script>`;
		if(props.css) head += `<style>${props.css}</style>`;
		let body = props.html;
		this.frame.setHTML({ 
			head, 
			body,
			sandboxAttributes: this.sandboxAttributes
		});
	}
	render() {
		return (
			<div ref={(e)=>{this.container=e}}></div>
		);
	}
}

class CodeBox extends React.Component {
	getDefaultProps() {
		return { 
			lang: "js", 
			code: "" 
		};
	}
	componentWillMount() {
		this.highlight(this.props);
	}
	componentWillReceiveProps(props) {
		this.highlight(props);
	}
	highlight(props) {
		let prettyCode = beautify[props.lang](props.code);
		let tmpElem = document.createElement("code");
		tmpElem.innerHTML = prettyCode;
		hljs.highlightBlock(tmpElem);
		this.setState({
			hlCode: { __html: tmpElem.innerHTML }
		});
	}
	render() {
		return (
			<div className="codebox fullWidth">
				<pre><code className="hljs" dangerouslySetInnerHTML={this.state.hlCode}/></pre>
			</div>
	    );
	}
}

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			exIndex: 0
		};
		this.transitionDelay = 250;
		this.transitionElements = [];
		this.prev = this.prev.bind(this);
		this.next = this.next.bind(this);
		this.show = this.show.bind(this);
	}
	prev() {
		let i = this.state.exIndex-1;
		if(i >= 0) {
			this.transitionState({ exIndex: i });
		}
	}
	next() {
		let i = this.state.exIndex+1;
		if(i < examples.length) {
			this.transitionState({ exIndex: i });
		}
	}
	transitionState(state) {
		this.transitionElements.forEach(this.hide);
		this.transitionElements = [];
		setTimeout(() => {
			this.setState(state);
		}, this.transitionDelay);
	}
	show(e) {
		if(!e) return;
		e.classList.add("content");
		e.classList.remove("content-hide");
		e.classList.add("content-show");
		this.transitionElements.push(e);
	}
	hide(e) {
		if(!e) return;
		e.classList.remove("content-show");
		e.classList.add("content-hide");
	}
	render() {
		let {title, desc, html, css, js} = examples[this.state.exIndex];
		let prevClass = "", nextClass = "";
		if(this.state.exIndex == 0) {
			prevClass = "disabled";
		}
		if(this.state.exIndex == examples.length-1) {
			nextClass = "disabled";
		}
		return (
			<div id="main">
				<div className="sandbox">
					<div style={{height:"100%"}} ref={(e)=>{this.show(e)}}>
						<SandBox html={html} css={css} js={js}/>
					</div>
				</div>
				<div id="side">
					<div className="header fullWidth noselect">
						<div className="p5toyLogo"><span>p5</span><span>.</span><span>toy</span></div>
						<div className="links">
							<a className="githubLink" target="_blank" href="http://github.com/entibo/p5.toy"></a>
							<a className="p5Link" target="_blank" href="http://p5js.org"></a>
						</div>
					</div>
					<div className="navigation fullWidth noselect">
						<span className={prevClass} onClick={this.prev}> Previous example </span>
						<span className={nextClass} onClick={this.next}> Next example </span>
					</div>
					<div ref={(e)=>{this.show(e)}}>
						<h1>{title}</h1>
						<h3>{desc}</h3>
						<CodeBox code={js} lang="js" />
					</div>
				</div>
			</div>
		);
	}
}

window.render = () => {
	React.render( <Main/>, document.getElementById("app") )
};