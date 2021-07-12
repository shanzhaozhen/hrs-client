import React, {useEffect, useState} from 'react';
import type {MutableRefObject} from 'react';
import type { FormInstance } from 'antd';
import {Button, Col, Input, Row} from 'antd';
import { ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProFormItem from "@ant-design/pro-form/lib/components/FormItem";
import {ContactsOutlined} from "@ant-design/icons";
import {useDepartmentList} from "@/utils/department";
import StaffSelect from "@/components/StaffSelect";
import type {OptionType} from "@/services/common/typings";
import {getPerformanceSettingList} from "@/services/performance-setting/performance-setting";

interface FormProps {
  isView?: boolean;
  isEdit?: boolean;
  salaryStaffId?: number;
  formRef?: MutableRefObject<FormInstance | any>;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { salaryStaffId, isView, formRef } = props;

  const [staffSelectVisible, setStaffSelectVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();

  const [performanceSettingOptions, setPerformanceSettingOptions] = useState<OptionType[]>([]);
  useEffect(() => {
    getPerformanceSettingList()
      .then(({ data }) => {
        setPerformanceSettingOptions((data || []).map(item => ({ value: item.name || '', label: item.name || '' })));
      })
      .catch(() => {
        setPerformanceSettingOptions([]);
      });
  }, []);

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="绩效评价id" hidden={true} />
        <ProFormText name="staffId" label="员工id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          {salaryStaffId ? (
            <ProFormText
              width="md"
              name="staffCode"
              label="员工编号"
              placeholder="员工编号"
              required={true}
              readonly={isView}
              disabled
            />
          ) : (
            <ProFormItem label="员工编号" required={true}>
              <Input.Group compact>
                <ProFormItem
                  name="staffCode"
                  rules={[{ required: true, message: '请选择员工' }]}
                >
                  <Input
                    placeholder="请选择员工"
                    name="staffCode"
                    disabled
                  />
                </ProFormItem>
                <Button
                  type="primary"
                  icon={<ContactsOutlined />}
                  onClick={() => setStaffSelectVisible(true)}
                >
                  选择员工
                </Button>
              </Input.Group>
            </ProFormItem>
          )}
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="staffName"
            label="员工姓名"
            required={true}
            placeholder="员工姓名"
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="depId"
            label="部门"
            required={true}
            options={departmentList.map(item => ({value: item.name || '', label: item.name}))}
            readonly={isView}
            disabled
          />
        </Col>
        { !isView && (
          <Col xl={12} lg={12} md={24}>
            <ProFormSelect
              width="md"
              name="performanceSetting"
              label="考核季度选择"
              options={performanceSettingOptions}
              readonly={isView}
            />
          </Col>
        ) }
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="year"
            label="考核年度"
            rules={[{ required: true, message: '请输入考核年度' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="quarter"
            label="考核季度"
            rules={[{ required: true, message: '请输入考核季度' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="appraise"
            label="考核等级"
            rules={[{ required: true, message: '请选择考核等级' }]}
            options={[
              {value: 'A', label: 'A'},
              {value: 'B', label: 'B'},
              {value: 'C', label: 'C'},
              {value: 'D', label: 'D'},
              {value: 'E', label: 'E'},
            ]}
            readonly={isView}
          />
        </Col>
        <Col xl={24} lg={24} md={24}>
          <ProFormTextArea
            name="remarks"
            label="备注"
            readonly={isView}
          />
        </Col>
      </Row>


      <StaffSelect
        staffSelectVisible={staffSelectVisible}
        handleStaffSelectVisible={setStaffSelectVisible}
        onSelectAction={(selectValue) => {
          const currentFormValue = formRef?.current.getFieldsValue();
          formRef?.current.setFieldsValue({
            ...currentFormValue,
            staffId: selectValue.id,
            staffCode: selectValue.staffCode,
            staffName: selectValue.staffName,
            depId: selectValue.depId,
          })
          setStaffSelectVisible(false);
        }}
      />
    </>
  );
};

export default FormBody;
