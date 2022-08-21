import { compile } from 'moo';

export const tokens = Object.freeze({
  WHITESPACE: { match: /\p{White_Space}+/u, lineBreaks: true },
  PARENTHETICAL: /[()]/u,
  EXPONENTIAL: '^',
  MULTIPLICATIVE: /[*/%]/u,
  ADDITIVE: /[+-]/u,
  FUNCTION: [/a?sin/u, /a?cos/u, /a?tan/u, /sqrt/u, /ln/u],
  NUMBER: [/[0-9]*\.?[0-9]+/u, 'pi', 'e'],
  KEYWORD: ['x', 'i', 'MIN', 'MAX', 'MEAN', 'MEDIAN', 'MODE', 'Q1', 'Q3']
});

export const TOKEN_TYPES = Object.freeze(Object.fromEntries(Object.keys(tokens).map(k => [k, k])));

export const lexer = compile(tokens);

export const lex = expression => {
  lexer.reset(expression);
  return Array.from(lexer);
};

