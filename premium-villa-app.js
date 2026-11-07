/* ============================================================
   ELITE HOME CARE — FiabaMia-style app
   Wizard · Bilingual EN/AR · Sound · Everything interactive
   ============================================================ */
const PHONE='966597865115';
const WA=`https://wa.me/${PHONE}`;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let lang=localStorage.getItem('ehc-lang')||'en';
const bootStart=Date.now();

/* ================= DATA ================= */
const SERVICES=[
 {id:'ac',icon:'❄️',tEn:'Air Conditioning',tAr:'التكييف',dEn:'Installation, maintenance & refill — split, window, central.',dAr:'تثبيت وصيانة وتعبئة — سبليت ومركزي.',fEn:['Same-day full cooling check-up','Freon refill & tech visit','All brands, original parts','Filter & coil deep care']},
 {id:'plumbing',icon:'🔧',tEn:'Plumbing',tAr:'السباكة',dEn:'Leak detection, clogs, pumps, mixers & water heaters.',dAr:'كشف تسريبات، سدود، مضخات، خلاطات وسخانات.',fEn:['Pressure & pipe diagnostics','Drain unclogging & jet cleaning','Water heater install / swap','Hidden-leak tracing']},
 {id:'electrical',icon:'⚡',tEn:'Electrical',tAr:'الكهرباء',dEn:'Licensed wiring, breakers, lighting & socket work.',dAr:'تمديدات وفواصل وإضاءة ودوائر مرخصة.',fEn:['Panel & breaker repair','Full / partial rewiring','Indoor & garden lighting','Safe socket & switch work']},
 {id:'painting',icon:'🎨',tEn:'Painting',tAr:'الدهانات',dEn:'Interior & exterior painting, finishing and decor.',dAr:'دهان داخلي وخارجي وتشطيبات وديكور.',fEn:['Premium paint brands provided','Furniture masked & covered','Zero-drip edges & trims','Fast, dust-controlled work']},
 {id:'carpentry',icon:'🪚',tEn:'Carpentry',tAr:'النجارة',dEn:'Custom woodwork, doors, cabinets & furniture repair.',dAr:'أعمال خشبية، أبواب، دواليب وإصلاح أثاث.',fEn:['Custom shelving & wardrobes','Door alignment & locks','Cabinet installs & fixes','Furniture restoration']},
 {id:'cleaning',icon:'🧹',tEn:'Deep Cleaning',tAr:'التنظيف العميق',dEn:'Full home & villa deep cleaning, facades, floors.',dAr:'تنظيف عميق للمنازل والفلل والواجهات.',fEn:['Sofa & mattress care','Facade & balcony wash','Move-in / move-out clean','Floor polishing & buffing']},
 {id:'pest',icon:'🐜',tEn:'Pest Control',tAr:'مكافحة الحشرات',dEn:'Safe, certified spraying & prevention programs.',dAr:'رش معتمد آمن وبرامج وقاية.',fEn:['Odorless certified products','Cockroach & ant treatment','Quarterly prevention plans','Pet & child safe zones']},
 {id:'waterproofing',icon:'🛡️',tEn:'Waterproofing',tAr:'العزل المائي',dEn:'Roof & bathroom waterproofing, leakage sealing.',dAr:'عزل أسطح وحمامات وإيقاف تسرُّب.',fEn:['Roof-base coatings','Wet-area sealing','Leak tracing & fix','Heat-reflective options']},
 {id:'tiles',icon:'🧱',tEn:'Tiles & Flooring',tAr:'البلاط والأرضيات',dEn:'Tile fixing, grout repair, porcelain & marble care.',dAr:'تركيب بلاط وإصلاح تشققات ورخام.',fEn:['Crack & chip repair','Grout re-finish','Marble polishing','Level & lippage correction']},
 {id:'gypsum',icon:'🏛️',tEn:'Gypsum Works',tAr:'أعمال الجبس',dEn:'Decor ceilings, cornices & partitions.',dAr:'سقوف ديكور وكورنيشات وقواطع.',fEn:['Modern ceiling designs','Crack-free finishing','Quick partitions','Hidden LED coves']},
 {id:'garden',icon:'🌿',tEn:'Garden Care',tAr:'العناية بالحدائق',dEn:'Landscaping, irrigation, trimming & palm care.',dAr:'تنسيق حدائق وري وتقليم ورعاية نخيل.',fEn:['Irrigation systems','Lawn & plant trimming','Palm-safe programs','Seasonal planting']},
 {id:'renovation',icon:'🏠',tEn:'Full Renovation',tAr:'التجديد الكامل',dEn:'Whole-home renovation project management.',dAr:'إدارة تجديد منازل كاملة.',fEn:['One project manager for all','Fixed-price milestones','Weekly photo reports','Design + build support']}
];
const CITIES=[['Riyadh','الرياض'],['Jeddah','جدة'],['Dammam','الدمام'],['Khobar','الخبر'],['Makkah','مكة'],['Madinah','المدينة'],['Taif','الطائف'],['Jubail','الجبيل']];
const GALLERY=[
 ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700','Villa facade cared','واجهة فيلا نعتني بها'],
 ['https://images.unsplash.com/photo-1556911220-bff31c812dba?w=700','Kitchen detail','تفاصيل مطبخ'],
 ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700','Deep clean day','يوم تنظيف عميق'],
 ['https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=700','Electrical panel work','أعمال لوحة الكهرباء'],
 ['https://images.unsplash.com/photo-1631545804407-6f0af67a6fc8?w=700','AC full service','صيانة تكييف كاملة'],
 ['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=700','Fresh paint finish','تشطيب دهان جديد']
];
const REVIEWS=[
 {nEn:'Mohammed Al-Rashid',nAr:'محمد الراشد',cEn:'Villa · Riyadh',cAr:'فيلا · الرياض',tEn:'They renovated our whole villa. Every day they left the site cleaner than they found it.',tAr:'جددوا فللتنا بالكامل. كل يوم كانوا يتركون المكان أنظف مما وجوه.'},
 {nEn:'Fatima Al-Saud',nAr:'فاطمة السعود',cEn:'Apartment · Jeddah',cAr:'شقة · جدة',tEn:'Our AC died in July. Voice note at 9pm — someone was at my door before midnight. Cold again.',tAr:'مكيفنا تعطل في يوليو. رسالة صوتية الساعة 9 مساءً — عند الباب قبل منتصف الليل. البرد عاد.'},
 {nEn:'Khalid Al-Otaibi',nAr:'خالد العتيبي',cEn:'Duplex · Dammam',cAr:'دوبلكس · الدمام',tEn:'The quote on WhatsApp was the same number on the final bill. First time in years. I signed the monthly package on the spot.',tAr:'العرض على واتساب كان نفس رقم الفاتورة النهائية. أول مرة منذ سنوات. وقعت الباقة الشهرية في الحال.'},
 {nEn:'Noura Al-Qahtani',nAr:'نورة القحطاني',cEn:'Villa · Madinah',cAr:'فيلا · المدينة',tEn:'They fixed the water heater AND found a hidden leak we lived with for two years.',tAr:'صلحوا السخان وتعرفوا على تسريب خفي عشنا معه سنتين.'},
 {nEn:'Abdullah Al-Hamdan',nAr:'عبدالله الحمدان',cEn:'Compound · Khobar',cAr:'كومباوند · الخبر',tEn:'Silent, on time, shoe covers. My strict father-in-law even approved the end result.',tAr:'هادئون، في الموعد، وأغطية أحذية. حتى حماوي الدقيق الموافق على النتيجة.'},
 {nEn:'Sara Al-Harbi',nAr:'سارة الحربي',cEn:'3 rentals · Riyadh',cAr:'٣ عقارات · الرياض',tEn:'Three rentals, one number. They flag issues before my tenants even notice.',tAr:'ثلاث عقارات، رقم واحد. يبلغوني عن المشكلات قبل المستأجرين أنفسهم.'}
];
const PACKAGES=[
 {hot:false,emoji:'✦',tEn:'The First Visit',tAr:'الزيارة الأولى',sEn:'One fix, done right',sAr:'إصلاح واحد، على أصله',fe:[['Full diagnosis — price fixed before work','فحص كامل وسعر ثابت قبل العمل'],['Skilled technician, original parts','فني ماهر وقطع أصلية'],['90-day written warranty','ضمان 90 يوماً مكتوب'],['Photos in WhatsApp before/after','صور قبل/بعد على واتساب']]},
 {hot:true,emoji:'✦✦',tEn:'Family Care',tAr:'رعاية العائلة',sEn:'Monthly peace, four visits',sAr:'راحة شهرية، أربع زيارات',fe:[['4 scheduled visits / month','٤ زيارات مجدولة شهرياً'],['Priority 24/7 emergency line','أولوية خط الطوارئ 24/7'],['Seasonal AC prep & checks','تجهيز وتدقيق التكييف الموسمي'],['Household fixes list handled','قائمة إصلاحات منزلية'],['Discounted extra work','خصم على الأعمال الإضافية']]},
 {hot:false,emoji:'✦✦✦',tEn:'Elite Villa Contract',tAr:'عقد الفيلا الفاخرة',sEn:'Your home, fully managed',sAr:'منزلك، مُدار بالكامل',fe:[['Dedicated team + manager','فريق ومدير مخصص'],['24/7 engineer-answered line','خط 24/7 يرد عليه مهندس'],['Full coverage: AC · plumbing · electrical · more','تغطية كاملة: تكييف · سباكة · كهرباء وأكثر'],['Garden & exterior care','عناية بالحديقة والواجهات'],['Monthly home health report','تقرير فصلي عن صحة المنزل']]}
];
const FAQ=[
 {qEn:'How fast can you reach me?',qAr:'ما سرعة وصولكم؟',aEn:'Most bookings are same-day or next-day. Emergencies in major cities are usually handled within 60–120 minutes, 24/7.',aAr:'معظم الحجوزات في نفس اليوم أو اليوم التالي. الطوارئ في المدن الرئيسية عادة خلال 60–120 دقيقة، على مدار الساعة.'},
 {qEn:'Which cities do you cover?',qAr:'ما المدن التي تغطونها؟',aEn:'Riyadh, Jeddah, Dammam, Khobar, Makkah, Madinah, Taif and Jubail — plus nearby areas on request.',aAr:'الرياض، جدة، الدمام، الخبر، مكة، المدينة، الطائف والجبيل — بالإضافة إلى المناطق المجاورة عند الطلب.'},
 {qEn:'Do you give a warranty?',qAr:'هل تقدمون ضماناً؟',aEn:'Yes — 90 days written warranty on every repair. If the same problem returns, we come back free.',aAr:'نعم — ضمان 90 يوماً مكتوب على كل إصلاح. إن عاد نفس العطل، نعود مجاناً.'},
 {qEn:'How much does a visit cost?',qAr:'كم تكلفة الزيارة؟',aEn:'Prices depend on the job, but always fixed with you before we start — the quote you approve is the bill you pay. No hidden fees.',aAr:'تختلف الأسعار حسب العمل، لكنها دائماً ثابتة معك قبل البدء — العرض الذي توافق عليه هو الفاتورة التي تدفعها. لا رسوم خفية.'},
 {qEn:'Are your technicians certified?',qAr:'هل الفنيون معتمدون؟',aEn:'Every technician is licensed, background-checked and trained in-house. Electrical work is done by government-certified electricians only.',aAr:'كل فني مرخص ومدرَّب لدينا. والكهرباء يكون فقط على يد كهربائيين معتمدين من الجهات المختصة.'},
 {qEn:'Can I schedule regular monthly care?',qAr:'هل يمكن جدولة رعاية شهرية منتظمة؟',aEn:'Absolutely — that\'s the "Family Care" package. Four planned visits a month plus a 24/7 emergency line with priority response.',aAr:'بالتأكيد — تلك هي باقة "رعاية العائلة". أربع زيارات مجدولة شهرياً مع خط طوارئ 24/7 وأولوية استجابة.'}
];

