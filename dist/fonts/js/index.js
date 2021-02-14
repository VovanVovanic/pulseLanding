document.addEventListener("DOMContentLoaded", () => {
  const thanks = document.querySelector("#thanks");
  const error = document.querySelector("#error");
  const tabNav = document.querySelectorAll(".catalog__tab");
  const tabs = document.querySelectorAll(".catalog__items");
  const linksBack = document.querySelectorAll(".catalog-item__back");
  const linksForward = document.querySelectorAll(".catalog-item__link");
  const consultation = document.querySelectorAll('[data-modal="consultation"]');
  const order = document.querySelector("#order");
  const overlay = document.querySelector(".overlay");
  const close = document.querySelectorAll(".modal__close");
  const buy = document.querySelector("#buy");
  const buyBtn = document.querySelectorAll(".button_buy");

  //slider
  const slider = tns({
    container: ".my-slider",
    items: 1,
    slideBy: "page",
    autoplay: false,
    controls: false,
    navPosition: "bottom",
    mouseDrag: true,
    responsive: {
      576: {
        edgePadding: -30,
        gutter: 40,
        items: 1,
      },
      768: {
        gutter: 30,
      },
      992: {
        items: 1,
      },
    },
  });

  document
    .querySelector(".slider__control_prev")
    .addEventListener("click", () => {
      slider.goTo("next");
    });
  document
    .querySelector(".slider__control_next")
    .addEventListener("click", () => {
      slider.goTo("prev");
    });

  // tabs

  const tabHandler = () => {
    tabNav.forEach((el, i) =>
      el.addEventListener("click", () => {
        tabNav.forEach((el) => el.classList.remove("catalog__tab_active"));
        el.classList.add("catalog__tab_active");
        onTabChange(i);
      })
    );
    const onTabChange = (numb) => {
      tabs.forEach((el, indx) => {
        if (numb === indx) {
          el.classList.add("catalog__items_active");
          el.querySelectorAll(".catalog-item").forEach((item, i) => {
            item.classList.add(
              "animate__animated",
              "animate__fadeInRight",
              "wow"
            );
          });
        } else {
          el.classList.remove("catalog__items_active");
          el.querySelectorAll(".catalog-item").forEach((item) => {
            item.classList.remove(
              "animate__animated",
              "animate__fadeInRight",
              "wow"
            );
          });
        }
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

  //maps

  function initMap() {
    let daugavpils = { lat: 55.88366, lng: 26.530168 };

    const map = new google.maps.Map(document.getElementById("my-map"), {
      zoom: 8,
      center: daugavpils,
    });
    map.setOptions({ draggableCursor: "crosshair" });

    const marker = new google.maps.Marker({
      position: daugavpils,
      title: "I am here",
      map: map,
    });
  }
  initMap();

  //modals
  onClearMessage = (msg, msg1) => {
    msg.style.display = "none";
    msg1.style.display = "none";
  };
  const modals = () => {
    const modalHandler = (arr, parent, modalWindow, cls) => {
      arr.forEach((el) => {
        el.addEventListener("click", () => {
          if (arr == buyBtn) {
            onTitleHandler(el);
          }
          parent.style.display = "block";
          modalWindow.style.display = "block";
          parent.classList.add("animate__zoomIn");
          parent.addEventListener("animationend", () => {
            parent.classList.remove("animate__zoomOut");
            parent.style.display = "block";
          });
        });
      });
      cls.forEach((el) => {
        el.addEventListener("click", () => {
          parent.classList.add("animate__zoomOut");
          parent.addEventListener("animationend", () => {
            parent.classList.remove("animate__zoomIn");
            parent.style.display = "none";
          });
          modalWindow.style.display = "none";
          onClearMessage(error, thanks);
        });
      });
      const onTitleHandler = (elem) => {
        let newTitle = buy.querySelector(".modal__subtitle");
        newTitle.textContent = elem.parentNode.parentNode.querySelector(
          ".catalog-item__title"
        ).textContent;
      };
    };

    modalHandler(consultation, overlay, order, close);
    modalHandler(buyBtn, overlay, buy, close);
  };
  modals();

  //input mask
  let inputs = document.querySelectorAll("input[type='tel']");
  let im = new Inputmask("+99-9999999");
  im.mask(inputs);

  //validate form

  const onFormHandler = (selector, rules, messages) => {
    new window.JustValidate(selector, {
      rules: rules,
      messages: messages,
      submitHandler: function (form, values, ajax) {
        let formData = new FormData(form);
        fetch("mailer/smart.php", {
          method: "POST",
          body: formData,
        }).then(function (data) {
          overlay.style.display = "block";
          order.style.display = 'none'
          buy.style.display = "none";
          thanks.style.display = "none";
          if (data.ok) {
            thanks.style.display = "block";
            error.style.display = "none";
            thanks.classList.add("animate__animated", "animate__fadeIn");
          } else {
            error.style.display = "flex";
            thanks.style.display = "none";
            error.classList.add("animate__animated", "animate__fadeIn");
            error.lastChild.textContent = `Something is gone wrong. Error ${data.status}`;
          }
          form.reset();
        });
      },
    });
  };

  onFormHandler(
    ".form",
    {
      name: { required: true },
      email: { required: true, email: true },
      phone: { required: true },
    },
    {
      name: "The name is required",
      email: "Email required",
      phone: "Phone number required",
    }
  );
  onFormHandler(
    ".form_order",
    {
      name: { required: true },
      email: { required: true, email: true },
      phone: { required: true },
    },
    {
      name: "The name is required",
      email: "Email required",
      phone: "Phone number required",
    }
  );
  onFormHandler(
    ".form_buy",
    {
      name: { required: true },
      email: { required: true, email: true },
      phone: { required: true },
    },
    {
      name: "The name is required",
      email: "Email required",
      phone: "Phone number required",
    }
  );

  //scrollUp/down
  window.addEventListener("scroll", () => {
    const btnUp = document.querySelector(".icon-up");
    const el = btnUp.getAttribute("href");
    btnUp.style.display = pageYOffset > 650 ? "flex" : "none";
    btnUp.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(el).scrollIntoView({
        behavior: "smooth",
        block: 'start',
      });
    });
  });
  const onScrollDown = () => {
    const btnDown = document.querySelector(".promo__link").firstElementChild;
    const elem = btnDown.getAttribute("href");
    btnDown.addEventListener("click", (e) => {
      e.preventDefault()
            document.querySelector(elem).scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
    })
  }
  onScrollDown()
  new WOW().init();
});
