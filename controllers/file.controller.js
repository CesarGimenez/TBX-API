const fileService = require('../services/file.service')
const { getFilesFormatted, getFileList, getFile } = fileService

/**
 * Retrieves files from the server and sends them as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the response is sent.
 */
const getFilesFormattedCtrl = async (req, res) => {
  try {
    const { fileName } = req.query
    if (fileName) {
      const file = await getFile(fileName)
      res.status(200).json({ file })
    } else {
      const files = await getFilesFormatted()
      res.status(200).json({ files })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getFileListCtrl = async (req, res) => {
  try {
    const files = await getFileList()
    res.status(200).json({ files })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getFilesFormattedCtrl,
  getFileListCtrl
}
