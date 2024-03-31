const express = require('express')
const router = express.Router()

const { getFilesFormattedCtrl, getFileListCtrl } = require('../controllers/file.controller')

/**
 * @openapi
 * /files/data:
 *   get:
 *     summary: Return formatted data
 *     description: This endpoints return the data in a specific format
 *     tags:
 *       - Files
 *     parameters:
 *       - in: query
 *         name: fileName
 *         schema:
 *           type: string
 *         description: Filter by file name
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get('/data', getFilesFormattedCtrl)

/**
 * @openapi
 * /files/list:
 *   get:
 *     summary: Return list of files
 *     description: This endpoints return the list of files
 *     tags:
 *       - Files
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get('/list', getFileListCtrl)

module.exports = router
