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
  divine:{name:'Божественная', color:'#ff4df0'}
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
  {id:'cyan', name:'Неоновый контур', rarity:'common', mult:1.10, cost:1500, currency:'clicks', accent:'#00eaff', accent2:'#286cff'},
  {id:'violet', name:'Фантомный импульс', rarity:'rare', mult:1.35, cost:15000, currency:'clicks', accent:'#bf5cff', accent2:'#5f45ff'},
  {id:'plasma', name:'Плазменный шторм', rarity:'epic', mult:2, cost:150000, currency:'clicks', accent:'#ff3bd4', accent2:'#7b2cff'},
  {id:'solar', name:'Солнечное ядро', rarity:'legendary', mult:5, cost:35, currency:'crystals', accent:'#ffbb35', accent2:'#ff4d3d'},
  {id:'void', name:'Божественная сингулярность', rarity:'divine', mult:12, cost:120, currency:'crystals', accent:'#ffffff', accent2:'#ff38e8'}
];

const pets = {
  nanoCat:{name:'Нано-кот', emoji:'🐈‍⬛', rarity:'common', click:1.08, auto:1.03},
  voltFox:{name:'Вольт-лис', emoji:'🦊', rarity:'rare', click:1.20, auto:1.10},
  glitchOwl:{name:'Глитч-сова', emoji:'🦉', rarity:'epic', click:1.55, auto:1.35},
  mechDragon:{name:'Меха-дракон', emoji:'🐉', rarity:'legendary', click:2.40, auto:2.00},
  starSeraph:{name:'Звёздный сераф', emoji:'✨', rarity:'divine', click:5.00, auto:4.00}
};

const eggs = [
  {
    id:'basic', name:'Неоновое яйцо', cost:4000, currency:'clicks',
    chances:[['nanoCat',70],['voltFox',22],['glitchOwl',7],['mechDragon',1]]
  },
  {
    id:'elite', name:'Квантовое яйцо', cost:18, currency:'crystals',
    chances:[['voltFox',52],['glitchOwl',32],['mechDragon',14],['starSeraph',2]]
  }
];

