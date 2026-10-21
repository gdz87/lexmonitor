(function(){
const L=window.LMP,E=L.esc,$=s=>document.querySelector(s);
let P=L.load(),recienteArriba=false,vistos=new Set(P.actuaciones.map(a=>a.id));
const GL=[
 ['auto admisorio','¿Qué significa auto admisorio?','Es la decisión con la que el juzgado <em>acepta la demanda</em> porque cumple los requisitos. A partir de ahí se le avisa a la otra parte para que responda.'],
 ['demanda','¿Qué es la demanda?','Es el escrito con el que su abogada le cuenta al juez lo que pasó, qué pruebas hay y qué se pide. Con ella <em>empieza el proceso</em>.'],
 ['reparto','¿Qué es el reparto?','Es el sorteo que asigna cada demanda nueva a un juzgado. Así nadie escoge al juez y <em>el caso queda en manos de un despacho concreto</em>.'],
 ['notificación personal','¿Qué es la notificación personal?','Es el aviso oficial a la otra parte de que existe una demanda en su contra. Desde el día siguiente <em>empiezan a correr sus plazos</em> para responder.'],
 ['excepciones','¿Qué son las excepciones?','Son las razones que da la parte demandada para decir que <em>no debe lo que se le pide</em>, o que debe menos. Su abogada las responde con argumentos y pruebas.'],
 ['traslado','¿Qué significa «correr traslado»?','Es cuando el juzgado le entrega un escrito a una parte y le da <em>un plazo para pronunciarse</em> sobre él.'],
 ['término','¿Qué es un término?','Es el plazo que fija la ley o el juez para hacer algo. En los procesos civiles se cuenta en <em>días hábiles</em>.'],
 ['días hábiles','¿Qué son los días hábiles?','Son los días de lunes a viernes que no son festivos. Por eso un plazo de cinco días puede durar <em>más de una semana calendario</em>.'],
 ['audiencia inicial','¿Qué pasa en la audiencia inicial?','El juez escucha a las partes, intenta una conciliación, fija lo que se discute y <em>decide qué pruebas se van a practicar</em>. Usted debe asistir.'],
 ['memorial','¿Qué es un memorial?','Es cualquier escrito que una parte le envía al juzgado durante el proceso: <em>una petición, una respuesta o un documento</em>.'],
 ['radicado','¿Qué es el número de radicado?','Son los <em>23 dígitos</em> que identifican su proceso en la Rama Judicial: ciudad, juzgado, año y número consecutivo.'],
 ['sentencia','¿Qué es la sentencia?','Es la <em>decisión final</em> del juez sobre lo que se pidió en la demanda. Puede apelarse ante un tribunal.']
];
function aviso(t){const a=$('#aviso');a.innerHTML='<svg class="ico"><use href="#i-check"/></svg>'+E(t);a.classList.add('si');clearTimeout(aviso.t);aviso.t=setTimeout(()=>a.classList.remove('si'),2600)}
const color=n=>n<0?'piedra':n<=5?'lacre':n<=15?'ocre':'toga';
function cabecera(){
  const h=new Date(),hi=L.hoyISO();
  $('#hoy').textContent=L.conDia(hi)+' de '+h.getFullYear()+' · Ciudad Ejemplo';
  $('#exp').textContent='Expediente '+P.radicado.slice(12,16)+'-'+P.radicado.slice(16,21);
  $('#kicker').textContent=P.clase;
  const [a,b]=P.titulo.split(' contra ');
  $('#titular').innerHTML=E(a)+(b?' <em>contra</em> '+E(b):'');
  $('#rad').textContent=L.fmtRad(P.radicado);
  $('#bajada').textContent=P.bajada;
  $('#selloDia').textContent=h.getDate()+' '+['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'][h.getMonth()];
  $('#selloMes').textContent=String(h.getFullYear());
  $('#estado').textContent=P.estado;$('#estadoTxt').textContent=P.estadoTxt;
  $('#revisado').textContent='Su abogada revisó el expediente el '+L.larga(P.revisado).replace(/ de \d{4}$/,'')+'.';
  const D=[['Juzgado',P.juzgado],['Clase de proceso',P.clase],['Demandante (usted)',P.cliente],['Demandada',P.contraparte],['Valor reclamado',P.cuantia],['Etapa actual',P.etapa]];
  $('#datos').innerHTML=D.map(([k,v])=>'<div><dt>'+k+'</dt><dd>'+E(v)+'</dd></div>').join('');
  $('#etapas').innerHTML=P.etapas.map((e,i)=>'<li class="'+(i<P.etapaIdx?'ok':i===P.etapaIdx?'ya':'')+'">'+E(e)+'</li>').join('');
}
function hitos(){
  const list=[...P.actuaciones].sort((x,y)=>x.fecha.localeCompare(y.fecha)||0);if(recienteArriba)list.reverse();
  $('#hitos').innerHTML=list.map(a=>{const d=L.parse(a.fecha);const nuevo=!vistos.has(a.id);
    return '<article class="hito'+(nuevo?' nuevo':'')+'" data-id="'+a.id+'"><div class="f mono"><b>'+String(d.getDate()).padStart(2,'0')+'</b>'+['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][d.getMonth()]+' '+d.getFullYear()+'</div>'+
    '<div class="tipo">'+E(a.tipo)+(nuevo?'<span class="nuevo-tag">NUEVO</span>':'')+'</div><h4>'+E(a.titulo)+'</h4><p>'+E(a.exp)+'</p>'+
    '<div class="mini">'+(a.glos?'<button class="ul" data-glos="'+E(a.glos)+'"><svg class="ico"><use href="#i-circle-help"/></svg>¿Qué significa «'+E(a.glos)+'»?</button>':'')+(a.doc?'<button class="ul" data-doc="'+a.doc+'"><svg class="ico"><use href="#i-eye"/></svg>Ver documento</button>':'')+
    (a.rev?'<span style="color:var(--piedra)">Su abogada revisó esta actuación el '+L.larga(a.rev).replace(/ de \d{4}$/,'')+'.</span>':'')+'</div></article>'}).join('');
  observar();dibujar();
}
let io;function observar(){io&&io.disconnect();io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}}),{rootMargin:'0px 0px -18% 0px'});
  document.querySelectorAll('.hito').forEach(h=>io.observe(h))}
