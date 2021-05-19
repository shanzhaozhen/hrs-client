import React from 'react';
import { Button, Cell, Collapse, DateSelect, Input } from "zarm";
import { Form } from 'antd';
import ZaSelect from "@/components/CustomZarm/ZaSelect";

// interface FamilyListProps {
//   value?: RegionType;
//   onChange?: (value: any) => void;
// }

const FamilyList: React.FC = () => {

  return (
    <>
      <Form.List name="familyList">
        {
          (fields, { add, remove }, { errors }) => (
            <>
              {
                fields.map((field, index) => (
                  <Collapse defaultActiveKey={field.name} key={field.name}>
                    <Collapse.Item
                      title={
                        <>
                          <span>第{index + 1}项</span>
                          <Button
                            style={{ float: "right", marginRight: 15 }}
                            size="xs"
                            theme="danger"
                            onClick={(e) => {
                              e.stopPropagation();
                              remove(field.name)
                            }}
                          >
                            删除
                          </Button>
                        </>
                      }
                      key={field.name}
                      animated
                    >
                      <Cell title="姓名">
                        <Form.Item name={[field.name, 'name']}  isListField={true} noStyle>
                          <Input clearable type="text" placeholder="请输入姓名" />
                        </Form.Item>
                      </Cell>
                      <Cell title="关系">
                        <Form.Item name={[field.name, 'relation']} isListField={true} noStyle>
                          <ZaSelect placeholder="请选择关系"/>
                        </Form.Item>
                      </Cell>
                      <Cell title="出生日期">
                        <Form.Item name={[field.name, 'birthday']} isListField={true} trigger="onOk" noStyle>
                          <DateSelect
                            title="请选择出生日期"
                            placeholder="请选择出生日期"
                            format="yyyy年MM月dd日"
                            mode="date"
                            min="1900-01-01"
                            max="2027-05-15"
                            hasArrow={false}
                            disabled
                          />
                        </Form.Item>
                      </Cell>
                      <Cell title="政治面貌">
                        <Form.Item name={[field.name, 'politics']} isListField={true} noStyle>
                          <ZaSelect placeholder="请选择政治面貌"/>
                        </Form.Item>
                      </Cell>
                      <Cell title="结束时间">
                        <Form.Item name={[field.name, 'endDate']} isListField={true} trigger="onOk" noStyle>
                          <DateSelect
                            title="请选择结束时间"
                            placeholder="请选择结束时间"
                            format="yyyy年MM月dd日"
                            mode="date"
                            min="1900-01-01"
                            max="2027-05-15"
                            hasArrow={false}
                            disabled
                          />
                        </Form.Item>
                      </Cell>
                      <Cell title="工作单位">
                        <Form.Item name={[field.name, 'workUnit']}  isListField={true} noStyle>
                          <Input clearable type="text" placeholder="请输入工作单位" />
                        </Form.Item>
                      </Cell>
                      <Cell title="职务">
                        <Form.Item name={[field.name, 'duty']}  isListField={true} noStyle>
                          <Input clearable type="text" placeholder="请输入职务" />
                        </Form.Item>
                      </Cell>
                      <Cell title="移动电话">
                        <Form.Item name={[field.name, 'mobilePhone']}  isListField={true} noStyle>
                          <Input clearable type="number" placeholder="请输入移动电话" />
                        </Form.Item>
                      </Cell>
                      <Cell title="固话">
                        <Form.Item name={[field.name, 'landlinePhone']}  isListField={true} noStyle>
                          <Input clearable type="number" placeholder="请输入固话" />
                        </Form.Item>
                      </Cell>
                    </Collapse.Item>
                  </Collapse>
                ))
              }
              <div style={{ textAlign: "center", padding: "15px 10px" }}>
                <Button block theme="primary" size="sm" onClick={() => add()}>添加一项数据</Button>
              </div>
            </>
          )
        }
      </Form.List>
    </>
  );
};

export default FamilyList;
