/* Zuvana site script (v3): language, navigation, calculator, FAQ, help search, waitlist form. */
/* ================= CONFIG — EDIT BEFORE LAUNCH =================
   FORM_ACTION: where waitlist signups POST.
   - Google Forms: "https://docs.google.com/forms/d/e/<FORM_ID>/formResponse"
       and set FIELD_* to the "entry.123456" names from the form's pre-filled link.
   - Formspree:    "https://formspree.io/f/<FORM_ID>" (keep FIELD_* as plain names).
   While FORM_ACTION contains "PLACEHOLDER", the form falls back to mailto:.        */
const FORM_ACTION   = "https://formsubmit.co/ajax/45e53a7cdea9976b220d7f2879195ad6"; // FormSubmit.co (free) alias for waitlist@zuvana.app
const FIELD_CONTACT = "contact";   // e.g. "entry.1111111111" for Google Forms
const FIELD_LANG    = "language";  // e.g. "entry.3333333333"
const MAILTO_FALLBACK = "hello@zuvana.app"; // must be a mailbox you can read
/* ============================================================== */
(function(){
"use strict";
const D={
 en:{ok:"Thanks! You're on the list. We'll text or email you when we open.",okm:"Your email app opened. Tap Send to join the list.",e1:"Please enter your phone or email.",e2:"Please check it: enter a valid email or a phone number with at least 10 digits.",e3:"Sorry, we couldn't send that. Please try again or email hello@zuvana.app.",cinv:"Enter an amount to see the planned total.",nores:"No matching questions. Try another word, or email hello@zuvana.app.",nresults:"{n} matching questions",menuo:"Open menu",menuc:"Close menu"},
 es:{ok:"¡Gracias! Ya estás en la lista. Te avisaremos por mensaje o correo cuando abramos.",okm:"Se abrió tu app de correo. Toca Enviar para unirte a la lista.",e1:"Escribe tu teléfono o correo.",e2:"Revisa: escribe un correo válido o un teléfono con al menos 10 dígitos.",e3:"No pudimos enviar tu registro. Inténtalo de nuevo o escríbenos a hello@zuvana.app.",cinv:"Escribe un monto para ver el total planeado.",nores:"No encontramos preguntas. Prueba otra palabra o escríbenos a hello@zuvana.app.",nresults:"{n} preguntas encontradas",menuo:"Abrir menú",menuc:"Cerrar menú"}
};
const T={en:Object.assign({},D.en),es:Object.assign({},D.es,window.TES||{})};
const ATTRS=["alt","placeholder","aria-label","title"];
document.querySelectorAll("[data-i]").forEach(e=>T.en[e.dataset.i]=e.textContent);
document.querySelectorAll("[data-h]").forEach(e=>T.en[e.dataset.h]=e.innerHTML);
ATTRS.forEach(a=>document.querySelectorAll("[data-t-"+a+"]").forEach(e=>T.en[e.getAttribute("data-t-"+a)]=e.getAttribute(a)));
T.en.__title=document.title;if(window.TES_TITLE)T.es.__title=window.TES_TITLE;
let lang="en";
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches,HAS_IO="IntersectionObserver" in window;
function setLang(l){if(!T[l])l="en";lang=l;const d=T[l],root=document.documentElement;root.lang=l;
 document.querySelectorAll("[data-i]").forEach(e=>{const v=d[e.dataset.i];if(v!=null)e.textContent=v});
 document.querySelectorAll("[data-h]").forEach(e=>{const v=d[e.dataset.h];if(v!=null)e.innerHTML=v});
 ATTRS.forEach(a=>document.querySelectorAll("[data-t-"+a+"]").forEach(e=>{const v=d[e.getAttribute("data-t-"+a)];if(v!=null)e.setAttribute(a,v)}));
 if(d.__title)document.title=d.__title;
 document.querySelectorAll("[data-k]").forEach(x=>{if(x.dataset.k)x.textContent=msg(x.dataset.k,x.dataset.n)});
 document.querySelectorAll(".lang-switch button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.set===l)));
 const bg=document.querySelector(".burger");if(bg)bg.setAttribute("aria-label",d[bg.getAttribute("aria-expanded")==="true"?"menuc":"menuo"]);
 try{localStorage.setItem("zl",l)}catch(e){}
 document.dispatchEvent(new CustomEvent("zlang",{detail:l}))}
function msg(k,n){let s=T[lang][k]||T.en[k]||"";return n!=null?s.replace("{n}",n):s}
window.zSetLang=setLang;
document.querySelectorAll(".lang-switch button").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.set)));
let saved=null;try{saved=localStorage.getItem("zl")}catch(e){}
setLang(saved||((navigator.language||"").toLowerCase().startsWith("es")?"es":"en"));

