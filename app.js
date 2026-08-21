const fmt = n => {
  if (n < 1000) return Math.floor(n).toLocaleString('ru-RU');
  const units = ['K','M','B','T','Qa','Qi'];
  let i = -1;
  while (n >= 1000 && i < units.length - 1) { n /= 1000; i++; }
  return n.toFixed(n >= 100 ? 0 : n >= 10 ? 1 : 2) + units[i];
};

const rarity = {
  common:{name:'Обычная', color:'#aab3c5'},
  rare:{name:'Редкая', color:'#38bdf8'},
  epic:{name:'Эпическая', color:'#a855f7'},
  legendary:{name:'Легендарная', color:'#f59e0b'},
  mythical:{name:'Мифическая', color:'#ff4df0'},
  secret:{name:'SECRET', color:'#ff325f'},
  celestial:{name:'CELESTIAL', color:'#f8ffff'}
};

const upgrades = [
  // ===== Ручной клик =====
  {id:'tap1', name:'Нейро-палец', type:'tap', amount:1, base:25, growth:1.17, tier:1},
  {id:'tap5', name:'Импульсный усилитель', type:'tap', amount:5, base:240, growth:1.20, tier:1},
  {id:'tap50', name:'Квантовый привод', type:'tap', amount:50, base:4200, growth:1.23, tier:1},
  {id:'tap250', name:'Плазменный кулак', type:'tap', amount:250, base:28000, growth:1.25, tier:2},
  {id:'tap1000', name:'Нейронный реактор', type:'tap', amount:1000, base:180000, growth:1.27, tier:2},
  {id:'tap5000', name:'Гипер-привод', type:'tap', amount:5000, base:1200000, growth:1.29, tier:3},
  {id:'tap25000', name:'Сингулярный усилитель', type:'tap', amount:25000, base:8000000, growth:1.31, tier:3},
  {id:'tap100000', name:'Ядро мегасети', type:'tap', amount:100000, base:60000000, growth:1.33, tier:4},
  {id:'tap500000', name:'Разлом мощности', type:'tap', amount:500000, base:450000000, growth:1.35, tier:4},
  {id:'tap2500000', name:'Двигатель реальности', type:'tap', amount:2500000, base:3500000000, growth:1.37, tier:5},
  {id:'tap10000000', name:'Бесконечный импульс', type:'tap', amount:10000000, base:25000000000, growth:1.40, tier:5},
  {id:'tap50000000', name:'Абсолютная сила', type:'tap', amount:50000000, base:200000000000, growth:1.42, tier:6},
  {id:'tap250000000', name:'Небесный двигатель', type:'tap', amount:250000000, base:1500000000000, growth:1.45, tier:6},

  // ===== Автоклик =====
  {id:'bot1', name:'Робот-сборщик', type:'auto', amount:1, base:80, growth:1.16, tier:1},
  {id:'bot10', name:'Дрон-ферма', type:'auto', amount:10, base:950, growth:1.19, tier:1},
  {id:'bot100', name:'Кибер-завод', type:'auto', amount:100, base:15000, growth:1.22, tier:1},
  {id:'bot500', name:'Нейро-ферма', type:'auto', amount:500, base:90000, growth:1.24, tier:2},
  {id:'bot2500', name:'Плазменный конвейер', type:'auto', amount:2500, base:600000, growth:1.26, tier:2},
  {id:'bot10000', name:'Квантовый дата-центр', type:'auto', amount:10000, base:4200000, growth:1.28, tier:3},
  {id:'bot50000', name:'Мегазавод синтеза', type:'auto', amount:50000, base:30000000, growth:1.30, tier:3},
  {id:'bot250000', name:'Орбитальная фабрика', type:'auto', amount:250000, base:220000000, growth:1.32, tier:4},
  {id:'bot1000000', name:'Сингулярная сеть', type:'auto', amount:1000000, base:1600000000, growth:1.34, tier:4},
  {id:'bot5000000', name:'Автономный мегакомплекс', type:'auto', amount:5000000, base:12000000000, growth:1.36, tier:5},
  {id:'bot25000000', name:'Гиперсеть производства', type:'auto', amount:25000000, base:90000000000, growth:1.38, tier:5},
  {id:'bot100000000', name:'Реактор бесконечного цикла', type:'auto', amount:100000000, base:700000000000, growth:1.40, tier:6},
  {id:'bot500000000', name:'Небесная автоматика', type:'auto', amount:500000000, base:5500000000000, growth:1.43, tier:6}
];

const auras = [
  // Обычные
  {id:'cyan', name:'Неоновый контур', rarity:'common', mult:1.10, accent:'#00eaff', accent2:'#286cff', odds:2},
  {id:'spark', name:'Искра мегаполиса', rarity:'common', mult:1.12, accent:'#45f3ff', accent2:'#407bff', odds:3},
  {id:'lime', name:'Кислотный след', rarity:'common', mult:1.14, accent:'#8dff45', accent2:'#20c970', odds:5},
  {id:'rose', name:'Розовый импульс', rarity:'common', mult:1.16, accent:'#ff5fcf', accent2:'#8f44ff', odds:8},
  {id:'steel', name:'Стальной резонанс', rarity:'common', mult:1.18, accent:'#b9c8df', accent2:'#55708f', odds:12},
  {id:'ember', name:'Угольный заряд', rarity:'common', mult:1.20, accent:'#ff8b45', accent2:'#dd3b3b', odds:18},

  // Редкие
  {id:'violet', name:'Фантомный импульс', rarity:'rare', mult:1.35, accent:'#bf5cff', accent2:'#5f45ff', odds:28},
  {id:'frost', name:'Ледяной протокол', rarity:'rare', mult:1.42, accent:'#85e8ff', accent2:'#3675ff', odds:45},
  {id:'toxic', name:'Токсичный реактор', rarity:'rare', mult:1.48, accent:'#61ff7b', accent2:'#00b86b', odds:70},
  {id:'crimson', name:'Багровая частота', rarity:'rare', mult:1.55, accent:'#ff345c', accent2:'#a1004c', odds:110},
  {id:'storm', name:'Грозовая сеть', rarity:'rare', mult:1.62, accent:'#8cc8ff', accent2:'#654cff', odds:160},
  {id:'holo', name:'Голографический спектр', rarity:'rare', mult:1.70, accent:'#43fff2', accent2:'#e24cff', odds:225},

  // Эпические
  {id:'plasma', name:'Плазменный шторм', rarity:'epic', mult:2.00, accent:'#ff3bd4', accent2:'#7b2cff', odds:350},
  {id:'nebula', name:'Туманность Омега', rarity:'epic', mult:2.20, accent:'#c363ff', accent2:'#3d4cff', odds:550},
  {id:'quantum', name:'Квантовый разлом', rarity:'epic', mult:2.40, accent:'#54f5ff', accent2:'#bb2cff', odds:850},
  {id:'eclipse', name:'Кибер-затмение', rarity:'epic', mult:2.60, accent:'#ff487d', accent2:'#3c1b7a', odds:1300},
  {id:'matrix', name:'Матрица сознания', rarity:'epic', mult:2.85, accent:'#4dff9d', accent2:'#00a8b8', odds:1900},
  {id:'arcane', name:'Арканный процессор', rarity:'epic', mult:3.15, accent:'#f258ff', accent2:'#6134ff', odds:2700},

  // Легендарные
  {id:'solar', name:'Солнечное ядро', rarity:'legendary', mult:4.50, accent:'#ffbb35', accent2:'#ff4d3d', odds:4000},
  {id:'supernova', name:'Сверхновая', rarity:'legendary', mult:5.00, accent:'#fff178', accent2:'#ff533d', odds:6000},
  {id:'blackstar', name:'Чёрная звезда', rarity:'legendary', mult:5.50, accent:'#b191ff', accent2:'#19134f', odds:9000},
  {id:'chrono', name:'Хроно-пульс', rarity:'legendary', mult:6.00, accent:'#68fff2', accent2:'#7758ff', odds:13000},
  {id:'royal', name:'Корона мегасети', rarity:'legendary', mult:6.50, accent:'#ffd65f', accent2:'#b24dff', odds:20000},
  {id:'dragonfire', name:'Драконий реактор', rarity:'legendary', mult:7.00, accent:'#ff713d', accent2:'#ff244e', odds:30000},

  // Мифические
  {id:'void', name:'Мифическая сингулярность', rarity:'mythical', mult:9.00, accent:'#ffffff', accent2:'#ff38e8', odds:45000},
  {id:'infinity', name:'Код бесконечности', rarity:'mythical', mult:10.00, accent:'#79fff2', accent2:'#ff46e9', odds:70000},
  {id:'creator', name:'Ядро Создателя', rarity:'mythical', mult:11.50, accent:'#fff5b5', accent2:'#ca4cff', odds:105000},
  {id:'celestial', name:'Небесный протокол', rarity:'mythical', mult:13.00, accent:'#d6f7ff', accent2:'#735cff', odds:160000},
  {id:'paradox', name:'Парадокс реальности', rarity:'mythical', mult:14.50, accent:'#ff70db', accent2:'#32f1ff', odds:240000},
  {id:'absolute', name:'Абсолютный ноль', rarity:'mythical', mult:16.00, accent:'#e9ffff', accent2:'#4578ff', odds:350000},

  // SECRET / CELESTIAL — эндгейм
  {id:'redacted', name:'[REDACTED]', rarity:'secret', mult:20.00, accent:'#ff3158', accent2:'#620018', odds:600000},
  {id:'reality', name:'Разрушитель реальности', rarity:'secret', mult:25.00, accent:'#ff6a9f', accent2:'#17101f', odds:1000000},
  {id:'celestialCore', name:'Небесное ядро', rarity:'celestial', mult:34.00, accent:'#e9ffff', accent2:'#7b71ff', odds:2000000},
  {id:'infiniteCrown', name:'Корона бесконечности', rarity:'celestial', mult:45.00, accent:'#ffffff', accent2:'#ffed7a', odds:5000000}
];

const pets = {
  // Обычные
  nanoCat:{name:'Лошадь', rarity:'common', click:1.08, auto:1.03},
  rabbit:{name:'Кролик', rarity:'common', click:1.09, auto:1.04},
  dog:{name:'Пёс', rarity:'common', click:1.10, auto:1.05},
  boar:{name:'Кабан', rarity:'common', click:1.11, auto:1.05},
  owl:{name:'Сова', rarity:'common', click:1.12, auto:1.06},

  // Редкие
  voltFox:{name:'Волк', rarity:'rare', click:1.20, auto:1.10},
  lynx:{name:'Рысь', rarity:'rare', click:1.22, auto:1.12},
  panther:{name:'Пантера', rarity:'rare', click:1.24, auto:1.14},
  falcon:{name:'Сокол', rarity:'rare', click:1.26, auto:1.16},
  whiteTiger:{name:'Белый тигр', rarity:'rare', click:1.30, auto:1.18},

  // Эпические
  glitchOwl:{name:'Феникс', rarity:'epic', click:1.55, auto:1.35},
  frostBear:{name:'Ледяной медведь', rarity:'epic', click:1.60, auto:1.38},
  shadowTiger:{name:'Теневой тигр', rarity:'epic', click:1.65, auto:1.42},
  griffin:{name:'Грифон', rarity:'epic', click:1.72, auto:1.46},
  thunderWolf:{name:'Грозовой волк', rarity:'epic', click:1.80, auto:1.50},

  // Легендарные
  mechDragon:{name:'Дракон', rarity:'legendary', click:2.40, auto:2.00},
  cerberus:{name:'Цербер', rarity:'legendary', click:2.55, auto:2.10},
  thunderbird:{name:'Громовая птица', rarity:'legendary', click:2.70, auto:2.20},
  leviathan:{name:'Левиафан', rarity:'legendary', click:2.85, auto:2.35},
  fireLion:{name:'Огненный лев', rarity:'legendary', click:3.00, auto:2.50},

  // Мифические
  starSeraph:{name:'Единорог', rarity:'mythical', click:5.00, auto:4.00},
  timeDragon:{name:'Дракон времени', rarity:'mythical', click:5.50, auto:4.40},
  cosmicLeviathan:{name:'Космический левиафан', rarity:'mythical', click:6.00, auto:4.80},
  celestialKitsune:{name:'Небесная кицунэ', rarity:'mythical', click:6.50, auto:5.20},
  voidSeraph:{name:'Сераф Бездны', rarity:'mythical', click:7.00, auto:5.75}
};

const eggs = [
  {
    id:'basic', world:'neon', name:'Неоновое яйцо', cost:4000, currency:'clicks',petPool:['nanoCat','voltFox','glitchOwl','mechDragon','starSeraph'],
    rarityChances:[['common',63],['rare',25],['epic',9],['legendary',2.5],['mythical',0.5]]
  },
  {
    id:'elite', world:'cyber', name:'Квантовое яйцо', cost:18, currency:'crystals',petPool:['rabbit','lynx','frostBear','cerberus','timeDragon'],
    rarityChances:[['common',12],['rare',38],['epic',30],['legendary',17],['mythical',3]]
  },
  {
    id:'voidEgg', world:'void', name:'Яйцо Бездны', cost:55, currency:'crystals',petPool:['dog','panther','shadowTiger','thunderbird','cosmicLeviathan'],
    rarityChances:[['common',5],['rare',25],['epic',35],['legendary',27],['mythical',8]]
  },
  {
    id:'celestialEgg', world:'celestial', name:'Небесное яйцо', cost:140, currency:'crystals',petPool:['boar','falcon','griffin','leviathan','celestialKitsune'],
    rarityChances:[['common',2],['rare',13],['epic',30],['legendary',40],['mythical',15]]
  }
];

