import React, { useState, useEffect } from "react";

const MESSAGES = [
  "Jo dikha tujhe, vo shayad sach tha hi nhi\nMeri khamoshi ne tujhe shmjhaya hi nhi\nTere bina subha sham me woh baat hi nhi\nTere bina mere armaan, mere hi nhi\nDil me kabhi fareb ka irada rakha hi nhi\nDil-e-jaan k Dil me tere siva koi raha hi nhi\nThora or intezar 9 november ab itna dur bhi nhi\nChal lautate hai wapas, tere bina mai pura hi nhi",
  "And you know how terrible writer I'm 😓 but ",
  "Tune poem likhi thi",
  "Pr tune patchup nhi bola tha",
  "Mujhe yaad h jb tune breakup kiya tha toh I ask you to say patchup ",
  "My one side wanted to end us\nOther side wanted to save us\nI guess you know which side won",
  "Tere har baar ab hum alag ho gye khene par maine na han bola na naa bola",
];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function MovingContainersApp() {
  const BOX_W = 380;
  const BOX_H = 300;
  const MARGIN = 120;

  const [boxes, setBoxes] = useState([]);
  const [hearts, setHearts] = useState([]);

  // initial boxes
  useEffect(() => {
    const width = window.innerWidth;
    const startX = width / 2 - BOX_W / 2;

    const initial = MESSAGES.map((m, i) => ({
      id: i,
      text: m,
      x: startX,
      y: 220 + i * 6,
    }));

    setBoxes(initial);
  }, []);

  // hearts
  useEffect(() => {
    const arr = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: rand(0, window.innerWidth),
      size: rand(14, 28),
      delay: rand(0, 8),
      duration: rand(7, 15),
    }));
    setHearts(arr);
  }, []);

  const moveBox = (id) => {
    const maxX = window.innerWidth - BOX_W - MARGIN;
    const maxY = window.innerHeight - BOX_H - MARGIN;

    setBoxes((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              x: rand(MARGIN, maxX),
              y: rand(MARGIN + 80, maxY),
            }
          : b
      )
    );
  };

  return (
    <div style={styles.app}>
      {/* hearts background layer */}
      <div style={styles.heartsWrap}>
        {hearts.map((h) => (
          <div
            key={h.id}
            style={{
              ...styles.heart,
              left: h.left,
              fontSize: h.size,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
            }}
          >
            ❤️‍🩹
          </div>
        ))}
      </div>

      <h1 style={styles.header}>
        S(19) - O(15) - R(18) - R(18) - Y(25)
      </h1>

      {boxes.map((b) => (
        <div
          key={b.id}
          onClick={() => moveBox(b.id)}
          style={{
            ...styles.box,
            left: b.x,
            top: b.y,
          }}
        >
          {b.text}
        </div>
      ))}
    </div>
  );
}

const styles = {
  app: {
    height: "100vh",
    width: "100vw",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(180deg,#fff1f2,#ffe4ec,#ffffff)",
    fontFamily: "Arial",
  },

  header: {
    textAlign: "center",
    marginTop: 120,
    marginBottom: 20,
    fontSize: 28,
    fontWeight: 600,
    color: "#e11d48",
    position: "relative",
    zIndex: 2,
  },

  box: {
    position: "absolute",
    zIndex: 2,
    width: 380,
    height: 300,
    background: "#ece5e5",
    color: "black",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    userSelect: "none",
    transition: "all 500ms ease",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    whiteSpace: "pre-wrap",
    textAlign: "center",
    padding: "16px",
    boxSizing: "border-box",
  },

  heart: {
    position: "absolute",
    top: "100%",
    animationName: "floatUp",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    opacity: 0.6,
    pointerEvents: "none",
  },

  heartsWrap: {
    position: "fixed",
    inset: 0,
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: 0,
  },
};

// safe keyframe injection
(function () {
  if (typeof document === "undefined") return;

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes floatUp {
      0% { transform: translateY(0); opacity:0 }
      10% { opacity:0.7 }
      100% { transform: translateY(-110vh); opacity:0 }
    }
  `;
  document.head.appendChild(style);
})();