/* ================= SOUND ================= */
let audioOn=false, actx=null;
function beep(freq=660,dur=.07,type='sine',vol=.045){
  if(!audioOn) return;
  try{
    actx=actx||new (window.AudioContext||window.webkitAudioContext)();
    const o=actx.createOscillator(),g=actx.createGain();
    o.type=type;o.frequency.value=freq;g.gain.value=vol;
    o.connect(g);g.connect(actx.destination);
    g.gain.exponentialRampToValueAtTime(.0001,actx.currentTime+dur);
    o.start();o.stop(actx.currentTime+dur);
  }catch(e){}
}
function chime(){beep(523,.12);setTimeout(()=>beep(659,.14),110);setTimeout(()=>beep(784,.22),240);}
$('#soundbar').addEventListener('click',()=>{
  audioOn=!audioOn;
  $('#soundbar').classList.toggle('on',audioOn);
  $('#soundTxt').textContent=audioOn?(lang==='ar'?'الصوت يعمل':'Sound on'):(lang==='ar'?'استماع بالصوت':'Listen with sound');
  if(audioOn) chime();
});

/* ================= RENDER ================= */
const FILTERS=[['all','All','الكل'],['ac','AC','التكييف'],['plumbing','Plumbing','السباكة'],['electrical','Electrical','الكهرباء'],['finishing','Finishing','التشطيب'],['clean','Clean','النظافة'],['renov','Renovation','التجديد']];
const svcCat=s=>({ac:'ac',plumbing:'plumbing',electrical:'electrical',painting:'finishing',carpentry:'finishing',tiles:'finishing',gypsum:'finishing',cleaning:'clean',pest:'clean',garden:'clean',waterproofing:'renov',renovation:'renov'})[s.id];

