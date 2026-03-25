export const competitionInfo = {
  title: "성경 암송 대회",
  subtitle: "말씀을 마음에 새기고 공동체와 나누는 행사",
  description:
    "세대와 공동체가 함께 말씀을 기억하고 나누는 교회 행사입니다. 일정 안내, 참가 신청, 공지사항, 갤러리를 한곳에서 확인할 수 있도록 구성했습니다."
};

export const homeSections = {
  overview: [
    { label: "대회 기간", value: "2026년 5월 1일 ~ 2026년 5월 31일" },
    { label: "참가 대상", value: "청소년부, 청년부, 장년부" },
    { label: "행사 장소", value: "샘물교회 본당 및 교육관" }
  ],
  features: [
    {
      title: "행사 안내",
      description: "대회 일정, 시험 방식, 준비물과 유의사항을 한눈에 확인합니다."
    },
    {
      title: "온라인 신청",
      description: "모바일에서도 빠르게 참가 신청을 완료하고 접수 정보를 남길 수 있습니다."
    },
    {
      title: "공지와 갤러리",
      description: "운영 공지와 현장 사진, 영상을 카드형 UI로 편하게 탐색할 수 있습니다."
    }
  ],
  schedule: [
    { step: "접수", date: "2026.05.01 - 2026.05.14" },
    { step: "예선", date: "2026.05.18 - 2026.05.20" },
    { step: "본선", date: "2026.05.24" },
    { step: "발표", date: "2026.05.31 주일 예배 후" }
  ],
  awards: [
    "대상: 상장 및 기념 성경",
    "최우수상: 상장 및 묵상 노트 세트",
    "우수상: 상장 및 도서상품권"
  ],
  testimonials: [
    {
      name: "김은혜 집사",
      church: "샘물교회",
      quote: "가족이 함께 준비하면서 말씀이 생활 속 대화가 되었습니다."
    },
    {
      name: "이준호 청년",
      church: "은혜교회",
      quote: "행사 안내와 신청이 한곳에 모여 있어 훨씬 편했습니다."
    }
  ]
};

export const guideSections = {
  examFormat: [
    "예선은 지정 본문 암송 후 진행자의 확인으로 평가합니다.",
    "본선은 현장 낭송과 지정 구절 이어 암송으로 진행됩니다.",
    "연령대별 부문으로 운영하며, 부문별 심사 기준이 동일하게 적용됩니다."
  ],
  materials: ["개인 성경책", "필기도구", "참가 확인 문자 또는 신청 정보", "간단한 물과 개인 소지품"],
  cautions: [
    "행사 시작 20분 전까지 도착해 접수 확인을 완료해 주세요.",
    "본당 내부에서는 휴대전화 무음 설정을 권장합니다.",
    "촬영된 사진과 영상은 행사 기록 및 홍보용으로 활용될 수 있습니다."
  ]
};

export const fallbackNotices = [
  {
    id: 1,
    title: "참가 접수가 시작되었습니다.",
    content:
      "2026년 성경 암송 대회 참가 접수가 시작되었습니다. 신청 페이지에서 이름, 교회, 연락처를 입력해 접수를 완료해 주세요.",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "본선 현장 안내",
    content:
      "본선 진출자는 2026년 5월 24일 오후 1시까지 교육관 로비에 모여 주세요. 참가 확인 후 자리 안내가 진행됩니다.",
    createdAt: new Date().toISOString()
  }
];

export const fallbackGallery = [
  {
    id: 1,
    title: "지난해 본선 예배당 전경",
    imageUrl:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "주일 오후 공동체 모임",
    imageUrl:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "참가자 기도 모임",
    imageUrl:
      "https://images.unsplash.com/photo-1520637836862-4d197d17c55a?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date().toISOString()
  }
];
