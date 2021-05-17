import 'zarm/dist/zarm.css';
import React from 'react';
import { Cell, Collapse, DateSelect, Input } from "zarm";
import type { RegionType } from "@/services/region/typings";
import {Form} from "antd";
import ZaSelect from "@/components/CustomZarm/ZaSelect";

interface WorkItemProps {
  key?: string | number;
  value?: RegionType;
  onChange?: (value: any) => void;
}

const WorkItem: React.FC<WorkItemProps> = () => {


  return (
    <>
      <Collapse.Item key="work1" title="第一项" animated>
        <Cell title="婚姻状况">
          <Form.Item name="maritalStatus" noStyle>
            <ZaSelect placeholder="请选择婚姻状况"/>
          </Form.Item>
        </Cell>
        <Cell title="结婚日期">
          <Form.Item
            name="marriageDate"
            trigger="onOk"
            noStyle
          >
            <DateSelect
              title="请选择结婚日期"
              placeholder="请选择结婚日期"
              format="yyyy年MM月dd日"
              mode="date"
              min="1900-01-01"
              max="2027-05-15"
              hasArrow={false}
              disabled
            />
          </Form.Item>
        </Cell>
        <Cell title="配偶名字">
          <Form.Item name="spouseName" noStyle>
            <Input clearable type="text" placeholder="请输入配偶名字" />
          </Form.Item>
        </Cell>
      </Collapse.Item>
    </>
  );
};


export default WorkItem;