function renderAll(){
  /* filters */
  const fWrap=$('#svcFilters'); fWrap.innerHTML='';
  FILTERS.forEach(([id,en,ar])=>{
    const b=document.createElement('button');
    b.className='fchip'+(id==='all'?' active':'');
    b.dataset.en=en;b.dataset.ar=ar;
    b.textContent=lang==='ar'?ar:en;
    b.onclick=()=>{
      beep(600,.05);
      $$('.fchip').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      $$('#svcGrid .svc-card').forEach(c=>{
        c.style.display=(id==='all'||c.dataset.cat===id)?'':'none';
      });
    };
    fWrap.appendChild(b);
  });
  /* services */
  const g=$('#svcGrid'); g.innerHTML='';
  SERVICES.forEach(s=>{
    const d=document.createElement('div');
    d.className='svc-card';d.dataset.cat=svcCat(s);
    d.innerHTML=`<div class="svc-ic">${s.icon}</div><h3>${lang==='ar'?s.tAr:s.tEn}</h3><p>${lang==='ar'?s.dAr:s.dEn}</p>
      <span class="svc-more">${lang==='ar'?'ماذا يشمل':"What's included"} →</span>`;
    d.onclick=()=>openService(s);
    g.appendChild(d);
  });
  /* wizard tiles — services */
  const st=$('#svcTiles'); st.innerHTML='';
  SERVICES.forEach(s=>{
    const b=document.createElement('button');b.className='tile';b.dataset.id=s.id;
    b.innerHTML=`${s.icon}<br>${lang==='ar'?s.tAr:s.tEn}`;
    b.onclick=()=>{
      beep(720,.08);
      st.querySelectorAll('.tile').forEach(x=>x.classList.remove('sel'));
      b.classList.add('sel'); wiz.svc=s.id; updateSummary();
    };
    st.appendChild(b);
  });
  /* wizard tiles — cities */
  const ct=$('#cityTiles'); ct.innerHTML='';
  CITIES.forEach(([en,ar])=>{
    const b=document.createElement('button');b.className='tile';b.dataset.city=en;
    b.innerHTML=`📍<br>${lang==='ar'?ar:en}`;
    b.onclick=()=>{
      beep(720,.08);
      ct.querySelectorAll('.tile').forEach(x=>x.classList.remove('sel'));
      b.classList.add('sel'); wiz.city=en; updateSummary();
    };
    ct.appendChild(b);
  });
  /* restore selection marks */
  st.querySelectorAll('.tile').forEach(t=>{if(t.dataset.id===wiz.svc)t.classList.add('sel');});
  ct.querySelectorAll('.tile').forEach(t=>{if(t.dataset.city===wiz.city)t.classList.add('sel');});
  /* gallery */
  const gg=$('#galGrid'); gg.innerHTML='';
  GALLERY.forEach(([img,tEn,tAr])=>{
    const d=document.createElement('div');d.className='svc-card';d.style.padding='0';d.style.overflow='hidden';
    d.innerHTML=`<img loading="lazy" src="${img}" alt="${tEn}" style="height:220px;width:100%;object-fit:cover">
      <div style="padding:16px 20px"><b style="font-family:var(--serif)">${lang==='ar'?tAr:tEn}</b></div>`;
    gg.appendChild(d);
  });
  /* reviews */
  const rg=$('#revGrid'); rg.innerHTML='';
  REVIEWS.forEach(r=>{
    const d=document.createElement('div');d.className='rev-card';
    const initial=(lang==='ar'?r.nAr:r.nEn).trim()[0];
    d.innerHTML=`<div class="stars">★★★★★</div><q>${lang==='ar'?r.tAr:r.tEn}</q>
      <div class="rev-who"><span class="rev-av">${initial}</span>
      <span><b>${lang==='ar'?r.nAr:r.nEn}</b><small>${lang==='ar'?r.cAr:r.cEn}</small></span></div>`;
    rg.appendChild(d);
  });
  /* packages */
  const pg=$('#pkgGrid'); pg.innerHTML='';
  PACKAGES.forEach(p=>{
    const d=document.createElement('div');d.className='pkg'+(p.hot?' hot':'');
    const msg=encodeURIComponent(lang==='ar'
      ?`مرحباً، أرغب في باقة «${p.tAr}» من إيليت هوم كير.`
      :`Hello! I'd like the "${p.tEn}" package from Elite Home Care.`);
    d.innerHTML=`${p.hot?`<span class="tag">${lang==='ar'?'الأكثر طلباً':'Most loved'}</span>`:''}
      <div class="pi">${p.emoji}</div><h3>${lang==='ar'?p.tAr:p.tEn}</h3>
      <div class="pkg-sub">${lang==='ar'?p.sAr:p.sEn}</div>
      <ul>${p.fe.map(f=>`<li>${lang==='ar'?f[1]:f[0]}</li>`).join('')}</ul>
      <a class="btn ${p.hot?'btn-gold':'btn-ghost'}" target="_blank" rel="noopener" href="${WA}?text=${msg}">
      <i class="fab fa-whatsapp"></i>&nbsp;${lang==='ar'?'اطلب عرض السعر':'Get this quote'}</a>`;
    pg.appendChild(d);
  });
  /* areas */
  const ag=$('#areaGrid'); ag.innerHTML='';
  CITIES.forEach(([en,ar])=>{
    const s=document.createElement('span');s.className='area-chip';
    s.innerHTML=`<i>◆</i> ${lang==='ar'?ar:en}`;ag.appendChild(s);
  });
  /* faq */
  const fq=$('#faqList'); fq.innerHTML='';
  FAQ.forEach(f=>{
    const d=document.createElement('details');d.className='faq';
    d.innerHTML=`<summary>${lang==='ar'?f.qAr:f.qEn}<span class="pm">+</span></summary>
      <div class="fa-a">${lang==='ar'?f.aAr:f.aEn}</div>`;
    d.querySelector('summary').addEventListener('click',()=>beep(600,.05));
    fq.appendChild(d);
  });
  applyLangTexts();
}

