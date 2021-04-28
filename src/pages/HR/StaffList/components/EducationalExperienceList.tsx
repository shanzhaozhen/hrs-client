import React, {useEffect, useState} from 'react';
import {Col, Row, Tabs} from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { getDictionaryChildrenByCode } from "@/services/dictionary/dictionary";
import RegionSelect from "@/components/RegionSelect";
import type { RegionType } from "@/services/region/typings";
import CustomUpload from "@/components/CustomUpload";
import {getAllDepartments} from "@/services/department/department";
import {EditableProTable} from "@ant-design/pro-table";
import {EducationalExperienceForm} from "@/services/educational-experience/typings";

interface EducationalExperienceListProps {
  values?: any;
}

const EducationalExperienceList: React.FC<EducationalExperienceListProps> = (props) => {
  const { values } = props;

  return (
    <>
          <ProForm.Item
            label="学习经历"
            name="dataSource"
            trigger="onValuesChange"
          >
            <EditableProTable<EducationalExperienceForm>
              rowKey="id"
              toolBarRender={false}
              columns={columns}
              recordCreatorProps={{
                newRecordType: 'dataSource',
                position: 'top',
                record: () => ({
                  id: Date.now(),
                }),
              }}
              editable={{
                type: 'multiple',
                editableKeys,
                onChange: setEditableRowKeys,
                actionRender: (row, _, dom) => {
                  return [dom.delete];
                },
              }}
            />
          </ProForm.Item>
        </Tabs.TabPane>
        <Tabs.TabPane tab="工作履历" key="3">
          工作履历
        </Tabs.TabPane>
        <Tabs.TabPane tab="职称信息" key="4">
          Content of Tab Pane 2
        </Tabs.TabPane>
        <Tabs.TabPane tab="家庭信息" key="5">
          家庭信息
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default FormBody;
