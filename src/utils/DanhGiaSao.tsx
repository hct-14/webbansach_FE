import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

const renderRating = (diem:number)=>{
    const stars = [];

    const fullStars = Math.floor(diem); // Số sao đầy
    const halfStar = diem - fullStars >= 0.5; // Kiểm tra xem có cần thêm nửa dấu sao không

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars.push(<StarFill key={i} className="text-warning" />);
        } else if (halfStar && i === fullStars + 1) {
            stars.push(<StarHalf key={i} className="text-warning" />);
        } else {
            stars.push(<Star key={i} className="text-secondary" />);
        }
    }
    return stars;
}
export default renderRating;