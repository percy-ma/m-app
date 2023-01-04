import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.scss';

const Swiper = () => {
  let setting = {
    className: 'center',
    dots: true,
    infinite: true,
    speed: 500,
  };
  return (
    <div className="slider">
      <Slider {...setting}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Slider>
    </div>
  );
};

export default Swiper;
