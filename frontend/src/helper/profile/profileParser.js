import { SimpleLexicalAnalyzer, SLAToken } from './SimpleLexicalAnalyzer';
import SimpleSyntaxAnalyzer from './SimpleSyntaxAnalyzer';

const profileParser = code => {
  if (!code) {
    return { tokens: [], tree: null };
  }
  SLAToken.TYPES.keyword = /MAX|MIN|MEAN|MEDIAN|MODE|Q1|Q3|x/;
  const tokens = new SimpleLexicalAnalyzer(code).analyze().tokens;
  const tree = new SimpleSyntaxAnalyzer(tokens).analyze().tree;
  return { tokens, tree };
};

export default profileParser;
