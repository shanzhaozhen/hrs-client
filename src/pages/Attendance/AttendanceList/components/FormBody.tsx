import React, { useState } from 'react';
import type {MutableRefObject} from 'react';
import type { FormInstance } from 'antd';
import {Button, Col, Input, Row} from 'antd';
import {ProFormDatePicker, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea} from '@ant-design/pro-form';
import ProFormItem from "@ant-design/pro-form/lib/components/FormItem";
import {ContactsOutlined} from "@ant-design/icons";
import {useDepartmentList} from "@/utils/department";
import StaffSelect from "@/components/StaffSelect";

interface FormProps {
  isView?: boolean;
  isEdit?: boolean;
  formRef?: MutableRefObject<FormInstance | any>;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { isView, formRef } = props;

  const [staffSelectVisible, handleStaffSelectVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="考勤数据id" hidden={true} />
        <ProFormText name="staffId" label="员工id" hidden={true} />
        <Col xl={8} lg={12} md={24}>
          {isView ? (
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
                  style={{ width: '218px' }}
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
                  onClick={() => handleStaffSelectVisible(true)}
                >
                  选择员工
                </Button>
              </Input.Group>
            </ProFormItem>
          )}
        </Col>
        <Col xl={8} lg={12} md={24}>
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
        <Col xl={8} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="depId"
            label="部门"
            required={true}
            options={departmentList.map(item => ({value: item.id || '', label: item.name}))}
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDatePicker.Month
            width="md"
            name="month"
            label="考勤月份"
            rules={[{ required: true, message: '请选择考勤月份' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="shouldAttendanceDays"
            label="应出勤天数"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={[{ required: true, message: '请输入应出勤天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="actualAttendanceDays"
            label="实出勤天数"
            min={0}
            rules={[{ required: true, message: '请输入实出勤天数' }]}
            readonly={isView}
          />
        </Col>


        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="absenteeismDays"
            label="旷工天数"
            min={0}
            rules={[{ required: true, message: '请输入旷工天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="travelDays"
            label="出差天数"
            min={0}
            rules={[{ required: true, message: '请输入出差天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="outDays"
            label="外出天数"
            min={0}
            rules={[{ required: true, message: '请输入外出天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="lateTimes"
            label="迟到次数"
            min={0}
            rules={[{ required: true, message: '请输入迟到次数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="lateMinutes"
            label="迟到分钟数"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={[{ required: true, message: '请输入迟到分钟数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="leaveEarlyTimes"
            label="早退次数"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={[{ required: true, message: '请输入早退次数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="leaveEarlyMinutes"
            label="早退分钟数"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={[{ required: true, message: '请输入早退分钟数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="cardMissTimes"
            label="缺卡次数"
            fieldProps={{ precision: 0 }}
            min={0}
            rules={[{ required: true, message: '请输入缺卡次数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="signCardTimes"
            label="签卡次数"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={[{ required: true, message: '请输入签卡次数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="overtimeWeekHours"
            label="平时加班时数"
            min={0}
            rules={[{ required: true, message: '请输入平时加班时数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="overtimeWeekendHours"
            label="周末加班时数"
            min={0}
            rules={[{ required: true, message: '请输入周末加班时数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="overtimeFestivalHours"
            label="节日加班时数"
            min={0}
            rules={[{ required: true, message: '请输入节日加班时数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="annualLeaveDays"
            label="年假天数"
            min={0}
            rules={[{ required: true, message: '请输入年假天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="compensatoryLeaveDays"
            label="调休假天数"
            min={0}
            rules={[{ required: true, message: '请输入调休假天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="familyPlanningLeaveDays"
            label="计生假天数"
            min={0}
            rules={[{ required: true, message: '请输入计生假天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="maternityLeaveDays"
            label="产假天数"
            min={0}
            rules={[{ required: true, message: '请输入产假天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="holidayLeaveDays"
            label="节假日请假天数"
            min={0}
            rules={[{ required: true, message: '请输入节假日请假天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="sickLeaveDays"
            label="病假天数"
            min={0}
            rules={[{ required: true, message: '请输入病假天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="sickLeaveDays"
            label="事假天数"
            min={0}
            rules={[{ required: true, message: '请输入事假天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="exceptionalCaseDays"
            label="特殊情况请假天数"
            min={0}
            rules={[{ required: true, message: '请输入特殊情况请假天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="injuryLeaveDays"
            label="工伤假天数"
            min={0}
            rules={[{ required: true, message: '请输入工伤假天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="marriageLeaveDays"
            label="婚假天数"
            min={0}
            rules={[{ required: true, message: '请输入婚假天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="lactationLeaveDays"
            label="哺乳假天数"
            min={0}
            rules={[{ required: true, message: '请输入哺乳假天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="sickLeaveDays"
            label="独生子女父母陪护假天数"
            min={0}
            rules={[{ required: true, message: '请输入独生子女父母陪护假天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="nursingLeave"
            label="看护假天数"
            min={0}
            rules={[{ required: true, message: '请输入看护假天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="bereavementLeave"
            label="丧假天数"
            min={0}
            rules={[{ required: true, message: '请输入丧假天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="dutyWeek"
            label="值班（工作日）天数"
            min={0}
            rules={[{ required: true, message: '请输入值班（工作日）天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="dutyBeforeWeek"
            label="值班（休息日前一天）天数"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={[{ required: true, message: '请输入值班（休息日前一天）天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="dutyBeforeFestival"
            label="值班（法定节假日前一天）天数"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={[{ required: true, message: '请输入值班（法定节假日前一天）天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="dutyWeekend"
            label="值班（休息日）天数"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={[{ required: true, message: '请输入值班（休息日）天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="dutyFestival"
            label="值班（法定节假日（春节假期除外））天数"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={[{ required: true, message: '请输入值班（法定节假日（春节假期除外））天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="dutyOutSpring"
            label="值班（春节假期（不含除夕、初一、初二））天数"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={[{ required: true, message: '请输入值班（春节假期（不含除夕、初一、初二））天数' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="dutyInSpring"
            label="值班（春节假期（除夕、初一、初二））天数"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={[{ required: true, message: '请输入值班（春节假期（除夕、初一、初二））天数' }]}
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
        handleStaffSelectVisible={handleStaffSelectVisible}
        onSelectAction={(selectValue) => {
          const currentFormValue = formRef?.current.getFieldsValue();
          formRef?.current.setFieldsValue({
            ...currentFormValue,
            staffId: selectValue.id,
            staffCode: selectValue.staffCode,
            staffName: selectValue.staffName,
            depId: selectValue.depId,
          })
          handleStaffSelectVisible(false);
        }}
      />
    </>
  );
};

export default FormBody;
