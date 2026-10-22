/* v19.9-portal · Si hay sesión real del portal (iniciada en ../sitio/#/portal), el expediente se arma con los datos del servidor de LexMonitor
   (solo en memoria; no se guardan en este navegador). Sin sesión real, se abre el expediente de ejemplo como siempre, con su leyenda. */
(function(){
const PROXY=String(window.PORTAL_PROXY||'https://lexmonitor-proxy.gdz87.workers.dev').replace(/\/$/,'');
const cargar=()=>{ const s=document.createElement('script'); s.src='portal.js'; document.body.appendChild(s); };
let ses=null; try{ ses=JSON.parse(sessionStorage.getItem('lexportal.srv')||'null'); if(ses&&!(Date.parse(ses.expira)>Date.now())) ses=null; }catch(e){}
if(!ses){ cargar(); return; }
document.documentElement.classList.add('srv-real');
fetch(PROXY+'/v1/portal/datos',{headers:{'X-Portal-Sesion':ses.sesion}}).then(r=>r.json().then(j=>({r,j}))).then(({r,j})=>{
  if(!r.ok){ sessionStorage.removeItem('lexportal.srv'); location.href='../sitio/#/portal'; return; }
  const id=new URLSearchParams(location.search).get('p'); const p=(j.procesos||[]).find(x=>x.id===id)||(j.procesos||[])[0];
  if(!p){ location.href='../sitio/#/portal'; return; }
  const f=j.firma||{}; const hoy=new Date().toISOString().slice(0,10);
  window.LMP_SRV={radicado:p.radicado||'',titulo:p.medio||'Su proceso',bajada:p.resumenCliente||'',clase:p.medio||'',juzgado:p.despacho||'',cliente:(j.cliente&&j.cliente.nombre)||'',contraparte:'',cuantia:'',
    etapa:p.etapa||'',etapas:[p.etapa||'Etapa actual'],etapaIdx:0,estado:p.estado||'',estadoTxt:'Resumen publicado por su abogado(a).',revisado:(j.actualizado||hoy).slice(0,10),
    abogado:{nombre:f.abogado||f.nombre||'Su abogado(a)',titulo:f.nombre||'',tp:'',tel:'',correo:f.email||'',oficina:'',horario:''},
    actuaciones:(p.pubs||[]).map(a=>({id:a.id,fecha:a.fecha,tipo:'Actuación',titulo:a.titulo,exp:a.resumen})),
    terminos:(p.evs||[]).map(e=>({id:e.id,titulo:e.titulo,detalle:e.hora?'Hora: '+e.hora+' (Bogotá)':'',vence:e.fecha})),documentos:[]};
  const st=document.createElement('style'); st.textContent='.srv-real .lm-ficticio,.srv-real #documentos,.srv-real #formMsg{display:none!important}'; document.head.appendChild(st);
  cargar();
}).catch(()=>{ location.href='../sitio/#/portal'; });
})();
