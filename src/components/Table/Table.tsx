import { useMemo, useState } from "react";
import { Table as AntdTable, Button, Flex, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import type { TableProps } from "antd";
import type { FieldType } from "@/types";
import { useFilter } from "@/hooks/useFilter";
import { useTableStore } from "@/store/table";
import { formatDate } from "@/utils/formatDate";
import Search from "../Search/Search";
import FormModal from "../FormModal/FormModal";

export interface DataType {
  key: string;
  name: string;
  date: Dayjs;
  value: number;
}

const Table = () => {
  const [open, setOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const data = useTableStore((state) => state.data);
  const createData = useTableStore((state) => state.createData);
  const updateData = useTableStore((state) => state.updateData);
  const filteredData = useFilter(data);

  const columns = useMemo<TableProps<DataType>["columns"]>(
    () => [
      {
        title: "Имя",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: "Дата",
        dataIndex: "date",
        key: "date",
        render: formatDate,
        sorter: (a, b) => a.date.valueOf() - b.date.valueOf(),
        width: "20%",
      },
      {
        title: "Значение",
        dataIndex: "value",
        key: "value",
        sorter: (a, b) => a.value - b.value,
        width: "15%",
      },
      {
        title: "Действия",
        key: "action",
        width: "10%",
        render: (_, record) => (
          <Space size="medium" className="text-xl">
            <EditOutlined
              className="text-blue-600! cursor-pointer"
              onClick={() => {
                setEditingRecord(record);
                setOpen(true);
              }}
            />
            <Popconfirm
              title="Удалить запись?"
              okText="Да"
              cancelText="Нет"
              onConfirm={() => useTableStore.getState().deleteData(record.key)}
            >
              <DeleteOutlined className="text-red-600!" />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    []
  );
  const handleCreate = (values: FieldType) => {
    createData({
      ...values,
      name: values.name.trim(),
      key: Date.now().toString(),
    });
    setOpen(false);
  };

  const handleEdit = (values: FieldType) => {
    if (!editingRecord) return;
    updateData(editingRecord.key, { ...editingRecord, ...values });
    setOpen(false);
    setEditingRecord(null);
  };

  return (
    <div className="max-w-225 mt-4 mx-auto border border-gray-200 bg-blue-200 rounded-md overflow-hidden">
      <Flex wrap justify="space-between" gap="small" className=" p-2!">
        <Search />
        <FormModal
          open={open}
          initialValues={editingRecord || {}}
          trigger={
            <Button icon={<PlusOutlined />} type="default" onClick={() => setOpen(true)}>
              Добавить
            </Button>
          }
          onCancel={() => {
            setOpen(false);
            setEditingRecord(null);
          }}
          onSubmit={editingRecord ? handleEdit : handleCreate}
          title={editingRecord ? "Редактировать" : "Добавить"}
        />
      </Flex>

      <AntdTable
        bordered
        size="middle"
        pagination={{ placement: ["bottomCenter"] }}
        dataSource={filteredData}
        columns={columns}
      />
    </div>
  );
};

export default Table;
