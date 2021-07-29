import React, { useRef } from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { FormInstance } from 'antd';
import { message } from 'antd';
import FormBody from '@/pages/Salary/SalaryList/components/FormBody';
import type { ActionType } from '@ant-design/pro-table';
import { DrawerForm } from '@ant-design/pro-form';
import { onFormValuesChange } from '@/pages/Salary/SalaryList';
import { addSalary } from '@/services/salary/salary';
import type { SalaryForm } from '@/services/salary/typings';

interface CreateFormProps {
  createModalVisible: boolean;
  handleCreateModalVisible: Dispatch<SetStateAction<boolean>>;
  tableActionRef: MutableRefObject<ActionType | undefined>;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, handleCreateModalVisible, tableActionRef } = props;

  const formRef = useRef<FormInstance>();

  /**
   * 添加薪资发放
   * @param fields
   */
  const handleAdd = async (fields: SalaryForm) => {
    const hide = message.loading('正在添加');
    try {
      await addSalary(fields);
      hide();
      message.success('添加成功');
      handleCreateModalVisible(false);
      tableActionRef.current?.reloadAndRest?.();
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
    }
  };

  return (
    <>
      <DrawerForm
        width={'75%'}
        title="新建薪资发放"
        visible={createModalVisible}
        formRef={formRef}
        onVisibleChange={handleCreateModalVisible}
        initialValues={{
          freeze: false,
          basicSalary: 0,
          postSalary: 0,
          meritSalary: 0,
          sickSalary: 0,
          backSalary: 0,
          overtimeSalary: 0,
          salarySubtotal: 0,
          annualBonus: 0,
          safetyBonus: 0,
          stabilityBonus: 0,
          familyPlanningBonus: 0,
          excellenceBonus: 0,
          specialBonus: 0,
          bonusSubtotal: 0,
          oneChildAllowance: 0,
          hotWeatherAllowance: 0,
          fullAttendanceAllowance: 0,
          nightShiftAllowance: 0,
          onDutyAllowance: 0,
          mealAllowance: 0,
          trafficAllowance: 0,
          festivalAllowance: 0,
          safetyAllowance: 0,
          otherAllowance: 0,
          allowanceSubtotal: 0,
          sickLeaveDeduct: 0,
          entryExitDeduct: 0,
          fullAttendanceDeduct: 0,
          meritDeduct: 0,
          preTaxDeductSubtotal: 0,
          birthdayCard: 0,
          coolDrink: 0,
          condolenceGoods: 0,
          materialSubtotal: 0,
          accumulationFund: 0,
          endowmentInsurance: 0,
          unemploymentInsurance: 0,
          medicalInsurance: 0,
          unionFees: 0,
          rent: 0,
          phoneBill: 0,
          individualIncomeTax: 0,
          otherAftTaxDeduct: 0,
          aftTaxDeductSubtotal: 0,
          communicationAllowance: 0,
          shouldSalary: 0,
          preTaxSalary: 0,
          actualSalary: 0,
        }}
        drawerProps={{
          destroyOnClose: true,
        }}
        onValuesChange={(changedValues: any, allValues: any) => {
          onFormValuesChange(changedValues, allValues, formRef);
        }}
        onFinish={handleAdd}
      >
        <FormBody formRef={formRef} />
      </DrawerForm>
    </>
  );
};

export default CreateForm;