function dibujar(){const tl=$('#tl'),r=tl.getBoundingClientRect(),vh=innerHeight;const p=Math.max(0,Math.min(1,(vh*.78-r.top)/r.height));tl.style.setProperty('--p',p.toFixed(3))}
function terminos(){
  const T=P.terminos.map(t=>({...t,n:L.habilesHasta(t.vence)})).filter(t=>t.n>=0).sort((a,b)=>a.vence.localeCompare(b.vence));
  if(!T.length){$('#grande').innerHTML='<p class="que">No hay términos pendientes.</p>';$('#lista').innerHTML='';return}
  const pintar=sel=>{const t=T[sel],c=color(t.n);
    $('#grande').innerHTML='<div class="num u-'+c+'">'+t.n+'<small>día'+(t.n===1?'':'s')+' hábil'+(t.n===1?'':'es')+'</small></div><p class="que">'+E(t.titulo)+'</p><div class="vence u-'+c+'"><i class="luz b-'+c+'"></i>vence el '+L.conDia(t.vence)+'</div><p class="nota" style="margin-top:8px">'+E(t.detalle)+'</p>';
    $('#lista').innerHTML=T.map((x,i)=>{const cc=color(x.n);return '<button class="term'+(i===sel?' sel':'')+'" data-t="'+i+'"><div class="d u-'+cc+'">'+x.n+'<small>HÁBILES</small></div><div><b>'+E(x.titulo)+'</b><span class="mono">vence el '+L.corta(x.vence)+'</span></div></button>'}).join('');
    document.querySelectorAll('.term').forEach(b=>b.onclick=()=>pintar(+b.dataset.t));};
  pintar(0);
}
function docs(){
  $('#docs').innerHTML=P.documentos.map(d=>'<div class="doc"><button class="pila" data-doc="'+d.id+'" aria-label="Ver '+E(d.nombre)+'"><i></i><i></i><i></i></button><div><h4>'+E(d.nombre)+'</h4><div class="meta">'+L.corta(d.fecha)+' · PDF · '+d.paginas+' pág.</div></div>'+
   '<div class="acciones"><button class="btn" data-doc="'+d.id+'"><svg class="ico"><use href="#i-eye"/></svg>Ver</button><a class="btn" href="'+d.pdf+'" download data-dl="'+d.id+'"><svg class="ico"><use href="#i-download"/></svg>Descargar</a></div></div>').join('');
}
function abrirDoc(id){const d=P.documentos.find(x=>x.id===id);if(!d)return;$('#vTit').textContent=d.nombre;$('#vImg').src=d.pdf.replace('.pdf','-1.png');$('#vImg').alt='Página 1 de '+d.nombre;$('#vDesc').href=d.pdf;$('#visor').classList.add('si');$('#vCerrar').focus()}
function cerrarDoc(){$('#visor').classList.remove('si')}
function abogado(){const a=P.abogado,ini=a.nombre.split(' ').filter((_,i)=>i===0||i===1).map(s=>s[0]).join('');
  $('#abogCard').innerHTML='<div class="retrato">'+ini+'</div><div><h3>Dra. '+E(a.nombre)+'</h3><p class="cargo">'+E(a.titulo)+' · <span class="mono" style="font-size:13px">'+E(a.tp)+'</span></p><ul class="contacto">'+
  '<li><svg class="ico"><use href="#i-phone"/></svg><a class="ul" href="tel:+57'+a.tel.replace(/\s/g,'')+'">'+E(a.tel)+'</a></li><li><svg class="ico"><use href="#i-mail"/></svg><a class="ul" href="mailto:'+E(a.correo)+'">'+E(a.correo)+'</a></li>'+
  '<li><svg class="ico"><use href="#i-map-pin"/></svg>'+E(a.oficina)+'</li><li><svg class="ico"><use href="#i-clock"/></svg>'+E(a.horario)+'</li></ul>'+
  '<p style="font-size:14px;color:#555;margin:12px 0 0">Ella lleva su caso desde la radicación de la demanda.</p></div>';
  if(!$('#mNombre').value)$('#mNombre').value=P.cliente;}
