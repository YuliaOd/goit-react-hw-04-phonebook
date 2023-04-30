import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import css from "./App.module.css";

export const App = () => {

  const [contacts, setContacts] = useState(() => { return JSON.parse(localStorage.getItem('contacts')) ?? [] });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    }

    const addedContacts = getAddedContacts(name);
    
    (addedContacts) ? alert(`${name} is already in contacts`) :
    setContacts([contact, ...contacts])
  }

  const getAddedContacts = (name) => {
    return contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
  }

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value)
  }

  const getVisibleContacts = () => {
    const normalize = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalize))
  }
  
  const deleteContact = contactId => {
    setContacts(prevState => (prevState.filter(contact => contact.id !== contactId)))
  }

    const visibleContacts = getVisibleContacts();

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onFilterChange={changeFilter}/>
        <ContactsList contacts={visibleContacts} onDeleteContact={deleteContact} />
      </div>
  )
};