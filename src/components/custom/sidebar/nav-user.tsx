import React, { memo } from 'react';
import { ChevronsUpDown, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface NavUserProps {
  user: User;
  onLogout: () => void;
}

// 用户信息组件（复用）
interface UserInfoProps {
  user: User;
  showIcon?: boolean;
}

const UserInfo: React.FC<UserInfoProps> = memo(({ user, showIcon }) => (
  <>
    <Avatar className='size-8 rounded-lg'>
      <AvatarImage
        src={user.avatar}
        alt={user.name}
      />
      <AvatarFallback className='rounded-lg'>
        {user.name.slice(0, 1)}
      </AvatarFallback>
    </Avatar>
    <div className='grid flex-1 text-left text-sm leading-tight'>
      <span className='truncate font-medium'>{user.name}</span>
      <span className='truncate text-xs'>{user.email}</span>
    </div>
    {showIcon && <ChevronsUpDown className='ml-auto size-4' />}
  </>
));

const NavUser: React.FC<NavUserProps> = memo(({ user, onLogout }) => {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-accent cursor-pointer'
            >
              <UserInfo
                user={user}
                showIcon
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
            onCloseAutoFocus={e => e.preventDefault()}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <UserInfo user={user} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut />
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
});

export default NavUser;
