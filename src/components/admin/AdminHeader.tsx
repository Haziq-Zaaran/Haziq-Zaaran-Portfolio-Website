
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, User, LogOut, Settings, Home, Folders, BarChart4, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { id: 'projects', label: 'Projects', icon: Folders },
    { id: 'about', label: 'About', icon: User },
    { id: 'dashboards', label: 'Dashboards', icon: BarChart4 },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{user?.username}</span>
                </div>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => {
                        setActiveTab(item.id);
                      }}
                    >
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.label}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => navigate('/')}
                  >
                    <Home className="mr-2 h-5 w-5" />
                    View Site
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden md:flex">
            <div className="font-bold text-xl">Portfolio Admin</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className="gap-1"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-4 w-4 mr-1" />
              {item.label}
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center text-sm font-medium">
            <User className="h-4 w-4 mr-1" />
            {user?.username}
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Settings"
            className="hidden md:flex"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
