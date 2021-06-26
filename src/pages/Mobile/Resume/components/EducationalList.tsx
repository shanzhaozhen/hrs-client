import React from 'react';
import type {Dispatch, SetStateAction} from 'react';
import { Button, Collapse } from "zarm";
import { Form } from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {useOptions} from "@/utils/options";
import { customFormListHelp } from "@/utils/zarm";
import ZaCellInput from "@/components/CustomZarm/ZaCellInput";
import {customListValidator} from "@/utils/validate";
import ZaCellDataSelect from "@/components/CustomZarm/ZaCellDataSelect";
import ZaCellSelect from "@/components/CustomZarm/ZaCellSelect";
import ZaCellSwitch from "@/components/CustomZarm/ZaCellSwitch";

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
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入工作单位',
                        }}
                        required={true}
                        help={customFormListHelp(errors, 'educationalExperienceList', index, 'schoolName')}
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'educationalExperienceList', index, 'schoolName', value, true),
                        }]}
                      />
                      <ZaCellDataSelect
                        name={[field.name, 'startDate']}
                        title='开始时间'
                        zaDateSelectProps={{
                          placeholder: '请选择开始时间',
                          format: 'yyyy年MM月dd日',
                          mode: 'date',
                          min: '1900-01-01',
                          max: '2027-05-15',
                          hasArrow: false
                        }}
                        required={true}
                        trigger="onOk"
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'educationalExperienceList', index, 'startDate', value, true),
                        }]}
                      />
                      <ZaCellDataSelect
                        name={[field.name, 'endDate']}
                        title="结束时间"
                        zaDateSelectProps={{
                          placeholder: '请选择结束时间',
                          format: 'yyyy年MM月dd日',
                          mode: 'date',
                          min: '1900-01-01',
                          max: '2027-05-15',
                          hasArrow: false
                        }}
                        required={true}
                        trigger="onOk"
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'educationalExperienceList', index, 'endDate', value, true),
                        }]}
                      />
                      <ZaCellSelect
                        name={[field.name, 'education']}
                        title="学历"
                        required={true}
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'educationalExperienceList', index, 'education', value, true),
                        }]}
                        zaSelectProps={{
                          dataSource: educationOptions,
                          placeholder: '请选择学历'
                        }}
                      />
                      <ZaCellInput
                        name={[field.name, 'major']}
                        title="专业"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入专业'
                        }}
                        required={true}
                        help={customFormListHelp(errors, 'educationalExperienceList', index, 'major')}
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'educationalExperienceList', index, 'major', value, true),
                        }]}
                      />
                      <ZaCellInput
                        name={[field.name, 'studyYears']}
                        title="学制"
                        zaInputProps={{
                          type: 'number',
                          clearable: true,
                          placeholder: '请输入学制'
                        }}
                        required={true}
                        help={customFormListHelp(errors, 'educationalExperienceList', index, 'studyYears')}
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'educationalExperienceList', index, 'studyYears', value, true),
                        }]}
                      />
                      <ZaCellSwitch
                        name={[field.name, 'fullTime']}
                        title="是否全日制"
                        required={true}
                        help={customFormListHelp(errors, 'educationalExperienceList', index, 'fullTime')}
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'educationalExperienceList', index, 'fullTime', value, true),
                        }]}
                      />
                      <ZaCellInput
                        name={[field.name, 'witnessName']}
                        title="证明人姓名"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入证明人姓名',
                        }}
                        required={true}
                        help={customFormListHelp(errors, 'educationalExperienceList', index, 'witnessName')}
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'educationalExperienceList', index, 'witnessName', value, true),
                        }]}
                      />
                      <ZaCellInput
                        name={[field.name, 'witnessPhone']}
                        title="证明人电话"
                        zaInputProps={{
                          type: 'number',
                          clearable: true,
                          placeholder: '请输入证明人电话',
                        }}
                        required={true}
                        help={customFormListHelp(errors, 'educationalExperienceList', index, 'witnessPhone')}
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'educationalExperienceList', index, 'witnessPhone', value, true),
                        }]}
                      />
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