/* Header shadow on scroll */
const hd=document.querySelector(".site-header");
if(hd){const onS=()=>hd.classList.toggle("scrolled",scrollY>8);addEventListener("scroll",onS,{passive:true});onS()}

/* Mega menu (desktop) */
document.querySelectorAll(".has-mega").forEach(li=>{const b=li.querySelector(".menu-btn"),m=li.querySelector(".mega");let t,ho=0;
 const open=v=>{b.setAttribute("aria-expanded",String(v));m.classList.toggle("open",v)};
 b.addEventListener("click",e=>{e.stopPropagation();if(Date.now()-ho<600){open(true);return}open(b.getAttribute("aria-expanded")!=="true")});
 li.addEventListener("mouseenter",()=>{if(matchMedia("(hover:hover)").matches){clearTimeout(t);if(b.getAttribute("aria-expanded")!=="true")ho=Date.now();open(true)}});
 li.addEventListener("mouseleave",()=>{if(matchMedia("(hover:hover)").matches)t=setTimeout(()=>open(false),160)});
 li.addEventListener("keydown",e=>{if(e.key==="Escape"){open(false);b.focus()}});
 li.addEventListener("focusout",e=>{if(!li.contains(e.relatedTarget))open(false)});
 document.addEventListener("click",e=>{if(!li.contains(e.target))open(false)})});

/* Mobile drawer */
(function(){const bg=document.querySelector(".burger"),dr=document.getElementById("drawer"),sc=document.querySelector(".scrim");if(!bg||!dr)return;
 const cl=dr.querySelector(".drawer-close");let last=null;
 function set(v){bg.setAttribute("aria-expanded",String(v));bg.setAttribute("aria-label",msg(v?"menuc":"menuo"));dr.classList.toggle("open",v);sc.classList.toggle("open",v);document.body.classList.toggle("lock",v);dr.setAttribute("aria-hidden",String(!v));
  if(v){last=document.activeElement;setTimeout(()=>cl.focus(),RM?0:60)}else if(last){last.focus()}}
 bg.addEventListener("click",()=>set(true));cl.addEventListener("click",()=>set(false));sc.addEventListener("click",()=>set(false));
 dr.addEventListener("keydown",e=>{if(e.key==="Escape")set(false);
  if(e.key==="Tab"){const f=[...dr.querySelectorAll("a,button")].filter(x=>x.offsetParent!==null);if(!f.length)return;const a=f[0],z=f[f.length-1];
   if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
 dr.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>set(false)));
 addEventListener("resize",()=>{if(innerWidth>=1080&&dr.classList.contains("open"))set(false)})})();

/* Scroll-in reveal */
const rv=document.querySelectorAll(".reveal");
if(RM||!HAS_IO)rv.forEach(e=>e.classList.add("in"));
else{const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target)}}),{rootMargin:"0px 0px -6% 0px",threshold:.06});
 rv.forEach(e=>{const p=e.parentNode;if(p&&p.matches(".grid-3,.grid-4,.grid-2"))e.style.transitionDelay=([...p.children].indexOf(e)%4)*80+"ms";io.observe(e)})}

