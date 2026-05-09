import { useState } from "react";


export default function Index() {
const FACILITIES = [{
id: "f1",
 name: "Public Toilet, Bath & Sanitation Complex",
  area: "Nagar Parishad Rajgarh, Dhar", 
  type: "Combined", 
  distance: "0.4 km",
   open: "24 / 7",
    rating: 4.6,
     amenities: ["Hot Water", "Wheelchair", "Female Attendant", "Sanitary Pad"], 
     status: "Available",
      images: ["../../public/newimg/s3.jpeg"],
     }, 
     { id: "f2",
       name: "Public Toilet & Bath Complex", 
       area: "Nagar Parishad Piplia Mandi",
        type: "Toilet",
         distance: "1.1 km", 
         open: "24 / 7",
          rating: 4.2, 
          amenities: ["Baby Care", "Hand Dryer", "CCTV"],
           status: "Busy",
            images: [ "../../public/newimg/s4.jpeg" ],
           }, 
           { id: "f3", name: "Public Toilet & Bath Complex", area: "Nagar Nigam Bhopal", type: "Bath", distance: "2.3 km", open: "24 / 7", rating: 4.4, fee: "₹10", amenities: ["Changing Room", "Locker", "Towel Rental"], status: "Available", images: [ "../../public/newimg/s5.jpeg", ], }, { id: "f4", name: "Public Toilet & Bath Complex", area: "Nagar Parishad Rau", type: "Bath", distance: "2.3 km", open: "24 / 7", rating: 4.4, fee: "₹10", amenities: ["Changing Room", "Locker", "Towel Rental"], status: "Available", images: [ "../../Vasundhara-Backend/public/newimg/s6.jpeg", ],},
  // 🟢 Nagar Palika / Public Toilets
  {
    id: "np1",
    name: "Public Toilet Complex",
    area: "Gangaur City, Rajasthan",
    type: "Combined",
    open: "24 / 7",
    rating: 4.3,
    amenities: ["Water", "Sanitation", "Lighting"],
    status: "Available",
    images: [ "../../public/newimg/s5.jpeg" ],
  
  },
 
  {
    id: "np3",
    name: "Public Toilet Complex",
    area: "Agar, Madhya Pradesh",
    type: "Toilet",
    open: "24 / 7",
    rating: 4.1,
    amenities: ["CCTV", "Handwash"],
    status: "Busy",
    images: ["../../public/newimg/t2.jpeg"],
  },
  {
    id: "np4",
    name: "Public Toilet Complex",
    area: "Semariya, Madhya Pradesh",
    type: "Combined",
    open: "24 / 7",
    rating: 4.2,
    amenities: ["Wheelchair", "Water"],
    status: "Available",
    images: ["../../public/newimg/t1.jpeg"],
  },
  {
    id: "np5",
    name: "Public Toilet Complex",
    area: "Unchehara, Madhya Pradesh",
    type: "Toilet",
    open: "24 / 7",
    rating: 4.0,
    amenities: ["Lighting", "Security"],
    status: "Available",
    images: ["../../public/newimg/s5.jpeg"],
  },
  {
    id: "np6",
    name: "Public Toilet Complex",
    area: "Hanumana, Madhya Pradesh",
    type: "Combined",
    open: "24 / 7",
    rating: 4.2,
    amenities: ["Water", "Sanitary Pad"],
    status: "Available",
    images: ["../../public/newimg/t3.jpeg"],
  },
  {
    id: "np7",
    name: "Public Toilet Complex",
    area: "Ashoknagar, Madhya Pradesh",
    type: "Bath",
    open: "24 / 7",
    rating: 4.3,
    amenities: ["Bath", "Changing Room"],
    status: "Available",
    images: ["../../public/newimg/s5.jpeg"],
  },
  {
    id: "np8",
    name: "Public Toilet Complex",
    area: "Mungaoli, Madhya Pradesh",
    type: "Toilet",
    open: "24 / 7",
    rating: 4.1,
    amenities: ["Water", "CCTV"],
    status: "Busy",
    images: ["../../public/newimg/delux3.jpeg"],
  },
  {
    id: "np9",
    name: "Public Toilet Complex",
    area: "Chanderi, Madhya Pradesh",
    type: "Combined",
    open: "24 / 7",
    rating: 4.5,
    amenities: ["Tourist Area", "Cleanliness"],
    status: "Available",
    images: ["../../public/newimg/delux2.jpeg"],
  },
  {
    id: "np10",
    name: "waiting area",
    area: "Shivpuri, Madhya Pradesh",
    type: "Combined",
    open: "24 / 7",
    rating: 4.4,
    amenities: ["Water", "Security"],
    status: "Available",
    images: ["../../public/newimg/waiting.jpeg"],
  },

  // 🟣 Deluxe Railway Toilets
  {
    id: "r1",
    name: "Deluxe Toilet",
    area: "Bhopal Railway Station, M.P.",
    type: "Premium",
    open: "24 / 7",
    rating: 4.7,
    fee: "free",
    amenities: ["AC", "Shower", "Cleaning Staff"],
    status: "Available",
    images: ["../../public/newimg/dulexbhopal.jpeg"],
  },
  {
    id: "r2",
    name: "Deluxe Toilet",
    area: "Jhansi Railway Station, U.P.",
    type: "Premium",
    open: "24 / 7",
    rating: 4.6,
    fee: "free",
    amenities: ["AC", "Locker", "Security"],
    status: "Available",
    images: ["../../public/newimg/delux1.jpeg"],
  },
  {
    id: "r3",
    name: "Deluxe Toilet",
    area: "Hazrat Nizamuddin Railway Station, Delhi",
    type: "Premium",
    open: "24 / 7",
    rating: 4.8,
    fee: "₹free",
    amenities: ["AC", "Lounge", "Shower"],
    status: "Available",
    images: ["../../public/newimg/delux2.jpeg"],
  },
  {
    id: "r4",
    name: "Deluxe Toilet",
    area: "Rohtak Railway Station, Haryana",
    type: "Premium",
    open: "24 / 7",
    rating: 4.5,
    fee: "₹20",
    amenities: ["Clean", "Security"],
    status: "Available",
    images: ["../../public/newimg/delux3.jpeg"],
  },
  {
    id: "r5",
    name: "Deluxe Toilet",
    area: "Gurgaon Railway Station, Haryana",
    type: "Premium",
    open: "24 / 7",
    rating: 4.6,
    fee: "₹20",
    amenities: ["AC", "Shower"],
    status: "Available",
    images: ["../../public/newimg/delux1.jpeg"],
  },

  // 🔶 Premium Tourist Lounge
  {
    id: "p1",
    name: "Premium Tourist Lounge",
    area: "Varanasi Railway Station, U.P.",
    type: "Luxury",
    open: "24 / 7",
    rating: 4.9,
    fee: "Free",
    amenities: ["AC Lounge", "Private Shower", "Locker", "WiFi"],
    status: "Available",
    images: ["../../public/newimg/delux5.jpeg"],
  },
];
  const FILTERS = ["All", "Toilet", "Bath", "Combined"];

  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState("f1");
  const [activeImg, setActiveImg] = useState(0);
  const [query, ] = useState("");

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
    gap:12px;
  }

  .pt-title{
    font-size:32px;
    font-weight:bold;
    line-height:1.15;
  }

  .pt-filters{
    margin-bottom:20px;
    display:flex;
    flex-wrap:wrap;
    gap:8px;
  }

  .pt-chip{
    padding:8px 12px;
    border:1px solid #000;
    cursor:pointer;
    background:#fff;
    flex-shrink:0;
  }

  .pt-chip.on{
    background:#000;
    color:#fff;
  }

  .pt-grid{
    display:grid;
    grid-template-columns: 1fr 1.2fr;
    gap:20px;
    align-items:start;
  }

  .pt-list{
    display:flex;
    flex-direction:column;
    gap:10px;
    height:530px;
    overflow-y:auto;
    padding-right:6px;
    min-width:0;
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
    min-width:0;
  }

  .pt-hero-img{
    width:100%;
    height:350px;
    object-fit:cover;
    display:block;
  }

  .pt-amen span{
    margin-right:6px;
    margin-bottom:6px;
    padding:4px 8px;
    background:#efe7d3;
    display:inline-block;
  }

  /* Tablet */
  @media (max-width: 992px){
    .pt-section{
      padding:28px;
    }

    .pt-grid{
      grid-template-columns: 1fr;
    }

    .pt-list{
      height:320px;
    }

    .pt-hero-img{
      height:300px;
    }
  }

  /* Mobile */
  @media (max-width: 640px){
    .pt-section{
      padding:18px;
    }

    .pt-head{
      flex-direction:column;
      align-items:flex-start;
      margin-bottom:16px;
    }

    .pt-title{
      font-size:24px;
    }

    .pt-filters{
      margin-bottom:16px;
    }

    .pt-chip{
      padding:7px 10px;
      font-size:14px;
    }

    .pt-grid{
      gap:14px;
    }

    .pt-list{
      height:260px;
      padding-right:2px;
    }

    .pt-card{
      padding:10px;
      font-size:14px;
    }

    .pt-detail{
      padding:8px;
    }

    .pt-hero-img{
      height:220px;
    }
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