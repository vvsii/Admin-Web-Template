import type { ServerResponse, MenuResponse, Pagination } from '.';
import client from './request';

const menuList = (params: Pagination): ServerResponse<MenuResponse[]> =>
  client.get('v1/webMenu', { params: params });
const createMenu = (data: MenuResponse): ServerResponse<void> => client.post('/v1/webMenu', data);
const updateMenu = (data: MenuResponse): ServerResponse<void> => client.patch('/v1/webMenu', data);
const deleteMenu = (id: number): ServerResponse<void> => client.delete(`/v1/webMenu/${id}`);
export { menuList, createMenu, updateMenu, deleteMenu };
