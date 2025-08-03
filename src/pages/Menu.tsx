import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (!savedRole) {
      navigate("/");
    } else {
      setRole(savedRole);
    }
  }, [navigate]);

  const handleBack = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Меню ({role})</h1>

      {role === "Керівник" && (
        <div className="space-y-2">
          <button className="btn">📊 Аналітика</button>
          <button className="btn">📦 Склад</button>
          <button className="btn">💼 Виготовлення</button>
          <button className="btn">➕ Додати користувача</button>
          <button className="btn">🧾 Продаж</button>
        </div>
      )}

      {role === "Флорист" && (
        <div className="space-y-2">
          <button className="btn">🧾 Продаж</button>
          <button className="btn">✂️ Виготовлення</button>
          <button className="btn">📦 Склад магазину</button>
          <button className="btn">📦 Загальний склад</button>
          <button className="btn">📅 Звіт за день</button>
        </div>
      )}

      <button onClick={handleBack} className="mt-6 text-blue-500 underline">
        ◀️ Вийти
      </button>
    </div>
  );
}
