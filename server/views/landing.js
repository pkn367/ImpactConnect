// The HTML page shown at http://localhost:5000 plus the list of API endpoints.
const endpoints = [
  { group: 'Authentication', items: [
    { method: 'POST', path: '/api/auth/register', access: 'Public', desc: 'Create an account. The password is hashed with bcrypt and a JWT is returned.' },
    { method: 'POST', path: '/api/auth/login', access: 'Public', desc: 'Log in and receive a JWT.' },
    { method: 'GET', path: '/api/auth/me', access: 'Login', desc: 'Return the user that owns the token.' },
  ] },
  { group: 'Organizations (NGOs)', items: [
    { method: 'GET', path: '/api/ngos', access: 'Public', desc: 'List all organizations.', try: '/api/ngos' },
    { method: 'GET', path: '/api/ngos/:id', access: 'Public', desc: 'One organization.', try: '/api/ngos/hope-foundation' },
    { method: 'POST', path: '/api/ngos', access: 'NGO account', desc: 'Create an organization.' },
    { method: 'PUT', path: '/api/ngos/:id', access: 'Owner only', desc: 'Update an organization.' },
    { method: 'DELETE', path: '/api/ngos/:id', access: 'Owner only', desc: 'Delete an organization.' },
  ] },
  { group: 'Events', items: [
    { method: 'GET', path: '/api/events', access: 'Public', desc: 'List events with live seat counts.', try: '/api/events' },
    { method: 'GET', path: '/api/events/me/registrations', access: 'Login', desc: 'Events the current user joined.' },
    { method: 'POST', path: '/api/events/:id/register', access: 'Login', desc: 'Join or leave an event (checks capacity).' },
  ] },
  { group: 'System', items: [
    { method: 'GET', path: '/api/stats', access: 'Public', desc: 'Live counts using MongoDB aggregation.', try: '/api/stats' },
    { method: 'GET', path: '/api/status', access: 'Public', desc: 'Server health, database state and recent requests.', try: '/api/status' },
    { method: 'GET', path: '/api/health', access: 'Public', desc: 'Simple health check.', try: '/api/health' },
  ] },
]

const stack = ['Node.js', 'Express.js', 'MongoDB Atlas', 'Mongoose', 'JWT', 'bcrypt', 'Helmet', 'Rate limiting', 'React', 'Vite', 'Tailwind CSS']

function endpointTables() {
  return endpoints.map((g) => `
    <h3>${g.group}</h3>
    <div class="scroll"><table class="tbl"><tbody>${g.items.map((e) => `
      <tr>
        <td class="m"><span class="badge ${e.method.toLowerCase()}">${e.method}</span></td>
        <td><code>${e.path}</code></td>
        <td>${e.desc}</td>
        <td><span class="acc">${e.access}</span></td>
        <td>${e.try ? `<a href="${e.try}" target="_blank" rel="noopener">Try it</a>` : ''}</td>
      </tr>`).join('')}</tbody></table></div>`).join('')
}

