var doc = document.implementation.createDocument(null,''); //create new DOM for our XML
function traverse_tree(parent,node){
/*
parent is block of tags inside of which we located
node is node of mathjs-tree, which we watch
We watch what kind of element we get:
	fn->function(sin,cos,min2 etc(so we search name)) or operator(+-etc);
	name->variable;
	value->number;
	content->() and we parse experssion insed brackets
	
*/	if ('fn' in node){
		var child_apply = doc.createElement('apply');
		parent.appendChild(child_apply);//Create child-apply
		if (typeof node.fn == 'object'){
			tag_op = node.fn.name;}
		else{
			switch(node.fn){//if need add new oparetor, then see doc: http://mathjs.org/docs/expressions/syntax.html
			case 'add': tag_op = 'plus'; break;
			case 'subtract': tag_op = 'minus'; break;
			case 'multiply': tag_op = 'times'; break;
			case 'pow': tag_op = 'power'; break;
			case 'divide': tag_op = 'divide'; break;
			case 'unaryPlus': tag_op = 'plus'; break;
			case 'unaryMinus': tag_op = 'minus'; break;
			}}
		op = doc.createElement(tag_op);
		child_apply.appendChild(op);
		node.args.forEach(function(item,i,arr){
			traverse_tree(child_apply,item);});
	}
	if ('name' in node){
		var ci = doc.createElement('ci');
		ci.innerHTML = node.name;
		parent.appendChild(ci);
	}
	if ('value' in node){
		var cn = doc.createElement('cn')
		cn.innerHTML = node.value;
		parent.appendChild(cn);
	}	
	if ('content' in node){
		traverse_tree(parent,node.content);
	}	
}
function create_obj(input_json){
docmath = doc.createElement('math');	
docmath.setAttribute('xmlns','http://www.w3.org/1998/Math/MathML');
input_tree = JSON.parse(input_json);
traverse_tree(docmath,input_tree);
return docmath;
}