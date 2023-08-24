import{bf as _e,O as j,r as B,aJ as O,a1 as Z,al as Ce,aV as ee,I as S,o as Se,b as I,aY as Be,aw as F,bg as te,R as He,b9 as Me,S as N,a_ as We,ag as de,bh as Le,a$ as Pe,c as p,ah as fe,bi as Re,b0 as Ae,bj as $e,b4 as ze,bk as Ke,bl as Fe,aX as De,bm as je,bn as ne,av as Oe,bo as Ie,e as W,a3 as he,a2 as Ne,bp as Qe,aO as Ve,bq as Ue,Q as ve,br as Xe,bs as Ye,as as Ge,aT as Je,bt as Ze,bu as et}from'./entry.262740d5.js';const oe=['B','KB','MB','GB','TB','PB'];function dt(e){let t=0;for(;parseInt(e,10)>=1024&&t<oe.length-1;)e/=1024,++t;return`${e.toFixed(1)}${oe[t]}`}function ft(e,t,o){return o<=t?t:Math.min(o,Math.max(t,e))}function ht(e,t,o){if(o<=t)return t;const n=o-t+1;let l=t+(e-t)%n;return l<t&&(l=n+l),l===0?0:l}function vt(e,t=2,o='0'){if(e==null)return e;const n=''+e;return n.length>=t?n:new Array(t-n.length+1).join(o)+n}function tt(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),_e.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}const nt={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function ot({showing:e,avoidEmit:t,configureAnchorEl:o}){const{props:n,proxy:l,emit:d}=j(),a=B(null);let h=null;function v(i){return a.value===null?!1:i===void 0||i.touches===void 0||i.touches.length<=1}const c={};o===void 0&&(Object.assign(c,{hide(i){l.hide(i)},toggle(i){l.toggle(i),i.qAnchorHandled=!0},toggleKey(i){O(i,13)===!0&&c.toggle(i)},contextClick(i){l.hide(i),Z(i),Ce(()=>{l.show(i),i.qAnchorHandled=!0})},prevent:Z,mobileTouch(i){if(c.mobileCleanup(i),v(i)!==!0)return;l.hide(i),a.value.classList.add('non-selectable');const s=i.target;ee(c,'anchor',[[s,'touchmove','mobileCleanup','passive'],[s,'touchend','mobileCleanup','passive'],[s,'touchcancel','mobileCleanup','passive'],[a.value,'contextmenu','prevent','notPassive']]),h=setTimeout(()=>{h=null,l.show(i),i.qAnchorHandled=!0},300)},mobileCleanup(i){a.value.classList.remove('non-selectable'),h!==null&&(clearTimeout(h),h=null),e.value===!0&&i!==void 0&&tt()}}),o=function(i=n.contextMenu){if(n.noParentEvent===!0||a.value===null)return;let s;i===!0?l.$q.platform.is.mobile===!0?s=[[a.value,'touchstart','mobileTouch','passive']]:s=[[a.value,'mousedown','hide','passive'],[a.value,'contextmenu','contextClick','notPassive']]:s=[[a.value,'click','toggle','passive'],[a.value,'keyup','toggleKey','passive']],ee(c,'anchor',s)});function f(){Be(c,'anchor')}function m(i){for(a.value=i;a.value.classList.contains('q-anchor--skip');)a.value=a.value.parentNode;o()}function b(){if(n.target===!1||n.target===''||l.$el.parentNode===null)a.value=null;else if(n.target===!0)m(l.$el.parentNode);else{let i=n.target;if(typeof n.target=='string')try{i=document.querySelector(n.target)}catch{i=void 0}i!=null?(a.value=i.$el||i,o()):(a.value=null,console.error(`Anchor: target "${n.target}" not found`))}}return S(()=>n.contextMenu,i=>{a.value!==null&&(f(),o(i))}),S(()=>n.target,()=>{a.value!==null&&f(),b()}),S(()=>n.noParentEvent,i=>{a.value!==null&&(i===!0?f():o())}),Se(()=>{b(),t!==!0&&n.modelValue===!0&&a.value===null&&d('update:modelValue',!1)}),I(()=>{h!==null&&clearTimeout(h),f()}),{anchorEl:a,canShow:v,anchorEvents:c}}function lt(e,t){const o=B(null);let n;function l(h,v){const c=`${v!==void 0?'add':'remove'}EventListener`,f=v!==void 0?v:n;h!==window&&h[c]('scroll',f,F.passive),window[c]('scroll',f,F.passive),n=v}function d(){o.value!==null&&(l(o.value),o.value=null)}const a=S(()=>e.noParentEvent,()=>{o.value!==null&&(d(),t())});return I(a),{localScrollTarget:o,unconfigureScrollTarget:d,changeScrollEvent:l}}const{notPassiveCapture:L}=F,E=[];function P(e){const t=e.target;if(t===void 0||t.nodeType===8||t.classList.contains('no-pointer-events')===!0)return;let o=te.length-1;for(;o>=0;){const n=te[o].$;if(n.type.name==='QTooltip'){o--;continue}if(n.type.name!=='QDialog')break;if(n.props.seamless!==!0)return;o--}for(let n=E.length-1;n>=0;n--){const l=E[n];if((l.anchorEl.value===null||l.anchorEl.value.contains(t)===!1)&&(t===document.body||l.innerRef.value!==null&&l.innerRef.value.contains(t)===!1))e.qClickOutside=!0,l.onClickOutside(e);else return}}function it(e){E.push(e),E.length===1&&(document.addEventListener('mousedown',P,L),document.addEventListener('touchstart',P,L))}function le(e){const t=E.findIndex(o=>o===e);t>-1&&(E.splice(t,1),E.length===0&&(document.removeEventListener('mousedown',P,L),document.removeEventListener('touchstart',P,L)))}let ie,ae;function ue(e){const t=e.split(' ');return t.length!==2?!1:['top','center','bottom'].includes(t[0])!==!0?(console.error('Anchor/Self position must start with one of top/center/bottom'),!1):['left','middle','right','start','end'].includes(t[1])!==!0?(console.error('Anchor/Self position must end with one of left/middle/right/start/end'),!1):!0}function at(e){return e?!(e.length!==2||typeof e[0]!='number'||typeof e[1]!='number'):!0}const D={'start#ltr':'left','start#rtl':'right','end#ltr':'right','end#rtl':'left'};['left','middle','right'].forEach(e=>{D[`${e}#ltr`]=e,D[`${e}#rtl`]=e});function se(e,t){const o=e.split(' ');return{vertical:o[0],horizontal:D[`${o[1]}#${t===!0?'rtl':'ltr'}`]}}function ut(e,t){let{top:o,left:n,right:l,bottom:d,width:a,height:h}=e.getBoundingClientRect();return t!==void 0&&(o-=t[1],n-=t[0],d+=t[1],l+=t[0],a+=t[0],h+=t[1]),{top:o,bottom:d,height:h,left:n,right:l,width:a,middle:n+(l-n)/2,center:o+(d-o)/2}}function st(e,t,o){let{top:n,left:l}=e.getBoundingClientRect();return n+=t.top,l+=t.left,o!==void 0&&(n+=o[1],l+=o[0]),{top:n,bottom:n+1,height:1,left:l,right:l+1,width:1,middle:l,center:n}}function rt(e,t){return{top:0,center:t/2,bottom:t,left:0,middle:e/2,right:e}}function re(e,t,o,n){return{top:e[o.vertical]-t[n.vertical],left:e[o.horizontal]-t[n.horizontal]}}function me(e,t=0){if(e.targetEl===null||e.anchorEl===null||t>5)return;if(e.targetEl.offsetHeight===0||e.targetEl.offsetWidth===0){setTimeout(()=>{me(e,t+1)},10);return}const{targetEl:o,offset:n,anchorEl:l,anchorOrigin:d,selfOrigin:a,absoluteOffset:h,fit:v,cover:c,maxHeight:f,maxWidth:m}=e;if(He.is.ios===!0&&window.visualViewport!==void 0){const C=document.body.style,{offsetLeft:y,offsetTop:k}=window.visualViewport;y!==ie&&(C.setProperty('--q-pe-left',y+'px'),ie=y),k!==ae&&(C.setProperty('--q-pe-top',k+'px'),ae=k)}const{scrollLeft:b,scrollTop:i}=o,s=h===void 0?ut(l,c===!0?[0,0]:n):st(l,h,n);Object.assign(o.style,{top:0,left:0,minWidth:null,minHeight:null,maxWidth:m||'100vw',maxHeight:f||'100vh',visibility:'visible'});const{offsetWidth:T,offsetHeight:w}=o,{elWidth:_,elHeight:H}=v===!0||c===!0?{elWidth:Math.max(s.width,T),elHeight:c===!0?Math.max(s.height,w):w}:{elWidth:T,elHeight:w};let r={maxWidth:m,maxHeight:f};(v===!0||c===!0)&&(r.minWidth=s.width+'px',c===!0&&(r.minHeight=s.height+'px')),Object.assign(o.style,r);const x=rt(_,H);let g=re(s,x,d,a);if(h===void 0||n===void 0)K(g,s,x,d,a);else{const{top:C,left:y}=g;K(g,s,x,d,a);let k=!1;if(g.top!==C){k=!0;const q=2*n[1];s.center=s.top-=q,s.bottom-=q+2}if(g.left!==y){k=!0;const q=2*n[0];s.middle=s.left-=q,s.right-=q+2}k===!0&&(g=re(s,x,d,a),K(g,s,x,d,a))}r={top:g.top+'px',left:g.left+'px'},g.maxHeight!==void 0&&(r.maxHeight=g.maxHeight+'px',s.height>g.maxHeight&&(r.minHeight=r.maxHeight)),g.maxWidth!==void 0&&(r.maxWidth=g.maxWidth+'px',s.width>g.maxWidth&&(r.minWidth=r.maxWidth)),Object.assign(o.style,r),o.scrollTop!==i&&(o.scrollTop=i),o.scrollLeft!==b&&(o.scrollLeft=b)}function K(e,t,o,n,l){const d=o.bottom,a=o.right,h=Me(),v=window.innerHeight-h,c=document.body.clientWidth;if(e.top<0||e.top+d>v)if(l.vertical==='center')e.top=t[n.vertical]>v/2?Math.max(0,v-d):0,e.maxHeight=Math.min(d,v);else if(t[n.vertical]>v/2){const f=Math.min(v,n.vertical==='center'?t.center:n.vertical===l.vertical?t.bottom:t.top);e.maxHeight=Math.min(d,f),e.top=Math.max(0,f-d)}else e.top=Math.max(0,n.vertical==='center'?t.center:n.vertical===l.vertical?t.top:t.bottom),e.maxHeight=Math.min(d,v-e.top);if(e.left<0||e.left+a>c)if(e.maxWidth=Math.min(a,c),l.horizontal==='middle')e.left=t[n.horizontal]>c/2?Math.max(0,c-a):0;else if(t[n.horizontal]>c/2){const f=Math.min(c,n.horizontal==='middle'?t.middle:n.horizontal===l.horizontal?t.right:t.left);e.maxWidth=Math.min(a,f),e.left=Math.max(0,f-e.maxWidth)}else e.left=Math.max(0,n.horizontal==='middle'?t.middle:n.horizontal===l.horizontal?t.left:t.right),e.maxWidth=Math.min(a,c-e.left)}const mt=N({name:'QMenu',inheritAttrs:!1,props:{...nt,...We,...de,...Le,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:ue},self:{type:String,validator:ue},offset:{type:Array,validator:at},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...Pe,'click','escapeKey'],setup(e,{slots:t,emit:o,attrs:n}){let l=null,d,a,h;const v=j(),{proxy:c}=v,{$q:f}=c,m=B(null),b=B(!1),i=p(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),s=fe(e,f),{registerTick:T,removeTick:w}=Re(),{registerTimeout:_}=Ae(),{transitionProps:H,transitionStyle:r}=$e(e),{localScrollTarget:x,changeScrollEvent:g,unconfigureScrollTarget:C}=lt(e,G),{anchorEl:y,canShow:k}=ot({showing:b}),{hide:q}=ze({showing:b,canShow:k,handleShow:pe,handleHide:ke,hideOnRouteChange:i,processOnMount:!0}),{showPortal:Q,hidePortal:V,renderPortal:ge}=Ke(v,m,we,'menu'),R={anchorEl:y,innerRef:m,onClickOutside(u){if(e.persistent!==!0&&b.value===!0)return q(u),(u.type==='touchstart'||u.target.classList.contains('q-dialog__backdrop'))&&ve(u),!0}},U=p(()=>se(e.anchor||(e.cover===!0?'center middle':'bottom start'),f.lang.rtl)),be=p(()=>e.cover===!0?U.value:se(e.self||'top start',f.lang.rtl)),xe=p(()=>(e.square===!0?' q-menu--square':'')+(s.value===!0?' q-menu--dark q-dark':'')),ye=p(()=>e.autoClose===!0?{onClick:qe}:{}),X=p(()=>b.value===!0&&e.persistent!==!0);S(X,u=>{u===!0?(Qe($),it(R)):(ne($),le(R))});function A(){Ve(()=>{let u=m.value;u&&u.contains(document.activeElement)!==!0&&(u=u.querySelector('[autofocus][tabindex], [data-autofocus][tabindex]')||u.querySelector('[autofocus] [tabindex], [data-autofocus] [tabindex]')||u.querySelector('[autofocus], [data-autofocus]')||u,u.focus({preventScroll:!0}))})}function pe(u){if(l=e.noRefocus===!1?document.activeElement:null,Fe(J),Q(),G(),d=void 0,u!==void 0&&(e.touchPosition||e.contextMenu)){const z=De(u);if(z.left!==void 0){const{top:Ee,left:Te}=y.value.getBoundingClientRect();d={left:z.left-Te,top:z.top-Ee}}}a===void 0&&(a=S(()=>f.screen.width+'|'+f.screen.height+'|'+e.self+'|'+e.anchor+'|'+f.lang.rtl,M)),e.noFocus!==!0&&document.activeElement.blur(),T(()=>{M(),e.noFocus!==!0&&A()}),_(()=>{f.platform.is.ios===!0&&(h=e.autoClose,m.value.click()),M(),Q(!0),o('show',u)},e.transitionDuration)}function ke(u){w(),V(),Y(!0),l!==null&&(u===void 0||u.qClickOutside!==!0)&&(((u&&u.type.indexOf('key')===0?l.closest('[tabindex]:not([tabindex^="-"])'):void 0)||l).focus(),l=null),_(()=>{V(!0),o('hide',u)},e.transitionDuration)}function Y(u){d=void 0,a!==void 0&&(a(),a=void 0),(u===!0||b.value===!0)&&(je(J),C(),le(R),ne($)),u!==!0&&(l=null)}function G(){(y.value!==null||e.scrollTarget!==void 0)&&(x.value=Oe(y.value,e.scrollTarget),g(x.value,M))}function qe(u){h!==!0?(Ie(c,u),o('click',u)):h=!1}function J(u){X.value===!0&&e.noFocus!==!0&&Ue(m.value,u.target)!==!0&&A()}function $(u){o('escapeKey'),q(u)}function M(){me({targetEl:m.value,offset:e.offset,anchorEl:y.value,anchorOrigin:U.value,selfOrigin:be.value,absoluteOffset:d,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function we(){return W(Ne,H.value,()=>b.value===!0?W('div',{role:'menu',...n,ref:m,tabindex:-1,class:['q-menu q-position-engine scroll'+xe.value,n.class],style:[n.style,r.value],...ye.value},he(t.default)):null)}return I(Y),Object.assign(c,{focus:A,updatePosition:M}),ge}}),gt=N({name:'QItem',props:{...de,...Xe,tag:{type:String,default:'div'},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:['click','keyup'],setup(e,{slots:t,emit:o}){const{proxy:{$q:n}}=j(),l=fe(e,n),{hasLink:d,linkAttrs:a,linkClass:h,linkTag:v,navigateOnClick:c}=Ye(),f=B(null),m=B(null),b=p(()=>e.clickable===!0||d.value===!0||e.tag==='label'),i=p(()=>e.disable!==!0&&b.value===!0),s=p(()=>'q-item q-item-type row no-wrap'+(e.dense===!0?' q-item--dense':'')+(l.value===!0?' q-item--dark':'')+(d.value===!0&&e.active===null?h.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:''}`:'')+(e.disable===!0?' disabled':'')+(i.value===!0?' q-item--clickable q-link cursor-pointer '+(e.manualFocus===!0?'q-manual-focusable':'q-focusable q-hoverable')+(e.focused===!0?' q-manual-focusable--focused':''):'')),T=p(()=>e.insetLevel===void 0?null:{['padding'+(n.lang.rtl===!0?'Right':'Left')]:16+e.insetLevel*56+'px'});function w(r){i.value===!0&&(m.value!==null&&(r.qKeyEvent!==!0&&document.activeElement===f.value?m.value.focus():document.activeElement===m.value&&f.value.focus()),c(r))}function _(r){if(i.value===!0&&O(r,13)===!0){ve(r),r.qKeyEvent=!0;const x=new MouseEvent('click',r);x.qKeyEvent=!0,f.value.dispatchEvent(x)}o('keyup',r)}function H(){const r=Ge(t.default,[]);return i.value===!0&&r.unshift(W('div',{class:'q-focus-helper',tabindex:-1,ref:m})),r}return()=>{const r={ref:f,class:s.value,style:T.value,role:'listitem',onClick:w,onKeyup:_};return i.value===!0?(r.tabindex=e.tabindex||'0',Object.assign(r,a.value)):b.value===!0&&(r['aria-disabled']='true'),W(v.value,r,H())}}}),bt=N({name:'QItemSection',props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:t}){const o=p(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?'side':'main'}`+(e.top===!0?' q-item__section--top justify-start':' justify-center')+(e.avatar===!0?' q-item__section--avatar':'')+(e.thumbnail===!0?' q-item__section--thumbnail':'')+(e.noWrap===!0?' q-item__section--nowrap':''));return()=>W('div',{class:o.value},he(t.default))}});function ce(e){if(e===!1)return 0;if(e===!0||e===void 0)return 1;const t=parseInt(e,10);return isNaN(t)?0:t}const xt=Je({name:'close-popup',beforeMount(e,{value:t}){const o={depth:ce(t),handler(n){o.depth!==0&&setTimeout(()=>{const l=Ze(e);l!==void 0&&et(l,n,o.depth)})},handlerKey(n){O(n,13)===!0&&o.handler(n)}};e.__qclosepopup=o,e.addEventListener('click',o.handler),e.addEventListener('keyup',o.handlerKey)},updated(e,{value:t,oldValue:o}){t!==o&&(e.__qclosepopup.depth=ce(t))},beforeUnmount(e){const t=e.__qclosepopup;e.removeEventListener('click',t.handler),e.removeEventListener('keyup',t.handlerKey),delete e.__qclosepopup}});export{bt as _,gt as a,xt as b,mt as c,ot as d,tt as e,ft as f,dt as h,ht as n,vt as p,nt as u}