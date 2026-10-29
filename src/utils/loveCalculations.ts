import { CoupleInfo, MemoryItem, LoveLetter, WishItem, PhotoMemory, SongTrack, LoveDuration, LovePost } from '../types';

export const DEFAULT_COUPLE: CoupleInfo = {
  nameBoy: 'Hoài Vũ',
  nameGirl: 'Hải Yến',
  photoBoy: '/assets/aistudio/photo_2026-10-26_10-54-32__2__23c9b43c.jpg',
  photoGirl: '/assets/aistudio/photo_2026-10-26_10-54-32_e68134c4.jpg',
  startDate: '2026-09-13T00:00:00',
  bioBoy: 'Chàng trai luôn che chở, ấm áp và dành trọn con tim cho em',
  bioGirl: 'Cô gái dịu dàng, nụ cười làm bừng sáng cả thế giới của anh',
  motto: 'Nguyện cùng em đi qua bốn mùa mưa nắng, nắm chặt tay nhau đến trọn đời.',
};

export const DEFAULT_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'Ngày Định Mệnh - Chúng Mình Chính Thức Yêu Nhau',
    date: '2026-09-13',
    description: 'Khoảnh khắc diệu kỳ nhất khi hai trái tim cùng chung nhịp đập. Lời tỏ tình vụng về nhưng chân thành đã mở ra một hành trình yêu thương tuyệt vời.',
    imageUrl: '/assets/aistudio/photo_2026-10-26_10-54-32_e68134c4.jpg',
    category: 'first',
    location: 'Hà Nội',
  },
  {
    id: 'mem-2',
    title: 'Buổi Hẹn Hò & Lần Đầu Nắm Tay',
    date: '2026-09-18',
    description: 'Gió thu se lạnh, bàn tay anh ngập ngừng rồi nắm lấy tay em. Cảm giác ấm áp lan tỏa đến từng tế bào, cả thế giới như chỉ còn lại hai đứa mình.',
    imageUrl: '/assets/aistudio/photo_2026-10-26_10-54-32__2__23c9b43c.jpg',
    category: 'dating',
    location: 'Góc Phố Thân Quen',
  },
  {
    id: 'mem-3',
    title: 'Chuyến Đi Chơi Đầu Tiên Cùng Nhau',
    date: '2026-10-04',
    description: 'Cùng nhau ngắm hoàng hôn buông xuống, cùng ăn những món ngon vỉa hè và cười đùa quên cả thời gian. Mỗi góc phố đi qua đều in đậm kỷ niệm.',
    category: 'trip',
    location: 'Bên Hồ Lộng Gió',
  },
  {
    id: 'mem-4',
    title: 'Bất Ngờ Ngọt Ngào & Bó Hoa Hồng Nhỏ',
    date: '2026-10-18',
    description: 'Bó hoa tươi thắm cùng chiếc ôm bất ngờ sau giờ làm. Nhìn thấy nụ cười rạng rỡ của em là mọi mệt mỏi trong ngày đều tan biến.',
    category: 'milestone',
    location: 'Quán Cà Phê Hoàng Hôn',
  },
];

export const DEFAULT_LETTERS: LoveLetter[] = [
  {
    id: 'let-1',
    sender: 'boy',
    senderName: 'Hoài Vũ',
    receiverName: 'Hải Yến',
    title: 'Gửi Em - Bầu Trời Nhỏ Của Anh',
    content: `Hải Yến thương mến,\n\nTừ ngày 13/09/2026, ngày mà anh có được em trong đời, thế giới của anh dường như có thêm vô vàn màu sắc mới. Anh vẫn nhớ như in ánh mắt trong veo và nụ cười rạng rỡ của em lúc ấy.\n\nAnh biết trên con đường phía trước sẽ có lúc nắng ấm và có khi giông bão, nhưng em hãy tin rằng bàn tay anh sẽ luôn nắm chặt tay em, che chở cho em trước mọi khó khăn. Cảm ơn em đã chọn yêu anh, cảm ơn em vì tất cả những điều dịu dàng em mang đến.\n\nYêu em nhiều hơn mỗi ngày trôi qua!\n\nHoài Vũ của em.`,
    date: '13/09/2026',
  },
  {
    id: 'let-2',
    sender: 'girl',
    senderName: 'Hải Yến',
    receiverName: 'Hoài Vũ',
    title: 'Gửi Chàng Trai Của Em',
    content: `Anh Hoài Vũ à,\n\nEm từng nghĩ tình yêu chỉ là những câu chuyện đẹp trong phim ảnh, cho đến khi gặp được anh. Cảm ơn anh vì sự kiên nhẫn, vì những tin nhắn nhắc nhở em ăn uống đúng giờ, vì bờ vai vững chãi luôn sẵn sàng cho em tựa vào mỗi khi mệt mỏi.\n\nBên anh, em được là chính mình - một cô gái hồn nhiên và luôn cảm thấy được bảo bọc. Mong cho hai chúng mình sẽ cùng nhau đi qua thật nhiều năm tháng, đón thêm nhiều mùa yêu ngọt ngào nữa nhé anh!\n\nYêu anh thật nhiều,\nHải Yến.`,
    date: '13/09/2026',
  },
];

