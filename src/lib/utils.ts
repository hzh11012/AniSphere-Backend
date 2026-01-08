import type { NavItem } from '@/links';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 懒加载组件
 */
export const createLazyComponent = (
  importFn: () => Promise<{ default: React.ComponentType }>
) => {
  return async () => ({
    Component: (await importFn()).default
  });
};

/**
 * 根据路径获取标题
 * @param items 菜单数据
 * @param path 当前路径
 */
export const getTitleByPath = (items: NavItem[], path: string) => {
  const search = (items: NavItem[], basePath: string): string => {
    for (const item of items) {
      if (item.url) {
        // 拼接当前项的完整路径，并处理多余的斜杠
        const currentPath = `${basePath}${item.url}`.replace(/\/+/g, '/');
        // 匹配成功则返回标题
        if (currentPath === path) {
          return item.title;
        }
      }

      // 递归搜索子项，传入新的基础路径（当前路径末尾添加斜杠）
      if (item.items) {
        const nextBasePath = item.url
          ? `${basePath}${item.url}/`.replace(/\/+/g, '/')
          : basePath;
        const result = search(item.items, `${nextBasePath}/`);
        if (result) {
          return result;
        }
      }
    }
    return '';
  };
  return search(items, '');
};
