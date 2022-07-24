# REF: https://raw.githubusercontent.com/kach/nearley/master/examples/calculator/arithmetic.ne
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

main -> _ AS _ {% d => d[1] %}

# PEMDAS!
# We define each level of precedence as a nonterminal.

# Parentheses
P -> "(" main ")" 	{% d => d[1] %}
    | U             {% id %}

# Exponents
E -> P _ "^" _ E    {% d => d[0] ** d[4] %}
    | P             {% id %}

# Multiplication and division
MD -> MD _ "*" _ E  {% d => d[0] * d[4] %}
    | MD _ "/" _ E  {% d => d[0] / d[4] %}
    | MD _ "%" _ E  {% d => d[0] % d[4] %}
    | E             {% id %}

# Addition and subtraction
AS -> AS _ "+" _ MD {% d => d[0] + d[4] %}
    | AS _ "-" _ MD {% d => d[0] - d[4] %}
    | MD            {% id %}

# Unary operation
U -> "+" _ N					{% d => d[2] %}
	| "-" _ N					{% d => -1 * d[2] %}
	| "+" _ "(" main ")"		{% d => d[3] %}
	| "-" _ "(" main ")"		{% d => -1 * d[3] %}
    | N  						{% id %}

# A number or a function of a number
N -> float          {% id %}
    | "sin" _ P     {% d => Math.sin(d[2]) %}
    | "cos" _ P     {% d => Math.cos(d[2]) %}
    | "tan" _ P     {% d => Math.tan(d[2]) %}

    | "asin" _ P    {% d => Math.asin(d[2]) %}
    | "acos" _ P    {% d => Math.acos(d[2]) %}
    | "atan" _ P    {% d => Math.atan(d[2]) %}

    | "pi"          {% d => Math.PI %}
    | "e"           {% d => Math.E %}
    | "sqrt" _ P    {% d => Math.sqrt(d[2]) %}
    | "ln" _ P      {% d => Math.log(d[2])  %}

# I use `float` to basically mean a number with a decimal point in it
float ->
      int "." int   {% d => +(d[0] + d[1] + d[2]) %}
	| int           {% d => +d[0] %}

int -> [0-9]:+        {% d => d[0].join('') %}

# Whitespace. The important thing here is that the postprocessor
# is a null-returning function. This is a memory efficiency trick.
_ -> [\s]:*     {% () => null %}