export const DEFAULT_WISHES: WishItem[] = [
  {
    id: 'wish-1',
    author: 'Hoài Vũ',
    content: 'Ước mong Hải Yến luôn khoẻ mạnh, luôn mỉm cười hạnh phúc mỗi ngày.',
    date: '13/09/2026',
    color: '#f43f5e',
    isFulfilled: true,
  },
  {
    id: 'wish-2',
    author: 'Hải Yến',
    content: 'Cùng anh Hoài Vũ đi du lịch Đà Lạt ngắm mây và biển hoa.',
    date: '20/09/2026',
    color: '#ec4899',
    isFulfilled: false,
  },
  {
    id: 'wish-3',
    author: 'Hoài Vũ',
    content: 'Cùng nhau đón kỷ niệm 100 ngày yêu thật lung linh và trọn vẹn.',
    date: '01/10/2026',
    color: '#8b5cf6',
    isFulfilled: false,
  },
  {
    id: 'wish-4',
    author: 'Hai đứa mình',
    content: 'Dù có giận dỗi thế nào cũng sẽ cùng nhau ngồi lại lắng nghe và thương nhau nhiều hơn.',
    date: '15/10/2026',
    color: '#f59e0b',
    isFulfilled: true,
  },
];

export const DEFAULT_PHOTOS: PhotoMemory[] = [
  {
    id: 'p-1',
    url: '/assets/aistudio/photo_2026-10-26_10-54-32__2__23c9b43c.jpg',
    title: 'Hoài Vũ',
    date: '2026',
    caption: 'Chàng trai ấm áp và luôn tràn đầy năng lượng tích cực.',
    author: 'Hải Yến chụp',
  },
  {
    id: 'p-2',
    url: '/assets/aistudio/photo_2026-10-26_10-54-32_e68134c4.jpg',
    title: 'Hải Yến',
    date: '2026',
    caption: 'Nụ cười dịu dàng làm xao xuyến con tim anh mỗi ngày.',
    author: 'Hoài Vũ chụp',
  },
];

export const PLAYLIST: SongTrack[] = [
  {
    id: 'song-1',
    title: 'Giai Điệu Tình Yêu (Romantic Piano)',
    artist: 'Love Acoustic Box',
    type: 'synth',
    synthPreset: 'pianoLove',
    duration: '∞ Vòng lặp',
  },
  {
    id: 'song-2',
    title: 'Đêm Ngàn Sao (Starlight Lofi Chill)',
    artist: 'Dreamy Love Notes',
    type: 'synth',
    synthPreset: 'starlightLofi',
    duration: '∞ Vòng lặp',
  },
  {
    id: 'song-3',
    title: 'Hộp Nhạc Kỷ Niệm (Music Box Keepsake)',
    artist: 'Sweet Chimes',
    type: 'synth',
    synthPreset: 'musicBox',
    duration: '∞ Vòng lặp',
  },
  {
    id: 'song-4',
    title: 'Ánh Trăng Hẹn Ước (Moonlight Ballad)',
    artist: 'Acoustic Serenade',
    type: 'synth',
    synthPreset: 'moonlight',
    duration: '∞ Vòng lặp',
  },
  {
    id: 'song-5',
    title: 'Bình Minh Tình Yêu (Sunshine Melody)',
    artist: 'Warm Morning Harp',
    type: 'synth',
    synthPreset: 'sunshineLove',
    duration: '∞ Vòng lặp',
  },
];

