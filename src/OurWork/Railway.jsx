import { useState } from "react";

export default function Index() {
  const FACILITIES = [
    {
      id: "f1",
    name: "Public Toilet, Bath & Sanitation Complex",
area: "Nagar Parishad Rajgarh, Dhar",
      type: "Combined",
      distance: "0.4 km",
      open: "24 / 7",
      rating: 4.6,
      
      amenities: ["Hot Water", "Wheelchair", "Female Attendant", "Sanitary Pad"],
      status: "Available",
      images: [
        "../../Vasundhara-Backend/public/newimg/s3.jpeg",
      ],
    },
    {
      id: "f2",
      name: "Public Toilet & Bath Complex",
area: "Nagar Parishad Piplia Mandi",
      type: "Toilet",
      distance: "1.1 km",
     open: "24 / 7",
      rating: 4.2,
     
      amenities: ["Baby Care", "Hand Dryer", "CCTV"],
      status: "Busy",
      images: [
        "../../Vasundhara-Backend/public/newimg/s4.jpeg",
      ],
    },
    {
      id: "f3",
      name: "Public Toilet & Bath Complex",
area: "Nagar Nigam Bhopal",
      type: "Bath",
      distance: "2.3 km",
      open: "24 / 7",
      rating: 4.4,
      fee: "₹10",
      amenities: ["Changing Room", "Locker", "Towel Rental"],
      status: "Available",
      images: [
        "../../Vasundhara-Backend/public/newimg/s5.jpeg",
      ],
    },
    {
      id: "f4",
      name: "Public Toilet & Bath Complex",
area: "Nagar Parishad Rau",
      type: "Bath",
      distance: "2.3 km",
      open: "24 / 7",
      rating: 4.4,
      fee: "₹10",
      amenities: ["Changing Room", "Locker", "Towel Rental"],
      status: "Available",
      images: [
        "../../Vasundhara-Backend/public/newimg/s6.jpeg",
      ],
    },
  ];

  const FILTERS = ["All", "Toilet", "Bath", "Combined"];

  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState("f1");
  const [activeImg, setActiveImg] = useState(0);
  const [query, setQuery] = useState("");

  const selectFacility = (id) => {
    setActive(id);
    setActiveImg(0);
  };

  const list = FACILITIES.filter(
    (f) =>
      (filter === "All" || f.type === filter) &&
      (query.trim() === "" ||
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.area.toLowerCase().includes(query.toLowerCase()))
  );

  const current = FACILITIES.find((f) => f.id === active) || FACILITIES[0];

  const statusColor = (s) =>
    s === "Available" ? "#19c37d" : s === "Busy" ? "#f5a524" : "#ef4444";

  return (
    <>
      <style>{`
        .pt-section{
          --ink:#0e1525; --paper:#fbf7ee; --line:#1b2233;
          --accent:#0e6e51; --accent-2:#f25c2a; --soft:#efe7d3;
          font-family: ui-sans-serif, system-ui;
          color:var(--ink);
          background:#fbf7ee;
          padding:40px;
        }

        .pt-head{
          display:flex;
          justify-content:space-between;
          margin-bottom:20px;
        }

        .pt-title{
          font-size:32px;
          font-weight:bold;
        }

     

        .pt-filters{
          margin-bottom:20px;
        }

        .pt-chip{
          padding:8px 12px;
          margin-right:8px;
          border:1px solid #000;
          cursor:pointer;
        }

        .pt-chip.on{
          background:#000;
          color:#fff;
        }

        .pt-grid{
          display:grid;
          grid-template-columns: 1fr 1.2fr;
          gap:20px;
        }

        .pt-list{
          display:flex;
          flex-direction:column;
          gap:10px;
        }

        .pt-card{
          padding:12px;
          border:1px solid #000;
          cursor:pointer;
          background:#fff;
        }

        .pt-card.active{
          background:#efe7d3;
        }

        .pt-detail{
          border:1px solid #000;
          padding:10px;
          background:#fff;
        }

        .pt-hero-img{
          width:100%;
          height:350px;
          object-fit:cover;
        }

        .pt-amen span{
      
          margin-right:6px;
          
          padding:4px 8px;
          background:#efe7d3;
          display:inline-block;
        }
      `}</style>

      <section className="pt-section">
        <div className="pt-head">
          <div>
            <h2 className="pt-title">Find a clean toilet & bath</h2>
          </div>

         
        </div>

        <div className="pt-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`pt-chip ${filter === f ? "on" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="pt-grid">
          <div className="pt-list">
            {list.map((f) => (
              <div
                key={f.id}
                className={`pt-card ${active === f.id ? "active" : ""}`}
                onClick={() => selectFacility(f.id)}
              >
                <div>{f.name}</div>
                <div>{f.area}</div>
                <div>★ {f.rating}</div>
              </div>
            ))}
          </div>

          <div className="pt-detail">
            <img
              src={current.images[activeImg]}
              className="pt-hero-img"
              alt=""
            />

            <h3>{current.name}</h3>
            <p>{current.area}</p>

            <p><b>Hours:</b> {current.open}</p>
          
<p>Amenities</p>
            <div className="pt-amen rounded-lg">
              {current.amenities.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}