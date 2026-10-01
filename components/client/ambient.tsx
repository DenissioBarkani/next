"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export function Ambient() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(true);
  const [point, setPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return (
    <div
      className="ambient"
      aria-hidden="true"
      onPointerMove={(event) => {
        if (reducedMotion || event.pointerType === "touch") return;
        const rect = event.currentTarget.getBoundingClientRect();
        setPoint({
          x: (event.clientX - rect.left - rect.width / 2) * 0.035,
          y: (event.clientY - rect.top - rect.height / 2) * 0.035,
        });
      }}
      onPointerLeave={() => setPoint({ x: 0, y: 0 })}
    >
      <div className="ambient-grid" />
      <div className="orbital orbital-one" />
      <div className="orbital orbital-two" />
      <motion.div
        className="ambient-plane"
        animate={point}
        transition={{ type: "spring", stiffness: 90, damping: 20 }}
      >
        <span className="ambient-bracket bracket-left">[</span>
        <span className="ambient-core">&lt;/&gt;</span>
        <span className="ambient-bracket bracket-right">]</span>
      </motion.div>
      {["Vue", "React", "TS"].map((text, index) => (
        <motion.span
          key={text}
          className={`floating-chip chip-${index}`}
          animate={reducedMotion || !active ? { y: 0 } : { y: [0, -9, 0] }}
          transition={{
            duration: 5,
            repeat: reducedMotion || !active ? 0 : Infinity,
            delay: index * 0.6,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.span>
      ))}
      <div className="ambient-caption">
        <span>Интерфейсы + логика</span>
        <span>01 / 05</span>
      </div>
    </div>
  );
}
