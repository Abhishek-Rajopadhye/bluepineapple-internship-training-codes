/**
 * Module for handling file I/O operations.
 * @module file_handling
 * @requires fs
 */

const fs = require('fs');

const BOOKS_FILE = "../storage/books.json";
const MEMBERS_FILE = "../storage/members.json";
const ALLOCATIONS_FILE = "../storage/allocated_books.json";

/**
 * Loads and parses a JSON file.
 * @function
 * @name loadFile
 * @param {string} filename - The path to the JSON file to be loaded.
 * @returns {Object|Array} The parsed JSON content of the file. Returns an empty array if an error occurs.
 */
function loadFile(filename) {
    try {
        return JSON.parse(fs.readFileSync(filename, 'utf8'));
    } catch (err) {
        return [];
    }
}

/**
 * Saves data to a JSON file.
 * @function
 * @name saveFile
 * @param {string} filename - The path to the JSON file to be saved.
 * @param {Object|Array} data - The data to be saved to the file.
 */
function saveFile(filename, data) {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

module.exports = { loadFile, saveFile, BOOKS_FILE, MEMBERS_FILE, ALLOCATIONS_FILE };
