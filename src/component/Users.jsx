import { Table } from "antd";
import React, { useEffect, useState } from "react";
import InputContainer from "./InputContainer";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sorter, setSorter] = useState("asc");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalCountUsers, setTotalCountUsers] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.github.com/search/users?q=Q&page=${currentPage}&sort=repositories&order=${sorter}&per_page=10`
    );
    if (response.ok) {
      // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа (см. про этот метод ниже)
      let users = await response.json();
      setTotalCountUsers(users.total_count);
      setUsers(users.items);
      setLoading(false);
    } else {
      setError(response.status);
      alert("Ошибка HTTP: " + response.status);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [currentPage, sorter]);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Link repositories",
      dataIndex: "repos",
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
  ];
  const data = users.map((user, index) => {
    const repos = `${user.html_url}?tab=repositories`;
    return {
      key: user.id,
      id: user.id,
      name: user.login,
      repos: (
        <a href={repos} target="_blank">
          link repositories
        </a>
      ),
      description: <a>open profile</a>,
    };
  });
  const onChange = ({ current }, filters, { order }) => {
    order = !!order ? order.substring(0, order.length - 3) : "asc";
    if (current != currentPage) {
      setCurrentPage(current);
    }
    setSorter(order);
  };

  return (
    <React.Fragment>
      <InputContainer
        setLoading={setLoading}
        setTotalCountUsers={setTotalCountUsers}
        setUsers={setUsers}
        setError={setError}
        fetchUsers={fetchUsers}
        style={{ margin: "30px 0" }}
      />
      <Table
        loading={loading}
        pagination={{ defaultCurrent: 1, total: totalCountUsers }}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

export default Users;
