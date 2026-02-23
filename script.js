/* AFL Bot v3 — Script with Juice */

const CFG = {
    name: 'AFL Bot', bot: '@AFLManagerBot',
    links: { bot: 'https://t.me/AFLManagerBot', connect: 'https://t.me/AFLManagerBot?start=connect', support: 'https://t.me/AFLSupport' },
};

const CATEGORIES = [
    { id:'all', label:'Все', icon:'🔥' },{ id:'matches', label:'Матчи', icon:'⚽' },
    { id:'stats', label:'Статистика', icon:'📊' },{ id:'team', label:'Команда', icon:'👥' },
    { id:'media', label:'Медиа', icon:'📸' },
];

const ITEMS = [
    { id:'match-org',title:'Организация матчей',desc:'Голосование, сбор заявок, напоминания — всё в чате',type:'image',src:'media/организация_матчей2.jpg',cat:'matches',frame:'phone' },
    { id:'rating-table',title:'Рейтинг и таблица',desc:'Статистика по сезонам, турнирам и командам',type:'image',src:'media/рейтинг_таблица.jpg',cat:'stats',frame:'wide' },
    { id:'team-pilot',title:'Команда к пилоту',desc:'Быстрый старт — собрать команду через бота',type:'video',src:'media/команда_к_пилоту.MOV',cat:'team',frame:'phone' },
    { id:'personal-rating',title:'Личный рейтинг',desc:'Прогресс и позиция среди игроков',type:'video',src:'media/увидеть_личный_рейтинг.MOV',cat:'stats',frame:'phone' },
    { id:'referee',title:'Характеристики судьи',desc:'Профиль судьи: стиль, статистика, отзывы',type:'video',src:'media/характеристики_судьи.MP4',cat:'matches',frame:'phone' },
    { id:'team-life',title:'Жизнь команды',desc:'Общение и координация внутри Telegram',type:'placeholder',cat:'team',frame:'phone',icon:'👥' },
    { id:'get-rating',title:'Как попасть в рейтинг',desc:'Система очков и путь к топу',type:'placeholder',cat:'stats',frame:'phone',icon:'🏆' },
    { id:'trainings',title:'Тренировки',desc:'Планирование, посещения, прогресс',type:'placeholder',cat:'team',frame:'phone',icon:'🏃' },
    { id:'recordings',title:'Записи',desc:'Видео с матчей, автоматическая организация',type:'placeholder',cat:'media',frame:'phone',icon:'📹' },
];

const DEMOS = {
    match:[{t:'out',m:'/match Финал лиги 20.06 18:00'},{t:'in',m:'⚽ Матч создан!\n\n📍 Финал лиги\n📅 20 июня, 18:00\n\nЗаявки собираются автоматически.\nНапоминания за 24ч и за 2ч.'},{t:'out',m:'Кто записался?'},{t:'in',m:'✅ Записались (12/16):\n\n1. Алексей М. ⚽⚽\n2. Дмитрий К. 🎯\n3. Сергей П.\n...\n\n❌ Не могут (2)\n⏳ Не ответили (2)'}],
    collect:[{t:'out',m:'/collect Аренда поля 500₽'},{t:'in',m:'💳 Сбор запущен\n\nЦель: 8,000₽\nСобрано: 6,500₽ (81%)\nОсталось: 1,500₽'},{t:'out',m:'Напомнить должникам'},{t:'in',m:'📢 Напоминание отправлено!\n\n• Андрей Л.\n• Павел С.\n• Михаил Г.'}],
    stats:[{t:'out',m:'/stats'},{t:'in',m:'📊 Статистика команды:\n\n⚽ Матчи: 24\n• Победы: 18 (75%)\n• Ничьи: 3\n• Поражения: 3\n\n👥 Посещаемость: 92%\n🔥 Серия: 5 побед'},{t:'out',m:'/stats Алексей М.'},{t:'in',m:'🏃 Алексей М.:\n\n⚽ Голы: 12\n🎯 Передачи: 8\n⭐ Рейтинг: 8.4/10'}],
    media:[{t:'out',m:'Фото с матча'},{t:'in',m:'📸 «Финал лиги» — 20 июня 2026\n\n✅ Загружено: 24 фото\n👥 От 8 игроков'},{t:'out',m:'/video'},{t:'in',m:'🎬 Видео:\n\n📹 Финал лиги (15 мин)\n📹 Тренировка 18.06 (8 мин)\n\nВсего: 42 видео'}],
};

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
const isTouch='ontouchstart' in window;

