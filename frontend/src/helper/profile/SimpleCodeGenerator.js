import { KeywordNode, NumberNode, OperationNode } from './SimpleSyntaxAnalyzer';

const KEYWORDS = {
  MIN: -1,
  MAX: -1,
  MEAN: -1,
  MEDIAN: -1,
  MODE: -1,
  Q1: -1,
  Q3: -1,
  x: -1
};

export default class SimpleCodeGenerator {
  constructor(tree = null, keywords = {}) {
    this._tree = tree;
    this._keywords = Object.assign(keywords, KEYWORDS);
  }

  generate(tree = this._tree) {
    if (tree instanceof OperationNode) {
      switch (tree.value) {
        case '+':
          return this.generate(tree.operands[0]) + this.generate(tree.operands[1]);
        case '-':
          return this.generate(tree.operands[0]) - this.generate(tree.operands[1]);
        case '*':
          return this.generate(tree.operands[0]) * this.generate(tree.operands[1]);
        case '/':
          return this.generate(tree.operands[0]) / this.generate(tree.operands[1]);
        case '^':
          return this.generate(tree.operands[0]) ** this.generate(tree.operands[1]);
        default:
          throw new SyntaxError(`Unexpected operation ${ tree.value }.`);
      }
    } else if (tree instanceof NumberNode) {
      return tree.value;
    } else if (tree instanceof KeywordNode) {
      return this._keywords[tree.value];
    } else if (tree === null) {
      return;
    }

    throw new SyntaxError(`SimpleCodeGenerator could not correctly identify token type.`);
  }

  set tree(tree) {
    this._tree = tree;
  }

  set x(x) {
    this._keywords.x = x;
  }
}
