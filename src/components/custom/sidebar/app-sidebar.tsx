import React from 'react';
import NavHeader from '@/components/custom/sidebar/nav-header';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from '@/components/ui/sidebar';

const AppSideBar: React.FC<React.ComponentProps<typeof Sidebar>> = ({
  ...props
}) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>1</SidebarContent>
      <SidebarFooter>2</SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