let curFilter='all', lbItems=[], lbIdx=-1, touchX0=0;

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded',()=>{
    applyLinks();initTheme();initHeader();initBurger();initSmooth();
    initScrollAnim();initFaq();initShowcase();initLightbox();initDemo();
    // THE JUICE
    initHeroReveal();
    initCursorGlow();
    initMagnetic();
    initRipple();
    initParallax();
    initTilt();
    initScrollspy();
    setTimeout(()=>document.body.classList.add('loaded'),80);
});

// ── Links ──
function applyLinks(){$$('[data-action]').forEach(el=>{const a=el.dataset.action;if(a==='connect')el.href=CFG.links.connect;else if(a==='support')el.href=CFG.links.support;else el.href=CFG.links.bot})}

// ── Theme ──
function initTheme(){const s=localStorage.getItem('theme'),sys=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.dataset.theme=s||sys;$('#theme-toggle').addEventListener('click',()=>{const n=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=n;localStorage.setItem('theme',n)})}

// ── Header ──
function initHeader(){const h=$('#header');const fn=()=>h.classList.toggle('scrolled',scrollY>60);window.addEventListener('scroll',fn,{passive:true});fn()}

// ── Scrollspy ──
function initScrollspy(){
    const secs=$$('section[id]'),links=$$('.nav-link');
    const fn=()=>{let cur='';const sy=scrollY+120;secs.forEach(s=>{if(sy>=s.offsetTop&&sy<s.offsetTop+s.offsetHeight)cur=s.id});links.forEach(l=>{l.classList.toggle('active',l.getAttribute('href')==='#'+cur)})};
    window.addEventListener('scroll',fn,{passive:true});fn();
}

// ── Burger ──
function initBurger(){const b=$('#burger'),m=$('#mobile-menu');b.addEventListener('click',()=>{const o=m.classList.toggle('active');b.classList.toggle('active');document.body.classList.toggle('no-scroll',o)});$$('.mobile-link,.mobile-nav .btn',m).forEach(l=>l.addEventListener('click',()=>{m.classList.remove('active');b.classList.remove('active');document.body.classList.remove('no-scroll')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&m.classList.contains('active')){m.classList.remove('active');b.classList.remove('active');document.body.classList.remove('no-scroll')}})}

// ── Smooth scroll ──
function initSmooth(){$$('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const h=a.getAttribute('href');if(h==='#'){e.preventDefault();scrollTo({top:0,behavior:'smooth'});return}const t=$(h);if(t){e.preventDefault();const off=$('#header').offsetHeight+20;const y=t.getBoundingClientRect().top+scrollY-off;scrollTo({top:y,behavior:'smooth'})}})})}

// ── Scroll Anim ──
function initScrollAnim(){if(reduced()){$$('[data-anim]').forEach(e=>e.classList.add('vis'));return}const obs=new IntersectionObserver(entries=>{entries.forEach(en=>{if(en.isIntersecting){const d=+(en.target.dataset.delay||0);setTimeout(()=>en.target.classList.add('vis'),d);obs.unobserve(en.target)}})},{rootMargin:'0px 0px -80px 0px',threshold:0.1});$$('[data-anim]').forEach(e=>obs.observe(e))}

// ── FAQ ──
function initFaq(){$$('.faq-item').forEach(item=>{$('.faq-q',item).addEventListener('click',()=>{const was=item.classList.contains('active');$$('.faq-item').forEach(i=>i.classList.remove('active'));if(!was)item.classList.add('active')})})}

// ═══════════════════════════════
// ★ THE JUICE — COOL EFFECTS ★
// ═══════════════════════════════

// ── 1. Hero Letter-by-Letter Reveal ──
function initHeroReveal(){
    if(reduced()){$$('.hero-sub,.hero-btns,.hero-metrics').forEach(e=>e.classList.add('vis'));$('.phone-hero')?.classList.add('vis');return}
    const h1=$('.hero-h1');if(!h1)return;
    // Wrap each letter in span
    const lines=$$('.hero-line',h1);
    lines.forEach(line=>{
        const html=line.innerHTML;
        // Preserve child elements (like .glow-text spans)
        const tmp=document.createElement('div');tmp.innerHTML=html;
        let result='';
        tmp.childNodes.forEach(node=>{
            if(node.nodeType===3){// text
                [...node.textContent].forEach(ch=>{
                    if(ch===' ')result+='<span class="char-space"> </span>';
                    else result+=`<span class="char">${ch}</span>`;
                });
            } else if(node.nodeType===1){// element
                const inner=[...node.textContent].map(ch=>ch===' '?'<span class="char-space"> </span>':`<span class="char">${ch}</span>`).join('');
                const clone=node.cloneNode(false);clone.innerHTML=inner;result+=clone.outerHTML;
            }
        });
        line.innerHTML=result;
    });
    // Animate after short delay
    const chars=$$('.hero-h1 .char');
    const obs=new IntersectionObserver(entries=>{
        if(entries[0].isIntersecting){
            chars.forEach((ch,i)=>{ch.style.transitionDelay=`${i*30}ms`;ch.classList.add('vis')});
            // Then reveal sub, btns, metrics
            setTimeout(()=>{$('.hero-sub')?.classList.add('vis')},chars.length*30+100);
            setTimeout(()=>{$('.hero-btns')?.classList.add('vis')},chars.length*30+250);
            setTimeout(()=>{$('.hero-metrics')?.classList.add('vis')},chars.length*30+400);
            setTimeout(()=>{$('.phone-hero')?.classList.add('vis')},200);
            obs.disconnect();
        }
    },{threshold:0.2});
    obs.observe(h1);
}

// ── 2. Cursor Glow with Lerp ──
function initCursorGlow(){
    if(isTouch||reduced()||innerWidth<768)return;
    const glow=document.createElement('div');glow.className='cursor-glow';document.body.appendChild(glow);
    let mx=0,my=0,gx=0,gy=0,active=false;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(!active){active=true;glow.classList.add('vis')}});
    document.addEventListener('mouseleave',()=>{active=false;glow.classList.remove('vis')});
    (function tick(){gx+=(mx-gx)*0.08;gy+=(my-gy)*0.08;glow.style.left=gx+'px';glow.style.top=gy+'px';requestAnimationFrame(tick)})();
}

