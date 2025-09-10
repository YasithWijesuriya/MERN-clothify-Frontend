import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.span
      className="text-2xl font-extrabold text-transparent bg-clip-text"
      style={{
        backgroundImage:
          "linear-gradient(90deg, #fff7b2, #facc15, #d97706, #fff7b2)", 
        backgroundSize: "400% 100%", 
        display: "inline-block",
        
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    >
      Mebius
    </motion.span>
  );
}
