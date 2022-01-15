export interface ColorsDTO {
  primary: string;
  accent: string;
  highlight: string;
  background: string;
  surface: string;
  toolbar: string;
  backdrop: string;
  text: string;
  placeholder: string;
  statusBar: 'dark' | 'light';
}

export type ThemeName = 'dark' | 'light';
