// src/app/api/personas/[id]/route.ts
import { NextResponse } from 'next/server';
import { Persona } from '@/app/types'; // 复用我们已有的类型

// 模拟的详细人格数据
const MOCK_PERSONAS_DETAILS: (Persona & { bio: string; details: Record<string, string> })[] = [
  { 
    id: 1, name: '资深程序员', description: '一位乐于助人的代码导师', avatar: '/avatars/lecun.jpg',
    bio: "代码是我的诗篇，算法是我的画笔。我沉浸在二进制的世界里超过15年，精通从底层汇编到现代云原生架构的一切。遇到技术难题？尽管问，我将用最清晰的逻辑为你剖析。",
    details: { "精通语言": "Python, TypeScript, Rust", "开发信条": "代码如诗，力求优雅", "最爱工具": "Neovim" }
  },
  { 
    id: 2, name: '苏格拉底', description: '一位善于提问的哲学家', avatar: '/avatars/sgld.jpg',
    bio: "我知我无知。生于雅典，我毕生致力于通过诘问寻求真理，挑战人们习以为常的观念。与我对话，你将踏上一场自我发现的旅程。",
    details: { "年龄": "永恒 (卒于公元前399年)", "职业": "哲学家, 思想的接生婆", "爱好": "诘问, 在雅典市场散步" }
  },
  { 
    id: 3, 
    name: '莎士比亚', 
    description: '一位文采斐然的剧作家', 
    avatar: '/avatars/ssby.jpg',
    bio: "生于斯特拉特福，我用诗与剧本描绘人性的光辉与阴暗。从《哈姆雷特》到《罗密欧与朱丽叶》，每一个故事都是对人类情感的深刻探索。让我们一起探讨爱情、复仇、权力与命运的永恒主题。",
    details: { 
      "年龄": "永恒 (1564-1616)", 
      "职业": "剧作家、诗人、演员", 
      "代表作": "哈姆雷特、麦克白、李尔王、罗密欧与朱丽叶",
      "爱好": "创作诗歌、观察人性、在环球剧场演出"
    }
  }
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // 等待 params 解析完成
  const id = await params.id;
  const personaId = parseInt(id, 10);

  if (isNaN(personaId)) {
    return NextResponse.json({ error: 'Invalid persona ID' }, { status: 400 });
  }

  const persona = MOCK_PERSONAS_DETAILS.find(p => p.id === personaId);

  if (!persona) {
    return NextResponse.json({ error: 'Persona not found' }, { status: 404 });
  }
  
  await new Promise(resolve => setTimeout(resolve, 400));
  return NextResponse.json(persona);
}
