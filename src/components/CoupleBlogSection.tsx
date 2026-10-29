import React, { useState } from 'react';
import { Plus, Image as ImageIcon, Heart, MessageCircle, Trash2, Calendar, Smile, Send, X, ZoomIn } from 'lucide-react';
import { LovePost, CoupleInfo } from '../types';

interface CoupleBlogSectionProps {
  posts: LovePost[];
  couple: CoupleInfo;
  onAddPost: (post: Omit<LovePost, 'id' | 'likesCount' | 'comments'>) => void;
  onDeletePost: (id: string) => void;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, author: string, text: string) => void;
}

export const CoupleBlogSection: React.FC<CoupleBlogSectionProps> = ({
  posts,
  couple,
  onAddPost,
  onDeletePost,
  onToggleLike,
  onAddComment,
}) => {
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Hoài Vũ');
  const [date, setDate] = useState(new Date().toLocaleDateString('vi-VN'));
  const [mood, setMood] = useState('Hạnh phúc');
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');

  // Comment inputs per post
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: { author: string; text: string } }>({});

  const moods = [
    { label: 'Hạnh phúc', emoji: '🥰' },
    { label: 'Ngọt ngào', emoji: '🍬' },
    { label: 'Bình yên', emoji: '☕' },
    { label: 'Hẹn hò', emoji: '🌹' },
    { label: 'Du lịch', emoji: '✈️' },
    { label: 'Kỷ niệm khó quên', emoji: '✨' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setPhotos((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setPhotos((prev) => [...prev, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAddPost({
      title: title.trim(),
      author,
      date,
      mood,
      content: content.trim(),
      photos,
      isLiked: false,
    });

    setTitle('');
    setContent('');
    setPhotos([]);
    setImageUrlInput('');
    setIsNewPostModalOpen(false);
  };

  const handleSendComment = (postId: string) => {
    const input = commentInputs[postId];
    if (!input || !input.text.trim()) return;

    onAddComment(postId, input.author || couple.nameGirl, input.text.trim());
    setCommentInputs((prev) => ({
      ...prev,
      [postId]: { author: input.author || couple.nameGirl, text: '' },
    }));
  };

  const getAuthorAvatar = (authorName: string) => {
    if (authorName.includes(couple.nameBoy)) return couple.photoBoy;
    if (authorName.includes(couple.nameGirl)) return couple.photoGirl;
    return couple.photoGirl;
  };

  return (
    <section id="diary" className="py-16 md:py-24 relative border-t border-rose-500/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-rose-500/15">
          <div>
            <div className="text-xs uppercase tracking-widest text-rose-400 font-medium mb-1">
              Nhật Ký Yêu Thương
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Bài Viết & Khoảnh Khắc Đôi Ta
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Chia sẻ những dòng nhật ký, tâm sự ngọt ngào và những bức ảnh kỷ niệm cùng nhau.
            </p>
          </div>

          <button
            onClick={() => setIsNewPostModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl hover:from-rose-600 transition-all shadow-md shadow-rose-500/20 flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Ảnh & Đăng Bài Viết</span>
          </button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-8">
          {posts.map((post) => {
            const currentCommentInput = commentInputs[post.id] || { author: couple.nameBoy, text: '' };

            return (
              <article
                key={post.id}
                className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/15 shadow-xl relative overflow-hidden"
              >
                {/* Author & Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-rose-500 to-amber-300">
                      <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900">
                        <img
                          src={getAuthorAvatar(post.author)}
                          alt={post.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{post.author}</span>
                        <span className="text-[11px] font-normal text-rose-300 bg-rose-950/50 border border-rose-500/20 px-2 py-0.5 rounded-full">
                          {post.mood}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-neutral-500" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('Bạn có muốn xóa bài viết này không?')) {
                        onDeletePost(post.id);
                      }
                    }}
                    className="text-neutral-500 hover:text-rose-400 p-1.5 transition-colors"
                    title="Xóa bài viết"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Post Title & Content */}
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-3">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line mb-5">
                  {post.content}
                </p>

                {/* Photos Grid */}
                {post.photos && post.photos.length > 0 && (
                  <div
                    className={`grid gap-3 mb-6 ${
                      post.photos.length === 1
                        ? 'grid-cols-1'
                        : post.photos.length === 2
                        ? 'grid-cols-2'
                        : 'grid-cols-2 sm:grid-cols-3'
                    }`}
                  >
                    {post.photos.map((photoUrl, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedPhoto(photoUrl)}
                        className="relative group aspect-4/3 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer"
                      >
                        <img
                          src={photoUrl}
                          alt={`Kỷ niệm ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ZoomIn className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Interactions: Likes & Comments */}
                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => onToggleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                        post.isLiked
                          ? 'text-rose-400 bg-rose-950/40 border border-rose-500/30'
                          : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          post.isLiked ? 'fill-rose-500 text-rose-500 animate-heart-beat' : ''
                        }`}
                      />
                      <span className="font-semibold">{post.likesCount}</span>
                      <span>Yêu thích</span>
                    </button>

                    <span className="text-neutral-400 flex items-center gap-1">
                      <MessageCircle className="w-4 h-4 text-neutral-500" />
                      <span>{post.comments ? post.comments.length : 0} Lời nhắn</span>
                    </span>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-4 pt-3 border-t border-neutral-900 space-y-2">
                  {post.comments && post.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-xs flex items-start gap-2.5"
                    >
                      <span className="font-semibold text-rose-300 shrink-0">
                        {comment.author}:
                      </span>
                      <span className="text-neutral-200 flex-1 whitespace-pre-line">
                        {comment.text}
                      </span>
                      <span className="text-[10px] text-neutral-500 shrink-0">
                        {comment.date}
                      </span>
                    </div>
                  ))}

                  {/* Add comment bar */}
                  <div className="pt-2 flex items-center gap-2">
                    <select
                      value={currentCommentInput.author}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [post.id]: { ...currentCommentInput, author: e.target.value },
                        }))
                      }
                      className="bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500 shrink-0"
                    >
                      <option value={couple.nameBoy}>{couple.nameBoy}</option>
                      <option value={couple.nameGirl}>{couple.nameGirl}</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Viết lời nhắn gửi người ấy..."
                      value={currentCommentInput.text}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [post.id]: { ...currentCommentInput, text: e.target.value },
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendComment(post.id);
                        }
                      }}
                      className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                    />

                    <button
                      onClick={() => handleSendComment(post.id)}
                      className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-colors"
                      title="Gửi lời nhắn"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </article>
            );
          })}
        </div>

      </div>

      {/* New Post Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-rose-500/30 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-500/15">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-rose-400" />
                <span>Thêm Ảnh & Đăng Bài Viết Yêu Thương</span>
              </h3>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitPost} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Tiêu đề bài viết *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Một chiều thu lang thang cùng em..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Người viết *
                  </label>
                  <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value={couple.nameBoy}>{couple.nameBoy}</option>
                    <option value={couple.nameGirl}>{couple.nameGirl}</option>
                    <option value="Hai đứa mình">Hai đứa mình</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Ngày tháng
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Cảm xúc
                  </label>
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  >
                    {moods.map((m) => (
                      <option key={m.label} value={m.label}>
                        {m.emoji} {m.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Photos upload area */}
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                <label className="block text-neutral-300 font-semibold mb-2">
                  Hình ảnh kỷ niệm (Có thể thêm nhiều ảnh)
                </label>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <label className="cursor-pointer py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl transition-colors flex items-center gap-1.5 shrink-0">
                    <ImageIcon className="w-4 h-4 text-rose-400" />
                    <span>Chọn ảnh từ máy</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>

                  <div className="flex-1 flex items-center gap-1.5 min-w-[200px]">
                    <input
                      type="text"
                      placeholder="Hoặc dán URL ảnh..."
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      className="flex-1 bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-rose-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl transition-colors shrink-0"
                    >
                      Thêm
                    </button>
                  </div>
                </div>

                {/* Uploaded thumbnails */}
                {photos.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-2 border-t border-neutral-800">
                    {photos.map((p, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-neutral-700 group">
                        <img src={p} alt={`Uploaded ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(idx)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                          title="Xóa ảnh này"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Nội dung bài viết / Dòng tâm sự *
                </label>
                <textarea
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ghi lại những khoảnh khắc, cảm xúc ngọt ngào của ngày hôm nay..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500 font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-4 py-2 text-neutral-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl hover:from-rose-600 transition-all shadow-md shadow-rose-500/20"
                >
                  Đăng Bài Viết
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Lightbox photo viewer */}
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
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[80vh] flex items-center justify-center bg-black">
              <img
                src={selectedPhoto}
                alt="Enlarged"
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
