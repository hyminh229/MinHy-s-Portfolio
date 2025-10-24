// Hành vi phía client tập trung: menu hamburger + reveal khi cuộn
// Phòng vệ: chỉ chạy sau khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  // Menu hamburger: bật/tắt lớp `open` trên menu và duy trì `aria-expanded`
  const hamburger = document.querySelector(".hamburger");
  const menu = document.getElementById("menu");
  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("open");
    });
  }

  // Reveal khi cuộn dùng IntersectionObserver (khuyến nghị)
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length > 0 && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // add both classes to be compatible with CSS that may target either
            // thêm cả hai lớp để tương thích với CSS có thể dùng một trong hai
            entry.target.classList.add("visible", "active");
            // nếu reveal chỉ cần chạy một lần, bỏ observe để cải thiện hiệu năng
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => io.observe(el));
  } else if (revealElements.length > 0) {
    // Dự phòng cho các trình duyệt cũ: dùng handler scroll đã throttle
    const onScroll = () => {
      const vh = window.innerHeight;
      for (const el of revealElements) {
        const r = el.getBoundingClientRect();
        if (r.top < vh - 100) el.classList.add("visible", "active");
      }
    };

    // Run once and then attach listener
    // chạy một lần rồi gắn listener đã throttle
    onScroll();
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }
});
