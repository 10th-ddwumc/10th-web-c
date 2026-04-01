const routes = {
    "/": "<h1>Home</h1><p>여기는 홈입니다.</p>",
    "/about": "<h1>About</h1><p>SPA 원리!</p>",
    "404": "<h1>404</h1><p>페이지를 찾을 수 없습니다.</p>"
};

const render = () => {
    const path = window.location.pathname;
    const content = routes[path] || routes["404"];
    document.getElementById("root").innerHTML = content;
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