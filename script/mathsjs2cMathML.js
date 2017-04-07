var doc = document.implementation.createDocument(null, ""); //create new DOM for our XML

function create_obj(input_json) {
/*Create <math></math> and generate expression from JSON inside it(with help recursive function traverse_tree(moth,node))
@param {string} input_json Json-code, which is passed to the function*/	
    var docmath = doc.createElement("math");	
    docmath.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML");
    var input_tree = JSON.parse(input_json);
    traverse_tree(docmath, input_tree);
    return docmath;
}

function traverse_tree(moth, node) {
/*Create node of expression tree, based on what was received at the entrance from node of JSON
    fn->function(sin,cos,min2,etc(see in name)) or operator(+,-,etc);
    name->variable;
    value->number;
    content->() and we parse expression inside brackets
@param {object} moth Block of tags inside of which we located 
@param {object} node Node of mathjs-tree, which we watch*/
    if (node.hasOwnProperty("fn")) {
        var child_apply = doc.createElement("apply");
        moth.appendChild(child_apply);
        var tag_op;
        if (typeof node.fn === "object") {
            tag_op = node.fn.name;
            switch (tag_op) {
                case "pow": tag_op = "power"; break;
                case "exp": tag_op = "power"; break;
            }
        }
        else {
            switch (node.fn) {//if need add new oparetor, then see doc: http://mathjs.org/docs/expressions/syntax.html
                case "add": tag_op = "plus"; break;
                case "subtract": tag_op = "minus"; break;
                case "multiply": tag_op = "times"; break;
                case "pow": tag_op = "power"; break;
                case "divide": tag_op = "divide"; break;
                case "unaryPlus": tag_op = "plus"; break;
                case "unaryMinus": tag_op = "minus"; break;
            }
        }
    var op = doc.createElement(tag_op);
    child_apply.appendChild(op);
    node.args.forEach( function (item) {
        traverse_tree(child_apply, item);
        });
    }
	
    if (node.hasOwnProperty("name")) {
        var ci = doc.createElement("ci");
        ci.innerHTML = node.name;
        moth.appendChild(ci);
    }
	
    if (node.hasOwnProperty("value")) {
        var cn = doc.createElement("cn");
        cn.innerHTML = node.value;
        moth.appendChild(cn);
    }	
	
    if (node.hasOwnProperty("content")) {
        traverse_tree(moth, node.content);
    }	
}