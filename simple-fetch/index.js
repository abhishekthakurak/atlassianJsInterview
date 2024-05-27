var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};Object.defineProperty(module.exports,"simpleFetch",{get:()=>E,set:void 0,enumerable:!0,configurable:!0});const t=(e,t)=>({status:e,errorMessage:t}),r=(e,t)=>({status:e,response:t}),n=e=>"errorMessage"in e,o=(e,t)=>Math.abs(e+(t-e)*Math.random()),s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=(e=14)=>Array.from({length:e},()=>s[Math.floor(Math.random()*s.length)]).join(""),a=3e3;class u{tokens=new Map;hasToken=e=>this.tokens.has(e);createToken=(e=!1,t=a)=>{let r=i(),n={token:r,...e?{expires:Date.now()+t-200}:{}};return e&&setTimeout(()=>{this.tokens.delete(r)},t),this.tokens.set(r,n),n};clearAll=()=>this.tokens.clear()}const l=new u,h=(e,t,r="GET")=>({path:e,handler:t,method:r}),d=(...e)=>t=>e.reverse().reduce((e,t)=>t(e),t),c=e=>{let{path:r,handler:n,method:o}=e;return h(r,e=>{var r,o;let{headers:s}=e,[i,a]=null!==(r=null==s||null===(o=s.Authorization)||void 0===o?void 0:o.toString().split(" "))&&void 0!==r?r:[];return"Bearer"===i&&a?l.hasToken(a)?n(e):t(401,"Access token is invalid"):t(400,"No access token was provided")},o)},p=new class{maxCount=-1;currentCount=0;isRunning=!1;set(e){e<=0||(this.maxCount=e,this.currentCount=0,this.isRunning=!0)}tick(){return this.currentCount<this.maxCount?(this.currentCount+=1,!0):(this.maxCount=-1,this.currentCount=0,this.isRunning=!1,!1)}},m=h("/hello",()=>r(200,{hello:"world"})),f=(e,n=!1)=>h(e,({body:e,headers:o})=>{if(e&&void 0!==e.apiKey){if("4a8e3990b0e0559b77430f4ddb28a3cb"===e.apiKey){let e=n&&o&&"number"==typeof o.ttl?Math.abs(o.ttl):void 0;return r(200,l.createToken(n,e))}return t(401,"Provided API Key is invalid")}return t(400,"API Key was not provided")},"POST"),g=f("/api/auth"),T=f("/api/2/auth",!0),b=()=>{let e=i(5);return r(200,{id:e,authorId:`author-${i(3)}`,title:`This is blog ${e}`,summary:`A brief summary of blog ${e}`})},v=h("/api/blog/latest",b),k=h("/api/2/blog/latest",b),w=e=>new Promise((t,r)=>{setTimeout(()=>{n(e)?r(e):t(e)},o(25,100))});class y{routes={GET:{},POST:{},DELETE:{},PUT:{}};constructor(e){e.forEach(e=>{this.routes[e.method][e.path]={...e}})}static makeFetch(e){return new y(e).fetch}getRoute(e,t){var r;return null===(r=this.routes)||void 0===r||null===(r=r[t])||void 0===r?void 0:r[e]}fetch=(e,r={})=>{let{method:n="GET"}=r;if(!["GET","POST","PUT","DELETE"].includes(n.toUpperCase()))return w(t(400,"Unsupported HTTP request method"));let o=n.toUpperCase(),s=this.getRoute(e,o);return w(s?s.handler(r):t(404,"The requested resource could not be found"))}}const E=y.makeFetch([m,g,T,d(c)(v),d(c,((e=0)=>r=>{let{path:n,handler:o,method:s}=r;return h(n,r=>{let{headers:n}=r,s="number"==typeof(null==n?void 0:n.forceErrors)?n.forceErrors:e;return(s&&!p.isRunning&&p.set(s),p.isRunning&&p.tick())?t(500,"Something went wrong"):o(r)},s)})(1))(k)]);e.simpleFetch=E;