import React, { useState } from 'react';
import { Mail, Heart, Sparkles, Send, CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { LoveLetter, WishItem, CoupleInfo } from '../types';

interface LoveLettersProps {
  letters: LoveLetter[];
  wishes: WishItem[];
  couple: CoupleInfo;
  onAddLetter: (letter: Omit<LoveLetter, 'id'>) => void;
  onAddWish: (wish: Omit<WishItem, 'id'>) => void;
  onToggleWish: (id: string) => void;
  onDeleteWish: (id: string) => void;
}

export const LoveLetters: React.FC<LoveLettersProps> = ({
  letters,
  wishes,
  couple,
  onAddLetter,
  onAddWish,
  onToggleWish,
  onDeleteWish,
}) => {
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(0);
  const [isOpenEnvelope, setIsOpenEnvelope] = useState(true);
  const [isWriteLetterModal, setIsWriteLetterModal] = useState(false);
  const [isAddWishModal, setIsAddWishModal] = useState(false);

  // New Letter form
  const [sender, setSender] = useState<'boy' | 'girl'>('boy');
  const [letterTitle, setLetterTitle] = useState('');
  const [letterContent, setLetterContent] = useState('');

  // New Wish form
  const [wishAuthor, setWishAuthor] = useState('Hoài Vũ');
  const [wishContent, setWishContent] = useState('');
  const [wishColor, setWishColor] = useState('#f43f5e');

  const currentLetter = letters[selectedLetterIndex] || letters[0];

  const handleCreateLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!letterTitle.trim() || !letterContent.trim()) return;

    onAddLetter({
      sender,
      senderName: sender === 'boy' ? couple.nameBoy : couple.nameGirl,
      receiverName: sender === 'boy' ? couple.nameGirl : couple.nameBoy,
      title: letterTitle,
      content: letterContent,
      date: new Date().toLocaleDateString('vi-VN'),
    });

    setLetterTitle('');
    setLetterContent('');
    setIsWriteLetterModal(false);
    setSelectedLetterIndex(letters.length); // View new letter
  };

  const handleCreateWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishContent.trim()) return;

    onAddWish({
      author: wishAuthor,
      content: wishContent,
      date: new Date().toLocaleDateString('vi-VN'),
      color: wishColor,
      isFulfilled: false,
    });

    setWishContent('');
    setIsAddWishModal(false);
  };

  return (
    <section id="letters" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-rose-400 font-medium mb-1">
            Gửi Trao Yêu Thương
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Thư Tình & Bình Điều Ước
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Nơi cất giữ những lời thì thầm từ tận đáy lòng và những ước mơ ngọt ngào của hai chúng ta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Interactive Wax-Sealed Letter (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/20 shadow-2xl relative">
              
              {/* Header Tabs for letters */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-rose-500/15">
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-[calc(100%-6rem)]">
                  {letters.map((letItem, idx) => (
                    <button
                      key={letItem.id}
                      onClick={() => {
                        setSelectedLetterIndex(idx);
                        setIsOpenEnvelope(true);
                      }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                        selectedLetterIndex === idx
                          ? 'bg-rose-500/25 text-rose-200 border border-rose-500/30'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {letItem.senderName} ➔ {letItem.receiverName}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsWriteLetterModal(true)}
                  className="px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-950/40 border border-rose-500/25 rounded-lg hover:bg-rose-900/40 transition-colors flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Viết thư</span>
                </button>
              </div>

              {/* Envelope / Letter Paper */}
              {!isOpenEnvelope ? (
                /* Closed Envelope with Wax Seal */
                <div
                  onClick={() => setIsOpenEnvelope(true)}
                  className="relative cursor-pointer aspect-16/10 rounded-2xl bg-gradient-to-br from-amber-950/40 to-rose-950/40 border-2 border-dashed border-rose-500/30 flex flex-col items-center justify-center p-8 group hover:border-rose-400/50 transition-all shadow-inner"
                >
                  <Mail className="w-12 h-12 text-rose-400 mb-3 group-hover:scale-110 transition-transform" />
                  <div className="relative">
                    {/* Golden Wax Seal */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-rose-700 flex items-center justify-center text-white font-serif font-bold shadow-lg shadow-rose-950/80 border-2 border-amber-300/40 animate-pulse">
                      V ❤️ Y
                    </div>
                  </div>
                  <span className="mt-4 text-xs text-rose-200 font-medium tracking-wider uppercase">
                    Bấm để mở thư tình
                  </span>
                </div>
              ) : (
                /* Open Handwritten Letter */
                <div className="relative bg-[#fffdfa] text-neutral-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-amber-200/50 min-h-[380px] flex flex-col justify-between">
                  {/* Subtle paper texture line */}
                  <div className="absolute top-3 right-4 text-[11px] font-mono text-neutral-400">
                    {currentLetter.date}
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-widest text-rose-700 font-semibold mb-1">
                      Thư Từ: {currentLetter.senderName}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 border-b border-rose-100 pb-2 mb-4">
                      {currentLetter.title}
                    </h3>

                    <div className="font-script text-lg sm:text-xl text-neutral-800 leading-relaxed whitespace-pre-line">
                      {currentLetter.content}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-rose-100 flex items-center justify-between text-xs text-neutral-500">
                    <span>Gửi đến: <strong className="text-rose-700">{currentLetter.receiverName}</strong></span>
                    <button
                      onClick={() => setIsOpenEnvelope(false)}
                      className="text-neutral-500 hover:text-rose-700 underline text-xs"
                    >
                      Gấp lại phong bì
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Column 2: Wish Bottle / Jar (5 cols) */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/20 shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-rose-500/15">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h3 className="text-base font-serif font-bold text-white">
                    Bình Điều Ước Tình Yêu
                  </h3>
                </div>

                <button
                  onClick={() => setIsAddWishModal(true)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg hover:from-rose-600 transition-all flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ước nguyện</span>
                </button>
              </div>

              <p className="text-xs text-neutral-400 mb-4">
                Những ước mơ và lời hẹn ước mà Hoài Vũ & Hải Yến cùng nhau vun đắp. Bấm vào vòng tròn để đánh dấu điều ước đã hoàn thành.
              </p>

              {/* Wishes List */}
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {wishes.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-rose-500/30 transition-all flex items-start gap-3 group"
                  >
                    <button
                      onClick={() => onToggleWish(item.id)}
                      className="mt-0.5 text-rose-400 hover:scale-110 transition-transform shrink-0"
                      title={item.isFulfilled ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
                    >
                      {item.isFulfilled ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                      ) : (
                        <Circle className="w-4 h-4 text-neutral-500" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs leading-relaxed ${
                          item.isFulfilled
                            ? 'line-through text-neutral-500'
                            : 'text-neutral-200'
                        }`}
                      >
                        {item.content}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-neutral-500">
                        <span style={{ color: item.color }} className="font-medium">
                          {item.author}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.date}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteWish(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-rose-400 p-1 transition-opacity"
                      title="Xóa điều ước"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Write Letter Modal */}
      {isWriteLetterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-rose-500/30 shadow-2xl relative">
            <h3 className="text-lg font-serif font-bold text-white mb-4">
              Viết Thư Tình Gửi Người Thương
            </h3>

            <form onSubmit={handleCreateLetter} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Người gửi *
                  </label>
                  <select
                    value={sender}
                    onChange={(e) => setSender(e.target.value as 'boy' | 'girl')}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="boy">Hoài Vũ gửi Hải Yến</option>
                    <option value="girl">Hải Yến gửi Hoài Vũ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Tiêu đề thư *
                  </label>
                  <input
                    type="text"
                    required
                    value={letterTitle}
                    onChange={(e) => setLetterTitle(e.target.value)}
                    placeholder="Ví dụ: Gửi em một ngày bình yên..."
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Nội dung thư tình *
                </label>
                <textarea
                  required
                  rows={6}
                  value={letterContent}
                  onChange={(e) => setLetterContent(e.target.value)}
                  placeholder="Viết những lời chân thành, ngọt ngào nhất gửi đến người ấy..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500 font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsWriteLetterModal(false)}
                  className="px-4 py-2 text-neutral-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg hover:from-rose-600 transition-all flex items-center gap-1.5 shadow-md shadow-rose-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi Thư Tình</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Wish Modal */}
      {isAddWishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-rose-500/30 shadow-2xl relative">
            <h3 className="text-lg font-serif font-bold text-white mb-4">
              Thả Điều Ước Vào Bình Thủy Tinh
            </h3>

            <form onSubmit={handleCreateWish} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Ai là người ước?
                </label>
                <select
                  value={wishAuthor}
                  onChange={(e) => setWishAuthor(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                >
                  <option value={couple.nameBoy}>{couple.nameBoy}</option>
                  <option value={couple.nameGirl}>{couple.nameGirl}</option>
                  <option value="Hai đứa mình">Cả hai đứa mình</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Điều ước của bạn *
                </label>
                <textarea
                  required
                  rows={3}
                  value={wishContent}
                  onChange={(e) => setWishContent(e.target.value)}
                  placeholder="Ví dụ: Cùng nhau đón giao thừa năm nay..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Màu sắc giấy ước
                </label>
                <div className="flex items-center gap-2">
                  {['#f43f5e', '#ec4899', '#8b5cf6', '#f59e0b', '#10b981', '#3b82f6'].map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setWishColor(c)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        wishColor === c ? 'scale-125 border-white' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsAddWishModal(false)}
                  className="px-4 py-2 text-neutral-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg hover:from-rose-600 transition-all shadow-md shadow-rose-500/20"
                >
                  Thả Vào Bình
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
