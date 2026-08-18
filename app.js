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
  {id:'tap1', name:'Нейро-палец', type:'tap', amount:1, base:25, growth:1.17},
  {id:'tap5', name:'Импульсный усилитель', type:'tap', amount:5, base:240, growth:1.20},
  {id:'tap50', name:'Квантовый привод', type:'tap', amount:50, base:4200, growth:1.23},
  {id:'bot1', name:'Робот-сборщик', type:'auto', amount:1, base:80, growth:1.16},
  {id:'bot10', name:'Дрон-ферма', type:'auto', amount:10, base:950, growth:1.19},
  {id:'bot100', name:'Кибер-завод', type:'auto', amount:100, base:15000, growth:1.22}
];

const auras = [
  // Обычные
  {id:'cyan', name:'Неоновый контур', rarity:'common', mult:1.10, accent:'#00eaff', accent2:'#286cff', odds:2},
  {id:'spark', name:'Искра мегаполиса', rarity:'common', mult:1.12, accent:'#45f3ff', accent2:'#407bff', odds:4},
  {id:'lime', name:'Кислотный след', rarity:'common', mult:1.14, accent:'#8dff45', accent2:'#20c970', odds:8},
  {id:'rose', name:'Розовый импульс', rarity:'common', mult:1.16, accent:'#ff5fcf', accent2:'#8f44ff', odds:16},
  {id:'steel', name:'Стальной резонанс', rarity:'common', mult:1.18, accent:'#b9c8df', accent2:'#55708f', odds:32},
  {id:'ember', name:'Угольный заряд', rarity:'common', mult:1.20, accent:'#ff8b45', accent2:'#dd3b3b', odds:64},

  // Редкие
  {id:'violet', name:'Фантомный импульс', rarity:'rare', mult:1.35, accent:'#bf5cff', accent2:'#5f45ff', odds:128},
  {id:'frost', name:'Ледяной протокол', rarity:'rare', mult:1.42, accent:'#85e8ff', accent2:'#3675ff', odds:256},
  {id:'toxic', name:'Токсичный реактор', rarity:'rare', mult:1.48, accent:'#61ff7b', accent2:'#00b86b', odds:512},
  {id:'crimson', name:'Багровая частота', rarity:'rare', mult:1.55, accent:'#ff345c', accent2:'#a1004c', odds:1024},
  {id:'storm', name:'Грозовая сеть', rarity:'rare', mult:1.62, accent:'#8cc8ff', accent2:'#654cff', odds:2048},
  {id:'holo', name:'Голографический спектр', rarity:'rare', mult:1.70, accent:'#43fff2', accent2:'#e24cff', odds:4096},

  // Эпические
  {id:'plasma', name:'Плазменный шторм', rarity:'epic', mult:2.00, accent:'#ff3bd4', accent2:'#7b2cff', odds:8192},
  {id:'nebula', name:'Туманность Омега', rarity:'epic', mult:2.20, accent:'#c363ff', accent2:'#3d4cff', odds:16384},
  {id:'quantum', name:'Квантовый разлом', rarity:'epic', mult:2.40, accent:'#54f5ff', accent2:'#bb2cff', odds:32768},
  {id:'eclipse', name:'Кибер-затмение', rarity:'epic', mult:2.60, accent:'#ff487d', accent2:'#3c1b7a', odds:65536},
  {id:'matrix', name:'Матрица сознания', rarity:'epic', mult:2.85, accent:'#4dff9d', accent2:'#00a8b8', odds:131072},
  {id:'arcane', name:'Арканный процессор', rarity:'epic', mult:3.15, accent:'#f258ff', accent2:'#6134ff', odds:262144},

  // Легендарные
  {id:'solar', name:'Солнечное ядро', rarity:'legendary', mult:5.00, accent:'#ffbb35', accent2:'#ff4d3d', odds:524288},
  {id:'supernova', name:'Сверхновая', rarity:'legendary', mult:5.50, accent:'#fff178', accent2:'#ff533d', odds:1048576},
  {id:'blackstar', name:'Чёрная звезда', rarity:'legendary', mult:6.00, accent:'#b191ff', accent2:'#19134f', odds:2097152},
  {id:'chrono', name:'Хроно-пульс', rarity:'legendary', mult:6.50, accent:'#68fff2', accent2:'#7758ff', odds:4194304},
  {id:'royal', name:'Корона мегасети', rarity:'legendary', mult:7.00, accent:'#ffd65f', accent2:'#b24dff', odds:8388608},
  {id:'dragonfire', name:'Драконий реактор', rarity:'legendary', mult:7.75, accent:'#ff713d', accent2:'#ff244e', odds:16777216},

  // Мифические
  {id:'void', name:'Мифическая сингулярность', rarity:'mythical', mult:12.00, accent:'#ffffff', accent2:'#ff38e8', odds:33554432},
  {id:'infinity', name:'Код бесконечности', rarity:'mythical', mult:13.50, accent:'#79fff2', accent2:'#ff46e9', odds:67108864},
  {id:'creator', name:'Ядро Создателя', rarity:'mythical', mult:15.00, accent:'#fff5b5', accent2:'#ca4cff', odds:134217728},
  {id:'celestial', name:'Небесный протокол', rarity:'mythical', mult:16.50, accent:'#d6f7ff', accent2:'#735cff', odds:268435456},
  {id:'paradox', name:'Парадокс реальности', rarity:'mythical', mult:18.00, accent:'#ff70db', accent2:'#32f1ff', odds:536870912},
  {id:'absolute', name:'Абсолютный ноль', rarity:'mythical', mult:20.00, accent:'#e9ffff', accent2:'#4578ff', odds:1073741824},

  // SECRET / CELESTIAL — эндгейм
  {id:'redacted', name:'[REDACTED]', rarity:'secret', mult:25.00, accent:'#ff3158', accent2:'#620018', odds:2147483648},
  {id:'reality', name:'Разрушитель реальности', rarity:'secret', mult:32.00, accent:'#ff6a9f', accent2:'#17101f', odds:4294967296},
  {id:'celestialCore', name:'Небесное ядро', rarity:'celestial', mult:45.00, accent:'#e9ffff', accent2:'#7b71ff', odds:8589934592},
  {id:'infiniteCrown', name:'Корона бесконечности', rarity:'celestial', mult:60.00, accent:'#ffffff', accent2:'#ffed7a', odds:17179869184}
];

