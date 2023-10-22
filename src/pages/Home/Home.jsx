// CSS
import styles from './Home.module.css';

// hooks
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

// components
import PostDetail from '../../components/PostDetail';

const Home = () => {
  const [query, setQuery] = useState('');
  const { documents: cards, loading } = useFetchDocuments('cards');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1>Veja os nossos cards mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div className={styles.cards}>
        {loading && <p>Carregando...</p>}
        {cards && cards.map((card) => <PostDetail key={card.id} card={card} />)}
        {cards && cards.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados cards</p>
            <Link to="/cards/create" className="btn">
              Criar primeiro card
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