export const DEFAULT_POSTS: LovePost[] = [
  {
    id: 'post-1',
    title: 'Một Ngày Mùa Thu Đầy Nắng & Nụ Cười Của Em',
    author: 'Hoài Vũ',
    date: '13/09/2026',
    mood: 'Hạnh phúc',
    content: 'Ngày 13/09/2026 sẽ mãi là ngày thiêng liêng nhất trong cuộc đời anh. Cảm ơn Hải Yến vì đã đồng ý cùng anh bước chung một con đường. Mỗi lần nhìn ngắm nụ cười của em, anh đều thấy mọi mệt mỏi tan biến hết. Mong rằng chúng mình sẽ mãi luôn yêu thương, gắn bó như những ngày đầu tiên này!',
    photos: [
      '/assets/aistudio/photo_2026-10-26_10-54-32_e68134c4.jpg',
      '/assets/aistudio/photo_2026-10-26_10-54-32__2__23c9b43c.jpg'
    ],
    likesCount: 12,
    isLiked: true,
    comments: [
      {
        id: 'c-1',
        author: 'Hải Yến',
        text: 'Em cũng yêu anh thật nhiều! Hãy luôn nắm chặt tay em như thế này nhé anh ❤️',
        date: '13/09/2026'
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Góc Cà Phê Nhỏ & Những Câu Chuyện Không Hồi Kết',
    author: 'Hải Yến',
    date: '28/09/2026',
    mood: 'Bình yên',
    content: 'Thích nhất là những buổi chiều cuối tuần cùng anh Hoài Vũ ngồi bên khung cửa sổ quán quen, nghe một bản nhạc êm dịu và nói đủ thứ chuyện trên đời. Không cần đi đâu xa, chỉ cần bên anh là thấy lòng an yên.',
    photos: [
      '/assets/aistudio/photo_2026-10-26_10-54-32_e68134c4.jpg'
    ],
    likesCount: 9,
    isLiked: true,
    comments: [
      {
        id: 'c-2',
        author: 'Hoài Vũ',
        text: 'Chỉ cần em thích, quán cà phê nào anh cũng sẽ đưa em đi!',
        date: '28/09/2026'
      }
    ]
  }
];

export function calculateLoveDuration(startDateStr: string): LoveDuration {
  const start = new Date(startDateStr).getTime();
  const now = new Date().getTime();
  const diffMs = Math.max(0, now - start);

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  // Average resting human heart rate ~72 beats per minute
  const heartbeats = Math.floor(totalMinutes * 72);

  // Milestones list
  const milestones = [
    { days: 30, title: '1 Tháng Yêu Nhau' },
    { days: 50, title: '50 Ngày Bên Nhau' },
    { days: 100, title: '100 Ngày Hạnh Phúc' },
    { days: 180, title: 'Nửa Năm (6 Tháng)' },
    { days: 200, title: '200 Ngày Gắn Kết' },
    { days: 365, title: '1 Năm Yêu Nhau (Kỷ Niệm Vàng)' },
    { days: 500, title: '500 Ngày Bền Chặt' },
    { days: 730, title: '2 Năm Ngọt Ngào' },
    { days: 1000, title: '1000 Ngày Hạnh Phúc' },
  ];

  let nextTarget = milestones[0];
  let prevTargetDays = 0;

  for (let i = 0; i < milestones.length; i++) {
    if (totalDays < milestones[i].days) {
      nextTarget = milestones[i];
      prevTargetDays = i > 0 ? milestones[i - 1].days : 0;
      break;
    }
  }

  // If already surpassed all milestones
  if (totalDays >= milestones[milestones.length - 1].days) {
    const last = milestones[milestones.length - 1];
    nextTarget = { days: totalDays + 100, title: `${totalDays + 100} Ngày Yêu` };
    prevTargetDays = last.days;
  }

  const remainingDays = Math.max(0, nextTarget.days - totalDays);
  const remainingHours = Math.max(0, 24 - hours);
  const range = Math.max(1, nextTarget.days - prevTargetDays);
  const currentProgress = Math.max(0, totalDays - prevTargetDays);
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentProgress / range) * 100)));

  return {
    totalDays,
    days: totalDays,
    hours,
    minutes,
    seconds,
    totalHours,
    totalMinutes,
    totalSeconds,
    heartbeats,
    nextMilestone: {
      targetDays: nextTarget.days,
      title: nextTarget.title,
      remainingDays,
      remainingHours,
      progressPercent,
    },
  };
}
