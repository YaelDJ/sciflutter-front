import { CKEditor } from "@ckeditor/ckeditor5-react";
import type { EditorConfig } from "@ckeditor/ckeditor5-core";
import myEditor from "ckeditor5-custom-build";
import { EditorProps } from "@/app/_interfaces/components";
import { Editor } from "@/ckeditor5/src/ckeditor";

const setEditorConfig = (
  saveFuncion: (data: string) => Promise<void>,
  setWordsCount: (word: number) => void,
  draftId: string,
  token: string | null
): EditorConfig => {
  return {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "link",
      "|",
      "bulletedList",
      "numberedList",
      "specialCharacters",
      "|",
      "imageUpload",
      "blockQuote",
      "insertTable",
      "|",
      "removeFormat",
      "selectAll",
      "|",
      "undo",
      "redo",
    ],
    simpleUpload: {
      uploadUrl: `http://127.0.0.1:4000/api/v1/articles/upload-img/${draftId}`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    heading: {
      options: [
        {model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph"},
        {
          model: "heading2",
          view: "h2",
          title: "Heading 1",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 2",
          class: "ck-heading_heading3",
        },
      ],
    },
    autosave: {
      save(editor) {
        return saveFuncion((editor as Editor).getData());
      },
      waitingTime: 2000,
    },
    wordCount: {
      onUpdate(data) {
        setWordsCount(data.words);
      },
    },
    image: {
      resizeUnit: '%'
    },
    htmlSupport: {
      allow: [
        {
          name: /.*/,
          attributes: true,
          classes: true,
          styles: true
        },
        {
          name: 'img',
          styles: {
            'aspect-ratio': true,
            'width': true
          }
        }
      ]
    },
  };
};

interface Props extends EditorProps{
  draftId: string,
  token: string | null
}

const AdvanceEditor: React.FC<Props> = ({ handleAutosave, handleSetData, initialData, setWordCount, draftId, token }) => {
  return (
    <CKEditor
      editor={myEditor.Editor}
      config={setEditorConfig(handleAutosave, setWordCount, draftId, token)}
      data={initialData}
      onChange={(event, editor) => {
        const data = editor.getData()
        
        handleSetData(data)
      }}
    />
  )
}

export default AdvanceEditor