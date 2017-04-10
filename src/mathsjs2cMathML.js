var doc = document.implementation.createDocument(null, ""); //create new DOM for our XML
var dict_replace_func = {
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
    "^": "power",
    "pow": "power",
    "min2": "min2",
    "min3": "min3",
    "max2": "max2",
    "max3": "max3",    
} 


function MathXMLDom() {
    
    /**Create <math></math> and generate expression tree from mathjs expression tree. Return XML-Dom
    @param {string} input_json Json-code, which is passed to the function**/
    this.createXMLDom = function (expression_tree_mathjs) {
        "use strict";
        var docmath = doc.createElement("math");	
        docmath.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML");
        this.traverseNode(docmath, expression_tree_mathjs);
        return docmath;
    }    
    
    /**Create node of expression tree, based on what was received at the entrance from node of JSON
    fn->function(sin,cos,min2,etc(see in name)) or operator(+,-,etc);
    name->variable;
    value->number;
    content->() and we parse expression inside brackets
    @param {object} moth Block of tags inside of which we located 
    @param {object} node Node of mathjs-tree, which we watch**/
    this.traverseNode = function (moth, node) {
        "use strict";
        if (node.hasOwnProperty("fn")) {
            var operation_name;
            
            var child_apply = doc.createElement("apply");
            moth.appendChild(child_apply);
            
            if (typeof node.fn === "object") {
                if (node.fn.name in dict_replace_func) {
                    operation_name = dict_replace_func[node.fn.name];
                }
                else {
                    operation_name = node.fn.name;
                }
            }
            else {
                if (node.fn in dict_replace_func) {
                    operation_name = dict_replace_func[node.fn];
                }
                else {
                    operation_name = node.fn;
                }            
            }
            
            var op = doc.createElement(operation_name);
            child_apply.appendChild(op);
        
        /* Есть ли способ сделать, чтобы эта конструкция здесь работала?
        node.args.forEach( function (item) {
            ???.traverseNode(child_apply, item);
            });
        }
        */
        
        for (var i = 0; i < node.args.length; i++) {
            this.traverseNode(child_apply, node.args[i]);
            }
        }
        
        if ((node.hasOwnProperty("name")) && !(node.hasOwnProperty("fn"))) {
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
            this.traverseNode(moth, node.content);
        }
    }
}  