import React from 'react';
import { Music, VolumeX, Sparkles, Heart } from 'lucide-react';

interface NavbarProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
  onOpenMusicManager: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCardModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isPlaying,
  onToggleMusic,
  onOpenMusicManager,
  activeSection,
  onNavigate,
  onOpenCardModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-neutral-950/80 border-b border-rose-500/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('hero');
          }}
          className="group flex items-center gap-2 text-xl sm:text-2xl font-serif font-bold tracking-tight text-white whitespace-nowrap shrink-0"
        >
          <span className="bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200 bg-clip-text text-transparent group-hover:from-rose-300 group-hover:to-amber-100 transition-all">
            Hoài Vũ & Hải Yến
          </span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline-block animate-pulse" />
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <button
            onClick={() => onNavigate('hero')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'hero' ? 'text-rose-400 font-semibold' : 'text-neutral-400'
            }`}
          >
            Đếm Ngày Yêu
          </button>
          <button
            onClick={() => onNavigate('diary')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'diary' ? 'text-rose-400 font-semibold' : 'text-neutral-400'
            }`}
          >
            Nhật Ký & Bài Viết
          </button>
          <button
            onClick={() => onNavigate('timeline')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'timeline' ? 'text-rose-400 font-semibold' : 'text-neutral-400'
            }`}
          >
            Dòng Kỷ Niệm
          </button>
          <button
            onClick={() => onNavigate('gallery')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'gallery' ? 'text-rose-400 font-semibold' : 'text-neutral-400'
            }`}
          >
            Album Ảnh
          </button>
          <button
            onClick={() => onNavigate('letters')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'letters' ? 'text-rose-400 font-semibold' : 'text-neutral-400'
            }`}
          >
            Thư Tình & Điều Ước
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenMusicManager}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-200 bg-rose-950/40 border border-rose-500/25 rounded-lg hover:bg-rose-900/40 hover:text-white transition-colors whitespace-nowrap shrink-0"
            title="Đổi bài hát hoặc tải nhạc lên"
          >
            <Music className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Thay Nhạc</span>
          </button>

          <button
            onClick={onOpenCardModal}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900/80 border border-neutral-800 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors whitespace-nowrap shrink-0"
            title="Tạo thiệp kỷ niệm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Thiệp Tình Yêu</span>
          </button>

          <button
            onClick={onToggleMusic}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              isPlaying
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/25'
                : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700 hover:text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-white animate-pulse" />
                  <span className="w-0.5 h-3 bg-white animate-pulse [animation-delay:150ms]" />
                  <span className="w-0.5 h-1.5 bg-white animate-pulse [animation-delay:300ms]" />
                </span>
                <span>Đang Phát</span>
              </>
            ) : (
              <>
                <Music className="w-3.5 h-3.5 text-rose-400" />
                <span>Bật Nhạc</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
