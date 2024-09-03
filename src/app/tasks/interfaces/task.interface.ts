import { IconName } from '@shared/interfaces/icons.interface';

export interface TaskListMetadata {
  id: string;
  icon?: IconName;
  name: string;
}

export interface TaskList extends TaskListMetadata {
  tasks: Task[];
}

export interface Task {
  id: string;
  isComplete: boolean;
  title: string;
  comments: Comment[];
  links: Link[];
  tags: Tag[];
  lastUpdate: Date;
}

export interface Comment {
  id: string;
  text: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Link {
  id: string;
  name: string;
  link: string;
}
