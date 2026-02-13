import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { label: "Inicio", path: "/" },
  { label: "Sobre Mí", path: "/info" },
  { label: "Proyectos", path: "/proyectos" },
  { label: "Contacto", path: "/contacto" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-center backdrop-blur-xl bg-background/70 border-b border-border/50"
    >
      <div className="flex items-center gap-1 sm:gap-2 px-4">
        <Link to="/" className="font-heading font-semibold text-lg text-gradient-primary mr-6 hidden sm:block">
          MVA
        </Link>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-md bg-primary/10 border border-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navbar;
