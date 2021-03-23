import React, { useState, useEffect, useCallback } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import { Thumb } from "./EmblaCarouselThumb";
import "./css/embla.css";

const PARALLAX_FACTOR = 1.2;

const EmblaCarousel = ({ slides }: any) => {
  const [parallaxValues, setParallaxValues] = useState([]);
  const [slideHeightValues, setSlideHeightValues] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel();
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    selectedClass: ""
  });

  const onScroll = useCallback(() => {
    if (!embla) return;
    const styles: any = embla.scrollSnapList().map((scrollSnap) => {
      const diffToTarget = scrollSnap - embla.scrollProgress();
      return diffToTarget * (-1 / PARALLAX_FACTOR) * 100;
    });
    setParallaxValues(styles);
  }, [embla, setParallaxValues]);

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect: () => void = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onScroll();
    onSelect();
    embla.on("select", onSelect);
    embla.on("scroll", onScroll);
  }, [embla, onSelect, onScroll]);

  useEffect(() => {
    if (embla && emblaThumbs) {
      embla.reInit();
      emblaThumbs.reInit();
    }
  }, [embla, slides])


  // ********** custom dynamic slide height adjustment ***********
  // below handles getting each slide heights
  useEffect(() => {
    (async () => {
      if (!embla) return;
      const emblaNodes: any = await embla.slideNodes().map(slide => {
        return slide.children[0].scrollHeight;
      });
      setSlideHeightValues(emblaNodes);
      
      console.log(emblaNodes);
    })()
  },[embla])
  // below sets the container height as same as the current slide
  useEffect(() => {
    if (!embla) return;
    const adaptContainerToSlide = (embla: any, slideHeights: number[]) => {
      const currentSlideHeight = slideHeights[embla.selectedScrollSnap()];
      embla.containerNode().style.height = `${currentSlideHeight}px`;
    };
    adaptContainerToSlide(embla, slideHeightValues);
  })
  // on resize
  if (embla){
    embla.on('resize', async () => {
      const emblaNodes: any = await embla.slideNodes().map(slide => {
        return slide.children[0].scrollHeight;
      });
      setSlideHeightValues(emblaNodes);
    })
  }
  // *************************************************************


  return (
    <div className="embla">
      <div className="embla__viewport" ref={mainViewportRef}>
        <div className="embla__container">

          {slides.map((slide: any, index: number) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__inner">
                <div
                  className="embla__slide__parallax"
                  style={{ transform: `translateX(${parallaxValues[index]}%)` }}
                >
                  <img
                    className="embla__slide__img"
                    src={ slide.location }
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* thumbnails */}
      <div className="embla embla--thumb">
        <div className="embla__viewport" ref={ thumbViewportRef }>
          <div className="embla__container embla__container--thumb">
            {slides.map((slide: any, index: number) => (
              <Thumb
                onClick={ () => onThumbClick(index) }
                selected={ index === selectedIndex }
                imgSrc={ slide.location }
                key={ index }
              />
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default EmblaCarousel;
