import { Link, useLocation } from 'react-router-dom';
import { ServerIcon, HardDriveIcon, BoxIcon, LayoutDashboardIcon } from 'lucide-react';

const AdminBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboardIcon },
    { name: 'Servers', path: '/admin/servers', icon: ServerIcon },
    { name: 'Nodes', path: '/admin/nodes', icon: HardDriveIcon },
    { name: 'Units', path: '/admin/units', icon: BoxIcon }
  ];

  return (
    <div className="w-full h-14 border-b border-gray-200 dark:border-gray-700 p-3 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentPath === tab.path;
            
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex items-center space-x-2 text-xs font-medium px-4 py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-white dark:bg-gray-800 shadow-xs border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200'
                    : 'bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${
                  isActive 
                    ? 'text-gray-700 dark:text-gray-300' 
                    : 'text-gray-500 dark:text-gray-500'
                }`} />
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminBar;