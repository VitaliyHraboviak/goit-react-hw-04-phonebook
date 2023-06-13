import React from "react";
import PropTypes from 'prop-types';
import css from './ContactsList.module.css'

const ContactsList = ({ contacts, onDeleteContacts }) => {
 return   (<ul className={css.ContactsListUl}>
        {contacts.map(({ id, name, number }) => (
            <li key={id} className={css.ContactsListLi}>
                <p>{name} {number}</p>
                <button onClick={()=> onDeleteContacts(id)} className={css.ContactsListBtn}>Delete</button>
            </li>))}
    </ul>
    );
}
ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContacts: PropTypes.func.isRequired,
};

export default ContactsList;