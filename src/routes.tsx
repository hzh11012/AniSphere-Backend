import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { createLazyComponent } from '@/lib/utils';
import Exception from '@/components/custom/exception';
import Fallback from '@/components/custom/fallback';
import { useAuthStore } from '@/store';
import Layout from '@/layout';

const WithLayout = ({ children }: { children: React.ReactNode }) => {
  // const role = useAuthStore(state => state.user.role);

  // if (role !== 'admin') {
  //   return <Exception type='ban' />;
  // }
  return <>{children}</>;
};

const staticRoutes: RouteObject[] = [
  {
    path: '/login',
    lazy: createLazyComponent(() => import('@/pages/login/index')),
    hydrateFallbackElement: <Fallback />,
    errorElement: <Exception type='error' />
  },
  {
    path: '/',
    Component: () => (
      <WithLayout>
        <Layout />
      </WithLayout>
    ),
    hydrateFallbackElement: <Fallback />,
    errorElement: <Exception type='error' />,
    children: [
      {
        index: true,
        lazy: createLazyComponent(() => import('@/pages/dashboard/index'))
      }
    ]
  },
  {
    path: '*',
    element: <Exception />
  }
];

const router = createBrowserRouter(staticRoutes);

export default router;