const WORLDS=[
  {id:'neon',name:'🌃 Neon City',rebirths:0,click:1,auto:1,luck:1,desc:'Стартовый мир мегаполиса'},
  {id:'cyber',name:'💾 Cyber Space',rebirths:2,click:1.25,auto:1.15,luck:1.05,desc:'Квантовые питомцы и ускоренный доход'},
  {id:'void',name:'🌑 Void',rebirths:5,click:1.60,auto:1.35,luck:1.12,desc:'Сильные питомцы и повышенный RNG'},
  {id:'celestial',name:'☄️ Celestial Realm',rebirths:10,click:2.20,auto:1.80,luck:1.25,desc:'Финальный мир с лучшими наградами'}
];
const FEATURE_UNLOCKS={auraShop:1,missions:2,auraIndex:3,progression:4,boss:5};
const REBIRTH_MILESTONES=[
  {at:1,name:'Первый цикл',desc:'+10% ко всему доходу'},
  {at:3,name:'Резонанс удачи',desc:'+0.10 постоянного Luck'},
  {at:5,name:'Связь миров',desc:'+15% к бонусам питомцев'},
  {at:10,name:'Двойная душа',desc:'+1 Soul за каждое перерождение'},
  {at:15,name:'RNG Overdrive',desc:'Auto Roll быстрее ещё на 0.1 сек'},
  {at:25,name:'Разрушитель миров',desc:'+30% урона мировому боссу'}
];
const NEON_RANKS=[
  {at:0,name:'Новичок',icon:'◇',mult:1},
  {at:2,name:'Neon Runner',icon:'◆',mult:1.05},
  {at:5,name:'Cyber Operator',icon:'⬡',mult:1.10},
  {at:10,name:'Void Walker',icon:'✦',mult:1.20},
  {at:15,name:'Celestial',icon:'✧',mult:1.35},
  {at:25,name:'Neon Architect',icon:'◈',mult:1.50}
];

const PET_STAGES={
  normal:{name:'Обычный',mult:1},
  shiny:{name:'Shiny',mult:1.5},
  golden:{name:'Golden',mult:2.5},
  void:{name:'Void',mult:4}
};
const PET_STAGE_ORDER=['normal','shiny','golden','void'];
const PET_RARITY_RANK={common:0,rare:1,epic:2,legendary:3,mythical:4};

const SOUL_TREE_NODES=[
  {id:'power',name:'⚔️ Импульс силы',desc:'+10% ко всему доходу',max:10,baseCost:1},
  {id:'auto',name:'🤖 Авто-мощь',desc:'+15% к автоклику',max:8,baseCost:1,requires:['power',2]},
  {id:'luck',name:'🍀 Soul Luck',desc:'+0.25 к RNG Luck',max:10,baseCost:2,requires:['power',2]},
  {id:'energy',name:'🔋 Батарея',desc:'+20 к максимуму энергии',max:8,baseCost:1,requires:['power',3]},
  {id:'regen',name:'⚡ Нано-реген',desc:'+0.25 энергии/сек',max:8,baseCost:2,requires:['energy',2]},
  {id:'petPower',name:'🐾 Синхронизация',desc:'+8% к бонусам питомцев',max:8,baseCost:2,requires:['auto',2]},
  {id:'critChance',name:'🎯 Крит-протокол',desc:'+2% шанса критического тапа',max:5,baseCost:3,requires:['power',4]},
  {id:'critPower',name:'💥 Перегрузка крита',desc:'+0.5 к множителю крита',max:6,baseCost:3,requires:['critChance',2]},
  {id:'bossDamage',name:'👹 Охотник',desc:'+20% урона мировому боссу',max:5,baseCost:3,requires:['auto',3]},
  {id:'autoRollSpeed',name:'🎲 RNG-ускоритель',desc:'Auto Roll быстрее на 0.1 сек',max:5,baseCost:4,requires:['luck',3]},
  {id:'soulYield',name:'♻️ Эхо души',desc:'+1 Soul за перерождение каждые 3 ур.',max:6,baseCost:5,requires:['luck',4]},
  {id:'fourthSlot',name:'🌟 4-й слот питомца',desc:'Открывает ещё один слот экипировки',max:1,baseCost:12,requires:['petPower',5]}
];

const MASTERY_TREE_NODES=[
  {id:'core',branch:'core',name:'💠 Ядро мастерства',desc:'+5% ко всему доходу',max:5,cost:1},
  {id:'tap',branch:'tap',name:'👆 Сила тапа',desc:'+8% к ручному клику',max:8,cost:1,requires:['core',2]},
  {id:'auto',branch:'auto',name:'🏭 Автоматизация',desc:'+10% к автоклику',max:8,cost:1,requires:['core',2]},
  {id:'rng',branch:'rng',name:'🎲 RNG-канал',desc:'+0.08 к постоянному Luck',max:8,cost:1,requires:['core',3]},
  {id:'pets',branch:'pets',name:'🐾 Связь с питомцами',desc:'+5% к бонусам питомцев',max:6,cost:2,requires:['core',3]},
  {id:'battery',branch:'tap',name:'🔋 Эко-тап',desc:'+4% шанс не потратить энергию',max:5,cost:2,requires:['tap',2]},
  {id:'crit',branch:'tap',name:'🎯 Точный удар',desc:'+1% шанса крита',max:5,cost:2,requires:['tap',3]},
  {id:'critPower',branch:'tap',name:'💥 Сверхкрит',desc:'+0.25 к силе крита',max:4,cost:3,requires:['crit',2]},
  {id:'factory',branch:'auto',name:'⚙️ Мега-фабрика',desc:'+12% к автоклику',max:5,cost:2,requires:['auto',3]},
  {id:'hatch',branch:'pets',name:'🥚 Экономный инкубатор',desc:'-3% к цене яиц',max:5,cost:2,requires:['pets',2]},
  {id:'boss',branch:'auto',name:'👹 Уничтожитель',desc:'+10% урона боссу',max:5,cost:2,requires:['auto',3]},
  {id:'superLuck',branch:'rng',name:'🌈 Сверхудача',desc:'+0.15 к постоянному Luck',max:5,cost:3,requires:['rng',4]}
];

const EVENTS=[
  {id:'neonStorm',name:'⚡ NEON STORM',desc:'Удача аур x3',luck:3,duration:60000},
  {id:'overdrive',name:'🔥 OVERDRIVE',desc:'Клики и автоклик x2',click:2,auto:2,duration:60000},
  {id:'energySurge',name:'🔋 ENERGY SURGE',desc:'Восстановление энергии x4',regen:4,duration:60000},
  {id:'voidEvent',name:'🌑 VOID EVENT',desc:'Удача аур x5 на короткое время',luck:5,duration:30000}
];

const QUESTS=[
  {id:'tap500',name:'500 ручных кликов',get:()=>state.stats.manualTaps,target:500,reward:{clicks:5000}},
  {id:'roll25',name:'25 RNG-круток аур',get:()=>state.stats.auraRolls,target:25,reward:{crystals:5}},
  {id:'eggs5',name:'Открыть 5 яиц',get:()=>state.stats.eggsOpened,target:5,reward:{boost:'x2'}},
  {id:'rebirth1',name:'Сделать перерождение',get:()=>state.rebirths,target:1,reward:{crystals:10}},
  {id:'boss1',name:'Победить мирового босса',get:()=>state.boss.wins,target:1,reward:{boost:'x5'}}
];

const DAILY_QUEST_POOL=[
  {id:'manual',name:'Сделать 200 ручных тапов',stat:'manualTaps',target:200,reward:{clicks:12000}},
  {id:'rolls',name:'Прокрутить 30 аур',stat:'auraRolls',target:30,reward:{crystals:4}},
  {id:'eggs',name:'Открыть 3 яйца',stat:'eggsOpened',target:3,reward:{clicks:18000}},
  {id:'bosses',name:'Победить мирового босса',stat:'bossesKilled',target:1,reward:{boost:'x2'}},
  {id:'games',name:'Сыграть 2 мини-игры',stat:'miniGamesPlayed',target:2,reward:{crystals:3}}
];
const RNG_MILESTONES=[
  {id:'r100',target:100,reward:{clicks:25000}},
  {id:'r1000',target:1000,reward:{crystals:15}},
  {id:'r10000',target:10000,reward:{boost:'x5'}},
  {id:'r100000',target:100000,reward:{crystals:100,boost:'x10'}}
];

const INDEX_REWARDS=[
  {id:'i5',count:5,text:'5 аур',reward:{crystals:3}},
  {id:'i10',count:10,text:'10 аур',reward:{boost:'x2'}},
  {id:'i20',count:20,text:'20 аур',reward:{crystals:15}},
  {id:'i30',count:30,text:'30 аур',reward:{boost:'x5'}},
  {id:'i34',count:34,text:'Полный индекс',reward:{crystals:50,boost:'x10'}}
];


const defaultState = {
  clicks:0, crystals:0, totalClicks:0,
  energy:100, maxEnergy:100, energyRegen:2,
  energyMaxLevel:0, energyRegenLevel:0,
  upgradeLevels:{}, ownedAuras:[], equippedAura:null,
  petInventory:[], equippedPets:[],
  auraLevels:{}, lockedAuras:[], favoriteAuras:[],
  auraLuckLevel:0,
  auraPity:0,
  rebirths:0, souls:0,
  rebirthTree:{power:0,luck:0,energy:0,regen:0,auto:0,petPower:0,critChance:0,critPower:0,bossDamage:0,autoRollSpeed:0,soulYield:0,fourthSlot:0},
  petSort:{key:'power',direction:'desc',equippedFirst:true},
  masteryTree:{core:0,tap:0,auto:0,rng:0,pets:0,battery:0,crit:0,critPower:0,factory:0,hatch:0,boss:0,superLuck:0},
  activeWorld:'neon',unlockedWorlds:['neon'],
  petPresets:{tap:[],auto:[],boss:[]},activePetPreset:'tap',autoDeleteMax:'none',
  autoRollUnlocked:false, autoRoll:false, autoSkipOdds:128,
  luckBoosts:{x2:0,x5:0,x10:0}, luckBoostMult:1, luckBoostEnd:0,
  daily:{lastClaim:'',streak:0},
  boss:{active:false,hp:0,maxHp:0,end:0,cooldownUntil:0,wins:0},
  activeEvent:null, eventEnd:0, nextEventAt:0,
  questClaims:{}, indexRewards:{},
  dailyQuests:{date:'',base:{},claims:{}},
  rngHistory:[], rngMilestones:{},
  bestReaction:null,
  bestTargetScore:0,
  achievements:{},
  stats:{manualTaps:0,auraRolls:0,eggsOpened:0,bossesKilled:0,questsCompleted:0,miniGamesPlayed:0,playTime:0,rarestAuraOdds:0},
  syncUpdatedAt:0
};

const clone = obj => JSON.parse(JSON.stringify(obj));

let state = load();


function normalizeCloudState(saved){
  if(!saved || typeof saved!=='object')return clone(defaultState);
  return {
    ...clone(defaultState),
    ...saved,
    upgradeLevels:{...defaultState.upgradeLevels,...(saved.upgradeLevels||{})},
    ownedAuras:Array.isArray(saved.ownedAuras)?saved.ownedAuras:[],
    equippedPets:Array.isArray(saved.equippedPets)?saved.equippedPets:[],
    auraLevels:{...defaultState.auraLevels,...(saved.auraLevels||{})},
    lockedAuras:Array.isArray(saved.lockedAuras)?saved.lockedAuras:[],
    favoriteAuras:Array.isArray(saved.favoriteAuras)?saved.favoriteAuras:[],
    auraLuckLevel:Number(saved.auraLuckLevel||0),
    rebirths:Number(saved.rebirths||0),souls:Number(saved.souls||0),
    rebirthTree:{...defaultState.rebirthTree,...(saved.rebirthTree||{})},
    petSort:{...defaultState.petSort,...(saved.petSort||{})},
    masteryTree:{...defaultState.masteryTree,...(saved.masteryTree||{})},
    activeWorld:saved.activeWorld||'neon',unlockedWorlds:Array.isArray(saved.unlockedWorlds)?saved.unlockedWorlds:['neon'],
    petPresets:{...defaultState.petPresets,...(saved.petPresets||{})},activePetPreset:saved.activePetPreset||'tap',autoDeleteMax:saved.autoDeleteMax||'none',
    autoRollUnlocked:Boolean(saved.autoRollUnlocked),autoRoll:Boolean(saved.autoRoll),autoSkipOdds:Number(saved.autoSkipOdds||128),
    luckBoosts:{...defaultState.luckBoosts,...(saved.luckBoosts||{})},luckBoostMult:Number(saved.luckBoostMult||1),luckBoostEnd:Number(saved.luckBoostEnd||0),
    daily:{...defaultState.daily,...(saved.daily||{})},boss:{...defaultState.boss,...(saved.boss||{})},
    activeEvent:saved.activeEvent||null,eventEnd:Number(saved.eventEnd||0),nextEventAt:Number(saved.nextEventAt||0),
    questClaims:{...defaultState.questClaims,...(saved.questClaims||{})},indexRewards:{...defaultState.indexRewards,...(saved.indexRewards||{})},
    dailyQuests:{...defaultState.dailyQuests,...(saved.dailyQuests||{}),base:{...(saved.dailyQuests?.base||{})},claims:{...(saved.dailyQuests?.claims||{})}},
    rngHistory:Array.isArray(saved.rngHistory)?saved.rngHistory.slice(0,30):[],rngMilestones:{...defaultState.rngMilestones,...(saved.rngMilestones||{})},
    bestReaction:saved.bestReaction??null,bestTargetScore:Number(saved.bestTargetScore||0),
    energyMaxLevel:Number(saved.energyMaxLevel||0),energyRegenLevel:Number(saved.energyRegenLevel||0),
    energy:Number(saved.energy??100),maxEnergy:Number(saved.maxEnergy||100),energyRegen:Number(saved.energyRegen&&saved.energyRegen!==8?saved.energyRegen:2),
    stats:{...defaultState.stats,...(saved.stats||{})},
    petInventory:(Array.isArray(saved.petInventory)?saved.petInventory:[]).map(p=>({...p,stage:p.stage||'normal'})),
    achievements:{...defaultState.achievements,...(saved.achievements||{})},
    syncUpdatedAt:Number(saved.syncUpdatedAt||0)
  };
}

