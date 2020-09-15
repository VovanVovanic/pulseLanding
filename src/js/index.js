document.addEventListener('DOMContentLoaded', () => {

    //slider
      const slider = tns({
        container: ".my-slider",
        items: 1,
        slideBy: "page",
          autoplay: false,
          controls: false,
        navPosition: 'bottom'
      });
    
    document.querySelector(".slider__control_prev").addEventListener('click', () => {
          slider.goTo("next");
      })   
    document.querySelector(".slider__control_next").addEventListener('click', () => {
          slider.goTo("prev");
      })
        
      
})