document.addEventListener("DOMContentLoaded",()=>{

let p=location.pathname;
let u=location.href;
let t=document.querySelector("h1")?.innerText||document.title;
let pt=document.body.innerText||"";
let d=document.querySelector("time")?.getAttribute("datetime")||"";
let o="PostFre";
let dr=document.querySelector('meta[name="description"]')?.content||"";

let parts=p.split("/").filter(Boolean);
let seg=parts[0]||null;
let isCountry=seg&&/^[a-z]{2}$/.test(seg);
let countryCode=isCountry?seg.toUpperCase():null;
let countryLabel=isCountry?seg.toUpperCase():null;

let BASE_URL=isCountry
  ?`https://www.postfre.com/${seg}/`
  :"https://www.postfre.com/";

(function(){
  let h=p;
  if(h.endsWith("/"))h+="index.html";
  if(!h.endsWith(".html")&&h.includes("/blog/"))h+=".html";
  let c=location.origin+h;
  let l=document.querySelector('link[rel="canonical"]')||document.createElement("link");
  l.rel="canonical";
  l.href=c;
  l.parentNode||document.head.appendChild(l);
})();

function ed(r,p,t){
  r=r.replace(/\s+/g," ").trim();
  let f=p.split(".")[0];
  if(!r&&f.length>40&&f.length<200)r=f.trim();
  let ct=t.replace(/[^a-zA-Z0-9 ]/g,"");
  let k=ct.split(" ")[0];
  if(k&&!r.toLowerCase().includes(k.toLowerCase()))r=ct+": "+r;
  let geo=countryLabel||"Worldwide";
  ["free classifieds",geo,"property","jobs","services"].forEach(x=>{
    if(!r.toLowerCase().includes(x.toLowerCase()))r+=", "+x;
  });
  return r.length>155?r.substring(0,152)+"...":r;
}

let desc=ed(dr,pt,t);
let g=[];
let a=n=>g.push(n);

a({"@type":"WebSite",name:o,url:BASE_URL});

let lb={
  "@type":"LocalBusiness",
  name:o,
  url:BASE_URL,
  description:countryCode
    ?`PostFre is a free classifieds platform for property, jobs, services and items for sale in ${countryLabel}.`
    :"PostFre is a free classifieds platform for property, jobs, services and items for sale worldwide."
};

if(countryCode){
  lb.address={"@type":"PostalAddress",addressCountry:countryCode};
}

a(lb);

if(p!=="/"&&p!=="/index.html"){
  let crumbs=[];
  let run=isCountry?`/${seg}/`:"/";
  crumbs.push({"@type":"ListItem",position:0,name:"Home",item:BASE_URL});
  parts.slice(isCountry?1:0).forEach((s,i)=>{
    let clean=s.replace(/\.html$/,"");
    run+=clean+"/";
    crumbs.push({
      "@type":"ListItem",
      position:i+1,
      name:clean.replace(/[-_]/g," ").replace(/\b\w/g,m=>m.toUpperCase()),
      item:location.origin+run
    });
  });
  a({"@type":"BreadcrumbList",itemListElement:crumbs});
}

if(p==="/"||p==="/index.html"){
  a({"@type":"WebPage",name:"PostFre — Free Classified Listings Worldwide",description:desc,url:u});
}

if(isCountry&&(p===`/${seg}/`||p===`/${seg}/index.html`)){
  a({"@type":"WebPage",name:`PostFre — Free Classified Listings in ${countryLabel}`,description:desc,url:u});
}

if(p.includes("/about")){
  a({"@type":"AboutPage",name:t,description:desc,url:u});
}

if(p.includes("/listings")){
  a({"@type":"CollectionPage",name:countryLabel?`All Listings — PostFre ${countryLabel}`:"All Listings — PostFre",description:desc,url:u});
}

if(p.endsWith("/blog/")||p.endsWith("/blog/index.html")){
  a({"@type":"CollectionPage",name:countryLabel?`PostFre Blog — ${countryLabel}`:"PostFre Blog",description:desc,url:u});
}

if(p.includes("/blog/")&&p.endsWith(".html")){
  a({"@type":"BlogPosting",headline:t,description:desc,datePublished:d||new Date().toISOString(),author:{ "@type":"Organization",name:o},mainEntityOfPage:u});
}

let fi=[...document.querySelectorAll(".faq-item")];
if(fi.length>1){
  a({
    "@type":"FAQPage",
    mainEntity:fi.map(x=>{
      let q=x.querySelector("strong")?.innerText;
      let a1=x.querySelector("p")?.innerText;
      return q&&a1?{"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a1}}:null;
    }).filter(Boolean)
  });
}

if(!g.length){
  a({"@type":"WebPage",name:t,description:desc,url:u});
}

let sc=document.createElement("script");
sc.type="application/ld+json";
sc.textContent=JSON.stringify({"@context":"https://schema.org","@graph":g});
document.head.appendChild(sc);

});
