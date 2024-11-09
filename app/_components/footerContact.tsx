import ContactList from './contactList';

import '@/styles/layout/footer.scss'

const FooterContact: React.FC = () => {
  return (
    <div className="l-footer__contact">
      <p className="l-footer__contact-heading">Contactame</p>

      <ContactList />
    </div>
  );
}

export default FooterContact