import Styles from './Footer.module.css';

const Footer = () => {
  return (
    <div>
      <footer className={Styles.footer}>
        <h3>Crie e compartilhe seus cards, inspire novas histórias!</h3>
        <p>Cards &copy; 2023</p>
      </footer>
    </div>
  );
};

export default Footer;