// ── 3. Magnetic Buttons ──
function initMagnetic(){
    if(isTouch||reduced()||innerWidth<1024)return;
    $$('.btn-primary,.btn-ghost,.btn-outline').forEach(btn=>{
        btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();const x=e.clientX-r.left-r.width/2;const y=e.clientY-r.top-r.height/2;btn.style.transform=`translate(${x*0.25}px,${y*0.25}px) scale(1.03)`});
        btn.addEventListener('mouseleave',()=>{btn.style.transform=''});
    });
}

// ── 4. Button Ripple Effect ──
function initRipple(){
    $$('.btn').forEach(btn=>{
        btn.addEventListener('click',e=>{
            const r=btn.getBoundingClientRect();const rip=document.createElement('span');rip.className='ripple';
            const size=Math.max(r.width,r.height);rip.style.width=rip.style.height=size+'px';
            rip.style.left=(e.clientX-r.left-size/2)+'px';rip.style.top=(e.clientY-r.top-size/2)+'px';
            btn.appendChild(rip);setTimeout(()=>rip.remove(),700);
        });
    });
}

// ── 5. Parallax on Scroll ──
function initParallax(){
    if(reduced())return;
    const els=[{el:$('.mesh-orb-1'),speed:-0.03},{el:$('.mesh-orb-2'),speed:0.04},{el:$('.mesh-orb-3'),speed:-0.02},{el:$('.phone-glow'),speed:-0.06}].filter(o=>o.el);
    if(!els.length)return;
    let ticking=false;
    window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(()=>{const sy=scrollY;els.forEach(o=>{o.el.style.transform=`translateY(${sy*o.speed}px)`});ticking=false})}},{passive:true});
}

// ── 6. Card Tilt with Spotlight ──
function initTilt(){
    if(isTouch||reduced()||innerWidth<1024)return;
    $$('.feat-card,.price-card,.testi-card,.step-card').forEach(c=>{
        c.addEventListener('mousemove',e=>{
            const r=c.getBoundingClientRect();
            const x=((e.clientX-r.left)/r.width-0.5)*8;
            const y=((e.clientY-r.top)/r.height-0.5)*-8;
            c.style.transform=`perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-6px)`;
            // Spotlight: move ::before gradient origin
            const px=((e.clientX-r.left)/r.width*100);
            const py=((e.clientY-r.top)/r.height*100);
            c.style.setProperty('--spot-x',px+'%');
            c.style.setProperty('--spot-y',py+'%');
        });
        c.addEventListener('mouseleave',()=>{c.style.transform=''});
    });
}

