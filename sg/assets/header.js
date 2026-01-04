<!-- NAVIGATION CONTAINER -->
<div id="site-nav"></div>

<style>
/* ===== NAV BAR STYLES ===== */
.navbar{
  background:#fff;
  border-bottom:1px solid #e5e5e5;
}

.nav-container{
  max-width:1200px;
  margin:0 auto;
  padding:12px 16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
}

/* LOGO */
.nav-logo{
  display:flex;
  flex-direction:column;
  text-decoration:none;
  line-height:1.1;
}

.brand-name{
  font-size:22px;
  font-weight:700;
  color:#000;
}

.brand-domain{
  font-size:12px;
  font-weight:400;
  color:#666;
}

/* MENU */
.nav-menu{
  list-style:none;
  display:flex;
  gap:20px;
  margin:0;
  padding:0;
}

.nav-menu a{
  text-decoration:none;
  color:#000;
  font-size:14px;
}

.nav-menu a.active{
  font-weight:600;
  border-bottom:2px solid #000;
}

/* MOBILE */
.menu-toggle{
  display:none;
  font-size:22px;
  cursor:pointer;
}

@media (max-width:768px){
  .menu-toggle{
    display:block;
  }
  .nav-menu{
    display:none;
    flex-direction:column;
    gap:12px;
    margin-top:12px;
  }
  .nav-menu.show{
    display:flex;
  }
}
</style>

<script>
// Inject NAVIGATION HTML
document.addEventListener("DOMContentLoaded",()=>{

const navHTML=`
<nav class="navbar">
  <div class="nav-container">
    <a href="/sg/" class="nav-logo">
      <span class="brand-name">PostFree</span>
      <span class="brand-domain">postfre.com</span>
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
</script>