function landingPage() {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ImpactConnect API</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23145C3B'/%3E%3Cpath d='M16 24.5s-8.5-5.2-8.5-11A5 5 0 0 1 16 10.2 5 5 0 0 1 24.5 13.5c0 5.8-8.5 11-8.5 11z' fill='%23EFB05C'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--f900:#082A1B;--f800:#0B3A26;--f600:#145C3B;--f50:#EEF4F0;--s50:#FDFCF9;--s100:#F6F4EC;--s300:#DCD6C6;--amber:#E2A33D;--ink:#16241C}
*{box-sizing:border-box}body{margin:0;background:var(--s100);color:var(--ink);font-family:Inter,system-ui,sans-serif;line-height:1.5}
h1,h2,h3{font-family:Fraunces,Georgia,serif;color:var(--f900);margin:0}
.wrap{max-width:1080px;margin:0 auto;padding:0 24px}
.top{background:var(--f900);color:#fff}.top .wrap{display:flex;align-items:center;justify-content:space-between;height:64px}
.brand{display:flex;align-items:center;gap:10px;font-family:Fraunces,serif;font-size:18px;font-weight:600}
.logo{width:30px;height:30px;background:var(--amber);display:flex;align-items:center;justify-content:center}
.pill{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:500;border:1px solid rgba(255,255,255,.25);padding:6px 12px}
.dot{width:9px;height:9px;border-radius:50%;background:#4ade80;animation:pulse 1.8s infinite}.dot.off{background:#f87171;animation:none}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(74,222,128,.6)}70%{box-shadow:0 0 0 9px rgba(74,222,128,0)}100%{box-shadow:0 0 0 0 rgba(74,222,128,0)}}
.hero{background:var(--f50);border-bottom:1px solid var(--s300);padding:56px 0}
.hero h1{font-size:44px;line-height:1.1;margin-bottom:14px}.hero p{max-width:640px;color:rgba(22,36,28,.72);margin:0 0 24px;font-size:17px}
.btn{display:inline-block;padding:11px 22px;font-weight:500;text-decoration:none;margin-right:10px;font-size:14px}
.b1{background:var(--f600);color:#fff}.b2{border:1px solid var(--f600);color:var(--f600)}
section{padding:44px 0}h2{font-size:28px;margin-bottom:6px}.sub{color:rgba(22,36,28,.6);margin:0 0 22px;font-size:14px}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:16px}
.card{background:var(--s50);border:1px solid var(--s300);padding:18px 20px}.card small{color:rgba(22,36,28,.55);font-size:12px}
.card b{display:block;font-family:Fraunces,serif;font-size:30px;color:var(--f600);margin-top:2px}.card em{font-style:normal;font-size:12px;color:rgba(22,36,28,.5)}
.scroll{overflow-x:auto}.tbl{width:100%;border-collapse:collapse;background:var(--s50);border:1px solid var(--s300);font-size:14px}
.tbl td,.tbl th{padding:10px 14px;border-bottom:1px solid var(--s300);text-align:left;vertical-align:top}.tbl th{font-size:12px;color:rgba(22,36,28,.55);font-weight:500;background:var(--s100)}
code{font-family:ui-monospace,Consolas,monospace;font-size:13px;color:var(--f800)}
.badge{display:inline-block;min-width:58px;text-align:center;font-size:11px;font-weight:600;padding:3px 8px;color:#fff}
.get{background:var(--f600)}.post{background:#B7791F}.put{background:#2B6CB0}.delete{background:#C53030}
.acc{font-size:12px;border:1px solid var(--s300);padding:2px 8px;background:var(--s100);white-space:nowrap}
h3{font-size:19px;margin:26px 0 10px}a{color:var(--f600);font-weight:500}
.s2xx{color:#15803d}.s4xx{color:#b45309}.s5xx{color:#b91c1c}
.chips{display:flex;flex-wrap:wrap;gap:10px}.chip{border:1px solid var(--s300);background:var(--s50);padding:7px 14px;font-size:14px;font-weight:500;color:var(--f800)}
.flow{background:var(--f800);color:#fff;padding:20px 24px;font-size:15px;margin-top:8px}.flow span{color:var(--amber);font-weight:600}
footer{background:var(--f900);color:rgba(255,255,255,.6);text-align:center;padding:22px;font-size:13px}
.empty{padding:22px;text-align:center;color:rgba(22,36,28,.5)}
</style></head><body>
<header class="top"><div class="wrap">
  <div class="brand"><span class="logo"><svg width="16" height="16" viewBox="0 0 24 24" fill="#082A1B"><path d="M12 21s-8-4.9-8-10.4A4.6 4.6 0 0 1 12 8a4.6 4.6 0 0 1 8 2.6C20 16.1 12 21 12 21z"/></svg></span>ImpactConnect API</div>
  <div class="pill"><span class="dot" id="dot"></span><span id="pill">Checking…</span></div>
</div></header>

<div class="hero"><div class="wrap">
  <h1>The server behind ImpactConnect</h1>
  <p>A Node.js and Express API that talks to MongoDB Atlas and serves live data to the React website. Everything on this page updates in real time.</p>
  <a class="btn b1" href="http://localhost:5173" target="_blank" rel="noopener">Open the website</a>
  <a class="btn b2" href="/api" target="_blank" rel="noopener">Endpoints as JSON</a>
</div></div>

<section><div class="wrap">
  <h2>Live system status</h2><p class="sub">Refreshes every 3 seconds straight from the running server.</p>
  <div class="cards">
    <div class="card"><small>Server</small><b id="uptime">–</b><em id="node">Node.js</em></div>
    <div class="card"><small>Database</small><b id="db">–</b><em id="dbname">MongoDB Atlas</em></div>
    <div class="card"><small>Organizations</small><b id="ngos">–</b><em>in the ngos collection</em></div>
    <div class="card"><small>Events</small><b id="events">–</b><em>in the events collection</em></div>
    <div class="card"><small>Registered users</small><b id="users">–</b><em>in the users collection</em></div>
  </div>
  <div class="flow">Request flow: <span>React</span> sends a request &rarr; <span>Express</span> on <span>Node.js</span> checks and processes it &rarr; <span>Mongoose</span> reads or writes <span>MongoDB</span> &rarr; JSON response back to React</div>
</div></section>

<section style="padding-top:0"><div class="wrap">
  <h2>Live request log</h2><p class="sub">Use the website and watch the requests arrive here.</p>
  <div class="scroll"><table class="tbl"><thead><tr><th>Time</th><th>Method</th><th>Path</th><th>Status</th><th>Duration</th></tr></thead>
  <tbody id="log"><tr><td colspan="5" class="empty">No requests yet. Click around the website.</td></tr></tbody></table></div>
</div></section>

<section style="padding-top:0"><div class="wrap">
  <h2>API endpoints</h2><p class="sub">Every route this server exposes. Routes marked Login need a JWT token.</p>
  ${endpointTables()}
</div></section>

<section style="padding-top:0"><div class="wrap">
  <h2>Built with</h2><p class="sub">The MERN stack plus security basics.</p>
  <div class="chips">${stack.map((s) => `<span class="chip">${s}</span>`).join('')}</div>
</div></section>

<footer>ImpactConnect &middot; Node.js + Express + MongoDB &middot; Website at http://localhost:5173</footer>

<script>
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function up(s){var h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+'h ':'')+((m||h)?m+'m ':'')+x+'s'}
function set(id,v){document.getElementById(id).textContent=v}
function cls(n){return n>=500?'s5xx':n>=400?'s4xx':'s2xx'}
function refresh(){
  fetch('/api/status').then(function(r){return r.json()}).then(function(d){
    var on=d.status==='online';
    document.getElementById('dot').className='dot'+(on?'':' off');
    set('pill',on?'Online - port '+d.port:'Offline');
    set('uptime',up(d.uptimeSeconds));set('node','Node.js '+d.node);
    set('db',d.database.state==='connected'?'Connected':d.database.state);set('dbname','MongoDB: '+d.database.name);
    set('ngos',d.counts.ngos===null?'–':d.counts.ngos);set('events',d.counts.events===null?'–':d.counts.events);set('users',d.counts.users===null?'–':d.counts.users);
    var rows=d.recentRequests.map(function(r){
      return '<tr><td>'+new Date(r.time).toLocaleTimeString()+'</td><td><span class="badge '+r.method.toLowerCase()+'">'+esc(r.method)+'</span></td><td><code>'+esc(r.path)+'</code></td><td class="'+cls(r.status)+'">'+r.status+'</td><td>'+r.ms+' ms</td></tr>';
    }).join('');
    document.getElementById('log').innerHTML=rows||'<tr><td colspan="5" class="empty">No requests yet. Click around the website.</td></tr>';
  }).catch(function(){document.getElementById('dot').className='dot off';set('pill','Offline')});
}
refresh();setInterval(refresh,3000);
</script></body></html>`
}

module.exports = { landingPage, endpoints }