// ── Hero Messages Animation ──
function initHeroMsgs(){
    if(reduced())return;
    const msgs=$$('#hero-msgs .msg');msgs.forEach(m=>{m.style.opacity='0';m.style.transform='translateY(16px)'});
    const obs=new IntersectionObserver(en=>{if(en[0].isIntersecting){msgs.forEach((m,i)=>setTimeout(()=>{m.style.transition='all .5s var(--ease-out)';m.style.opacity='1';m.style.transform='none'},i*500));obs.disconnect()}},{threshold:0.3});
    const v=$('.hero-visual');if(v)obs.observe(v);
}
// Fire after hero reveal
setTimeout(initHeroMsgs,800);

// ═══════════════════
// SHOWCASE
// ═══════════════════
function initShowcase(){renderFilters();renderCards();observeCards();initVideoHover()}
function renderFilters(){const el=$('#showcase-filters');const counts={all:ITEMS.length};ITEMS.forEach(i=>{counts[i.cat]=(counts[i.cat]||0)+1});el.innerHTML=CATEGORIES.filter(c=>c.id==='all'||counts[c.id]).map(c=>`<button class="sc-filter${c.id==='all'?' active':''}" data-f="${c.id}"><span>${c.icon}</span> ${c.label} <span class="f-count">${counts[c.id]}</span></button>`).join('');$$('.sc-filter',el).forEach(b=>{b.addEventListener('click',()=>{if(b.dataset.f===curFilter)return;curFilter=b.dataset.f;$$('.sc-filter',el).forEach(x=>x.classList.remove('active'));b.classList.add('active');filterCards()})})}

function renderCards(){const g=$('#showcase-grid');g.innerHTML=ITEMS.map((item,i)=>{const cat=CATEGORIES.find(c=>c.id===item.cat);const exp=item.type!=='placeholder'?`<div class="sc-expand"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></div>`:'';return`<div class="sc-card" data-id="${item.id}" data-cat="${item.cat}" data-type="${item.type}" data-frame="${item.frame}" data-idx="${i}" style="transition-delay:${(i%6)*70}ms"><div class="sc-media">${mediaHTML(item)}${exp}</div><div class="sc-info"><div class="sc-tag"><span class="sc-tag-dot"></span>${cat?cat.label:item.cat}</div><div class="sc-title">${item.title}</div><p class="sc-desc">${item.desc}</p></div></div>`}).join('');$$('.sc-card',g).forEach(c=>{c.addEventListener('click',()=>{if(c.dataset.type==='placeholder')return;openLightbox(+c.dataset.idx)})})}

function mediaHTML(i){
    if(i.type==='placeholder')return`<div class="sc-placeholder"><div class="sc-placeholder-ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg></div><span class="sc-placeholder-txt">${i.icon||'📎'} Скоро</span></div>`;
    if(i.type==='video'&&i.frame==='phone')return`<div class="sc-phone"><div class="sc-phone-inner"><div class="sc-phone-notch"></div><video data-src="${i.src}" muted loop playsinline preload="none"></video><div class="sc-play"><div class="sc-play-ico"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div></div></div></div>`;
    if(i.type==='video')return`<div class="sc-wide"><video data-src="${i.src}" muted loop playsinline preload="none"></video><div class="sc-play"><div class="sc-play-ico"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div></div></div>`;
    if(i.type==='image'&&i.frame==='phone')return`<div class="sc-phone"><div class="sc-phone-inner"><div class="sc-phone-notch"></div><img src="${i.src}" alt="${i.title}" loading="lazy"></div></div>`;
    if(i.type==='image')return`<div class="sc-wide"><img src="${i.src}" alt="${i.title}" loading="lazy"></div>`;
    return'';
}

function filterCards(){$$('.sc-card',$('#showcase-grid')).forEach(c=>{const show=curFilter==='all'||c.dataset.cat===curFilter;if(show){c.classList.remove('hide');c.style.display='';requestAnimationFrame(()=>c.classList.add('vis'))}else{c.classList.add('hide');setTimeout(()=>{if(c.classList.contains('hide'))c.style.display='none'},450)}})}

function observeCards(){if(reduced()){$$('.sc-card',$('#showcase-grid')).forEach(c=>c.classList.add('vis'));return}const obs=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})},{rootMargin:'0px 0px -60px 0px',threshold:0.1});$$('.sc-card',$('#showcase-grid')).forEach(c=>obs.observe(c))}

function initVideoHover(){const lo=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){const v=e.target.querySelector('video[data-src]');if(v&&!v.src){v.src=v.dataset.src;v.load()}lo.unobserve(e.target)}})},{rootMargin:'300px 0px',threshold:0});$$('.sc-card[data-type="video"]',$('#showcase-grid')).forEach(card=>{lo.observe(card);card.addEventListener('mouseenter',()=>{const v=card.querySelector('video');if(v&&v.src)v.play().catch(()=>{})});card.addEventListener('mouseleave',()=>{const v=card.querySelector('video');if(v&&!v.paused){v.pause();v.currentTime=0}})})}

