if(!document.getElementById("leckerli-font")){
  const l=document.createElement("link");
  l.id="leckerli-font";
  l.rel="stylesheet";
  l.href="https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap";
  document.head.appendChild(l);
}

document.addEventListener("DOMContentLoaded",()=>{

let parts=location.pathname.split("/").filter(Boolean);
let seg=parts[0]||"";
let isCountry=/^[a-z]{2}$/.test(seg);

if(isCountry){
  localStorage.setItem("pf_country",seg);
}

let saved=localStorage.getItem("pf_country");
let base=isCountry?`/${seg}`:(saved?`/${saved}`:"");

const navHTML=`
<nav class="navbar">
  <div class="nav-container">

  <a href="${base||"/"}" class="nav-logo"
   style="display:flex;flex-direction:column;line-height:1.1;text-decoration:none;padding:4px 0;">
    <span style="font-size:16px;font-family:Poppins,sans-serif;">
      <span style="font-weight:600;color:#2563EB;font-family:'Leckerli One',cursive;">P</span><span style="font-weight:600;color:#2563EB;">ost</span><span style="font-weight:600;color:#14B8A6;">Fre</span><span style="font-weight:400;color:#9CA3AF;">.com</span>
    </span>
    <span style="font-size:11.5px;font-weight:400;font-family:Poppins,sans-serif;color:#4B5563;letter-spacing:.3px;">
      Classified ads and listings
    </span>
  </a>

  <span class="menu-toggle">☰</span>
  <ul class="nav-menu">
    <li><a href="${base||"/"}">HOME</a></li>
    <li><a href="/about/">ABOUT</a></li>
    <li><a href="/listings/">LISTINGS</a></li>
    <li><a href="${base}/blog/">BLOG</a></li>
    <li><a href="/contact/">CONTACT</a></li>
  </ul>
  </div>
</nav>
`;

document.getElementById("site-nav").innerHTML=navHTML;

const links=document.querySelectorAll(".nav-menu a");
let current=location.pathname.replace(/\/$/,"");

links.forEach(a=>{
  let h=a.getAttribute("href").replace(/\/$/,"");
  if(h&&h===current)a.classList.add("active");
});

const toggle=document.querySelector(".menu-toggle");
const menu=document.querySelector(".nav-menu");
if(toggle)toggle.onclick=()=>menu.classList.toggle("show");

});
