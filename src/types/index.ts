import type { Dayjs } from "dayjs";

export interface DataType {
  key: string;
  name: string;
  date: Dayjs;
  value: number;
}

export type FieldType = Omit<DataType, "key">;
