import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (!userRole) {
      navigate("/login");
    } else {
      setRole(userRole);
    }
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">👤 Меню ({role})</h1>

      {role === "Керівник" && (
        <>
          <button className="btn" onClick={() => handleNavigate("/sales")}>🧾 Продаж</button>
          <button className="btn" onClick={() => handleNavigate("/sklad")}>📦 Склад</button>
          <button className="btn" onClick={() => handleNavigate("/manufacture")}>✂️ Виготовлення</button>
          <button className="btn" onClick={() => handleNavigate("/analytics")}>📊 Аналітика</button>
          <button className="btn" onClick={() => handleNavigate("/users")}>➕ Додати користувача</button>
        </>
      )}

      {role === "Флорист" && (
        <>
          <button className="btn" onClick={() => handleNavigate("/sales")}>🧾 Продаж</button>
          <button className="btn" onClick={() => handleNavigate("/manufacture")}>✂️ Виготовлення</button>
          <button className="btn" onClick={() => handleNavigate("/sklad-view")}>📦 Склад магазину</button>
          <button className="btn" onClick={() => handleNavigate("/sklad-total")}>📦 Загальний склад</button>
          <button className="btn" onClick={() => handleNavigate("/daily-report")}>📅 Звіт за день</button>
        </>
      )}

      <button onClick={handleLogout} className="mt-4 text-red-600 underline">Вийти</button>
    </div>
  );
}
