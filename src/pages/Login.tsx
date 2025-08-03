import { useState } from "react";
import logo from "../assets/kvityulya-logo.jpg";

const API_URL = "/api/login"; // 👈 звертаємося до нашого backend


export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    const formData = new URLSearchParams();
    formData.append("login", login);
    formData.append("password", password);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const text = await response.text();
      console.log("LOGIN RESPONSE:", text);
      const result = JSON.parse(text);

      if (result.success) {
        alert(`Успішний вхід. Роль: ${result.role}`);
        // TODO: зберегти роль або перенаправити
      } else {
        setError(result.message || "Помилка входу");
      }
    } catch (err) {
      setError("Помилка мережі або сервера");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 border border-green-100">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Логотип Квітюля"
            className="w-32 h-auto rounded-xl shadow-md"
          />
        </div>

        <h1 className="text-center text-3xl font-bold text-green-700">
          Вхід у <span className="text-pink-500">Квітюлю 🌸</span>
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Логін"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition pr-14"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-green-600 hover:underline"
            >
              {showPassword ? "Сховати" : "Показати"}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all"
          >
            🌿 Увійти
          </button>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </div>

        <p className="text-center text-sm text-gray-500 mt-2">
          © {new Date().getFullYear()} Квітюля. Всі права захищено.
        </p>
      </div>
    </div>
  );
}
