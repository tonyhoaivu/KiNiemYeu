import React from 'react';
import { Heart, Sparkles, Calendar, Clock, Activity, Settings2, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CoupleInfo, LoveDuration } from '../types';

interface HeroLoveCounterProps {
  couple: CoupleInfo;
  duration: LoveDuration;
  onOpenEditModal: () => void;
  backgroundMode: 'stars' | 'petals' | 'hearts';
  onChangeBackgroundMode: (mode: 'stars' | 'petals' | 'hearts') => void;
  onOpenCardModal: () => void;
}

export const HeroLoveCounter: React.FC<HeroLoveCounterProps> = ({
  couple,
  duration,
  onOpenEditModal,
  backgroundMode,
  onChangeBackgroundMode,
  onOpenCardModal,
}) => {
  const triggerLoveBlast = () => {
    // Beautiful romantic heart confetti
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#fda4af', '#fb7185', '#ffe4e6'],
        shapes: ['circle'],
        scalar: 1.2,
      });
    } catch {
      // Fallback
    }
  };

  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Subtle romantic tagline */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-rose-300/80 mb-2 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Kỷ Niệm Tình Yêu Vĩnh Cửu</span>
            <span aria-hidden="true">·</span>
            <span>Khởi Đầu {new Date(couple.startDate).toLocaleDateString('vi-VN')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            <span className="bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200 bg-clip-text text-transparent">
              {couple.nameBoy} & {couple.nameGirl}
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-rose-200/70 max-w-xl mx-auto font-light italic">
            "{couple.motto}"
          </p>
        </div>

        {/* Couple Spotlight Avatars with Heart Connection */}
        <div className="my-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          
          {/* Hoài Vũ */}
          <div className="flex flex-col items-center group">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-rose-500/40 via-amber-400/30 to-purple-500/40 shadow-xl shadow-rose-900/20 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900 border-2 border-rose-300/30">
                <img
                  src={couple.photoBoy}
                  alt={couple.nameBoy}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback visual
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="absolute -bottom-2 bg-neutral-900/90 border border-rose-500/30 px-3 py-0.5 rounded-full text-xs font-semibold text-rose-200 shadow-md">
                {couple.nameBoy}
              </div>
            </div>
            <p className="mt-4 text-xs text-neutral-400 text-center max-w-[160px] line-clamp-2">
              {couple.bioBoy}
            </p>
          </div>

          {/* Heart Connection & Pulse */}
          <div className="relative flex flex-col items-center justify-center py-2 px-4">
            <div className="relative flex items-center justify-center">
              {/* Pulsing rings */}
              <div className="absolute w-20 h-20 rounded-full bg-rose-500/10 animate-ping" />
              <div className="absolute w-14 h-14 rounded-full bg-rose-500/20 animate-pulse" />
              
              <button
                onClick={triggerLoveBlast}
                title="Nhấn để thả tim chúc phúc!"
                className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/40 hover:scale-110 active:scale-95 transition-all cursor-pointer"
              >
                <Heart className="w-7 h-7 fill-white animate-heart-beat" />
              </button>
            </div>
            <span className="mt-3 text-xs font-serif text-rose-300 tracking-wider">
              Forever in Love
            </span>
          </div>

          {/* Hải Yến */}
          <div className="flex flex-col items-center group">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-pink-500/40 via-rose-400/30 to-amber-400/40 shadow-xl shadow-rose-900/20 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900 border-2 border-rose-300/30">
                <img
                  src={couple.photoGirl}
                  alt={couple.nameGirl}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="absolute -bottom-2 bg-neutral-900/90 border border-rose-500/30 px-3 py-0.5 rounded-full text-xs font-semibold text-rose-200 shadow-md">
                {couple.nameGirl}
              </div>
            </div>
            <p className="mt-4 text-xs text-neutral-400 text-center max-w-[160px] line-clamp-2">
              {couple.bioGirl}
            </p>
          </div>

        </div>

        {/* Primary Love Days Counter Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden mt-6">
          {/* Subtle ambient gradient overlay */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Main big counter header */}
          <div className="text-center relative z-10 mb-8">
            <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-rose-400">
              Thời Gian Chúng Mình Đã Bên Nhau
            </span>
            <div className="mt-2 flex items-baseline justify-center gap-3">
              <span className="text-6xl sm:text-7xl md:text-8xl font-serif font-bold text-white tracking-tight tabular-nums bg-gradient-to-b from-white via-rose-100 to-rose-300 bg-clip-text text-transparent">
                {duration.totalDays}
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl font-serif text-rose-300 font-medium">
                Ngày Yêu
              </span>
            </div>
          </div>

          {/* 4-Unit Live Countdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 relative z-10 max-w-2xl mx-auto">
            <div className="bg-neutral-900/70 border border-rose-500/15 rounded-2xl p-4 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white font-mono tabular-nums">
                {String(duration.days).padStart(2, '0')}
              </div>
              <div className="mt-1 text-xs text-rose-300/80 font-medium uppercase tracking-wider">
                Ngày
              </div>
            </div>

            <div className="bg-neutral-900/70 border border-rose-500/15 rounded-2xl p-4 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white font-mono tabular-nums">
                {String(duration.hours).padStart(2, '0')}
              </div>
              <div className="mt-1 text-xs text-rose-300/80 font-medium uppercase tracking-wider">
                Giờ
              </div>
            </div>

            <div className="bg-neutral-900/70 border border-rose-500/15 rounded-2xl p-4 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white font-mono tabular-nums">
                {String(duration.minutes).padStart(2, '0')}
              </div>
              <div className="mt-1 text-xs text-rose-300/80 font-medium uppercase tracking-wider">
                Phút
              </div>
            </div>

            <div className="bg-neutral-900/70 border border-rose-500/15 rounded-2xl p-4 text-center relative overflow-hidden">
              <div className="text-3xl sm:text-4xl font-bold text-rose-400 font-mono tabular-nums">
                {String(duration.seconds).padStart(2, '0')}
              </div>
              <div className="mt-1 text-xs text-rose-300/80 font-medium uppercase tracking-wider">
                Giây
              </div>
            </div>
          </div>

          {/* Clean Unboxed Heartbeat & Stats */}
          <div className="mt-8 pt-6 border-t border-rose-500/15 flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs sm:text-sm text-neutral-300">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-400" />
              <span>Nhịp đập đồng điệu:</span>
              <strong className="text-white font-mono tabular-nums">
                {duration.heartbeats.toLocaleString('vi-VN')}
              </strong>
            </div>

            <span aria-hidden="true" className="text-rose-500/40">·</span>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Tổng giờ bên nhau:</span>
              <strong className="text-white font-mono tabular-nums">
                {duration.totalHours.toLocaleString('vi-VN')} giờ
              </strong>
            </div>

            <span aria-hidden="true" className="text-rose-500/40">·</span>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-pink-400" />
              <span>Ngày bắt đầu:</span>
              <strong className="text-white font-mono">{new Date(couple.startDate).toLocaleDateString('vi-VN')}</strong>
            </div>
          </div>

          {/* Next Milestone Progress Bar */}
          <div className="mt-6 p-4 rounded-xl bg-neutral-900/60 border border-rose-500/10 max-w-xl mx-auto">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-neutral-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>Cột mốc tiếp theo: <strong className="text-rose-200">{duration.nextMilestone.title}</strong></span>
              </span>
              <span className="text-rose-300 font-mono tabular-nums font-semibold">
                Còn {duration.nextMilestone.remainingDays} ngày nữa
              </span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-300 h-2.5 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.max(5, duration.nextMilestone.progressPercent)}%` }}
              />
            </div>
          </div>

          {/* Interactive Action Toolbar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={triggerLoveBlast}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all shadow-md shadow-rose-500/20 flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Thả Tim Lung Linh</span>
            </button>

            <button
              onClick={onOpenCardModal}
              className="px-4 py-2 text-xs font-medium text-rose-200 bg-neutral-900/80 border border-rose-500/30 rounded-lg hover:bg-neutral-800 hover:text-white transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Thiệp Tình Yêu</span>
            </button>

            {/* Atmosphere Mode Switcher */}
            <div className="flex items-center bg-neutral-900/90 border border-neutral-800 rounded-lg p-0.5 text-xs text-neutral-400">
              <button
                onClick={() => onChangeBackgroundMode('stars')}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  backgroundMode === 'stars' ? 'bg-rose-950 text-rose-200 font-medium' : 'hover:text-neutral-200'
                }`}
              >
                Ngàn Sao
              </button>
              <button
                onClick={() => onChangeBackgroundMode('petals')}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  backgroundMode === 'petals' ? 'bg-rose-950 text-rose-200 font-medium' : 'hover:text-neutral-200'
                }`}
              >
                Cánh Hoa
              </button>
              <button
                onClick={() => onChangeBackgroundMode('hearts')}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  backgroundMode === 'hearts' ? 'bg-rose-950 text-rose-200 font-medium' : 'hover:text-neutral-200'
                }`}
              >
                Trái Tim
              </button>
            </div>

            <button
              onClick={onOpenEditModal}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-900/80 border border-neutral-800 rounded-lg transition-colors"
              title="Tùy chỉnh ngày bắt đầu & thông tin"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
