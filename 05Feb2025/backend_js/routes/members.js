/**
 * Express router providing member related routes.
 * @module routes/members
 * @requires express.Router()
 * @requires file_handling
 * @exports router
 */

const express = require('express');
const router = express.Router();
const { loadFile, saveFile, MEMBERS_FILE } = require('../file_handling');

/**
 * GET /members
 * Retrieves all members.
 * @name getMembers
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/', async (req, res) => {
    try {
        const data = await loadFile(MEMBERS_FILE);
        res.json(data.members);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load members' });
    }
});

/**
 * GET /members/:id
 * Retrieves a member by ID.
 * @name getMemberById
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/:id', async (req, res) => {
    try {
        const data = await loadFile(MEMBERS_FILE);
        const member = data.members.find(member => member.id === parseInt(req.params.id));
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json(member);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load member' });
    }
});

/**
 * POST /members
 * Adds a new member.
 * @name addMember
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const data = await loadFile(MEMBERS_FILE);
        
        // Generate new ID
        const maxId = data.members.reduce((max, member) => Math.max(max, member.id), 0);
        const newMember = {
            id: maxId + 1,
            name
        };

        data.members.push(newMember);
        await saveFile(MEMBERS_FILE, data);
        res.status(201).json(newMember);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add member' });
    }
});

/**
 * PUT /members/:id
 * Updates a member by ID.
 * @name updateMember
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.put('/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const data = await loadFile(MEMBERS_FILE);
        const memberIndex = data.members.findIndex(member => member.id === parseInt(req.params.id));
        
        if (memberIndex === -1) {
            return res.status(404).json({ error: 'Member not found' });
        }

        data.members[memberIndex] = {
            ...data.members[memberIndex],
            name: name || data.members[memberIndex].name
        };

        await saveFile(MEMBERS_FILE, data);
        res.json(data.members[memberIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update member' });
    }
});

/**
 * DELETE /members/:id
 * Deletes a member by ID.
 * @name deleteMember
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.delete('/:id', async (req, res) => {
    try {
        const data = await loadFile(MEMBERS_FILE);
        const memberIndex = data.members.findIndex(member => member.id === parseInt(req.params.id));
        
        if (memberIndex === -1) {
            return res.status(404).json({ error: 'Member not found' });
        }

        data.members.splice(memberIndex, 1);
        await saveFile(MEMBERS_FILE, data);
        res.json({ message: 'Member deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete member' });
    }
});

module.exports = router;