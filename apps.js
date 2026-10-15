/* Catalog checked against Play Console on 2026-10-15. */
const apps = [
{name:'VALE KM',icon:'vale-km',category:'Finanças',live:true,package:'com.valekm.app',description:'Analise ofertas de corridas com valor por km, por hora, distância e tempo. Configure seus critérios e os custos do veículo.',privacy:'https://vale-km-privacidade.pages.dev/'},
{name:'WiFi Security Scan',icon:'wifi-official',extension:'webp',category:'Ferramentas',live:true,package:'com.joaovitormodesto.wifiguard',description:'Analise sua rede Wi-Fi, confira dispositivos conectados e consulte sinal, ping e latência.'},
{name:'Beba Água BR',icon:'beba-agua',category:'Dia a dia',description:'Registre sua ingestão de água e acompanhe sua rotina de hidratação.'},
{name:'Calcula BR',icon:'calcula',category:'Ferramentas',description:'Cálculos e ferramentas práticas para resolver as contas do dia a dia.'},
{name:'Caneta em Dia BR',icon:'caneta',category:'Dia a dia',description:'Um diário pessoal para organizar registros, aplicações, alimentação e observações da sua rotina.',privacy:'caneta-em-dia-br-privacidade.html'},
{name:'Conversor BR',icon:'conversor',category:'Ferramentas',description:'Conversões de unidades em uma ferramenta prática para consultar quando precisar.',privacy:'conversor-br-privacidade.html'},
{name:'Gastos BR',icon:'gastos',category:'Finanças',description:'Registre despesas e acompanhe a organização das suas finanças pessoais.'},
{name:'Limpa BR',icon:'limpa',category:'Ferramentas',description:'Explore e organize o armazenamento do aparelho para cuidar dos arquivos que ocupam espaço.'},
{name:'Lista de Compras BR',icon:'lista',category:'Dia a dia',description:'Organize os itens da próxima compra e mantenha sua lista sempre por perto.',privacy:'lista-de-compras-br-privacidade.html'},
{name:'PDF Tools BR',icon:'pdf',category:'Produtividade',description:'Ferramentas para trabalhar com arquivos PDF e organizar seus documentos.',privacy:'pdf-tools-br-privacidade.html'},
{name:'QR Code BR: Leitor e Gerador',icon:'qr',category:'Ferramentas',description:'Leia e gere códigos QR com uma ferramenta dedicada ao seu Android.'},
{name:'Scanner BR',icon:'scanner',category:'Produtividade',description:'Digitalize documentos, ajuste as páginas e salve ou compartilhe seus arquivos em PDF.',privacy:'scanner-br-privacidade.html'}
];
const grid=document.querySelector('#apps-grid'), search=document.querySelector('#app-search'), filters=[...document.querySelectorAll('.filter')];
let activeFilter='Todos';
const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
function renderApps(){
const query=normalize(search.value.trim());
const visible=apps.filter(app=>(activeFilter==='Todos'||app.category===activeFilter)&&normalize(`${app.name} ${app.description} ${app.category}`).includes(query));
grid.replaceChildren(...visible.map(app=>{
const article=document.createElement('article');article.className='app-card';
const top=document.createElement('div');top.className='app-card-top';
const image=document.createElement('img');image.src=`assets/${app.icon}.${app.extension||'png'}`;image.alt='';image.width=56;image.height=56;image.loading='lazy';
const status=document.createElement('span');status.className=`status ${app.live?'live':'test-status'}`;status.textContent=app.live?'Disponível':'Em testes';top.append(image,status);
const title=document.createElement('h3');title.textContent=app.name;
const description=document.createElement('p');description.textContent=app.description;
const links=document.createElement('div');links.className='app-card-links';
if(app.live){const link=document.createElement('a');link.href=`https://play.google.com/store/apps/details?id=${app.package}`;link.textContent='Google Play ↗';link.className='app-link';link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label',`${app.name} no Google Play (abre em nova aba)`);links.append(link);}else{const category=document.createElement('span');category.className='card-category';category.textContent=app.category;links.append(category);}
if(app.privacy){const privacy=document.createElement('a');privacy.href=app.privacy;privacy.className='privacy-link';privacy.textContent='Privacidade';privacy.setAttribute('aria-label',`Política de privacidade: ${app.name}`);links.append(privacy);}
article.append(top,title,description,links);return article;
}));
document.querySelector('#empty-state').hidden=visible.length>0;
document.querySelector('#results').textContent=`${visible.length} aplicativo${visible.length!==1?'s':''} encontrado${visible.length!==1?'s':''}.`;
}
search.addEventListener('input',renderApps);
filters.forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;filters.forEach(filter=>{const active=filter===button;filter.classList.toggle('active',active);filter.setAttribute('aria-pressed',String(active));});renderApps();}));
renderApps();