function load(){
  try{
    const raw = localStorage.getItem('neonClickerSave');
    if(!raw) return clone(defaultState);

    const saved = JSON.parse(raw);
    return {
      ...clone(defaultState),
      ...saved,
      upgradeLevels: {...defaultState.upgradeLevels, ...(saved.upgradeLevels || {})},
      ownedAuras: Array.isArray(saved.ownedAuras) ? saved.ownedAuras : [],
      petInventory: Array.isArray(saved.petInventory) ? saved.petInventory : [],
      equippedPets: Array.isArray(saved.equippedPets) ? saved.equippedPets : [],
      auraLevels: {...defaultState.auraLevels, ...(saved.auraLevels || {})},
      lockedAuras: Array.isArray(saved.lockedAuras) ? saved.lockedAuras : [],
      favoriteAuras: Array.isArray(saved.favoriteAuras) ? saved.favoriteAuras : [],
      auraLuckLevel: Number(saved.auraLuckLevel || 0),
      rebirths: Number(saved.rebirths || 0),
      souls: Number(saved.souls || 0),
      rebirthTree: {...defaultState.rebirthTree, ...(saved.rebirthTree || {})},
      petSort: {...defaultState.petSort, ...(saved.petSort || {})},
      masteryTree: {...defaultState.masteryTree, ...(saved.masteryTree || {})},
      activeWorld: saved.activeWorld || 'neon',
      unlockedWorlds: Array.isArray(saved.unlockedWorlds) ? saved.unlockedWorlds : ['neon'],
      petPresets: {...defaultState.petPresets, ...(saved.petPresets || {})},
      activePetPreset: saved.activePetPreset || 'tap',autoDeleteMax:saved.autoDeleteMax || 'none',
      autoRollUnlocked: Boolean(saved.autoRollUnlocked),
      autoRoll: Boolean(saved.autoRoll),
      autoSkipOdds: Number(saved.autoSkipOdds || 128),
      luckBoosts: {...defaultState.luckBoosts, ...(saved.luckBoosts || {})},
      luckBoostMult: Number(saved.luckBoostMult || 1),
      luckBoostEnd: Number(saved.luckBoostEnd || 0),
      daily: {...defaultState.daily, ...(saved.daily || {})},
      boss: {...defaultState.boss, ...(saved.boss || {})},
      activeEvent: saved.activeEvent || null,
      eventEnd: Number(saved.eventEnd || 0),
      nextEventAt: Number(saved.nextEventAt || 0),
      questClaims: {...defaultState.questClaims, ...(saved.questClaims || {})},
      indexRewards: {...defaultState.indexRewards, ...(saved.indexRewards || {})},
      dailyQuests: {...defaultState.dailyQuests, ...(saved.dailyQuests || {}),base:{...(saved.dailyQuests?.base||{})},claims:{...(saved.dailyQuests?.claims||{})}},
      rngHistory: Array.isArray(saved.rngHistory) ? saved.rngHistory.slice(0,30) : [],
      rngMilestones: {...defaultState.rngMilestones, ...(saved.rngMilestones || {})},
      bestReaction: saved.bestReaction ?? null,
      bestTargetScore: Number(saved.bestTargetScore || 0),
      energyMaxLevel: Number(saved.energyMaxLevel || 0),
      energyRegenLevel: Number(saved.energyRegenLevel || 0),
      energy: Number(saved.energy ?? 100),
      maxEnergy: Number(saved.maxEnergy || 100),
      energyRegen: Number(saved.energyRegen && saved.energyRegen !== 8 ? saved.energyRegen : 2),
      stats: {...defaultState.stats, ...(saved.stats || {})},
      petInventory: (Array.isArray(saved.petInventory) ? saved.petInventory : []).map(p=>({...p,stage:p.stage||'normal'})),
      achievements: {...defaultState.achievements, ...(saved.achievements || {})},
      syncUpdatedAt: Number(saved.syncUpdatedAt || 0)
    };
  }catch(err){
    console.warn('Save load error:', err);
    return clone(defaultState);
  }
}
const CLOUD_META_KEY='neon_save_meta_v1';
const CLOUD_PART_PREFIX='neon_save_part_';
const CLOUD_PART_SIZE=3000;
let cloudReady=false;
let cloudBooting=false;
let cloudTimer=null;
let cloudWriting=false;
let cloudWriteAgain=false;

function tgApp(){return window.Telegram?.WebApp||null;}
function inTelegram(){return Boolean(tgApp()?.CloudStorage&&tgApp()?.initDataUnsafe?.user?.id);}
function tgUserName(){
  const u=tgApp()?.initDataUnsafe?.user;if(!u)return 'Локальное сохранение';
  const full=[u.first_name,u.last_name].filter(Boolean).join(' ').trim();
  return u.username?`${full||'Telegram'} • @${u.username}`:(full||`Telegram ID ${u.id}`);
}
function syncUi(mode,text){
  const c=document.getElementById('telegramAccountCard'),n=document.getElementById('telegramAccountName'),s=document.getElementById('telegramSyncStatus'),b=document.getElementById('telegramSyncBtn');
  if(!c)return;c.classList.remove('cloud','syncing','error');if(mode)c.classList.add(mode);if(n)n.textContent=tgUserName();if(s)s.textContent=text||'';if(b)b.disabled=mode==='syncing'||!inTelegram();
}
function cloudGet(key){return new Promise((res,rej)=>{try{tgApp().CloudStorage.getItem(key,(e,v)=>e?rej(e):res(v||''));}catch(e){rej(e);}});}
function cloudGets(keys){return new Promise((res,rej)=>{try{tgApp().CloudStorage.getItems(keys,(e,v)=>e?rej(e):res(v||{}));}catch(e){rej(e);}});}
function cloudSet(key,value){return new Promise((res,rej)=>{try{tgApp().CloudStorage.setItem(key,value,(e,v)=>e?rej(e):res(v));}catch(e){rej(e);}});}
function cloudRemove(keys){return new Promise((res,rej)=>{if(!keys.length)return res(true);try{tgApp().CloudStorage.removeItems(keys,(e,v)=>e?rej(e):res(v));}catch(e){rej(e);}});}

async function readCloudSave(){
  if(!inTelegram())return null;
  const raw=await cloudGet(CLOUD_META_KEY);if(!raw)return null;
  let meta;try{meta=JSON.parse(raw);}catch{return null;}
  const count=Math.max(0,Math.min(100,Number(meta.chunks)||0));if(!count)return null;
  const keys=Array.from({length:count},(_,i)=>CLOUD_PART_PREFIX+i),vals=await cloudGets(keys);
  let text='';for(const k of keys){if(typeof vals[k]!=='string')return null;text+=vals[k];}
  try{const obj=JSON.parse(text);if(!obj.syncUpdatedAt)obj.syncUpdatedAt=Number(meta.updatedAt||0);return normalizeCloudState(obj);}catch(e){console.warn('cloud parse',e);return null;}
}
async function writeCloudSave(){
  if(!cloudReady||!inTelegram())return false;if(cloudWriting){cloudWriteAgain=true;return false;}cloudWriting=true;cloudWriteAgain=false;syncUi('syncing','Сохранение в Telegram…');
  try{
    const text=JSON.stringify(state),parts=[];for(let i=0;i<text.length;i+=CLOUD_PART_SIZE)parts.push(text.slice(i,i+CLOUD_PART_SIZE));
    let oldCount=0;try{oldCount=Number(JSON.parse((await cloudGet(CLOUD_META_KEY))||'{}').chunks)||0;}catch{}
    for(let i=0;i<parts.length;i++)await cloudSet(CLOUD_PART_PREFIX+i,parts[i]);
    await cloudSet(CLOUD_META_KEY,JSON.stringify({v:1,chunks:parts.length,updatedAt:state.syncUpdatedAt}));
    if(oldCount>parts.length)await cloudRemove(Array.from({length:oldCount-parts.length},(_,j)=>CLOUD_PART_PREFIX+(parts.length+j))).catch(()=>{});
    syncUi('cloud','Сохранено в Telegram');return true;
  }catch(e){console.warn('cloud write',e);syncUi('error','Ошибка синхронизации • нажми ↻');return false;}
  finally{cloudWriting=false;if(cloudWriteAgain){cloudWriteAgain=false;queueCloudSave(700);}}
}
function queueCloudSave(delay=2200){if(!cloudReady||!inTelegram()||cloudTimer)return;cloudTimer=setTimeout(async()=>{cloudTimer=null;await writeCloudSave();},delay);}
function save(){if(!inTelegram()||cloudReady)state.syncUpdatedAt=Date.now();localStorage.setItem('neonClickerSave',JSON.stringify(state));if(cloudReady)queueCloudSave();}

async function syncTelegramAccount(forceUpload=false){
  if(!inTelegram()){cloudReady=false;syncUi('','Локальный режим • облако включится при запуске из Telegram-бота');return;}
  syncUi('syncing','Синхронизация…');
  try{
    const cloud=await readCloudSave(),localTs=Number(state.syncUpdatedAt||0),cloudTs=Number(cloud?.syncUpdatedAt||0);
    if(cloud&&!forceUpload&&cloudTs>localTs){state=normalizeCloudState(cloud);localStorage.setItem('neonClickerSave',JSON.stringify(state));applyAura();render();syncUi('cloud','Прогресс загружен из Telegram');cloudReady=true;}
    else{if(!state.syncUpdatedAt)state.syncUpdatedAt=Date.now();localStorage.setItem('neonClickerSave',JSON.stringify(state));cloudReady=true;await writeCloudSave();}
  }catch(e){console.warn('cloud sync',e);cloudReady=true;syncUi('error','Не удалось синхронизировать • нажми ↻');}
}
async function clearCloudSave(){
  if(!inTelegram())return;try{let count=0;try{count=Number(JSON.parse((await cloudGet(CLOUD_META_KEY))||'{}').chunks)||0;}catch{}await cloudRemove([CLOUD_META_KEY,...Array.from({length:count},(_,i)=>CLOUD_PART_PREFIX+i)]);}catch(e){console.warn('cloud clear',e);}
}
async function initTelegramAccount(){
  if(!inTelegram()){syncUi('','Локальный режим • через Telegram один аккаунт будет работать на разных устройствах');return;}
  if(cloudBooting)return;cloudBooting=true;try{tgApp().ready();tgApp().expand();}catch{}await syncTelegramAccount(false);cloudBooting=false;
}


function haptic(type='light'){
  try{
    const tg=window.Telegram?.WebApp;
    if(tg?.HapticFeedback){
      if(type==='success') tg.HapticFeedback.notificationOccurred('success');
      else if(type==='heavy') tg.HapticFeedback.impactOccurred('heavy');
      else tg.HapticFeedback.impactOccurred('light');
      return;
    }
    if(navigator.vibrate) navigator.vibrate(type==='heavy'?[35,25,45]:15);
  }catch{}
}
function tone(freq=520,duration=.08){
  try{
    const Ctx=window.AudioContext||window.webkitAudioContext;
    if(!Ctx)return;
    const c=new Ctx(),o=c.createOscillator(),g=c.createGain();
    o.frequency.value=freq;o.type='sine';g.gain.value=.05;o.connect(g);g.connect(c.destination);o.start();g.gain.exponentialRampToValueAtTime(.001,c.currentTime+duration);o.stop(c.currentTime+duration);
  }catch{}
}
function auraFlash(a){
  const f=document.getElementById('rareFlash'); if(!f)return;
  f.style.setProperty('--flash',a.accent||'#fff'); f.classList.remove('show'); void f.offsetWidth; f.classList.add('show');
  const idx=auras.indexOf(a);
  if(idx>=30){haptic('heavy');tone(880,.22)} else if(idx>=18){haptic('success');tone(720,.14)} else if(idx>=10){haptic('heavy');tone(620,.10)}
}
function giveReward(r){
  if(!r)return;
  if(r.clicks)state.clicks+=r.clicks;
  if(r.crystals)state.crystals+=r.crystals;
  if(r.souls)state.souls+=r.souls;
  if(r.boost)state.luckBoosts[r.boost]=(state.luckBoosts[r.boost]||0)+1;
}
function useLuckBoost(key){
  const cfg={x2:{m:2,d:300000},x5:{m:5,d:60000},x10:{m:10,d:30000}}[key];
  if(!cfg||!(state.luckBoosts[key]>0))return;
  state.luckBoosts[key]--;state.luckBoostMult=cfg.m;state.luckBoostEnd=Date.now()+cfg.d;addLog(`🍀 Активирован ${key} Luck.`);haptic('success');render();save();
}


function upgradeCost(u){
  const level = state.upgradeLevels[u.id] || 0;
  return Math.floor(u.base * Math.pow(u.growth, level));
}

