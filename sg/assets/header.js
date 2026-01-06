// Inject NAVIGATION HTML
document.addEventListener("DOMContentLoaded",()=>{

const navHTML=`
<nav class="navbar">
  <div class="nav-container">

  <a href="/sg/" class="nav-logo"
   style="display:flex; flex-direction:column; line-height:1.1; text-decoration:none; padding:4px 0;">
  <span style="font-size:16px; font-family:Poppins, sans-serif;">
    <span style="font-weight:600; color:#2563EB;">Post</span><span style="font-weight:600; color:#14B8A6;">Fre</span><span style="font-weight:400; color:#9CA3AF;">.com</span>
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