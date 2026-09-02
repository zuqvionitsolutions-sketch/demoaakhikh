const header=document.querySelector('.site-header');
document.querySelectorAll('.brand').forEach(brand=>{if(!brand.querySelector('img')){const logo=document.createElement('img');logo.src='logo.jpg';logo.alt='AAKHIKH logo';logo.className='site-logo';brand.prepend(logo);brand.classList.add('brand-with-logo')}});
const primaryLinks=[['index.html','Home'],['about.html','About Us'],['team.html','Our Team'],['messages.html','Messages'],['events.html','Events'],['locations.html','Locations'],['donate.html','Donate'],['resources.html','Resources'],['contact.html','Contact']];
const currentPage=location.pathname.split('/').pop()||'index.html';
const navigationMarkup=primaryLinks.map(([href,label])=>`<a href="${href}"${href===currentPage?' class="active" aria-current="page"':''}>${label}</a>`).join('');
document.querySelectorAll('.desktop-nav').forEach(nav=>nav.innerHTML=navigationMarkup);
document.querySelectorAll('.mobile-menu').forEach(menu=>{menu.querySelectorAll('a:not(.button)').forEach(link=>link.remove());menu.querySelector('.close-menu')?.insertAdjacentHTML('afterend',navigationMarkup)});
const logoStyle=document.createElement('style');logoStyle.textContent='.brand-with-logo{padding-left:46px}.brand-with-logo .site-logo{position:absolute;left:0;top:50%;transform:translateY(-57%);width:37px;height:37px;object-fit:contain;border-radius:50%}';document.head.appendChild(logoStyle);
addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>20));
const menu=document.querySelector('.menu-button'),mobile=document.querySelector('.mobile-menu');
menu?.addEventListener('click',()=>{mobile.classList.add('open');mobile.setAttribute('aria-hidden','false');menu.setAttribute('aria-expanded','true')});
document.querySelector('.close-menu')?.addEventListener('click',closeMenu);document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',closeMenu));
function closeMenu(){mobile.classList.remove('open');mobile.setAttribute('aria-hidden','true');menu.setAttribute('aria-expanded','false')}
const places={guwahati:{title:'AAKHIKH: The House of Blessings',address:'Bhuyan Mansion, 3rd Floor<br>Near UCO Bank, Guwahati Club<br>Guwahati, Assam, India',time:'Sunday Assamese Service · 9:00 AM<br>Sunday English Service · 12:00 PM<br>Rhema Bible Study · 1st &amp; 3rd Thursday, 7:00 PM<br>Care Groups · 2nd &amp; 4th Thursday, 7:00 PM<br>Prayer &amp; Fasting · Saturday, 9:00 AM',map:'GUWAHATI, ASSAM',url:'https://www.google.com/maps/search/?api=1&query=Bhuyan+Mansion+Guwahati'},shillong:{title:'AAKHIKH – Shillong',address:'Alabaster Prayer Room<br>HV7X+5C7, Motinagar, Nongthymmai<br>Shillong, Meghalaya 793014, India',time:'Sunday English Service · 12:00 PM<br>At His Table Bible Study · Thursday, 6:00 PM<br>Prayer &amp; Fasting · Saturday, 9:00 AM',map:'SHILLONG, MEGHALAYA',url:'https://maps.app.goo.gl/WADtnnQnJ7XeVzfE7?g_st=aw'}};
document.querySelectorAll('[data-location]').forEach(btn=>btn.addEventListener('click',()=>{const p=places[btn.dataset.location];document.querySelectorAll('[data-location]').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-selected',String(b===btn))});document.querySelector('#location-title').textContent=p.title;document.querySelector('#location-address').innerHTML=p.address;document.querySelector('#location-time').innerHTML=p.time;document.querySelector('.map-panel p').textContent=p.map;document.querySelector('#directions').href=p.url}));
document.querySelectorAll('.amounts button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.amounts button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');if(btn.textContent!=='Custom')document.querySelector('.amount-input input').value=btn.textContent.replace(/[^0-9]/g,'')}));
document.querySelectorAll('.give-toggle button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.give-toggle button').forEach(b=>b.classList.toggle('active',b===btn))}));
document.querySelectorAll('form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const message=form.querySelector('.form-message');if(!form.checkValidity()){message.textContent='Please complete the required fields with a valid email address.';message.style.color='#b85656';form.reportValidity();return}if(form.dataset.whatsapp){const data=new FormData(form);const text=[`Hello AAKHIKH,`,``,`Name: ${data.get('name')}`,`Email: ${data.get('email')}`,`Phone: ${data.get('phone')||'Not provided'}`,`Location: ${data.get('location')||'Not provided'}`,``,`Message:`,` ${data.get('message')}`].join('\n');message.style.color='#558260';message.textContent='Opening WhatsApp…';window.open(`https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(text)}`,'_blank','noopener,noreferrer');return}message.style.color='#558260';message.textContent=form.classList.contains('newsletter-form')?'Thank you — you’re on the list.':'Thank you for reaching out. We’ll be in touch soon.';form.reset()}));

// Give every standalone page its own rich visual identity while keeping the home page minimal.
if(!location.pathname.toLowerCase().endsWith('index.html')&&!location.pathname.endsWith('/')){
  const file=location.pathname.split('/').pop();
  const images={
    'about.html':'2.webp','messages.html':'6.webp','events.html':'7.jpg',
    'locations.html':'1 (1.webp)','giving.html':'5.webp','resources.html':'3.jpg',
    'contact.html':'2.webp','online.html':'6.webp'
  };
  const image=images[file]||'1 (1.webp)';
  const style=document.createElement('style');
  style.textContent=`
    body{background:#faf7f1}.page.dark{position:relative;isolation:isolate;min-height:54vh;display:flex;flex-direction:column;justify-content:center;background:linear-gradient(95deg,rgba(5,17,34,.91),rgba(5,17,34,.44)),url("${image}") center/cover!important;overflow:hidden}.page.dark:after{content:"";position:absolute;inset:auto -10% -38% 44%;height:90%;background:radial-gradient(circle,rgba(200,155,83,.24),transparent 65%);z-index:-1}.page.dark>*{position:relative;z-index:1}.page.dark h1{max-width:800px;letter-spacing:-2.5px}.page.dark p:not(.eyebrow){font-size:17px;max-width:570px}.page.dark em{color:#e7c57f}.page:not(.dark){background:linear-gradient(180deg,#fffdf9,#f2ede5)}.page+section.section{padding-top:95px}.message-card,.feature-grid article{border:1px solid rgba(200,155,83,.16)}.message-card{background:#fff;padding-bottom:12px}.message-card h3,.message-card>p{padding-left:17px;padding-right:17px}.message-card .meta{padding-left:17px}.event-feature{box-shadow:0 22px 50px rgba(8,22,41,.12)}.location-view{box-shadow:0 22px 50px rgba(8,22,41,.1)}.giving{background:linear-gradient(130deg,#e9dfcd,#f7f2e9)}.contact.section{box-shadow:inset 0 1px rgba(255,255,255,.1)}@media(max-width:700px){.page.dark{min-height:48vh}.page.dark h1{font-size:clamp(43px,14vw,64px)}.page.dark p:not(.eyebrow){font-size:14px}.page+section.section{padding-top:65px}}
  `;
  document.head.appendChild(style);
}

if(location.pathname.toLowerCase().endsWith('giving.html')){
  const givingStyle=document.createElement('style');
  givingStyle.textContent='.page.dark{display:none!important}.giving.section{padding-top:145px;min-height:100vh}@media(max-width:700px){.giving.section{padding-top:110px}}';
  document.head.appendChild(givingStyle);
}