/* ================= WIZARD ================= */
const wiz={svc:null,city:null,date:'',time:'18:00',name:'',phone:'',address:'',emg:false,notes:''};
let step=1; const TOTAL=4;

function sumLine(i,label,val){
  const lines=$('#sumLines'); if(!lines) return;
  const line=lines.children[i]; if(!line) return;
  line.querySelector('span').textContent=label;
  const b=line.querySelector('b');
  b.textContent=val|| (lang==='ar'?'بانتظارك…':'waiting…');
  b.classList.toggle('ph',!val);
}
function updateSummary(){
  const svcObj=SERVICES.find(s=>s.id===wiz.svc);
  const svcTxt=svcObj?(lang==='ar'?svcObj.tAr:svcObj.tEn):'';
  const dateTxt=(wiz.date||wiz.time)?`${wiz.date||'—'} · ${wiz.time}`:'';
  sumLine(0,lang==='ar'?'الخدمة':'Service',svcTxt);
  sumLine(1,lang==='ar'?'المدينة':'City',wiz.city);
  sumLine(2,lang==='ar'?'الموعد':'When',wiz.emg?(lang==='ar'?'🚨 طوارئ':'🚨 Emergency')+' · '+dateTxt:dateTxt);
  sumLine(3,lang==='ar'?'من أنت':'Who',(wiz.name||wiz.phone)?(wiz.name||'—')+' · '+(wiz.phone||'—'):'');
  const ready=!!(wiz.svc&&wiz.city&&(wiz.date||wiz.emg)&&wiz.phone);
  $('#waSend').disabled=!ready;
}
function showStep(n){
  step=n;
  $$('.wiz-panel').forEach(p=>p.classList.toggle('show',p.dataset.step===String(n)));
  $$('#wizDots .wiz-step-dot').forEach((d,i)=>{
    d.classList.toggle('active',typeof n==='number'&&i+1===n);
    d.classList.toggle('done',typeof n==='number'&&i+1<n);
  });
  const done=n==='done';
  const nav=$('.wiz-nav'); if(nav)nav.style.display=done?'none':'';
  $('#wizBack').disabled=done||n===1;
  const NEXT={en:{go:'Next →',end:'Finish →'},ar:{go:'التالي ←',end:'أرسل الحجز ←'}};
  const t=NEXT[lang==='ar'?'ar':'en'][n===TOTAL?'end':'go'];
  $('#wizNext').dataset.en=n===TOTAL?'Finish →':'Next →';
  $('#wizNext').dataset.ar=n===TOTAL?'أرسل الحجز ←':'التالي ←';
  $('#wizNext').textContent=t;
  beep(n===TOTAL?880:600,.08);
}
function buildBookingMsg(){
  const svcObj=SERVICES.find(s=>s.id===wiz.svc);
  const svcName=svcObj?(lang==='ar'?svcObj.tAr:svcObj.tEn):'';
  return (lang==='ar')?
    `🛠️ حجز جديد — إيليت هوم كير\n\n▪ الخدمة: ${svcName}${wiz.emg?'\n🚨 طوارئ':''}\n▪ المدينة: ${wiz.city||'—'}\n▪ الموعد: ${wiz.date||'—'} · ${wiz.time}\n▪ الاسم: ${wiz.name||'—'}\n▪ الجوال: ${wiz.phone||'—'}\n▪ العنوان: ${wiz.address||'—'}${wiz.notes?`\n▪ ملاحظة: ${wiz.notes}`:''}\n\nمن الموقع الرسمي — يرجى الرد فوراً.`:
    `🛠️ New booking — Elite Home Care\n\n• Service: ${svcName}${wiz.emg?'\n🚨 EMERGENCY':''}\n• City: ${wiz.city||'—'}\n• When: ${wiz.date||'—'} at ${wiz.time}\n• Name: ${wiz.name||'—'}\n• Phone: ${wiz.phone||'—'}\n• Address: ${wiz.address||'—'}${wiz.notes?`\n• Notes: ${wiz.notes}`:''}\n\n(sent from your website)`;
}
/* Supabase (optional real integration, reads public config.js)
   ---------- DB contract per supabase-schema.sql -----------*/
