import * as monaco from 'monaco-editor';
import '../../util/monaco/userWorker';

monaco.editor.createWebWorker({ moduleId: '' });
monaco.editor.setTheme('vs-dark');
monaco.languages.register({ id: 'javascript' });
