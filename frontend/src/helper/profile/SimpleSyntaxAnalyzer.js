import { SLAToken } from './SimpleLexicalAnalyzer';

export default class SimpleSyntaxAnalyzer {
  constructor(tokens) {
    this._tokens = new SimpleStream(tokens);
    this._tree = null;
  }

  analyze() {
    const expression = this._expression();
    if (this._tokens.more()) {
      const next = this._tokens.next();
      throw new SyntaxError(`Unexpected token ${ next.value } in expression at position ${ next.index + 1 }.`);
    }
    this._tree = expression;
    return this;
  }

  _skipWhitespace() {
    if (this._tokens.more() && this._tokens.peek().type === SLAToken.TYPES.whitespace) {
      this._tokens.next();
    }
  }

  _expression() {
    const term = this._term();
    if (this._tokens.more() && this._tokens.peek().type === SLAToken.TYPES.additive) {
      return new OperationNode(this._tokens.next().value, [term, this._expression()]);
    }
    return term;
  }

  _term() {
    const factor = this._factor();
    if (this._tokens.more() && this._tokens.peek().type === SLAToken.TYPES.multiplicative) {
      return new OperationNode(this._tokens.next().value, [factor, this._term()]);
    }
    return factor;
  }

  _factor() {
    const base = this._base();
    if (this._tokens.more() && this._tokens.peek().type === SLAToken.TYPES.exponential) {
      return new OperationNode(this._tokens.next().value, [base, this._factor()]);
    }
    return base;
  }

  _base() {
    if (this._tokens.more()) {
      switch (this._tokens.peek().type) {
        case SLAToken.TYPES.parenthesis:
          if (this._tokens.peek().value !== '(') {
            throw new SyntaxError(`Unexpected token ) in expression at position ${ this._tokens.peek().index + 1 }.`);
          }
          this._tokens.next();
          const expression = this._expression();
          this._tokens.next();
          this._skipWhitespace();
          return expression;
        case SLAToken.TYPES.number:
          const numNode = new NumberNode(this._tokens.next().value);
          this._skipWhitespace();
          return numNode;
        case SLAToken.TYPES.keyword:
          const keyNode = new KeywordNode(this._tokens.next().value);
          this._skipWhitespace();
          return keyNode;
        case SLAToken.TYPES.whitespace:
          this._tokens.next();
          return this._base();
        default:
          const next = this._tokens.next();
          throw new SyntaxError(`Unexpected token ${ next.value } in expression at position ${ next.index + 1 }.`);
      }
    }

    throw new SyntaxError('Unexpected end of input.');
  }

  get tree() {
    return this._tree;
  }
}

class SimpleStream {
  constructor(string) {
    this._string = string;
    this._index = 0;
  }

  more() { return this._index + 1 <= this._string.length; }

  peek() { return this._string[this._index]; }

  next() {
    if (!this.more()) {
      throw new SyntaxError('Unexpected end of input.');
    }
    return this._string[this._index++];
  }

  get string() {
    return this._string;
  }
}

class Node {
  constructor(value, type) {
    if (!Object.values(Node.TYPES).includes(type)) {
      throw new TypeError(`Expected a Node type, received ${ type } instead.`);
    }
    this._value = value;
    this._type = type;
  }

  static TYPES = {
    number: 1,
    operation: 2,
    keyword: 3
  };

  get value() {
    return this._value;
  }

  get type() {
    return this._type;
  }
}

export class NumberNode extends Node {
  constructor(value) {
    super(parseFloat(value), Node.TYPES.number);
  }
}

export class OperationNode extends Node {
  constructor(value, operands) {
    super(value, Node.TYPES.operation);
    this._operands = operands;
  }

  get operands() {
    return this._operands;
  }
}

export class KeywordNode extends Node {
  constructor(value) {
    super(value, Node.TYPES.keyword);
  }
}