async function saveToSupabase(){
  const cfg=window.EHC_CONFIG||{};
  if(!cfg.supabaseUrl||!cfg.supabaseAnonKey) return {skipped:true};
  const genNum=()=> 'EHC-'+Date.now().toString(36).toUpperCase()+Math.floor(Math.random()*1296).toString(36).toUpperCase();
  try{
    const res=await fetch(`${cfg.supabaseUrl}/rest/v1/bookings`,{
      method:'POST',
      headers:{
        apikey:cfg.supabaseAnonKey,
        Authorization:`Bearer ${cfg.supabaseAnonKey}`,
        'Content-Type':'application/json',
        Prefer:'return=representation'
      },
      body:JSON.stringify({
        booking_number:genNum(),
        preferred_date:wiz.date||new Date().toISOString().slice(0,10),
        preferred_time:wiz.time||null,
        address:wiz.address||'',
        city:wiz.city||'',
        customer_phone:wiz.phone||'',
        customer_notes:[wiz.emg?'EMERGENCY/URGENT':null,wiz.notes||null].filter(Boolean).join(' | ')||null,
        status:'pending'
      })
    });
    if(!res.ok){const t=await res.text();return {ok:false,code:res.status,body:t.slice(0,140)};}
    const row=await res.json();
    return {ok:true,data:Array.isArray(row)?row[0]:row};
  }catch(e){return {ok:false,code:0,body:String(e&&e.message||e).slice(0,140)};}
}
async function finishWizard(){
  if(wiz.busy)return; wiz.busy=true;
  try{
  /* real validation first — never open WhatsApp with a half-filled request */
  if(!wiz.svc||!wiz.city){ toast(lang==='ar'?'أكمل الخطوات ١ و ٢ من فضلك':'Please complete steps 1 and 2'); showStep(Math.min(step,(wiz.svc?2:1))); return; }
  const digits=(wiz.phone||'').replace(/[^\d+]/g,'');
  const valid=/(?:\+?966|0)5\d{8}$/.test(digits.replace(/\s/g,''));
  if(!valid){
    toast(lang==='ar'?'رقم جوال سعودي غير صالح — 05xxxxxxxx':'Enter a valid Saudi mobile — 05xxxxxxxx');
    $('#wizPhone').classList.add('inp-err');setFocusPhone();
    beep(430,.09);
    return;
  }
  $('#wizPhone').classList.remove('inp-err');
  if(!wiz.address||wiz.address.trim().length<5){
    toast(lang==='ar'?'عنوان الخدمة مطلوب (حي، شارع، رقم)':'Service address is required (district, street, no.)');
    $('#wizAddress').classList.add('inp-err');$('#wizAddress').focus();
    beep(430,.09);
    return;
  }
  $('#wizAddress').classList.remove('inp-err');
  const msg=buildBookingMsg();
  lastBookingMsg=msg;
  /* privacy: never persist booking PII to localStorage; clear any legacy draft */
  try{localStorage.removeItem('ehc-draft');}catch(e){}
  window.open(`${WA}?text=${encodeURIComponent(msg)}`,'_blank','noopener');
  /* try DB save — silent fallback keeps WhatsApp flow always working */
  const saved=await saveToSupabase();
  lastSave=(saved&&saved.ok)?'db':'wa';
  setSuccessText();
  if(!audioOn){toast(lang==='ar'?'تم تجهيز الحجز ✓':'Booking ready ✓');}
  showStep('done');chime();
  }finally{wiz.busy=false;}
}
let lastBookingMsg='',lastSave=null;
function setSuccessText(){
  const tEl=$('#successText'); if(!tEl||!lastSave) return;
  tEl.textContent=(lastSave==='db')
    ?(lang==='ar'?'تم حفظ حجزك في نظامنا وفتح واتساب بتفاصيله — اضغط إرسال ليصل الفريق.':'Saved to our system — WhatsApp also opened with details. Press send and our team confirms.')
    :(lang==='ar'?'واتساب جاهز بتفاصيل حجزك — اضغط إرسال. سيتأكد فني حقيقي قريباً.':'WhatsApp is open with your booking details — just press send. A real technician will confirm shortly.');
}
function setFocusPhone(){try{$('#wizPhone').focus();}catch(e){}}

