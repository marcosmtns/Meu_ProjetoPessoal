import styles from './About.module.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o <span>Cards</span>
      </h2>
      <p>
        Este é meu projeto pessoal que criei com React no front-end e Firebase
        no beck-end.
      </p>
      <Link to="/cards/create" className="btn">
        Criar card
      </Link>
    </div>
  );
};

export default About;
