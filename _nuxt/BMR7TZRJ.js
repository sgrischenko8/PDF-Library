import{_ as N}from"./CVo8TT1w.js";import{V as P,f as D,_ as B}from"./QP_2F6Ss.js";import{_ as R,r as n,n as j,c as $,u as t,s as w,w as o,v as y,a as i,d as p,t as _,b as r,x as z,q as x,o as v,p as M,e as A,y as O}from"./CJVNMOIT.js";import{V as q,u as G,a as H}from"./DU85qYpb.js";import{a as L,V as J,c as I}from"./DpEWxPBG.js";import"./Bxq0aJ9l.js";import"./CuiatCoy.js";const K=d=>(M("data-v-d86e2afc"),d=d(),A(),d),Q={key:1},W={class:"d-flex justify-space-between mb-4 ga-4"},X={class:"w-50"},Y={class:"bg-accent pa-4"},Z={class:"bg-accent mr-12"},ee={class:""},ae=K(()=>i("h1",{class:"mt-12 pb-4 d-flex"},"User Files",-1)),te=["onClick"],se={__name:"MyFiles",setup(d){const h=O(),c=n(null),b=n(!1),g=n(""),f=n(""),V=n(""),l=n([]),E=[{title:"Name",value:"originalname",sortable:!0},{title:"Page count",value:"numberOfPages",sortable:!0},{title:"Size (kb)",value:"size",sortable:!0},{title:"Format",value:"format"},{title:"Upload Date",value:"uploadDate",sortable:!0},{title:"Visibility",value:"visibility",sortable:!0},{title:"Delete",value:"delete",sortable:!1}];async function F(){const a=G("userId");if(!a.value){x("/");return}try{const e=await $fetch(`${h.public.apiUrl}/users/${a.value}`,{method:"GET",credentials:"include"});c.value=e,V.value=e.user._id,l.value=D(e.files)}catch(e){x("/"),console.error("Error fetching user data:",e)}}async function T(a){const e=l.value.findIndex(u=>u._id===a),m=l.value[e].visibility;try{await $fetch(`${h.public.apiUrl}/api/files/${a}`,{method:"PATCH",body:{visibility:!m},credentials:"include"}),l.value[e].visibility=!m}catch(u){console.error("Error fetching user data:",u)}}async function S(a){try{await $fetch(`${h.public.apiUrl}/api/files/${a}`,{method:"DELETE",credentials:"include"}),l.value=l.value.filter(e=>e._id!==a)}catch(e){console.error("Error fetching user data:",e)}}function k(a){a&&(g.value=a),b.value=!b.value}function U(a){const e=D([a])[0];l.value.push(e)}return j(()=>{F()}),(a,e)=>{const m=N,u=B;return v(),$("div",null,[t(c)?y("",!0):(v(),w(L,{key:0,fluid:""},{default:o(()=>[r(H,{class:"h-screen align-center justify-center"},{default:o(()=>[r(J,{size:70,width:7,color:"primary",indeterminate:""})]),_:1})]),_:1})),t(c)?(v(),$("div",Q,[i("div",W,[i("div",X,[i("div",Y,[i("p",Z,[p(" Name: "),i("b",null,_(t(c).user.name),1)]),i("p",ee,[p(" Email: "),i("b",null,_(t(c).user.email),1)])]),ae]),r(m,{userId:t(V),onSuccess:U},null,8,["userId"])]),r(q,{modelValue:t(f),"onUpdate:modelValue":e[0]||(e[0]=s=>z(f)?f.value=s:null),label:"Search","solo-inverted":"","prepend-inner-icon":"mdi-magnify"},null,8,["modelValue"]),r(P,{headers:E,items:t(l),"item-key":"_id",class:"elevation-1",search:t(f)},{"item.originalname":o(({item:s})=>[i("span",{class:"clickable",onClick:C=>k(s.path)},_(s.originalname),9,te)]),"item.visibility":o(({item:s})=>[r(I,{onClick:C=>T(s._id)},{default:o(()=>[p(_(s.visibility?"mdi-eye":"mdi-eye-off"),1)]),_:2},1032,["onClick"])]),"item.delete":o(({item:s})=>[r(I,{onClick:C=>S(s._id)},{default:o(()=>[p("mdi-delete")]),_:2},1032,["onClick"])]),_:1},8,["items","search"]),t(b)?(v(),w(u,{key:0,onClose:k,path:t(g)},null,8,["path"])):y("",!0)])):y("",!0)])}}},de=R(se,[["__scopeId","data-v-d86e2afc"]]);export{de as default};