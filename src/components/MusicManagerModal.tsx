import React, { useState, useRef } from 'react';
import { X, Music2, Upload, Link2, Play, Pause, Trash2, Volume2, VolumeX, Sparkles, Check, Disc } from 'lucide-react';
import { SongTrack } from '../types';
import { romanticAudio } from '../utils/audioEngine';

interface MusicManagerModalProps {
  playlist: SongTrack[];
  currentTrack: SongTrack | null;
  isPlaying: boolean;
  onSelectTrack: (track: SongTrack) => void;
  onAddCustomTrack: (track: SongTrack) => void;
  onDeleteCustomTrack: (id: string) => void;
  onClose: () => void;
}

export const MusicManagerModal: React.FC<MusicManagerModalProps> = ({
  playlist,
  currentTrack,
  isPlaying,
  onSelectTrack,
  onAddCustomTrack,
  onDeleteCustomTrack,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'upload' | 'url'>('presets');
  
  // Upload form state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadArtist, setUploadArtist] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // URL form state
  const [urlTitle, setUrlTitle] = useState('');
  const [urlArtist, setUrlArtist] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  // Volume state
  const [volume, setVolume] = useState(romanticAudio.getVolume());
  const [isMuted, setIsMuted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!uploadTitle) {
        setUploadTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    const newTrack = romanticAudio.playCustomFile(selectedFile, uploadTitle || selectedFile.name);
    if (uploadArtist) {
      newTrack.artist = uploadArtist;
    }
    onAddCustomTrack(newTrack);

    setSelectedFile(null);
    setUploadTitle('');
    setUploadArtist('');
    setActiveTab('presets');
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioUrl.trim()) return;

    const newTrack: SongTrack = {
      id: `url-${Date.now()}`,
      title: urlTitle.trim() || 'Giai điệu trực tuyến',
      artist: urlArtist.trim() || 'Link nhạc',
      type: 'url',
      audioUrl: audioUrl.trim(),
      duration: 'Trực tuyến',
    };

    romanticAudio.playAudioSource(newTrack.audioUrl!, newTrack);
    onAddCustomTrack(newTrack);

    setAudioUrl('');
    setUrlTitle('');
    setUrlArtist('');
    setActiveTab('presets');
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val);
    setIsMuted(val === 0);
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

  const presetTracks = playlist.filter((t) => t.type === 'synth');
  const customTracks = playlist.filter((t) => t.type !== 'synth');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-rose-500/30 shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-500/15">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md shadow-rose-500/30">
              <Music2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">
                Thay Đổi & Chọn Nhạc Nền
              </h3>
              <p className="text-xs text-rose-300/80">
                Lựa chọn giai điệu lãng mạn hoặc tải lên bài hát yêu thích của hai bạn
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Currently playing banner */}
        <div className="my-4 p-3.5 rounded-2xl bg-neutral-900/90 border border-rose-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-9 h-9 rounded-full bg-neutral-800 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <Disc className="w-5 h-5" />
            </div>
            <div className="truncate">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                {isPlaying ? 'Đang phát' : 'Đang tạm dừng'}
              </span>
              <span className="text-xs font-semibold text-white truncate block">
                {currentTrack?.title || 'Chưa chọn bài hát'}
              </span>
              <span className="text-[11px] text-rose-300 truncate block">
                {currentTrack?.artist || 'Hoài Vũ & Hải Yến'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleMute}
              className="text-neutral-400 hover:text-white p-1.5 transition-colors"
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
              className="w-16 h-1 accent-rose-500 bg-neutral-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-xl border border-neutral-800 mb-4">
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'presets'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Kho Nhạc Lãng Mạn ({presetTracks.length})
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === 'upload'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Tải Nhạc Lên</span>
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === 'url'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Dán Link Nhạc</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {activeTab === 'presets' && (
            <div className="space-y-2">
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium px-1">
                Giai Điệu Có Sẵn (Không cần mạng, phát mượt mà)
              </div>
              {presetTracks.map((track) => {
                const isCurrent = currentTrack?.id === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => onSelectTrack(track)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isCurrent && isPlaying
                        ? 'bg-rose-950/40 border-rose-500/50 shadow-md shadow-rose-950/40'
                        : 'bg-neutral-900/60 border-neutral-800 hover:border-rose-500/30 hover:bg-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                          isCurrent && isPlaying
                            ? 'bg-rose-500 text-white'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {isCurrent && isPlaying ? (
                          <Pause className="w-3.5 h-3.5 fill-white" />
                        ) : (
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">
                          {track.title}
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          {track.artist} · <span className="text-rose-300 font-mono">{track.duration}</span>
                        </div>
                      </div>
                    </div>

                    {isCurrent && (
                      <span className="text-xs font-medium text-rose-300 flex items-center gap-1 bg-rose-900/30 px-2 py-0.5 rounded-md border border-rose-500/20">
                        <Check className="w-3.5 h-3.5 text-rose-400" />
                        <span>Đang chọn</span>
                      </span>
                    )}
                  </div>
                );
              })}

              {/* Custom songs section if exists */}
              {customTracks.length > 0 && (
                <div className="pt-4 border-t border-neutral-800 space-y-2">
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium px-1">
                    Bài Hát Của Bạn Đã Tải Lên ({customTracks.length})
                  </div>
                  {customTracks.map((track) => {
                    const isCurrent = currentTrack?.id === track.id;
                    return (
                      <div
                        key={track.id}
                        className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                          isCurrent && isPlaying
                            ? 'bg-rose-950/40 border-rose-500/50'
                            : 'bg-neutral-900/60 border-neutral-800 hover:border-rose-500/30'
                        }`}
                      >
                        <div
                          onClick={() => onSelectTrack(track)}
                          className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                              isCurrent && isPlaying
                                ? 'bg-rose-500 text-white'
                                : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {isCurrent && isPlaying ? (
                              <Pause className="w-3.5 h-3.5 fill-white" />
                            ) : (
                              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            )}
                          </div>
                          <div className="truncate">
                            <div className="text-xs font-semibold text-white truncate">
                              {track.title}
                            </div>
                            <div className="text-[11px] text-neutral-400 truncate">
                              {track.artist}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => onDeleteCustomTrack(track.id)}
                          className="p-1.5 text-neutral-500 hover:text-rose-400 rounded-lg hover:bg-neutral-800 transition-colors ml-2"
                          title="Xóa bài hát này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'upload' && (
            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div className="p-6 rounded-2xl border-2 border-dashed border-rose-500/30 bg-neutral-900/40 text-center flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-rose-400 mb-2" />
                <span className="text-xs font-medium text-white mb-1">
                  {selectedFile ? selectedFile.name : 'Chọn tập tin âm thanh (.mp3, .m4a, .wav)'}
                </span>
                <span className="text-[11px] text-neutral-400 mb-3">
                  Tải lên bài hát kỷ niệm của hai bạn trực tiếp từ thiết bị
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="audio/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-medium transition-colors cursor-pointer"
                >
                  Duyệt file từ máy
                </button>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Tên bài hát
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="Ví dụ: Perfect, Ánh Nắng Của Anh..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Ca sĩ / Người thể hiện
                </label>
                <input
                  type="text"
                  value={uploadArtist}
                  onChange={(e) => setUploadArtist(e.target.value)}
                  placeholder="Ví dụ: Ed Sheeran, Đức Phúc..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedFile}
                className="w-full py-2.5 font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl hover:from-rose-600 transition-all shadow-md shadow-rose-500/20 disabled:opacity-50 cursor-pointer"
              >
                Tải Lên & Bật Bài Này Ngay
              </button>
            </form>
          )}

          {activeTab === 'url' && (
            <form onSubmit={handleUrlSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Đường dẫn link âm thanh (Direct audio URL) *
                </label>
                <input
                  type="url"
                  required
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  placeholder="https://example.com/song.mp3"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Tên bài hát
                  </label>
                  <input
                    type="text"
                    value={urlTitle}
                    onChange={(e) => setUrlTitle(e.target.value)}
                    placeholder="Tên bài hát..."
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Ca sĩ / Nghệ sĩ
                  </label>
                  <input
                    type="text"
                    value={urlArtist}
                    onChange={(e) => setUrlArtist(e.target.value)}
                    placeholder="Ca sĩ..."
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!audioUrl.trim()}
                className="w-full py-2.5 font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl hover:from-rose-600 transition-all shadow-md shadow-rose-500/20 disabled:opacity-50 cursor-pointer"
              >
                Thêm & Phát Nhạc Từ Link
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span>Tự động phát lặp lại bài đã chọn</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
