import React, { useState, useEffect } from 'react';
import { SparkleCanvas } from './components/SparkleCanvas';
import { Navbar } from './components/Navbar';
import { HeroLoveCounter } from './components/HeroLoveCounter';
import { CoupleBlogSection } from './components/CoupleBlogSection';
import { MemoryArchive } from './components/MemoryArchive';
import { PhotoGallery } from './components/PhotoGallery';
import { LoveLetters } from './components/LoveLetters';
import { MilestonesSection } from './components/MilestonesSection';
import { MusicPlayerBar } from './components/MusicPlayerBar';
import { MusicManagerModal } from './components/MusicManagerModal';
import { EditCoupleModal } from './components/EditCoupleModal';
import { LoveCardModal } from './components/LoveCardModal';
import { romanticAudio } from './utils/audioEngine';
import {
  DEFAULT_COUPLE,
  DEFAULT_MEMORIES,
  DEFAULT_LETTERS,
  DEFAULT_WISHES,
  DEFAULT_PHOTOS,
  DEFAULT_POSTS,
  PLAYLIST,
  calculateLoveDuration,
} from './utils/loveCalculations';
import { CoupleInfo, MemoryItem, LoveLetter, WishItem, PhotoMemory, LovePost, SongTrack } from './types';
import { Heart } from 'lucide-react';