const pets = {
  // Обычные
  nanoCat:{name:'Лошадь — Обычная', rarity:'common', click:1.08, auto:1.03},
  rabbit:{name:'Кролик — Обычный', rarity:'common', click:1.09, auto:1.04},
  dog:{name:'Пёс — Обычный', rarity:'common', click:1.10, auto:1.05},
  boar:{name:'Кабан — Обычный', rarity:'common', click:1.11, auto:1.05},
  owl:{name:'Сова — Обычная', rarity:'common', click:1.12, auto:1.06},

  // Редкие
  voltFox:{name:'Волк — Редкий', rarity:'rare', click:1.20, auto:1.10},
  lynx:{name:'Рысь — Редкая', rarity:'rare', click:1.22, auto:1.12},
  panther:{name:'Пантера — Редкая', rarity:'rare', click:1.24, auto:1.14},
  falcon:{name:'Сокол — Редкий', rarity:'rare', click:1.26, auto:1.16},
  whiteTiger:{name:'Белый тигр — Редкий', rarity:'rare', click:1.30, auto:1.18},

  // Эпические
  glitchOwl:{name:'Феникс — Эпический', rarity:'epic', click:1.55, auto:1.35},
  frostBear:{name:'Ледяной медведь — Эпический', rarity:'epic', click:1.60, auto:1.38},
  shadowTiger:{name:'Теневой тигр — Эпический', rarity:'epic', click:1.65, auto:1.42},
  griffin:{name:'Грифон — Эпический', rarity:'epic', click:1.72, auto:1.46},
  thunderWolf:{name:'Грозовой волк — Эпический', rarity:'epic', click:1.80, auto:1.50},

  // Легендарные
  mechDragon:{name:'Дракон — Легендарный', rarity:'legendary', click:2.40, auto:2.00},
  cerberus:{name:'Цербер — Легендарный', rarity:'legendary', click:2.55, auto:2.10},
  thunderbird:{name:'Громовая птица — Легендарная', rarity:'legendary', click:2.70, auto:2.20},
  leviathan:{name:'Левиафан — Легендарный', rarity:'legendary', click:2.85, auto:2.35},
  fireLion:{name:'Огненный лев — Легендарный', rarity:'legendary', click:3.00, auto:2.50},

  // Мифические
  starSeraph:{name:'Единорог — Мифический', rarity:'mythical', click:5.00, auto:4.00},
  timeDragon:{name:'Дракон времени — Мифический', rarity:'mythical', click:5.50, auto:4.40},
  cosmicLeviathan:{name:'Космический левиафан — Мифический', rarity:'mythical', click:6.00, auto:4.80},
  celestialKitsune:{name:'Небесная кицунэ — Мифическая', rarity:'mythical', click:6.50, auto:5.20},
  voidSeraph:{name:'Сераф Бездны — Мифический', rarity:'mythical', click:7.00, auto:5.75}
};

