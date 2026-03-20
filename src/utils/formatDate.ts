import type { Dayjs } from "dayjs";

export const formatDate = (date: Dayjs) => date.format("YYYY-MM-DD");
