if(!document.getElementById("leckerli-font")){
  const link=document.createElement("link");
  link.id="leckerli-font";
  link.rel="stylesheet";
  link.href="https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap";
  document.head.appendChild(link);
}

document.addEventListener("DOMContentLoaded",()=>{

let p=location.pathname;
let parts=p.split("/").filter(Boolean);
let seg=parts[0]||"";
let isCountry=/^[a-z]{2}$/.test(seg);
let base=isCountry?`/${seg}`:"";

const navHTML=`
<nav class="navbar">
  <div class="nav-container">

  <a href="${base}/" class="nav-logo"
   style="display:flex; flex-direction:column; line-height:1.1; text-decoration:none; padding:4px 0;">
  <span style="font-size:16px; font-family:Poppins, sans-serif;">
    <span style="font-weight:600; color:#2563EB; font-family:'Leckerli One', cursive;">P</span><span style="font-weight:600; color:#2563EB;">ost</span><span style="font-weight:600; color:#14B8A6;">Fre</span><span style="font-weight:400; color:#9CA3AF;">.com</span>
  </span>
  <span style="
    font-size:11.5px;
    font-weight:400;
    font-family:Poppins, sans-serif;
    color:#4B5563;
    letter-spacing:0.3px;
  ">
    Free classified ads and listings
  </span>
</a>

    <span class="menu-toggle">☰</span>
    <ul class="nav-menu">
      <li><a href="${base}/">HOME</a></li>
      <li><a href="/about/">ABOUT</a></li>
      <li><a href="/listings/">LISTINGS</a></li>
      <li><a href="${base}/">BLOG</a></li>
      <li><a href="/contact/">CONTACT</a></li>
    </ul>
  </div>
</nav>
`;

document.getElementById("site-nav").innerHTML=navHTML;

/* ACTIVE LINK SCRIPT */
const links=document.querySelectorAll(".nav-menu a");
let current=location.pathname;
if(current.length>1&&current.endsWith("/"))current=current.slice(0,-1);

links.forEach(link=>{
  let href=link.getAttribute("href");
  if(href.length>1&&href.endsWith("/"))href=href.slice(0,-1);
  if(href===current)link.classList.add("active");
});

/* MOBILE MENU TOGGLE */
const toggle=document.querySelector(".menu-toggle");
const menu=document.querySelector(".nav-menu");
toggle&&toggle.addEventListener("click",()=>menu.classList.toggle("show"));

});