/* Animated chat preview */
document.querySelectorAll(".stage.anim").forEach(st=>{const q=s=>st.querySelector(s),bs=st.querySelectorAll(".bub");
 const all=()=>{bs.forEach(b=>b.classList.add("show"));st.querySelectorAll(".float").forEach(f=>f.classList.add("show"))};
 if(RM||!HAS_IO){all();return}
 const add=(s,c)=>{const x=typeof s==="string"?q(s):s;if(x)x.classList[c===false?"remove":"add"]("show")};
 const seq=[[300,()=>add(bs[0])],[850,()=>add(".ty1")],[1900,()=>{add(".ty1",false);add(bs[1])}],[2500,()=>add(".float-fee")],[3200,()=>add(bs[2])],[3700,()=>add(".ty2")],[4700,()=>{add(".ty2",false);add(bs[3])}],[5400,()=>add(".float-received")]];
 const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();seq.forEach(([t,f])=>setTimeout(f,t))}},{threshold:.3});io.observe(st)});

/* FAQ accordion */
document.querySelectorAll(".faq details").forEach(d=>{const s=d.querySelector("summary"),a=d.querySelector(".ans");if(!a)return;
 s.addEventListener("click",ev=>{if(RM||!a.animate)return;ev.preventDefault();
  if(d.open){const h=a.offsetHeight;const an=a.animate([{height:h+"px",opacity:1},{height:"0px",opacity:0}],{duration:240,easing:"cubic-bezier(.2,.7,.2,1)"});an.onfinish=()=>{d.open=false}}
  else{d.open=true;const h=a.offsetHeight;a.animate([{height:"0px",opacity:0},{height:h+"px",opacity:1}],{duration:280,easing:"cubic-bezier(.2,.7,.2,1)"})}})});

/* Planned-fee calculator: USD only, never an exchange rate or MXN amount */
document.querySelectorAll(".calc").forEach(c=>{const inp=c.querySelector(".amt");if(!inp)return;const FEE=1.99,fmt=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"});
 const os=c.querySelector(".o-send"),ot=c.querySelector(".o-total"),hint=c.querySelector(".calc-hint"),chips=c.querySelectorAll(".chip");
 function calc(){const raw=inp.value.replace(/[$,\s]/g,"");const v=parseFloat(raw);
  chips.forEach(ch=>ch.setAttribute("aria-pressed",String(ch.dataset.v===raw)));
  if(!/^\d+(\.\d{0,2})?$/.test(raw)||!(v>0)){os.textContent="—";ot.textContent="—";hint.dataset.k="cinv";hint.textContent=msg("cinv");return}
  hint.dataset.k="";hint.textContent="";os.textContent=fmt.format(v);ot.textContent=fmt.format(Math.round((v+FEE)*100)/100)}
 inp.addEventListener("input",calc);chips.forEach(ch=>ch.addEventListener("click",()=>{inp.value=ch.dataset.v;calc()}));calc()});

/* Open a FAQ item when the URL points to it (e.g. /help.html#countries) */
function openHash(){const id=decodeURIComponent(location.hash.slice(1));if(!id)return;const t=document.getElementById(id);if(t&&t.tagName==="DETAILS"){t.open=true;setTimeout(()=>t.scrollIntoView({block:"center"}),60)}}
openHash();addEventListener("hashchange",openHash);

/* Help center: client-side filter of questions */
(function(){const s=document.getElementById("hsearch");if(!s)return;const items=[...document.querySelectorAll(".faq-group details")],groups=[...document.querySelectorAll(".faq-group")],nr=document.getElementById("noresults"),cnt=document.getElementById("hcount");
 const norm=t=>t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
 function run(){const q=norm(s.value.trim());let n=0;
  items.forEach(d=>{const hit=!q||norm(d.textContent).includes(q);d.hidden=!hit;if(hit)n++;if(q&&hit&&q.length>2)d.open=true;if(!q)d.open=false});
  groups.forEach(g=>g.hidden=!g.querySelector("details:not([hidden])"));
  nr.style.display=n?"none":"block";nr.dataset.k=n?"":"nores";nr.textContent=n?"":msg("nores");
  if(q){cnt.dataset.k="nresults";cnt.dataset.n=n;cnt.textContent=msg("nresults",n)}else{cnt.dataset.k="";cnt.textContent=""}}
 s.addEventListener("input",run);document.querySelectorAll(".popular button").forEach(b=>b.addEventListener("click",()=>{s.value=b.textContent;run();s.focus()}));
 document.addEventListener("zlang",()=>{if(s.value)run()})})();

