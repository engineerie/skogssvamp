import{x as f,r as m,U as p,f as d,o as x,c as v,z as h,u as l,V as _}from"./entry.3aaf23f8.js";const I=["innerHTML"],g=f({__name:"nuxt-icon",props:{name:{},filled:{type:Boolean,default:!1}},async setup(u){let n,o;const a=u,c=m("");let i=!1;async function r(){try{const s=await Object.assign({"/assets/icons/Asset 1.svg":()=>_(()=>import("./Asset 1.146c3da1.js"),[],import.meta.url).then(t=>t.default),"/assets/icons/Asset 2.svg":()=>_(()=>import("./Asset 2.25b76e8f.js"),[],import.meta.url).then(t=>t.default)})[`/assets/icons/${a.name}.svg`]();s.includes("stroke")&&(i=!0),c.value=s}catch{console.error(`[nuxt-icons] Icon '${a.name}' doesn't exist in 'assets/icons'`)}}return[n,o]=p(()=>r()),await n,o(),d(r),(e,s)=>(x(),v("span",{class:h(["nuxt-icon",{"nuxt-icon--fill":!e.filled,"nuxt-icon--stroke":l(i)&&!e.filled}]),innerHTML:l(c)},null,10,I))}});export{g as default};
