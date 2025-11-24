import React from 'react';
import { useUserStore } from '@/store/userStore';

interface PermissionProps {
  permission: string | string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * 权限控制组件
 * @param permission 需要的权限，可以是单个字符串或字符串数组
 * @param children 有权限时显示的内容
 * @param fallback 无权限时显示的内容
 */
const Permission: React.FC<PermissionProps> = ({ permission, children, fallback = null }) => {
  const { permissions } = useUserStore();

  const hasPermission = () => {
    if (Array.isArray(permission)) {
      // 如果是数组，只要有其中一个权限即可
      return permission.some((p) => permissions.includes(p));
    }
    return permissions.includes(permission);
  };

  return hasPermission() ? <>{children}</> : <>{fallback}</>;
};

export default Permission;
