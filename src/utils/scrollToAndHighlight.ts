export const scrollToAndHighlight = (id: string, delay = 0) => {
    setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.style.backgroundColor = "#fff3cd";
            el.style.borderRadius = "8px";
            setTimeout(() => {
                el.style.backgroundColor = "";
                el.style.borderRadius = "";
            }, 2000);
        }
    }, delay);
};
