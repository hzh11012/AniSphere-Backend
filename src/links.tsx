import { Cat, LayoutDashboard, Timer } from 'lucide-react';

const links = [
  {
    title: '首页',
    icon: LayoutDashboard,
    url: '/'
  },
  {
    title: '自动化',
    icon: Cat,
    isActive: true,
    url: '/auto',
    items: [
      {
        title: '任务管理',
        icon: Timer,
        url: '/tasks'
      }
    ]
  }
];

export { links };
