import { Grammar, Parser } from 'nearley';
import calculator from './calculator';

const calculate = expression => {
  const parser = new Parser(Grammar.fromCompiled(calculator));
  parser.feed('' + expression);
  return parser.results[0];
};

export default calculate;
