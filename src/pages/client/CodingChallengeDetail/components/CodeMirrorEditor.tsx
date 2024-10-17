// CodeMirrorEditor.js
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { markdown } from "@codemirror/lang-markdown";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Extension } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import "../styles/codemirror.css";

// Define the type for languages
export type LanguageType =
  | "javascript"
  | "java"
  | "python"
  | "cpp"
  | "markdown";
// Define the languages object
// The object contains the language type as the key and the language extension as the value
const languages: { [key in LanguageType]: () => Extension } = {
  javascript,
  java,
  python,
  cpp,
  markdown,
};
interface CodeMirrorEditorProps {
  language: LanguageType;
  className?: string;
  value: string;
  onChange?: (value: string) => void;
}
const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({
  language,
  className,
  value,
  onChange,
}) => {
  return (
    <CodeMirror
      value={value}
      height="100%"
      className={className}
      theme={vscodeDark}
      extensions={[
        languages[language](),
        autocompletion(),
        keymap.of(completionKeymap),
        EditorView.lineWrapping,
      ]}
      onChange={onChange}
    />
  );
};

export default CodeMirrorEditor;
