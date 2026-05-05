import { useState } from "react";

const data = [
  {
    img: "https://gmc.assam.gov.in/sites/default/files/styles/inner_page_image_380x238/public/swf_utility_folder/departments/gmc_webcomindia_org_oid_5/portlet/level_1/image/fogging.jpg?itok=RTMGPX8H",
    title: "Mosquito Fogging",
    tag: "Public Health",
    desc: "City-wide fogging drives to curb vector-borne diseases.",
    stat: "240+",
    unit: "Wards Covered",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Tq75fl6rbAne0rF8IYhtEw4IH8f14CfgcQ&s",
    title: "Smart Governance",
    tag: "e-Services",
    desc: "Digital-first civic services with transparent grievance redressal.",
    stat: "24/7",
    unit: "Online Portal",
  },
  {
    img: "https://media.assettype.com/freepressjournal/2025-03-15/1m7z090l/4.jpg?width=1200",
    title: "Urban Sanitation",
    tag: "Hygiene",
    desc: "Daily street sweeping keeping our city spotless and safe.",
    stat: "1.2k",
    unit: "Daily Workers",
  },
  {
    img: "https://sc0.blr1.digitaloceanspaces.com/inline/914733-cvcofdmtru-1551284510.jpg",
    title: "Road Maintenance",
    tag: "Infrastructure",
    desc: "Pothole repair, resurfacing and signage upgrades across the city.",
    stat: "850",
    unit: "Km Maintained",
  },
  {
    img: "https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/06/13/Pictures/delhi-lockdown-covid-19-day-29_30f34a9c-ad5b-11ea-8237-3f05c44deb25.jpg",
    title: "Emergency Response",
    tag: "Rapid Action",
    desc: "Rapid mobilisation during lockdowns, floods and city-wide crises.",
    stat: "15min",
    unit: "Avg Response",
  },
  {
    img: "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/01/24/Pictures/mcd-workers_7fb84e50-e259-11e6-947f-9490afc24a59.jpg",
    title: "Waste Collection",
    tag: "Door-to-Door",
    desc: "Segregated waste pickup with composting and recycling programs.",
    stat: "98%",
    unit: "City Coverage",
  },
  {
    img: "https://images.indianexpress.com/2025/07/waste_management_1200.jpg?w=414",
    title: "Recycling Plant",
    tag: "Sustainability",
    desc: "Modern facilities converting daily waste into energy and compost.",
    stat: "Zero",
    unit: "Landfill Goal",
  },
  {
    img: "https://www.hindustantimes.com/ht-img/img/2023/04/20/550x309/Gurugram--India-April-20--2023--Sanitation-worker-_1682016483370.jpg",
    title: "Worker Welfare",
    tag: "Our People",
    desc: "Safety gear, insurance and training for our frontline heroes.",
    stat: "100%",
    unit: "Insured Staff",
  },
];

