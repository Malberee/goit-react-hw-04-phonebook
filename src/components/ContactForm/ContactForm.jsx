import { useState } from 'react'
import { FaPhone, FaUser } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { Form, FormIcon } from './ContactForm.styled'
import Input from '../Input'
const ContactForm = ({ onSubmitForm }) => {
	const [name, setName] = useState('')
	const [number, setNumber] = useState('')

	const onChange = (e) => {
		const { name, value } = e.target
		if (name === 'name') setName(value)
		if (name === 'number') setNumber(value)
	}

	const onSubmit = (e) => {
		e.preventDefault()

		onSubmitForm({ name: name, number: number })
		setName('')
		setNumber('')
	}

	return (
		<Form onSubmit={onSubmit}>
			<label>
				<FormIcon>
					<FaUser />
				</FormIcon>
				Name
				<Input
					type="text"
					name="name"
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					required
					value={name}
					onChange={onChange}
				/>
			</label>
			<label>
				<FormIcon>
					<FaPhone />
				</FormIcon>
				Number
				<Input
					type="tel"
					name="number"
					pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
					title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
					required
					value={number}
					onChange={onChange}
				/>
			</label>
			<button type="submit">Add contact</button>
		</Form>
	)
}

ContactForm.propTypes = {
	onSubmitForm: PropTypes.func.isRequired,
}

export default ContactForm
