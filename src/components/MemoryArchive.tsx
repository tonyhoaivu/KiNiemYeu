import React, { useState } from 'react';
import { Calendar, MapPin, Plus, Trash2, Edit3, Image as ImageIcon, Search } from 'lucide-react';
import { MemoryItem } from '../types';

interface MemoryArchiveProps {
  memories: MemoryItem[];
  onAddMemory: (memory: Omit<MemoryItem, 'id'>) => void;
  onDeleteMemory: (id: string) => void;
  onEditMemory: (id: string, updated: Partial<MemoryItem>) => void;
}

export const MemoryArchive: React.FC<MemoryArchiveProps> = ({
  memories,
  onAddMemory,
  onDeleteMemory,
  onEditMemory,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('2026-09-11');
  const [formLocation, setFormLocation] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState<MemoryItem['category']>('dating');
  const [formImage, setFormImage] = useState('');

  const openNewModal = () => {
    setEditingId(null);
    setFormTitle('');
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormLocation('');
    setFormDescription('');
    setFormCategory('dating');
    setFormImage('');
    setIsModalOpen(true);
  };

  const openEditModal = (mem: MemoryItem) => {
    setEditingId(mem.id);
    setFormTitle(mem.title);
    setFormDate(mem.date);
    setFormLocation(mem.location || '');
    setFormDescription(mem.description);
    setFormCategory(mem.category);
    setFormImage(mem.imageUrl || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingId) {
      onEditMemory(editingId, {
        title: formTitle,
        date: formDate,
        location: formLocation,
        description: formDescription,
        category: formCategory,
        imageUrl: formImage || undefined,
      });
    } else {
      onAddMemory({
        title: formTitle,
        date: formDate,
        location: formLocation,
        description: formDescription,
        category: formCategory,
        imageUrl: formImage || undefined,
      });
    }

    setIsModalOpen(false);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Filtered memories
  const filteredMemories = memories
    .filter((m) => {
      if (filterCategory !== 'all' && m.category !== filterCategory) return false;
      if (
        searchQuery &&
        !m.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !m.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !(m.location && m.location.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getCategoryLabel = (cat: MemoryItem['category']) => {
    switch (cat) {
      case 'first':
        return 'Khoảnh Khắc Đầu Tiên';
      case 'dating':
        return 'Buổi Hẹn Hò';
      case 'trip':
        return 'Chuyến Đi Kỷ Niệm';
      case 'milestone':
        return 'Cột Mốc Tình Yêu';
      case 'anniversary':
        return 'Ngày Kỷ Niệm';
      default:
        return 'Kỷ Niệm';
    }
  };

  return (
    <section id="timeline" className="py-16 md:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-rose-500/15">
          <div>
            <div className="text-xs uppercase tracking-widest text-rose-400 font-medium mb-1">
              Nhật Ký Tình Yêu
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Dòng Kỷ Niệm Của Đôi Ta
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Lưu giữ từng khoảnh khắc ngọt ngào trên hành trình tình yêu của Hoài Vũ & Hải Yến.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={openNewModal}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all shadow-md shadow-rose-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Kỷ Niệm</span>
            </button>
          </div>
        </div>

        {/* Filter controls & Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-8">
          {/* Category tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900/90 border border-neutral-800 rounded-lg overflow-x-auto">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                filterCategory === 'all'
                  ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Tất Cả ({memories.length})
            </button>
            <button
              onClick={() => setFilterCategory('first')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                filterCategory === 'first'
                  ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Khoảnh Khắc Đầu
            </button>
            <button
              onClick={() => setFilterCategory('dating')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                filterCategory === 'dating'
                  ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Hẹn Hò
            </button>
            <button
              onClick={() => setFilterCategory('trip')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                filterCategory === 'trip'
                  ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Chuyến Đi
            </button>
            <button
              onClick={() => setFilterCategory('milestone')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                filterCategory === 'milestone'
                  ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Cột Mốc
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kỷ niệm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500/50"
            />
          </div>
        </div>

        {/* Timeline Items */}
        {filteredMemories.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-2xl p-8 border border-neutral-800">
            <p className="text-neutral-400 text-sm">Không tìm thấy kỷ niệm nào phù hợp.</p>
            <button
              onClick={openNewModal}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-300 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tạo kỷ niệm ngay</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-gradient-to-b before:from-rose-500/40 before:via-pink-500/20 before:to-transparent">
            {filteredMemories.map((mem, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={mem.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 w-4 h-4 rounded-full bg-rose-500 border-2 border-neutral-950 shadow-md shadow-rose-500/50 z-10" />

                  {/* Content Card */}
                  <div className="ml-10 md:ml-0 md:w-[calc(50%-2rem)] w-full">
                    <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-rose-500/15 relative overflow-hidden group">
                      
                      {/* Photo if provided */}
                      {mem.imageUrl && (
                        <div className="w-full h-44 rounded-xl overflow-hidden mb-4 bg-neutral-900 border border-neutral-800">
                          <img
                            src={mem.imageUrl}
                            alt={mem.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      {/* Unboxed Metadata Header */}
                      <div className="flex items-center gap-2 text-xs text-rose-300/80 mb-2">
                        <span className="font-medium">{getCategoryLabel(mem.category)}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3 text-rose-400" />
                          {mem.date}
                        </span>
                        {mem.location && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-1 text-neutral-400">
                              <MapPin className="w-3 h-3 text-amber-400" />
                              {mem.location}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-serif font-bold text-white group-hover:text-rose-200 transition-colors">
                        {mem.title}
                      </h3>

                      {/* Story */}
                      <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                        {mem.description}
                      </p>

                      {/* Actions */}
                      <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditModal(mem)}
                          className="p-1.5 text-neutral-400 hover:text-white rounded-md transition-colors"
                          title="Sửa kỷ niệm"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Bạn có chắc muốn xóa kỷ niệm này không?')) {
                              onDeleteMemory(mem.id);
                            }
                          }}
                          className="p-1.5 text-neutral-400 hover:text-rose-400 rounded-md transition-colors"
                          title="Xóa kỷ niệm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-rose-500/30 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-serif font-bold text-white mb-4">
              {editingId ? 'Chỉnh Sửa Kỷ Niệm' : 'Thêm Kỷ Niệm Yêu Thương'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Tiêu đề kỷ niệm *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ví dụ: Lần đầu tiên hẹn hò ở quán cà phê..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Ngày diễn ra *
                  </label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Phân loại
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as MemoryItem['category'])}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="first">Khoảnh khắc đầu tiên</option>
                    <option value="dating">Buổi hẹn hò</option>
                    <option value="trip">Chuyến đi kỷ niệm</option>
                    <option value="milestone">Cột mốc tình yêu</option>
                    <option value="anniversary">Kỷ niệm</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Địa điểm (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="Ví dụ: Hồ Gươm, Hà Nội"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Hình ảnh kỷ niệm (Tùy chọn)
                </label>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors flex items-center gap-1.5 shrink-0">
                    <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
                    <span>Chọn ảnh từ máy</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageFileChange}
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Hoặc dán URL ảnh..."
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                {formImage && (
                  <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-neutral-700">
                    <img src={formImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Câu chuyện & Cảm xúc *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Ghi lại những khoảnh khắc, cảm xúc ngọt ngào khi ấy..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-neutral-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all shadow-md shadow-rose-500/20"
                >
                  {editingId ? 'Cập Nhật' : 'Lưu Kỷ Niệm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
