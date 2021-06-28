import React from 'react';
import type {Dispatch, SetStateAction} from 'react';
import { Button, Collapse } from "zarm";
import { Form } from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {useOptions} from "@/utils/options";
import {customFormListHelp} from "@/utils/zarm";
import ZaCellInput from "@/components/CustomZarm/ZaCellInput";
import {customListValidator} from "@/utils/validate";
import ZaCellSelect from "@/components/CustomZarm/ZaCellSelect";
import ZaCellDataSelect from "@/components/CustomZarm/ZaCellDataSelect";

interface FamilyListProps {
  errors: any;
  setErrors: Dispatch<SetStateAction<any>>;
}

const FamilyList: React.FC<FamilyListProps> = (props) => {
  const { errors, setErrors } = props;

  const relationOptions = useOptions('Relation');
  const politicsOptions = useOptions('Politics');

  const simpleHelp = (index: number, currentField: string) => (customFormListHelp(errors, 'familyList', index, currentField));

  const simpleRules = (index: number, currentField: string) => ([{
    validator: async (_: any, value: any) => customListValidator(setErrors, 'familyList', index, currentField, value, true),
  }]);

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
                      <ZaCellInput
                        name={[field.name, 'name']}
                        title="姓名"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '姓名',
                        }}
                        required={true}
                        help={simpleHelp(index, 'name')}
                        rules={simpleRules(index, 'name')}
                      />
                      <ZaCellSelect
                        name={[field.name, 'relation']}
                        title="关系"
                        required={true}
                        help={simpleHelp(index, 'relation')}
                        rules={simpleRules(index, 'relation')}
                        zaSelectProps={{
                          dataSource: relationOptions,
                          placeholder: '请选择关系'
                        }}
                      />
                      <ZaCellDataSelect
                        name={[field.name, 'birthday']}
                        title='出生日期'
                        zaDateSelectProps={{
                          placeholder: '请选择出生日期',
                          format: 'yyyy年MM月dd日',
                          mode: 'date',
                          min: '1900-01-01',
                          max: '2027-05-15',
                          hasArrow: false
                        }}
                        required={true}
                        trigger="onOk"
                        help={simpleHelp(index, 'birthday')}
                        rules={simpleRules(index, 'birthday')}
                      />
                      <ZaCellSelect
                        name={[field.name, 'politics']}
                        title="政治面貌"
                        required={true}
                        help={simpleHelp(index, 'politics')}
                        rules={simpleRules(index, 'politics')}
                        zaSelectProps={{
                          dataSource: politicsOptions,
                          placeholder: '请选择政治面貌'
                        }}
                      />
                      <ZaCellInput
                        name={[field.name, 'workUnit']}
                        title="工作单位"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入工作单位',
                        }}
                        required={true}
                        help={simpleHelp(index, 'workUnit')}
                        rules={simpleRules(index, 'workUnit')}
                      />
                      <ZaCellInput
                        name={[field.name, 'duty']}
                        title="职务"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入职务',
                        }}
                        required={true}
                        help={simpleHelp(index, 'duty')}
                        rules={simpleRules(index, 'duty')}
                      />
                      <ZaCellInput
                        name={[field.name, 'mobilePhone']}
                        title="移动电话"
                        zaInputProps={{
                          type: 'number',
                          clearable: true,
                          placeholder: '请输入移动电话',
                        }}
                        required={true}
                        help={simpleHelp(index, 'mobilePhone')}
                        rules={simpleRules(index, 'mobilePhone')}
                      />
                      <ZaCellInput
                        name={[field.name, 'landlinePhone']}
                        title="固话"
                        zaInputProps={{
                          type: 'number',
                          clearable: true,
                          placeholder: '请输入固话',
                        }}
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

export default FamilyList;
