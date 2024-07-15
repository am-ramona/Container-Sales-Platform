import React from "react";
import { Carousel } from "react-responsive-carousel";

export default () => (
  <Carousel autoPlay infiniteLoop emulateTouch showThumbs={false} style={{height: 512}}>
    <div>
      <img alt="" src="https://finanswatch.dk/Billeder/article12443610.ece/ALTERNATES/native-app-2048/doc7ciuklhgr0m1i5r20amf.jpg" />
      {/* <p className="legend">Legend 1</p> */}
    </div>
    <div>
      <img alt="" src="https://www.porttechnology.org/wp-content/uploads/2020/05/cma-cgm.jpg
" />
      {/* <p className="legend">Legend 2</p> */}
    </div>
    <div>
      <img alt="" src="https://www.hafen-hamburg.de/site/assets/files/447393/9839208_02.1920x0.jpg" />
      {/* <p className="legend">Legend 3</p> */}
    </div>
    {/* <div>
      <img alt="" src="https://www.cmacgm-group.com/api/sites/default/files/2021-01/CC%20JS%20-%20Terminal%20-%20%201900x700.jpg" />
      {/* <p className="legend">Legend 4</p>
    </div> */}
  </Carousel>
);
