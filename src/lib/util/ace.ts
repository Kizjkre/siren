import ace, { type Ace } from 'ace-builds';
// REF: https://stackoverflow.com/a/24652084
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/ext-spellcheck';

type AceInit = (node: HTMLElement) => Ace.Editor;

ace.config.set('basePath', 'node_modules/ace-builds/src/');
ace.require('ace/ext/language_tools');
ace.require('ace/ext/spellcheck');

const init: AceInit = (node: HTMLElement): Ace.Editor => {
  const editor: Ace.Editor = ace.edit(node);
  editor.session.setMode('ace/mode/javascript');
  editor.setTheme('ace/theme/cloud9_day');
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    fontFamily: 'Jetbrains Mono',
    maxLines: Infinity,
    tabSize: 2,
    useSoftTabs: false,
    useSvgGutterIcons: true
  });
  return editor;
};

export default init;