const eggs = [
  {
    id:'basic', name:'Неоновое яйцо', cost:4000, currency:'clicks',
    rarityChances:[['common',60],['rare',25],['epic',10],['legendary',4],['mythical',1]]
  },
  {
    id:'elite', name:'Квантовое яйцо', cost:18, currency:'crystals',
    rarityChances:[['common',10],['rare',35],['epic',30],['legendary',20],['mythical',5]]
  }
];

const PET_STAGES={
  normal:{name:'Обычный',mult:1},
  shiny:{name:'Shiny',mult:1.5},
  golden:{name:'Golden',mult:2.5},
  void:{name:'Void',mult:4}
};
const PET_STAGE_ORDER=['normal','shiny','golden','void'];

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
  rebirths:0, souls:0,
  rebirthTree:{power:0,luck:0,energy:0,regen:0,auto:0},
  autoRollUnlocked:false, autoRoll:false, autoSkipOdds:128,
  luckBoosts:{x2:0,x5:0,x10:0}, luckBoostMult:1, luckBoostEnd:0,
  daily:{lastClaim:'',streak:0},
  boss:{active:false,hp:0,maxHp:0,end:0,cooldownUntil:0,wins:0},
  activeEvent:null, eventEnd:0, nextEventAt:0,
  questClaims:{}, indexRewards:{},
  bestReaction:null,
  bestTargetScore:0,
  achievements:{},
  stats:{manualTaps:0,auraRolls:0,eggsOpened:0,bossesKilled:0,questsCompleted:0,miniGamesPlayed:0,playTime:0,rarestAuraOdds:0}
};

const clone = obj => JSON.parse(JSON.stringify(obj));

