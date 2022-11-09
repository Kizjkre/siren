# This is a nice little grammar to familiarize yourself
# with the nearley syntax.

# It parses valid calculator input, obeying OOO and stuff.
#   ln (3 + 2*(8/e - sin(pi/5)))
# is valid input.

# This is (hopefully) pretty self-evident.

# `main` is the nonterminal that nearley tries to parse, so
# we define it first.
# The _'s are defined as whitespace below. This is a mini-
# -idiom.

@{%
	// Moo lexer documention is here:
	// https://github.com/no-context/moo

	const { lexer } = require('../../lexer');

	let EXPONENTIAL, MULTIPLICATIVE, ADDITIVE, NUMBER, KEYWORD, FUNCTION;
%}

# Pass your lexer with @lexer:
@lexer lexer

main -> _ AS _					{% d => d.flat() %}

# PEMDAS!
# We define each level of precedence as a nonterminal.

# Parentheses
P -> "(" main ")"				{% d => d.flat() %}
    | U  						{% id %}

# Exponents
E -> P _ %EXPONENTIAL _ E		{% d => d.flat() %}
    | P  						{% id %}

# Multiplication and division
MD -> MD _ %MULTIPLICATIVE _ E	{% d => d.flat() %}
    | E  						{% id %}

# Addition and subtraction
AS -> AS _ %ADDITIVE _ MD		{% d => [...d[0], ...d[1], { ...d[2], binary: true }, ...d[3], ...d[4]] %}
    | MD  						{% id %}

# Unary operation
U -> %ADDITIVE _ N				{% d => [{ ...d[0], binary: false }, ...d[1], ...d[2]] %}
	| %ADDITIVE _ "(" main ")"	{% d => [{ ...d[0], binary: false }, ...d[1], d[2], ...d[3], d[4]] %}
    | N  						{% id %}

# A number or a function of a number
N -> %NUMBER
	| %KEYWORD
  	| %FUNCTION _ P				{% d => d.flat() %}

# Whitespace. The important thing here is that the postprocessor
# is a null-returning function. This is a memory efficiency trick.
_ -> [\s]:*     				{% id %}
