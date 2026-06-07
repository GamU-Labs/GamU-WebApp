"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  initials: string;
  accent: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[320px] h-[380px] mx-4 z-10 cursor-pointer"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <div className="absolute inset-0 surface-gradient" />
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.accent} opacity-60`} />
          {current === index && (
            <div className="absolute inset-0 bg-black/10 transition-all duration-1000" />
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-deep flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              <span className="font-heading text-xl text-primary-foreground">
                {slide.initials}
              </span>
            </div>
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-2">
              {slide.title}
            </h3>
            <p className="text-xs text-primary font-medium mb-3">
              {slide.subtitle}
            </p>
            <p className="text-sm text-muted-foreground text-center leading-relaxed max-w-[260px]">
              {slide.description}
            </p>
          </div>
        </div>
      </li>
    </div>
  );
};

const CarouselControl = ({
  type,
  title,
  handleClick,
}: {
  type: string;
  title: string;
  handleClick: () => void;
}) => {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-primary/10 border border-primary/20 rounded-full hover:bg-primary/20 hover:border-primary/40 hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 cursor-pointer ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-primary" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) setCurrent(index);
  };

  const id = useId();

  return (
    <div
      className="relative w-[320px] h-[420px] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex mx-[-1rem] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl
          type="previous"
          title="Previous"
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type="next"
          title="Next"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
