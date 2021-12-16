import { SimpleLexicalAnalyzer, SLAToken } from '../simple/SimpleLexicalAnalyzer';
import SimpleSyntaxAnalyzer from '../simple/SimpleSyntaxAnalyzer';

const profileParser = code => {
  if (!code) {
    return { tokens: [], tree: null };
  }
  SLAToken.TYPES.keyword = /MAX|MIN|MEAN|MEDIAN|MODE|Q1|Q3|x/;
  SLAToken.TYPES.number = /\d*\.?\d+/;
  const tokens = new SimpleLexicalAnalyzer(code).analyze().tokens;
  const tree = new SimpleSyntaxAnalyzer(tokens).analyze().tree;
  return { tokens, tree };
};

export default profileParser;
