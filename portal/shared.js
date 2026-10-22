/* LexMonitor · Portal del cliente — datos compartidos (localStorage con prefijo lmportal_) */
(function(){
const K={proc:'lmportal_proceso',msgs:'lmportal_mensajes',share:'lmportal_enlace',ver:'lmportal_version'};
const VER='1.1';
// Festivos Colombia 2026 (Ley 51 de 1983)
const FEST=['2026-01-01','2026-01-12','2026-03-23','2026-04-02','2026-04-03','2026-05-01','2026-05-18','2026-06-08','2026-06-15','2026-06-29','2026-07-20','2026-08-07','2026-08-17','2026-10-12','2026-11-02','2026-11-16','2026-12-08','2026-12-25','2027-01-01','2027-01-11'];
const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const parse=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
const habil=d=>{const w=d.getDay();return w!==0&&w!==6&&!FEST.includes(iso(d))};
function habilesHasta(fin){ // días hábiles desde mañana hasta fin (incluido)
  const hoy=new Date();hoy.setHours(0,0,0,0);const f=parse(fin);if(f<=hoy)return f.getTime()===hoy.getTime()?0:-1;
  let n=0,d=new Date(hoy);while(d<f){d.setDate(d.getDate()+1);if(habil(d))n++}return n;}
function sumarHabiles(desde,n){let d=parse(desde);while(n>0){d.setDate(d.getDate()+1);if(habil(d))n--}return iso(d)}
const MES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const DIA=['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const larga=s=>{const d=parse(s);return d.getDate()+' de '+MES[d.getMonth()]+' de '+d.getFullYear()};
const corta=s=>{const d=parse(s);return String(d.getDate()).padStart(2,'0')+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+d.getFullYear()};
const conDia=s=>{const d=parse(s);return DIA[d.getDay()]+' '+d.getDate()+' de '+MES[d.getMonth()]};
const fmtRad=r=>r.replace(/^(\d{5})(\d{2})(\d{2})(\d{3})(\d{4})(\d{5})(\d{2})$/,'$1-$2-$3-$4-$5-$6-$7');
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const SEMILLA={
  radicado:'00000-00-00-000-0000-EJEMPLO-00',
  titulo:'Clienta Ejemplo contra Constructora Ejemplo Ficticia',
  bajada:'Proceso verbal por incumplimiento en la entrega de un apartamento en Ciudad Ejemplo. La constructora ya contestó la demanda y el juzgado prepara la audiencia inicial.',
  clase:'Verbal · Responsabilidad civil contractual',
  juzgado:'Juzgado 00 Civil del Circuito de Ciudad Ejemplo',
  cliente:'Clienta Ejemplo Ficticia',
  contraparte:'Constructora Ejemplo Ficticia S.A.S.',
  cuantia:'$ 186.400.000',
  etapa:'Contestación y excepciones',
  etapas:['Demanda','Admisión','Notificación','Contestación','Audiencia inicial','Pruebas','Sentencia'],
  etapaIdx:3,
  estado:'Su proceso va al día.',
  estadoTxt:'No hay nada pendiente de su parte. Su abogada está preparando la respuesta a las excepciones de la constructora.',
  revisado:'2026-10-19',
  abogado:{nombre:'Abogada Ejemplo Ficticia',titulo:'Abogada · Derecho civil y de consumo',tp:'T.P. 000.000 del C. S. de la J.',tel:'300 000 0000',correo:'abogada@ejemplo.com',oficina:'Calle 00 # 00-00, oficina 000, Ciudad Ejemplo',horario:'Lunes a viernes, 8:00 a. m. a 12:30 p. m. y 2:00 a 6:00 p. m.'},
  actuaciones:[
    {id:'a1',fecha:'2026-08-04',tipo:'Radicación',titulo:'Se presentó la demanda',exp:'Su abogada radicó la demanda con 14 anexos ante la oficina de reparto de Ciudad Ejemplo.',glos:'demanda'},
    {id:'a2',fecha:'2026-08-05',tipo:'Reparto',titulo:'El caso quedó asignado a un juzgado',exp:'Por sorteo, el proceso le correspondió al Juzgado 00 Civil del Circuito de Ciudad Ejemplo.',glos:'reparto'},
    {id:'a3',fecha:'2026-09-03',tipo:'Auto',titulo:'Auto admisorio de la demanda',exp:'Esto significa que el juzgado ya aceptó la demanda y ordenó avisarle a la constructora.',glos:'auto admisorio',doc:'d1'},
    {id:'a4',fecha:'2026-09-22',tipo:'Notificación',titulo:'La constructora fue notificada',exp:'La empresa recibió oficialmente la demanda. Desde ese día corrieron sus 20 días hábiles para responder.',glos:'notificación personal',doc:'d2'},
    {id:'a5',fecha:'2026-10-13',tipo:'Memorial',titulo:'La constructora contestó la demanda',exp:'Respondió dentro del plazo y presentó tres excepciones, es decir, razones por las que considera que no debe pagar.',glos:'excepciones'},
    {id:'a6',fecha:'2026-10-20',tipo:'Traslado',titulo:'Traslado de las excepciones',exp:'El juzgado nos dio cinco días hábiles para responder a esas razones. Su abogada ya trabaja en el escrito.',glos:'traslado',rev:'2026-10-20'}
  ],
  terminos:[
    {id:'t1',titulo:'Responder a las excepciones',detalle:'Escrito de su abogada al juzgado. No requiere nada de usted.',vence:'2026-10-27'},
    {id:'t2',titulo:'Enviar fotos y facturas del apartamento',detalle:'Su abogada le pidió estos soportes para pedir pruebas en la audiencia.',vence:'2026-11-06'},
    {id:'t3',titulo:'Audiencia inicial',detalle:'Virtual, por Microsoft Teams. Su asistencia es obligatoria; le enviaremos el enlace.',vence:'2026-11-18'}
  ],
  documentos:[
    {id:'d1',nombre:'Auto admisorio de la demanda',fecha:'2026-09-03',paginas:1,pdf:'docs/auto_admisorio_ejemplo-00.pdf'},
    {id:'d2',nombre:'Constancia de notificación personal',fecha:'2026-09-22',paginas:1,pdf:'docs/constancia_notificacion_ejemplo-00.pdf'},
    {id:'d3',nombre:'Demanda radicada (copia)',fecha:'2026-08-04',paginas:1,pdf:'docs/demanda_ejemplo-00.pdf'}
  ]
};
function load(){if(window.LMP_SRV)return window.LMP_SRV;/* v19.9: datos reales del servidor, solo en memoria */try{const p=JSON.parse(localStorage.getItem(K.proc));if(p&&p.radicado&&localStorage.getItem(K.ver)===VER)return p}catch(e){}
  const p=JSON.parse(JSON.stringify(SEMILLA));save(p);return p}
function save(p){if(window.LMP_SRV)return;localStorage.setItem(K.proc,JSON.stringify(p));localStorage.setItem(K.ver,VER)}
function reset(){localStorage.removeItem(K.proc);localStorage.removeItem(K.msgs);localStorage.removeItem(K.share);localStorage.removeItem('lmportal_internas');return load()}
const msgs=()=>{try{return JSON.parse(localStorage.getItem(K.msgs))||[]}catch(e){return[]}};
function addMsg(m){const l=msgs();l.push(m);localStorage.setItem(K.msgs,JSON.stringify(l))}
const hoyISO=()=>iso(new Date());
window.LMP={K,load,save,reset,msgs,addMsg,habilesHasta,sumarHabiles,habil,larga,corta,conDia,fmtRad,esc,hoyISO,parse,iso};
})();
