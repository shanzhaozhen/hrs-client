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
