declare module "node-webvtt" {
  interface Cue {
    text: string;
    start: number;
    end: number;
  }

  interface ParsedWebVTT {
    cues: Cue[];
  }

  export function parse(input: string): ParsedWebVTT;
}
