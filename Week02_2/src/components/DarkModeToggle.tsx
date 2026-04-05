import { useTheme } from "../context/ThemeContext";

const DarkModeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-full font-semibold transition-all duration-300
                bg-gray-200 text-gray-800 hover:bg-gray-300
                dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
            {isDark ? "☀️ 라이트 모드" : "🌙 다크 모드"}
        </button>
    );
};

export default DarkModeToggle;