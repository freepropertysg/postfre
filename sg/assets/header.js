// Inject NAVIGATION HTML
document.addEventListener("DOMContentLoaded",()=>{

const navHTML=`
<nav class="navbar">
  <div class="nav-container">
    <a href="/sg/" class="nav-logo">PostFre.com</a>
    <span class="menu-toggle">☰</span>
    <ul class="nav-menu">
      <li><a href="/sg/">HOME</a></li>
      <li><a href="/sg/about/">ABOUT</a></li>
      <li><a href="/sg/listings/">LISTINGS</a></li>
      <li><a href="/sg/blog/">BLOG</a></li>
      <li><a href="/sg/contact/">CONTACT</a></li>
    </ul>
  </div>
</nav>
`;

document.getElementById("site-nav").innerHTML=navHTML;

/* ACTIVE LINK SCRIPT (SG-SAFE) */
const links=document.querySelectorAll(".nav-menu a");
let current=window.location.pathname;

// Normalize trailing slash (except root /sg)
if(current.length>1&&current.endsWith("/")){
  current=current.slice(0,-1);
}

links.forEach(link=>{
  let href=link.getAttribute("href");
  if(href.length>1&&href.endsWith("/")){
    href=href.slice(0,-1);
  }
  if(href===current){
    link.classList.add("active");
  }
});

/* MOBILE MENU TOGGLE */
const toggle=document.querySelector(".menu-toggle");
const menu=document.querySelector(".nav-menu");
if(toggle){
  toggle.addEventListener("click",()=>menu.classList.toggle("show"));
}


});