let state = load();

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
      bestReaction: saved.bestReaction ?? null,
      bestTargetScore: Number(saved.bestTargetScore || 0),
      energyMaxLevel: Number(saved.energyMaxLevel || 0),
      energyRegenLevel: Number(saved.energyRegenLevel || 0),
      energy: Number(saved.energy ?? 100),
      maxEnergy: Number(saved.maxEnergy || 100),
      energyRegen: Number(saved.energyRegen && saved.energyRegen !== 8 ? saved.energyRegen : 2),
      stats: {...defaultState.stats, ...(saved.stats || {})},
      petInventory: (Array.isArray(saved.petInventory) ? saved.petInventory : []).map(p=>({...p,stage:p.stage||'normal'})),
      achievements: {...defaultState.achievements, ...(saved.achievements || {})}
    };
  }catch(err){
    console.warn('Save load error:', err);
    return clone(defaultState);
  }
}
function save(){ localStorage.setItem('neonClickerSave', JSON.stringify(state)); }

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
  const levelScale = 1 + 0.15 * (level - 1);
  return 1 + (a.mult - 1) * levelScale;
}
function rebirthMultiplier(){
  return 1 + state.rebirths * 0.5;
}
function rebirthCost(){
  return Math.floor(50000 * Math.pow(3, state.rebirths));
}
function treePowerMultiplier(){ return 1 + (state.rebirthTree.power||0)*0.10; }
function treeAutoMultiplier(){ return 1 + (state.rebirthTree.auto||0)*0.15; }
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
  const permanent=1 + state.auraLuckLevel*0.25 + (state.rebirthTree.luck||0)*0.25 + collectionLuckBonus();
  return permanent * activeLuckBoostMultiplier() * eventLuckMultiplier();
}
function auraLuckCost(){ return Math.floor(5000 * Math.pow(1.60, state.auraLuckLevel)); }
function energyMaxCost(){ return Math.floor(10000*Math.pow(1.75,state.energyMaxLevel)); }
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

// One base RNG roll. Aura #1 = 1/2, #2 = 1/4, #3 = 1/8...
function singleAuraRngIndex(){
  // Geometric coin-flip distribution.
  // If all 30 checks fail, repeat; this keeps the 1/2^n ladder effectively exact.
  while(true){
    for(let i=0;i<auras.length;i++){
      if(Math.random() < 0.5) return i;
    }
  }
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
  let click=1, auto=1;
  state.equippedPets.forEach(uid=>{
    const entry = state.petInventory.find(p=>p.uid===uid);
    if(!entry) return;
    const p = pets[entry.petId]; if(!p)return;
    const levelBoost = Math.pow(1.35, entry.level-1);
    const stageBoost = PET_STAGES[entry.stage||'normal']?.mult||1;
    click *= 1 + (p.click-1)*levelBoost*stageBoost;
    auto *= 1 + (p.auto-1)*levelBoost*stageBoost;
  });
  return {click,auto};
}
function perClick(){
  const p=petMultipliers();
  return baseTap()*auraMultiplier()*p.click*rebirthMultiplier()*treePowerMultiplier()*eventClickMultiplier();
}
function perSec(){
  const p=petMultipliers();
  return baseAuto()*auraMultiplier()*p.auto*rebirthMultiplier()*treePowerMultiplier()*treeAutoMultiplier()*eventAutoMultiplier();
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
  state.energy=Math.max(0,state.energy-1);
  const amount=perClick();
  state.clicks += amount;
  state.totalClicks += amount;
  state.stats.manualTaps++;
  haptic('light');
  const b=document.getElementById('clickButton');
  b.classList.add('hit'); setTimeout(()=>b.classList.remove('hit'),90);
  spawnFloat(ev.clientX, ev.clientY, amount);
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
  const cost=500;
  if(state.clicks<cost){
    if(auto){state.autoRoll=false;addLog('Auto Roll остановлен: недостаточно кликов.');}
    else addLog('Недостаточно кликов для RNG ауры.');
    render();return null;
  }
  state.clicks-=cost; state.stats.auraRolls++;

  const a=luckyAuraRoll(); const id=a.id; const wasOwned=state.ownedAuras.includes(id);
  if(wasOwned){ state.auraLevels[id]=(state.auraLevels[id]||1)+1; }
  else{
    state.ownedAuras.push(id); state.auraLevels[id]=1;
    const currentLocked=state.equippedAura&&state.lockedAuras.includes(state.equippedAura);
    if(!currentLocked)state.equippedAura=id;
  }
  state.stats.rarestAuraOdds=Math.max(state.stats.rarestAuraOdds||0,a.odds);
  applyAura(); achievements();

  const skipped=auto && a.odds<state.autoSkipOdds;
  if(!skipped){
    const result=document.getElementById('auraRollResult');
    if(result)result.innerHTML=`<span style="color:${rarity[a.rarity].color}">${a.name}<br>1/${a.odds.toLocaleString('ru-RU')} • Luck x${auraLuckMultiplier().toFixed(2)}${wasOwned?`<br>ДУБЛИКАТ → ур. ${state.auraLevels[id]}`:''}</span>`;
    addLog(`${wasOwned?'Дубликат':'Новая аура'}: ${a.name} • 1/${a.odds.toLocaleString('ru-RU')}`);
    if(!auto)auraFlash(a); else if(a.odds>=65536)auraFlash(a);
  }
  render();save();return a;
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
  document.documentElement.style.setProperty('--accent',a?.accent||'#00eaff');
  document.documentElement.style.setProperty('--accent2',a?.accent2||'#9b5cff');
}

