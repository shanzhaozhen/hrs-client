import React from 'react';
import { Button, Cell, Collapse, DateSelect, Input } from "zarm";
import { Form } from 'antd';
import ZaSelect from "@/components/CustomZarm/ZaSelect";
import {PlusOutlined} from "@ant-design/icons";
import {useOptions} from "@/utils/options";
import {customFormListHelp, requiredTitle} from "@/utils/zarm";

interface FamilyListProps {
  formErrors?: any;
}

const FamilyList: React.FC<FamilyListProps> = (props) => {
  const { formErrors } = props;

  const relationOptions = useOptions('Relation');
  const politicsOptions = useOptions('Politics');

  return (
    <>
      <Form.List name="familyList">
        {
          (fields, { add, remove }) => (
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
                      <Cell title={requiredTitle('姓名')} help={customFormListHelp(formErrors, 'familyList', index, 'name')}>
                        <Form.Item name={[field.name, 'name']}  isListField={true} noStyle>
                          <Input clearable type="text" placeholder="请输入姓名" />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('关系')} help={customFormListHelp(formErrors, 'familyList', index, 'relation')}>
                        <Form.Item name={[field.name, 'relation']} isListField={true} noStyle>
                          <ZaSelect dataSource={relationOptions} placeholder="请选择关系"/>
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('出生日期')} help={customFormListHelp(formErrors, 'familyList', index, 'name')}>
                        <Form.Item name={[field.name, 'birthday']} isListField={true} trigger="onOk" noStyle>
                          <DateSelect
                            title="请选择出生日期"
                            placeholder="请选择出生日期"
                            format="yyyy年MM月dd日"
                            mode="date"
                            min="1900-01-01"
                            max="2027-05-15"
                            hasArrow={false}
                          />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('政治面貌')} help={customFormListHelp(formErrors, 'familyList', index, 'politics')}>
                        <Form.Item name={[field.name, 'politics']} isListField={true} noStyle>
                          <ZaSelect dataSource={politicsOptions} placeholder="请选择政治面貌"/>
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('工作单位')} help={customFormListHelp(formErrors, 'familyList', index, 'workUnit')}>
                        <Form.Item name={[field.name, 'workUnit']}  isListField={true} noStyle>
                          <Input clearable type="text" placeholder="请输入工作单位" />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('职务')} help={customFormListHelp(formErrors, 'familyList', index, 'duty')}>
                        <Form.Item name={[field.name, 'duty']}  isListField={true} noStyle>
                          <Input clearable type="text" placeholder="请输入职务" />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('移动电话')} help={customFormListHelp(formErrors, 'familyList', index, 'mobilePhone')}>
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
                <button type="button" className="ant-btn ant-btn-dashed ant-btn-block" onClick={() => add()}>
                  <PlusOutlined />
                  <span>添加一项数据</span>
                </button>
              </div>
            </>
          )
        }
      </Form.List>
    </>
  );
};

export default FamilyList;
