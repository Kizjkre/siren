export class SimpleLexicalAnalyzer {
  constructor(code) {
    this._code = code;
    this._tokens = [];
  }

  analyze() {
    let code;
    let offset;
    for (const type of Object.values(SLAToken.TYPES)) {
      code = this._code;
      offset = 0;
      while (code) {
        const token = code.match(type);
        if (!token) {
          break;
        }
        this._tokens.push(new SLAToken(type, token[0], token.index + offset));
        code = code.substr(token.index + token[0].length);
        offset += token.index + token[0].length;
      }
    }

    this._tokens.sort((a, b) => a.index - b.index);

    if (!this._tokens.length) {
      if (this._code) {
        throw new SyntaxError(`Unexpected input ${ this._code } in expression at position 1.`);
      }
    } else {
      if (this._tokens[0].index !== 0 && !/^\s+$/.test(this._code.substring(0, this._tokens[0].index))) {
        throw new SyntaxError(`Unexpected input ${ this._code.substring(0, this._tokens[0].index) } in expression at position 1.`);
      }

      for (let i = 0; i < this._tokens.length; i++) {
        if (
          this._tokens[i].end !== (this._tokens[i + 1]?.index || this._code.length) &&
          !/^\s+$/.test(this._code.substring(this._tokens[i].end, (this._tokens[i + 1]?.index || this._code.length)))
        ) {
          throw new SyntaxError(`Unexpected input ${ this._code.substring(this._tokens[i].end, (this._tokens[i + 1]?.index || this._code.length)) } in expression at position ${ this._tokens[i].end + 1 }.`);
        }
      }
    }

    return this;
  }

  get tokens() {
    return this._tokens;
  }
}

export class SLAToken {
  constructor(type, value, index = -1) {
    if (!Object.values(SLAToken.TYPES).includes(type)) {
      throw new TypeError(`Expected a SLAToken type, received ${ type } instead.`);
    }
    this._type = type;
    this._value = value;
    this._index = index;
    this._end = index + value.length;
  }

  static TYPES = {
    number: /\d*\.?\d+/,
    additive: /[+-]/,
    multiplicative: /[*/]/,
    exponential: /\^/,
    parenthesis: /[()]/,
    keyword: null,
    whitespace: /\s+/
  };

  get type() {
    return this._type;
  }

  get value() {
    return this._value;
  }

  get index() {
    return this._index;
  }

  get end() {
    return this._end;
  }
}