/* Waitlist links: scroll to the page's form and focus the field */
const form=document.getElementById("wl"),contactEl=document.getElementById("contact");
if(form){document.querySelectorAll('a[href="#wl"]').forEach(a=>a.addEventListener("click",ev=>{ev.preventDefault();form.scrollIntoView({behavior:RM?"auto":"smooth",block:"center"});setTimeout(()=>{if(!contactEl.disabled)contactEl.focus({preventScroll:true})},RM?0:450);history.replaceState(null,"","#wl")}));
 if(location.hash==="#wl")setTimeout(()=>{form.scrollIntoView({block:"center"});contactEl.focus({preventScroll:true})},120)}

/* Sticky mobile CTA */
(function(){const m=document.getElementById("mcta");if(!m||!form||!HAS_IO)return;const home=document.body.classList.contains("home");
 new IntersectionObserver(es=>{const e=es[0];const show=home?(!e.isIntersecting&&e.boundingClientRect.top<0):(!e.isIntersecting&&e.boundingClientRect.top>0&&scrollY>500);m.classList.toggle("show",show);m.setAttribute("aria-hidden",String(!show));m.tabIndex=show?0:-1}).observe(form);
 if(!home)addEventListener("scroll",()=>{const r=form.getBoundingClientRect();const show=scrollY>500&&r.top>innerHeight;m.classList.toggle("show",show);m.setAttribute("aria-hidden",String(!show));m.tabIndex=show?0:-1},{passive:true})})();

/* Referral tag: ?ref= (or utm_source) -> hidden "ref" field; kept for this visit across pages */
let REF="";try{const q=new URLSearchParams(location.search);REF=(q.get("ref")||q.get("utm_source")||"").trim().slice(0,40).replace(/[^\w.-]/g,"");
 if(REF)sessionStorage.setItem("zref",REF);else REF=sessionStorage.getItem("zref")||""}catch(e){}
if(!form)return;
document.getElementById("ref").value=REF;
const inp=form.contact,err=document.getElementById("err"),ok=document.getElementById("ok"),btn=form.querySelector(".cta-submit");
function bad(k){err.dataset.k=k;err.textContent=msg(k);inp.setAttribute("aria-invalid","true");inp.focus();return false}
inp.addEventListener("input",()=>{err.textContent="";err.dataset.k="";inp.setAttribute("aria-invalid","false")});
function valid(v){if(!v)return bad("e1");
 if(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))return true;
 if(/^[+\d\s().-]+$/.test(v)&&v.replace(/\D/g,"").length>=10)return true;return bad("e2")}
function done(k){ok.dataset.k=k;ok.textContent=msg(k);ok.style.display="block";btn.disabled=true;inp.disabled=true}
function mail(c){location.href="mailto:"+MAILTO_FALLBACK+"?subject="+encodeURIComponent("ZUVANA waitlist")+"&body="+encodeURIComponent("Contact: "+c+"\nLanguage: "+lang+"\nRef: "+(REF||"direct"));done("okm")}
form.addEventListener("submit",async ev=>{ev.preventDefault();btn.disabled=true;
 const c=inp.value.trim();
 if(form._honey.value){done("ok");return} // bot: fake success, send nothing
 if(!valid(c)){btn.disabled=false;return}
 if(FORM_ACTION.includes("PLACEHOLDER")){mail(c);return}
 const fd=new FormData();fd.append(FIELD_CONTACT,c);fd.append(FIELD_LANG,lang);fd.append("ref",REF||"direct");fd.append("_subject","New Zuvana waitlist signup");fd.append("_captcha","false");fd.append("_template","table");fd.append("_honey","");if(c.includes("@"))fd.append("_replyto",c);
 try{if(FORM_ACTION.includes("docs.google.com")){await fetch(FORM_ACTION,{method:"POST",mode:"no-cors",body:fd})}
  else{const r=await fetch(FORM_ACTION,{method:"POST",body:fd,headers:{Accept:"application/json"}});const j=await r.json().catch(()=>({}));if(!r.ok||String(j.success)==="false")throw 0}
  done("ok")}catch(e){err.dataset.k="e3";err.textContent=msg("e3");btn.disabled=false}});
})();
