import type { Card } from '@/types';

type SuitData = {
  suit: 'wands' | 'cups' | 'swords' | 'pentacles';
  nameZh: string;
  element: string;
  prefix: string;
  ranks: { rank: Card['rank']; number: number; nameZh: string; nameEn: string }[];
};

const rankData: SuitData['ranks'] = [
  { rank: 'ace', number: 1, nameZh: '王牌', nameEn: 'Ace' },
  { rank: 'two', number: 2, nameZh: '二', nameEn: 'Two' },
  { rank: 'three', number: 3, nameZh: '三', nameEn: 'Three' },
  { rank: 'four', number: 4, nameZh: '四', nameEn: 'Four' },
  { rank: 'five', number: 5, nameZh: '五', nameEn: 'Five' },
  { rank: 'six', number: 6, nameZh: '六', nameEn: 'Six' },
  { rank: 'seven', number: 7, nameZh: '七', nameEn: 'Seven' },
  { rank: 'eight', number: 8, nameZh: '八', nameEn: 'Eight' },
  { rank: 'nine', number: 9, nameZh: '九', nameEn: 'Nine' },
  { rank: 'ten', number: 10, nameZh: '十', nameEn: 'Ten' },
  { rank: 'page', number: 11, nameZh: '侍从', nameEn: 'Page' },
  { rank: 'knight', number: 12, nameZh: '骑士', nameEn: 'Knight' },
  { rank: 'queen', number: 13, nameZh: '王后', nameEn: 'Queen' },
  { rank: 'king', number: 14, nameZh: '国王', nameEn: 'King' },
];

