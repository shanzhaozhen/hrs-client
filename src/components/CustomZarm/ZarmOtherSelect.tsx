import React, {useState} from 'react';
import ZarmSelect from "@/components/CustomZarm/ZarmSelect";
import {Cell, Input} from "zarm";
import type {DataSource} from "zarm/types/picker-view/PropsType";


interface ZarmOtherSelectProps {
  title?: string;
  dataSource?: DataSource;

}

const ZarmOtherSelect: React.FC<ZarmOtherSelectProps> = (props) => {
  const { title, dataSource } = props;

  const [ showInput, setShowInput ] = useState<boolean>(false);

  return (
    <>
      <Cell title={title}>
        <ZarmSelect
          dataSource={dataSource}
        />
      </Cell>
      {
        showInput ? (
          <Cell title=" ">
            <Input placeholder={`请输入${title}`} />
          </Cell>
        ) : null
      }
    </>
  );
};


export default ZarmOtherSelect;
