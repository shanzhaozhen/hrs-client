/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
import type { CurrentUser } from '@/services/user/typings';

export default function access(initialState: { currentUser?: CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}
