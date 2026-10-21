# Genera los PDF de ejemplo (contenido ficticio) del portal.
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import simpleSplit
import os
D=os.path.dirname(os.path.abspath(__file__))
pdfmetrics.registerFont(TTFont('Mono',os.path.join(D,'..','fonts','IBMPlexMono-Regular.ttf')))
RAD='00000-00-00-000-0000-EJEMPLO-00'
def doc(fn,titulo,parrafos,firma,fecha):
    c=canvas.Canvas(os.path.join(D,fn),pagesize=letter); W,H=letter
    c.setTitle(titulo+' · '+RAD); c.setAuthor('Juzgado 00 Civil del Circuito de Ciudad Ejemplo (ejemplo ficticio)')
    def head():
        c.setFont('Times-Bold',12); c.drawCentredString(W/2,H-72,'RAMA JUDICIAL DEL PODER PÚBLICO')
        c.setFont('Times-Roman',11); c.drawCentredString(W/2,H-88,'JUZGADO 00 CIVIL DEL CIRCUITO DE CIUDAD EJEMPLO')
        c.setFont('Mono',8.5); c.drawCentredString(W/2,H-104,'Radicado '+RAD)
        c.line(72,H-114,W-72,H-114)
        c.setFont('Times-Italic',8); c.setFillGray(.45)
        c.drawCentredString(W/2,40,'Documento de ejemplo con datos ficticios · Portal del cliente · LexMonitor, de Gdz Soluciones'); c.setFillGray(0)
    head(); y=H-150
    c.setFont('Times-Bold',13); c.drawCentredString(W/2,y,titulo.upper()); y-=18
    c.setFont('Times-Roman',11); c.drawCentredString(W/2,y,'Ciudad Ejemplo, '+fecha); y-=30
    for p in parrafos:
        bold=p.startswith('**'); p=p.strip('*')
        lines=simpleSplit(p,'Times-Bold' if bold else 'Times-Roman',11.5,W-144)
        for l in lines:
            if y<90: c.showPage(); head(); y=H-150
            c.setFont('Times-Bold' if bold else 'Times-Roman',11.5); c.drawString(72,y,l); y-=16
        y-=8
    y-=30
    if y<130: c.showPage(); head(); y=H-170
    c.line(W/2-110,y,W/2+110,y); c.setFont('Times-Bold',11); c.drawCentredString(W/2,y-14,firma[0]); c.setFont('Times-Roman',10); c.drawCentredString(W/2,y-28,firma[1])
    c.save()
J=('JUEZA EJEMPLO FICTICIA','Jueza')
doc('auto_admisorio_ejemplo-00.pdf','Auto admisorio de la demanda',[
 'Proceso: Verbal de responsabilidad civil contractual.','Demandante: Clienta Ejemplo Ficticia.','Demandada: Constructora Ejemplo Ficticia S.A.S.',
 'Revisada la demanda presentada por intermedio de apoderada judicial, el Despacho encuentra que reúne los requisitos de los artículos 82, 83, 84 y 368 del Código General del Proceso, y que este Juzgado es competente por la naturaleza del asunto, la cuantía y el lugar de cumplimiento del contrato.',
 '**RESUELVE:**',
 'PRIMERO. ADMITIR la demanda verbal de responsabilidad civil contractual promovida por Clienta Ejemplo Ficticia contra Constructora Ejemplo Ficticia S.A.S.',
 'SEGUNDO. NOTIFICAR personalmente esta providencia a la sociedad demandada, conforme a los artículos 291 y 292 del Código General del Proceso o al artículo 8 de la Ley 2213 de 2022, y CORRERLE TRASLADO por el término de veinte (20) días hábiles.',
 'TERCERO. RECONOCER personería a la abogada Abogada Ejemplo Ficticia, identificada con T.P. 000.000 del C. S. de la J., en los términos del poder conferido.',
 'CUARTO. Previo a decretar la medida cautelar solicitada, la parte demandante deberá prestar caución por el 20 % del valor de las pretensiones.',
 'NOTIFÍQUESE Y CÚMPLASE.'],J,'3 de septiembre de 2026')
doc('constancia_notificacion_ejemplo-00.pdf','Constancia de notificación personal',[
 'La secretaría del Juzgado deja constancia de que el 22 de septiembre de 2026 se notificó personalmente a Constructora Ejemplo Ficticia S.A.S., por medio de su representante legal, del auto admisorio de la demanda proferido el 3 de septiembre de 2026.',
 'Se le entregó copia de la demanda y sus anexos y se le informó que dispone de veinte (20) días hábiles para contestar, contados a partir del día siguiente a esta notificación.',
 'Para constancia se firma.'],('SECRETARIO EJEMPLO FICTICIO','Secretario'),'22 de septiembre de 2026')
doc('demanda_ejemplo-00.pdf','Demanda verbal (copia de radicación)',[
 'Señor(a) Juez Civil del Circuito de Ciudad Ejemplo (Reparto).','Abogada Ejemplo Ficticia, abogada en ejercicio, actuando como apoderada de Clienta Ejemplo Ficticia, presento demanda verbal de responsabilidad civil contractual contra Constructora Ejemplo Ficticia S.A.S.',
 '**HECHOS**',
 '1. El 14 de marzo de 2024 las partes firmaron promesa de compraventa del apartamento 1204 de la torre B del conjunto Ejemplo, en Ciudad Ejemplo, por $ 312.000.000.',
 '2. La constructora se obligó a entregar el inmueble a más tardar el 30 de junio de 2025. La demandante pagó el 60 % del precio en las fechas pactadas.',
 '3. A la fecha de esta demanda el apartamento no ha sido entregado ni se ha devuelto el dinero, pese a dos requerimientos escritos.',
 '**PRETENSIONES**',
 'Que se declare el incumplimiento del contrato y se condene a la demandada a restituir $ 186.400.000, junto con la cláusula penal y los intereses moratorios causados.',
 '**ANEXOS**','Poder, promesa de compraventa, comprobantes de pago, requerimientos, certificado de existencia y representación legal y demás documentos enunciados (14 en total).'],
 ('ABOGADA EJEMPLO FICTICIA','T.P. 000.000 del C. S. de la J.'),'4 de agosto de 2026')
print('ok')
