import type { Question } from "@/types";

export const competitionInfo = {
  title: "성경 암송 대회",
  subtitle: "말씀을 마음에 새기다",
  description:
    "세대와 공동체가 함께 말씀을 기억하고 나누는 교회 행사입니다. 정해진 범위 안에서 빈칸 암송 시험을 치르고, 자동 채점과 랭킹으로 결과를 확인할 수 있습니다."
};

export const homeSections = {
  overview: [
    { label: "대회 기간", value: "2026년 5월 1일 ~ 5월 31일" },
    { label: "참가 대상", value: "청소년부, 청년부, 장년부" },
    { label: "암송 범위", value: "시편 23편, 로마서 8장, 요한복음 14장" }
  ],
  features: [
    {
      title: "암송 테스트",
      description: "빈칸 채우기 형식으로 집중력 있게 말씀을 암송합니다."
    },
    {
      title: "자동 채점",
      description: "정답과 입력값을 즉시 비교해 공정하게 점수를 계산합니다."
    },
    {
      title: "랭킹 시스템",
      description: "개인별 순위와 교회별 참여 현황을 실시간으로 확인합니다."
    }
  ],
  schedule: [
    { step: "접수", date: "2026.05.01 - 2026.05.14" },
    { step: "시험", date: "2026.05.18 - 2026.05.24" },
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
      quote: "시험 형식이 부담스럽지 않고, 자동 채점이라 결과도 바로 확인할 수 있어 좋았습니다."
    }
  ]
};

export const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "여호와는 나의 목자시니 내게 ____이 없으리로다.",
    answer: "부족함",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    question: "내가 선한 싸움을 싸우고 나의 달려갈 길을 마치고 ____을 지켰으니.",
    answer: "믿음",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    question: "너는 마음을 다하고 뜻을 다하여 주 너의 하나님을 ____하라.",
    answer: "사랑",
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    question: "주의 말씀은 내 발에 등이요 내 길에 ____이니이다.",
    answer: "빛",
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    question: "항상 기뻐하라 쉬지 말고 ____하라 범사에 감사하라.",
    answer: "기도",
    createdAt: new Date().toISOString()
  }
];