function baseTap(){
  return 1 + upgrades.filter(x=>x.type==='tap')
    .reduce((s,u)=>s + (state.upgradeLevels[u.id]||0)*u.amount,0);
}
function baseAuto(){
  return upgrades.filter(x=>x.type==='auto')
    .reduce((s,u)=>s + (state.upgradeLevels[u.id]||0)*u.amount,0);
}
function auraMultiplier(){
  const a = auras.find(x=>x.id===state.equippedAura);
  if(!a) return 1;
  const level = state.auraLevels[a.id] || 1;
  const levelScale = 1 + 0.12 * Math.min(level - 1,25);
  return 1 + (a.mult - 1) * levelScale;
}
function rebirthMultiplier(){
  return 1 + state.rebirths * 0.35;
}
function rebirthCost(){
  return Math.floor(100000 * Math.pow(2.5, state.rebirths));
}
function hasRebirthMilestone(at){return state.rebirths>=at;}
function currentNeonRank(){return [...NEON_RANKS].reverse().find(r=>state.rebirths>=r.at)||NEON_RANKS[0];}
function neonRankMultiplier(){return currentNeonRank().mult;}
function rebirthMilestoneIncome(){return hasRebirthMilestone(1)?1.10:1;}
function rebirthMilestonePet(){return hasRebirthMilestone(5)?1.15:1;}
function treePowerMultiplier(){ return 1 + (state.rebirthTree.power||0)*0.10; }
function treeAutoMultiplier(){ return 1 + (state.rebirthTree.auto||0)*0.15; }
function treePetMultiplier(){ return 1 + (state.rebirthTree.petPower||0)*0.08; }
function masteryLevel(id){return Number(state.masteryTree?.[id]||0);}
function masteryIncomeMultiplier(){return 1+masteryLevel('core')*0.05;}
function masteryTapMultiplier(){return 1+masteryLevel('tap')*0.08;}
function masteryAutoMultiplier(){return 1+masteryLevel('auto')*0.10+masteryLevel('factory')*0.12;}
function masteryPetMultiplier(){return (1+masteryLevel('pets')*0.05)*rebirthMilestonePet();}
function masteryBossMultiplier(){return (1+masteryLevel('boss')*0.10)*(hasRebirthMilestone(25)?1.30:1);}
function activeWorldDef(){return WORLDS.find(w=>w.id===state.activeWorld)||WORLDS[0];}
function worldAuraLimit(){return {neon:17,cyber:23,void:29,celestial:33}[state.activeWorld]??17;}
function syncWorldUnlocks(){WORLDS.forEach(w=>{if(state.rebirths>=w.rebirths&&!state.unlockedWorlds.includes(w.id))state.unlockedWorlds.push(w.id);});if(!state.unlockedWorlds.includes(state.activeWorld))state.activeWorld='neon';}
function travelWorld(id){syncWorldUnlocks();if(!state.unlockedWorlds.includes(id)){const w=WORLDS.find(x=>x.id===id);addLog(`Нужно ${w.rebirths} перерождений для портала.`);return;}state.activeWorld=id;addLog(`🌀 Переход: ${activeWorldDef().name}`);haptic('success');render();save();}
function masteryPointsEarned(){return Math.floor(state.stats.manualTaps/500)+Math.floor(state.stats.auraRolls/100)+Math.floor(state.stats.eggsOpened/10)+state.rebirths*2+Math.floor(state.boss.wins/3);}
function masteryPointsSpent(){return MASTERY_TREE_NODES.reduce((sum,n)=>sum+masteryLevel(n.id)*n.cost,0);}
function masteryPointsAvailable(){return Math.max(0,masteryPointsEarned()-masteryPointsSpent());}
function masteryNodeDef(id){return MASTERY_TREE_NODES.find(n=>n.id===id);}
function buyMasteryNode(id){const node=masteryNodeDef(id);if(!node)return;const level=masteryLevel(id);if(level>=node.max)return;if(node.requires&&masteryLevel(node.requires[0])<node.requires[1]){addLog('Сначала открой предыдущий узел этой ветви.');return;}if(masteryPointsAvailable()<node.cost){addLog(`Нужно ${node.cost} очк. мастерства.`);return;}state.masteryTree[id]=level+1;addLog(`💠 ${node.name}: ур. ${level+1}`);haptic('success');render();save();}
function petSlotLimit(){ return 3 + ((state.rebirthTree.fourthSlot||0)>0?1:0); }
function autoRollDelay(){ return Math.max(0.4,1-(state.rebirthTree.autoRollSpeed||0)*0.1-(hasRebirthMilestone(15)?0.1:0)); }
function bossDamageMultiplier(){ return 1+(state.rebirthTree.bossDamage||0)*0.20; }
function eggCostValue(egg){return Math.max(1,Math.floor(egg.cost*(1-masteryLevel('hatch')*0.03)));}
function maxEnergyValue(){ return 100 + state.energyMaxLevel*25 + (state.rebirthTree.energy||0)*20; }
function baseEnergyRegen(){ return 2 + state.energyRegenLevel*0.25 + (state.rebirthTree.regen||0)*0.25; }
function activeEventDef(){
  if(!state.activeEvent || Date.now()>=state.eventEnd) return null;
  return EVENTS.find(e=>e.id===state.activeEvent)||null;
}
function eventClickMultiplier(){ return activeEventDef()?.click || 1; }
function eventAutoMultiplier(){ return activeEventDef()?.auto || 1; }
function eventRegenMultiplier(){ return activeEventDef()?.regen || 1; }
function eventLuckMultiplier(){ return activeEventDef()?.luck || 1; }
function collectionLuckBonus(){
  const n=auras.filter(a=>state.ownedAuras.includes(a.id)).length;
  if(n>=34) return 1.00;
  if(n>=30) return 0.60;
  if(n>=20) return 0.30;
  if(n>=10) return 0.15;
  if(n>=5) return 0.05;
  return 0;
}
function activeLuckBoostMultiplier(){
  if(Date.now()>=state.luckBoostEnd){ state.luckBoostMult=1; return 1; }
  return state.luckBoostMult||1;
}
function auraLuckMultiplier(){
  const permanent=1 + state.auraLuckLevel*0.15 + (state.rebirthTree.luck||0)*0.25 + masteryLevel('rng')*0.08 + masteryLevel('superLuck')*0.15 + (hasRebirthMilestone(3)?0.10:0) + collectionLuckBonus();
  const pity=Math.min(2.5,1+Math.floor(Number(state.auraPity||0)/20)*0.05);
  return Math.min(40,permanent * activeLuckBoostMultiplier() * eventLuckMultiplier() * pity * activeWorldDef().luck);
}
function auraLuckCost(){ return Math.floor(2000 * Math.pow(1.32, state.auraLuckLevel)); }
function energyMaxCost(){ return Math.floor(8000*Math.pow(1.55,state.energyMaxLevel)); }
function energyRegenCost(){ return 5 + state.energyRegenLevel*5; }
function buyEnergyMax(){
  const c=energyMaxCost();
  if(state.clicks<c){addLog(`Не хватает ${fmt(c-state.clicks)} кликов.`);return;}
  state.clicks-=c; state.energyMaxLevel++; state.maxEnergy=maxEnergyValue(); state.energy=Math.min(state.maxEnergy,state.energy+25); haptic('success'); render(); save();
}
function buyEnergyRegen(){
  const c=energyRegenCost();
  if(state.crystals<c){addLog(`Нужно ещё ${c-state.crystals} кристаллов.`);return;}
  state.crystals-=c; state.energyRegenLevel++; state.energyRegen=baseEnergyRegen(); haptic('success'); render(); save();
}
function buyAuraLuck(){
  const cost=auraLuckCost();
  if(state.clicks < cost){
    addLog(`Не хватает ${fmt(cost-state.clicks)} кликов для прокачки удачи.`);
    return;
  }
  state.clicks-=cost;
  state.auraLuckLevel++;
  addLog(`🍀 Удача аур: ур. ${state.auraLuckLevel} • x${auraLuckMultiplier().toFixed(2)}.`);
  render();
  save();
}

// One base RNG roll. The displayed 1/N means the chance to obtain this aura or better.
function singleAuraRngIndex(){
  const roll=Math.random();
  for(let i=worldAuraLimit();i>=0;i--){
    if(roll<=1/auras[i].odds)return i;
  }
  return 0;
}

function luckyAuraRoll(){
  const luck=auraLuckMultiplier();
  const guaranteed=Math.floor(luck);
  const fractional=luck-guaranteed;
  let rolls=guaranteed;

  if(Math.random() < fractional) rolls++;

  let best=0;
  for(let i=0;i<rolls;i++){
    best=Math.max(best,singleAuraRngIndex());
  }
  return auras[Math.min(best,auras.length-1)];
}

function petMultipliers(){
  let clickBonus=0, autoBonus=0;
  state.equippedPets.forEach(uid=>{
    const entry = state.petInventory.find(p=>p.uid===uid);
    if(!entry) return;
    const p = pets[entry.petId]; if(!p)return;
    const levelBoost = Math.pow(1.35, entry.level-1);
    const stageBoost = PET_STAGES[entry.stage||'normal']?.mult||1;
    clickBonus += (p.click-1)*levelBoost*stageBoost*treePetMultiplier()*masteryPetMultiplier();
    autoBonus += (p.auto-1)*levelBoost*stageBoost*treePetMultiplier()*masteryPetMultiplier();
  });
  return {click:1+clickBonus,auto:1+autoBonus};
}
function perClick(){
  const p=petMultipliers();
  return baseTap()*auraMultiplier()*p.click*rebirthMultiplier()*treePowerMultiplier()*masteryIncomeMultiplier()*masteryTapMultiplier()*rebirthMilestoneIncome()*neonRankMultiplier()*eventClickMultiplier()*activeWorldDef().click;
}
function perSec(){
  const p=petMultipliers();
  return baseAuto()*auraMultiplier()*p.auto*rebirthMultiplier()*treePowerMultiplier()*treeAutoMultiplier()*masteryIncomeMultiplier()*masteryAutoMultiplier()*rebirthMilestoneIncome()*neonRankMultiplier()*eventAutoMultiplier()*activeWorldDef().auto;
}

function addLog(text){
  const el=document.getElementById('log');
  const d=document.createElement('div');
  d.textContent=text;
  el.prepend(d);
  while(el.children.length>8) el.lastChild.remove();
}

function spawnFloat(x,y,amount){
  const zone=document.getElementById('clickZone');
  const r=zone.getBoundingClientRect();
  const e=document.createElement('div');
  e.className='float';
  e.textContent='+'+fmt(amount);
  e.style.left=(x-r.left)+'px';
  e.style.top=(y-r.top)+'px';
  zone.appendChild(e);
  setTimeout(()=>e.remove(),800);
}

function doClick(ev){
  if(state.energy < 1){
    addLog('⚡ Энергия закончилась. Подожди немного — она восстанавливается автоматически.');
    renderTop();
    return;
  }
  if(Math.random()>=masteryLevel('battery')*0.04)state.energy=Math.max(0,state.energy-1);
  const critChance=(state.rebirthTree.critChance||0)*0.02+masteryLevel('crit')*0.01;
  const isCrit=Math.random()<critChance;
  const critMult=2+(state.rebirthTree.critPower||0)*0.5+masteryLevel('critPower')*0.25;
  const amount=perClick()*(isCrit?critMult:1);
  state.clicks += amount;
  state.totalClicks += amount;
  state.stats.manualTaps++;
  haptic('light');
  const b=document.getElementById('clickButton');
  b.classList.add('hit'); setTimeout(()=>b.classList.remove('hit'),90);
  spawnFloat(ev.clientX, ev.clientY, amount);
  if(isCrit)addLog(`💥 Критический тап x${critMult.toFixed(2)}!`);
  achievements();
  renderTop();
  save();
}

function buyUpgrade(id){
  const u=upgrades.find(x=>x.id===id);
  if(!u) return;
  const cost=upgradeCost(u);

  if(state.clicks + 1e-9 < cost){
    addLog(`Не хватает ${fmt(cost-state.clicks)} кликов для «${u.name}».`);
    renderTop();
    return;
  }

  state.clicks=Math.max(0,state.clicks-cost);
  state.upgradeLevels[id]=(state.upgradeLevels[id]||0)+1;
  addLog(`Куплено: ${u.name} ур. ${state.upgradeLevels[id]}`);
  render();
  save();
}

function equipAura(id){
  if(!state.ownedAuras.includes(id)) return;
  state.equippedAura=id;
  applyAura();
  render();
  save();
}

function rollAura(options={}){
  const auto=Boolean(options.auto);
  const silent=Boolean(options.silent),defer=Boolean(options.defer);
  const cost=500;
  if(state.clicks<cost){
    if(auto){state.autoRoll=false;addLog('Auto Roll остановлен: недостаточно кликов.');}
    else addLog('Недостаточно кликов для RNG ауры.');
    render();return null;
  }
  state.clicks-=cost; state.stats.auraRolls++;

  const a=luckyAuraRoll(); const id=a.id; const wasOwned=state.ownedAuras.includes(id);
  if(a.odds>=4000)state.auraPity=0;else state.auraPity=Number(state.auraPity||0)+1;
  if(wasOwned){ state.auraLevels[id]=(state.auraLevels[id]||1)+1; }
  else{
    state.ownedAuras.push(id); state.auraLevels[id]=1;
    const currentLocked=state.equippedAura&&state.lockedAuras.includes(state.equippedAura);
    if(!currentLocked)state.equippedAura=id;
  }
  state.stats.rarestAuraOdds=Math.max(state.stats.rarestAuraOdds||0,a.odds);
  state.rngHistory=[{id:a.id,odds:a.odds,time:Date.now()},...(state.rngHistory||[])].slice(0,30);
  applyAura(); achievements();

  const skipped=auto && a.odds<state.autoSkipOdds;
  if(!silent&&!skipped){
    const result=document.getElementById('auraRollResult');
    if(result)result.innerHTML=`<span style="color:${rarity[a.rarity].color}">${a.name}<br>1/${a.odds.toLocaleString('ru-RU')} • Luck x${auraLuckMultiplier().toFixed(2)}${wasOwned?`<br>ДУБЛИКАТ → ур. ${state.auraLevels[id]}`:''}</span>`;
    addLog(`${wasOwned?'Дубликат':'Новая аура'}: ${a.name} • 1/${a.odds.toLocaleString('ru-RU')}`);
    if(!auto)auraFlash(a); else if(a.odds>=4000)auraFlash(a);
  }
  if(!defer){render();save();}return a;
}
function rollAuraBatch(count){
  const total=count*500;if(state.clicks<total){addLog(`Для x${count} нужно ${fmt(total)} кликов.`);return;}
  let best=null,newCount=0;
  for(let i=0;i<count;i++){
    const before=state.ownedAuras.length,a=rollAura({auto:true,silent:true,defer:true});
    if(!a)break;if(state.ownedAuras.length>before)newCount++;if(!best||a.odds>best.odds)best=a;
  }
  if(best){const result=document.getElementById('auraRollResult');if(result)result.innerHTML=`<span style="color:${rarity[best.rarity].color}">x${count}: лучшая — ${best.name}<br>1/${best.odds.toLocaleString('ru-RU')} • новых: ${newCount}</span>`;addLog(`Multi Roll x${count}: ${best.name} • 1/${best.odds.toLocaleString('ru-RU')}`);if(best.odds>=4000)auraFlash(best);}
  render();save();
}
function toggleAuraLock(id){
  if(!state.ownedAuras.includes(id))return;
  const i=state.lockedAuras.indexOf(id); if(i>=0)state.lockedAuras.splice(i,1);else state.lockedAuras.push(id);render();save();
}
function toggleAuraFavorite(id){
  if(!state.ownedAuras.includes(id))return;
  const i=state.favoriteAuras.indexOf(id); if(i>=0)state.favoriteAuras.splice(i,1);else state.favoriteAuras.push(id);render();save();
}
function unlockAutoRoll(){
  if(state.autoRollUnlocked)return;
  if(state.crystals<20){addLog('Для Auto Roll нужно 20 кристаллов.');return;}
  state.crystals-=20;state.autoRollUnlocked=true;addLog('🤖 Auto Roll разблокирован!');render();save();
}
function toggleAutoRoll(){
  if(!state.autoRollUnlocked)return unlockAutoRoll();
  state.autoRoll=!state.autoRoll;addLog(state.autoRoll?'Auto Roll включён.':'Auto Roll выключен.');render();save();
}

function applyAura(){
  const a=auras.find(x=>x.id===state.equippedAura);
  // Интерфейс всегда остаётся одного цвета.
  // Экипированная аура меняет только кольцо/свечение вокруг кнопки.
  document.documentElement.style.setProperty('--aura-accent',a?.accent||'#00eaff');
  document.documentElement.style.setProperty('--aura-accent2',a?.accent2||'#7a5cff');
  document.documentElement.style.setProperty('--accent','#00eaff');
  document.documentElement.style.setProperty('--accent2','#7a5cff');
}

