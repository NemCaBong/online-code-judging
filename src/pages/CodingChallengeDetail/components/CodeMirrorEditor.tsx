// CodeMirrorEditor.js
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { markdown } from "@codemirror/lang-markdown";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Extension } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import "../styles/codemirror.css";

// Define the type for languages
type LanguageType = "javascript" | "java" | "python" | "cpp" | "markdown";
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
}
const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({
  language,
  className,
}) => {
  return (
    <CodeMirror
      value=""
      height="100%"
      className={className}
      theme={vscodeDark}
      extensions={[
        languages[language](),
        autocompletion(),
        keymap.of(completionKeymap),
      ]}
    />
  );
};

export default CodeMirrorEditor;
