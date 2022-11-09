// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

	// Moo lexer documention is here:
	// https://github.com/no-context/moo

	const { lexer } = require('../../lexer');

	let EXPONENTIAL, MULTIPLICATIVE, ADDITIVE, NUMBER, KEYWORD, FUNCTION;
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main", "symbols": ["_", "AS", "_"], "postprocess": d => d.flat()},
    {"name": "P", "symbols": [{"literal":"("}, "main", {"literal":")"}], "postprocess": d => d.flat()},
    {"name": "P", "symbols": ["U"], "postprocess": id},
    {"name": "E", "symbols": ["P", "_", (lexer.has("EXPONENTIAL") ? {type: "EXPONENTIAL"} : EXPONENTIAL), "_", "E"], "postprocess": d => d.flat()},
    {"name": "E", "symbols": ["P"], "postprocess": id},
    {"name": "MD", "symbols": ["MD", "_", (lexer.has("MULTIPLICATIVE") ? {type: "MULTIPLICATIVE"} : MULTIPLICATIVE), "_", "E"], "postprocess": d => d.flat()},
    {"name": "MD", "symbols": ["E"], "postprocess": id},
    {"name": "AS", "symbols": ["AS", "_", (lexer.has("ADDITIVE") ? {type: "ADDITIVE"} : ADDITIVE), "_", "MD"], "postprocess": d => [...d[0], ...d[1], { ...d[2], binary: true }, ...d[3], ...d[4]]},
    {"name": "AS", "symbols": ["MD"], "postprocess": id},
    {"name": "U", "symbols": [(lexer.has("ADDITIVE") ? {type: "ADDITIVE"} : ADDITIVE), "_", "N"], "postprocess": d => [{ ...d[0], binary: false }, ...d[1], ...d[2]]},
    {"name": "U", "symbols": [(lexer.has("ADDITIVE") ? {type: "ADDITIVE"} : ADDITIVE), "_", {"literal":"("}, "main", {"literal":")"}], "postprocess": d => [{ ...d[0], binary: false }, ...d[1], d[2], ...d[3], d[4]]},
    {"name": "U", "symbols": ["N"], "postprocess": id},
    {"name": "N", "symbols": [(lexer.has("NUMBER") ? {type: "NUMBER"} : NUMBER)]},
    {"name": "N", "symbols": [(lexer.has("KEYWORD") ? {type: "KEYWORD"} : KEYWORD)]},
    {"name": "N", "symbols": [(lexer.has("FUNCTION") ? {type: "FUNCTION"} : FUNCTION), "_", "P"], "postprocess": d => d.flat()},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": id}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
