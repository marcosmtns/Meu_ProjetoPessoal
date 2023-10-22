import styles from './EditCard.module.css';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditCard = () => {
  const { id } = useParams();
  const { document: card } = useFetchDocument('cards', id);

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setBody(card.body);
      setImage(card.image);

      const textTags = card.tagsArray.join(', ');

      setTags(textTags);
    }
  }, [card]);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument('cards');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.');
    }

    // create tags array
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    // check all values
    if (!title || !image || !body || !tags) {
      setFormError('Por favor, preencha todos os campos!');
    }
    if (formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    // redirect to home dashboard
    navigate('/dashboard');
  };

  return (
    <div className={styles.edit_card}>
      {card && (
        <>
          <h2>Editando card: {card.title}</h2>
          <p>Altere os dados do card como desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título: </span>
              <input
                type="text"
                name="title"
                required
                placeholder="Pense num título auto-descritivo"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL da imagem: </span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insira uma imagem que representa o seu post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              className={styles.image_preview}
              src={card.image}
              alt={card.title}
            />
            <label>
              <span>Conteúdo: </span>
              <textarea
                name="body"
                required
                placeholder="Insira o conteúdo do post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label>
              <span>Tags: </span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditCard;