function roll(chances){
  let r=Math.random()*100;
  for(const [id,c] of chances){ if(r<c)return id; r-=c; }
  return chances[chances.length-1][0];
}
function openEgg(id){
  const egg=eggs.find(x=>x.id===id);
  if(state[egg.currency] < egg.cost) return;
  state[egg.currency]-=egg.cost;
  const rolledRarity=roll(egg.rarityChances);
  const candidates=Object.entries(pets).filter(([,p])=>p.rarity===rolledRarity);
  const petId=candidates[Math.floor(Math.random()*candidates.length)][0];
  const uid=(window.crypto && typeof window.crypto.randomUUID==='function')
    ? window.crypto.randomUUID()
    : Date.now()+'_'+Math.random().toString(36).slice(2);
  state.petInventory.push({uid,petId,level:1,stage:'normal'});
  const p=pets[petId];
  state.stats.eggsOpened++;
  addLog(`Из яйца выпал: ${p.name} (${rarity[p.rarity].name})`);
  haptic(p.rarity==='mythical'?'heavy':'light');
  achievements();
  render(); save();
}

function toggleEquip(uid){
  const i=state.equippedPets.indexOf(uid);
  if(i>=0) state.equippedPets.splice(i,1);
  else if(state.equippedPets.length<3) state.equippedPets.push(uid);
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
  document.getElementById('petSlots').textContent=`${state.equippedPets.length} / 3`;
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
  upgrades.forEach(u=>{
    const level=state.upgradeLevels[u.id]||0;
    const cost=upgradeCost(u);
    const affordable=state.clicks>=cost;
    const d=document.createElement('div'); d.className='item';
    d.innerHTML=`
      <span class="badge">${u.type==='tap'?'Сила тапа':'Автоклик'}</span>
      <h3>${u.name}</h3>
      <p>+${u.amount} ${u.type==='tap'?'к базовой силе':'кликов/сек'} за уровень</p>
      <p>Уровень: <b>${level}</b></p>
      <button style="${affordable?'':'opacity:.7'}">Купить за ${fmt(cost)} кликов</button>`;
    d.querySelector('button').addEventListener('click',()=>buyUpgrade(u.id));
    el.appendChild(d);
  })
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
  eggs.forEach(e=>{
    const chances=e.rarityChances.map(([r,c])=>`${rarity[r].name}: ${c}%`).join(' • ');
    const d=document.createElement('div'); d.className='item';
    d.innerHTML=`
      <span class="badge">Гача</span><h3>${e.name}</h3>
      <p>${chances}</p>
      <button ${state[e.currency]<e.cost?'disabled':''}>Открыть за ${fmt(e.cost)} ${e.currency==='crystals'?'кристаллов':'кликов'}</button>`;
    d.querySelector('button').onclick=()=>openEgg(e.id);
    el.appendChild(d);
  })
}
function renderPets(){
  const el=document.getElementById('petInventory'); el.innerHTML='';
  if(!state.petInventory.length){el.innerHTML='<p class="small">Питомцев пока нет. Открой яйцо.</p>';return;}
  state.petInventory.forEach(entry=>{
    const p=pets[entry.petId], equipped=state.equippedPets.includes(entry.uid);
    if(!p) return;
    const boost=Math.pow(1.35,entry.level-1);
    const stage=entry.stage||'normal', stageBoost=PET_STAGES[stage]?.mult||1;
    const click=1+(p.click-1)*boost*stageBoost, auto=1+(p.auto-1)*boost*stageBoost;
    const d=document.createElement('div'); d.className='pet '+(equipped?'equipped':'');
    d.innerHTML=`
      <span class="badge" style="color:${rarity[p.rarity].color}">${rarity[p.rarity].name}</span>
      <span class="badge stage-badge">${PET_STAGES[stage].name}</span>
      <h3>${p.name} <span class="small">ур.${entry.level}</span></h3>
      <p class="small">Тап x${click.toFixed(2)} • Авто x${auto.toFixed(2)} • Stage x${stageBoost}</p>
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

function doRebirth(){
  const cost = rebirthCost();
  if(state.clicks < cost){ addLog(`Для перерождения нужно ${fmt(cost-state.clicks)} кликов.`); return; }

  state.rebirths++;
  state.souls++;
  state.clicks = 0;
  state.upgradeLevels = {};
  state.crystals += 3;

  addLog(`Перерождение #${state.rebirths}! +1 Soul • множитель x${rebirthMultiplier().toFixed(2)}.`);haptic('success');
  render();
  save();
}


function soulNodeCost(id){ return (state.rebirthTree[id]||0)+1; }
function buySoulNode(id){
  if(!(id in state.rebirthTree))return;
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
  const q=QUESTS.find(x=>x.id===id);if(!q||state.questClaims[id]||q.get()<q.target)return;
  state.questClaims[id]=true;giveReward(q.reward);state.stats.questsCompleted++;addLog(`✅ Задание: ${q.name}`);haptic('success');render();save();
}
function localDayKey(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
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
  state.energy-=1;const dmg=perClick()*8;state.boss.hp-=dmg;haptic('light');if(state.boss.hp<=0)winBoss();renderBoss();renderTop();save();
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
  const levelScale=1+0.15*(level-1);
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
  const nodes={power:['⚔️ Сила','+10% ко всему урону/кликам'],luck:['🍀 Soul Luck','+0.25 к RNG Luck'],energy:['🔋 Батарея','+20 энергии'],regen:['⚡ Реген','+0.25 энергии/сек'],auto:['🤖 Авто-мощь','+15% автоклика']};
  el.innerHTML='';Object.entries(nodes).forEach(([id,[name,desc]])=>{const lv=state.rebirthTree[id]||0,c=soulNodeCost(id),d=document.createElement('div');d.className='tree-node';d.innerHTML=`<b>${name}</b><span>Ур. ${lv}</span><p>${desc}</p><button>Улучшить за ${c} Soul</button>`;d.querySelector('button').onclick=()=>buySoulNode(id);el.appendChild(d);});
}
function renderQuests(){
  const qel=document.getElementById('questGrid');if(!qel)return;qel.innerHTML='';QUESTS.forEach(q=>{const v=q.get(),done=v>=q.target,claimed=state.questClaims[q.id],d=document.createElement('div');d.className='quest-card';d.innerHTML=`<b>${q.name}</b><span>${Math.min(v,q.target)} / ${q.target}</span><div class="mini-progress"><i style="width:${Math.min(100,v/q.target*100)}%"></i></div><p>${questRewardText(q.reward)}</p><button ${!done||claimed?'disabled':''}>${claimed?'Получено':done?'Забрать':'В процессе'}</button>`;d.querySelector('button').onclick=()=>claimQuest(q.id);qel.appendChild(d);});
  const ael=document.getElementById('achievementGrid');if(ael){const list=[['c1','1 000 кликов'],['c2','100 000 кликов'],['million','1 000 000 кликов'],['reb10','10 перерождений'],['a10','10 аур'],['a20','20 аур'],['rare65536','Аура 1/65 536+'],['boss3','3 босса']];ael.innerHTML=list.map(([id,n])=>`<div class="achievement ${state.achievements[id]?'done':''}"><b>${state.achievements[id]?'✓':'○'} ${n}</b></div>`).join('');}
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
  const el=document.getElementById('statsGrid');if(!el)return;const found=auras.filter(a=>state.ownedAuras.includes(a.id)).length;const entries=[['Всего кликов',fmt(state.totalClicks)],['Ручных тапов',fmt(state.stats.manualTaps)],['RNG-роллов',fmt(state.stats.auraRolls)],['Самая редкая аура',state.stats.rarestAuraOdds?`1/${state.stats.rarestAuraOdds.toLocaleString('ru-RU')}`:'—'],['Ауры',`${found}/${auras.length}`],['Яиц открыто',fmt(state.stats.eggsOpened)],['Питомцев',state.petInventory.length],['Перерождения',state.rebirths],['Souls',state.souls],['Боссы',state.boss.wins],['Мини-игры',state.stats.miniGamesPlayed],['Время в игре',Math.floor(state.stats.playTime/60)+' мин']];el.innerHTML=entries.map(([k,v])=>`<div class="metric"><span>${k}</span><b>${v}</b></div>`).join('');
}

function render(){
  renderTop();renderUpgrades();renderAuras();renderEggs();renderPets();renderRebirth();renderMinigames();renderAuraLuck();renderAuraIndex();
  renderAutoRoll();renderBoosts();renderEnergyUpgrades();renderSoulTree();renderQuests();renderDaily();renderBoss();renderEvents();renderStats();
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
const skipSelect=document.getElementById('autoSkipSelect');if(skipSelect)skipSelect.addEventListener('change',()=>{state.autoSkipOdds=Number(skipSelect.value);save();renderAutoRoll();});

document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('pointerup', e=>{
    if(e.pointerType==='touch') e.preventDefault();

    document.querySelectorAll('.tab').forEach(x=>{
      x.classList.toggle('active', x === btn);
    });

    document.querySelectorAll('.panel').forEach(panel=>{
      panel.classList.add('hidden');
    });

    const target = document.getElementById(btn.dataset.tab);
    if(target){
      target.classList.remove('hidden');
      window.scrollTo({top:Math.max(0,target.offsetTop-115),behavior:'smooth'});
    }
  }, {passive:false});
});

let last=performance.now();
let autoRollAccumulator=0;
setInterval(()=>{
  const now=performance.now();const dt=Math.min((now-last)/1000,2);last=now;
  state.stats.playTime+=dt;
  state.clicks+=perSec()*dt;
  state.energy=Math.min(maxEnergyValue(),state.energy+baseEnergyRegen()*eventRegenMultiplier()*dt);

  if(state.autoRoll&&state.autoRollUnlocked){
    autoRollAccumulator+=dt;
    if(autoRollAccumulator>=1){autoRollAccumulator=0;rollAura({auto:true});}
  }
  if(state.boss.active){
    state.boss.hp-=perSec()*2*dt;
    if(state.boss.hp<=0)winBoss();else if(Date.now()>=state.boss.end)failBoss();
  }
  if(state.activeEvent&&Date.now()>=state.eventEnd){state.activeEvent=null;state.nextEventAt=Date.now()+90000;addLog('Событие завершено.');}
  if(!state.activeEvent){
    if(!state.nextEventAt)state.nextEventAt=Date.now()+60000;
    if(Date.now()>=state.nextEventAt)startRandomEvent();
  }
  activeLuckBoostMultiplier();achievements();renderTop();renderBoss();renderEvents();renderBoosts();
},250);
setInterval(()=>{renderUpgrades();renderAuras();renderRebirth();renderAuraLuck();renderAutoRoll();renderEnergyUpgrades();renderQuests();renderDaily();renderStats();},1000);
setInterval(save,3000);
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='hidden') save();
});
window.addEventListener('pagehide',save);

applyAura(); render();