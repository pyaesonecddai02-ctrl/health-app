import React, { useState } from 'react';
import { Volume2, VolumeX, Trees, CloudRain, Waves, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundGenerator';

export function AmbientPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundType, setSoundType] = useState('forest'); // 'forest' | 'rain' | 'waves'
  const [volume, setVolume] = useState(0.25);
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePlayback = () => {
    if (isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
    } else {
      soundEngine.play(soundType, volume);
      setIsPlaying(true);
    }
  };

  const changeSound = (type) => {
    setSoundType(type);
    if (isPlaying) {
      soundEngine.play(type, volume);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
  };

  return (
    <div className="relative">
      {/* Compact trigger button in Navbar */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
        <button
          type="button"
          onClick={togglePlayback}
          title={isPlaying ? 'Pause nature ambience' : 'Play nature ambience'}
          className={`p-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
            isPlaying
              ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 shadow-[0_0_12px_rgba(52,211,153,0.3)] animate-pulse'
              : 'text-white/60 hover:text-white'
          }`}
        >
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="hidden md:inline font-medium text-[11px]">
            {isPlaying ? 'Ambience On' : 'Nature Sound'}
          </span>
        </button>

        {/* Expand selector */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-1.5 py-1 text-white/50 hover:text-white rounded hover:bg-white/10 text-[10px]"
        >
          ▾
        </button>
      </div>

      {/* Expanded audio controls popup */}
      {isExpanded && (
        <div className="absolute right-0 top-12 z-50 w-64 p-3.5 glass-panel border border-white/20 shadow-2xl rounded-2xl animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10 text-xs font-semibold text-white">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              Nature Ambience
            </span>
            <span className="text-[10px] text-emerald-400 font-normal">Offline Web Audio</span>
          </div>

          {/* Sound options */}
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            <button
              type="button"
              onClick={() => changeSound('forest')}
              className={`p-2 rounded-lg border text-center transition cursor-pointer text-[10px] flex flex-col items-center gap-1 ${
                soundType === 'forest'
                  ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200'
                  : 'bg-white/5 border-white/10 text-white/60'
              }`}
            >
              <Trees className="w-4 h-4" />
              <span>Forest</span>
            </button>

            <button
              type="button"
              onClick={() => changeSound('rain')}
              className={`p-2 rounded-lg border text-center transition cursor-pointer text-[10px] flex flex-col items-center gap-1 ${
                soundType === 'rain'
                  ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200'
                  : 'bg-white/5 border-white/10 text-white/60'
              }`}
            >
              <CloudRain className="w-4 h-4" />
              <span>Rain</span>
            </button>

            <button
              type="button"
              onClick={() => changeSound('waves')}
              className={`p-2 rounded-lg border text-center transition cursor-pointer text-[10px] flex flex-col items-center gap-1 ${
                soundType === 'waves'
                  ? 'bg-teal-500/25 border-teal-400 text-teal-200'
                  : 'bg-white/5 border-white/10 text-white/60'
              }`}
            >
              <Waves className="w-4 h-4" />
              <span>Waves</span>
            </button>
          </div>

          {/* Volume slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-white/50">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-black/40 rounded appearance-none accent-emerald-400"
            />
          </div>
        </div>
      )}
    </div>
  );
}
