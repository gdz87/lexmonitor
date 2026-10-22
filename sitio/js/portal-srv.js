/* Portal del cliente con servidor (v19.9-portal): si el cliente ingresa con el código que le dio su abogado(a), los datos se leen del
   servidor de LexMonitor con una sesión corta (30 min). Nada de eso se guarda en este navegador salvo el token de sesión (sessionStorage).
   Los accesos de ejemplo siguen funcionando igual, con datos ficticios y su leyenda. */
(function(){
const C=window.SITIO_CONFIG||{}, Site=window.Site, E=Site.E, fmt=Site.fmt, fmtRad=Site.fmtRad; const K='lexportal.srv';
const PROXY=String(window.SITIO_PROXY||C.proxy||'').replace(/\/$/,'');
const ses=()=>{ try{ const s=JSON.parse(sessionStorage.getItem(K)||'null'); return s&&Date.parse(s.expira)>Date.now()?s:null; }catch(e){ return null; } };
const fin=()=>{ sessionStorage.removeItem(K); Site.srvDatos=null; document.body.classList.remove('srv-real'); };
Site.srvSesion=ses;
Site.srvLogin=async function(doc,codigo){ if(!PROXY) return {ok:false,msg:'Documento o código incorrectos, o acceso revocado.'};
  let r,j; try{ r=await fetch(PROXY+'/v1/portal/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({doc,codigo})}); j=await r.json(); }catch(e){ return {ok:false,msg:'No se pudo conectar con el servidor del portal. Intente más tarde.'}; }
  if(!r.ok) return {ok:false,msg:(j.error&&j.error.message)||'No se pudo ingresar.'};
  sessionStorage.setItem(K,JSON.stringify({sesion:j.sesion,expira:j.expira})); return {ok:true}; };
Site.srvDatosGet=async function(){ const s=ses(); if(!s) return null; const r=await fetch(PROXY+'/v1/portal/datos',{headers:{'X-Portal-Sesion':s.sesion}}); const j=await r.json(); if(!r.ok){ fin(); const e=new Error((j.error&&j.error.message)||'Sesión terminada'); e.sesion=true; throw e; } Site.srvDatos=j; return j; };
Site.srvLogout=async function(){ const s=ses(); fin(); if(s) try{ await fetch(PROXY+'/v1/portal/logout',{method:'POST',headers:{'X-Portal-Sesion':s.sesion}}); }catch(e){} location.hash='#/portal'; Site.route(); Site.toast('Sesión cerrada'); };
const audHtml=a=>'<div class="ficha aud-srv" style="margin-top:.6rem"><p class="lbl">Audiencia · '+E(a.estadoTxt||a.estado)+'</p><p><b>'+E(a.nombre)+'</b><br>'+fmt(a.fecha)+(a.hora?' · '+E(a.hora)+' (hora de Bogotá)':'')+(a.modalidad?' · '+E(a.modalidad):'')+'</p>'+(a.enlace?'<p><a class="ul" href="'+E(a.enlace)+'" target="_blank" rel="noopener">Enlace para conectarse</a></p>':'')+(a.explicacion?'<p>'+E(a.explicacion)+'</p>':'')+(a.debeAsistir?'<p><b>¿Debo asistir?</b> '+E({si:'Sí, debe asistir personalmente.',no:'No es necesario.',criterio:'Se lo confirmaremos.'}[a.debeAsistir]||a.debeAsistir)+'</p>':'')+((a.documentos||[]).length?'<p class="lbl">Documentos que debe llevar</p><ul>'+a.documentos.map(d=>'<li>'+E(d)+'</li>').join('')+'</ul>':'')+(a.resumen?'<p>'+E(a.resumen)+'</p>':'')+'</div>';
Site.srvPortal=function(el,args){ if(!ses()) return false; document.body.classList.add('srv-real'); const I=Site.I;
  el.innerHTML='<section class="pag"><div class="wrap"><p class="nota" id="srv-cargando">Cargando su información…</p></div></section>';
  Site.srvDatosGet().then(d=>{ const P=d.procesos||[];
    el.innerHTML='<section class="pag"><div class="wrap"><div class="cab-portal"><div><p class="kicker">Portal del cliente</p><h1 class="titular sm" id="srv-hola">Hola, '+E(d.cliente.nombre)+'</h1><p class="nota">Información publicada por '+E((d.firma&&(d.firma.abogado||d.firma.nombre))||'su abogado(a)')+(d.actualizado?' · actualizada el '+fmt(d.actualizado.slice(0,10)):'')+'. Su sesión se cierra sola a los 30 minutos.</p></div><div class="acciones-h"><button class="btn" id="srv-out">'+I('x')+'Cerrar sesión</button></div></div>'+
     (P.length?P.map(p=>'<article class="proc srv-proc"><p class="rad"><span>RADICADO</span>'+fmtRad(p.radicado)+'</p><span class="chip toga">'+E(p.estado)+'</span><h2 class="h2s">'+E(p.medio)+'</h2><p class="meta">'+E(p.despacho)+' · Etapa actual: <b>'+E(p.etapa)+'</b></p>'+(p.resumenCliente?'<p class="resumen">'+E(p.resumenCliente)+'</p>':'')+
       '<div class="dos"><div><p class="lbl">Próximas fechas</p>'+((p.evs||[]).length?p.evs.map(e=>'<p class="ev">'+I('calendar')+' <b>'+fmt(e.fecha)+(e.hora?' · '+E(e.hora):'')+'</b><br>'+E(e.titulo)+'</p>').join(''):'<p class="nota">No hay fechas próximas programadas.</p>')+'</div><div><p class="lbl">Línea de tiempo</p>'+((p.pubs||[]).length?'<div class="tl-s">'+p.pubs.slice().sort((a,b)=>a.fecha<b.fecha?1:-1).map(a=>'<div class="it"><span class="mono">'+fmt(a.fecha)+'</span><b>'+E(a.titulo)+'</b><p>'+E(a.resumen)+'</p></div>').join('')+'</div>':'<p class="nota">Aún no hay actuaciones publicadas.</p>')+'</div></div>'+
       (p.auds||[]).map(audHtml).join('')+'<p class="acciones-h"><a class="btn sm" href="'+E(C.portal||'../portal/index.html')+'?p='+encodeURIComponent(p.id)+'">'+I('external-link')+'Ver expediente</a></p></article>').join(''):'<div class="ficha"><p>Su abogado(a) aún no ha publicado procesos.</p></div>')+
     '<p class="nota">La información del portal es un resumen preparado por su abogado(a); no reemplaza las notificaciones oficiales del despacho judicial. Para escribirnos use <a class="ul" href="#/contacto">contacto</a>.</p></div></section>';
    el.querySelector('#srv-out').onclick=Site.srvLogout; }).catch(e=>{ Site.loginView(el); const er=el.querySelector('#l-err'); if(er) er.textContent=e.message; });
  return true; };
})();
