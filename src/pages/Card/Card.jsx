import styles from './Card.module.css';

// hooks
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Card = () => {
  const { id } = useParams();
  const { document: card, loading } = useFetchDocument('cards', id);

  return (
    <div className={styles.card_container}>
      {loading && <p>Carregando card...</p>}
      {card && (
        <>
          <h1>{card.title}</h1>
          <img src={card.image} alt={card.title} />
          <p>{card.body}</p>
          <h3>Este card trata sobre:</h3>
          <div className={styles.tags}>
            {card.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
