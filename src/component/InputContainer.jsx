import { Input } from "antd";
import React, { useCallback } from "react";
import _debounce from "lodash/debounce";

const InputContainer = ({
  style,
  setLoading,
  setTotalCountUsers,
  setUsers,
  setError,
  fetchUsers,
}) => {
  const fetchUser = async (username) => {
    if (!username) {
      return fetchUsers();
    };
    setLoading(true);
    const response = await fetch(
      `https://api.github.com/search/users?q=${username}`
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

  const debounceFn = useCallback(_debounce(fetchUser, 1000), []);
  function onChangeInput(e) {
    const username = e.target.value;
    debounceFn(username);
  }
  return <Input onChange={onChangeInput} style={style} />;
};

export default InputContainer;