export default function Index() {
  const [active, setActive] = useState(0);
  const cur = data[active];

  const layouts = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"];

  return (
    <>
      <style>{`
        .mu-wrap{
          min-height:100vh;
          background:#f6f3ec;
          padding:70px 5vw;
          overflow:hidden;
          font-family:Inter,sans-serif;
        }

        .mu-inner{
          max-width:1280px;
          margin:auto;
        }

        .mu-title{
          font-size:clamp(44px,2vw,90px);
          line-height:.95;
          font-family:Georgia,serif;
          margin-bottom:45px;
          letter-spacing:-.03em;
        }

        .mu-title em{
          color:#5e8b6f;
          font-style:italic;
        }

        .mu-grid{
          display:grid;
          grid-template-columns:repeat(12,1fr);
          grid-auto-rows:150px;
          gap:14px;
        }

        .mu-card{
          position:relative;
          overflow:hidden;
          border-radius:22px;
          cursor:pointer;
          transform:translateY(0) scale(1);
          transition:all .45s cubic-bezier(.2,.8,.2,1);
          will-change:transform;
        }

        .mu-card:hover{
          transform:translateY(-8px) scale(1.01);
        }

        .mu-card.active{
          transform:translateY(-4px) scale(1.015);
          box-shadow:0 18px 40px rgba(0,0,0,.12);
        }

        .mu-card img{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
          object-fit:cover;
          transition:transform .7s ease;
        }

        .mu-card:hover img{
          transform:scale(1.08);
        }

        .overlay{
          position:absolute;
          inset:0;
          background:linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.08));
        }

        .meta{
          position:absolute;
          left:18px;
          right:18px;
          bottom:18px;
          z-index:2;
          color:white;
        }

        .tag{
          font-size:11px;
          letter-spacing:.18em;
          text-transform:uppercase;
          color:#d8e8d7;
          margin-bottom:4px;
        }

        .meta h3{
          margin:0;
          font-size:clamp(18px,2vw,28px);
          line-height:1.1;
          font-family:Georgia,serif;
          font-weight:500;
        }

        .c1{grid-column:span 5;grid-row:span 3}
        .c2{grid-column:span 4;grid-row:span 2}
        .c3{grid-column:span 3;grid-row:span 2}
        .c4{grid-column:span 3;grid-row:span 2}
        .c5{grid-column:span 4;grid-row:span 2}
        .c6{grid-column:span 5;grid-row:span 2}
        .c7{grid-column:span 4;grid-row:span 2}
        .c8{grid-column:span 3;grid-row:span 2}

        .mu-detail{
          margin-top:20px;
          background:white;
          border-radius:22px;
          padding:28px 32px;
          display:grid;
          grid-template-columns:1fr auto;
          gap:30px;
          align-items:center;
          animation:fadeUp .45s ease;
        }

        @keyframes fadeUp{
          from{opacity:0;transform:translateY(8px)}
          to{opacity:1;transform:translateY(0)}
        }

        .mu-detail h4{
          margin:8px 0;
          font-size:34px;
          font-family:Georgia,serif;
          font-weight:500;
        }

        .mu-detail p{
          margin:0;
          max-width:600px;
          color:#4b4b4b;
          line-height:1.6;
        }

        .stat{
          text-align:right;
          padding-left:24px;
          border-left:1px solid #ece8dc;
        }

        .stat b{
          display:block;
          font-size:54px;
          font-family:Georgia,serif;
          font-weight:500;
          line-height:1;
        }

        .stat span{
          font-size:11px;
          letter-spacing:.18em;
          text-transform:uppercase;
          color:#666;
        }

        @media(max-width:820px){
          .mu-grid{
            grid-template-columns:repeat(2,1fr);
            grid-auto-rows:180px;
          }

          .c1,.c2,.c3,.c4,.c5,.c6,.c7,.c8{
            grid-column:span 1;
            grid-row:span 1;
          }

          .mu-detail{
            grid-template-columns:1fr;
          }

          .stat{
            text-align:left;
            border-left:none;
            padding-left:0;
          }
        }
      `}</style>

      <section className="mu-wrap">
        <div className="mu-inner">
          <h1 className="mu-title">
            A city <em>cared for</em>, every hour.
          </h1>

          <div className="mu-grid">
            {data.map((d, i) => (
              <article
                key={i}
                className={`mu-card ${layouts[i]} ${active === i ? "active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <img src={d.img} alt={d.title} />
                <div className="overlay" />

                <div className="meta">
                  <div className="tag">{d.tag}</div>
                  <h3>{d.title}</h3>
                </div>
              </article>
            ))}
          </div>

          <div className="mu-detail" key={active}>
            <div>
              <small style={{ color: "#5e8b6f", letterSpacing: ".18em", textTransform: "uppercase" }}>
                {cur.tag}
              </small>
              <h4>{cur.title}</h4>
              <p>{cur.desc}</p>
            </div>

            <div className="stat">
              <b>{cur.stat}</b>
              <span>{cur.unit}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}