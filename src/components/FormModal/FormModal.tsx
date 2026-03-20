import React, { useEffect } from "react";
import { Modal, DatePicker, Form, Input } from "antd";
import type { DataType, FieldType } from "@/types";

interface FormModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: DataType) => void;
  initialValues?: Partial<FieldType>;
  title: string;
  trigger?: React.ReactNode;
}

const FormModal = ({ open, onCancel, trigger, onSubmit, initialValues, title }: FormModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) return;
    if (initialValues && Object.keys(initialValues).length > 0) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [open, initialValues]);
  return (
    <>
      {trigger}
      <Modal
        open={open}
        title={title}
        okText="Подтвердить"
        cancelText="Отмена"
        onCancel={() => {
          form.resetFields();
          onCancel();
        }}
        onOk={() => form.submit()}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            name="name"
            label="Имя"
            rules={[
              { required: true, message: "Введите имя" },
              { max: 64, message: "Максимум 64 символа" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="date" label="Дата" rules={[{ required: true, message: "Введите дату" }]}>
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="value"
            label="Значение"
            rules={[
              { required: true, message: "Введите значение" },
              { max: 16, message: "Максимум 16 символа" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FormModal;
