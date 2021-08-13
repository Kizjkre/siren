import { SimpleLexicalAnalyzer } from './SimpleLexicalAnalyzer';
import SimpleSyntaxAnalyzer from './SimpleSyntaxAnalyzer';

const profileParser = code => {
  if (!code) {
    return { tokens: [] };
  }
  const tokens = new SimpleLexicalAnalyzer(code).analyze().tokens;
  new SimpleSyntaxAnalyzer(tokens).analyze();
  return { tokens };
};

export default profileParser;
