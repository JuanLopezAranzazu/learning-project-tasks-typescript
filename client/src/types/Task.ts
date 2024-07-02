export enum Priority {
  LOW = "BAJA",
  MEDIUM = "MEDIA",
  HIGH = "ALTA",
}

export type TaskData = {
  title: string;
  description: string;
  priority: Priority;
};

export type RawTask = {
  _id: string;
} & TaskData;
