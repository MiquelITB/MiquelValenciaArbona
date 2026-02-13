import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
    className="py-8 text-center text-muted-foreground text-sm border-t border-border/50"
  >
    <p>© 2026 Miquel Valencia Arbona. Todos los derechos reservados.</p>
  </motion.footer>
);

export default Footer;