/* ================= MODAL ================= */
function openService(s){
  const feats=lang==='ar'
    ?['فحص كامل وسعر ثابت قبل العمل','ضمان 90 يوماً مكتوب','فني مرخص بزي رسمي']
    :['Full diagnosis — price fixed first','90-day written warranty','Uniformed licensed technician'];
  $('#modalBody').innerHTML=`
    <div class="svc-ic" style="width:64px;height:64px;font-size:30px">${s.icon}</div>
    <h3 style="font-family:var(--serif);font-size:26px;margin:16px 0 6px">${lang==='ar'?s.tAr:s.tEn}</h3>
    <p style="color:rgba(244,241,233,.65)">${lang==='ar'?s.dAr:s.dEn}</p>
    <ul style="list-style:none;display:grid;gap:10px;margin:22px 0;font-size:14.5px">
      ${feats.map(f=>`<li style="color:rgba(244,241,233,.8)"><span style="color:var(--gold);margin-inline-end:10px">✦</span>${f}</li>`).join('')}
    </ul>
    <button class="btn btn-gold" style="width:100%;justify-content:center" data-prebook="${s.id}">
      <i class="fas fa-calendar-check"></i><span>${lang==='ar'?'احجز هذه الخدمة':'Book this service'}</span>
    </button>`;
  $('#modal').classList.add('show'); beep(700,.08);
}
function preBook(id){
  $('#modal').classList.remove('show');
  showStep(1);
  setTimeout(()=>{$$('#svcTiles .tile').forEach(t=>{if(t.dataset.id===id)t.click();});},60);
  $('#booking').scrollIntoView({behavior:'smooth'});
}
$('#modalClose').addEventListener('click',()=>$('#modal').classList.remove('show'));
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')$('#modal').classList.remove('show');});
$('#modalBody').addEventListener('click',e=>{
  const b=e.target.closest('[data-prebook]');
  if(b)preBook(b.dataset.prebook);
});
window.preBook=preBook;

