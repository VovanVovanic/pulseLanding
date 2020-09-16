document.addEventListener("DOMContentLoaded", () => {
  //slider
  const slider = tns({
    container: ".my-slider",
    items: 1,
    slideBy: "page",
    autoplay: false,
    controls: false,
    navPosition: "bottom",
  });

  document.querySelector(".slider__control_prev")
    .addEventListener("click", () => {
      slider.goTo("next");
    });
  document.querySelector(".slider__control_next")
    .addEventListener("click", () => {
      slider.goTo("prev");
    });
  
  // tabs

  const tabHandler = () => {
    const tabNav = document.querySelectorAll(".catalog__tab");
    const tabs = document.querySelectorAll(".catalog__items");
    const linksBack = document.querySelectorAll(".catalog-item__back");
    const linksForward = document.querySelectorAll(".catalog-item__link");
   
    tabNav.forEach((el, i) =>
      el.addEventListener("click", () => {
        tabNav.forEach((el) => el.classList.remove("catalog__tab_active"));
        el.classList.add("catalog__tab_active");
        onTabChange(i);
      })
    );
    const onTabChange = (numb) => {
      tabs.forEach((el, indx) => {
        numb === indx
          ? el.classList.add("catalog__items_active")
          : el.classList.remove("catalog__items_active");
      });
    };

    const onToggleTab = (arr, arr2, cls, cls2) => {
      arr.forEach((el, i) =>
        el.addEventListener("click", (e) => {
          e.preventDefault();
          arr2.forEach((elem, indx) => {
            if (i === indx) {
              el.parentNode.classList.toggle(cls);
              elem.parentNode.classList.toggle(cls2);
            }
          });
        })
      );
    };
    onToggleTab(
      linksBack,
      linksForward,
      "catalog-item__info_active",
      "catalog-item__card_active"
    );
    onToggleTab(
      linksForward,
      linksBack,
      "catalog-item__card_active",
      "catalog-item__info_active"
    );
  };
  tabHandler();
});




