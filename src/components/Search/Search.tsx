import { useEffect, useState } from "react";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "@/hooks/useDebounce";
import { useTableStore } from "@/store/table";

const Search = () => {
  const [value, setValue] = useState("");

  const changeTemp = useTableStore((state) => state.changeTemp);
  const debouncedTemp = useDebounce(value);

  useEffect(() => {
    changeTemp(debouncedTemp);
  }, [debouncedTemp]);

  return (
    <Space.Compact size="large" className="w-full max-w-120">
      <Space.Addon className="bg-white!">
        <SearchOutlined />
      </Space.Addon>
      <Input size="middle" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Поиск..." />
    </Space.Compact>
  );
};

export default Search;