/* ================= TOAST ================= */
let toastT;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),3200);}

/* ================= LANGUAGE ================= */
function applyLangTexts(){
  $$('[data-en]').forEach(el=>{
    const v=lang==='ar'?el.dataset.ar:el.dataset.en;
    if(v!==undefined&&!el.closest('#wizDots')||el.closest('#wizDots')&&false)el.innerHTML=v;
    if(el.dataset.ph){el.placeholder=lang==='ar'?(el.dataset.arPh||''):(el.dataset.enPh||'');}
  });
  /* keep wizard dots in sync */
  $$('#wizDots .wiz-step-dot').forEach((d,i)=>{
    const labels={en:['1 · Service','2 · City','3 · Schedule','4 · Contact'],ar:['١ · الخدمة','٢ · المدينة','٣ · الموعد','٤ · التواصل']};
    d.textContent=labels[lang==='ar'?'ar':'en'][i];
    d.classList.toggle('active',i+1===step);
    d.classList.toggle('done',i+1<step);
  });
  /* reopen step buttons */
  const NEXT={en:{go:'Next →',end:'Finish →'},ar:{go:'التالي ←',end:'أرسل الحجز ←'}};
  $('#wizNext').textContent=NEXT[lang==='ar'?'ar':'en'][step===TOTAL?'end':'go'];
  $('#wizBack').textContent=lang==='ar'?'→ السابق':'← Back';
  $('#soundTxt').textContent=audioOn?(lang==='ar'?'الصوت يعمل':'Sound on'):(lang==='ar'?'استماع بالصوت':'Listen with sound');
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  document.body.classList.toggle('ar',lang==='ar');
  $('#langTxt').textContent=lang==='ar'?'English':'عربي';
  setSuccessText();
}
$('#langBtn').addEventListener('click',()=>{
  lang=lang==='en'?'ar':'en';
  localStorage.setItem('ehc-lang',lang);
  renderAll(); updateSummary(); beep(760,.08);
});

/* ================= EVENTS ================= */
$('#wizDate').addEventListener('change',e=>{wiz.date=e.target.value;updateSummary();});
$('#wizTime').addEventListener('change',e=>{wiz.time=e.target.value;updateSummary();});
$('#wizName').addEventListener('input',e=>{wiz.name=e.target.value;updateSummary();});
$('#wizPhone').addEventListener('input',e=>{wiz.phone=e.target.value;e.target.classList.remove('inp-err');updateSummary();});
$('#wizAddress').addEventListener('input',e=>{wiz.address=e.target.value;e.target.classList.remove('inp-err');});
$('#wizNotes').addEventListener('input',e=>{wiz.notes=e.target.value;});
$('#emgSwitch').addEventListener('click',()=>{
  wiz.emg=!wiz.emg;
  $('#emgSwitch').classList.toggle('on',wiz.emg);
  $('#emgSwitch').setAttribute('aria-checked',wiz.emg);
  beep(wiz.emg?880:520,.09); updateSummary();
});
$('#emgSwitch').addEventListener('keypress',e=>{if(e.key==='Enter')$('#emgSwitch').click();});
$('#wizNext').addEventListener('click',()=>{ if(step<TOTAL) showStep(step+1); else finishWizard(); });
$('#wizBack').addEventListener('click',()=>{ if(step>1) showStep(step-1); });
$('#waSend').addEventListener('click',finishWizard);
$('#callSend').addEventListener('click',()=>{window.location.href=`tel:+${PHONE}`;});
$('#reopenWa').addEventListener('click',()=>{
  if(!lastBookingMsg)return;
  window.open(`${WA}?text=${encodeURIComponent(lastBookingMsg)}`,'_blank','noopener');
  beep(720,.08);
});
$('#newBooking').addEventListener('click',()=>{
  Object.assign(wiz,{svc:null,city:null,date:'',time:'18:00',name:'',phone:'',address:'',emg:false,notes:'',busy:false});
  $('#wizDate').value='';$('#wizTime').value='18:00';
  $('#wizName').value='';$('#wizPhone').value='';$('#wizAddress').value='';$('#wizNotes').value='';
  $('#wizPhone').classList.remove('inp-err');$('#wizAddress').classList.remove('inp-err');
  $('#emgSwitch').classList.remove('on');$('#emgSwitch').setAttribute('aria-checked','false');
  lastBookingMsg='';lastSave=null;
  try{localStorage.removeItem('ehc-draft');}catch(e){}
  updateSummary();showStep(1);
  $('#booking').scrollIntoView({behavior:'smooth'});
  beep(600,.06);
});
$$('.vc-mini').forEach(b=>b.addEventListener('click',()=>{
  const go=b.dataset.go;
  if(go==='emergency'){
    window.open(WA+'?text='+encodeURIComponent(lang==='ar'?'🚨 طوارئ! أحتاج فنياً الآن':'🚨 EMERGENCY! I need a technician now'),'_blank','noopener');
  }else{
    showStep(1);
    setTimeout(()=>$$('#svcTiles .tile').forEach(t=>{if(t.dataset.id===go)t.click();}),60);
    $('#booking').scrollIntoView({behavior:'smooth'});
  }
}));
$('#contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const f=e.target;
  const txt=(lang==='ar')
    ?`✉️ رسالة جديدة\n\n▪ الاسم: ${f[0].value}\n▪ الهاتف: ${f[1].value}\n▪ الرسالة: ${f[2].value}\n\nمن الموقع.`
    :`✉️ New message\n\n• Name: ${f[0].value}\n• Phone: ${f[1].value}\n• Message: ${f[2].value}\n\n(from website)`;
  window.open(`${WA}?text=${encodeURIComponent(txt)}`,'_blank','noopener');
  toast(lang==='ar'?'وصلنا رسالتك — أنا أرسلها على واتساب بضغطة زر':'WhatsApp opened — press send');
  f.reset();
});

