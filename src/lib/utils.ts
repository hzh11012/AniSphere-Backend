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

/**
 * 格式化日期
 * @param date 时间戳
 */
export const formatDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const seconds = d.getSeconds().toString().padStart(2, '0');

  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
};

/**
 * 格式化文件大小
 * @param size 文件大小（KB）
 */
export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 KB';

  const MB = 1024;
  const GB = MB * 1024;

  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(1);
    return fixed.endsWith('.0') ? Math.floor(num).toString() : fixed;
  };

  if (bytes >= GB) {
    return formatNumber(bytes / GB) + ' GB';
  } else if (bytes >= MB) {
    return formatNumber(bytes / MB) + ' MB';
  } else {
    return formatNumber(bytes) + ' KB';
  }
};
