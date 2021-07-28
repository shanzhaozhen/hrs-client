import React, { useState } from 'react';
import type { MutableRefObject } from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Divider, Input, Row } from 'antd';
import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem';
import { ContactsOutlined } from '@ant-design/icons';
import { useDepartmentList } from '@/utils/department';
import StaffSelect from '@/components/StaffSelect';
import { useOptions } from '@/utils/options';

interface FormProps {
  isView?: boolean;
  isEdit?: boolean;
  formRef?: MutableRefObject<FormInstance | any>;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { isView, formRef } = props;

  const [staffSelectVisible, handleStaffSelectVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();
  const postLevelOptions = useOptions(
    'PostLevel',
    'name',
    'code',
    (item) => `${item.name}(${item.code})`,
  );

  return (
    <>
      <Divider orientation="left">薪资发放类别</Divider>
      <ProFormText name="id" label="薪资发放id" hidden={true} />
      <ProFormText name="staffId" label="员工id" hidden={true} />
      <Row gutter={24}>
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
                <ProFormItem name="staffCode" rules={[{ required: true, message: '请选择员工' }]}>
                  <Input placeholder="请选择员工" name="staffCode" disabled />
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
            options={departmentList.map((item) => ({ value: item.id || '', label: item.name }))}
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDatePicker.Month
            width="md"
            name="month"
            label="发放月份"
            rules={[{ required: true, message: '请选择发放月份' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="type"
            label="发薪类型"
            rules={[{ required: true, message: '请选择发薪类型' }]}
            options={[
              { value: '工资', label: '工资' },
              { value: '奖金', label: '奖金' },
            ]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={24} md={24}>
          <ProFormSelect
            width="md"
            name="postLevel"
            label="岗位等级"
            rules={[{ required: true, message: '请选择岗位等级' }]}
            options={postLevelOptions}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="appraise"
            label="考核等级"
            rules={[{ required: true, message: '请选择考核等级' }]}
            options={[
              { value: 'A', label: 'A' },
              { value: 'B', label: 'B' },
              { value: 'C', label: 'C' },
              { value: 'D', label: 'D' },
              { value: 'E', label: 'E' },
            ]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormSwitch
            width="md"
            name="freeze"
            label="是否冻结"
            checkedChildren="是"
            unCheckedChildren="否"
            rules={[{ required: true, message: '请选择是否冻结' }]}
            readonly={isView}
          />
        </Col>
      </Row>
      <Divider orientation="left">工资</Divider>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="basicSalary"
            label="基础工资"
            rules={[{ required: true, message: '请输入基础工资' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="postSalary"
            label="岗位工资"
            rules={[{ required: true, message: '请输入岗位工资' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="meritSalary"
            label="绩效工资"
            rules={[{ required: true, message: '请输入绩效工资' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="sickSalary"
            label="病假工资"
            rules={[{ required: true, message: '请输入病假工资' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="backSalary"
            label="补发工资"
            rules={[{ required: true, message: '请输入补发工资' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="overtimeSalary"
            label="加班工资"
            rules={[{ required: true, message: '请输入加班工资' }]}
            readonly={isView}
          />
        </Col>
      </Row>
      <Divider orientation="left">奖金</Divider>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="annualBonus"
            label="年终奖"
            rules={[{ required: true, message: '请输入年终奖' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="safetyBonus"
            label="安全奖"
            rules={[{ required: true, message: '请输入安全奖' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="stabilityBonus"
            label="综治奖"
            rules={[{ required: true, message: '请输入综治奖' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="familyPlanningBonus"
            label="计生奖"
            rules={[{ required: true, message: '请输入计生奖' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="excellenceBonus"
            label="先进奖"
            rules={[{ required: true, message: '请输入先进奖' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="specialBonus"
            label="专项奖"
            rules={[{ required: true, message: '请输入专项奖' }]}
            readonly={isView}
          />
        </Col>
      </Row>
      <Divider orientation="left">津贴</Divider>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="oneChildAllowance"
            label="独生子女津贴"
            rules={[{ required: true, message: '请输入独生子女津贴' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="hotWeatherAllowance"
            label="高温津贴"
            rules={[{ required: true, message: '请输入高温津贴' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="fullAttendanceAllowance"
            label="全勤津贴"
            rules={[{ required: true, message: '请输入全勤津贴' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="nightShiftAllowance"
            label="夜班津贴"
            rules={[{ required: true, message: '请输入夜班津贴' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="onDutyAllowance"
            label="值班补贴"
            rules={[{ required: true, message: '请输入值班补贴' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="trafficAllowance"
            label="交通补贴"
            rules={[{ required: true, message: '请输入交通补贴' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="festivalAllowance"
            label="节日慰问金"
            rules={[{ required: true, message: '请输入节日慰问金' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="safetyAllowance"
            label="安全岗岗位津贴"
            rules={[{ required: true, message: '请输入安全岗岗位津贴' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="communicationAllowance"
            label="通讯补贴"
            rules={[{ required: true, message: '请输入通讯补贴' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="otherAllowance"
            label="其他补贴"
            rules={[{ required: true, message: '请输入其他补贴' }]}
            readonly={isView}
          />
        </Col>
      </Row>
      <Divider orientation="left">扣除项</Divider>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="sickLeaveDeduct"
            label="扣病假工资"
            rules={[{ required: true, message: '请输入扣病假工资' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="entryExitDeduct"
            label="扣试用期/入离职结算"
            rules={[{ required: true, message: '请输入扣试用期/入离职结算' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="fullAttendanceDeduct"
            label="扣全勤"
            rules={[{ required: true, message: '请输入扣全勤' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="meritDeduct"
            label="扣季度绩效"
            rules={[{ required: true, message: '请输入扣季度绩效' }]}
            readonly={isView}
          />
        </Col>
      </Row>
      <Divider orientation="left">实物</Divider>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="birthdayCard"
            label="生日卡"
            rules={[{ required: true, message: '请输入生日卡' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="coolDrink"
            label="清凉饮料"
            rules={[{ required: true, message: '请输入清凉饮料' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="condolenceGoods"
            label="慰问品"
            rules={[{ required: true, message: '请输入慰问品' }]}
            readonly={isView}
          />
        </Col>
      </Row>
      <Divider orientation="left">税后应扣</Divider>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="accumulationFund"
            label="公积金"
            rules={[{ required: true, message: '请输入公积金' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="endowmentInsurance"
            label="养老保险"
            rules={[{ required: true, message: '请输入养老保险' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="unemploymentInsurance"
            label="失业保险"
            rules={[{ required: true, message: '请输入失业保险' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="medicalInsurance"
            label="医疗保险"
            rules={[{ required: true, message: '请输入医疗保险' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="unionFees"
            label="工会费"
            rules={[{ required: true, message: '请输入工会费' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="rent"
            label="房租"
            rules={[{ required: true, message: '请输入房租' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="phoneBill"
            label="话费"
            rules={[{ required: true, message: '请输入话费' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="individualIncomeTax"
            label="个税"
            rules={[{ required: true, message: '请输入个税' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="otherAftTaxDeduct"
            label="其他税后应扣"
            rules={[{ required: true, message: '请输入其他税后应扣' }]}
            readonly={isView}
          />
        </Col>
      </Row>
      <Divider orientation="left">其他</Divider>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="shouldSalary"
            label="应发工资"
            rules={[{ required: true, message: '请输入应发工资' }]}
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="actualSalary"
            label="实发工资"
            rules={[{ required: true, message: '请输入实发工资' }]}
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={24} lg={24} md={24}>
          <ProFormTextArea name="remarks" label="备注" readonly={isView} />
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
          });
          handleStaffSelectVisible(false);
        }}
      />
    </>
  );
};

export default FormBody;