function roll(chances){
  let r=Math.random()*100;
  for(const [id,c] of chances){ if(r<c)return id; r-=c; }
  return chances[chances.length-1][0];
}
function openEgg(id){
  const egg=eggs.find(x=>x.id===id);
  if(!egg||egg.world!==state.activeWorld)return;
  const cost=eggCostValue(egg);if(state[egg.currency] < cost) return;
  state[egg.currency]-=cost;
  const rolledRarity=roll(egg.rarityChances);
  const candidates=Object.entries(pets).filter(([petId,p])=>p.rarity===rolledRarity&&egg.petPool.includes(petId));
  const petId=candidates[Math.floor(Math.random()*candidates.length)][0];
  const uid=(window.crypto && typeof window.crypto.randomUUID==='function')
    ? window.crypto.randomUUID()
    : Date.now()+'_'+Math.random().toString(36).slice(2);
  const p=pets[petId];
  state.stats.eggsOpened++;
  const deleteRank=state.autoDeleteMax==='none'?-1:PET_RARITY_RANK[state.autoDeleteMax];
  if(PET_RARITY_RANK[p.rarity]<=deleteRank)addLog(`Auto Delete: ${p.name} (${rarity[p.rarity].name})`);
  else{state.petInventory.push({uid,petId,level:1,stage:'normal',world:egg.world});addLog(`Из яйца выпал: ${p.name} (${rarity[p.rarity].name})`);}
  haptic(p.rarity==='mythical'?'heavy':'light');
  achievements();
  render(); save();
}
function openEggBatch(id,count){const egg=eggs.find(x=>x.id===id);if(!egg||egg.world!==state.activeWorld)return;const cost=eggCostValue(egg)*count;if(state[egg.currency]<cost){addLog(`Для x${count} нужно ${fmt(cost)} ${egg.currency==='crystals'?'кристаллов':'кликов'}.`);return;}for(let i=0;i<count;i++)openEgg(id);addLog(`🥚 Открыто яиц: ${count}.`);render();save();}

function toggleEquip(uid){
  const i=state.equippedPets.indexOf(uid);
  if(i>=0) state.equippedPets.splice(i,1);
  else if(state.equippedPets.length<petSlotLimit()) state.equippedPets.push(uid);
  render(); save();
}
function deletePet(uid){
  state.petInventory=state.petInventory.filter(p=>p.uid!==uid);
  state.equippedPets=state.equippedPets.filter(x=>x!==uid);
  render(); save();
}
function fusePet(uid){
  const target=state.petInventory.find(p=>p.uid===uid);
  if(!target)return;
  const matches=state.petInventory.filter(p=>p.petId===target.petId && p.level===target.level && p.uid!==uid && !state.equippedPets.includes(p.uid));
  if(matches.length<2){addLog('Для слияния нужны ещё 2 одинаковых питомца того же уровня.');return;}
  const consumed=matches.slice(0,2).map(p=>p.uid);
  state.petInventory=state.petInventory.filter(p=>!consumed.includes(p.uid));
  target.level++;
  addLog(`${pets[target.petId].name} повышен до ур. ${target.level}`);
  render(); save();
}
function evolvePet(uid){
  const target=state.petInventory.find(p=>p.uid===uid); if(!target)return;
  const stage=target.stage||'normal'; const pos=PET_STAGE_ORDER.indexOf(stage);
  if(pos<0||pos>=PET_STAGE_ORDER.length-1){addLog('Этот питомец уже Void.');return;}
  const matches=state.petInventory.filter(p=>p.petId===target.petId&&(p.stage||'normal')===stage&&p.uid!==uid&&!state.equippedPets.includes(p.uid));
  if(matches.length<2){addLog(`Для эволюции нужны ещё 2 таких питомца стадии ${PET_STAGES[stage].name}.`);return;}
  const consume=matches.slice(0,2).map(p=>p.uid); state.petInventory=state.petInventory.filter(p=>!consume.includes(p.uid));
  target.stage=PET_STAGE_ORDER[pos+1]; addLog(`✨ ${pets[target.petId].name} → ${PET_STAGES[target.stage].name}!`);haptic('success');render();save();
}
function petScore(entry){
  const p=pets[entry.petId];if(!p)return 0;const boost=Math.pow(1.35,entry.level-1)*(PET_STAGES[entry.stage||'normal']?.mult||1);return ((p.click-1)+(p.auto-1))*boost;
}
function autoEquipBestPets(){
  state.equippedPets=[...state.petInventory].sort((a,b)=>petScore(b)-petScore(a)).slice(0,petSlotLimit()).map(p=>p.uid);
  addLog(`⚡ Экипированы ${state.equippedPets.length} самых сильных питомца.`);render();save();
}
function fuseAllPets(){
  let fused=0,changed=true;
  while(changed){changed=false;const groups={};state.petInventory.filter(p=>!state.equippedPets.includes(p.uid)).forEach(p=>{const k=`${p.petId}|${p.level}|${p.stage||'normal'}`;(groups[k]??=[]).push(p);});
    for(const group of Object.values(groups)){if(group.length<3)continue;const target=group[0],consume=new Set(group.slice(1,3).map(p=>p.uid));state.petInventory=state.petInventory.filter(p=>!consume.has(p.uid));target.level++;fused++;changed=true;break;}
  }
  addLog(fused?`🧬 Выполнено слияний: ${fused}.`:'Нет доступных троек для слияния.');render();save();
}
function savePetPreset(){const key=state.activePetPreset||'tap';state.petPresets[key]=[...state.equippedPets];addLog(`💾 Пресет «${key}» сохранён.`);save();}
function loadPetPreset(){const key=state.activePetPreset||'tap',owned=new Set(state.petInventory.map(p=>p.uid));state.equippedPets=(state.petPresets[key]||[]).filter(uid=>owned.has(uid)).slice(0,petSlotLimit());addLog(`🐾 Пресет «${key}» экипирован.`);render();save();}

function achievements(){
  const found=auras.filter(a=>state.ownedAuras.includes(a.id)).length;
  const milestones=[
    {id:'c1',check:()=>state.totalClicks>=1000,reward:{crystals:2},text:'1 000 суммарных кликов'},
    {id:'c2',check:()=>state.totalClicks>=100000,reward:{crystals:8},text:'100 000 суммарных кликов'},
    {id:'million',check:()=>state.totalClicks>=1000000,reward:{crystals:15},text:'Первый миллион'},
    {id:'reb10',check:()=>state.rebirths>=10,reward:{crystals:25},text:'10 перерождений'},
    {id:'a10',check:()=>found>=10,reward:{boost:'x2'},text:'Собрать 10 аур'},
    {id:'a20',check:()=>found>=20,reward:{crystals:20},text:'Собрать 20 аур'},
    {id:'rare65536',check:()=>state.stats.rarestAuraOdds>=65536,reward:{boost:'x5'},text:'Выбить ауру 1/65 536+'},
    {id:'boss3',check:()=>state.boss.wins>=3,reward:{crystals:20},text:'Победить 3 боссов'}
  ];
  milestones.forEach(a=>{
    if(!state.achievements[a.id]&&a.check()){
      state.achievements[a.id]=true;giveReward(a.reward);addLog(`🏆 Достижение: ${a.text}`);haptic('success');
    }
  });
}

function renderTop(){
  state.maxEnergy=maxEnergyValue();state.energyRegen=baseEnergyRegen();state.energy=Math.min(state.energy,state.maxEnergy);
  const energyPct=Math.max(0,Math.min(100,(state.energy/state.maxEnergy)*100));
  const energyText=`${Math.floor(state.energy)} / ${state.maxEnergy}`;
  const energyTop=document.getElementById('energyTop');
  const energyLabel=document.getElementById('energyText');
  const energyFill=document.getElementById('energyFill');
  const clickBtn=document.getElementById('clickButton');
  if(energyTop) energyTop.textContent=energyText;
  if(energyLabel) energyLabel.textContent=energyText;
  if(energyFill) energyFill.style.width=energyPct+'%';
  if(clickBtn) clickBtn.classList.toggle('no-energy',state.energy<1);
  document.getElementById('clicks').textContent=fmt(state.clicks);
  document.getElementById('crystals').textContent=fmt(state.crystals);
  document.getElementById('perClick').textContent=fmt(perClick());
  document.getElementById('perSec').textContent=fmt(perSec());
  document.getElementById('rebirths').textContent=state.rebirths;
  document.getElementById('rebirthMult').textContent='x'+rebirthMultiplier().toFixed(2).replace(/\.00$/,'');
  document.getElementById('basePower').textContent=fmt(baseTap());
  document.getElementById('auraMult').textContent='x'+auraMultiplier().toFixed(2).replace(/\.00$/,'');
  const pm=petMultipliers();
  document.getElementById('petClickMult').textContent='x'+pm.click.toFixed(2);
  document.getElementById('petAutoMult').textContent='x'+pm.auto.toFixed(2);
  document.getElementById('petSlots').textContent=`${state.equippedPets.length} / ${petSlotLimit()}`;
  document.getElementById('equippedAuraLabel').textContent='Аура: '+(auras.find(a=>a.id===state.equippedAura)?.name||'Нет');
  document.getElementById('equippedPets').textContent=state.equippedPets.length
    ? state.equippedPets.map(uid=>{
        const e=state.petInventory.find(p=>p.uid===uid);
        return e?`${pets[e.petId].name} • ур.${e.level}`:'';
      }).join(' • ')
    :'Пусто';
}

function renderUpgrades(){
  const el=document.getElementById('upgradeList');
  el.innerHTML='';

  const renderGroup=(type,title,subtitle)=>{
    const head=document.createElement('div');
    head.className='upgrade-group-head';
    head.innerHTML=`<div><h2>${title}</h2><p>${subtitle}</p></div><span class="badge">${upgrades.filter(u=>u.type===type).length} улучшений</span>`;
    el.appendChild(head);

    const grid=document.createElement('div');
    grid.className='upgrade-group-grid';

    upgrades.filter(u=>u.type===type).forEach(u=>{
      const level=state.upgradeLevels[u.id]||0;
      const cost=upgradeCost(u);
      const affordable=state.clicks>=cost;
      const d=document.createElement('div');
      d.className='item upgrade-card '+(affordable?'affordable':'');
      d.innerHTML=`
        <div class="upgrade-card-top">
          <span class="badge">${type==='tap'?'Сила тапа':'Автоклик'}</span>
          ${u.tier?`<span class="upgrade-tier">T${u.tier}</span>`:''}
        </div>
        <h3>${u.name}</h3>
        <p class="upgrade-power">+${fmt(u.amount)} ${type==='tap'?'к базовой силе':'кликов/сек'}</p>
        <p>Уровень: <b>${level}</b> • Сейчас даёт: <b>+${fmt(level*u.amount)}</b></p>
        <button style="${affordable?'':'opacity:.7'}">Купить за ${fmt(cost)} кликов</button>`;
      d.querySelector('button').addEventListener('click',()=>buyUpgrade(u.id));
      grid.appendChild(d);
    });
    el.appendChild(grid);
  };

  renderGroup('tap','👆 Улучшения клика','Прокачивай базовую силу каждого нажатия. Новые тиры рассчитаны на позднюю игру.');
  renderGroup('auto','🤖 Автоклик','Пассивный доход от T1 до T6 — от робота-сборщика до небесной автоматики.');
}
function renderAuras(){
  const el=document.getElementById('auraList'); el.innerHTML='';

  auras.forEach(a=>{
    const owned=state.ownedAuras.includes(a.id);
    const equipped=state.equippedAura===a.id;
    const level=state.auraLevels[a.id] || 0;
    const currentMult = owned ? (1 + (a.mult - 1) * (1 + 0.15*(level-1))) : a.mult;

    const d=document.createElement('div'); d.className='item';
    d.style.boxShadow=`inset 0 0 28px ${a.accent}18`;

    d.innerHTML=`
      <span class="badge" style="color:${rarity[a.rarity].color}">${rarity[a.rarity].name}</span>
      <h3>${owned?a.name:'???'}</h3>
      <p class="aura-odds"><b>1/${a.odds.toLocaleString('ru-RU')}</b></p>
      <p>${owned?`Уровень: <b>${level}</b>`:'Ещё не получена'}</p>
      <p>${owned?`Множитель: <b>x${currentMult.toFixed(2)}</b>`:`Базовый множитель: x${a.mult}`}</p>
      <button ${!owned||equipped?'disabled':''}>
        ${equipped?'Экипирована':owned?'Экипировать':'Получается через RNG'}
      </button>`;

    if(owned && !equipped) d.querySelector('button').onclick=()=>equipAura(a.id);
    el.appendChild(d);
  });

  const rollBtn=document.getElementById('rollAuraBtn');
  if(rollBtn){
    rollBtn.disabled=false;
    rollBtn.style.opacity=state.clicks>=500?'1':'.7';
  }
}

