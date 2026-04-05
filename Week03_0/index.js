const routes = {
    "/": "<h1>환영합니다! 여기가 홈입니다.</h1>", // 이 줄이 있어야 첫 화면이 잘 나와요
    "/about": "<h1>About Page</h1>",
    "404": "<h1>404 페이지를 찾을 수 없습니다.</h1>"
};

const render = () => {
    
    const path = window.location.pathname || "/"; 
    const content = routes[path] || routes["404"];
    
    const rootElement = document.getElementById("root");
    if (rootElement) {
        rootElement.innerHTML = content;
    }
};
const navigateTo = (url) => {
    window.history.pushState(null, null, url);
    render();
};



window.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches(".nav-link")) {
            e.preventDefault();
            navigateTo(e.target.getAttribute("href"));
        }
    });
    window.addEventListener("popstate", render);
    render();
});