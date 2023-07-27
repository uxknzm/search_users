import { Card } from "antd";
import React, { useEffect, useState } from "react";
const { Meta } = Card;

const Profile = ({ username }) => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchUser = async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.github.com/search/users?q=${username}`
    );
    if (response.ok) {
      // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа (см. про этот метод ниже)
      let user = await response.json();
      setUser(user.items[0]);
      setLoading(false);
    } else {
      setError(response.status);
      alert("Ошибка HTTP: " + response.status);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [username]);
  const onClick = () => {
    window.open(user.html_url, "_blank");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "50px",
      }}
    >
      <Card
        hoverable
        loading={loading}
        onClick={onClick}
        style={{
          width: 500,
        }}
        cover={<img alt="example" src={user.avatar_url} />}
      >
        <Meta title={user.login} description={user.html_url} />
      </Card>
    </div>
  );
};

export default Profile;
