import{_ as N}from"./DJn4zVr_.js";import{V as P,f as C,_ as B}from"./uF6R-b49.js";import{V as U,u as j,a as z}from"./DpbfRO9U.js";import{_ as M,r as n,n as R,c as D,u as a,s as w,w as l,v as b,a as i,d as _,t as p,b as r,x as A,q as x,o as h,p as O,e as q}from"./BmiqsMiB.js";import{a as G,V as H,c as $}from"./vx36mKL-.js";import"./BZVy-bjY.js";import"./BxSK9ZoM.js";const L=d=>(O("data-v-75be0901"),d=d(),q(),d),J={key:1},K={class:"d-flex justify-space-between mb-4 ga-4"},Q={class:"w-50"},W={class:"bg-accent pa-4"},X={class:"bg-accent mr-12"},Y={class:""},Z=L(()=>i("h1",{class:"mt-12 pb-4 d-flex"},"User Files",-1)),ee=["onClick"],te={__name:"MyFiles",setup(d){const c=n(null),v=n(!1),y=n(""),m=n(""),g=n(""),o=n([]),I=[{title:"Name",value:"originalname",sortable:!0},{title:"Page count",value:"numberOfPages",sortable:!0},{title:"Size (kb)",value:"size",sortable:!0},{title:"Format",value:"format"},{title:"Upload Date",value:"uploadDate",sortable:!0},{title:"Visibility",value:"visibility",sortable:!0},{title:"Delete",value:"delete",sortable:!1}];async function E(){const t=j("userId");if(!t.value){x("/");return}try{const e=await $fetch(`http://localhost:3001/users/${t.value}`,{method:"GET",credentials:"include"});c.value=e,g.value=e.user._id,o.value=C(e.files)}catch(e){x("/"),console.error("Error fetching user data:",e)}}async function F(t){const e=o.value.findIndex(u=>u._id===t),f=o.value[e].visibility;try{await $fetch(`http://localhost:3001/api/files/${t}`,{method:"PATCH",body:{visibility:!f},credentials:"include"}),o.value[e].visibility=!f}catch(u){console.error("Error fetching user data:",u)}}async function T(t){try{await $fetch(`http://localhost:3001/api/files/${t}`,{method:"DELETE",credentials:"include"}),o.value=o.value.filter(e=>e._id!==t)}catch(e){console.error("Error fetching user data:",e)}}function V(t){t&&(y.value=t),v.value=!v.value}function S(t){const e=C([t])[0];o.value.push(e)}return R(()=>{E()}),(t,e)=>{const f=N,u=B;return h(),D("div",null,[a(c)?b("",!0):(h(),w(G,{key:0,fluid:""},{default:l(()=>[r(z,{class:"h-screen align-center justify-center"},{default:l(()=>[r(H,{size:70,width:7,color:"primary",indeterminate:""})]),_:1})]),_:1})),a(c)?(h(),D("div",J,[i("div",K,[i("div",Q,[i("div",W,[i("p",X,[_(" Name: "),i("b",null,p(a(c).user.name),1)]),i("p",Y,[_(" Email: "),i("b",null,p(a(c).user.email),1)])]),Z]),r(f,{userId:a(g),onSuccess:S},null,8,["userId"])]),r(U,{modelValue:a(m),"onUpdate:modelValue":e[0]||(e[0]=s=>A(m)?m.value=s:null),label:"Search","solo-inverted":"","prepend-inner-icon":"mdi-magnify"},null,8,["modelValue"]),r(P,{headers:I,items:a(o),"item-key":"_id",class:"elevation-1",search:a(m)},{"item.originalname":l(({item:s})=>[i("span",{class:"clickable",onClick:k=>V(s.path)},p(s.originalname),9,ee)]),"item.visibility":l(({item:s})=>[r($,{onClick:k=>F(s._id)},{default:l(()=>[_(p(s.visibility?"mdi-eye":"mdi-eye-off"),1)]),_:2},1032,["onClick"])]),"item.delete":l(({item:s})=>[r($,{onClick:k=>T(s._id)},{default:l(()=>[_("mdi-delete")]),_:2},1032,["onClick"])]),_:1},8,["items","search"]),a(v)?(h(),w(u,{key:0,onClose:V,path:a(y)},null,8,["path"])):b("",!0)])):b("",!0)])}}},ce=M(te,[["__scopeId","data-v-75be0901"]]);export{ce as default};
