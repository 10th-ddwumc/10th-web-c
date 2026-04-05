import { ThemeProvider } from "./context/ThemeContext";
import DarkModeToggle from "./components/DarkModeToggle";
import "./index.css";

const App = () => {
    return (
        <ThemeProvider>
            <div className="min-h-screen flex flex-col items-center justify-center gap-6
                bg-white text-gray-900
                dark:bg-gray-900 dark:text-white
                transition-colors duration-300">

                <h1 className="text-3xl font-bold">🌗 다크모드 토글</h1>

                <DarkModeToggle />

            </div>
        </ThemeProvider>
    );
};

export default App;