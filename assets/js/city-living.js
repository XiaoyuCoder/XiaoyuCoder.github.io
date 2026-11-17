import { cities, rentSource } from './city-living-data.mjs?v=20261117';

const chart = document.querySelector('#city-chart');
const list = document.querySelector('#city-list');
const detail = document.querySelector('#city-detail');
const search = document.querySelector('#city-search');
const count = document.querySelector('#count-summary');
const legend = document.querySelector('#quadrant-legend');
const empty = document.querySelector('#empty-search');
const areaTitle = document.querySelector('#chart-area');
const svgNS = 'http://www.w3.org/2000/svg';
const money = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 });
const annualMoney = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 1 });
let area = 'small';
let selected = '北京';
let query = '';

function svg(tag, attrs, text) {
  const node = document.createElementNS(svgNS, tag);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  if (text !== undefined) node.textContent = text;
  return node;
}
function share(city) { return city.rents[area] / (city.income / 12) * 100; }
function group(city) {
  return (city.income / 12 > 5000 ? 1 : 0) + (share(city) > 15 ? 2 : 0);
}
function matches(city) { return city.name.includes(query); }
function selectCity(name) { selected = name; render(); }
function renderChart() {
  chart.querySelectorAll('.plot-layer').forEach(node => node.remove());
  const layer = svg('g', {class: 'plot-layer'});
  const left = 76, top = 35, width = 750, height = 440;
  const xMin = 3000, xMax = 8500;
  const available = cities.filter(city => city.rents[area] !== null);
  const yMax = Math.max(30, Math.ceil(Math.max(...available.map(share)) / 10) * 10);
  const x = value => left + (value - xMin) / (xMax - xMin) * width;
  const y = value => top + height - value / yMax * height;
  const xRef = x(5000), yRef = y(15);
  // Four blue tones preserve the quadrants without suggesting a value judgment.
  [[left, top, xRef-left, yRef-top, 'q-0'], [xRef, top, left+width-xRef, yRef-top, 'q-1'],
   [left, yRef, xRef-left, top+height-yRef, 'q-2'], [xRef, yRef, left+width-xRef, top+height-yRef, 'q-3']]
    .forEach(([a,b,w,h,cls]) => layer.append(svg('rect',{x:a,y:b,width:w,height:h,class:cls})));
  for (let v = 0; v <= yMax; v += 10) {
    layer.append(svg('line',{x1:left,y1:y(v),x2:left+width,y2:y(v),class:'grid-line'}));
    layer.append(svg('text',{x:left-13,y:y(v)+5,'text-anchor':'end',class:'axis-label'},`${v}%`));
  }
  for (let v = 3000; v <= 8000; v += 1000) {
    layer.append(svg('line',{x1:x(v),y1:top,x2:x(v),y2:top+height,class:'grid-line'}));
    layer.append(svg('text',{x:x(v),y:top+height+26,'text-anchor':'middle',class:'axis-label'},money.format(v)));
  }
  layer.append(svg('line',{x1:xRef,y1:top,x2:xRef,y2:top+height,class:'reference-line'}));
  layer.append(svg('line',{x1:left,y1:yRef,x2:left+width,y2:yRef,class:'reference-line'}));
  layer.append(svg('text',{x:left+14,y:top+25,class:'quadrant-label'},'较低收入 · 较高占比'));
  layer.append(svg('text',{x:left+width-14,y:top+25,'text-anchor':'end',class:'quadrant-label'},'较高收入 · 较高占比'));
  layer.append(svg('text',{x:left+14,y:top+height-13,class:'quadrant-label'},'较低收入 · 较低占比'));
  layer.append(svg('text',{x:left+width-14,y:top+height-13,'text-anchor':'end',class:'quadrant-label'},'较高收入 · 较低占比'));
  layer.append(svg('text',{x:18,y:top+height/2,transform:`rotate(-90 18 ${top+height/2})`,'text-anchor':'middle',class:'axis-title'},'样本套租金 / 人均月收入'));
  // Add labels only where space allows; every city remains available in the list.
  const boxes = [];
  const ordered = [...available].sort((a,b) => (a.name === selected ? -1 : b.name === selected ? 1 : b.income-a.income));
  ordered.forEach((city, i) => {
    const cx = x(city.income/12), cy = y(share(city)), matched = matches(city), active = city.name === selected;
    const point = svg('g',{class:`city-point${active ? ' is-selected' : ''}${matched ? '' : ' is-muted'}`,transform:`translate(${cx} ${cy})`,role:'button',tabindex:'0','aria-label':`${city.name}，月人均可支配收入 ${money.format(city.income/12)} 元，租金占比 ${share(city).toFixed(1)}%`,'aria-pressed':String(active)});
    point.style.setProperty('--point-delay', `${Math.min(i * 15, 450)}ms`);
    point.append(svg('circle',{r:14,class:'point-halo'}), svg('circle',{r:6,class:'point-dot'}), svg('circle',{r:15,class:'point-hit'}));
    const tip = svg('title',{},`${city.name} · ${share(city).toFixed(1)}%`); point.append(tip);
    const candidates = [[9,-8],[9,15],[-9,-8],[-9,15]];
    const labelWidth = city.name.length * 13 + 6;
    for (const [dx,dy] of candidates) {
      const bx = cx + dx - (dx < 0 ? labelWidth : 0), by = cy + dy - 12;
      const box = {x:bx,y:by,w:labelWidth,h:16};
      const fits = bx >= left && bx+labelWidth <= left+width && by >= top+30 && by+16 <= top+height-20 && !boxes.some(o => bx < o.x+o.w+3 && bx+labelWidth+3 > o.x && by < o.y+o.h+2 && by+16+2 > o.y);
      if (fits || active) {
        boxes.push(box); point.append(svg('text',{x:dx,y:dy,'text-anchor':dx < 0 ? 'end' : 'start',class:'point-label'},city.name)); break;
      }
    }
    point.addEventListener('click', () => selectCity(city.name));
    point.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') {event.preventDefault(); selectCity(city.name);} });
    layer.append(point);
  });
  chart.append(layer);
}
function renderDetail(city) {
  detail.replaceChildren();
  const kicker = document.createElement('p'); kicker.className = 'detail-kicker'; kicker.textContent = 'CITY PROFILE / 城市详情';
  const title = document.createElement('h2'); title.textContent = city ? city.name : '选择一个城市';
  detail.append(kicker,title);
  if (!city) { const p=document.createElement('p'); p.className='detail-intro'; p.textContent='从图中或城市列表中选择一个城市，查看其收入、租金及资料来源。'; detail.append(p); return; }
  const rent = city.rents[area];
  const p = document.createElement('p'); p.className='detail-intro'; p.textContent = rent === null ? '该面积档的租金因样本较少未公布。可切换至 30–60㎡查看。' : '2024 年收入与 2024 年 12 月租金的对照。'; detail.append(p);
  if (rent !== null) {
    const hero = document.createElement('div'); hero.className='detail-ratio';
    const label=document.createElement('span'); label.textContent='样本租金 / 人均月收入';
    const value=document.createElement('strong'); value.textContent=`${share(city).toFixed(1)}%`;
    hero.append(label,value); detail.append(hero);
  }
  const dl=document.createElement('dl'); dl.className='detail-stats';
  const values=[['人均年可支配收入', `${annualMoney.format(city.income)} 元`],['折算人均月收入', `${money.format(city.income/12)} 元`],[area === 'small' ? '30㎡以下平均套租金' : '30–60㎡平均套租金',rent === null ? '未公布' : `${money.format(rent)} 元 / 月`]];
  values.forEach(([name,value])=>{const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=name;dd.textContent=value;row.append(dt,dd);dl.append(row);});
  detail.append(dl);
  if(city.note){const note=document.createElement('p');note.className='detail-note';note.textContent=city.note;detail.append(note);}
  const links=document.createElement('div'); links.className='detail-links';
  [[city.source[0],city.source[1]],['中指研究院：2024 年 12 月租赁报告',rentSource]].forEach(([label,url])=>{const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=`${label} ↗`;links.append(a);});
  detail.append(links);
}
function renderList(filtered) {
  list.replaceChildren();
  [...filtered].sort((a,b)=>a.name.localeCompare(b.name,'zh-CN')).forEach(city=>{
    const button=document.createElement('button');button.type='button';button.className='city-chip';button.setAttribute('aria-pressed',String(city.name===selected));
    button.textContent=city.name; if(city.rents[area]===null){const mark=document.createElement('span');mark.textContent='未公布';button.append(mark);}
    button.addEventListener('click',()=>selectCity(city.name));list.append(button);
  });
  empty.hidden=filtered.length>0;
}
function renderLegend(available) {
  const labels=['较低收入 · 较低占比','较高收入 · 较低占比','较低收入 · 较高占比','较高收入 · 较高占比'];
  legend.replaceChildren(); labels.forEach((label,i)=>{const item=document.createElement('div');item.className=`legend-item legend-${i}`;const name=document.createElement('span');name.textContent=label;const amount=document.createElement('strong');amount.textContent=`${available.filter(c=>group(c)===i).length} 城`;item.append(name,amount);legend.append(item);});
}
function render() {
  const filtered=cities.filter(matches), available=filtered.filter(city=>city.rents[area]!==null);
  count.textContent=`${query ? '搜索结果' : '已收录'} ${filtered.length} 城 · 当前面积档 ${available.length} 城可绘制${filtered.length-available.length ? ` · ${filtered.length-available.length} 城未公布` : ''}`;
  areaTitle.textContent=area==='small'?'30㎡以下住宅':'30–60㎡住宅';
  renderChart();renderList(filtered);renderDetail(cities.find(city=>city.name===selected && matches(city)));renderLegend(available);
}
search.addEventListener('input',()=>{query=search.value.trim(); const found=cities.filter(matches); if(!found.some(city=>city.name===selected)) selected=found[0]?.name || ''; render();});
document.querySelectorAll('input[name="area"]').forEach(input=>input.addEventListener('change',()=>{area=input.value;render();}));
render();