const defaultState = {
  clicks:0, crystals:0, totalClicks:0,
  upgradeLevels:{}, ownedAuras:[], equippedAura:null,
  petInventory:[], equippedPets:[],
  auraLevels:{},
  rebirths:0,
  bestReaction:null,
  bestTargetScore:0,
  achievements:{}
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
      rebirths: Number(saved.rebirths || 0),
      bestReaction: saved.bestReaction ?? null,
      bestTargetScore: Number(saved.bestTargetScore || 0),
      achievements: {...defaultState.achievements, ...(saved.achievements || {})}
    };
  }catch(err){
    console.warn('Save load error:', err);
    return clone(defaultState);
  }
}
function save(){ localStorage.setItem('neonClickerSave', JSON.stringify(state)); }

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
function petMultipliers(){
  let click=1, auto=1;
  state.equippedPets.forEach(uid=>{
    const entry = state.petInventory.find(p=>p.uid===uid);
    if(!entry) return;
    const p = pets[entry.petId];
    const levelBoost = Math.pow(1.35, entry.level-1);
    click *= 1 + (p.click-1)*levelBoost;
    auto *= 1 + (p.auto-1)*levelBoost;
  });
  return {click,auto};
}
function perClick(){
  const p = petMultipliers();
  return baseTap()*auraMultiplier()*p.click*rebirthMultiplier();
}
function perSec(){
  const p = petMultipliers();
  return baseAuto()*auraMultiplier()*p.auto*rebirthMultiplier();
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
  const amount=perClick();
  state.clicks += amount;
  state.totalClicks += amount;
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

function rollAura(){
  const cost = 500;
  if(state.clicks < cost){
    addLog('Недостаточно кликов для RNG ауры.');
    return;
  }
  state.clicks -= cost;

  const pool = [
    ['cyan',60],
    ['violet',25],
    ['plasma',10],
    ['solar',4],
    ['void',1]
  ];

  const id = roll(pool);
  const a = auras.find(x=>x.id===id);

  if(state.ownedAuras.includes(id)){
    state.auraLevels[id] = (state.auraLevels[id] || 1) + 1;
    document.getElementById('auraRollResult').innerHTML =
      `<span style="color:${rarity[a.rarity].color}">${a.name}<br>ДУБЛИКАТ → УР. ${state.auraLevels[id]}</span>`;
    addLog(`Дубликат ауры: ${a.name} → ур. ${state.auraLevels[id]}`);
  }else{
    state.ownedAuras.push(id);
    state.auraLevels[id] = 1;
    state.equippedAura=id;
    applyAura();
    document.getElementById('auraRollResult').innerHTML =
      `<span style="color:${rarity[a.rarity].color}">${a.name}<br>${rarity[a.rarity].name}</span>`;
    addLog(`Новая RNG-аура: ${a.name}`);
  }

  render();
  save();
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
  const petId=roll(egg.chances);
  const uid=(window.crypto && typeof window.crypto.randomUUID==='function')
    ? window.crypto.randomUUID()
    : Date.now()+'_'+Math.random().toString(36).slice(2);
  state.petInventory.push({uid,petId,level:1});
  const p=pets[petId];
  addLog(`Из яйца выпал: ${p.name} (${rarity[p.rarity].name})`);
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

function achievements(){
  const milestones=[
    {id:'c1',check:()=>state.totalClicks>=1000,reward:2,text:'1 000 суммарных кликов'},
    {id:'c2',check:()=>state.totalClicks>=100000,reward:8,text:'100 000 суммарных кликов'},
    {id:'p1',check:()=>state.petInventory.length>=5,reward:5,text:'5 питомцев'},
    {id:'p2',check:()=>state.petInventory.length>=20,reward:15,text:'20 питомцев'}
  ];
  milestones.forEach(a=>{
    if(!state.achievements[a.id] && a.check()){
      state.achievements[a.id]=true;
      state.crystals+=a.reward;
      addLog(`Достижение: ${a.text}. +${a.reward} кристаллов`);
    }
  })
}

function renderTop(){
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
        return e?`${pets[e.petId].emoji} ${pets[e.petId].name} ур.${e.level}`:'';
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
    const chances=e.chances.map(([id,c])=>`${rarity[pets[id].rarity].name}: ${c}%`).join(' • ');
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
    const boost=Math.pow(1.35,entry.level-1);
    const click=1+(p.click-1)*boost, auto=1+(p.auto-1)*boost;
    const d=document.createElement('div'); d.className='pet '+(equipped?'equipped':'');
    d.innerHTML=`
      <div class="emoji">${p.emoji}</div>
      <span class="badge" style="color:${rarity[p.rarity].color}">${rarity[p.rarity].name}</span>
      <h3>${p.name} <span class="small">ур.${entry.level}</span></h3>
      <p class="small">Тап x${click.toFixed(2)} • Авто x${auto.toFixed(2)}</p>
      <button class="primary">${equipped?'Снять':'Экипировать'}</button>
      <button class="primary fuse">Слияние</button>
      <button class="danger">Удалить</button>`;
    const btns=d.querySelectorAll('button');
    btns[0].onclick=()=>toggleEquip(entry.uid);
    btns[1].onclick=()=>fusePet(entry.uid);
    btns[2].onclick=()=>deletePet(entry.uid);
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
  state.clicks = 0;
  state.upgradeLevels = {};
  state.crystals += 3;

  addLog(`Перерождение #${state.rebirths}! Постоянный множитель x${rebirthMultiplier().toFixed(2)}.`);
  render();
  save();
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

    state.clicks+=reward;
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
      state.clicks+=reward;

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

function render(){
  renderTop();
  renderUpgrades();
  renderAuras();
  renderEggs();
  renderPets();
  renderRebirth();
  renderMinigames();
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
fastPress('rebirthBtn', doRebirth);
fastPress('reactionButton', startReaction);
fastPress('targetStartButton', startTargetGame);
fastPress('targetButton', hitTarget);

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
setInterval(()=>{
  const now=performance.now();
  const dt=Math.min((now-last)/1000,2);
  last=now;
  state.clicks += perSec()*dt;
  achievements();
  renderTop();
},250);
setInterval(()=>{
  renderUpgrades();
  renderAuras();
  renderRebirth();
},1000);
setInterval(save,3000);
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='hidden') save();
});
window.addEventListener('pagehide',save);

applyAura(); render();