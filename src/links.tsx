import {
  Cat,
  LayoutDashboard,
  Sprout,
  Timer,
  type LucideIcon
} from 'lucide-react';

interface NavSubItem {
  title: string;
  icon?: LucideIcon;
  url: string;
}

interface NavItemBase {
  title: string;
  icon?: LucideIcon;
  isActive?: boolean;
}

interface NavItemWithChildren extends NavItemBase {
  items: NavSubItem[];
  url?: string;
}

interface NavItemWithoutChildren extends NavItemBase {
  items?: never;
  url: string;
}

type NavItem = NavItemWithChildren | NavItemWithoutChildren;

const links: NavItem[] = [
  {
    title: '首页',
    icon: LayoutDashboard,
    url: '/'
  },
  {
    title: '自动化',
    icon: Cat,
    isActive: true,
    items: [
      {
        title: '种子查询',
        icon: Sprout,
        url: '/torrents'
      },
      {
        title: '任务列表',
        icon: Timer,
        url: '/tasks'
      }
    ]
  }
];

export { links, type NavItem };
