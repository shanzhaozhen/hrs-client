import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import FormBody from '@/pages/Performance/PerformanceList/components/FormBody';
import {DrawerForm} from '@ant-design/pro-form';
import type {PerformanceForm, PerformanceVO} from "@/services/performance/typings";

interface ViewFormProps {
  viewDrawerVisible: boolean;
  handleViewDrawerVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  values?: PerformanceVO | PerformanceForm;
}

const ViewForm: React.FC<ViewFormProps> = (props) => {
  const { viewDrawerVisible, handleViewDrawerVisible, onClose, values } = props

  return (
    <>
      <DrawerForm
        width={748}
        title="查看薪资配置"
        visible={viewDrawerVisible}
        onVisibleChange={handleViewDrawerVisible}
        initialValues={values}
        drawerProps={{
          onClose,
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
      </DrawerForm>
    </>
  );
};

export default ViewForm;