// ═══ LIGHTBOX ═══
function initLightbox(){$('#lb-close').addEventListener('click',closeLb);$('.lb-overlay').addEventListener('click',closeLb);$('#lb-prev').addEventListener('click',()=>lbGo(-1));$('#lb-next').addEventListener('click',()=>lbGo(1));document.addEventListener('keydown',e=>{if(!$('.lightbox').classList.contains('active'))return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft'){e.preventDefault();lbGo(-1)}if(e.key==='ArrowRight'){e.preventDefault();lbGo(1)}});$('.lightbox').addEventListener('touchstart',e=>{touchX0=e.changedTouches[0].clientX},{passive:true});$('.lightbox').addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-touchX0;if(Math.abs(dx)>50)lbGo(dx>0?-1:1)},{passive:true})}

function openLightbox(oi){lbItems=ITEMS.map((it,i)=>({...it,oi:i})).filter(it=>it.type!=='placeholder');lbIdx=lbItems.findIndex(it=>it.oi===oi);if(lbIdx===-1)return;renderLb();$('.lightbox').classList.add('active');$('.lightbox').setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');$$('#showcase-grid video').forEach(v=>{if(!v.paused)v.pause()})}

function closeLb(){const v=$('.lb-body video');if(v){v.pause();v.src=''}$('#lb-body').innerHTML='';$('#lb-caption').textContent='';$('#lb-counter').textContent='';$('.lightbox').classList.remove('active');$('.lightbox').setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll');lbIdx=-1}

function renderLb(){const it=lbItems[lbIdx];if(!it)return;let h='';if(it.type==='video'){if(it.frame==='phone')h=`<div class="lb-phone"><div class="lb-phone-notch"></div><video src="${it.src}" controls autoplay muted loop playsinline></video></div>`;else h=`<video src="${it.src}" controls autoplay muted loop playsinline></video>`}else{h=`<img src="${it.src}" alt="${it.title}" draggable="false">`}$('#lb-body').innerHTML=h;$('#lb-caption').textContent=it.title+' — '+it.desc;$('#lb-counter').textContent=`${lbIdx+1} / ${lbItems.length}`;$('#lb-prev').style.display=lbIdx>0?'':'none';$('#lb-next').style.display=lbIdx<lbItems.length-1?'':'none'}

function lbGo(dir){const ni=lbIdx+dir;if(ni<0||ni>=lbItems.length)return;const cv=$('#lb-body video');if(cv){cv.pause();cv.src=''}lbIdx=ni;const b=$('#lb-body');b.classList.remove('slide-l','slide-r');void b.offsetWidth;b.classList.add(dir>0?'slide-l':'slide-r');renderLb()}

// ═══ DEMO ═══
function initDemo(){$('#demo-trigger')?.addEventListener('click',openDemo);$('#demo-close').addEventListener('click',closeDemo);$('.demo-overlay').addEventListener('click',closeDemo);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('.demo-modal').classList.contains('active'))closeDemo()});$$('.demo-sc').forEach(b=>{b.addEventListener('click',()=>{$$('.demo-sc').forEach(x=>x.classList.remove('active'));b.classList.add('active');loadDemo(b.dataset.sc)})})}

function openDemo(){$('.demo-modal').classList.add('active');document.body.classList.add('no-scroll');loadDemo('match')}
function closeDemo(){$('.demo-modal').classList.remove('active');document.body.classList.remove('no-scroll')}
function loadDemo(key){const msgs=DEMOS[key];if(!msgs)return;const el=$('#demo-msgs');el.innerHTML='';msgs.forEach((m,i)=>{setTimeout(()=>{const d=document.createElement('div');d.className=`msg msg-${m.t}`;d.style.cssText='opacity:0;transform:translateY(14px);transition:all .45s var(--ease-out)';d.innerHTML=`<div class="bubble">${m.m.replace(/\n/g,'<br>')}</div>`;el.appendChild(d);setTimeout(()=>{d.style.opacity='1';d.style.transform='none'},40);setTimeout(()=>{el.scrollTop=el.scrollHeight},80)},i*500)})}

// ── Resize ──
window.addEventListener('resize',()=>{if(innerWidth>768&&$('#mobile-menu').classList.contains('active')){$('#mobile-menu').classList.remove('active');$('#burger').classList.remove('active');document.body.classList.remove('no-scroll')}});
