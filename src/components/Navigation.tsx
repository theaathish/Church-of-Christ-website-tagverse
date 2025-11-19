import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Image, Mail, Church } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "../assets/church-logo.png";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: BookOpen },
    { path: "/gallery", label: "Gallery", icon: Image },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className="bg-card/80 backdrop-blur-md shadow-soft sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center ml-8">
              <img 
                src={logo}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>

          </Link>

          <div className="flex items-center gap-1 md:gap-12">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300",
                    "hover:bg-primary/5",
                    isActive && "bg-primary/10 text-primary font-medium"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
