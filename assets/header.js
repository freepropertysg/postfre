// Load Leckerli One font (once)
if (!document.getElementById("leckerli-font")) {
  const l = document.createElement("link");
  l.id = "leckerli-font";
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap";
  document.head.appendChild(l);
}

document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     COUNTRY BASE LOGIC
  ============================== */
  let parts = location.pathname.split("/").filter(Boolean);
  let seg = parts[0] || "";
  let isCountry = /^[a-z]{2}$/.test(seg);

  if (isCountry) localStorage.setItem("pf_country", seg);

  let saved = localStorage.getItem("pf_country");
  let base = isCountry ? `/${seg}` : (saved ? `/${saved}` : "");

  /* =============================
     INLINE CSS (BORDER REMOVED ONLY)
  ============================== */
  const style = document.createElement("style");
  style.textContent = `
  .pf-country-wrap{
    position:relative;
    display:flex;
    align-items:center;
  }

  .pf-country-input{
    display:inline-flex;
    align-items:center;
    gap:6px;

    font-size:16px;
    font-weight:bold;
    line-height:1;
    padding:4px 8px;

    border:none;              /* ✅ BORDER REMOVED */
    border-radius:4px;
    background:#fff;
    cursor:pointer;
    white-space:nowrap;

    width:auto;
    max-width:none;
    min-width:unset;
  }

  .pf-country-dropdown{
    position:absolute;
    top:110%;
    right:0;
    width:260px;
    background:#fff;
    border:1px solid #ccc;
    border-radius:4px;
    box-shadow:0 4px 14px rgba(0,0,0,.12);
    z-index:9999;
  }

  .pf-country-search{
    width:100%;
    padding:6px 8px;
    border:none;
    border-bottom:1px solid #ddd;
    outline:none;
    font-size:14px;
    box-sizing:border-box;
  }

  .pf-country-list{
    max-height:240px;
    overflow-y:auto;
  }

  .pf-country-item{
    padding:6px 10px;
    cursor:pointer;
  }

  .pf-country-item:hover{
    background:#f3f4f6;
  }

  @media (max-width:768px){
    .pf-country-input{
      font-size:18px;
      padding:10px 0;
      border:none;            /* ✅ BORDER REMOVED (MOBILE) */
    }
  }
  `;
  document.head.appendChild(style);

  /* =============================
     NAV HTML
  ============================== */
  const navHTML = `
  <nav class="navbar">
    <div class="nav-container">

      <a href="${base || "/"}" class="nav-logo"
       style="display:flex;flex-direction:column;line-height:1.1;text-decoration:none;padding:4px 0;">
        <span style="font-size:16px;font-family:Poppins,sans-serif;">
          <span style="font-weight:600;color:#2563EB;font-family:'Leckerli One',cursive;">P</span><span style="font-weight:600;color:#2563EB;">ost</span><span style="font-weight:600;color:#14B8A6;">Fre</span><span style="font-weight:400;color:#9CA3AF;">.com</span>
        </span>
        <span style="font-size:11.5px;font-weight:500;font-family:Poppins,sans-serif;color:#4B5563; letter-spacing:0.2px;">
           Post on your own terms
        </span>
        <span style="font-size:10.5px;font-weight:400;font-family:Poppins,sans-serif;color:#6B7280;">
          Classified ads and listings
        </span>
      </a>

      <span class="menu-toggle">☰</span>

      <ul class="nav-menu">
        <li><a href="${base || "/"}">HOME</a></li>
        <li><a href="/about/">ABOUT</a></li>
        <li><a href="/listings/">LISTINGS</a></li>
        <li><a href="${base}/blog/">BLOG</a></li>
        <li><a href="/contact/">CONTACT</a></li>

        <li class="pf-country-wrap">
          <div class="pf-country-input" id="pfCountryInput">
            <span id="pfCountryLabel">🌍 Select country</span>
          </div>
          <div class="pf-country-dropdown" id="pfCountryDropdown" hidden>
            <input class="pf-country-search" id="pfCountrySearch" placeholder="Search country">
            <div class="pf-country-list" id="pfCountryList"></div>
          </div>
        </li>
      </ul>

    </div>
  </nav>
  `;

  document.getElementById("site-nav").innerHTML = navHTML;

  /* =============================
     ACTIVE LINK
  ============================== */
  const links = document.querySelectorAll(".nav-menu a");
  let current = location.pathname.replace(/\/$/, "") || "/";

  links.forEach(a => {
    let h = a.getAttribute("href").replace(/\/$/, "") || "/";
    if (h === current) a.classList.add("active");
  });

  /* =============================
     MOBILE MENU
  ============================== */
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");
  if (toggle) toggle.onclick = () => menu.classList.toggle("show");

  /* =============================
     COUNTRY SELECTOR LOGIC
  ============================== */
  const input = document.getElementById("pfCountryInput");
  const label = document.getElementById("pfCountryLabel");
  const dropdown = document.getElementById("pfCountryDropdown");
  const listBox = document.getElementById("pfCountryList");
  const search = document.getElementById("pfCountrySearch");
  const BASE_URL = "https://www.postfre.com/";

  function flag(code){
    return code.toUpperCase().replace(/./g,c=>String.fromCodePoint(127397+c.charCodeAt()));
  }

  input.onclick = e => {
    e.stopPropagation();
    dropdown.hidden = !dropdown.hidden;
    search.focus();
  };

  document.addEventListener("click", () => dropdown.hidden = true);

  if (saved) {
    fetch("https://restcountries.com/v3.1/alpha/" + saved)
      .then(r => r.json())
      .then(d => d[0] && (label.textContent = `${flag(saved)} ${d[0].name.common}`))
      .catch(()=>{});
  }

  fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
    .then(r=>r.json())
    .then(countries=>{
      countries
        .filter(c=>c.cca2)
        .sort((a,b)=>a.name.common.localeCompare(b.name.common))
        .forEach(c=>{
          const div=document.createElement("div");
          div.className="pf-country-item";
          div.textContent=`${flag(c.cca2)} ${c.name.common}`;
          div.dataset.code=c.cca2.toLowerCase();
          div.dataset.name=c.name.common;

          div.onclick=()=>{
            const target=BASE_URL+div.dataset.code+"/";
            fetch(target,{method:"HEAD"})
              .then(res=>{
                if(res.ok){
                  localStorage.setItem("pf_country", div.dataset.code);
                  location.href=target;
                }else{
                  alert(`PostFre is currently not available in ${div.dataset.name}. Please email info@postfre.com`);
                }
              });
          };
          listBox.appendChild(div);
        });
    });

  search.oninput=()=>{
    const q=search.value.toLowerCase();
    listBox.querySelectorAll(".pf-country-item").forEach(i=>{
      i.style.display=i.textContent.toLowerCase().includes(q)?"block":"none";
    });
  };

});