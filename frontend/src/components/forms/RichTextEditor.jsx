import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const toolbarActions = [
  { command: "bold", label: "B" },
  { command: "italic", label: "I" },
  { command: "underline", label: "U" },
  { command: "insertOrderedList", label: "OL" },
  { command: "insertUnorderedList", label: "UL" },
  { command: "createLink", label: "Link" },
];

const RichTextEditor = forwardRef(
  (
    {
      value = "",
      onChange = () => {},
      placeholder = "Write rich blog content...",
      className = "",
    },
    ref
  ) => {
    const editorRef = useRef(null);
    const savedRangeRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      if (editorRef.current && editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }, [value]);

    useImperativeHandle(ref, () => ({
      insertMedia: (media) => {
        if (!editorRef.current || !media?.url) return;

        const html =
          media.type === "video"
            ? `<video controls src="${media.url}" class="max-w-full rounded-lg my-4"></video>`
            : `<img src="${media.url}" alt="Blog media" class="max-w-full rounded-lg my-4" />`;

        insertHtmlAtSavedSelection(html);
        editorRef.current.focus();
        handleInput();
      },
    }));

    const saveSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      if (editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
        savedRangeRef.current = range.cloneRange();
      }
    };

    const insertHtmlAtSavedSelection = (html) => {
      if (!editorRef.current) return;

      const selection = window.getSelection();
      let range = savedRangeRef.current;

      if (
        !range ||
        !selection ||
        selection.rangeCount === 0 ||
        !editorRef.current.contains(selection.anchorNode)
      ) {
        editorRef.current.focus();
        range = document.createRange();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
      }

      const fragment = range.createContextualFragment(html);
      range.deleteContents();
      range.insertNode(fragment);
      range.collapse(false);

      selection.removeAllRanges();
      selection.addRange(range);
      savedRangeRef.current = range.cloneRange();
    };

    const handleInput = () => {
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    };

    const handleAction = async (action) => {
      if (!editorRef.current) return;

      if (action === "createLink") {
        const url = window.prompt("Enter link URL", "https://");
        if (!url) {
          return;
        }
        document.execCommand(action, false, url);
      } else {
        document.execCommand(action, false, null);
      }

      editorRef.current.focus();
      saveSelection();
      handleInput();
    };

    return (
      <div className={`rounded-lg border border-slate-200 bg-white ${className}`}>
        <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-2">
          {toolbarActions.map((action) => (
            <button
              key={action.command}
              type="button"
              onClick={() => handleAction(action.command)}
              className="rounded border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-700"
            >
              {action.label}
            </button>
          ))}
        </div>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onFocus={() => {
            setIsFocused(true);
            saveSelection();
          }}
          onBlur={() => setIsFocused(false)}
          onMouseUp={saveSelection}
          onKeyUp={saveSelection}
          onTouchEnd={saveSelection}
          className={`min-h-[200px] p-4 text-sm leading-6 outline-none ${isFocused ? "ring-2 ring-blue-200" : ""}`}
          data-placeholder={placeholder}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
    );
  }
);

export default RichTextEditor;
