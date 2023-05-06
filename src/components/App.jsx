import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import initialContacts from '../data/contacts.json'
import './App.scss'
import Section from './Section'
import ContactForm from './ContactForm'
import ContactList from './ContactList'
import Filter from './Filter'

const App = () => {
	const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contacts')) ?? initialContacts)
	const [filter, setFilter] = useState('')

	useEffect(() => {
		console.log('Updated contacts')
		localStorage.setItem('contacts', JSON.stringify(contacts))
	}, [contacts])

	const onSubmitForm = (newContact) => {
		const alreadyExists = contacts.some(
			({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
		)

		if (alreadyExists) {
			alert(`${newContact.name} is already in contacts`)
			return
		}

		setContacts([...contacts, { ...newContact, id: nanoid() }])
	}

	const onRemoveContact = (contactId) => {
		const filtered = contacts.filter(({ id }) => id !== contactId)
		setContacts(filtered)
	}

	const onSearchChange = (e) => {
		setFilter(e.target.value.toLowerCase())
	}

	const showContacts = () => {
		return contacts.filter(({ name }) => name.toLowerCase().includes(filter))
	}

	return (
		<>
			<Section title="Phonebook">
				<ContactForm
					onSubmitForm={onSubmitForm}
				/>
			</Section>
			<Section title="Contacts">
				{contacts.length ? (
					<>
						<Filter filter={filter} onChange={onSearchChange} />
						<ContactList
							contacts={showContacts()}
							onRemoveContact={onRemoveContact}
						/>
					</>
				) : (
					<p>Not found</p>
				)}
			</Section>
		</>
	)
}

export default App
