const express = require('express')
const router = express.Router()

const { getFilesFormattedCtrl, getFileListCtrl } = require('../controllers/file.controller')

router.get('/data', getFilesFormattedCtrl) // /api/files/data return formatted data
router.get('/list', getFileListCtrl) // /api/files/list return list of files default external api

module.exports = router
