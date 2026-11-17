'use strict';
(() => {
  const data = window.HOME_DATA;
  const $ = id => document.getElementById(id);
  const money = n => n === null ? 'Unavailable' : new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
  const num = n => n === null ? 'Unavailable' : new Intl.NumberFormat('en-US').format(n);
  const label = c => `${c.city}, ${c.state}`;
  let selected = 'all';
  data.cities.forEach((c,i) => { const o = document.createElement('option'); o.value=String(i); o.textContent=label(c); $('city').append(o); });
  function choose(value) { selected=value; $('city').value=value; render(); }
  function ordered() {
    return [...data.cities].sort((a,b) => $('sort').value==='name' ? label(a).localeCompare(label(b)) : $('sort').value==='price-asc' ? a.median-b.median : b.median-a.median);
  }
  function render() {
    const s = selected==='all' ? data.overall : data.cities[Number(selected)];
    $('scope').textContent = selected==='all' ? 'All college towns' : label(s);
    $('sales').textContent=num(s.sales); $('median').textContent=money(s.median);
    $('price-note').textContent=`${num(s.priceCount)} qualifying prices`;
    $('dom').textContent=s.dom===null ? 'Unavailable' : `${num(s.dom)} days`;
    $('dom-note').textContent=`${num(s.domCount)} valid listing histories`;
    $('campuses').textContent=num(s.campuses);
    $('coverage').textContent=selected==='all' ? `${num(data.cities.length)} cities across ${num(s.states)} states` : 'Nearest-campus coordinate assignment';
    $('quality').textContent=`${num(s.excluded)} prices below $1,000 or invalid are excluded from price medians. ${num(s.highPrices)} prices above $5 million are retained.`;
    $('date-range').textContent=`Recorded closing dates span ${s.start} to ${s.end} for this view. ${num(s.missingSaleDates)} records have no valid closing date; they remain in the sales and price samples.`;
    const ranking=[...data.cities].sort((a,b)=>b.median-a.median), high=ranking[0], low=ranking[ranking.length-1];
    const findings=$('findings'); findings.replaceChildren();
    const lines=selected==='all' ? [
      `${label(high)} has the highest median in this sample at ${money(high.median)}; ${label(low)} has the lowest at ${money(low.median)}.`,
      `The gap is ${money(high.median-low.median)}. These are comparisons of the homes sold, without adjusting for size, age, or location within a city.`
    ] : [
      `${label(s)} has ${num(s.sales)} recorded sales and a median qualifying sale price of ${money(s.median)}.`,
      `Its median is ${money(Math.abs(s.median-data.overall.median))} ${s.median>=data.overall.median?'above':'below'} the pooled sample median. Timing is available for ${num(s.domCount)} of its ${num(s.sales)} sales.`
    ];
    lines.forEach(text=>{const p=document.createElement('p');p.textContent=text;findings.append(p);});
    $('chart').replaceChildren(); $('city-table').replaceChildren();
    const max=high.median;
    ordered().forEach(c=>{
      const key=String(data.cities.indexOf(c)), active=selected===key;
      const button=document.createElement('button'); button.type='button'; button.className='bar-row';
      button.setAttribute('aria-pressed',String(active));button.setAttribute('aria-label',`${label(c)}: median ${money(c.median)} from ${num(c.priceCount)} qualifying prices. Select city.`);
      const name=document.createElement('span');name.className='bar-label';name.textContent=label(c);
      const track=document.createElement('span');track.className='track';track.setAttribute('aria-hidden','true');
      const bar=document.createElement('span');bar.className='bar';bar.style.width=`${c.median/max*100}%`;bar.style.display='block';track.append(bar);
      const value=document.createElement('span');value.className='bar-value';value.textContent=money(c.median);
      button.append(name,track,value);button.addEventListener('click',()=>choose(key));$('chart').append(button);
      const tr=document.createElement('tr');if(active)tr.className='selected';
      const td=document.createElement('td'), link=document.createElement('button');link.type='button';link.textContent=label(c);link.addEventListener('click',()=>choose(key));td.append(link);tr.append(td);
      [num(c.sales),num(c.priceCount),money(c.median)].forEach(text=>{const cell=document.createElement('td');cell.textContent=text;tr.append(cell);});
      const timing=document.createElement('td');timing.textContent=c.dom===null?'Unavailable':`${num(c.dom)} days`;const count=document.createElement('small');count.textContent=`n = ${num(c.domCount)}`;timing.append(count);tr.append(timing);$('city-table').append(tr);
    });
    $('status').textContent=`Showing ${$('scope').textContent}: ${num(s.sales)} sales, median ${money(s.median)}.`;
  }
  $('city').addEventListener('change',e=>choose(e.target.value));
  $('sort').addEventListener('change',render);
  $('reset').addEventListener('click',()=>{$('sort').value='price-desc';choose('all');});
  $('download').addEventListener('click',()=>{
    const rows=[['City','State','Total sales','Qualifying price count','Median price USD','Median days on market','Valid timing count'],...ordered().map(c=>[c.city,c.state,c.sales,c.priceCount,c.median,c.dom,c.domCount])];
    const csv=rows.map(row=>row.map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(',')).join('\r\n');
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='college-town-city-summary.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  render();
})();
