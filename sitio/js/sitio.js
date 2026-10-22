/* Sitio web de la abogada + entrada al Portal del cliente (vanilla JS, datos ficticios). Datos compartidos vía LexShared. */
(function(){
const C=window.SITIO_CONFIG, SH=window.LexShared, $=s=>document.querySelector(s);
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const I=(n,c)=>'<svg class="ico'+(c?' '+c:'')+'" aria-hidden="true"><use href="#i-'+n+'"/></svg>';
const MES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const DIAS=['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const fmt=s=>{ if(!s) return '—'; const [y,m,d]=s.slice(0,10).split('-').map(Number); return d+' de '+MES[m-1]+' de '+y; };
const fmtRad=r=>{ r=String(r||'').replace(/\D/g,''); return r.length===23?[r.slice(0,5),r.slice(5,7),r.slice(7,9),r.slice(9,12),r.slice(12,16),r.slice(16,21),r.slice(21)].join('-'):r; };
const toast=m=>{ const d=document.createElement('div'); d.className='toast'; d.textContent=m; $('#toasts').appendChild(d); setTimeout(()=>d.remove(),3500); };
const Site=window.Site={E,fmt,fmtRad,toast};
const SKEY='lexportal.session';
Site.session=()=>{ try{ const id=sessionStorage.getItem(SKEY); if(!id) return null; const d=SH.load(); if(!d.accesos.some(a=>a.clienteId===id&&a.activo)) return null; return d.clientes.find(c=>c.id===id)||null; }catch(e){ return null; } };
Site.logout=()=>{ sessionStorage.removeItem(SKEY); location.hash='#/portal'; route(); toast('Sesión cerrada'); };
const V={};
const VALIDAR='<span class="validar" title="Texto base: debe validarlo la abogada">validar con la abogada</span>';
const SEC=(n,t,act)=>'<div class="sec-h"><span class="n">'+n+'</span><h2>'+t+'</h2>'+(act?'<span class="act">'+act+'</span>':'')+'</div>';
const SERV=[['scale','Nulidad y restablecimiento del derecho','Cuando una decisión de una entidad pública (un acto administrativo) lo perjudica: sanciones, multas, retiros del servicio, liquidaciones de pensión, impuestos. Se pide anular el acto y restablecer el derecho.','4 meses'],
 ['alert-triangle','Reparación directa','Cuando el Estado causa un daño por una acción, una omisión, una obra o una operación administrativa (por ejemplo, accidentes en vías, fallas del servicio). Se pide la indemnización.','2 años'],
 ['file-text','Controversias contractuales','Conflictos en contratos con entidades públicas: desequilibrio económico, liquidación, multas, incumplimientos.',''],
 ['shield-check','Acción de tutela','Protección rápida de derechos fundamentales (salud, debido proceso, petición, entre otros) cuando no hay otro medio eficaz.',''],
 ['mail','Derecho de petición','Redacción y seguimiento de peticiones ante entidades públicas y privadas, y acciones cuando no responden a tiempo.',''],
 ['briefcase','Asesoría a entidades','Acompañamiento a entidades territoriales y públicas: actos administrativos, contratación y defensa judicial.','']];
const slug=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z]+/g,'-').replace(/^-|-$/g,'');
const PORTAL_CTA=()=>'<a class="btn prim" href="#/portal">'+I('briefcase')+'Portal del cliente</a>';
V.inicio=el=>{ el.innerHTML=
 '<section class="portada"><div class="wrap"><p class="kicker">'+E(C.lema)+' · '+E(C.ciudad)+'</p>'+
 '<h1 class="titular">Defendemos sus derechos frente a las <em>decisiones del Estado</em></h1>'+
 '<p class="bajada">Asesoría y representación en procesos contencioso administrativos, tutelas y derechos de petición. Consulte el estado de su proceso en línea, en lenguaje claro.</p>'+
 '<div class="acciones-h"><a class="btn prim" href="#/contacto">'+I('calendar')+'Agendar una consulta</a><a class="btn" href="#/portal">'+I('briefcase')+'Portal del cliente</a></div>'+
 '<p class="rad"><span>ABOGADA</span>'+E(C.abogado)+' · '+E(C.tarjeta)+'</p>'+
 '<svg class="sello" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="64" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="70" cy="70" r="52" fill="none" stroke="currentColor" stroke-width=".8"/><defs><path id="circ" d="M70 70m-58 0a58 58 0 1 1 116 0a58 58 0 1 1-116 0"/></defs><text><textPath href="#circ">DERECHO ADMINISTRATIVO · CIUDAD EJEMPLO ·</textPath></text><text class="c" x="70" y="78" text-anchor="middle">A·E·F</text></svg>'+
 '</div></section>'+
 '<section><div class="wrap">'+SEC('01','Servicios','<a class="ul" href="#/servicios">Ver todos '+I('chevron-right')+'</a>')+'<ol class="indice">'+SERV.map((s,i)=>'<li><a href="#/servicios/'+slug(s[1])+'"><span class="num">'+String(i+1).padStart(2,'0')+'</span><span class="t"><b>'+s[1]+'</b><small>'+s[2].split('.')[0]+'.</small></span>'+(s[3]?'<span class="plazo mono">plazo: '+s[3]+'</span>':'<span></span>')+I('chevron-right','fl')+'</a></li>').join('')+'</ol></div></section>'+
 '<section class="banda"><div class="wrap">'+SEC('02','Cómo trabajamos con usted')+'<div class="tres">'+
 '<article><span class="big">i.</span><h3>Su proceso, claro</h3><p>En el portal ve el estado de su proceso, las actuaciones explicadas en palabras sencillas y las próximas fechas.</p><a class="ul" href="#/portal">Entrar al portal</a></article>'+
 '<article><span class="big">ii.</span><h3>Asistente virtual</h3><p>Resuelve dudas frecuentes. Si no sabe la respuesta, deja su solicitud a la abogada.</p><button type="button" class="ul" data-chat>Abrir el asistente</button></article>'+
 '<article><span class="big">iii.</span><h3>Envíe documentos</h3><p>Adjunte desde el portal los documentos que le pidamos, sin desplazarse.</p><a class="ul" href="#/faq">Cómo enviarlos</a></article></div></div></section>'+
 '<section><div class="wrap aviso-plazo"><p class="lbl">Ojo con los plazos</p><p class="cita">Muchas acciones tienen un plazo máximo para presentarse. Consúltenos cuanto antes.</p><a class="btn" href="#/contacto">'+I('send')+'Consultar mi caso</a></div></section>';
};
V.servicios=(el,args)=>{ el.innerHTML='<section class="pag"><div class="wrap"><p class="kicker">Áreas de práctica</p><h1 class="titular sm">Servicios</h1><p class="bajada">Información general sobre las áreas de práctica. Cada caso requiere un análisis particular.</p>'+
 '<div class="serv">'+SERV.map((s,i)=>'<article class="srv" id="'+slug(s[1])+'"><span class="num">'+String(i+1).padStart(2,'0')+'</span><div><h2>'+I(s[0])+s[1]+'</h2><p>'+s[2]+'</p>'+(s[3]?'<p class="mono plazo">Caducidad general: '+s[3]+' (art. 164 CPACA)</p>':'')+'<a class="ul" href="#/contacto/'+i+'">Consultar sobre este tema '+I('chevron-right')+'</a></div></article>').join('')+'</div>'+
 '<div class="nota-caja"><b>Ojo con los plazos.</b> Muchas acciones tienen un plazo máximo para presentarse (caducidad). Por ejemplo, la ley fija 4 meses para la nulidad y restablecimiento del derecho y 2 años para la reparación directa (art. 164 del CPACA), con reglas especiales de conteo. Consúltenos cuanto antes.</div>'+
 '<p class="acciones-h"><a class="btn prim" href="#/contacto">'+I('send')+'Consultar mi caso</a>'+PORTAL_CTA().replace('btn prim','btn')+'</p></div></section>';
 if(args[0]){ const t=document.getElementById(args[0]); if(t){ Site._keepScroll=true; setTimeout(()=>{ t.scrollIntoView({block:'start'}); t.classList.add('foco'); },30); } }
};
V.firma=el=>{ el.innerHTML='<section class="pag"><div class="wrap"><p class="kicker">La abogada</p><h1 class="titular sm">Sobre el despacho</h1>'+
 '<div class="abog"><div class="retrato" aria-hidden="true">A</div><div><h2 class="h2s">'+E(C.abogado)+'</h2><p class="mono plazo">'+E(C.tarjeta)+' · '+E(C.lema)+'</p>'+
 '<p>Somos un despacho dedicado al '+E(C.lema.toLowerCase())+', con atención cercana y comunicación clara con cada cliente.</p><p class="placeholder">[Describa aquí la historia del despacho, su enfoque y sus valores.]</p><p class="placeholder">[Formación académica, experiencia, publicaciones.]</p>'+
 '<p class="acciones-h"><a class="btn prim" href="#/contacto">'+I('calendar')+'Agendar una consulta</a><a class="btn" href="#/servicios">Ver servicios</a></p></div></div>'+
 '<p class="nota">Texto de ejemplo: reemplácelo con la trayectoria real en <span class="mono">sitio/js/config.js</span> y en esta sección.</p></div></section>'; };
const FAQ=[['¿Qué es la caducidad?','Es el plazo máximo que da la ley para presentar una demanda. Si se vence, ya no se puede demandar. Para la nulidad y restablecimiento del derecho la regla general es de 4 meses y para la reparación directa de 2 años (art. 164 CPACA), contados según reglas específicas. Hay situaciones que suspenden el plazo, por eso conviene consultar pronto.'],
 ['¿Cuánto se demora un proceso?','Depende del tipo de proceso, del despacho y de su carga de trabajo. Un proceso contencioso administrativo puede tardar varios años en total. No es posible garantizar tiempos; le contaremos cada avance en el portal.'],
 ['¿Qué significa que el proceso está «al despacho»?','Que el expediente está en manos del juez o magistrado para que tome una decisión (por ejemplo, un auto o la sentencia). Normalmente no requiere nada de su parte.'],
 ['¿Cómo envío documentos?','Si es cliente, ingrese al portal y use «Nueva solicitud» para adjuntar archivos. Si aún no es cliente, use el formulario de contacto y le indicaremos cómo enviarlos.'],
 ['¿Cuánto cuesta una consulta?','Depende del asunto. Escríbanos por el formulario de contacto y le informaremos las condiciones. <span class="validar">definir con la abogada</span>'],
 ['¿El asistente virtual me da asesoría?','No. El asistente brinda información general. La asesoría jurídica la da la abogada después de revisar su caso.']];
V.faq=el=>{ el.innerHTML='<section class="pag"><div class="wrap estrecho"><p class="kicker">Glosario y dudas</p><h1 class="titular sm">Preguntas frecuentes</h1>'+FAQ.map((f,i)=>'<details'+(i===0?' open':'')+'><summary><span class="num">'+String(i+1).padStart(2,'0')+'</span>'+f[0]+'</summary><p>'+f[1]+'</p></details>').join('')+'<p class="nota">Información general, no constituye asesoría jurídica.</p><p class="acciones-h"><button type="button" class="btn" data-chat>'+I('message-circle')+'Preguntarle al asistente</button><a class="btn prim" href="#/contacto">'+I('send')+'Escribirnos</a></p></div></section>'; };
V.datos=el=>{ el.innerHTML='<section class="pag"><div class="wrap estrecho"><p class="kicker">Ley 1581 de 2012</p><h1 class="titular sm">Política de tratamiento de datos personales</h1><p>'+VALIDAR+' Texto base redactado con referencia a la Ley 1581 de 2012. Debe ser revisado y ajustado por la abogada antes de publicarse.</p><div class="legal">'+
 '<h3>1. Responsable</h3><p>'+E(C.abogado)+', '+E(C.direccion)+', '+E(C.ciudad)+', correo '+E(C.email)+', teléfono '+E(C.telefono)+'.</p>'+
 '<h3>2. Finalidades</h3><p>Atender consultas y solicitudes; prestar los servicios jurídicos contratados; informar al cliente sobre el estado de sus procesos; cumplir obligaciones legales y contractuales.</p>'+
 '<h3>3. Derechos del titular</h3><p>Conocer, actualizar y rectificar sus datos; solicitar prueba de la autorización; ser informado del uso de sus datos; presentar quejas ante la Superintendencia de Industria y Comercio; revocar la autorización o pedir la supresión cuando proceda; y acceder gratuitamente a sus datos.</p>'+
 '<h3>4. Datos sensibles</h3><p>No está obligado a suministrar datos sensibles (por ejemplo, de salud). Si los entrega para su caso, se usarán solo para esa finalidad.</p>'+
 '<h3>5. Secreto profesional</h3><p>La información de los clientes está amparada por el secreto profesional del abogado.</p>'+
 '<h3>6. Canales para consultas y reclamos</h3><p>Correo '+E(C.email)+'. Los plazos de respuesta serán los previstos en la ley '+VALIDAR+'.</p>'+
 '<h3>7. Vigencia</h3><p>Desde su publicación. '+VALIDAR+'</p></div><p class="nota">En este sitio de ejemplo los datos se guardan solo en este navegador.</p><p><a class="btn" href="#/contacto">'+I('arrow-left')+'Volver a contacto</a></p></div></section>'; };
const AUT='<label class="check"><input type="checkbox" id="aut" required> <span>Autorizo el tratamiento de mis datos personales conforme a la <a href="#/datos" target="_blank">Política de tratamiento de datos</a> (Ley 1581 de 2012). <b>Obligatorio.</b></span></label>';
V.contacto=(el,args)=>{ const pre=sessionStorage.getItem('lexportal.prefill')||''; sessionStorage.removeItem('lexportal.prefill'); const sel=args[0]!=null?+args[0]:-1;
 el.innerHTML='<section class="pag"><div class="wrap cuerpo"><div><p class="kicker">Contacto</p><h1 class="titular sm">Cuéntenos su caso</h1><p class="bajada">Su mensaje llega a la bandeja de solicitudes de la abogada.</p>'+
 '<form class="form" id="cf" novalidate><label for="c-n">Nombre completo</label><input id="c-n" autocomplete="name" required><div class="dos"><div><label for="c-e">Correo</label><input id="c-e" type="email" autocomplete="email" required></div><div><label for="c-t">Teléfono</label><input id="c-t" type="tel" autocomplete="tel"></div></div><label for="c-a">Asunto</label><select id="c-a"><option>Consulta sobre un caso nuevo</option>'+SERV.map((s,i)=>'<option'+(i===sel?' selected':'')+'>'+s[1]+'</option>').join('')+'<option>Otro</option></select><label for="c-m">Mensaje</label><textarea id="c-m" rows="5" required placeholder="Describa brevemente su situación (evite incluir datos sensibles innecesarios)">'+E(pre)+'</textarea>'+AUT+'<p class="err" id="c-err" aria-live="polite"></p><button class="btn prim">'+I('send')+'Enviar solicitud</button></form></div>'+
 '<aside class="aside"><div class="ficha"><p class="lbl">Despacho</p><p><b>'+E(C.abogado)+'</b><br><span class="mono">'+E(C.tarjeta)+'</span></p><p>'+I('map-pin')+' '+E(C.direccion)+', '+E(C.ciudad)+'</p><p>'+I('phone')+' <a href="tel:3000000000">'+E(C.telefono)+'</a></p><p>'+I('mail')+' <a href="mailto:'+E(C.email)+'">'+E(C.email)+'</a></p><p>'+I('clock')+' '+E(C.horario)+'</p></div><div class="ficha"><p class="lbl">¿Ya es cliente?</p><p>Use el portal para ver su proceso y escribirnos.</p>'+PORTAL_CTA()+'</div></aside></div></section>';
 el.querySelector('#cf').onsubmit=e=>{ e.preventDefault(); const g=id=>el.querySelector(id).value.trim(), err=el.querySelector('#c-err');
  if(!g('#c-n')||!g('#c-m')) return err.textContent='Escriba su nombre y el mensaje.'; if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(g('#c-e'))) return err.textContent='Escriba un correo válido.';
  if(!el.querySelector('#aut').checked) return err.textContent='Debe autorizar el tratamiento de datos para enviar la solicitud.';
  const s=SH.addSolicitud({origen:'contacto',nombre:g('#c-n'),email:g('#c-e'),tel:g('#c-t'),asunto:g('#c-a'),mensaje:g('#c-m'),autorizacionDatos:true});
  el.querySelector('#cf').innerHTML='<h2 class="h2s">'+I('check','u-toga')+' Solicitud enviada</h2><p>Número de radicado interno: <b class="mono">'+E(s.id.toUpperCase())+'</b>. La abogada la revisará y le responderá por correo o teléfono.</p><p class="nota">La solicitud se guardó en este navegador y aparece en LexMonitor › Solicitudes del portal.</p><a class="btn" href="#/inicio">'+I('arrow-left')+'Volver al inicio</a>'; toast('Solicitud enviada'); };
};
/* ---------- PORTAL: entrada + inicio de sesión ---------- */
V.portal=(el,args)=>{ if(Site.srvPortal&&Site.srvPortal(el,args)) return; const cli=Site.session(); if(!cli) return loginView(el); portalView(el,cli,args[0]); };
Site.loginView=el=>loginView(el); Site.I=I; Site.route=()=>route();
function loginView(el){ const d=SH.load();
 el.innerHTML='<section class="pag"><div class="wrap cuerpo"><div><p class="kicker">Portal del cliente</p><h1 class="titular sm">Su expediente, <em>en lenguaje claro</em></h1>'+
 '<form class="form" id="lf" novalidate><p>Ingrese con su documento y el código de acceso que le entregó su abogada.</p><label for="l-doc">Cédula o NIT</label><input id="l-doc" inputmode="numeric" autocomplete="username" placeholder="Ej.: 00000002"><label for="l-cod">Código de acceso</label><input id="l-cod" autocomplete="current-password" placeholder="Ej.: EJEM-4821" style="text-transform:uppercase"><p class="err" id="l-err" aria-live="polite"></p><button class="btn prim ancho">'+I('chevron-right')+'Ingresar</button><p class="nota">¿No tiene código? Pídalo a su abogada o escríbanos por <a href="#/contacto">contacto</a>.</p></form></div>'+
 '<aside class="aside"><div class="ficha"><p class="lbl">Ver el expediente de ejemplo</p><p>Abra directamente el portal del cliente con un proceso ficticio.</p><a class="btn prim ancho" id="abrirPortal" href="'+E(C.portal)+'">'+I('book-open')+'Abrir el portal del cliente</a></div>'+
 '<div class="ficha cred" role="note" aria-label="Accesos de prueba"><p class="lbl">Accesos de prueba (ficticios)</p><table><tbody>'+
 SH.EJEMPLO_ACCESS.map(a=>{ const c=d.clientes.find(x=>x.id===a.clienteId); const live=d.accesos.find(x=>x.clienteId===a.clienteId&&x.activo); const code=live?live.codigo:a.codigo; return '<tr><td>'+E(c?c.nombre:a.clienteId)+'<br><span class="mono">'+E(a.doc)+' · '+E(code)+'</span>'+(!live?' <span class="chip lacre">revocado</span>':'')+'</td><td><button type="button" class="btn sm" data-fill="'+E(a.docNorm)+'|'+E(code)+'">Usar</button></td></tr>'; }).join('')+
 '</tbody></table><p class="nota">Los códigos generados en LexMonitor › Clientes › «Generar acceso al portal» también funcionan aquí.</p></div></aside></div></section>';
 el.querySelectorAll('[data-fill]').forEach(b=>b.onclick=()=>{ const [dd,cc]=b.dataset.fill.split('|'); el.querySelector('#l-doc').value=dd; el.querySelector('#l-cod').value=cc; el.querySelector('#l-cod').focus(); });
 el.querySelector('#lf').onsubmit=async e=>{ e.preventDefault(); const c=SH.login(el.querySelector('#l-doc').value,el.querySelector('#l-cod').value); if(!c&&Site.srvLogin){ const r=await Site.srvLogin(el.querySelector('#l-doc').value,el.querySelector('#l-cod').value); if(r.ok){ toast('Bienvenido(a)'); route(); return; } el.querySelector('#l-err').textContent=r.msg; return; } if(!c){ el.querySelector('#l-err').textContent='Documento o código incorrectos, o acceso revocado.'; return; } sessionStorage.setItem(SKEY,c.id); toast('Bienvenido(a)'); route(); };
}
Site.clientData=cli=>{ const d=SH.load(); const hoy=new Date(); const h=hoy.getFullYear()+'-'+String(hoy.getMonth()+1).padStart(2,'0')+'-'+String(hoy.getDate()).padStart(2,'0');
 const procs=d.procesos.filter(p=>p.clienteId===cli.id).map(p=>Object.assign({},p,{pubs:d.publicaciones.filter(x=>x.procesoId===p.id).sort((a,b)=>a.fecha<b.fecha?1:-1),evs:d.eventos.filter(x=>x.procesoId===p.id&&x.fecha>=h).sort((a,b)=>a.fecha<b.fecha?-1:1)}));
 return {d,procs,sols:d.solicitudes.filter(s=>s.clienteId===cli.id)}; };
