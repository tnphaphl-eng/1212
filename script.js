const ids=['userName','userRole','userBio','userEmail','userPhone','userLocation','userWebsite'];const storageKey='profile-card-v2';let editing=false;let snapshot={};function getValues(){return Object.fromEntries(ids.map(id=>[id,document.getElementById(id).innerText.trim()]))}function setValues(data){ids.forEach(id=>{if(typeof data[id]==='string')document.getElementById(id).innerText=data[id]})}function setEditing(value){editing=value;document.body.classList.toggle('is-editing',editing);ids.forEach(id=>document.getElementById(id).contentEditable=String(editing));document.getElementById('toggleEditBtn').innerHTML=editing?'<i class="fa-solid fa-eye"></i> ดูตัวอย่าง':'<i class="fa-solid fa-pen-to-square"></i> แก้ไขโปรไฟล์'}function toggleEdit(){if(!editing){snapshot=getValues();setEditing(true)}else{setValues(snapshot);setEditing(false)}}function cancelEdit(){setValues(snapshot);setEditing(false)}function saveData(){const data=getValues();try{localStorage.setItem(storageKey,JSON.stringify(data));snapshot=data;setEditing(false);alert('บันทึกข้อมูลในเบราว์เซอร์เรียบร้อยแล้ว')}catch(e){alert('ไม่สามารถบันทึกข้อมูลได้: '+e.message)}}try{const saved=JSON.parse(localStorage.getItem(storageKey)||'null');if(saved&&typeof saved==='object')setValues(saved)}catch(e){console.warn('Could not read saved profile',e)}
/* Cute 3D neon cursor; touch preview appears just above the finger */
(function(){
 const desktop=matchMedia('(hover:hover) and (pointer:fine)').matches;
 const el=document.createElement('div');
 el.className='neon-cursor';el.setAttribute('aria-hidden','true');
 el.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 64">
 <defs>
 <linearGradient id="neonTip" x1="0%" y1="0%" x2="100%" y2="100%"><stop stop-color="#fff5ff"/><stop offset=".32" stop-color="#ffabf9"/><stop offset=".7" stop-color="#af8bff"/><stop offset="1" stop-color="#60eaff"/></linearGradient>
 <linearGradient id="neonEdge" x1="0%" y1="0%" x2="90%" y2="100%"><stop stop-color="#7c42ed"/><stop offset="1" stop-color="#178fc1"/></linearGradient>
 </defs>
 <path d="M5 4 7 45 18 35 28 57 39 51 28 32 46 32Z" transform="translate(2 2)" fill="#1a104b" opacity=".6"/>
 <path d="M5 4 7 45 18 35 28 57 39 51 28 32 46 32Z" fill="url(#neonEdge)" stroke="#89f2ff" stroke-width="2.5" stroke-linejoin="round"/>
 <path d="M5 4 7 40 19 30 29 49 34 46 24 27 40 28Z" fill="url(#neonTip)" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>
 <path d="M10 11 11 27 17 23" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>
 <path d="M41 6v8M37 10h8M46 19v5M43.5 21.5h5" stroke="#73f7ff" stroke-width="2" stroke-linecap="round"/>
 </svg>`;
 document.body.appendChild(el);
 function position(x,y,interactive){
   el.style.transform='translate3d('+x+'px,'+y+'px,0)';
   el.classList.add('visible');
   el.classList.toggle('interactive',!!interactive);
 }
 if(desktop){
   document.documentElement.classList.add('neon-ready');
   document.addEventListener('pointermove',e=>{
     if(e.pointerType==='touch')return;
     position(e.clientX,e.clientY,e.target.closest('button,a,input,[contenteditable="true"]'));
   },{passive:true});
   document.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch')el.classList.add('pressed')});
   document.addEventListener('pointerup',()=>el.classList.remove('pressed'));
   document.addEventListener('pointerout',e=>{if(!e.relatedTarget)el.classList.remove('visible')});
 } else {
   document.addEventListener('touchstart',e=>{const t=e.touches[0];if(t){position(t.clientX+12,t.clientY-60,false);el.classList.add('pressed')}},{passive:true});
   document.addEventListener('touchmove',e=>{const t=e.touches[0];if(t)position(t.clientX+12,t.clientY-60,false)},{passive:true});
   const hide=()=>{el.classList.remove('visible','pressed')};
   document.addEventListener('touchend',hide,{passive:true});
   document.addEventListener('touchcancel',hide,{passive:true});
 }
 window.addEventListener('blur',()=>el.classList.remove('visible'));
})();
