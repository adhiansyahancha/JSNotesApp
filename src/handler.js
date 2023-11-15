import { nanoid } from 'nanoid';
import notes from './notes.js';

const getAllNotes = (request, h) => {
	const hresponse = h.response(
		{
			'status': 'success',
			'data': { notes },
		},
	).code(200);

	return hresponse;
};

const getNoteById = (request, h) => {
	const { id } = request.params;
	const note = notes.filter((n) => n.id === id)[0];
	
	if (note !== undefined) {
		const hresponse = h.response(
			{
				'status': 'success',
				'data': { note },
			},
		).code(200);

		return hresponse;
	}

	const hresponse = h.response(
		{
			'status': 'failed',
			'message': 'Catatan tidak ditemukan',
		},
	).code(404);

	return hresponse;
};

const addNote = (request, h) => {
	const { title, tags, body } = request.payload;
	const id = nanoid(32);
	const createdAt = (new Date()).toISOString();
	const updatedAt = createdAt;

	notes.push(
		{
			title,
			tags,
			body,
			id,
			createdAt,
			updatedAt,
		},
	);

	const newNoteIsPublished = notes.filter((note) => note.id === id).length > 0;

	if (newNoteIsPublished) {
		const hresponse = h.response(
			{
				'status': 'success',
				'message': 'Catatan berhasill ditambahkan',
				'data': { 'noteId': id },
			},
		).code(201);

		return hresponse;
	}

	const hresponse = h.response(
		{
			'status': 'fail',
			'message': 'Catatan gagal ditambahkan',
		},
	).code(500);

	return hresponse;
};

const editNote = (request, h) => {
	const { id } = request.params;
	const { title, tags, body } = request.payload;
	const updatedAt = (new Date()).toISOString();

	const index = notes.findIndex((note) => note.id === id);

	if (index !== -1) {
		notes[index] = {
			...notes[index], title, tags, body, updatedAt,
		};

		const hresponse = h.response(
			{
				'status': 'success',
				'message': 'Catatan berhasil diperbarui',
			},
		).code(200);

		return hresponse;
	}

	const hresponse = h.response(
		{
			'status': 'fail',
			'message': 'Catatan gagal diperbarui',
		},
	).code(500);

	return hresponse;
};

const deleteNote = (request, h) => {
	const { id } = request.params;
	const index = notes.findIndex((note) => note.id === id);

	if (index !== 1) {
		notes.splice(index, 1);
		const hresponse = h.response(
			{
				'status': 'success',
				'message': 'Catatan berhasil dihapus',
			},
		).code(200);

		return hresponse;
	}

	const hresponse = h.response(
		{
			'status': 'fail',
			'message': 'Catatan gagal dihapus karena tidak ditemukan',
		},
	).code(404);

	return hresponse;
};

export {
 addNote, editNote, deleteNote, getAllNotes, getNoteById,
};