function portalView(el,cli,tab){ const {procs,sols}=Site.clientData(cli); tab=tab||'procesos'; const nResp=sols.filter(s=>s.estado==='respondida'&&!s.leidaCliente).length;
 const T=(k,ic,t)=>'<a role="tab" aria-selected="'+(tab===k)+'" class="tab'+(tab===k?' on':'')+'" href="#/portal/'+k+'">'+I(ic)+t+'</a>';
 el.innerHTML='<section class="pag"><div class="wrap"><div class="cab-portal"><div><p class="kicker">Portal del cliente</p><h1 class="titular sm">Hola, '+E(cli.nombre)+'</h1></div><div class="acciones-h"><a class="btn prim" id="abrirExp" href="'+E(C.portal)+'">'+I('book-open')+'Abrir mi expediente</a><button class="btn" id="out">'+I('x')+'Cerrar sesión</button></div></div>'+
 '<div class="tabs" role="tablist">'+T('procesos','list','Mis procesos ('+procs.length+')')+T('solicitudes','mail','Mis solicitudes ('+sols.length+')'+(nResp?' <span class="chip toga">'+nResp+' nueva</span>':''))+T('nueva','plus','Nueva solicitud')+'</div><div id="pt"></div>'+
 '<p class="nota">La información del portal es un resumen preparado por su abogada; no reemplaza las notificaciones oficiales del despacho judicial.</p></div></section>';
 el.querySelector('#out').onclick=Site.logout; const pt=el.querySelector('#pt');
 if(tab==='procesos'){ pt.innerHTML=procs.length?procs.map(p=>'<article class="proc"><p class="rad"><span>RADICADO</span>'+fmtRad(p.radicado)+'</p><span class="chip toga">'+E(p.estado)+'</span><h2 class="h2s">'+E(p.medio)+'</h2><p class="meta">'+E(p.despacho)+' · Etapa actual: <b>'+E(p.etapa)+'</b></p>'+(p.resumenCliente?'<p class="resumen">'+E(p.resumenCliente)+'</p>':'')+
   '<div class="dos"><div><p class="lbl">Próximas fechas</p>'+(p.evs.length?p.evs.map(e=>'<p class="ev">'+I('calendar')+' <b>'+fmt(e.fecha)+(e.hora?' · '+E(e.hora):'')+'</b><br>'+E(e.titulo)+'</p>').join(''):'<p class="nota">No hay fechas próximas programadas.</p>')+'</div><div><p class="lbl">Línea de tiempo</p>'+(p.pubs.length?'<div class="tl-s">'+p.pubs.map(a=>'<div class="it"><span class="mono">'+fmt(a.fecha)+'</span><b>'+E(a.titulo)+'</b><p>'+E(a.resumen)+'</p></div>').join('')+'</div>':'<p class="nota">Aún no hay actuaciones publicadas.</p>')+'</div></div><p class="acciones-h"><a class="btn sm" href="#/portal/nueva/'+p.id+'">'+I('mail')+'Preguntar sobre este proceso</a><a class="btn sm" href="'+E(C.portal)+'">'+I('external-link')+'Ver expediente completo</a></p></article>').join(''):'<div class="ficha"><p>Su abogada aún no ha publicado procesos en el portal.</p></div>'; }
 if(tab==='solicitudes'){ pt.innerHTML=(sols.map(s=>'<article class="proc"><div class="fila"><b>'+E(s.asunto)+'</b><span class="chip '+({nueva:'lacre',en_tramite:'ocre',respondida:'toga'})[s.estado]+'">'+({nueva:'Recibida',en_tramite:'En trámite',respondida:'Respondida'})[s.estado]+'</span></div><p class="mono meta">'+E(s.fecha.replace('T',' '))+'</p><p style="white-space:pre-wrap">'+E(s.mensaje)+'</p>'+(s.adjuntos&&s.adjuntos.length?'<p class="meta">'+I('file-text')+' '+s.adjuntos.map(a=>E(a.nombre)).join(', ')+'</p>':'')+(s.respuesta&&s.estado==='respondida'?'<div class="resp"><p class="lbl">Respuesta de su abogada'+(s.respondidaEn?' · '+E(s.respondidaEn.replace('T',' ')):'')+'</p><p style="white-space:pre-wrap;margin:0">'+E(s.respuesta)+'</p></div>':'<p class="nota">Pendiente de respuesta.</p>')+'</article>').join('')||'<p>No ha enviado solicitudes.</p>');
   if(nResp) SH.update(d=>d.solicitudes.forEach(s=>{ if(s.clienteId===cli.id&&s.estado==='respondida') s.leidaCliente=true; })); }
 if(tab==='nueva'){ const pid=location.hash.split('/')[3]||'';
   pt.innerHTML='<form class="form" id="nf" novalidate><h2 class="h2s">Nueva consulta o solicitud</h2><label for="n-p">Proceso</label><select id="n-p"><option value="">General (no es sobre un proceso)</option>'+procs.map(p=>'<option value="'+p.id+'"'+(p.id===pid?' selected':'')+'>'+E(p.medio)+' · '+fmtRad(p.radicado).slice(0,17)+'…</option>').join('')+'</select><label for="n-a">Asunto</label><input id="n-a" required><label for="n-m">Mensaje</label><textarea id="n-m" rows="5" required>'+E(sessionStorage.getItem('lexportal.prefill')||'')+'</textarea><label for="n-f">Adjuntar archivos (opcional, máx. 5 MB c/u)</label><input id="n-f" type="file" multiple><p class="nota">Los archivos se guardan solo en este navegador.</p>'+AUT+'<p class="err" id="n-err" aria-live="polite"></p><button class="btn prim">'+I('send')+'Enviar a la abogada</button></form>';
   sessionStorage.removeItem('lexportal.prefill');
   pt.querySelector('#nf').onsubmit=async e=>{ e.preventDefault(); const err=pt.querySelector('#n-err'); const a=pt.querySelector('#n-a').value.trim(), m=pt.querySelector('#n-m').value.trim();
    if(!a||!m) return err.textContent='Escriba el asunto y el mensaje.'; if(!pt.querySelector('#aut').checked) return err.textContent='Debe autorizar el tratamiento de datos.';
    const files=[...pt.querySelector('#n-f').files]; if(files.some(f=>f.size>5*1024*1024)) return err.textContent='Cada archivo debe pesar máximo 5 MB.';
    const adj=[]; for(const f of files){ const id='pf'+SH.uid(); try{ await SH.filePut(id,f); adj.push({id,nombre:f.name,size:f.size,tipo:f.type}); }catch(x){ err.textContent='No se pudo guardar '+f.name; return; } }
    SH.addSolicitud({origen:'portal',clienteId:cli.id,procesoId:pt.querySelector('#n-p').value,nombre:cli.nombre,asunto:a,mensaje:m,adjuntos:adj,autorizacionDatos:true});
    toast('Solicitud enviada a su abogada'); location.hash='#/portal/solicitudes'; };
 }
}
/* ---------- Router ---------- */
function route(){ const h=location.hash.replace(/^#\/?/,'')||'inicio'; if(h==='view'){ return; } const [n,...args]=h.split('/'); const v=V[n]||V.inicio;
 document.querySelectorAll('#mainnav a[data-r]').forEach(a=>{ const on=a.dataset.r===n; a.classList.toggle('on',on); if(on) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
 $('#mainnav').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded','false');
 try{ v($('#view'),args); }catch(e){ console.error(e); $('#view').innerHTML='<div class="wrap pag"><p class="err">Error: '+E(e.message)+'</p></div>'; }
 $('#view').querySelectorAll('[data-chat]').forEach(b=>b.onclick=()=>$('#chatFab').click());
 if(!Site._keepScroll) window.scrollTo(0,0); Site._keepScroll=false; }
Site.route=route;
function boot(){ $('#firmaNom').textContent=C.abogado; $('#firmaLema').textContent=C.lema; document.title=C.abogado+' · '+C.lema;
 const hoy=new Date(); $('#hoy').textContent=DIAS[hoy.getDay()]+' '+hoy.getDate()+' de '+MES[hoy.getMonth()]+' de '+hoy.getFullYear(); $('#sede').textContent=C.ciudad+' · '+C.tarjeta;
 $('#fTP').textContent=C.tarjeta; $('#fDir').textContent=C.direccion+', '+C.ciudad; $('#fTel').textContent=C.telefono; $('#fTel').href='tel:3000000000'; $('#fMail').textContent=C.email; $('#fMail').href='mailto:'+C.email; $('#fHor').textContent=C.horario; $('#fLex').href=C.lexmonitor;
 $('#menuBtn').onclick=()=>{ const o=$('#mainnav').classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded',String(o)); };
 $('#mainnav').addEventListener('click',e=>{ if(e.target.closest('a')){ $('#mainnav').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded','false'); } });
 window.addEventListener('hashchange',route); SH.load(); route();
 SH.onChange(()=>{ if(!/^#\/portal/.test(location.hash)) return; const a=document.activeElement; if(a&&/TEXTAREA|INPUT|SELECT/.test(a.tagName)&&$('#view').contains(a)) return; Site._keepScroll=true; route(); toast('Su portal se actualizó'); });
}
document.addEventListener('DOMContentLoaded',boot);
})();
