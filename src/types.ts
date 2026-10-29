export interface CoupleInfo {
  nameBoy: string;
  nameGirl: string;
  photoBoy: string;
  photoGirl: string;
  startDate: string; // ISO string e.g. "2026-09-11T00:00:00"
  bioBoy: string;
  bioGirl: string;
  motto: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
  category: 'first' | 'dating' | 'trip' | 'milestone' | 'anniversary';
  location?: string;
}

export interface LoveLetter {
  id: string;
  sender: 'boy' | 'girl';
  senderName: string;
  receiverName: string;
  title: string;
  content: string;
  date: string;
}

export interface WishItem {
  id: string;
  author: string;
  content: string;
  date: string;
  color: string;
  isFulfilled: boolean;
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  type: 'synth' | 'custom' | 'url';
  synthPreset?: 'pianoLove' | 'starlightLofi' | 'musicBox' | 'moonlight' | 'sunshineLove';
  audioUrl?: string;
  customDataUrl?: string;
  duration?: string;
}

export interface PhotoMemory {
  id: string;
  url: string;
  title: string;
  date: string;
  caption: string;
  author: string;
}

export interface PostComment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface LovePost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  photos: string[];
  mood: string;
  likesCount: number;
  isLiked?: boolean;
  comments: PostComment[];
}


export interface LoveDuration {
  totalDays: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  heartbeats: number;
  nextMilestone: {
    targetDays: number;
    title: string;
    remainingDays: number;
    remainingHours: number;
    progressPercent: number;
  };
}

