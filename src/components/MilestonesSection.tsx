import React from 'react';
import { Award, CheckCircle2, Clock, Calendar, Heart, Sparkles, Compass } from 'lucide-react';
import { LoveDuration, CoupleInfo } from '../types';

interface MilestonesSectionProps {
  duration: LoveDuration;
  couple: CoupleInfo;
}

export const MilestonesSection: React.FC<MilestonesSectionProps> = ({
  duration,
  couple,
}) => {
  const milestoneList = [
    { days: 30, title: '1 Tháng Yêu Nhau', desc: 'Tháng đầu tiên ngọt ngào với muôn vàn cảm xúc bỡ ngỡ.' },
    { days: 50, title: '50 Ngày Bên Nhau', desc: 'Nửa chặng đường đến 100 ngày, tình cảm thêm gắn bó bền chặt.' },
    { days: 100, title: '100 Ngày Hạnh Phúc', desc: 'Cột mốc 100 ngày thiêng liêng và đáng nhớ của đôi ta.' },
    { days: 180, title: 'Nửa Năm (6 Tháng)', desc: 'Đi qua hai mùa xuân thu, cùng chia sẻ mọi buồn vui cuộc sống.' },
    { days: 200, title: '200 Ngày Gắn Kết', desc: 'Tình yêu trưởng thành và sâu đậm qua từng ngày tháng.' },
    { days: 365, title: '1 Năm Yêu Nhau (Kỷ Niệm Vàng)', desc: 'Trọn vẹn 365 ngày yêu thương nồng nàn không đổi thay.' },
    { days: 500, title: '500 Ngày Bền Chặt', desc: 'Nửa ngàn ngày chung lối, hiểu nhau từ từng ánh mắt.' },
    { days: 730, title: '2 Năm Ngọt Ngào', desc: 'Vững tin cùng nhau hướng về tương lai hạnh phúc.' },
    { days: 1000, title: '1000 Ngày Hạnh Phúc', desc: 'Ngàn ngày yêu và cùng nhau xây dựng tổ ấm trọn vẹn.' },
  ];

  return (
    <section id="milestones" className="py-16 md:py-24 relative border-t border-rose-500/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-rose-400 font-medium mb-1">
            Hành Trình Bền Lâu
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Những Cột Mốc Tình Yêu
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Từng ngày bên nhau đều là một món quà. Hãy cùng đếm ngược và chúc mừng những cột mốc thiêng liêng của {couple.nameBoy} & {couple.nameGirl}.
          </p>
        </div>

        {/* Milestone Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {milestoneList.map((m) => {
            const isCompleted = duration.totalDays >= m.days;
            const isCurrent = !isCompleted && duration.nextMilestone.targetDays === m.days;
            const remaining = Math.max(0, m.days - duration.totalDays);

            return (
              <div
                key={m.days}
                className={`glass-panel rounded-2xl p-5 border relative overflow-hidden transition-all ${
                  isCompleted
                    ? 'border-emerald-500/25 bg-neutral-900/90'
                    : isCurrent
                    ? 'border-rose-500/40 bg-neutral-900/95 shadow-lg shadow-rose-950/30'
                    : 'border-neutral-800 bg-neutral-950/60 opacity-75'
                }`}
              >
                {/* Status indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-white bg-neutral-800 px-2 py-0.5 rounded">
                    {m.days} Ngày
                  </span>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Đã đạt được</span>
                    </span>
                  ) : isCurrent ? (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-rose-300 animate-pulse">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Còn {remaining} ngày</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-neutral-500 font-mono">
                      Còn {remaining} ngày
                    </span>
                  )}
                </div>

                <h3 className="text-base font-serif font-bold text-white mb-1.5">
                  {m.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {m.desc}
                </p>

                {/* Progress bar if current */}
                {isCurrent && (
                  <div className="mt-4 pt-3 border-t border-rose-500/15">
                    <div className="flex items-center justify-between text-[11px] text-rose-300 mb-1.5">
                      <span>Tiến độ</span>
                      <span className="font-mono">{duration.nextMilestone.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-rose-500 to-amber-300 h-1.5 rounded-full"
                        style={{ width: `${duration.nextMilestone.progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Fun Couple Statistics Strip */}
        <div className="mt-12 glass-panel rounded-2xl p-6 border border-rose-500/15 bg-neutral-900/60">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-xs text-neutral-400 mb-1">Những nụ cười trao nhau</div>
              <div className="text-2xl font-serif font-bold text-amber-200 font-mono">
                {(duration.totalDays * 12).toLocaleString('vi-VN')}+
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-400 mb-1">Cái ôm ấm áp</div>
              <div className="text-2xl font-serif font-bold text-rose-300 font-mono">
                {(duration.totalDays * 6).toLocaleString('vi-VN')}+
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-400 mb-1">Tin nhắn yêu thương</div>
              <div className="text-2xl font-serif font-bold text-pink-300 font-mono">
                {(duration.totalDays * 45).toLocaleString('vi-VN')}+
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-400 mb-1">Mức độ hạnh phúc</div>
              <div className="text-2xl font-serif font-bold text-white font-mono">
                100% ∞
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
