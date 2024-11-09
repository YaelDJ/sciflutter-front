export interface BaseComponent {
  children: React.ReactNode
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?(): void;
  className?: string;
}

export interface EditorProps {
  initialData: string;
  handleSetData: (data: string) => void;
  handleAutosave: (data: string) => Promise<void>;
  setWordCount: (words: number) => void;
}