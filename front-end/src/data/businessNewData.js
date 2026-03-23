const businessNews = [
  {
    id: 1,
    code: "HVN",
    title:
      "HVN: Assign sufficient high pigs for Vietnam Airlines until the end of 2027",
    source: "Tinnhanhdichvu.vn",
    image:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "04:25",
    sentiment: "Positive",
    industry: "Airlines",
    date: "2025-07-30",
    content: `
      <h2>The VN-Index's Recovery Continues</h2>
      <p>The Vietnamese stock market (VN-Index) showed signs of a strong recovery on July 31st, following a period of consolidation. The index gained a significant number of points, driven by strong buying demand in key sectors like banking, real estate, and technology.</p>
      <img src="https://tse2.mm.bing.net/th/id/OIP.4H1DAYzCZ7UiE9PkBUkb_QHaEo?rs=1&pid=ImgDetMain&o=7&rm=3" alt="VN-Index Chart" class="my-6 rounded-lg shadow-lg w-full" />
      <p>Market analysts attribute the rebound to a combination of factors, including positive macroeconomic data and a renewed sense of investor confidence. The State Bank of Vietnam's recent policy announcements also played a crucial role in stabilizing market sentiment.</p>
      <h3>Key Highlights:</h3>
      <ul>
        <li>Banking stocks led the rally.</li>
        <li>Foreign investors were net buyers for the second consecutive day.</li>
        <li>Experts predict the momentum will continue in the short term.</li>
      </ul>
      <p>While the recovery is a positive sign, investors are advised to remain cautious, as global economic uncertainties could still impact the market. The next few sessions will be critical in determining if this recovery is sustainable.</p>
      
      <figure class="my-6">
        <img src="https://tse1.mm.bing.net/th/id/OIP.Q5ROh0a45DcmejvDuqnqzAHaE8?w=748&h=499&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Vietnamese Dong" class="rounded-lg shadow-lg w-full" />
        <figcaption class="text-sm text-center text-gray-500 mt-2">Ảnh: Đồng Việt Nam trên thị trường. (Nguồn: Báo cáo SBV)</figcaption>
      </figure>

      <p>Bên cạnh đó, dòng vốn FDI tiếp tục đổ vào Việt Nam, tạo động lực mạnh mẽ cho thị trường.</p>
    `,
  },
  {
    id: 2,
    code: "VIC",
    title:
      "VIC: Vietnam chosen by Korean consumers as the most trusted airline",
    source: "Giai Phong Newspaper",
    image:
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1Jx0ll.img?w=1600&h=1067&m=4&q=77",
    time: "02:48",
    sentiment: "Positive",
    industry: "Real Estate",
    date: "2025-07-30",
    content: `
      <h2>The VN-Index's Recovery Continues</h2>
      <p>The Vietnamese stock market (VN-Index) showed signs of a strong recovery on July 31st, following a period of consolidation. The index gained a significant number of points, driven by strong buying demand in key sectors like banking, real estate, and technology.</p>
      <img src="https://tse2.mm.bing.net/th/id/OIP.4H1DAYzCZ7UiE9PkBUkb_QHaEo?rs=1&pid=ImgDetMain&o=7&rm=3" alt="VN-Index Chart" class="my-6 rounded-lg shadow-lg w-full" />
      <p>Market analysts attribute the rebound to a combination of factors, including positive macroeconomic data and a renewed sense of investor confidence. The State Bank of Vietnam's recent policy announcements also played a crucial role in stabilizing market sentiment.</p>
      <h3>Key Highlights:</h3>
      <ul>
        <li>Banking stocks led the rally.</li>
        <li>Foreign investors were net buyers for the second consecutive day.</li>
        <li>Experts predict the momentum will continue in the short term.</li>
      </ul>
      <p>While the recovery is a positive sign, investors are advised to remain cautious, as global economic uncertainties could still impact the market. The next few sessions will be critical in determining if this recovery is sustainable.</p>
      
      <figure class="my-6">
        <img src="https://tse1.mm.bing.net/th/id/OIP.Q5ROh0a45DcmejvDuqnqzAHaE8?w=748&h=499&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Vietnamese Dong" class="rounded-lg shadow-lg w-full" />
        <figcaption class="text-sm text-center text-gray-500 mt-2">Ảnh: Đồng Việt Nam trên thị trường. (Nguồn: Báo cáo SBV)</figcaption>
      </figure>

      <p>Bên cạnh đó, dòng vốn FDI tiếp tục đổ vào Việt Nam, tạo động lực mạnh mẽ cho thị trường.</p>
    `,
  },
  {
    id: 3,
    code: "HDB",
    title:
      "HDB: HDB supplements 10 trillion VND in October, reaching 16.7 trillion VND",
    source: "Giai Phong Newspaper",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "00:03",
    sentiment: "Neutral",
    industry: "Banking",
    date: "2025-07-29",
  },
  {
    id: 4,
    code: "VNM",
    title: "VNM: Vinamilk auctions revenue of nearly 16.7 trillion VND",
    source: "Giai Phong Newspaper",
    image:
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1Jx0ll.img?w=1600&h=1067&m=4&q=77",
    time: "02:13",
    sentiment: "Positive",
    industry: "Food",
    date: "2025-07-28",
  },
  {
    id: 5,
    code: "BID",
    title: "BID: State Bank announces inspection order at a BIDV branch",
    source: "Nguoi Quan Sat",
    image:
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1Jx0ll.img?w=1600&h=1067&m=4&q=77",
    time: "02:14",
    sentiment: "Negative",
    industry: "Banking",
    date: "2025-07-28",
  },
  {
    id: 6,
    code: "IDJ",
    title:
      "IDJ: IDJ seafood stocks sold out by tons, reasons behind latest IDJ shares",
    source: "Nguoi Quan Sat",
    image:
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1Jx0ll.img?w=1600&h=1067&m=4&q=77",
    time: "03:06",
    sentiment: "Neutral",
    industry: "Seafood",
    date: "2025-07-27",
  },
  {
    id: 7,
    code: "SHB",
    title: "SHB: Bank increases profit in half-year, SHB breaks outside",
    source: "Saigon Economic Magazine",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "02:18",
    sentiment: "Positive",
    industry: "Banking",
    date: "2025-07-27",
  },
  {
    id: 8,
    code: "SSI",
    title: "SBT: SSI ties steady growth path, surpasses expectations",
    source: "Vietstock.vn",
    image:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "02:15",
    sentiment: "Positive",
    industry: "Securities",
    date: "2025-07-26",
  },
  {
    id: 9,
    code: "HPG",
    title: "HPG: Steel production exceeds expectations in Q2",
    source: "Vietstock.vn",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "01:30",
    sentiment: "Positive",
    industry: "Materials",
    date: "2025-07-25",
  },
  {
    id: 10,
    code: "FPT",
    title: "FPT: Stable profit growth thanks to technology sector",
    source: "Vietf.vn",
    image:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "09:00",
    sentiment: "Positive",
    industry: "Technology",
    date: "2025-07-24",
  },
];
export default businessNews;
