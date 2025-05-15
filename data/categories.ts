export interface Tool {
  name: string;
  description: string;
  url: string;
  category: string;
  tags?: string[];
  logo?: string;
  domain?: string;
  hasPricing?: boolean;  // 가격 정보를 가져올지 여부
}

export const categories = [
  '범용',
  '글쓰기',
  '이미지',
  '영상',
  '생산성',
  '개발'
] as const;

export type Category = typeof categories[number];

export const tools: Tool[] = [
  // 범용
  {
    name: "ChatGPT",
    description: "대화하듯 질문하면 글쓰기, 번역, 요약 등 다양한 작업을 쉽게 도와줘요.",
    url: "https://chat.openai.com/",
    category: "범용",
    tags: ["대화형", "다기능"],
    domain: "openai.com",
    hasPricing: true
  },
  {
    name: "Gemini (Google)",
    description: "구글이 만든 AI로, 텍스트와 이미지를 이해하고 다양한 정보를 제공해줘요.",
    url: "https://gemini.google.com/",
    category: "범용",
    tags: ["구글", "멀티모달"],
    domain: "google.com"
  },
  {
    name: "Claude",
    description: "문서 요약과 질문 답변에 강한 AI로, 신뢰할 수 있는 정보를 제공해줘요.",
    url: "https://claude.ai/",
    category: "범용",
    tags: ["Anthropic", "대화형"],
    domain: "claude.ai"
  },
  {
    name: "Microsoft Copilot",
    description: "오피스와 연동되어 문서 작성과 데이터 분석을 쉽게 도와줘요.",
    url: "https://www.microsoft.com/en-us/microsoft-365/copilot",
    category: "범용",
    tags: ["마이크로소프트", "생산성"],
    domain: "microsoft.com"
  },
  {
    name: "Perplexity AI",
    description: "최신 정보를 실시간으로 찾아 핵심만 정리해서 알려줘요.",
    url: "https://www.perplexity.ai/",
    category: "범용",
    tags: ["검색", "요약"],
    domain: "perplexity.ai"
  },
  {
    name: "DeepSeek",
    description: "100개 이상의 언어를 지원하며, 긴 글이나 복잡한 데이터를 빠르게 처리해줘요.",
    url: "https://www.deepseek.com/",
    category: "범용",
    tags: ["중국", "다기능"],
    domain: "deepseek.com"
  },
  {
    name: "Grok",
    description: "실시간 트렌드와 이슈를 유머러스하게 알려주고, 다양한 작업을 지원해줘요.",
    url: "https://x.ai/grok",
    category: "범용",
    tags: ["xAI", "유머"],
    domain: "x.ai"
  },
  {
    name: "Poe",
    description: "여러 유명 AI를 한 곳에서 비교하고 조합해서 활용할 수 있어요.",
    url: "https://poe.com/",
    category: "범용",
    tags: ["집합형", "다기능"],
    domain: "poe.com"
  },
  {
    name: "Monica AI",
    description: "여러 AI 기능을 통합한 비서로, 다양한 작업을 한 번에 도와줘요.",
    url: "https://monica.im/",
    category: "범용",
    tags: ["올인원", "다기능"],
    domain: "monica.im"
  },
  {
    name: "Motion",
    description: "일정과 업무를 AI가 자동으로 계획해줘서 시간 관리를 쉽게 해줘요.",
    url: "https://www.usemotion.com/",
    category: "범용",
    tags: ["일정관리", "생산성"],
    domain: "usemotion.com"
  },

  // 글쓰기
  {
    name: "Grammarly",
    description: "영어 문법과 표현을 자동으로 교정해줘서 글을 더 자연스럽게 만들어줘요.",
    url: "https://www.grammarly.com/",
    category: "글쓰기",
    tags: ["교정", "영어"],
    domain: "grammarly.com"
  },
  {
    name: "ParagraphAI",
    description: "에세이, 이메일 등 다양한 글을 빠르게 작성하고 교정해줘요.",
    url: "https://paragraphai.com/",
    category: "글쓰기",
    tags: ["생성", "이메일"],
    domain: "paragraphai.com"
  },
  {
    name: "QuillBot",
    description: "문장을 다양한 방식으로 바꿔주고, 긴 글도 간단하게 요약해줘요.",
    url: "https://quillbot.com/",
    category: "글쓰기",
    tags: ["패러프레이징", "요약"],
    domain: "quillbot.com"
  },
  {
    name: "Jasper",
    description: "블로그, 광고 등 다양한 글을 빠르게 작성하고 SEO 최적화를 도와줘요.",
    url: "https://www.jasper.ai/",
    category: "글쓰기",
    tags: ["마케팅", "카피라이팅"],
    domain: "jasper.ai"
  },
  {
    name: "Sudowrite",
    description: "소설과 창작 글에 특화되어 아이디어 확장과 플롯 구성을 도와줘요.",
    url: "https://www.sudowrite.com/",
    category: "글쓰기",
    tags: ["창작", "소설"],
    domain: "sudowrite.com"
  },
  {
    name: "Wordtune",
    description: "문장을 더 자연스럽고 읽기 쉽게 바꿔주며, 톤과 길이 조절도 가능해요.",
    url: "https://www.wordtune.com/",
    category: "글쓰기",
    tags: ["리라이팅", "자연스러움"],
    domain: "wordtune.com"
  },
  {
    name: "Copy.ai",
    description: "마케팅, SNS 등 다양한 글 템플릿을 제공하고 브랜드 톤을 맞춰줘요.",
    url: "https://www.copy.ai/",
    category: "글쓰기",
    tags: ["템플릿", "마케팅"],
    domain: "copy.ai"
  },
  {
    name: "WriteSonic",
    description: "블로그, 기사 등 다양한 글을 쉽게 생성하고 SEO 기능도 제공해줘요.",
    url: "https://writesonic.com/",
    category: "글쓰기",
    tags: ["블로그", "기사"],
    domain: "writesonic.com"
  },
  {
    name: "Rytr",
    description: "다양한 스타일의 글을 저렴하고 간편하게 작성해줘요.",
    url: "https://rytr.me/",
    category: "글쓰기",
    tags: ["저렴함", "다양성"],
    domain: "rytr.me"
  },
  {
    name: "Paperpal",
    description: "논문과 리포트 등 학술 글쓰기에 특화되어 문법 교정과 표현을 강화해줘요.",
    url: "https://paperpal.com/",
    category: "글쓰기",
    tags: ["논문", "전문성"],
    domain: "paperpal.com"
  },

  // 이미지
  {
    name: "Midjourney",
    description: "텍스트 설명만으로 멋진 그림이나 예술 이미지를 만들어줘요.",
    url: "https://www.midjourney.com/",
    category: "이미지",
    tags: ["예술", "창작"],
    domain: "midjourney.com"
  },
  {
    name: "Google Imagen 3",
    description: "구글이 개발한 AI로, 설명만 입력하면 고해상도 이미지를 만들어줘요.",
    url: "https://imagen.research.google/",
    category: "이미지",
    tags: ["구글", "고화질"],
    domain: "google.com"
  },
  {
    name: "GPT-4V (ChatGPT)",
    description: "대화 중에 바로 그림을 만들어 보여주고, 다양한 입력을 동시에 이해해줘요.",
    url: "https://openai.com/",
    category: "이미지",
    tags: ["대화형", "그림"],
    domain: "openai.com"
  },
  {
    name: "Adobe Firefly",
    description: "상업적으로 사용해도 안전한 이미지를 만들어주고, 어도비 소프트웨어와 연동돼요.",
    url: "https://firefly.adobe.com/",
    category: "이미지",
    tags: ["상업용", "안전"],
    domain: "adobe.com"
  },
  {
    name: "Canva AI Art Generator",
    description: "디자인 초보도 쉽게 사용할 수 있는 이미지 생성 도구로, 다양한 디자인에 활용 가능해요.",
    url: "https://www.canva.com/",
    category: "이미지",
    tags: ["디자인", "초보"],
    domain: "canva.com"
  },
  {
    name: "Leonardo AI",
    description: "게임 캐릭터, 만화 스타일 등 독특한 이미지를 잘 만들어줘요.",
    url: "https://leonardo.ai/",
    category: "이미지",
    tags: ["캐릭터", "만화"],
    domain: "leonardo.ai"
  },
  {
    name: "Stable Diffusion",
    description: "오픈소스 이미지 생성 AI로, 원하는 스타일이나 효과를 세밀하게 조정할 수 있어요.",
    url: "https://stability.ai/",
    category: "이미지",
    tags: ["오픈소스", "자유"],
    domain: "stability.ai"
  },
  {
    name: "Microsoft Designer",
    description: "마이크로소프트가 만든 디자인 도구로, AI가 이미지를 추천하고 만들어줘요.",
    url: "https://designer.microsoft.com/",
    category: "이미지",
    tags: ["프레젠테이션", "포스터"],
    domain: "microsoft.com"
  },
  {
    name: "Recraft V3",
    description: "글씨가 들어간 이미지도 자연스럽게 만들어주고, 다양한 디자인 작업에 유용해요.",
    url: "https://www.recraft.ai/",
    category: "이미지",
    tags: ["텍스트", "자연스러움"],
    domain: "recraft.ai"
  },
  {
    name: "Getty Images Generative AI",
    description: "저작권 걱정 없이 사용할 수 있는 안전한 이미지 생성 도구로, 상업적 용도로 바로 사용 가능해요.",
    url: "https://www.gettyimages.com/",
    category: "이미지",
    tags: ["저작권", "안전"],
    domain: "gettyimages.com"
  },

  // 영상
  {
    name: "Synthesia",
    description: "글을 입력하면 AI가 실제 사람처럼 말하는 영상을 만들어줘요.",
    url: "https://www.synthesia.io/",
    category: "영상",
    tags: ["아바타", "영상"],
    domain: "synthesia.io"
  },
  {
    name: "HeyGen",
    description: "실제 사람처럼 자연스럽게 말하고 움직이는 AI 영상 캐릭터를 생성해줘요.",
    url: "https://www.heygen.com/",
    category: "영상",
    tags: ["아바타", "자연스러움"],
    domain: "heygen.com"
  },
  {
    name: "Runway",
    description: "영상 편집이 어려운 사람도 쉽게 사용할 수 있도록 AI가 도와주는 영상 제작 도구예요.",
    url: "https://runwayml.com/",
    category: "영상",
    tags: ["편집", "특수효과"],
    domain: "runwayml.com"
  },
  {
    name: "CapCut",
    description: "스마트폰으로도 쉽게 영상 편집과 효과를 줄 수 있어요.",
    url: "https://www.capcut.com/",
    category: "영상",
    tags: ["모바일", "편집"],
    domain: "capcut.com"
  },
  {
    name: "Hailuo",
    description: "짧고 재미있는 영상을 빠르게 만들어주는 무료 AI 도구예요.",
    url: "https://hailuo.ai/",
    category: "영상",
    tags: ["무료", "쇼츠"],
    domain: "hailuo.ai"
  },
  {
    name: "OpenAI Sora",
    description: "글만 입력하면 실제 영화 같은 영상을 만들어줘요.",
    url: "https://openai.com/sora",
    category: "영상",
    tags: ["영화", "고품질"],
    domain: "openai.com"
  },
  {
    name: "Luma AI",
    description: "현실감 넘치는 3D 영상과 장면을 만들어줘요.",
    url: "https://lumalabs.ai/",
    category: "영상",
    tags: ["3D", "현실감"],
    domain: "lumalabs.ai"
  },
  {
    name: "Google Veo",
    description: "구글이 개발한 영상 생성 AI로, 움직임이 자연스러운 영상을 만들어줘요.",
    url: "https://veo.google/",
    category: "영상",
    tags: ["구글", "자연스러움"],
    domain: "google.com"
  },
  {
    name: "OpusClip",
    description: "긴 영상을 자동으로 짧고 공유하기 좋은 클립으로 잘라줘요.",
    url: "https://www.opus.pro/",
    category: "영상",
    tags: ["편집", "쇼츠"],
    domain: "opus.pro"
  },
  {
    name: "Filmora",
    description: "누구나 쉽게 사용할 수 있는 영상 편집기와 AI 효과를 제공해줘요.",
    url: "https://filmora.wondershare.com/",
    category: "영상",
    tags: ["편집", "효과"],
    domain: "wondershare.com"
  },

  // 생산성
  {
    name: "Zapier",
    description: "여러 앱을 자동으로 연결해 반복 작업을 줄여줘요.",
    url: "https://zapier.com/",
    category: "생산성",
    tags: ["자동화", "연동"],
    domain: "zapier.com"
  },
  {
    name: "Sintra AI",
    description: "팀원 역할을 AI가 대신해주는 업무 도우미예요.",
    url: "https://www.sintra.ai/",
    category: "생산성",
    tags: ["협업", "업무"],
    domain: "sintra.ai"
  },
  {
    name: "Otter.ai",
    description: "회의 내용을 AI가 자동으로 받아 적고 요약해줘요.",
    url: "https://otter.ai/",
    category: "생산성",
    tags: ["회의", "녹취"],
    domain: "otter.ai"
  },
  {
    name: "Alexa",
    description: "음성으로 집안 기기, 일정, 알람 등을 쉽게 관리할 수 있어요.",
    url: "https://alexa.amazon.com/",
    category: "생산성",
    tags: ["음성", "스마트홈"],
    domain: "amazon.com"
  },
  {
    name: "Google Assistant",
    description: "구글 서비스와 연동해 일정, 알람, 정보 검색까지 척척 처리해줘요.",
    url: "https://assistant.google.com/",
    category: "생산성",
    tags: ["음성", "구글"],
    domain: "google.com"
  },
  {
    name: "Murf AI",
    description: "자연스러운 AI 목소리로 오디오 파일을 만들어줘요.",
    url: "https://murf.ai/",
    category: "생산성",
    tags: ["음성", "오디오"],
    domain: "murf.ai"
  },
  {
    name: "n8n",
    description: "반복되는 업무를 자동화해주는 도구로, 다양한 앱과 연동해 맞춤형 워크플로우를 만들 수 있어요.",
    url: "https://n8n.io/",
    category: "생산성",
    tags: ["자동화", "워크플로우"],
    domain: "n8n.io"
  },
  {
    name: "Reclaim",
    description: "내 스케줄을 AI가 알아서 최적화해줘요.",
    url: "https://reclaim.ai/",
    category: "생산성",
    tags: ["일정", "최적화"],
    domain: "reclaim.ai"
  },

  // 개발
  {
    name: "GitHub Copilot",
    description: "코딩할 때 바로바로 코드 추천과 완성을 해줘요.",
    url: "https://github.com/features/copilot",
    category: "개발",
    tags: ["코딩", "자동완성"],
    domain: "github.com"
  },
  {
    name: "Cursor",
    description: "코드 편집기 안에서 AI가 코딩을 도와주고, 코드 오류를 쉽게 찾고 수정해줘요.",
    url: "https://cursor.sh/",
    category: "개발",
    tags: ["에디터", "AI"],
    domain: "cursor.sh"
  },
  {
    name: "Replit",
    description: "인터넷만 있으면 어디서든 코딩하고 AI의 도움도 받을 수 있어요.",
    url: "https://replit.com/",
    category: "개발",
    tags: ["클라우드", "협업"],
    domain: "replit.com"
  },
  {
    name: "Codeium",
    description: "다양한 언어로 코딩을 쉽게 도와주는 무료 AI예요.",
    url: "https://codeium.com/",
    category: "개발",
    tags: ["자동완성", "무료"],
    domain: "codeium.com"
  },
  {
    name: "TabNine",
    description: "내가 자주 쓰는 코드를 기억해서 빠르게 추천해줘요.",
    url: "https://www.tabnine.com/",
    category: "개발",
    tags: ["자동완성", "다언어"],
    domain: "tabnine.com"
  },
  {
    name: "Hugging Face",
    description: "다양한 AI 도구와 코드를 쉽게 찾아서 쓸 수 있는 플랫폼이에요.",
    url: "https://huggingface.co/",
    category: "개발",
    tags: ["AI", "오픈소스"],
    domain: "huggingface.co"
  },
  {
    name: "Amazon CodeWhisperer",
    description: "AWS와 연동되어 클라우드 개발에 강하고, 코드 자동 완성과 추천 기능이 있어요.",
    url: "https://aws.amazon.com/codewhisperer/",
    category: "개발",
    tags: ["AWS", "자동완성"],
    domain: "aws.amazon.com"
  },
  {
    name: "Qodo",
    description: "개발 과정을 한 번에 관리해주는 AI로, 코드 작성, 테스트, 배포까지 지원해줘요.",
    url: "https://www.qodo.ai/",
    category: "개발",
    tags: ["개발관리", "배포"],
    domain: "qodo.ai"
  },
  {
    name: "DataRobot",
    description: "데이터를 분석하고 예측하는 일을 쉽게 만들어줘요.",
    url: "https://www.datarobot.com/",
    category: "개발",
    tags: ["데이터", "분석"],
    domain: "datarobot.com"
  },
  {
    name: "v0",
    description: "코딩 없이도 앱을 만들 수 있게 도와주는 AI예요.",
    url: "https://v0.dev/",
    category: "개발",
    tags: ["노코드", "앱개발"],
    domain: "v0.dev"
  }
].map(tool => ({
  ...tool,
  hasPricing: true // 모든 도구에 hasPricing을 true로 설정
}));

export const getAllTools = (): Tool[] => {
  return tools;
}; 