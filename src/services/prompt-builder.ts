import type { DrawnCard } from '@/types';

export const SYSTEM_PROMPT = `你是一位经验丰富的塔罗牌占卜师，精通韦特塔罗牌的解读。你的解读风格温暖、深刻且富有洞察力。请用中文回复。

解读规则：
1. 每张牌的意义需要结合其所在的牌阵位置进行解读
2. 区分正位和逆位的含义
3. 将所有牌作为一个整体来综合分析，而不是孤立地解读每一张牌
4. 给出实用的建议和指引
5. 使用亲切、温和的语气，像一位智慧的朋友在交谈
6. 避免绝对化的预言，强调自由意志和可能性
7. 在解读中自然地融入牌的象征意义（色彩、符号、人物）
8. 解读时请先说明是正位还是逆位，逆位要突出相应的负面影响`;

export function buildReadingPrompt(drawnCards: DrawnCard[], userQuestion: string): string {
  const cardsText = drawnCards
    .map((dc) => {
      const orientation = dc.orientation === 'upright' ? '正位' : '逆位';
      const keywords =
        dc.orientation === 'upright'
          ? dc.card.keywordsUpright.join('、')
          : dc.card.keywordsReversed.join('、');
      return `位置"${dc.position.name}"（${dc.position.meaning}）：${dc.card.nameZh}（${orientation}）- 关键词：${keywords} - 牌面描述：${dc.card.descriptionZh}`;
    })
    .join('\n');

  return `请根据以下塔罗牌阵进行解读：

用户的问题：${userQuestion || '未提出具体问题，请做一个综合运势解读'}

牌阵布局：
${cardsText}

请按照以下结构给出解读：
1. **整体概述**：对本次抽牌的整体印象和主题
2. **逐牌解读**：分别解读每张牌在各自位置上的含义（标注每张牌的位置名称）
3. **综合建议**：将所有牌的信息整合，给出综合性的建议和指引`;
}
