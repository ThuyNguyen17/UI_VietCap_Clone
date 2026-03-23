import React from 'react';
import '../../assets/css/MemberGrid.css';

const MemberGrid = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      role: "Chuyên gia phân tích",
      image: "https://th.bing.com/th/id/OIP.8yOlRF0GCkiyAchlU5_PHQAAAA?w=360&h=540&rs=1&pid=ImgDetMain&cb=idpwebpc2",
      description: "15 năm kinh nghiệm trong lĩnh vực tài chính và AI"
    },
    {
      id: 2,
      name: "Trần Thị B",
      role: "Nhà phát triển AI",
      image: "https://th.bing.com/th/id/OIP.5pA0ej-8R3_Pg5tUjBp1xgAAAA?w=417&h=626&rs=1&pid=ImgDetMain&cb=idpwebpc2",
      description: "Tiến sĩ Trí tuệ nhân tạo, chuyên gia học máy"
    },
    {
      id: 3,
      name: "Lê Văn C",
      role: "Chiến lược đầu tư",
      image: "https://th.bing.com/th/id/OIP.4u_ga0RQsXRmXkHbia8dlAHaLG?rs=1&pid=ImgDetMain&cb=idpwebpc2",
      description: "Cựu giám đốc quỹ đầu tư hàng đầu Việt Nam"
    }
  ];

  return (
    <section id="team" className="team">
      <div className="container">
        <h2 className="section-title">Đội ngũ chuyên gia</h2>
        <p className="section-subtitle">Những bộ óc đứng sau công nghệ tiên tiến của chúng tôi</p>
        
        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-card">
              <div className="team-image">
                <img src={member.image} alt={member.name} />
                <div className="team-overlay"></div>
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemberGrid;