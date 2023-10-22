import styles from './Search.module.css';

// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

// components
import PostDetail from '../../components/PostDetail';

import { Link } from 'react-router-dom';

const Search = () => {
  const query = useQuery();
  const search = query.get('q');

  const { documents: cards } = useFetchDocuments('cards', search);

  return (
    <div className={styles.search_container}>
      <h2>Search</h2>
      <div>
        {cards && cards.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados cards a partir da sua busca.</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}
        {cards && cards.map((card) => <PostDetail key={card.id} card={card} />)}
      </div>
    </div>
  );
};

export default Search;
