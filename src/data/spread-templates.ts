import type { SpreadTemplate } from '@/types';

export const spreadTemplates: SpreadTemplate[] = [
  {
    id: 'single',
    nameZh: '单张指引',
    descriptionZh: '抽一张牌，获得今日的指引和启示',
    positions: [
      { id: 'card-1', name: '今日指引', meaning: '代表今天的核心主题和指引方向', order: 1 },
    ],
  },
  {
    id: 'three-card',
    nameZh: '三张牌·过去现在未来',
    descriptionZh: '经典的三张牌阵，了解过去的影响、现在的状态和未来的可能',
    positions: [
      { id: 'card-1', name: '过去', meaning: '代表过去的影响因素和经验', order: 1 },
      { id: 'card-2', name: '现在', meaning: '代表当前的状态和核心问题', order: 2 },
      { id: 'card-3', name: '未来', meaning: '代表未来的发展趋势和可能结果', order: 3 },
    ],
  },
  {
    id: 'five-card',
    nameZh: '五张牌·十字阵',
    descriptionZh: '从五个角度解读你的问题',
    positions: [
      { id: 'card-1', name: '核心', meaning: '问题的核心和本质', order: 1 },
      { id: 'card-2', name: '阻碍', meaning: '当前的障碍和挑战', order: 2 },
      { id: 'card-3', name: '根源', meaning: '问题的深层根源', order: 3 },
      { id: 'card-4', name: '建议', meaning: '应对的建议和方法', order: 4 },
      { id: 'card-5', name: '结果', meaning: '可能的结果和走向', order: 5 },
    ],
  },
  {
    id: 'celtic-cross',
    nameZh: '凯尔特十字',
    descriptionZh: '最经典的十张牌牌阵，全面深入地解读一个问题',
    positions: [
      { id: 'card-1', name: '现状', meaning: '当前所处的核心状况', order: 1 },
      { id: 'card-2', name: '阻碍', meaning: '横在面前的障碍或助力', order: 2 },
      { id: 'card-3', name: '根源', meaning: '问题的基础和根源', order: 3 },
      { id: 'card-4', name: '过去', meaning: '最近的过去和正在消退的影响', order: 4 },
      { id: 'card-5', name: '目标', meaning: '可能达成的目标或方向', order: 5 },
      { id: 'card-6', name: '近未来', meaning: '即将发生的近期事件', order: 6 },
      { id: 'card-7', name: '自我', meaning: '你在这个问题中的态度和位置', order: 7 },
      { id: 'card-8', name: '环境', meaning: '周围环境和他人的影响', order: 8 },
      { id: 'card-9', name: '希望', meaning: '内心的希望和恐惧', order: 9 },
      { id: 'card-10', name: '结果', meaning: '最终可能的结果', order: 10 },
    ],
  },
  {
    id: 'relationship',
    nameZh: '关系牌阵',
    descriptionZh: '解读感情或人际关系的五张牌阵',
    positions: [
      { id: 'card-1', name: '你自己', meaning: '你在这段关系中的状态和感受', order: 1 },
      { id: 'card-2', name: '对方', meaning: '对方在这段关系中的状态和感受', order: 2 },
      { id: 'card-3', name: '关系现状', meaning: '当前关系所处的阶段和状态', order: 3 },
      { id: 'card-4', name: '挑战', meaning: '关系中面临的挑战和需要解决的问题', order: 4 },
      { id: 'card-5', name: '未来', meaning: '关系可能的发展方向和结果', order: 5 },
    ],
  },
];

export function getSpreadTemplateById(id: string): SpreadTemplate | undefined {
  return spreadTemplates.find((t) => t.id === id);
}
