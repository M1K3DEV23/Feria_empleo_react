import React from "react";

// Importar frame-motion
import { motion } from "framer-motion";

// Importando el CSS
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
      <div className="home">
        <h1>Welcome to the Home PAGE</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis pariatur repellat sint. In consectetur quis, perferendis facilis illum numquam id velit minus accusantium veniam voluptas rem rerum! Cumque, atque ullam.</p>
      </div>
    </motion.div>
  )
}

export default Home;