/* fixes on load — restore draft, then allow overwrite by user actions */
(function restoreDraft(){
  try{
    const d=JSON.parse(localStorage.getItem('ehc-draft')||'null');
    if(d){Object.assign(wiz,{svc:null,city:null,date:'',name:'',phone:'',address:'',emg:false,notes:'',time:d.time||'18:00'});
      $('#wizDate').value=d.date||'';
      $('#wizTime').value=wiz.time;
      $( '#wizName').value=d.name||'';
      $('#wizPhone').value=d.phone||'';
      $('#wizAddress').value=d.address||'';
      $('#wizNotes').value=d.notes||'';
      wiz.date=d.date||'';wiz.name=d.name||'';wiz.phone=d.phone||'';wiz.address=d.address||'';
      wiz.emg=!!d.emg;
      if(wiz.emg)$('#emgSwitch').classList.add('on');
    }
  }catch(e){}
})();

/* ================= BOOT ================= */
function boot(){
  renderAll();
  updateSummary();
  showStep(1);
  addEventListener('scroll',()=>$('#nav').classList.toggle('scrolled',scrollY>40));
  $('#hamb').addEventListener('click',()=>{$('#menu').classList.toggle('open');beep(480,.06);});
  $$('#menu a').forEach(a=>a.addEventListener('click',()=>$('#menu').classList.remove('open')));
  /* reveal on scroll (per-sibling stagger) */
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
  }),{threshold:.1});
  $$('.rv').forEach(el=>{
    const par=el.parentElement;
    const idx=par?Array.from(par.children).filter(c=>c.classList&&c.classList.contains('rv')).indexOf(el):0;
    el.style.setProperty('--rd',Math.min(idx,5)*80+'ms');
    io.observe(el);
  });
  /* counters */
  const cio=new IntersectionObserver(es=>es.forEach(en=>{
    if(!en.isIntersecting)return;
    const el=en.target,target=+el.dataset.count;let cur=0;
    const inc=Math.max(1,Math.ceil(target/60));
    const t=setInterval(()=>{cur+=inc;if(cur>=target){cur=target;clearInterval(t);}
      el.textContent=cur.toLocaleString();},22);
    cio.unobserve(el);
  }),{threshold:.4});
  $$('[data-count]').forEach(el=>cio.observe(el));
  /* tap tick for buttons */
  document.addEventListener('click',e=>{
    if(e.target.closest('.btn,.fchip,.tile,.area-chip'))beep();
  },true);
  /* Esc closes modal */
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&$('#modal').classList.contains('show'))$('#modal').classList.remove('show');
  });
  /* boot loader: min 600ms after window load, plus safety timeout */
  const hide=()=>{const w=Math.max(0,600-(Date.now()-bootStart));setTimeout(hideBoot,w);};
  if(document.readyState==='complete')hide(); else addEventListener('load',hide);
  setTimeout(hideBoot,3200);
}
function hideBoot(){
  const b=$('#bootScreen'); if(!b) return;
  b.classList.add('hide');
  setTimeout(()=>b.remove(),800);
}
document.addEventListener('DOMContentLoaded',boot);
