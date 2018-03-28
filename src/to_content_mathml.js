// import internal
//const dictionary = require("./dictionary"); // dictionary file
"use strict";

var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var dictFunc = require("./dictionaryFunction.json");
exports.name = "toCMathML";
exports.path = "expression.node.Node.prototype";
exports.factory = function(type, config, load, typed) {
  return function() {
    if (!(_validate(this.toString()))) {
      return false;
    }


    var XMLDocument = new DOMParser().parseFromString("<math xmlns='http://www.w3.org/1998/Math/MathML'/>", "text/xml");

    _traverse(XMLDocument.documentElement, this);


      return XMLDocument;

function _traverse(parentXML, node) {
  switch(node && node.type.trim()) {
    case 'SymbolNode':
      _parseSymbolNode(parentXML, node);
      break;
    case 'ConstantNode':
      _parseConstantNode(parentXML, node);
      break;
    case 'FunctionNode':
      _parseFunctionNode(parentXML, node);
      break;
      /* falls through */
    case 'OperatorNode':
      _parseOperatorNode(parentXML, node);
      break;
    case 'ParenthesisNode':
      _parseParenthesisNode(parentXML, node);
      break;
    case 'AccessorNode':
      /* falls through */
    case 'ArrayNode':
      /* falls through */
    case 'AssignmentNode':
      /* falls through */
    case 'BlockNode':
      /* falls through */
    case 'FunctionAssignmentNode':
      _parseFunctionAssignmentNode(parentXML, node);
      break;
      /* falls through */
    case 'IndexNode':
      /* falls through */
    case 'ObjectNode':
      /* falls through */
    case 'RangeNode':
      /* falls through */
    case 'UpdateNode':
      /* falls through */
    case 'ConditionalNode':
      _parseConditionalNode(parentXML, node);
      break;
      /* falls through */
    default:
      console.log("ups", node && node.type, node);
      //throw 'Unimplemented node type in simplifyConstant: '+node.type;
  }

}

  function _parseSymbolNode(parentXML, node) {
      let XMLNode = XMLDocument.createElement("ci");
      XMLNode.appendChild(XMLDocument.createTextNode(node.name));
      parentXML.appendChild(XMLNode);
  }

  function _parseConstantNode(parentXML, node) {
      let XMLNode = XMLDocument.createElement("cn");
      if (String(node.value).match(/^[\d]+[.]?[\d]*[e][+-][\d]+$/)) {
          XMLNode.setAttribute("type", "e-notation");
          var value = String(node.value).match(/^([\d]+[.]?[\d]*)[e]([+-][\d]+)$/);
          XMLNode.appendChild(XMLDocument.createTextNode(value[1]));
          XMLNode.appendChild(XMLDocument.createElement("sep"));
          XMLNode.appendChild(XMLDocument.createTextNode(value[2]));
      }
      else {
          XMLNode.appendChild(XMLDocument.createTextNode(node.value));
      }

      parentXML.appendChild(XMLNode)
  }

  function _parseFunctionNode(parentXML, node) {
      let apply = XMLDocument.createElement("apply");
      apply.appendChild(XMLDocument.createElement(dictFunc[node.fn.name]));
      if (node.args) {
        node.args.forEach((item) => {
          _traverse(apply, item);
        });
      }
      parentXML.appendChild(apply);
  }

  function _parseParenthesisNode(parentXML, node) {
      if (node.content.condition) {
        _traverse(parentXML, node.content)
      }
      else {
        node.content.forEach((item) => {
          let apply = XMLDocument.createElement("apply");
          _traverse(apply, item);
          parentXML.appendChild(apply);
        });
      }
  }

  function _parseOperatorNode(parentXML, node) {
     let apply = XMLDocument.createElement("apply");
      apply.appendChild(XMLDocument.createElement(dictFunc[node.fn]));

      if (node.args) {
        node.args.forEach((item) => {
          _traverse(apply, item);
        });
      }

      parentXML.appendChild(apply);
  }

  function _parseFunctionAssignmentNode(parentXML, node) {
    var lambda = XMLDocument.createElement("lambda");

    node.params.forEach(function(item) {
      var bvar = XMLDocument.createElement("bvar");
      var param = XMLDocument.createElement("ci");
      param.appendChild(XMLDocument.createTextNode(item)); //var text = document.createTextNode(data);
      bvar.appendChild(param);
      lambda.appendChild(bvar);
    });

    if (node.expr)  _traverse(lambda, node.expr);

    parentXML.appendChild(lambda);
  }

  function _parseConditionalNode(parentXML, node) {
    var piecewise = XMLDocument.createElement("piecewise");
    var piece = XMLDocument.createElement("piece");
    var otherwise = XMLDocument.createElement("otherwise");

    if(node.trueExpr) _traverse(piece, node.trueExpr)
    if(node.falseExpr) _traverse(otherwise, node.falseExpr)
    if(node.condition) _traverse(piece, node.condition)

    piecewise.appendChild(piece);
    piecewise.appendChild(otherwise);
    parentXML.appendChild(piecewise);
  }

  function _validate(formula) {
    if (formula.match(/[^\^*\/+-\w()_,.\>\<\= \?\:]/) == null) {
      return true
    }
    else {
      return false
    }
  }

}};
