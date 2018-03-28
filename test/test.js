var oSerializer = new XMLSerializer();
describe("parseAsciiMath", function() {
  describe("Проверяем формулы из файла math_examples.js", function() {

    function makeTest(x) {
      var mathML = new MathXMLDom();
      var exp_tree_mathjs = math.parse(test_formula[x]); 
      var cMathML = mathML.createXMLDom(exp_tree_mathjs);
      it("Проверяем формулу " + x, function() {
        assert.equal(oSerializer.serializeToString(cMathML), expected[x]);
      });
    }
    for (var x = 2; x < test_formula.length; x++) {
      makeTest(x);
    }

  });
  
  describe("Проверяем простые формулы", function() {

    function makeTest(x) {
      var mathML = new MathXMLDom();
      var exp_tree_mathjs = math.parse(simple_test_formula[x]); 
      var cMathML = mathML.createXMLDom(exp_tree_mathjs);
      it("Проверяем формулу " + x, function() {
        assert.equal( oSerializer.serializeToString(cMathML), expected_simple[x]);
      });
    }
    for (var x = 0; x < simple_test_formula.length; x++) {
      makeTest(x);
    }

  });

});