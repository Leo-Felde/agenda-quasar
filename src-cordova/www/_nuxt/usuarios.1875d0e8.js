import{_ as b,r as n,o as U,k as v,l as k,q as t,s as f,A as w,M as N,C as g,v as q,m as x,G as y,F as C,H as V}from'./entry.262740d5.js';import{d as h}from'./promptDialog.55ad8c7a.js';import{a as D}from'./DialogoCrud.b0f606bf.js';import{_ as B}from'./DialogoUsuario.dc9c2d83.js';import{s as A}from'./index.a988fc85.js';import{m as E,f as F}from'./usuarios.bd8c83a0.js';import'./ClosePopup.8a3daebd.js';import'./QList.c13a3d38.js';const z=[{name:'nome',field:'nome',label:'Nome',align:'left',sortable:!0},{name:'username',field:'username',label:'Nome de usuário',align:'center',sortable:!0},{name:'cpf',field:'cpf',label:'Cpf',sortable:!0},{name:'email',field:'email',label:'E-mail',sortable:!0},{name:'telefone',field:'telefone',label:'Telefone',sortable:!0},{name:'dataNascimento',field:'dataNascimento',label:'Data de nascimento',sortable:!0}],K={setup(){const r=n(''),e=n([]),l=n({}),o=n(!1),i=n(!1);U(()=>{u()});const p=(m,s)=>{l.value=s,i.value=!0},d=()=>{l.value={},i.value=!0},u=async(m=!1)=>{o.value=!0;try{const s={termo:m&&r.value||''},_=await E.pesquisar(s);e.value=_.data.map(c=>{const a={...c};return a.dataNascimento=F(c.dataNascimento),a})}catch(s){console.error(s),A('Não foi possível listar os usuários')}finally{o.value=!1}};return{columns:z,search:r,showDialog:i,loading:o,usuarios:e,usuarioSelecionado:l,editarUsuario:p,novoUsuario:d,listarUsuarios:u}}},M=x('span',{class:'text-h6 q-my-auto'},'Usuários',-1);function R(r,e,l,o,i,p){const d=y,u=C,m=h,s=V,_=D,c=B;return v(),k('div',null,[t(_,{class:'sticky-header',flat:'',bordered:'',rows:o.usuarios,columns:o.columns,loading:o.loading,'row-key':'field',onRowClick:o.editarUsuario},{top:f(()=>[M,r.$q.screen.lt.md?g('',!0):(v(),w(u,{key:0,modelValue:o.search,'onUpdate:modelValue':e[1]||(e[1]=a=>o.search=a),class:'q-ml-sm',dense:'',rounded:'',standout:'',clearable:'',placeholder:'Pesquisar',onKeyup:e[2]||(e[2]=N(a=>o.listarUsuarios(!0),['enter'])),onClear:e[3]||(e[3]=a=>o.listarUsuarios())},{append:f(()=>[t(d,{name:'search',class:'cursor-pointer',onClick:e[0]||(e[0]=a=>o.listarUsuarios(!0))})]),_:1},8,['modelValue'])),t(m),t(s,{color:'primary','icon-right':'add',onClick:o.novoUsuario},{default:f(()=>[q(' Novo usuário ')]),_:1},8,['onClick'])]),_:1},8,['rows','columns','loading','onRowClick']),t(c,{modelValue:o.showDialog,'onUpdate:modelValue':e[4]||(e[4]=a=>o.showDialog=a),usuario:o.usuarioSelecionado,onAtualizar:o.listarUsuarios},null,8,['modelValue','usuario','onAtualizar'])])}const L=b(K,[['render',R]]);export{L as default}