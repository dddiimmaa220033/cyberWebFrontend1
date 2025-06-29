import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Home, Menu, X, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername); // відображаємо ім'я користувача
    } else {
      setIsAuthenticated(false);
    }
  }, [localStorage.getItem("token"), localStorage.getItem("username")]); // Викликається при зміні значень

  const navLinks = [
    { path: "/", label: "Home", icon: <Home className="h-4 w-4 mr-2" /> },
    { path: "/tournaments", label: "Tournaments", icon: <Trophy className="h-4 w-4 mr-2" /> },
    { path: "/teams", label: "Teams", icon: <Users className="h-4 w-4 mr-2" /> },
  ];

  const role = localStorage.getItem("role");
  if (isAuthenticated && role === "2") {
    navLinks.push({
      path: "/admin",
      label: "Admin Panel",
      icon: <Settings className="h-4 w-4 mr-2" />
    });
  }

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername(""); // очищаємо ім'я користувача
    navigate("/login");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4",
        isScrolled ? "bg-esports-dark/80 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-esports-purple to-esports-blue flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">EsportsMaster</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                isActive(link.path) 
                  ? "text-primary relative after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-esports-purple after:to-esports-blue" 
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">{username}</span>
              <Button variant="outline" className="text-sm" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" className="text-sm" onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button className="text-sm bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90 transition-opacity">
                Sign Up
              </Button>
            </>
          )}
        </div>

        <button 
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-esports-dark/95">
          <div className="flex flex-col items-center gap-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  isActive(link.path) 
                    ? "text-primary relative after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-esports-purple after:to-esports-blue" 
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <Button variant="outline" className="w-full text-sm" onClick={handleLogout}>
                Log Out
              </Button>
            ) : (
              <>
                <Button variant="outline" className="w-full text-sm" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button className="w-full text-sm bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90 transition-opacity">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
