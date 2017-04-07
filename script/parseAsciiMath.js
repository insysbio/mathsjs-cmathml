function parseAsciiMath(input_formula) {
/*With help library math.js parse AsciiMath formula, generate expression tree cMathML(mathsjs2cMathML) and return it
@param {string} input_formula Formula in AsciiMath format, whhich need parse*/
    node = math.parse(input_formula); //Global node(for dispaly formula), if don't need make the local
 	cont = 	JSON.stringify(node, null, 2); //Global node(for dispaly formula), if don't need make the local
	var docmath = create_obj(cont);
	return docmath;
} 