function glosario(){$('#gl').innerHTML=GL.map(([k,q,r],i)=>'<details data-k="'+E(k)+'"><summary><span class="l">'+String(i+1).padStart(2,'0')+'</span>'+E(q)+'<span class="mas">+</span></summary><p>'+r+'</p></details>').join('')}
function irGlos(k){$('#glBuscar').value='';filtrar();const d=document.querySelector('#gl details[data-k="'+CSS.escape(k)+'"]');if(!d)return;d.open=true;d.scrollIntoView({behavior:'smooth',block:'center'});d.classList.remove('flash');void d.offsetWidth;d.classList.add('flash')}
function filtrar(){const q=$('#glBuscar').value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');let n=0;
  document.querySelectorAll('#gl details').forEach(d=>{const ok=!q||d.textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').includes(q);d.style.display=ok?'':'none';if(ok)n++});$('#glVacio').style.display=n?'none':'block'}
function render(){cabecera();hitos();terminos();docs();abogado()}
// eventos
document.addEventListener('click',e=>{const g=e.target.closest('[data-glos]');if(g){e.preventDefault();irGlos(g.dataset.glos)}
  const d=e.target.closest('[data-doc]');if(d){e.preventDefault();abrirDoc(d.dataset.doc)}
  const dl=e.target.closest('[data-dl]');if(dl)aviso('Descargando el PDF…');
  if(e.target===$('#visor'))cerrarDoc()});
$('#vCerrar').onclick=cerrarDoc;$('#vDesc').onclick=()=>aviso('Descargando el PDF…');
document.addEventListener('keydown',e=>{if(e.key==='Escape')cerrarDoc()});
$('#copiarRad').onclick=()=>{const t=P.radicado;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).catch(()=>{}).finally(()=>aviso('Radicado copiado: '+t))};
$('#ordenTl').onclick=e=>{recienteArriba=!recienteArriba;e.target.textContent=recienteArriba?'Ver en orden cronológico':'Ver lo más reciente primero';hitos();document.querySelectorAll('.hito').forEach(h=>h.classList.add('vis'))};
$('#glBuscar').oninput=filtrar;$('#glLimpiar').onclick=()=>{$('#glBuscar').value='';filtrar();$('#glBuscar').focus()};
$('#formMsg').onsubmit=e=>{e.preventDefault();const n=$('#mNombre').value.trim(),t=$('#mTexto').value.trim();
  if(!n){$('#mErr').textContent='Escriba su nombre, por favor.';$('#mNombre').focus();return}
  if(t.length<8){$('#mErr').textContent='Cuéntenos un poco más en el mensaje (mínimo 8 caracteres).';$('#mTexto').focus();return}
  $('#mErr').textContent='';const ref='MSJ-'+L.hoyISO().replace(/-/g,'').slice(2)+'-'+String(Date.now()).slice(-4);
  L.addMsg({ref,nombre:n,tema:$('#mTema').value,texto:t,fecha:new Date().toISOString(),radicado:P.radicado});
  $('#mOkTxt').textContent='Gracias, '+n.split(' ')[0]+'. La Dra. '+P.abogado.nombre.split(' ')[0]+' lo verá en su plataforma y le responderá en horario de oficina, por lo general en uno o dos días hábiles.';
  $('#mOkRef').textContent='Referencia '+ref;['mNombre','mTema','mTexto','mEnviar'].forEach(i=>$('#'+i).closest('.campo')?$('#'+i).closest('.campo').style.display='none':$('#'+i).style.display='none');
  $('#mOk').classList.add('si');$('#mOk').focus()};
$('#mOtro').onclick=()=>{$('#mTexto').value='';['mNombre','mTema','mTexto'].forEach(i=>$('#'+i).closest('.campo').style.display='');$('#mEnviar').style.display='';$('#mOk').classList.remove('si');$('#mTexto').focus()};
// nav activa
const secs=['proceso','linea','terminos','documentos','abogado','glosario'];
function activa(){let cur='proceso',best=-1e9;for(const s of secs){const el=document.getElementById(s);if(!el)continue;const t=el.getBoundingClientRect().top;if(t<innerHeight*.35&&t>best){best=t;cur=s}}
  if(innerWidth>900&&cur==='terminos')cur='linea'; /* en escritorio el semáforo es una columna fija */
  document.querySelectorAll('.nav a,.tabbar a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur))}
addEventListener('scroll',()=>{dibujar();activa()},{passive:true});addEventListener('resize',dibujar);
// sincronía con la plataforma del abogado
addEventListener('storage',e=>{if(e.key!==L.K.proc||!e.newValue)return;try{P=JSON.parse(e.newValue)}catch(_){return}
  const nuevos=P.actuaciones.filter(a=>!vistos.has(a.id));render();document.querySelectorAll('.hito').forEach(h=>h.classList.add('vis'));
  if(nuevos.length){aviso('Su abogada publicó una nueva actuación');const el=document.querySelector('.hito[data-id="'+nuevos[0].id+'"]');el&&el.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>nuevos.forEach(a=>vistos.add(a.id)),8000)}});
glosario();render();activa();
const q=new URLSearchParams(location.search);if(q.get('acceso'))setTimeout(()=>aviso('Bienvenida, '+P.cliente.split(' ')[0]+'. Abrió el portal desde el enlace compartido.'),600);
})();
