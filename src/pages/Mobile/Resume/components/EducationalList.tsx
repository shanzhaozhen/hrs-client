import React from 'react';
import {Button, Cell, Collapse, DateSelect, Input, Switch} from "zarm";
import { Form } from 'antd';
import ZaSelect from "@/components/CustomZarm/ZaSelect";
import {PlusOutlined} from "@ant-design/icons";
import {useOptions} from "@/utils/options";
import {customFormListHelp, requiredTitle} from "@/utils/zarm";

interface EducationalListProps {
  formErrors?: any;
}

const EducationalList: React.FC<EducationalListProps> = (props) => {
  const { formErrors } = props;

  const educationOptions = useOptions('Education');

  return (
    <>
      <Form.List name="educationalExperienceList">
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
                      <Cell title={requiredTitle('学校')} help={customFormListHelp(formErrors, 'educationalExperienceList', index, 'politics')}>
                        <Form.Item name={[field.name, 'schoolName']}  isListField={true} noStyle>
                          <Input clearable type="text" placeholder="请输入学校" />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('开始时间')} help={customFormListHelp(formErrors, 'educationalExperienceList', index, 'politics')}>
                        <Form.Item name={[field.name, 'startDate']} isListField={true} trigger="onOk" noStyle>
                          <DateSelect
                            title="请选择开始时间"
                            placeholder="请选择开始时间"
                            format="yyyy年MM月dd日"
                            mode="date"
                            min="1900-01-01"
                            max="2027-05-15"
                            hasArrow={false}
                          />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('结束时间')} help={customFormListHelp(formErrors, 'educationalExperienceList', index, 'endDate')}>
                        <Form.Item name={[field.name, 'endDate']} isListField={true} trigger="onOk" noStyle>
                          <DateSelect
                            title="请选择结束时间"
                            placeholder="请选择结束时间"
                            format="yyyy年MM月dd日"
                            mode="date"
                            min="1900-01-01"
                            max="2027-05-15"
                            hasArrow={false}
                          />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('学历')} help={customFormListHelp(formErrors, 'educationalExperienceList', index, 'education')}>
                        <Form.Item name={[field.name, 'education']} isListField={true} noStyle>
                          <ZaSelect dataSource={educationOptions} placeholder="请选择学历"/>
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('专业')} help={customFormListHelp(formErrors, 'educationalExperienceList', index, 'major')}>
                        <Form.Item name={[field.name, 'major']}  isListField={true} noStyle>
                          <Input clearable type="text" placeholder="请输入专业" />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('学制')} help={customFormListHelp(formErrors, 'educationalExperienceList', index, 'studyYears')}>
                        <Form.Item name={[field.name, 'studyYears']}  isListField={true} noStyle>
                          <Input clearable type="number" placeholder="请输入学制" />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('是否全日制')} help={customFormListHelp(formErrors, 'educationalExperienceList', index, 'fullTime')}>
                        <Form.Item name={[field.name, 'fullTime']}  isListField={true} noStyle>
                          <Switch />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('证明人姓名')} help={customFormListHelp(formErrors, 'educationalExperienceList', index, 'witnessName')}>
                        <Form.Item name={[field.name, 'witnessName']}  isListField={true} noStyle>
                          <Input clearable type="text" placeholder="请输入证明人姓名" />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('证明人电话')} help={customFormListHelp(formErrors, 'educationalExperienceList', index, 'witnessPhone')}>
                        <Form.Item name={[field.name, 'witnessPhone']}  isListField={true} noStyle>
                          <Input clearable type="number" placeholder="请输入证明人电话" />
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

export default EducationalList;
