import styles from './PostDetail.module.css';

import { Link } from 'react-router-dom';

const PostDetail = ({ card }) => {
  return (
    <div className={styles.post_detail}>
      <img src={card.image} alt={card.title} />
      <h4>{card.title}</h4>
      <p className={styles.createdBy}>{card.createdBy}</p>
      <div className={styles.tags}>
        {card.tagsArray.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/cards/${card.id}`} className="btn btn-outline">
        Ler
      </Link>
    </div>
  );
};

export default PostDetail;
