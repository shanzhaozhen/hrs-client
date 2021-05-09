import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import FormBody from '@/pages/Recruit/ResumeList/components/FormBody';
import { DrawerForm } from '@ant-design/pro-form';
import type {ResumeForm, ResumeVO} from "@/services/resume/typings";

interface ViewFormProps {
  viewDrawerVisible: boolean;
  handleViewDrawerVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  values?: ResumeVO | ResumeForm;
}

const ViewForm: React.FC<ViewFormProps> = (props) => {
  const { viewDrawerVisible, handleViewDrawerVisible, onCancel, values } = props

  return (
    <>
      <DrawerForm
        width={'75%'}
        title="查看简历"
        visible={viewDrawerVisible}
        onVisibleChange={handleViewDrawerVisible}
        initialValues={values}
        drawerProps={{
          onClose: onCancel,
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
          <FormBody isView={true} values={values} />
        ) : null}
      </DrawerForm>

    </>
  );
};

export default ViewForm;