export default function App() {
  // LocalStorage state initialization
  const [couple, setCouple] = useState<CoupleInfo>(() => {
    try {
      const saved = localStorage.getItem('love_couple_info');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Automatic migration if saved date was previously 11/09/2026
        if (parsed.startDate === '2026-09-11T00:00:00') {
          parsed.startDate = '2026-09-13T00:00:00';
        }
        return { ...DEFAULT_COUPLE, ...parsed };
      }
      return DEFAULT_COUPLE;
    } catch {
      return DEFAULT_COUPLE;
    }
  });

  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('love_memories');
      return saved ? JSON.parse(saved) : DEFAULT_MEMORIES;
    } catch {
      return DEFAULT_MEMORIES;
    }
  });

  const [posts, setPosts] = useState<LovePost[]>(() => {
    try {
      const saved = localStorage.getItem('love_couple_posts');
      return saved ? JSON.parse(saved) : DEFAULT_POSTS;
    } catch {
      return DEFAULT_POSTS;
    }
  });

  const [letters, setLetters] = useState<LoveLetter[]>(() => {
    try {
      const saved = localStorage.getItem('love_letters');
      return saved ? JSON.parse(saved) : DEFAULT_LETTERS;
    } catch {
      return DEFAULT_LETTERS;
    }
  });

  const [wishes, setWishes] = useState<WishItem[]>(() => {
    try {
      const saved = localStorage.getItem('love_wishes');
      return saved ? JSON.parse(saved) : DEFAULT_WISHES;
    } catch {
      return DEFAULT_WISHES;
    }
  });

  const [photos, setPhotos] = useState<PhotoMemory[]>(() => {
    try {
      const saved = localStorage.getItem('love_photos');
      return saved ? JSON.parse(saved) : DEFAULT_PHOTOS;
    } catch {
      return DEFAULT_PHOTOS;
    }
  });

  // Music state & playlist
  const [playlist, setPlaylist] = useState<SongTrack[]>(() => {
    try {
      const saved = localStorage.getItem('love_playlist');
      return saved ? JSON.parse(saved) : PLAYLIST;
    } catch {
      return PLAYLIST;
    }
  });

  const [currentTrack, setCurrentTrack] = useState<SongTrack>(() => playlist[0] || PLAYLIST[0]);

  // Real-time ticking duration
  const [duration, setDuration] = useState(() => calculateLoveDuration(couple.startDate));
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundMode, setBackgroundMode] = useState<'stars' | 'petals' | 'hearts'>('stars');
  const [activeSection, setActiveSection] = useState('hero');

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isMusicManagerOpen, setIsMusicManagerOpen] = useState(false);

  // Sync couple to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('love_couple_info', JSON.stringify(couple));
    } catch {
      // Ignore
    }
  }, [couple]);

  // Sync memories
  useEffect(() => {
    try {
      localStorage.setItem('love_memories', JSON.stringify(memories));
    } catch {
      // Ignore
    }
  }, [memories]);

  // Sync posts
  useEffect(() => {
    try {
      localStorage.setItem('love_couple_posts', JSON.stringify(posts));
    } catch {
      // Ignore
    }
  }, [posts]);

  // Sync letters
  useEffect(() => {
    try {
      localStorage.setItem('love_letters', JSON.stringify(letters));
    } catch {
      // Ignore
    }
  }, [letters]);

  // Sync wishes
  useEffect(() => {
    try {
      localStorage.setItem('love_wishes', JSON.stringify(wishes));
    } catch {
      // Ignore
    }
  }, [wishes]);

  // Sync photos
  useEffect(() => {
    try {
      localStorage.setItem('love_photos', JSON.stringify(photos));
    } catch {
      // Ignore
    }
  }, [photos]);

  // Sync playlist
  useEffect(() => {
    try {
      localStorage.setItem('love_playlist', JSON.stringify(playlist));
    } catch {
      // Ignore
    }
  }, [playlist]);

  // Real-time counter ticker every 1000ms
  useEffect(() => {
    const update = () => {
      setDuration(calculateLoveDuration(couple.startDate));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [couple.startDate]);

  // Audio playing subscriber
  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((playing, track) => {
      setIsPlaying(playing);
      if (track) {
        setCurrentTrack(track);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggleMusic = () => {
    romanticAudio.togglePlay(currentTrack);
  };

  const handleSelectTrack = (track: SongTrack) => {
    setCurrentTrack(track);
    romanticAudio.playTrack(track);
  };

  const handleAddCustomTrack = (track: SongTrack) => {
    setPlaylist((prev) => [track, ...prev]);
    setCurrentTrack(track);
  };

  const handleDeleteCustomTrack = (id: string) => {
    setPlaylist((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Blog Post operations (Add photo & post article)
  const handleAddPost = (newPost: Omit<LovePost, 'id' | 'likesCount' | 'comments'>) => {
    const item: LovePost = {
      ...newPost,
      id: `post-${Date.now()}`,
      likesCount: 1,
      comments: [],
    };
    setPosts((prev) => [item, ...prev]);
  };

  const handleDeletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          const likesCount = isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1);
          return { ...p, isLiked, likesCount };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string, author: string, text: string) => {
    const commentItem = {
      id: `c-${Date.now()}`,
      author,
      text,
      date: new Date().toLocaleDateString('vi-VN'),
    };
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...(p.comments || []), commentItem] } : p
      )
    );
  };

  // Memory operations
  const handleAddMemory = (newMem: Omit<MemoryItem, 'id'>) => {
    const item: MemoryItem = {
      ...newMem,
      id: `mem-${Date.now()}`,
    };
    setMemories((prev) => [item, ...prev]);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const handleEditMemory = (id: string, updated: Partial<MemoryItem>) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
  };

  // Letter operations
  const handleAddLetter = (newLet: Omit<LoveLetter, 'id'>) => {
    const item: LoveLetter = {
      ...newLet,
      id: `let-${Date.now()}`,
    };
    setLetters((prev) => [...prev, item]);
  };

  // Wish operations
  const handleAddWish = (newWish: Omit<WishItem, 'id'>) => {
    const item: WishItem = {
      ...newWish,
      id: `wish-${Date.now()}`,
    };
    setWishes((prev) => [item, ...prev]);
  };

  const handleToggleWish = (id: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isFulfilled: !w.isFulfilled } : w))
    );
  };

  const handleDeleteWish = (id: string) => {
    setWishes((prev) => prev.filter((w) => w.id !== id));
  };

  // Photo operations
  const handleAddPhoto = (newPhoto: Omit<PhotoMemory, 'id'>) => {
    const item: PhotoMemory = {
      ...newPhoto,
      id: `photo-${Date.now()}`,
    };
    setPhotos((prev) => [item, ...prev]);
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Sparkling Ambient Background */}
      <SparkleCanvas mode={backgroundMode} />

      {/* Top Bar Navigation */}
      <Navbar
        isPlaying={isPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenMusicManager={() => setIsMusicManagerOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCardModal={() => setIsCardModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        <HeroLoveCounter
          couple={couple}
          duration={duration}
          onOpenEditModal={() => setIsEditModalOpen(true)}
          backgroundMode={backgroundMode}
          onChangeBackgroundMode={setBackgroundMode}
          onOpenCardModal={() => setIsCardModalOpen(true)}
        />

        {/* Feature: Thêm ảnh đăng bài viết & Nhật ký yêu thương */}
        <CoupleBlogSection
          posts={posts}
          couple={couple}
          onAddPost={handleAddPost}
          onDeletePost={handleDeletePost}
          onToggleLike={handleToggleLike}
          onAddComment={handleAddComment}
        />

        <MemoryArchive
          memories={memories}
          onAddMemory={handleAddMemory}
          onDeleteMemory={handleDeleteMemory}
          onEditMemory={handleEditMemory}
        />

        <PhotoGallery
          photos={photos}
          onAddPhoto={handleAddPhoto}
          onDeletePhoto={handleDeletePhoto}
        />

        <LoveLetters
          letters={letters}
          wishes={wishes}
          couple={couple}
          onAddLetter={handleAddLetter}
          onAddWish={handleAddWish}
          onToggleWish={handleToggleWish}
          onDeleteWish={handleDeleteWish}
        />

        <MilestonesSection duration={duration} couple={couple} />
      </main>

      {/* Persistent Floating Music Controller */}
      <MusicPlayerBar
        isPlaying={isPlaying}
        onTogglePlay={handleToggleMusic}
        couple={couple}
        playlist={playlist}
        currentTrack={currentTrack}
        onSelectTrack={handleSelectTrack}
        onOpenMusicManager={() => setIsMusicManagerOpen(true)}
      />

      {/* Footer */}
      <footer className="relative z-10 border-t border-rose-500/15 py-8 text-center text-xs text-neutral-500 bg-neutral-950/80">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5 text-rose-300/80 font-serif text-sm">
            <span>{couple.nameBoy}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>{couple.nameGirl}</span>
          </div>
          <div className="text-neutral-400">
            Khởi đầu từ ngày 13/09/2026 · Nguyện ước cùng nhau đi đến trọn đời
          </div>
          <div className="text-neutral-600 text-[11px]">
            Trang lưu trữ & đếm ngày yêu kỷ niệm dành riêng cho hai bạn
          </div>
        </div>
      </footer>

      {/* Music Manager / Changer Modal */}
      {isMusicManagerOpen && (
        <MusicManagerModal
          playlist={playlist}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onSelectTrack={handleSelectTrack}
          onAddCustomTrack={handleAddCustomTrack}
          onDeleteCustomTrack={handleDeleteCustomTrack}
          onClose={() => setIsMusicManagerOpen(false)}
        />
      )}

      {/* Settings Modal */}
      {isEditModalOpen && (
        <EditCoupleModal
          couple={couple}
          onSave={(updated) => setCouple(updated)}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {/* Love Souvenir Card Modal */}
      {isCardModalOpen && (
        <LoveCardModal
          couple={couple}
          duration={duration}
          onClose={() => setIsCardModalOpen(false)}
        />
      )}
    </div>
  );
}