function renderEggs(){
  const el=document.getElementById('eggList'); el.innerHTML='';
  eggs.filter(e=>e.world===state.activeWorld).forEach(e=>{
    const cost=eggCostValue(e);
    const chances=e.rarityChances.map(([r,c])=>`${rarity[r].name}: ${c}%`).join(' • ');
    const d=document.createElement('div'); d.className='item';
    d.innerHTML=`
      <span class="badge">${activeWorldDef().name}</span><h3>${e.name}</h3>
      <p>${chances}</p>
      <button ${state[e.currency]<cost?'disabled':''}>Открыть за ${fmt(cost)} ${e.currency==='crystals'?'кристаллов':'кликов'}</button>
      <button class="egg-x10" ${state[e.currency]<cost*10?'disabled':''}>Открыть x10 • ${fmt(cost*10)}</button>`;
    d.querySelector('button').onclick=()=>openEgg(e.id);
    d.querySelector('.egg-x10').onclick=()=>openEggBatch(e.id,10);
    el.appendChild(d);
  })
}
function renderPets(){
  const el=document.getElementById('petInventory'); el.innerHTML='';
  const sort={...defaultState.petSort,...(state.petSort||{})};state.petSort=sort;
  const count=document.getElementById('petInventoryCount');if(count)count.textContent=`${state.petInventory.length} питомцев`;
  if(!state.petInventory.length){el.innerHTML='<p class="small">Питомцев пока нет. Открой яйцо.</p>';return;}
  const petPower=entry=>{const p=pets[entry.petId];if(!p)return 0;const boost=Math.pow(1.35,entry.level-1)*(PET_STAGES[entry.stage||'normal']?.mult||1);return ((p.click-1)+(p.auto-1))*boost;};
  const entries=[...state.petInventory].sort((a,b)=>{
    const ae=state.equippedPets.includes(a.uid),be=state.equippedPets.includes(b.uid);
    if(sort.equippedFirst&&ae!==be)return ae?-1:1;
    let av,bv;
    if(sort.key==='rarity'){av=PET_RARITY_RANK[pets[a.petId]?.rarity]||0;bv=PET_RARITY_RANK[pets[b.petId]?.rarity]||0;}
    else if(sort.key==='level'){av=a.level;bv=b.level;}
    else if(sort.key==='name'){av=pets[a.petId]?.name||'';bv=pets[b.petId]?.name||'';}
    else if(sort.key==='newest'){av=state.petInventory.indexOf(a);bv=state.petInventory.indexOf(b);}
    else{av=petPower(a);bv=petPower(b);}
    const cmp=typeof av==='string'?av.localeCompare(bv,'ru'):av-bv;
    return sort.direction==='asc'?cmp:-cmp;
  });
  entries.forEach(entry=>{
    const p=pets[entry.petId], equipped=state.equippedPets.includes(entry.uid);
    if(!p) return;
    const boost=Math.pow(1.35,entry.level-1);
    const stage=entry.stage||'normal', stageBoost=PET_STAGES[stage]?.mult||1;
    const click=1+(p.click-1)*boost*stageBoost*treePetMultiplier()*masteryPetMultiplier(), auto=1+(p.auto-1)*boost*stageBoost*treePetMultiplier()*masteryPetMultiplier();
    const d=document.createElement('div'); d.className='pet '+(equipped?'equipped':'');
    d.innerHTML=`
      <h3>${p.name} <span class="small">ур.${entry.level}</span></h3>
      <p class="small">Тап x${click.toFixed(2)} • Авто x${auto.toFixed(2)}${stage!=='normal'?` • ${PET_STAGES[stage].name} x${stageBoost}`:''}</p>
      <button class="primary">${equipped?'Снять':'Экипировать'}</button>
      <button class="primary fuse">Слияние уровня</button>
      <button class="primary evolve">Эволюция</button>
      <button class="danger">Удалить</button>`;
    const btns=d.querySelectorAll('button');
    btns[0].onclick=()=>toggleEquip(entry.uid);
    btns[1].onclick=()=>fusePet(entry.uid);
    btns[2].onclick=()=>evolvePet(entry.uid);
    btns[3].onclick=()=>deletePet(entry.uid);
    el.appendChild(d);
  })
}
function renderRebirth(){
  const c = rebirthCost();
  const count = document.getElementById('rebirthCount');
  if(!count) return;

  document.getElementById('rebirthCount').textContent = state.rebirths;
  document.getElementById('rebirthMultiplier').textContent = 'x'+rebirthMultiplier().toFixed(2).replace(/\.00$/,'');
  document.getElementById('rebirthCost').textContent = fmt(c);
  const soulEl=document.getElementById('rebirthSouls'); if(soulEl)soulEl.textContent=state.souls;

  const btn = document.getElementById('rebirthBtn');
  btn.disabled = false;
  btn.style.opacity = state.clicks >= c ? '1' : '.7';
  btn.textContent = state.clicks >= c
    ? `Переродиться за ${fmt(c)} кликов`
    : `Нужно ${fmt(c)} кликов`;
}
function renderRebirthMilestones(){const el=document.getElementById('rebirthMilestones');if(!el)return;const complete=REBIRTH_MILESTONES.filter(m=>hasRebirthMilestone(m.at)).length;document.getElementById('rebirthMilestoneCount').textContent=`${complete} / ${REBIRTH_MILESTONES.length}`;el.innerHTML=REBIRTH_MILESTONES.map(m=>{const done=hasRebirthMilestone(m.at);return `<div class="rebirth-milestone ${done?'done':''}"><div class="milestone-orb">${done?'✓':m.at}</div><div><b>${m.at} ♻️ • ${m.name}</b><p>${m.desc}</p></div><span>${done?'АКТИВНО':'ЗАКРЫТО'}</span></div>`;}).join('');}

function doRebirth(){
  const cost = rebirthCost();
  if(state.clicks < cost){ addLog(`Для перерождения нужно ${fmt(cost-state.clicks)} кликов.`); return; }

  state.rebirths++;
  const soulsEarned=1+Math.floor((state.rebirthTree.soulYield||0)/3)+(hasRebirthMilestone(10)?1:0);
  state.souls+=soulsEarned;
  state.clicks = 0;
  state.upgradeLevels = {};
  state.crystals += 3;

  addLog(`Перерождение #${state.rebirths}! +${soulsEarned} Soul • множитель x${rebirthMultiplier().toFixed(2)}.`);haptic('success');
  render();
  save();
}


function soulNodeDef(id){return SOUL_TREE_NODES.find(n=>n.id===id);}
function soulNodeCost(id){const n=soulNodeDef(id);return n?Math.ceil(n.baseCost*Math.pow(1.55,state.rebirthTree[id]||0)):Infinity;}
function buySoulNode(id){
  const node=soulNodeDef(id);if(!node)return;
  const level=state.rebirthTree[id]||0;if(level>=node.max){addLog('Узел уже улучшен до максимума.');return;}
  if(node.requires&&(state.rebirthTree[node.requires[0]]||0)<node.requires[1]){addLog('Сначала открой предыдущий узел дерева.');return;}
  const c=soulNodeCost(id); if(state.souls<c){addLog(`Нужно ${c} Soul.`);return;}
  state.souls-=c;state.rebirthTree[id]++;state.maxEnergy=maxEnergyValue();state.energyRegen=baseEnergyRegen();addLog(`Дерево: ${id} → ур. ${state.rebirthTree[id]}`);haptic('success');render();save();
}

// ===== Мини-игра 1: Реакция =====
let reactionTimer=null;
let reactionStartedAt=0;
let reactionPhase='idle';

function updateReactionStatus(extra=''){
  const best = state.bestReaction ? `${Math.round(state.bestReaction)} мс` : '—';
  document.getElementById('reactionStatus').textContent =
    `Лучший результат: ${best}${extra ? ' • '+extra : ''}`;
}

function startReaction(){
  const btn=document.getElementById('reactionButton');

  if(reactionPhase==='idle'){
    reactionPhase='waiting';
    btn.textContent='ЖДИ СИГНАЛА...';
    btn.className='reaction-btn waiting';
    updateReactionStatus('не нажимай раньше');

    const delay=900+Math.random()*1800;
    reactionTimer=setTimeout(()=>{
      reactionPhase='ready';
      reactionStartedAt=performance.now();
      btn.textContent='НАЖМИ!';
      btn.className='reaction-btn ready';
      updateReactionStatus('СЕЙЧАС!');
    },delay);
    return;
  }

  if(reactionPhase==='waiting'){
    clearTimeout(reactionTimer);
    reactionPhase='idle';
    btn.textContent='СТАРТ';
    btn.className='reaction-btn';
    updateReactionStatus('слишком рано');
    addLog('Реакция: фальстарт.');
    return;
  }

  if(reactionPhase==='ready'){
    const ms=performance.now()-reactionStartedAt;
    reactionPhase='idle';
    btn.textContent='ЕЩЁ РАЗ';
    btn.className='reaction-btn';

    if(!state.bestReaction || ms<state.bestReaction) state.bestReaction=ms;

    let reward=250;
    if(ms<220) reward=2500;
    else if(ms<300) reward=1500;
    else if(ms<400) reward=900;
    else if(ms<550) reward=500;

    state.clicks+=reward; state.stats.miniGamesPlayed++;
    let crystalText='';
    if(ms<220){
      state.crystals+=1;
      crystalText=' +1 кристалл';
    }

    updateReactionStatus(`${Math.round(ms)} мс • +${fmt(reward)} кликов${crystalText}`);
    addLog(`Мини-игра «Реакция»: ${Math.round(ms)} мс, +${fmt(reward)} кликов${crystalText}.`);
    render();
    save();
  }
}

// ===== Мини-игра 2: Неоновая цель =====
let targetGameActive=false;
let targetScore=0;
let targetGameEndsAt=0;
let targetGameTimer=null;

function moveTarget(){
  const field=document.getElementById('targetField');
  const target=document.getElementById('targetButton');
  const pad=38;
  const w=Math.max(field.clientWidth,120);
  const h=Math.max(field.clientHeight,120);
  const x=pad+Math.random()*Math.max(1,w-pad*2);
  const y=pad+Math.random()*Math.max(1,h-pad*2);
  target.style.left=x+'px';
  target.style.top=y+'px';
}

function hitTarget(){
  if(!targetGameActive) return;
  targetScore++;
  document.getElementById('targetStatus').textContent=`Счёт: ${targetScore}`;
  moveTarget();
}

function startTargetGame(){
  if(targetGameActive) return;

  targetGameActive=true;
  targetScore=0;
  targetGameEndsAt=Date.now()+10000;

  const target=document.getElementById('targetButton');
  const start=document.getElementById('targetStartButton');
  target.classList.remove('hidden');
  start.disabled=true;
  start.textContent='Игра идёт...';
  document.getElementById('targetStatus').textContent='Счёт: 0';
  moveTarget();

  targetGameTimer=setInterval(()=>{
    const left=Math.max(0,targetGameEndsAt-Date.now());
    document.getElementById('targetStatus').textContent=
      `Счёт: ${targetScore} • ${Math.ceil(left/1000)} сек`;

    if(left<=0){
      clearInterval(targetGameTimer);
      targetGameActive=false;
      target.classList.add('hidden');
      start.disabled=false;
      start.textContent='Играть снова';

      if(targetScore>state.bestTargetScore) state.bestTargetScore=targetScore;

      const reward=targetScore*300;
      state.clicks+=reward; state.stats.miniGamesPlayed++;

      let bonus='';
      if(targetScore>=15){
        state.crystals+=2;
        bonus=' +2 кристалла';
      }else if(targetScore>=10){
        state.crystals+=1;
        bonus=' +1 кристалл';
      }

      document.getElementById('targetStatus').textContent=
        `Результат: ${targetScore} • Рекорд: ${state.bestTargetScore} • +${fmt(reward)} кликов${bonus}`;
      addLog(`«Неоновая цель»: ${targetScore} попаданий, +${fmt(reward)} кликов${bonus}.`);
      render();
      save();
    }
  },100);
}

function renderMinigames(){
  updateReactionStatus();
  if(!targetGameActive){
    document.getElementById('targetStatus').textContent=
      `Рекорд: ${state.bestTargetScore || 0} попаданий`;
  }
}


