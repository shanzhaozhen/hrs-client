import { request } from 'umi';
import type { MenuForm, MenuVO } from '@/services/menu/typings';

/** 获取所有菜单信息 GET /menu/all */
export async function getAllMenu(options?: Record<string, any>) {
  return request<MenuVO[]>('/hrs-api/menu/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取所有菜单信息（树状结构） GET /menu/tree */
export async function getAllMenuTree(options?: Record<string, any>) {
  return request<MenuVO[]>('/hrs-api/menu/tree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加菜单接口 POST /menu */
export async function addMenu(menuForm: MenuForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/menu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: menuForm,
    ...(options || {}),
  });
}

/** 更新菜单接口 PUT /menu */
export async function updateMenu(menuForm: MenuForm, options?: Record<string, any>) {
  return request<number>('/hrs-api/menu', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: menuForm,
    ...(options || {}),
  });
}

/** 获取菜单信息（通过菜单id） GET /menu/${menuId} */
export async function getMenuByMenuId(menuId: number, options?: Record<string, any>) {
  return request<MenuVO>(`/hrs-api/menu/${menuId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除菜单接口 DELETE /menu/${menuId} */
export async function deleteMenu(menuId: (number | undefined)[], options?: Record<string, any>) {
  return request<number>(`/hrs-api/menu/${menuId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
