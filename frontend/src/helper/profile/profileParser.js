import { SimpleLexicalAnalyzer } from './SimpleLexicalAnalyzer';
import SimpleSyntaxAnalyzer from './SimpleSyntaxAnalyzer';

const profileParser = code => {
  if (!code) {
    return { tokens: [], tree: null };
  }
  const tokens = new SimpleLexicalAnalyzer(code).analyze().tokens;
  const tree = new SimpleSyntaxAnalyzer(tokens).analyze().tree;
  return { tokens, tree };
};

export default profileParser;
