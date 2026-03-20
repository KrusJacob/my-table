import { create } from "zustand";
import type { DataType } from "../components/Table/Table";
import dayjs from "dayjs";

const InitialData: DataType[] = [
  {
    key: "1",
    name: "Office rent payment",
    date: dayjs("2023-05-03"),
    value: 1000,
  },
  {
    key: "2",
    name: "New equipment purchase",
    date: dayjs("2024-02-01"),
    value: 2000,
  },
  {
    key: "3",
    name: "Team coffee and snacks",
    date: dayjs("2025-01-05"),
    value: 500,
  },
  {
    key: "4",
    name: "New project development",
    date: dayjs("2025-05-01"),
    value: 3000,
  },
];
type State = {
  data: DataType[];
  temp: string;
};

type Actions = {
  createData: (newdata: DataType) => void;
  deleteData: (id: string) => void;
  updateData: (id: string, data: DataType) => void;
  changeTemp: (temp: string) => void;
};

export const useTableStore = create<State & Actions>((set) => ({
  data: InitialData,
  temp: "",
  changeTemp: (temp) => set(() => ({ temp })),
  createData: (data) => set((state) => ({ data: [...state.data, data] })),
  deleteData: (id) => set((state) => ({ data: state.data.filter((item) => item.key !== id) })),
  updateData: (id, data) => set((state) => ({ data: state.data.map((item) => (item.key === id ? data : item)) })),
}));
