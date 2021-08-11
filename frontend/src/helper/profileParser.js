const TOKENS = Object.freeze({
  number: /^\d*.?\d+$/,
  operation: /^[+\-*/^()]$/,
  keyword: /^MAX|MIN|MEAN|MEDIAN|MODE|Q1|Q3|x$/
});

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
    this._code = new SimpleStream(code);
    this._tokens = [];
  }

  _() {

  }

  analyze() {
    let current = '';
    let type = null;
    while (this._code.more()) {
      if (!type && TOKENS.number.test(current + this._code.peek())) {
        type = SLAToken.TYPES.number;
      } else if (!type && TOKENS.operation.test(current + this._code.peek())) {
        type = SLAToken.TYPES.operation;
      } else if (!type && TOKENS.keyword.test(current + this._code.peek())) {
        type = SLAToken.TYPES.keyword;
      } else {
        if (!/^\s*$/.test(current)) {
          this._tokens.push(new SLAToken(type, current));
          current = '';
        }
        type = null;
        continue;
      }

      current += this._code.next();
    }

    if (!/^\s*$/.test(current)) {
      this._tokens.push(new SLAToken(type, current));
    }

    return this;
  }

  get tokens() {
    return this._tokens;
  }
}

class SLAToken {
  constructor(type, value) {
    if (!Object.values(SLAToken.TYPES).includes(type)) {
      throw new TypeError(`Expected a SLAToken type, received ${ type } instead.`);
    }
    this._type = type;
    this._value = value;
  }

  static TYPES = {
    number: 1,
    operation: 2,
    keywords: 3
  };

  get type() {
    return this._type;
  }

  get value() {
    return this._value;
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
