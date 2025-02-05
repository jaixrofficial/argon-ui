import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from './ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className="w-full px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center"
    >
      {theme === 'light' ? (
        <>
          <MoonIcon className="mr-2 h-3.5 w-3.5" />
          Dark mode
        </>
      ) : (
        <>
          <SunIcon className="mr-2 h-3.5 w-3.5" />
          Light mode
        </>
      )}
    </button>
  );
};