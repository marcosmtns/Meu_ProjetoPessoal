import styles from './Dashboard.module.css';

import { Link } from 'react-router-dom';

// hooks
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: cards, loading } = useFetchDocuments('cards', null, uid);

  const { deleteDocument } = useDeleteDocument('cards');

  if (loading) {
    <p>Carregando...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus cards</p>
      {cards && cards.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados cards</p>
          <Link to="/cards/create" className="btn">
            Criar primeiro card
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>

          {cards &&
            cards.map((card) => (
              <div key={card.id} className={styles.post_row}>
                <p>{card.title}</p>
                <div>
                  <Link to={`/cards/${card.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link
                    to={`/cards/edit/${card.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteDocument(card.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
