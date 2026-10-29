import React, { useState } from 'react';
import { Plus, X, Heart, ZoomIn, Trash2, Camera } from 'lucide-react';
import { PhotoMemory } from '../types';

interface PhotoGalleryProps {
  photos: PhotoMemory[];
  onAddPhoto: (photo: Omit<PhotoMemory, 'id'>) => void;
  onDeletePhoto: (id: string) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  onAddPhoto,
  onDeletePhoto,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('2026');
  const [author, setAuthor] = useState('Hoài Vũ & Hải Yến');
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

    onAddPhoto({
      url: imageUrl,
      title: title || 'Khoảnh khắc yêu thương',
      caption: caption || 'Bên em là bình yên',
      date: date || '2026',
      author: author || 'Đôi ta',
    });

    setTitle('');
    setCaption('');
    setImageUrl('');
    setIsAddModalOpen(false);
  };

  return (
    <section id="gallery" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-rose-500/15">
          <div>
            <div className="text-xs uppercase tracking-widest text-rose-400 font-medium mb-1">
              Góc Kỷ Niệm
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Album Ảnh Đôi Ta
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Mỗi bức hình là một mảnh ghép thanh xuân rạng rỡ của Hoài Vũ và Hải Yến.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all shadow-md shadow-rose-500/20 flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>Thêm Ảnh Mới</span>
          </button>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {photos.map((item, index) => {
            // Slight vintage tilt for aesthetic polaroid effect
            const tilts = ['-rotate-1', 'rotate-1', 'rotate-0', 'rotate-2', '-rotate-2'];
            const tilt = tilts[index % tilts.length];

            return (
              <div
                key={item.id}
                className={`group relative bg-neutral-900 border border-rose-500/15 p-3 rounded-2xl shadow-xl hover:shadow-rose-900/20 transition-all duration-300 hover:-translate-y-1.5 ${tilt} hover:rotate-0`}
              >
                {/* Photo frame */}
                <div
                  onClick={() => setSelectedPhoto(item)}
                  className="relative w-full aspect-4/5 overflow-hidden rounded-xl bg-neutral-950 cursor-pointer"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs text-rose-200 flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Xem chi tiết</span>
                    </span>
                  </div>
                </div>

                {/* Caption / Polaroid notes */}
                <div className="pt-3 pb-1 px-1">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                    <span className="font-medium text-white">{item.title}</span>
                    <span className="font-mono text-[11px] text-rose-300">{item.date}</span>
                  </div>
                  <p className="font-script text-base text-rose-200/90 leading-tight">
                    {item.caption}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-500">
                    <span>{item.author}</span>
                    {photos.length > 2 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Xóa ảnh này khỏi album?')) {
                            onDeletePhoto(item.id);
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-rose-400 transition-opacity p-1"
                        title="Xóa ảnh"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-neutral-900 border border-rose-500/30 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-5 bg-neutral-900 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-base font-serif font-bold text-white">
                  {selectedPhoto.title}
                </h4>
                <span className="text-xs font-mono text-rose-300">
                  {selectedPhoto.date}
                </span>
              </div>
              <p className="font-script text-lg text-rose-200">
                "{selectedPhoto.caption}"
              </p>
              <div className="mt-2 text-xs text-neutral-400">
                Chụp bởi: {selectedPhoto.author}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Photo Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-rose-500/30 shadow-2xl relative">
            <h3 className="text-lg font-serif font-bold text-white mb-4">
              Thêm Ảnh Kỷ Niệm Mới
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Chọn ảnh *
                </label>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors flex items-center gap-1.5 shrink-0">
                    <Camera className="w-3.5 h-3.5 text-rose-400" />
                    <span>Tải ảnh lên</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Hoặc dán link ảnh..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                {imageUrl && (
                  <div className="mt-2 w-24 h-28 rounded-lg overflow-hidden border border-neutral-700">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Tiêu đề ảnh
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Nụ cười ngày nắng..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Lời nhắn gửi / Chú thích ngọt ngào
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Ví dụ: Khoảnh khắc em đẹp nhất..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Năm / Ngày chụp
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="2026"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Người chụp / Tác giả
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Hoài Vũ / Hải Yến"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-neutral-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={!imageUrl}
                  className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all shadow-md shadow-rose-500/20 disabled:opacity-50"
                >
                  Lưu Vào Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