function questRewardText(r){
  const parts=[];if(r.clicks)parts.push(`+${fmt(r.clicks)} кликов`);if(r.crystals)parts.push(`+${r.crystals} 💎`);if(r.boost)parts.push(`+1 ${r.boost} Luck`);return parts.join(' • ');
}
function claimQuest(id){
  ensureDailyQuests();const q=dailyQuestSelection().find(x=>x.id===id);if(!q)return;const value=Math.max(0,(state.stats[q.stat]||0)-(state.dailyQuests.base[q.stat]||0));if(state.dailyQuests.claims[id]||value<q.target)return;
  state.dailyQuests.claims[id]=true;giveReward(q.reward);state.stats.questsCompleted++;addLog(`✅ Ежедневное задание: ${q.name}`);haptic('success');render();save();
}
function localDayKey(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function dailyQuestSelection(){const key=localDayKey(),seed=[...key].reduce((s,c)=>s+c.charCodeAt(0),0),pool=[...DAILY_QUEST_POOL];return Array.from({length:3},(_,i)=>pool.splice((seed+i*7)%pool.length,1)[0]);}
function ensureDailyQuests(){
  const key=localDayKey();if(state.dailyQuests?.date===key)return;
  const base={};DAILY_QUEST_POOL.forEach(q=>base[q.stat]=Number(state.stats[q.stat]||0));state.dailyQuests={date:key,base,claims:{}};
}
function yesterdayKey(){const d=new Date();d.setDate(d.getDate()-1);return localDayKey(d);}
function dailyRewardFor(day){
  return [
    {clicks:5000},{crystals:2},{boost:'x2'},{clicks:25000},{crystals:5},{boost:'x5'},{crystals:15,boost:'x10'}
  ][(day-1)%7];
}
function canClaimDaily(){return state.daily.lastClaim!==localDayKey();}
function claimDaily(){
  if(!canClaimDaily())return;
  state.daily.streak=state.daily.lastClaim===yesterdayKey()?Math.min(7,state.daily.streak+1):1;
  state.daily.lastClaim=localDayKey();const r=dailyRewardFor(state.daily.streak);giveReward(r);addLog(`🎁 День ${state.daily.streak}: ${questRewardText(r)}`);haptic('success');render();save();
}
function claimIndexReward(id){
  const r=INDEX_REWARDS.find(x=>x.id===id);if(!r||state.indexRewards[id])return;
  const found=auras.filter(a=>state.ownedAuras.includes(a.id)).length;if(found<r.count)return;
  state.indexRewards[id]=true;giveReward(r.reward);addLog(`📖 Индекс ${r.text}: ${questRewardText(r.reward)}`);haptic('success');render();save();
}
function claimRngMilestone(id){const m=RNG_MILESTONES.find(x=>x.id===id);if(!m||state.rngMilestones[id]||state.stats.auraRolls<m.target)return;state.rngMilestones[id]=true;giveReward(m.reward);addLog(`🏁 ${fmt(m.target)} RNG-роллов: ${questRewardText(m.reward)}`);haptic('success');render();save();}
function startRandomEvent(){
  const e=EVENTS[Math.floor(Math.random()*EVENTS.length)];state.activeEvent=e.id;state.eventEnd=Date.now()+e.duration;state.nextEventAt=state.eventEnd+90000;addLog(`${e.name}: ${e.desc}`);haptic('success');render();save();
}
function eventTimeLeft(){return Math.max(0,state.eventEnd-Date.now());}

function bossMaxHp(){ return Math.max(50000,Math.floor(perClick()*850 + perSec()*120)); }
function startBoss(){
  if(state.boss.active)return;
  if(Date.now()<state.boss.cooldownUntil){addLog('Босс ещё восстанавливается.');return;}
  const hp=bossMaxHp();state.boss.active=true;state.boss.hp=hp;state.boss.maxHp=hp;state.boss.end=Date.now()+45000;addLog('👹 WORLD BOSS появился! 45 секунд.');haptic('heavy');render();save();
}
function attackBoss(){
  if(!state.boss.active)return;
  if(state.energy<1){addLog('Нет энергии для удара по боссу.');return;}
  state.energy-=1;const dmg=perClick()*8*bossDamageMultiplier()*masteryBossMultiplier();state.boss.hp-=dmg;haptic('light');if(state.boss.hp<=0)winBoss();renderBoss();renderTop();save();
}
function winBoss(){
  if(!state.boss.active)return;
  state.boss.active=false;state.boss.wins++;state.stats.bossesKilled++;state.crystals+=10+Math.min(20,state.rebirths);state.luckBoosts.x2++;state.boss.cooldownUntil=Date.now()+120000;addLog('🏆 Босс побеждён! Кристаллы + x2 Luck potion.');haptic('success');achievements();render();save();
}
function failBoss(){
  state.boss.active=false;state.boss.cooldownUntil=Date.now()+60000;addLog('Босс ушёл. Попробуй снова через минуту.');render();save();
}

function auraIndexMultiplier(a,level){
  if(!level) return a.mult;
  const levelScale=1+0.12*Math.min(level-1,25);
  return 1+(a.mult-1)*levelScale;
}

function renderAuraLuck(){
  const level=document.getElementById('auraLuckLevel');
  if(!level) return;

  const mult=auraLuckMultiplier();
  document.getElementById('auraLuckLevel').textContent=state.auraLuckLevel;
  document.getElementById('auraLuckMult').textContent='x'+mult.toFixed(2);
  document.getElementById('auraLuckCost').textContent=fmt(auraLuckCost());

  const whole=Math.floor(mult);
  const fraction=Math.round((mult-whole)*100);
  document.getElementById('auraLuckRolls').textContent=
    fraction>0 ? `${whole} + ${fraction}% доп.` : `${whole} гарант.`;

  const btn=document.getElementById('auraLuckBtn');
  if(btn){
    btn.textContent=`Прокачать за ${fmt(auraLuckCost())} кликов`;
    btn.style.opacity=state.clicks>=auraLuckCost()?'1':'.72';
  }
}

function renderAuraIndex(){
  const grid=document.getElementById('auraIndexGrid');if(!grid)return;
  const found=auras.filter(a=>state.ownedAuras.includes(a.id)).length;
  document.getElementById('auraIndexCounter').textContent=`${found} / ${auras.length}`;
  document.getElementById('auraIndexProgress').style.width=(found/auras.length*100)+'%';
  grid.innerHTML='';
  auras.forEach((a,i)=>{
    const owned=state.ownedAuras.includes(a.id),level=state.auraLevels[a.id]||0,equipped=state.equippedAura===a.id,locked=state.lockedAuras.includes(a.id),fav=state.favoriteAuras.includes(a.id);
    const card=document.createElement('div');card.className='aura-index-card '+(owned?'discovered':'locked')+(equipped?' equipped':'')+(fav?' favorite':'');
    card.innerHTML=`
      <span class="aura-index-number">#${String(i+1).padStart(2,'0')}</span>
      <span class="badge" style="color:${rarity[a.rarity].color}">${rarity[a.rarity].name}</span>
      <h3>${owned?a.name:'???'}</h3><div class="aura-index-odds">1/${a.odds.toLocaleString('ru-RU')}</div>
      <p class="small">${owned?`Ур. ${level} • x${auraIndexMultiplier(a,level).toFixed(2)}`:'Ещё не выбита'}</p>
      ${owned?`<div class="mini-actions"><button data-lock>${locked?'🔒':'🔓'}</button><button data-fav>${fav?'⭐':'☆'}</button></div>`:''}`;
    if(owned){card.querySelector('[data-lock]').onclick=()=>toggleAuraLock(a.id);card.querySelector('[data-fav]').onclick=()=>toggleAuraFavorite(a.id);}
    grid.appendChild(card);
  });
  const rewards=document.getElementById('auraIndexRewards');if(rewards){rewards.innerHTML='';INDEX_REWARDS.forEach(r=>{const ok=found>=r.count,claimed=state.indexRewards[r.id];const d=document.createElement('div');d.className='index-reward';d.innerHTML=`<b>${r.text}</b><span>${questRewardText(r.reward)}</span><button ${!ok||claimed?'disabled':''}>${claimed?'Получено':ok?'Забрать':'Закрыто'}</button>`;d.querySelector('button').onclick=()=>claimIndexReward(r.id);rewards.appendChild(d);});}
}

function renderAutoRoll(){
  const u=document.getElementById('autoRollUnlockBtn'),t=document.getElementById('autoRollToggle'),s=document.getElementById('autoSkipSelect');if(!u)return;
  u.classList.toggle('hidden',state.autoRollUnlocked);t.classList.toggle('hidden',!state.autoRollUnlocked);t.textContent=state.autoRoll?'⏹ Остановить Auto Roll':'▶️ Включить Auto Roll';if(s)s.value=String(state.autoSkipOdds);
}
function renderBoosts(){
  const el=document.getElementById('boostInventory');if(!el)return;
  const left=Math.max(0,state.luckBoostEnd-Date.now());const active=left>0?`Активно x${state.luckBoostMult} • ${Math.ceil(left/1000)} сек`:'Нет активного буста';
  el.innerHTML=`<div class="boost-active">${active}</div><div class="boost-buttons"><button data-b="x2">x2 (${state.luckBoosts.x2})</button><button data-b="x5">x5 (${state.luckBoosts.x5})</button><button data-b="x10">x10 (${state.luckBoosts.x10})</button></div>`;
  el.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>useLuckBoost(b.dataset.b));
}
function renderEnergyUpgrades(){
  const m=document.getElementById('energyMaxValue');if(!m)return;state.maxEnergy=maxEnergyValue();state.energyRegen=baseEnergyRegen();state.energy=Math.min(state.energy,state.maxEnergy);
  m.textContent=state.maxEnergy;document.getElementById('energyRegenValue').textContent=state.energyRegen.toFixed(2)+'/сек';document.getElementById('energyMaxCost').textContent=fmt(energyMaxCost());document.getElementById('energyRegenCost').textContent=energyRegenCost()+' 💎';
}
function renderSoulTree(){
  const el=document.getElementById('soulTree');if(!el)return;document.getElementById('soulsValue').textContent=state.souls;
  el.innerHTML='';SOUL_TREE_NODES.forEach(node=>{const lv=state.rebirthTree[node.id]||0,c=soulNodeCost(node.id),maxed=lv>=node.max,locked=node.requires&&(state.rebirthTree[node.requires[0]]||0)<node.requires[1],d=document.createElement('div');d.className='tree-node '+(locked?'locked ':'')+(maxed?'maxed':'');const req=locked?`Нужно: ${soulNodeDef(node.requires[0]).name.replace(/^\S+\s/,'')} ур. ${node.requires[1]}`:'';d.innerHTML=`<b>${node.name}</b><span>Ур. ${lv} / ${node.max}</span><p>${node.desc}</p>${req?`<small>${req}</small>`:''}<button ${locked||maxed?'disabled':''}>${maxed?'МАКСИМУМ':locked?'ЗАБЛОКИРОВАНО':`Улучшить за ${c} Soul`}</button>`;d.querySelector('button').onclick=()=>buySoulNode(node.id);el.appendChild(d);});
}
function renderMasteryTree(){
  const el=document.getElementById('masteryTree');if(!el)return;const available=masteryPointsAvailable();document.getElementById('masteryPoints').textContent=available;
  const progress=document.getElementById('masteryProgress');if(progress)progress.textContent=`Получено: ${masteryPointsEarned()} • потрачено: ${masteryPointsSpent()} • источники: 500 тапов, 100 RNG, 10 яиц, перерождения и боссы`;
  el.innerHTML='';MASTERY_TREE_NODES.forEach(node=>{const level=masteryLevel(node.id),maxed=level>=node.max,locked=node.requires&&masteryLevel(node.requires[0])<node.requires[1],d=document.createElement('div');d.className=`mastery-node branch-${node.branch} ${locked?'locked ':''}${maxed?'maxed':''}`;const req=locked?`Нужно: ${masteryNodeDef(node.requires[0]).name.replace(/^\S+\s/,'')} ур. ${node.requires[1]}`:'';d.innerHTML=`<div class="mastery-node-icon">${node.name.split(' ')[0]}</div><b>${node.name.replace(/^\S+\s/,'')}</b><span>Ур. ${level} / ${node.max}</span><p>${node.desc}</p>${req?`<small>${req}</small>`:''}<button ${locked||maxed?'disabled':''}>${maxed?'MAX':locked?'🔒':`${node.cost} очк.`}</button>`;d.querySelector('button').onclick=()=>buyMasteryNode(node.id);el.appendChild(d);});
}
function renderQuests(){
  const qel=document.getElementById('questGrid');if(!qel)return;ensureDailyQuests();qel.innerHTML='';dailyQuestSelection().forEach(q=>{const v=Math.max(0,(state.stats[q.stat]||0)-(state.dailyQuests.base[q.stat]||0)),done=v>=q.target,claimed=state.dailyQuests.claims[q.id],d=document.createElement('div');d.className='quest-card';d.innerHTML=`<b>${q.name}</b><span>${Math.min(v,q.target)} / ${q.target}</span><div class="mini-progress"><i style="width:${Math.min(100,v/q.target*100)}%"></i></div><p>${questRewardText(q.reward)}</p><button ${!done||claimed?'disabled':''}>${claimed?'Получено':done?'Забрать':'В процессе'}</button>`;d.querySelector('button').onclick=()=>claimQuest(q.id);qel.appendChild(d);});
  const ael=document.getElementById('achievementGrid');if(ael){const list=[['c1','1 000 кликов'],['c2','100 000 кликов'],['million','1 000 000 кликов'],['reb10','10 перерождений'],['a10','10 аур'],['a20','20 аур'],['rare65536','Аура 1/65 536+'],['boss3','3 босса']];ael.innerHTML=list.map(([id,n])=>`<div class="achievement ${state.achievements[id]?'done':''}"><b>${state.achievements[id]?'✓':'○'} ${n}</b></div>`).join('');}
}
function renderRngExtras(){
  const milestones=document.getElementById('rngMilestones');if(milestones)milestones.innerHTML=RNG_MILESTONES.map(m=>{const done=state.stats.auraRolls>=m.target,claimed=state.rngMilestones[m.id];return `<div class="rng-milestone"><b>${fmt(m.target)} роллов</b><span>${questRewardText(m.reward)}</span><button data-milestone="${m.id}" ${!done||claimed?'disabled':''}>${claimed?'Получено':done?'Забрать':`${fmt(state.stats.auraRolls)} / ${fmt(m.target)}`}</button></div>`;}).join('');if(milestones)milestones.querySelectorAll('[data-milestone]').forEach(b=>b.onclick=()=>claimRngMilestone(b.dataset.milestone));
  const history=document.getElementById('rngHistory');if(history){const rows=(state.rngHistory||[]).map(h=>{const a=auras.find(x=>x.id===h.id);return a?`<div><span style="color:${rarity[a.rarity].color}">${a.name}</span><b>1/${a.odds.toLocaleString('ru-RU')}</b></div>`:'';}).join('');history.innerHTML=rows||'<p class="small">История появится после первой прокрутки.</p>';}
}
function renderDaily(){
  const b=document.getElementById('dailyClaimBtn');if(!b)return;const day=canClaimDaily()?(state.daily.lastClaim===yesterdayKey()?Math.min(7,state.daily.streak+1):1):state.daily.streak;document.getElementById('dailyStreak').textContent=`День ${day} / 7`;document.getElementById('dailyReward').textContent=questRewardText(dailyRewardFor(day||1));b.disabled=!canClaimDaily();b.textContent=canClaimDaily()?'Забрать награду':'Уже получено сегодня';
}
function renderBoss(){
  const panel=document.getElementById('bossPanel');if(!panel)return;const active=state.boss.active,left=Math.max(0,state.boss.end-Date.now()),cool=Math.max(0,state.boss.cooldownUntil-Date.now());document.getElementById('bossWins').textContent=state.boss.wins;
  document.getElementById('bossHpFill').style.width=active?Math.max(0,state.boss.hp/state.boss.maxHp*100)+'%':'0%';document.getElementById('bossHpText').textContent=active?`${fmt(Math.max(0,state.boss.hp))} / ${fmt(state.boss.maxHp)} HP`:'Босс не активен';document.getElementById('bossTimer').textContent=active?`${Math.ceil(left/1000)} сек`:cool>0?`Перезарядка ${Math.ceil(cool/1000)} сек`:'Готов к бою';document.getElementById('bossStartBtn').disabled=active||cool>0;document.getElementById('bossAttackBtn').disabled=!active;
}
function renderEvents(){
  const el=document.getElementById('eventPanel');if(!el)return;const e=activeEventDef();if(e){el.innerHTML=`<b>${e.name}</b><span>${e.desc}</span><strong>${Math.ceil(eventTimeLeft()/1000)} сек</strong>`;}else{el.innerHTML='<b>Событий сейчас нет</b><span>Случайные ивенты появляются автоматически.</span>';}
}
function renderStats(){
  const el=document.getElementById('statsGrid');if(!el)return;const found=auras.filter(a=>state.ownedAuras.includes(a.id)).length;const entries=[['Всего кликов',fmt(state.totalClicks)],['Ручных тапов',fmt(state.stats.manualTaps)],['RNG-роллов',fmt(state.stats.auraRolls)],['Самая редкая аура',state.stats.rarestAuraOdds?`1/${state.stats.rarestAuraOdds.toLocaleString('ru-RU')}`:'—'],['Ауры',`${found}/${auras.length}`],['Яиц открыто',fmt(state.stats.eggsOpened)],['Питомцев',state.petInventory.length],['Текущий мир',activeWorldDef().name],['Перерождения',state.rebirths],['Souls',state.souls],['Боссы',state.boss.wins],['Мини-игры',state.stats.miniGamesPlayed],['Время в игре',Math.floor(state.stats.playTime/60)+' мин']];el.innerHTML=entries.map(([k,v])=>`<div class="metric"><span>${k}</span><b>${v}</b></div>`).join('');
}
function renderWorlds(){syncWorldUnlocks();const grid=document.getElementById('worldGrid');if(!grid)return;const active=activeWorldDef(),limits={neon:17,cyber:23,void:29,celestial:33};document.getElementById('activeWorldBadge').textContent=active.name;grid.innerHTML=WORLDS.map(w=>{const unlocked=state.unlockedWorlds.includes(w.id),selected=w.id===state.activeWorld,maxAura=auras[limits[w.id]];return `<div class="world-card ${selected?'active ':''}${unlocked?'':'locked'}"><div class="world-portal">${w.name.split(' ')[0]}</div><h3>${w.name.replace(/^\S+\s/,'')}</h3><p>${w.desc}</p><div class="world-bonuses"><span>Тап x${w.click}</span><span>Авто x${w.auto}</span><span>Luck x${w.luck}</span><span>Ауры до 1/${fmt(maxAura.odds)}</span></div><button data-world="${w.id}" ${!unlocked||selected?'disabled':''}>${selected?'ТЕКУЩИЙ МИР':unlocked?'ВОЙТИ':`🔒 ${w.rebirths} перерожд.`}</button></div>`;}).join('');grid.querySelectorAll('[data-world]').forEach(b=>b.onclick=()=>travelWorld(b.dataset.world));
  const roadmap=document.getElementById('unlockRoadmap');if(roadmap){const steps=[['0','Клики, яйца, питомцы, мини-игры и миры'],['1','RNG-ауры'],['2','Задания и Cyber Space'],['3','Индекс аур'],['4','Деревья прокачки'],['5','Босс и Void'],['10','Celestial Realm']];roadmap.innerHTML=steps.map(([r,n])=>`<div class="unlock-step ${state.rebirths>=Number(r)?'done':''}"><b>${state.rebirths>=Number(r)?'✓':'🔒'} ${r} ♻️</b><span>${n}</span></div>`).join('');}
}
function renderFeatureUnlocks(){document.querySelectorAll('.tab[data-tab]').forEach(tab=>{const req=FEATURE_UNLOCKS[tab.dataset.tab]||0,locked=state.rebirths<req;tab.classList.toggle('feature-locked',locked);tab.dataset.requirement=locked?String(req):'';const base=tab.dataset.baseLabel||tab.textContent.replace(/\s*🔒.*$/,'');tab.dataset.baseLabel=base;tab.textContent=locked?`${base} 🔒${req}`:base;});}
function renderCommandCenter(){const rank=currentNeonRank(),index=NEON_RANKS.indexOf(rank),next=NEON_RANKS[index+1];document.getElementById('rankIcon').textContent=rank.icon;document.getElementById('rankName').textContent=rank.name;document.getElementById('rankBonus').textContent=`Бонус дохода x${rank.mult.toFixed(2)}`;document.getElementById('dashboardWorld').textContent=activeWorldDef().name.replace(/^\S+\s/,'');const stages=[1,2,3,4,5,10,15,25],nextStage=stages.find(x=>x>state.rebirths);document.getElementById('dashboardNext').textContent=nextStage?`${nextStage} ♻️`:'Все этапы открыты';const from=rank.at,to=next?.at??rank.at,progress=next?Math.max(0,Math.min(1,(state.rebirths-from)/(to-from))):1;document.getElementById('rankProgressFill').style.width=`${progress*100}%`;document.getElementById('rankProgressText').textContent=next?`${state.rebirths} / ${next.at} ♻️`:'MAX RANK';}

