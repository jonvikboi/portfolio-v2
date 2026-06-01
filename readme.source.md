```aura width=860 height=240 link="https://collectioneur.github.io/readme-aura/"
<div style={{
  width: '100%', height: '100%', background: '#0a0002',
  display: 'flex', alignItems: 'center', fontFamily: 'Inter, sans-serif',
  position: 'relative', overflow: 'hidden', borderRadius: 24,
  border: '2px solid rgba(244,12,63,0.3)',
  boxShadow: '0 0 40px rgba(244,12,63,0.15)'
}}>

  <style>{`
      @keyframes float-slow {
        0%, 100% { transform: translateX(0px); opacity: 0.8; }
        50% { transform: translateX(350px); opacity: 1.2; }
      }
      @keyframes float-medium {
        0%, 100% { transform: translateX(0px); opacity: 0.7; }
        50% { transform: translateX(-250px); opacity: 1.1; }
      }
      @keyframes float-fast {
        0%, 100% { transform: translateX(0px); opacity: 0.9; }
        50% { transform: translateX(200px); opacity: 0.6; }
      }
      @keyframes float-diagonal {
        0%, 100% { transform: translateX(0px); opacity: 0.75; }
        50% { transform: translateX(300px); opacity: 1.0; }
      }
      @keyframes float-wave {
        0%, 100% { transform: translateX(0px); opacity: 0.65; }
        33% { transform: translateX(-160px); opacity: 0.9; }
        66% { transform: translateX(80px); opacity: 1.0; }
      }
      @keyframes float-pulse {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.3); opacity: 0.4; }
      }
      #glow-1 { animation: float-slow 8s ease-in-out infinite; }
      #glow-2 { animation: float-medium 12s ease-in-out infinite; }
      #glow-3 { animation: float-fast 9s ease-in-out infinite; }
      #glow-4 { animation: float-slow 11s ease-in-out infinite reverse; }
      #glow-5 { animation: float-medium 14s ease-in-out infinite reverse; }
      #glow-6 { animation: float-diagonal 10s ease-in-out infinite; }
      #glow-7 { animation: float-wave 13s ease-in-out infinite; }
      #glow-8 { animation: float-pulse 7s ease-in-out infinite; }
    `}</style>

  <svg width="860" height="240" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <radialGradient id="g1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(244,12,63,0.72)" />
        <stop offset="40%" stopColor="rgba(229,11,59,0.35)" />
        <stop offset="70%" stopColor="rgba(229,11,59,0)" />
      </radialGradient>
      <radialGradient id="g2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(110,4,25,0.6)" />
        <stop offset="45%" stopColor="rgba(49,1,8,0.35)" />
        <stop offset="70%" stopColor="rgba(49,1,8,0)" />
      </radialGradient>
      <radialGradient id="g3" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
        <stop offset="50%" stopColor="rgba(244,12,63,0.18)" />
        <stop offset="70%" stopColor="rgba(244,12,63,0)" />
      </radialGradient>
      <radialGradient id="g4" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(229,11,59,0.32)" />
        <stop offset="70%" stopColor="rgba(229,11,59,0)" />
      </radialGradient>
      <radialGradient id="g5" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(110,4,25,0.38)" />
        <stop offset="70%" stopColor="rgba(110,4,25,0)" />
      </radialGradient>
      <radialGradient id="g6" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(244,12,63,0.55)" />
        <stop offset="45%" stopColor="rgba(229,11,59,0.22)" />
        <stop offset="70%" stopColor="rgba(229,11,59,0)" />
      </radialGradient>
      <radialGradient id="g7" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
        <stop offset="50%" stopColor="rgba(229,11,59,0.16)" />
        <stop offset="70%" stopColor="rgba(229,11,59,0)" />
      </radialGradient>
      <radialGradient id="g8" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(244,12,63,0.40)" />
        <stop offset="50%" stopColor="rgba(110,4,25,0.15)" />
        <stop offset="70%" stopColor="rgba(110,4,25,0)" />
      </radialGradient>
    </defs>

    <ellipse id="glow-1" cx="180" cy="270" rx="260" ry="190" fill="url(#g1)" />
    <ellipse id="glow-2" cx="300" cy="280" rx="220" ry="160" fill="url(#g2)" />
    <ellipse id="glow-3" cx="420" cy="280" rx="180" ry="140" fill="url(#g3)" />
    <ellipse id="glow-4" cx="550" cy="290" rx="150" ry="120" fill="url(#g4)" />
    <ellipse id="glow-5" cx="750" cy="290" rx="130" ry="110" fill="url(#g5)" />
    <ellipse id="glow-6" cx="300" cy="280" rx="180" ry="140" fill="url(#g6)" />
    <ellipse id="glow-7" cx="490" cy="270" rx="220" ry="170" fill="url(#g7)" />
    <ellipse id="glow-8" cx="590" cy="290" rx="150" ry="130" fill="url(#g8)" />
  </svg>

  <div style={{
    position: 'absolute', left: 48, top: 72, width: 96, height: 96,
    borderRadius: 48, background: 'linear-gradient(135deg, #f40c3f, #6e0419)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 0 20px rgba(244,12,63,0.5)'
  }}>
    <img src={github?.user?.avatarUrl ?? 'https://github.com/jonvikboi.png'} width={88} height={88} style={{ borderRadius: 44 }} />
  </div>

  <div style={{ display:'flex', flexDirection:'column', marginLeft:168, gap:8, zIndex: 10 }}>
    <div style={{ display:'flex', fontSize:42, fontWeight:900, color:'#ffffff', letterSpacing:'-1px', lineHeight:1 }}>
      {repo?.name || 'portfolio-v2'}
    </div>
    <div style={{ display:'flex', fontSize:16, color:'rgba(255,200,210,0.8)', fontWeight:400, letterSpacing:'0.3px' }}>
      {repo?.description || 'Creative Developer & Software Engineer Portfolio'}
    </div>
    <div style={{ display:'flex', gap:12, marginTop:8, flexWrap: 'wrap' }}>
      {[
        repo?.language || 'TypeScript',
        'Next.js',
        'Tailwind CSS'
      ].map(function(tag, i) {
        return (
          <div key={tag + '-' + i} style={{
            display:'flex', padding:'6px 16px', borderRadius:20,
            background:'rgba(244,12,63,0.15)', border:'1px solid rgba(244,12,63,0.4)',
            color:'rgba(255,220,230,0.9)', fontSize:13, fontWeight:600,
            textTransform: 'uppercase', letterSpacing: '1px'
          }}>{tag}</div>
        );
      })}
    </div>
  </div>
</div>
```
```aura width=860 height=300
<div style={{
  width: '100%', height: '100%', background: '#0a0002',
  display: 'flex', flexDirection: 'column', padding: '40px 48px',
  fontFamily: 'Inter, sans-serif', color: '#fff',
  borderRadius: 24, border: '2px solid rgba(244,12,63,0.3)',
  boxShadow: 'inset 0 0 40px rgba(244,12,63,0.05)',
  gap: 36, boxSizing: 'border-box', position: 'relative', overflow: 'hidden'
}}>

  <style>{`
      @keyframes breath-bg {
        0%, 100% { transform: scale(1); opacity: 0.2; }
        50% { transform: scale(1.3); opacity: 0.6; }
      }
      @keyframes heading-pulse {
        0%, 100% { text-shadow: 0 0 8px rgba(244,12,63,0.3); opacity: 0.9; }
        50% { text-shadow: 0 0 20px rgba(244,12,63,0.8); opacity: 1; }
      }
      #bg-breather { animation: breath-bg 7s ease-in-out infinite; transform-origin: center; }
      #heading-glow { animation: heading-pulse 4s ease-in-out infinite; }
  `}</style>

  <svg width="860" height="300" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <radialGradient id="card-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(244,12,63,0.4)" />
        <stop offset="60%" stopColor="rgba(110,4,25,0.1)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
      </radialGradient>
    </defs>
    <ellipse id="bg-breather" cx="430" cy="150" rx="350" ry="200" fill="url(#card-glow)" />
  </svg>

  <div id="heading-glow" style={{ 
    display: 'flex', 
    width: '100%', 
    height: 40, 
    fontSize: 32,
    fontWeight: 900,
    fontFamily: 'Inter, sans-serif',
    letterSpacing: '-0.5px',
    color: '#ef1940ff',
    zIndex: 10
  }}>
    Core Architecture
  </div>
  
  <div style={{ display: 'flex', gap: 24, width: '100%', alignItems: 'stretch', zIndex: 10 }}>
    {/* Feature 1 */}
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 10, background: 'rgba(255,255,255,0.03)', padding: '20px 24px', borderRadius: 16, border: '1px solid rgba(244,12,63,0.15)', justifyContent: 'flex-start' }}>
      <div style={{ display: 'flex', fontSize: 17, fontWeight: 700, color: '#ffb3c1' }}>Modern Design</div>
      <div style={{ display: 'flex', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
        Curated harmonious color palette with dynamic backgrounds and sleek layout structure.
      </div>
    </div>
    
    {/* Feature 2 */}
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 10, background: 'rgba(255,255,255,0.03)', padding: '20px 24px', borderRadius: 16, border: '1px solid rgba(244,12,63,0.15)', justifyContent: 'flex-start' }}>
      <div style={{ display: 'flex', fontSize: 17, fontWeight: 700, color: '#ffb3c1' }}>Glassmorphism UI</div>
      <div style={{ display: 'flex', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
        Premium aesthetic built with Tailwind CSS, utilizing backdrop-blur and glowing red accents.
      </div>
    </div>
    
    {/* Feature 3 */}
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 10, background: 'rgba(255,255,255,0.03)', padding: '20px 24px', borderRadius: 16, border: '1px solid rgba(244,12,63,0.15)', justifyContent: 'flex-start' }}>
      <div style={{ display: 'flex', fontSize: 17, fontWeight: 700, color: '#ffb3c1' }}>Fluid Animations</div>
      <div style={{ display: 'flex', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
        Seamless route transitions powered by Framer Motion, and scroll-reveals handled by GSAP.
      </div>
    </div>
  </div>
</div>
```
