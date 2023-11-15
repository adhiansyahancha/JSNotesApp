import {
 addNote, editNote, deleteNote, getAllNotes, getNoteById,
} from './handler.js';

const optCors = () => ({
		'cors': {
			'origin': ['http://notesapp-v1.dicodingacademy.com'],
		},
	});

const routes = [
	{
		'method': 'GET',
		'path': '/notes',
		'handler': getAllNotes,
		'options': optCors,
	},
	{
		'method': 'POST',
		'path': '/notes',
		'handler': addNote,
		'options': optCors,
	},
	{
		'method': 'GET',
		'path': '/notes/{id}',
		'handler': getNoteById,
		'options': optCors,
	},
	{
		'method': 'PUT',
		'path': '/notes/{id}',
		'handler': editNote,
		'options': optCors,
	},
	{
		'method': 'DELETE',
		'path': '/notes/{id}',
		'handler': deleteNote,
		'options': optCors,
	},
];

export default routes;