function render(){
  renderTop();renderUpgrades();renderAuras();renderEggs();renderPets();renderRebirth();renderRebirthMilestones();renderMinigames();renderAuraLuck();renderAuraIndex();
  renderAutoRoll();renderBoosts();renderEnergyUpgrades();renderMasteryTree();renderSoulTree();renderQuests();renderDaily();renderRngExtras();renderWorlds();renderFeatureUnlocks();renderCommandCenter();renderBoss();renderEvents();renderStats();
  if(!document.getElementById('adminBackdrop')?.classList.contains('hidden'))renderAdminPanel();
}

function fastPress(id, handler){
  const el=document.getElementById(id);
  if(!el) return;
  el.addEventListener('pointerdown', e=>{
    if(e.pointerType==='touch') e.preventDefault();
    handler(e);
  }, {passive:false});
}

fastPress('clickButton', doClick);
fastPress('rollAuraBtn', rollAura);
fastPress('rollAura5Btn', ()=>rollAuraBatch(5));
fastPress('rollAura10Btn', ()=>rollAuraBatch(10));
fastPress('auraLuckBtn', buyAuraLuck);
fastPress('rebirthBtn', doRebirth);
fastPress('reactionButton', startReaction);
fastPress('targetStartButton', startTargetGame);
fastPress('targetButton', hitTarget);
fastPress('autoRollUnlockBtn', unlockAutoRoll);
fastPress('autoRollToggle', toggleAutoRoll);
fastPress('energyMaxBtn', buyEnergyMax);
fastPress('energyRegenBtn', buyEnergyRegen);
fastPress('dailyClaimBtn', claimDaily);
fastPress('bossStartBtn', startBoss);
fastPress('bossAttackBtn', attackBoss);
fastPress('petAutoEquip', autoEquipBestPets);
fastPress('petFuseAll', fuseAllPets);
const skipSelect=document.getElementById('autoSkipSelect');if(skipSelect)skipSelect.addEventListener('change',()=>{state.autoSkipOdds=Number(skipSelect.value);save();renderAutoRoll();});
const petSortSelect=document.getElementById('petSortSelect');
const petSortDirection=document.getElementById('petSortDirection');
const petEquippedFirst=document.getElementById('petEquippedFirst');
if(petSortSelect){petSortSelect.value=state.petSort.key;petSortSelect.addEventListener('change',()=>{state.petSort.key=petSortSelect.value;renderPets();save();});}
if(petSortDirection){petSortDirection.textContent=state.petSort.direction==='asc'?'↑':'↓';petSortDirection.addEventListener('click',()=>{state.petSort.direction=state.petSort.direction==='asc'?'desc':'asc';petSortDirection.textContent=state.petSort.direction==='asc'?'↑':'↓';renderPets();save();});}
if(petEquippedFirst){petEquippedFirst.checked=state.petSort.equippedFirst;petEquippedFirst.addEventListener('change',()=>{state.petSort.equippedFirst=petEquippedFirst.checked;renderPets();save();});}
const petPresetSelect=document.getElementById('petPresetSelect');if(petPresetSelect){petPresetSelect.value=state.activePetPreset;petPresetSelect.addEventListener('change',()=>{state.activePetPreset=petPresetSelect.value;save();});}
const petAutoDelete=document.getElementById('petAutoDelete');if(petAutoDelete){petAutoDelete.value=state.autoDeleteMax;petAutoDelete.addEventListener('change',()=>{state.autoDeleteMax=petAutoDelete.value;addLog(`Auto Delete: ${petAutoDelete.options[petAutoDelete.selectedIndex].text}`);save();});}
fastPress('petPresetSave',savePetPreset);fastPress('petPresetLoad',loadPetPreset);

function activateTab(tabId){const btn=document.querySelector(`.tab[data-tab="${tabId}"]`),requirement=FEATURE_UNLOCKS[tabId]||0;if(!btn)return;if(state.rebirths<requirement){addLog(`🔒 Раздел откроется после ${requirement} перерождений.`);return;}document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x===btn));document.querySelectorAll('.panel').forEach(panel=>panel.classList.add('hidden'));const target=document.getElementById(tabId);if(target){target.classList.remove('hidden');window.scrollTo({top:Math.max(0,target.offsetTop-115),behavior:'smooth'});}}
document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('pointerup',e=>{if(e.pointerType==='touch')e.preventDefault();activateTab(btn.dataset.tab);},{passive:false}));
document.querySelectorAll('[data-quick-tab]').forEach(btn=>btn.addEventListener('click',()=>activateTab(btn.dataset.quickTab)));

let last=performance.now();
let autoRollAccumulator=0;
setInterval(()=>{
  const now=performance.now();const dt=Math.min((now-last)/1000,2);last=now;
  state.stats.playTime+=dt;
  state.clicks+=perSec()*dt;
  state.energy=Math.min(maxEnergyValue(),state.energy+baseEnergyRegen()*eventRegenMultiplier()*dt);

  if(state.autoRoll&&state.autoRollUnlocked){
    autoRollAccumulator+=dt;
    if(autoRollAccumulator>=autoRollDelay()){autoRollAccumulator=0;rollAura({auto:true});}
  }
  if(state.boss.active){
    state.boss.hp-=perSec()*2*bossDamageMultiplier()*masteryBossMultiplier()*dt;
    if(state.boss.hp<=0)winBoss();else if(Date.now()>=state.boss.end)failBoss();
  }
  if(state.activeEvent&&Date.now()>=state.eventEnd){state.activeEvent=null;state.nextEventAt=Date.now()+90000;addLog('Событие завершено.');}
  if(!state.activeEvent){
    if(!state.nextEventAt)state.nextEventAt=Date.now()+60000;
    if(Date.now()>=state.nextEventAt)startRandomEvent();
  }
  activeLuckBoostMultiplier();achievements();renderTop();renderBoss();renderEvents();renderBoosts();
},250);
setInterval(()=>{renderUpgrades();renderAuras();renderRebirth();renderRebirthMilestones();renderAuraLuck();renderAutoRoll();renderEnergyUpgrades();renderMasteryTree();renderQuests();renderDaily();renderCommandCenter();renderStats();},1000);
setInterval(save,3000);
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='hidden') save();
});
window.addEventListener('pagehide',save);


// ===== Hidden developer / admin console =====
// Маскировка: 7 быстрых нажатий по заголовку "Профиль мощности".
let adminTapTimes=[];

const ADMIN_PASSWORD_HASH=3125142316; // FNV-1a hash, password is not stored as plain text.

function adminHash(value){
  let h=0x811c9dc5;
  for(let i=0;i<value.length;i++){
    h^=value.charCodeAt(i);
    h=Math.imul(h,0x01000193)>>>0;
  }
  return h>>>0;
}

function openAdminGate(){
  const gate=document.getElementById('adminGate');
  const input=document.getElementById('adminPasswordInput');
  if(!gate||!input)return;
  input.value='';
  gate.classList.remove('hidden');
  setTimeout(()=>input.focus(),60);
  haptic('light');
}
function closeAdminGate(){
  document.getElementById('adminGate')?.classList.add('hidden');
  const input=document.getElementById('adminPasswordInput');
  if(input)input.value='';
}
function tryAdminPassword(){
  const input=document.getElementById('adminPasswordInput');
  const box=document.querySelector('.admin-gate-box');
  if(!input)return;

  if(adminHash(input.value)===ADMIN_PASSWORD_HASH){
    closeAdminGate();
    openAdminPanel();
    return;
  }

  input.value='';
  box?.classList.remove('wrong');
  void box?.offsetWidth;
  box?.classList.add('wrong');
  haptic('heavy');
  setTimeout(()=>input.focus(),30);
}

function openAdminPanel(){
  const b=document.getElementById('adminBackdrop');
  if(!b)return;
  b.classList.remove('hidden');
  renderAdminPanel();
  haptic('success');
}
function closeAdminPanel(){
  document.getElementById('adminBackdrop')?.classList.add('hidden');
}
function renderAdminPanel(){
  const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value;};
  set('adminClicks',fmt(state.clicks));
  set('adminCrystals',fmt(state.crystals));
  set('adminSouls',fmt(state.souls));
  set('adminEnergy',`${Math.floor(state.energy)} / ${state.maxEnergy}`);
}
function adminAddAllPets(){
  Object.keys(pets).forEach(petId=>{
    if(!state.petInventory.some(p=>p.petId===petId)){
      const uid=(window.crypto&&typeof window.crypto.randomUUID==='function')
        ? window.crypto.randomUUID()
        : Date.now()+'_'+Math.random().toString(36).slice(2);
      state.petInventory.push({uid,petId,level:1,stage:'normal'});
    }
  });
}
function adminOpenAllAuras(){
  auras.forEach(a=>{
    if(!state.ownedAuras.includes(a.id))state.ownedAuras.push(a.id);
    if(!state.auraLevels[a.id])state.auraLevels[a.id]=1;
  });
}
function adminAction(action){
  switch(action){
    case 'clicks': state.clicks+=1_000_000;break;
    case 'crystals': state.crystals+=100;break;
    case 'souls': state.souls+=10;break;
    case 'energy': state.energy=maxEnergyValue();break;
    case 'luck': state.auraLuckLevel++;break;
    case 'rebirth': state.rebirths++;state.souls++;break;
    case 'auras': adminOpenAllAuras();break;
    case 'pets': adminAddAllPets();break;
    case 'boosts':
      state.luckBoosts.x2+=10;state.luckBoosts.x5+=5;state.luckBoosts.x10+=3;
      break;
    case 'boss': state.boss.cooldownUntil=0;state.boss.active=false;break;
  }
  addLog(`Service Console: ${action}`);
  render();renderAdminPanel();save();
}

function installAdminConsole(){
  const title=document.getElementById('profilePowerTitle');
  if(title){
    title.addEventListener('pointerup',()=>{
      const now=Date.now();
      adminTapTimes=adminTapTimes.filter(t=>now-t<2800);
      adminTapTimes.push(now);
      if(adminTapTimes.length>=7){
        adminTapTimes=[];
        openAdminGate();
      }
    });
  }

  document.getElementById('adminGateClose')?.addEventListener('click',closeAdminGate);
  document.getElementById('adminGateSubmit')?.addEventListener('click',tryAdminPassword);
  document.getElementById('adminPasswordInput')?.addEventListener('keydown',e=>{
    if(e.key==='Enter')tryAdminPassword();
    if(e.key==='Escape')closeAdminGate();
  });
  document.getElementById('adminGate')?.addEventListener('click',e=>{
    if(e.target.id==='adminGate')closeAdminGate();
  });

  document.getElementById('telegramSyncBtn')?.addEventListener('click',()=>syncTelegramAccount(false));
  document.getElementById('adminClose')?.addEventListener('click',closeAdminPanel);
  document.getElementById('adminBackdrop')?.addEventListener('click',e=>{
    if(e.target.id==='adminBackdrop')closeAdminPanel();
  });

  document.querySelectorAll('[data-admin]').forEach(btn=>{
    btn.addEventListener('click',()=>adminAction(btn.dataset.admin));
  });

  document.getElementById('adminApplyClicks')?.addEventListener('click',()=>{
    const n=Number(document.getElementById('adminSetClicks')?.value);
    if(Number.isFinite(n)&&n>=0){
      state.clicks=n;
      render();renderAdminPanel();save();
    }
  });

  document.getElementById('adminResetSave')?.addEventListener('click',async()=>{
    if(!confirm('Полностью удалить сохранение Neon Clicker на устройстве и в Telegram?'))return;
    await clearCloudSave();localStorage.removeItem('neonClickerSave');location.reload();
  });
}

installAdminConsole();
applyAura(); render();
initTelegramAccount();
window.addEventListener('pagehide',()=>{localStorage.setItem('neonClickerSave',JSON.stringify(state));if(cloudReady)writeCloudSave();});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){localStorage.setItem('neonClickerSave',JSON.stringify(state));if(cloudReady)writeCloudSave();}});
