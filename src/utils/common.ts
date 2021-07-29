import type { SortOrder } from 'antd/lib/table/interface';
import type { Orders, PageParams } from '@/services/common/typings';
import proxy from '../../config/proxy';

export const copyObject = (A: any, B: any) => {
  const res = {};

  Object.keys(A).forEach((key) => {
    res[key] = B[key];
  });

  return res;
};

/**
 * 生成后端需要的分页查询格式
 * @param params
 */
export const getPageParams = (params: any): PageParams => {
  return {
    ...params,
    size: params.pageSize,
  };
};

/**
 * 生成后端需要的查询排序格式
 * @param sorter
 */
export const getSortOrder = (sorter: Record<string, SortOrder>): Orders | undefined | null => {
  if (sorter) {
    const orders: Orders = {
      asc: [],
      desc: [],
    };
    Object.keys(sorter).forEach((item) => {
      if (sorter[item] === 'ascend') {
        orders.asc.push(item);
      } else {
        orders.desc.push(item);
      }
    });

    return orders;
  }

  return null;
};

/**
 * 翻译字段
 * @param key
 * @param options
 * @param defaultText
 * @param keyField
 * @param labelField
 */
export const tableFilter = (
  key: number | undefined,
  options: any[],
  defaultText = '',
  keyField = 'id',
  labelField = 'name',
) => {
  if (key && options) {
    for (let i = 0; i < options.length; i += 1) {
      if (key === options[i][keyField]) {
        return options[i][labelField];
      }
    }
  }
  return defaultText;
};

export const checkHasKey = (obj: any, keys: (string | number)[]): boolean => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    if (obj.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
};

export const targetUrl = REACT_APP_ENV ? proxy[REACT_APP_ENV]['/hrs-api/'].target : '';
export const targetUrlNotDiagonal = targetUrl.substr(0, targetUrl.length - 1);
