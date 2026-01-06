import React from 'react';
import NavHeader from '@/components/custom/sidebar/nav-header';
import NavMain from '@/components/custom/sidebar/nav-main';
import NavUser from '@/components/custom/sidebar/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from '@/components/ui/sidebar';
import { links } from '@/links';
import { useAuthStore } from '@/store';

const AppSideBar: React.FC<React.ComponentProps<typeof Sidebar>> = ({
  ...props
}) => {
  const name = useAuthStore(state => state.user!.name);
  const email = useAuthStore(state => state.user!.email);
  const avatar = useAuthStore(state => state.user!.avatar);
  const logout = useAuthStore(state => state.logout);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={links} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name,
            avatar,
            email
          }}
          onLogout={logout}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
