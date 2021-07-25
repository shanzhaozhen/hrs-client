import { useEffect, useState } from 'react';
import { getDictionaryChildrenByCode } from '@/services/dictionary/dictionary';

export const useOptions = (
  type: string,
  labelFieldName = 'name',
  valueFieldName = 'name',
  labelRender?: (item: any) => string,
  valueRender?: (item: any) => string,
) => {
  const [options, setOptions] = useState<any[]>([]);
  useEffect(() => {
    getDictionaryChildrenByCode(type).then(({ data }) => {
      setOptions(
        data
          ? data.map((item) => ({
              label: labelRender ? labelRender(item) : item[labelFieldName],
              value: valueRender ? valueRender(item) : item[valueFieldName],
            }))
          : [],
      );
    });
  }, [labelFieldName, labelRender, type, valueFieldName, valueRender]);
  return options;
};

export const monthOptions = [
  { label: '1月', value: '1' },
  { label: '2月', value: '2' },
  { label: '3月', value: '3' },
  { label: '4月', value: '4' },
  { label: '5月', value: '5' },
  { label: '6月', value: '6' },
  { label: '7月', value: '7' },
  { label: '8月', value: '8' },
  { label: '9月', value: '9' },
  { label: '10月', value: '10' },
  { label: '11月', value: '11' },
  { label: '12月', value: '12' },
];
