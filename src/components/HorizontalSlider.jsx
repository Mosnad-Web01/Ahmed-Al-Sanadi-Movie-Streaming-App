import React from 'react';
import { sliderBgImg } from '../util/local-ImageConstants'; 


const HorizontalSlider = ({ children }) => {
  return (
    <div
      className="relative mx-auto overflow-x-scroll px-4 py-1 overflow-y-hidden scrollbar-hide scroll-smooth  
       bg-bottom bg-no-repeat h-[460px] sm:bg-transparent md:bg-contain  lg:bg-contain"
      style={{
        width: '100%',
        whiteSpace: 'nowrap',
        backgroundImage: `url(${sliderBgImg.src})`,
        backgroundPosition: 'center bottom',
      
      }}
    >
              <style jsx>{`
          div::-webkit-scrollbar {
            height: 8px;
            background: transparent;
          }
          
          div::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            margin: 0 10px;
          }
          
          div::-webkit-scrollbar-thumb {
            background: linear-gradient(90deg, #01b4e4, #90cea1);
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: content-box;
          }
          
          div::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(90deg, #0097c3, #70b387);
            background-clip: content-box;
            border: 2px solid transparent;
          }
          
          /* For Firefox */
          @supports (scrollbar-color: auto) {
            div {
              scrollbar-color: #01b4e4 transparent;
              scrollbar-width: thin;
            }
          }
        `}</style>

          
      {children}
    </div>
  );
};

export default HorizontalSlider;
