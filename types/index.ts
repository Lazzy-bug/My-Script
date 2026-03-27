// Shared TypeScript types for MyScript

export type Theme = "light" | "dark" | "read";

export type BlockType =
  | "scene-heading"
  | "action"
  | "character"
  | "dialogue"
  | "image-reference";

export interface ScriptBlock {
  id: string;
  type: BlockType;
  content: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  focus: string;
  github?: string;
  twitter?: string;
  imdb?: string;
  scripts: Script[];
  stats: {
    scripts: number;
    forks: number;
    reads: number;
  };
}

export interface Script {
  id: string;
  title: string;
  logline: string;
  genre: string[];
  coverImage: string;
  author: Omit<User, "scripts" | "stats">;
  forks: number;
  reads: number;
  blocks: ScriptBlock[];
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface EditorState {
  imageCount: number;
  activeBlockType: BlockType;
}
