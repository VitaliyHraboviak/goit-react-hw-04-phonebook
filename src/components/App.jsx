// import React, { Component } from 'react';
// import Container from './Container/Container';
// import ContactsList from './ContactsList/ContactsList';
// import initialContacts from '../components/Contacts.json';
// import Filter from './Filter/Filter';
// import shortid from 'shortid';
// import PropTypes from 'prop-types';
// import css from './App.module.css';

// class App extends Component {
//   state = {
//     contacts: initialContacts,
//     filter: '',
//   };

//   addContact = ({ name, number }) => {
//     const { contacts } = this.state;

//     const isDuplicate = contacts.some(
//       (contact) => contact.name.toLowerCase() === name.toLowerCase()
//     );

//     if (isDuplicate) {
//       alert(`${name} is already in contacts.`);
//       return;
//     }

//     const contact = {
//       id: shortid.generate(),
//       name,
//       number,
//     };

//     this.setState(
//       (prevState) => ({
//         contacts: [contact, ...prevState.contacts],
//       }),
//       () => {
//         localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//       }
//     );
//   };

//   changeFilter = (event) => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   deleteContacts = (contactId) => {
//     this.setState(
//       (prevState) => ({
//         contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
//       }),
//       () => {
//         localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//       }
//     );
//   };

//   componentDidMount() {
//     const storedContacts = localStorage.getItem('contacts');

//     if (storedContacts) {
//       this.setState({
//         contacts: JSON.parse(storedContacts),
//       });
//     }
//   }

//   componentDidUpdate( prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   getFilterContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   formSubmitHandler = (data) => {
//     console.log(data);
//   };

//   render() {
//     const { filter } = this.state;
//     const filterContacts = this.getFilterContacts();

//     return (
//       <>
//         <h1 className={css.AppH}>Phonebook</h1>

//         <Container onSubmit={this.addContact} />
//         <h2 className={css.AppH}>Contacts</h2>
//         <Filter value={filter} onChange={this.changeFilter} />
//         <ContactsList
//           contacts={filterContacts}
//           onDeleteContacts={this.deleteContacts}
//         />
//       </>
//     );
//   }
// }

// App.propTypes = {
//   onSubmit: PropTypes.func,
// };

// export default App;

import React, { useState, useEffect } from 'react';
import Container from './Container/Container';
import ContactsList from './ContactsList/ContactsList';
import initialContacts from '../components/Contacts.json';
import Filter from './Filter/Filter';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts((prevContacts) => [contact, ...prevContacts]);
  };

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const deleteContacts = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      <h1 className={css.AppH}>Phonebook</h1>

      <Container onSubmit={addContact} />
      <h2 className={css.AppH}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactsList
        contacts={getFilterContacts()}
        onDeleteContacts={deleteContacts}
      />
    </>
  );
};

App.propTypes = {
  onSubmit: PropTypes.func,
};

export default App;
