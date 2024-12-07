const SnowEffect: React.FC = () => {
  return (
    <div className="relative w-full contents z-50 h-screen bg-blue-900 overflow-hidden">
      {/* Snowflakes */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="snowflake absolute text-white animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
            fontSize: `${Math.random() * 1.5 + 0.5}rem`,
          }}
        >
          ❄️
        </div>
      ))}
    </div>
  );
};

export default SnowEffect;
