import fullStar from '../../assets/icon/star.png';
import halfStar from '../../assets/icon/star-half.png';
import emptyStar from '../../assets/icon/star-empty.png';

function Rating({ rating, maxStars }) {
  let fullStars = Math.floor(rating);
  let isHalfStar = rating % 1 >= 0.5;

  return (
    <div className='flex'>
      {Array(fullStars).fill(0).map((item, index) => (
        <img key={index} className='w-4' src={fullStar} alt="Full star" />
      ))}

      {isHalfStar && (
        <img className='w-4' src={halfStar} alt="Half star" />
      )}

      {Array(maxStars - fullStars - (isHalfStar ? 1 : 0)).fill(0).map((item, index) => (
        <img key={index} className='w-4' src={emptyStar} alt="Empty star" />
      ))}
    </div>
  );
}

export default Rating;