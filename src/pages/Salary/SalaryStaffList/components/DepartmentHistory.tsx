import React, {useEffect, useState} from 'react';
import { Button, Input, Select } from "antd";
import {getAllDepartments} from "@/services/department/department";
import {HistoryOutlined} from "@ant-design/icons";

interface FormProps {
  value?: any
}

const DepartmentHistory: React.FC<FormProps> = (props) => {
  const { value } = props;

  const [departmentOptions, setDepartmentOptions] = useState<any[]>([]);

  useEffect(() => {
    getAllDepartments().then(({ data }) => {
      setDepartmentOptions(data ? data.map(item => ({
        value: item.id,
        label: item.name
      })): []);
    })
  }, []);

  return (
    <>
      <Input.Group compact>
        <Select
          options={departmentOptions}
          style={{ width: '60%' }}
          defaultValue={value}
          disabled
        />
        <Button
          type="primary"
          icon={<HistoryOutlined />}
          style={{ width: '40%' }}
        >
          变更历史
        </Button>
      </Input.Group>
    </>
  );
};

export default DepartmentHistory;
