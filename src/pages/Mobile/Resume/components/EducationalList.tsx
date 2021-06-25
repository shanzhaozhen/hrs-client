import React, {Dispatch, SetStateAction, useState} from 'react';
import {Button, Cell, Collapse, Input, Switch} from "zarm";
import { Form } from 'antd';
import ZaSelect from "@/components/CustomZarm/ZaSelect";
import {PlusOutlined} from "@ant-design/icons";
import {useOptions} from "@/utils/options";
import {customFormListHelp, requiredTitle} from "@/utils/zarm";
import ZaCellInput from "@/components/CustomZarm/ZaCellInput";
import {customListValidator} from "@/utils/validate";
import ZaCellDataSelect from "@/components/CustomZarm/ZaCellDataSelect";

interface EducationalListProps {
  errors: any;
  setErrors: Dispatch<SetStateAction<any>>;
}

const EducationalList: React.FC<EducationalListProps> = (props) => {
  const { errors, setErrors } = props;

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
                      <ZaCellInput
                        name={[field.name, 'schoolName']}
                        title="学校"
                        type="text"
                        clearable
                        placeholder="请输入工作单位"
                        required={true}
                        help={customFormListHelp(errors, 'educationalExperienceList', index, 'schoolName')}
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'educationalExperienceList', index, 'schoolName', value, true),
                        }]}
                      />
                      <ZaCellDataSelect
                        name={[field.name, 'startDate']}
                        title="开始时间"
                        placeholder="请选择开始时间"
                        format="yyyy年MM月dd日"
                        mode="date"
                        min="1900-01-01"
                        max="2027-05-15"
                        hasArrow={false}
                        required={true}
                        trigger="onOk"
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'educationalExperienceList', index, 'startDate', value, true),
                        }]}
                      />
                      <ZaCellDataSelect
                        name={[field.name, 'endDate']}
                        title="结束时间"
                        placeholder="请选择结束时间"
                        format="yyyy年MM月dd日"
                        mode="date"
                        min="1900-01-01"
                        max="2027-05-15"
                        hasArrow={false}
                        required={true}
                        trigger="onOk"
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'educationalExperienceList', index, 'endDate', value, true),
                        }]}
                      />
                      <Cell title={requiredTitle('学历')} help={customFormListHelp(errors, 'educationalExperienceList', index, 'education')}>
                        <Form.Item name={[field.name, 'education']} isListField={true} noStyle>
                          <ZaSelect dataSource={educationOptions} placeholder="请选择学历"/>
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('专业')} help={customFormListHelp(errors, 'educationalExperienceList', index, 'major')}>
                        <Form.Item name={[field.name, 'major']}  isListField={true} noStyle>
                          <Input clearable type="text" placeholder="请输入专业" />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('学制')} help={customFormListHelp(errors, 'educationalExperienceList', index, 'studyYears')}>
                        <Form.Item name={[field.name, 'studyYears']}  isListField={true} noStyle>
                          <Input clearable type="number" placeholder="请输入学制" />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('是否全日制')} help={customFormListHelp(errors, 'educationalExperienceList', index, 'fullTime')}>
                        <Form.Item name={[field.name, 'fullTime']}  isListField={true} noStyle>
                          <Switch />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('证明人姓名')} help={customFormListHelp(errors, 'educationalExperienceList', index, 'witnessName')}>
                        <Form.Item name={[field.name, 'witnessName']}  isListField={true} noStyle>
                          <Input clearable type="text" placeholder="请输入证明人姓名" />
                        </Form.Item>
                      </Cell>
                      <Cell title={requiredTitle('证明人电话')} help={customFormListHelp(errors, 'educationalExperienceList', index, 'witnessPhone')}>
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
