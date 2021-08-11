class SimpleStream {
  constructor(string) {
    this._string = string;
    this._index = 0;
  }

  more() { return this._index + 1 <= this._string.length; }

  peek() { return this._string[this._index]; }

  consume(char) {
    if (this.peek() === char) {
      this._index++;
    } else {
      console.error(`Expected ${ char }, received ${ this.peek() } instead.`);
    }
  }

  next() {
    if (!this.more()) {
      console.error('End of string.');
      return -1;
    }
    return this._string[this._index++];
  }

  get string() {
    return this._string;
  }
}

class SimpleLexicalAnalyzer {
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

    return this;
  }

  get tokens() {
    return this._tokens;
  }
}

class SLAToken {
  constructor(type, value, index = -1) {
    if (!Object.values(SLAToken.TYPES).includes(type)) {
      throw new TypeError(`Expected a SLAToken type, received ${ type } instead.`);
    }
    this._type = type;
    this._value = value;
    this._index = index;
  }

  static TYPES = {
    number: /\d*\.?\d+/,
    operation: /[+\-*/^()]/,
    keyword: /MAX|MIN|MEAN|MEDIAN|MODE|Q1|Q3|x/
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

  set index(value) {
    this._index = value;
  }
}

const profileParser = code => {
  return new SimpleLexicalAnalyzer(code).analyze().tokens;
};

export default profileParser;

window.SLA = SimpleLexicalAnalyzer;

/**
 * Expression CFG:
 *  <Expression> => <Expression> <Operation> <Expression>
 *  <Expression> => (<Expression>)
 *  <Expression> => <Keyword>
 *  <Expression> => <Number>
 *
 *  <Operation>  => +
 *  <Operation>  => -
 *  <Operation>  => *
 *  <Operation>  => /
 *  <Operation>  => ^
 *
 *  <Keyword>    => MAX
 *  <Keyword>    => MIN
 *  <Keyword>    => MEAN
 *  <Keyword>    => MEDIAN
 *  <Keyword>    => MODE
 *  <Keyword>    => Q1
 *  <Keyword>    => Q3
 *  <Keyword>    => x
 *
 *  <Number>     => /d+/
 */
