"use strict";
/**
*  mathjs2cMathML.js
*  https://github.com/insysbio/math_json
*  (c) 2017 ISB
*  Add to math.js method toCMathML, which convert exression tree of mathjs to cMathML exression tree
**/
var dictReplaceFunc = {
    "add": "plus",
    "subtract": "minus",
    "multiply": "times",
    "divide": "divide", 
    "unaryPlus": "plus",
    "unaryMinus": "minus",
    "sin": "sin",
    "cos": "cos",
    "arctan": "arctan",
    "arctg": "arctan",
    "atan": "arctan",
    "tan": "tan",
    "tg": "tan",
    "arccos": "arccos",
    "acos": "arccos",
    "arcsin": "arcsin",
    "asin": "arcsin",
    "ln": "ln",
    "log": "ln",
    "exp": "exp",
    "sqrt": "root",
    "log10": "log",
    "lg": "log",
    "fabs": "abs",
    "abs": "abs",
    "sign": "sign",
    "floor": "floor",
    "ceiling": "ceiling",
    "ceil": "ceiling",
    "power": "power",
    "pow": "power",
    "^": "power",
    "min2": "min2",
    "min3": "min3",
    "max2": "max2",
    "max3": "max3",
    "larger": "gt",
    "largerEq": "geq",
    "smallerEq": "leq",
    "smaller": "lt"}; 

/**Create <math></math> and generate expression tree from mathjs expression tree. Return XML-Dom
*@param {string} input_json Json-code, which is passed to the function
*/
math.toCMathML = function (mathObject) {
    console.log("try", mathObject);
    
    if (mathObject.toString().match(/[^\^*\/+-\w()_,.\>\<\= ]/) == null) {
        var doc = document.implementation.createDocument("http://www.w3.org/1998/Math/MathML", "math");

        traverseNode(doc.firstElementChild, mathObject);
        
        return doc.firstElementChild;
    }
    else {
        return null;    
    }
    
    /**Create node of expression tree, based on what was received at the entrance from node of JSON
    *fn->function(sin,cos,min2,etc(see in name)) or operator(+,-,etc);
    *name->variable;
    *value->number;
    *content->() and we parse expression inside brackets
    *@param {object} moth Block of tags inside of which we located 
    *@param {object} node Node of mathjs-tree, which we watch
    */
    function traverseNode(moth, node) {
        if (node.hasOwnProperty("fn")) {
            var operationName;
            
            var childApply = doc.createElement("apply");
            moth.appendChild(childApply);
            if (typeof node.fn === "object") {
                if (dictReplaceFunc[node.fn.name]) {
                    operationName = dictReplaceFunc[node.fn.name];
                }
                else {
                    operationName = node.fn.name;
                }
            }
            else {
                if (dictReplaceFunc[node.fn]) {                    
                    operationName = dictReplaceFunc[node.fn];
                }
                else {
                    operationName = node.fn;
                }            
            }
                     
            childApply.appendChild(doc.createElement(operationName));
        
        
            node.args.forEach(function (item) {
                traverseNode(childApply, item);
                });
        }
        
        
        if (node.hasOwnProperty("name") && !(node.hasOwnProperty("fn"))) {
            var ci = doc.createElement("ci");
            ci.innerHTML = node.name;
            moth.appendChild(ci);
        }
        
        if (node.hasOwnProperty("value")) {
            var cn = doc.createElement("cn");
            cn.innerHTML = node.value;
            cn.setAttribute("type", "double");
            moth.appendChild(cn);
        }	
        
        if (node.hasOwnProperty("content")) {
            traverseNode(moth, node.content);
        }
    }
 
}