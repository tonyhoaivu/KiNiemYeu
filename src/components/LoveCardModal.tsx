import React, { useState } from 'react';
import { X, Heart, Sparkles, Share2, Check, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CoupleInfo, LoveDuration } from '../types';

interface LoveCardModalProps {
  couple: CoupleInfo;
  duration: LoveDuration;
  onClose: () => void;
}

export const LoveCardModal: React.FC<LoveCardModalProps> = ({
  couple,
  duration,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a'],
      });
    } catch {
      // Ignore
    }

    const textToCopy = `Hoài Vũ & Hải Yến - Đã bên nhau ${duration.totalDays} ngày hạnh phúc!\nKhởi đầu từ ngày ${new Date(couple.startDate).toLocaleDateString('vi-VN')}.\n"${couple.motto}"`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 text-neutral-400 hover:text-white p-1"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Printable Aesthetic Souvenir Love Card */}
        <div
          id="romantic-souvenir-card"
          className="bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 rounded-3xl p-6 sm:p-8 border border-rose-500/30 shadow-2xl relative overflow-hidden text-center"
        >
          {/* Subtle floral/starlight accents */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-amber-300 to-pink-500" />
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-rose-300 uppercase tracking-widest font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Thiệp Kỷ Niệm Tình Yêu</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>

          {/* Couple Connected Avatars */}
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-rose-500 to-amber-300 shadow-lg">
              <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900">
                <img
                  src={couple.photoBoy}
                  alt={couple.nameBoy}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <Heart className="w-4 h-4 fill-rose-500" />
              </div>
              <span className="text-[10px] text-rose-300 mt-1 font-serif">{new Date(couple.startDate).toLocaleDateString('vi-VN')}</span>
            </div>

            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-pink-500 to-rose-400 shadow-lg">
              <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900">
                <img
                  src={couple.photoGirl}
                  alt={couple.nameGirl}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Names */}
          <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
            {couple.nameBoy} & {couple.nameGirl}
          </h2>

          {/* Love Count */}
          <div className="my-5 p-4 rounded-2xl bg-neutral-950/80 border border-rose-500/20">
            <span className="text-xs text-neutral-400 block uppercase tracking-wider">
              Đã bên nhau trọn vẹn
            </span>
            <div className="text-5xl font-serif font-bold text-rose-300 my-1 tabular-nums">
              {duration.totalDays}
            </div>
            <span className="text-xs text-rose-200/90 font-medium">
              Ngày Đầy Yêu Thương & Hạnh Phúc
            </span>
          </div>

          {/* Motto / Romantic Quote */}
          <p className="font-script text-lg text-rose-200/90 italic px-2">
            "{couple.motto}"
          </p>

          <div className="mt-4 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500">
            Hoài Vũ ❤️ Hải Yến · Kỷ niệm tình yêu vĩnh cửu
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={handleShare}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl hover:from-rose-600 transition-all flex items-center gap-2 shadow-lg shadow-rose-500/25 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>Đã Sao Chép Lời Chúc!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Sao Chép & Bắn Tim</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
