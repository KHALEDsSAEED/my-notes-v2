import express from 'express';
import { getNotes, updateNote, deleteNote, createNote } from '../controllers/note.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API for managing notes
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Retrieve a list of notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: A list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */
router.get('/', getNotes);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       201:
 *         description: Note created successfully
 */
router.post('/', createNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update an existing note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the note to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: Note updated successfully
 */
router.put('/:id', updateNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the note to delete
 *     responses:
 *       200:
 *         description: Note deleted successfully
 */
router.delete('/:id', deleteNote);

export default router;