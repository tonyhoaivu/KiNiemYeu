import React, { useState } from 'react';
import { X, Save, Image as ImageIcon, Calendar } from 'lucide-react';
import { CoupleInfo } from '../types';

interface EditCoupleModalProps {
  couple: CoupleInfo;
  onSave: (updated: CoupleInfo) => void;
  onClose: () => void;
}

export const EditCoupleModal: React.FC<EditCoupleModalProps> = ({
  couple,
  onSave,
  onClose,
}) => {
  const [nameBoy, setNameBoy] = useState(couple.nameBoy);
  const [nameGirl, setNameGirl] = useState(couple.nameGirl);
  const [photoBoy, setPhotoBoy] = useState(couple.photoBoy);
  const [photoGirl, setPhotoGirl] = useState(couple.photoGirl);
  const [startDate, setStartDate] = useState(couple.startDate.split('T')[0]);
  const [bioBoy, setBioBoy] = useState(couple.bioBoy);
  const [bioGirl, setBioGirl] = useState(couple.bioGirl);
  const [motto, setMotto] = useState(couple.motto);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'boy' | 'girl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (target === 'boy') setPhotoBoy(reader.result as string);
        else setPhotoGirl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      nameBoy,
      nameGirl,
      photoBoy,
      photoGirl,
      startDate: `${startDate}T00:00:00`,
      bioBoy,
      bioGirl,
      motto,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-rose-500/30 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-500/15">
          <h3 className="text-lg font-serif font-bold text-white">
            Cài Đặt Thông Tin Đôi Ta
          </h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Start Date */}
          <div className="p-3 rounded-xl bg-neutral-900 border border-rose-500/20">
            <label className="block text-rose-300 font-semibold mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Ngày Bắt Đầu Yêu *</span>
            </label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-rose-500"
            />
            <p className="mt-1 text-[11px] text-neutral-400">
              Mặc định: 13/09/2026. Bạn có thể thay đổi ngày kỷ niệm theo ý muốn.
            </p>
          </div>

          {/* Boy Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                Tên chàng trai *
              </label>
              <input
                type="text"
                required
                value={nameBoy}
                onChange={(e) => setNameBoy(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                Ảnh đại diện chàng trai
              </label>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer py-1.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-md transition-colors flex items-center gap-1 text-[11px]">
                  <ImageIcon className="w-3 h-3 text-rose-400" />
                  <span>Tải ảnh</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePhotoUpload(e, 'boy')}
                  />
                </label>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 shrink-0">
                  <img src={photoBoy} alt={nameBoy} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-neutral-300 font-medium mb-1">
                Lời giới thiệu ngắn chàng trai
              </label>
              <input
                type="text"
                value={bioBoy}
                onChange={(e) => setBioBoy(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Girl Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                Tên cô gái *
              </label>
              <input
                type="text"
                required
                value={nameGirl}
                onChange={(e) => setNameGirl(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                Ảnh đại diện cô gái
              </label>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer py-1.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-md transition-colors flex items-center gap-1 text-[11px]">
                  <ImageIcon className="w-3 h-3 text-rose-400" />
                  <span>Tải ảnh</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePhotoUpload(e, 'girl')}
                  />
                </label>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 shrink-0">
                  <img src={photoGirl} alt={nameGirl} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-neutral-300 font-medium mb-1">
                Lời giới thiệu ngắn cô gái
              </label>
              <input
                type="text"
                value={bioGirl}
                onChange={(e) => setBioGirl(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Love Motto */}
          <div>
            <label className="block text-neutral-300 font-medium mb-1">
              Châm ngôn tình yêu của hai bạn
            </label>
            <input
              type="text"
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-neutral-400 hover:text-white transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg hover:from-rose-600 transition-all flex items-center gap-1.5 shadow-md shadow-rose-500/20"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu Thay Đổi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
