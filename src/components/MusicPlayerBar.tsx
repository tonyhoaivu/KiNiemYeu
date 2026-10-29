import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Music2, Upload, Disc, ChevronUp, ChevronDown, ListMusic } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine';
import { SongTrack, CoupleInfo } from '../types';

interface MusicPlayerBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  couple: CoupleInfo;
  playlist: SongTrack[];
  currentTrack: SongTrack | null;
  onSelectTrack: (track: SongTrack) => void;
  onOpenMusicManager: () => void;
}

export const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
  isPlaying,
  onTogglePlay,
  couple,
  playlist,
  currentTrack,
  onSelectTrack,
  onOpenMusicManager,
}) => {
  const [volume, setVolume] = useState(romanticAudio.getVolume());
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeTrack = currentTrack || playlist[0];

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
      romanticAudio.setVolume(0);
    } else {
      setIsMuted(false);
      romanticAudio.setVolume(val);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      romanticAudio.setVolume(volume || 0.7);
    } else {
      setIsMuted(true);
      romanticAudio.setVolume(0);
    }
  };

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const track = romanticAudio.playCustomFile(file);
      onSelectTrack(track);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm w-[calc(100vw-2rem)] transition-all">
      {/* Expanded Playlist Drawer */}
      {isExpanded && (
        <div className="glass-panel rounded-2xl p-4 mb-3 border border-rose-500/25 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-rose-500/15">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
              <Music2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Giai Điệu Tình Yêu</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenMusicManager}
                className="text-[11px] font-medium text-rose-300 hover:text-white flex items-center gap-1 bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-500/20"
              >
                <ListMusic className="w-3 h-3" />
                <span>Kho Nhạc</span>
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-neutral-400 hover:text-white text-xs p-1"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Song list */}
          <div className="mt-3 space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {playlist.map((song) => {
              const isSelected = activeTrack.id === song.id;
              return (
                <button
                  key={song.id}
                  onClick={() => onSelectTrack(song)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                    isSelected && isPlaying
                      ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30 font-medium'
                      : 'text-neutral-300 hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="truncate mr-2">
                    <div className="font-medium text-white truncate">{song.title}</div>
                    <div className="text-[11px] text-neutral-400 truncate">{song.artist}</div>
                  </div>
                  <span className="text-[10px] text-neutral-400 shrink-0">{song.duration || 'Bài riêng'}</span>
                </button>
              );
            })}
          </div>

          {/* Quick upload or change */}
          <div className="mt-3 pt-3 border-t border-rose-500/15 flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="audio/*"
              className="hidden"
              onChange={handleCustomAudioUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-1.5 px-2 text-xs text-rose-200 bg-neutral-900 border border-rose-500/20 hover:border-rose-400/40 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-rose-400" />
              <span>Tải bài hát riêng</span>
            </button>
            <button
              onClick={onOpenMusicManager}
              className="py-1.5 px-3 text-xs text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl hover:from-rose-600 transition-all shadow-sm"
            >
              Đổi Nhạc
            </button>
          </div>
        </div>
      )}

      {/* Mini Player Pill Container */}
      <div className="glass-panel rounded-2xl p-3 shadow-2xl border border-rose-500/20 flex items-center gap-3 backdrop-blur-xl">
        {/* Rotating Vinyl Disc with couple photo */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-11 h-11 shrink-0 rounded-full cursor-pointer group"
          title="Xem danh sách bài hát"
        >
          <div
            className={`w-full h-full rounded-full bg-neutral-900 border-2 border-neutral-700 p-0.5 flex items-center justify-center shadow-md ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
          >
            <img
              src={couple.photoGirl}
              alt="Vinyl center"
              className="w-7 h-7 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 rounded-full transition-opacity">
            <Disc className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Song Info & Equalizer */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 min-w-0 cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-white truncate">
              {activeTrack.title}
            </span>
          </div>
          <div className="text-[11px] text-rose-300/80 truncate flex items-center gap-2">
            <span>{activeTrack.artist}</span>
            {isPlaying && (
              <span className="flex items-end gap-0.5 h-2.5">
                <span className="w-0.5 h-2 bg-rose-400 animate-pulse" />
                <span className="w-0.5 h-3 bg-pink-400 animate-pulse [animation-delay:150ms]" />
                <span className="w-0.5 h-1.5 bg-rose-300 animate-pulse [animation-delay:300ms]" />
              </span>
            )}
          </div>
        </div>

        {/* Volume & Play controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleMute}
            className="text-neutral-400 hover:text-white p-1 transition-colors"
            title={isMuted ? 'Bật âm' : 'Tắt âm'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-12 h-1 accent-rose-500 bg-neutral-800 rounded-lg cursor-pointer hidden sm:inline-block"
            title="Âm lượng"
          />

          <button
            onClick={onTogglePlay}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white flex items-center justify-center shadow-md shadow-rose-500/25 active:scale-95 transition-all cursor-pointer"
            title={isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white translate-x-0.5" />
            )}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-neutral-400 hover:text-white p-1"
            title="Mở rộng danh sách"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