// Keywords for each suit + rank combination
const keywords: Record<string, { upright: string[]; reversed: string[]; description: string }> = {
  // Wands (权杖) - Fire element
  'wands-ace': {
    upright: ['创造力', '灵感', '新机遇', '热情', '行动力'],
    reversed: ['拖延', '缺乏方向', '创意受阻', '错失良机'],
    description: '权杖王牌代表新的创意火花和行动的开端。一股强大的创造力即将迸发，勇敢抓住这个新机会。',
  },
  'wands-two': {
    upright: ['规划', '未来愿景', '决策', '探索', '远见'],
    reversed: ['犹豫不决', '缺乏规划', '恐惧未知', '错失方向'],
    description: '权杖二代表站在高处眺望未来，手握地球仪规划前路。正位鼓励你大胆规划，展望更广阔的世界。',
  },
  'wands-three': {
    upright: ['远见', '扩展', '探索', '商业合作', '进步'],
    reversed: ['目光短浅', '计划受阻', '失望', '退回原点'],
    description: '权杖三描绘一个人站在海边眺望远航的船只。正位代表初步的规划和行动已见成效，未来充满希望。',
  },
  'wands-four': {
    upright: ['庆祝', '和谐', '稳定', '安居', '团结'],
    reversed: ['不稳定', '家庭冲突', '缺乏归属感', '庆祝后的空虚'],
    description: '权杖四描绘欢庆的场面，代表稳定与和谐的阶段。正位预示一段平静愉快的时期，适合庆祝和感恩。',
  },
  'wands-five': {
    upright: ['竞争', '冲突', '挑战', '激辩', '突破'],
    reversed: ['内耗', '逃避竞争', '妥协', '无意义的争斗'],
    description: '权杖五描绘五个人持杖相争。正位代表竞争和挑战，但也激发成长；逆位提醒争斗是否有意义。',
  },
  'wands-six': {
    upright: ['胜利', '认可', '自信', '领导力', '凯旋'],
    reversed: ['骄傲自满', '失败', '不被认可', '声望受损'],
    description: '权杖六是胜利者骑着白马凯旋。正位预示你的努力将获得认可和赞赏，享受成功的喜悦。',
  },
  'wands-seven': {
    upright: ['坚持', '防守', '勇气', '信念', '孤军奋战'],
    reversed: ['放弃', '被压垮', '退缩', '失去信心'],
    description: '权杖七描绘一个人在高处抵御下方的攻击。正位鼓励你坚守阵地，以勇气和信念面对挑战。',
  },
  'wands-eight': {
    upright: ['快速行动', '进展', '旅行', '消息', '动力'],
    reversed: ['延迟', '停滞', '计划取消', '错失时机'],
    description: '权杖八是八根权杖在空中快速飞过。正位预示事情将迅速推进，好消息即将到来。',
  },
  'wands-nine': {
    upright: ['坚持', '韧性', '防备', '最后的挑战', '积蓄力量'],
    reversed: ['疲惫', '放弃', '过度防备', '偏执'],
    description: '权杖九描绘一个受伤但仍在守卫的人。正位代表你已经历了许多，只剩最后一道关卡需要坚守。',
  },
  'wands-ten': {
    upright: ['承担责任', '压力', '勤奋', '重担', '完成'],
    reversed: ['不堪重负', '推卸责任', '过度劳累', '崩溃'],
    description: '权杖十是一个人背负十根权杖前行。正位提醒你审视自己的负担，学会委派和减负。',
  },
  'wands-page': {
    upright: ['热情', '探索', '好消息', '新想法', '学习'],
    reversed: ['缺乏热情', '坏消息', '幼稚', '浅尝辄止'],
    description: '权杖侍从象征热情和探索精神。正位鼓励你以开放的心态迎接新事物，开启一段学习的旅程。',
  },
  'wands-knight': {
    upright: ['冒险', '行动', '冲动', '热血', '追求'],
    reversed: ['鲁莽', '半途而废', '缺乏计划', '混乱'],
    description: '权杖骑士骑着骏马冲向战场。正位代表行动力和冒险精神，但要留意不要过于冲动。',
  },
  'wands-queen': {
    upright: ['自信', '热情', '领导力', '魅力', '独立'],
    reversed: ['嫉妒', '控制欲', '缺乏自信', '霸道'],
    description: '权杖王后坐在宝座上，手持向日葵。正位代表自信、热情和魅力，是一位充满活力的领导者。',
  },
  'wands-king': {
    upright: ['领导力', '远见', '创业精神', '荣誉', '成就'],
    reversed: ['暴君', '野心过度', '急躁', '缺乏同理心'],
    description: '权杖国王是成熟而有远见的领导者。正位提醒你以诚信和远见引导自己和他人。',
  },

  // Cups (圣杯) - Water element
  'cups-ace': {
    upright: ['爱', '情感丰盈', '直觉', '新感情', '喜悦'],
    reversed: ['情感空虚', '压抑', '爱被拒绝', '创意枯竭'],
    description: '圣杯王牌代表情感与爱的源泉。正位预示新感情的萌芽或情感上的丰盈与满足。',
  },
  'cups-two': {
    upright: ['结合', '伙伴关系', '相互吸引', '和谐', '平等'],
    reversed: ['分离', '不平衡的关系', '背叛', '误解'],
    description: '圣杯二描绘两人互换圣杯，象征平等和谐的连接。正位代表美好的感情或合作关系。',
  },
  'cups-three': {
    upright: ['友谊', '庆祝', '团聚', '分享', '欢乐'],
    reversed: ['孤独', '过度放纵', '流言蜚语', '社交疲惫'],
    description: '圣杯三是三位女子举杯庆祝。正位代表友谊、欢庆和社交的美好时光。',
  },
  'cups-four': {
    upright: ['沉思', '不满', '倦怠', '重新评估', '内省'],
    reversed: ['觉醒', '新的动力', '接受新机会', '走出倦怠'],
    description: '圣杯四描绘一个人坐在树下沉思，对递来的第四只杯子视而不见。正位提醒你审视自己的不满从何而来。',
  },
  'cups-five': {
    upright: ['失落', '遗憾', '悲伤', '关注缺失', '悼念'],
    reversed: ['接受', '向前看', '恢复', '希望'],
    description: '圣杯五是黑袍人影对着三只倒下的杯子悲伤。正位代表失落和遗憾，但也提醒你背后还有两只立着的杯子。',
  },
  'cups-six': {
    upright: ['回忆', '怀旧', '纯真', '礼物', '重逢'],
    reversed: ['沉溺过去', '无法前行', '遗忘', '失望'],
    description: '圣杯六描绘孩子送花给另一个孩子。正位代表怀旧、纯真的回忆和善意的礼物。',
  },
  'cups-seven': {
    upright: ['幻想', '选择', '白日梦', '想象力', '多重选项'],
    reversed: ['清晰', '做出决定', '面对现实', '脚踏实地'],
    description: '圣杯七描绘七只杯子浮在空中，每只盛着不同的幻象。正位代表丰富的想象力和选择，但要警惕虚幻。',
  },
  'cups-eight': {
    upright: ['离开', '放下', '寻求更高意义', '旅行', '成长'],
    reversed: ['留恋', '恐惧改变', '无法放手', '退却'],
    description: '圣杯八是一个人离开身后的八只杯子，走向远方。正位鼓励你勇敢放下已知，追寻更高的人生意义。',
  },
  'cups-nine': {
    upright: ['愿望实现', '满足', '舒适', '享受', '自足'],
    reversed: ['不满足', '贪婪', '物质主义', '表面快乐'],
    description: '圣杯九描绘一个满足地坐在九只圣杯前的人。正位代表愿望成真和内心的满足感。',
  },
  'cups-ten': {
    upright: ['家庭幸福', '情感圆满', '和谐', '归属', '爱与欢乐'],
    reversed: ['家庭不和', '破碎', '疏离', '情感缺失'],
    description: '圣杯十描绘彩虹下幸福的一家。正位是情感上的终极圆满，代表家庭幸福和爱与和谐。',
  },
  'cups-page': {
    upright: ['敏感', '直觉', '创意灵感', '情感讯息', '浪漫'],
    reversed: ['情感不成熟', '逃避现实', '创意受阻', '过于敏感'],
    description: '圣杯侍从手持圣杯，鱼从杯中探出头。正位代表直觉敏锐、富有创意和浪漫的消息。',
  },
  'cups-knight': {
    upright: ['浪漫', '追求理想', '魅力', '诗人', '邀约'],
    reversed: ['情绪化', '不切实际', '欺骗', '嫉妒'],
    description: '圣杯骑士骑着白马，手持圣杯。正位代表浪漫的追求和理想的追寻者。',
  },
  'cups-queen': {
    upright: ['同理心', '直觉', '关怀', '情感深度', '治愈'],
    reversed: ['情绪依赖', '过度敏感', '自我牺牲', '情感操控'],
    description: '圣杯王后坐在海边宝座上，凝视精美的圣杯。正位代表深邃的直觉和温暖的关怀。',
  },
  'cups-king': {
    upright: ['情感成熟', '宽容', '创造力', '外交', '平静'],
    reversed: ['情绪波动', '控制欲', '压抑情感', '冷漠'],
    description: '圣杯国王是情感成熟和宽容的象征。正位提醒你以冷静和同理心面对人际关系的风浪。',
  },

  // Swords (宝剑) - Air element
  'swords-ace': {
    upright: ['清晰', '真理', '决断', '智慧', '胜利'],
    reversed: ['混乱', '错误判断', '模糊', '不公'],
    description: '宝剑王牌高举真理之剑。正位代表清晰的思维、公正的决断和智慧的胜利。',
  },
  'swords-two': {
    upright: ['僵局', '犹豫', '平衡选择', '蒙蔽', '回避'],
    reversed: ['做出决定', '突破僵局', '信息过载', '真相显现'],
    description: '宝剑二是蒙眼女子双手持剑交叉于胸前。正位代表两难选择和暂时的僵局，需要更多信息才能决定。',
  },
  'swords-three': {
    upright: ['心碎', '悲伤', '背叛', '分离', '创伤'],
    reversed: ['恢复', '释怀', '原谅', '走出伤痛'],
    description: '宝剑三是三把剑穿过一颗心。正位代表心碎和悲伤，但这也是疗愈的起点。',
  },
  'swords-four': {
    upright: ['休息', '沉思', '恢复', '退隐', '冥想'],
    reversed: ['不安', '焦躁', '无法休息', '重返战场'],
    description: '宝剑四描绘一个人在教堂中静卧休息。正位建议你暂时退隐，给身心一个恢复的机会。',
  },
  'swords-five': {
    upright: ['胜利', '冲突', '不光彩的胜利', '欺凌', '自大'],
    reversed: ['和解', '和平解决', '放下冲突', '后悔'],
    description: '宝剑五描绘胜利者冷笑，失败者离去。正位提醒你思考这次胜利是否值得，是否有更好的解决方式。',
  },
  'swords-six': {
    upright: ['过渡', '疗愈', '向前看', '旅程', '释怀'],
    reversed: ['无法前行', '停滞', '拒绝帮助', '重返困境'],
    description: '宝剑六描绘一人乘船渡向彼岸。正位代表从困境中过渡到平静的状态，虽然过程缓慢但方向正确。',
  },
  'swords-seven': {
    upright: ['策略', '机智', '隐秘行动', '独自行动', '谨慎'],
    reversed: ['暴露', '失败的计划', '坦白', '愚蠢行为'],
    description: '宝剑七是一个人偷偷带走五把剑。正位提醒你需要智慧和策略来应对当前的局面。',
  },
  'swords-eight': {
    upright: ['束缚', '无力感', '自我限制', '困境', '等待'],
    reversed: ['解脱', '自由', '找到出路', '突破'],
    description: '宝剑八是女子被绑缚在剑阵之中。正位代表感到被困，但束缚更多来自内心而非外界。',
  },
  'swords-nine': {
    upright: ['焦虑', '噩梦', '恐惧', '失眠', '忧虑'],
    reversed: ['释然', '希望', '恐惧消散', '恢复平静'],
    description: '宝剑九描绘一个人从噩梦中惊醒。正位代表深度的焦虑和担忧，但这些恐惧往往被放大。',
  },
  'swords-ten': {
    upright: ['结束', '背叛', '最低点', '牺牲', '解脱'],
    reversed: ['复苏', '重生', '恢复', '吸取教训'],
    description: '宝剑十描绘一个人被十把剑钉在地上。正位虽然画面残酷，但它代表最坏的时刻已经过去，黎明即将到来。',
  },
  'swords-page': {
    upright: ['好奇', '警惕', '沟通', '新想法', '学习'],
    reversed: ['轻率言论', '欺骗', '肤浅', '心不在焉'],
    description: '宝剑侍从双手持剑，警觉地环顾四周。正位代表敏锐的观察力和对新知的渴望。',
  },
  'swords-knight': {
    upright: ['行动', '果断', '决断力', '勇气', '追逐目标'],
    reversed: ['鲁莽', '冲动', '不计后果', '咄咄逼人'],
    description: '宝剑骑士是冲锋陷阵的战士。正位代表果断的行动力，但要避免过于冲动和好斗。',
  },
  'swords-queen': {
    upright: ['敏锐', '独立', '智慧', '清晰的判断', '坦率'],
    reversed: ['冷酷', '刻薄', '偏见', '过于理性'],
    description: '宝剑王后坐在宝座上，手持宝剑。正位代表清晰的思维和独立的判断力。',
  },
  'swords-king': {
    upright: ['权威', '理智', '公正', '伦理', '专业'],
    reversed: ['独裁', '冷酷', '滥用权力', '不择手段'],
    description: '宝剑国王是理性与权威的象征。正位提醒你以公正和智慧做出判断，不偏不倚。',
  },

  // Pentacles (星币) - Earth element
  'pentacles-ace': {
    upright: ['财富', '机会', '实践', '物质化', '繁荣'],
    reversed: ['错失机会', '财务问题', '浪费', '短视'],
    description: '星币王牌代表物质世界的新开始。正位预示一个实际的机遇：新工作、投资或物质上的收获。',
  },
  'pentacles-two': {
    upright: ['平衡', '多任务', '适应', '灵活性', '时间管理'],
    reversed: ['失衡', '混乱', '不堪重负', '财务不稳'],
    description: '星币二描绘一个人轻盈地玩弄两枚星币。正位代表灵活的平衡能力，在多重任务间游刃有余。',
  },
  'pentacles-three': {
    upright: ['合作', '技能', '团队', '工艺', '蓝图'],
    reversed: ['缺乏合作', '技能不足', '质量问题', '团队矛盾'],
    description: '星币三描绘三人协作建造教堂。正位代表团队合作、专业技能和切实可行的计划。',
  },
  'pentacles-four': {
    upright: ['节俭', '掌控', '安全', '保守', '积累'],
    reversed: ['吝啬', '恐惧失去', '过度消费', '控制欲'],
    description: '星币四是一个紧抱星币的人。正位代表财务安全和对资源的掌控，但也要警惕过度保守。',
  },
  'pentacles-five': {
    upright: ['匮乏', '困境', '求助', '被忽视', '转机'],
    reversed: ['恢复', '找到帮助', '走出困境', '精神富足'],
    description: '星币五描绘两个在雪夜中蹒跚的人路过明亮的教堂。正位代表物质或精神上的困境，但帮助就在附近。',
  },
  'pentacles-six': {
    upright: ['慷慨', '给予', '接受帮助', '分享', '慈善'],
    reversed: ['吝啬', '债务', '不平等', '被利用'],
    description: '星币六是一个富人在给予两个乞丐。正位代表慷慨给予或接受帮助，资源的公平分配。',
  },
  'pentacles-seven': {
    upright: ['耐心', '评估', '投资', '等待收获', '耕耘'],
    reversed: ['急躁', '回报延迟', '投资失误', '浪费精力'],
    description: '星币七描绘一个人看着一株结满星币的植物。正位提醒耐心等待你的努力结出果实。',
  },
  'pentacles-eight': {
    upright: ['勤奋', '技能提升', '专注', '精益求精', '工匠精神'],
    reversed: ['倦怠', '枯燥', '缺乏进步', '质量下降'],
    description: '星币八描绘一个工匠专注地打造星币。正位代表专注、勤奋和不断提升的专业技能。',
  },
  'pentacles-nine': {
    upright: ['独立', '丰裕', '自给自足', '享受成果', '优雅'],
    reversed: ['依赖', '财务问题', '失去独立', '挥霍'],
    description: '星币九描绘一位优雅的女子在繁茂的花园中。正位代表通过自身努力获得的独立和丰裕。',
  },
  'pentacles-ten': {
    upright: ['家族财富', '传承', '稳定', '长久', '圆满'],
    reversed: ['家族冲突', '财务损失', '不稳定', '遗产问题'],
    description: '星币十描绘三代同堂的富足场景。正位代表物质和精神上的持久富足和家族的传承。',
  },
  'pentacles-page': {
    upright: ['学习', '实践', '新技能', '踏实', '潜力'],
    reversed: ['缺乏动力', '不切实际', '浪费机会', '懒惰'],
    description: '星币侍从双手捧着一枚星币专注凝视。正位代表学习新技能的热情和踏实的实践精神。',
  },
  'pentacles-knight': {
    upright: ['勤奋', '责任', '可靠', '耐心', '务实'],
    reversed: ['懒散', '停滞', '不负责任', '缺乏进取'],
    description: '星币骑士骑在稳重的黑马上，手持星币。正位代表可靠、勤奋和脚踏实地的行动。',
  },
  'pentacles-queen': {
    upright: ['务实', '滋养', '稳定', '安全感', '慷慨'],
    reversed: ['物质主义', '忽视家庭', '不安全感', '吝啬'],
    description: '星币王后怀抱星币，坐在丰饶的自然中。正位代表务实而温暖的照护，创造稳定和安全的生活。',
  },
  'pentacles-king': {
    upright: ['财富', '成就', '稳重', '商业头脑', '慷慨'],
    reversed: ['贪婪', '物质主义', '腐败', '挥霍'],
    description: '星币国王是物质世界的成功典范。正位代表通过勤奋和智慧获得的长久成就和财富。',
  },
};

const suits: Omit<SuitData, 'ranks'>[] = [
  { suit: 'wands', nameZh: '权杖', element: '火', prefix: 'w' },
  { suit: 'cups', nameZh: '圣杯', element: '水', prefix: 'c' },
  { suit: 'swords', nameZh: '宝剑', element: '风', prefix: 's' },
  { suit: 'pentacles', nameZh: '星币', element: '土', prefix: 'p' },
];

function buildId(prefix: string, number: number): string {
  return `${prefix}${String(number).padStart(2, '0')}`;
}

export const minorArcana: Card[] = suits.flatMap(({ suit, nameZh: suitZh, element, prefix }) =>
  rankData.map(({ rank, number, nameZh: rankZh, nameEn: rankEn }) => {
    const key = `${suit}-${rank}`;
    const k = keywords[key] ?? { upright: [], reversed: [], description: '' };
    return {
      id: buildId(prefix, number),
      arcana: 'minor' as const,
      suit,
      rank,
      number,
      nameZh: `${suitZh}${rankZh}`,
      nameEn: `${rankEn} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
      keywordsUpright: k.upright,
      keywordsReversed: k.reversed,
      descriptionZh: k.description,
      imageFile: `${buildId(prefix, number)}.webp`,
    };
  })
);
