import { useState, useEffect } from 'react';
import { ServerIcon, HardDriveIcon, BoxIcon, HelpCircleIcon, GithubIcon, BookOpenIcon, HeartIcon } from 'lucide-react';
import AdminBar from '../components/AdminBar';

const AdminPage = () => {
  const [stats, setStats] = useState({
    servers: { total: 0, online: 0, offline: 0 },
    units: { total: 0 },
    nodes: { total: 0, online: 0, offline: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };

        // Fetch servers
        const serversRes = await fetch('/api/servers', { headers });
        const servers = await serversRes.json();
        
        // Fetch units
        const unitsRes = await fetch('/api/units', { headers });
        const units = await unitsRes.json();

        // Calculate stats
        setStats({
          servers: {
            total: servers.length,
            online: servers.filter((s: any) => s.status?.state === 'running').length,
            offline: servers.filter((s: any) => s.status?.state !== 'running').length
          },
          units: {
            total: units.length
          },
          nodes: {
            total: new Set(servers.map((s: any) => s.node?.id)).size,
            online: new Set(servers.filter((s: any) => s.node?.isOnline).map((s: any) => s.node?.id)).size,
            offline: new Set(servers.filter((s: any) => !s.node?.isOnline).map((s: any) => s.node?.id)).size
          }
        });
        setVersion('1.0.0');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminBar />
        <div className="p-6 flex items-center justify-center h-64">
          <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 border-t-gray-900 dark:border-t-gray-200 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminBar />
        <div className="p-6">
          <div className="text-red-600 dark:text-red-400 text-xs">Error: {error}</div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Servers',
      icon: ServerIcon,
      stats: [
        { label: 'Total', value: stats.servers.total },
        { label: 'Online', value: stats.servers.online },
        { label: 'Offline', value: stats.servers.offline }
      ]
    },
    {
      title: 'Nodes',
      icon: HardDriveIcon,
      stats: [
        { label: 'Total', value: stats.nodes.total },
        { label: 'Online', value: stats.nodes.online },
        { label: 'Offline', value: stats.nodes.offline }
      ]
    },
    {
      title: 'Units',
      icon: BoxIcon,
      stats: [
        { label: 'Total', value: stats.units.total }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminBar />
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Admin</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Monitor and manage your Argon panel.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-xs p-6">
            <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">System Information</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              You are running Argon version 
              <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 ml-0.5 mr-0.5 rounded font-mono">
                {version}
              </code>
              . Your panel is up-to-date!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div 
                  key={card.title} 
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-xs p-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">{card.title}</h2>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {card.stats.map((stat) => (
                        <div key={stat.label} className="space-y-1">
                          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                            {stat.value}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6">
            <button className="bg-amber-50 dark:bg-amber-900/20 shadow-xs border border-gray-200 dark:border-amber-900/30 
                           font-medium text-sm text-amber-700 dark:text-amber-500 py-2 px-4 rounded-md 
                           flex items-center space-x-2 hover:bg-amber-100 dark:hover:bg-amber-900/30">
              <HelpCircleIcon className="w-4 h-4" />
              <span>Get Help</span>
            </button>
            <button className="bg-blue-50 dark:bg-blue-900/20 shadow-xs border border-gray-200 dark:border-blue-900/30 
                           font-medium text-sm text-blue-700 dark:text-blue-500 py-2 px-4 rounded-md 
                           flex items-center space-x-2 hover:bg-blue-100 dark:hover:bg-blue-900/30">
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </button>
            <button className="bg-blue-50 dark:bg-blue-900/20 shadow-xs border border-gray-200 dark:border-blue-900/30 
                           font-medium text-sm text-blue-700 dark:text-blue-500 py-2 px-4 rounded-md 
                           flex items-center space-x-2 hover:bg-blue-100 dark:hover:bg-blue-900/30">
              <BookOpenIcon className="w-4 h-4" />
              <span>Documentation</span>
            </button>
            <button className="bg-green-50 dark:bg-green-900/20 shadow-xs border border-gray-200 dark:border-green-900/30 
                           font-medium text-sm text-green-700 dark:text-green-500 py-2 px-4 rounded-md 
                           flex items-center space-x-2 hover:bg-green-100 dark:hover:bg-green-900/30">
              <HeartIcon className="w-4 h-4" />
              <span>Support the Project</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;