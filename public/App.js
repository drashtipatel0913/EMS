"use strict";

var element = /*#__PURE__*/React.createElement("div", {
  title: "Outer div"
}, /*#__PURE__*/React.createElement("h1", null, "Hello World!"), /*#__PURE__*/React.createElement("h3", null, "I just wanted the watcher to run completely"));
ReactDOM.render(element, document.getElementById('content'));