import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import FormBody from '@/pages/Performance/PerformanceSettingList/components/FormBody';
import { ModalForm } from '@ant-design/pro-form';
import type {PerformanceSettingForm, PerformanceSettingVO} from "@/services/performance-setting/typings";

interface ViewFormProps {
  viewModalVisible: boolean;
  handleViewModalVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  values?: PerformanceSettingVO | PerformanceSettingForm;
}

const ViewForm: React.FC<ViewFormProps> = (props) => {
  const { viewModalVisible, handleViewModalVisible, values } = props

  return (
    <>
      <ModalForm
        width={748}
        title="查看绩效设置"
        visible={viewModalVisible}
        onVisibleChange={handleViewModalVisible}
        initialValues={values}
        modalProps={{
          destroyOnClose: true,
        }}
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
          submitButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
      >
        {values && Object.keys(values).length ? (
          <FormBody isView={true} />
        ) : null}
      </ModalForm>
    </>
  );
};

export default ViewForm;
