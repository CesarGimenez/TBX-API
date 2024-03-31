const fileService = require('../services/file.service')
const { getFilesFormatted, getFileList, getFile } = fileService

/**
 * Retrieves files from the server and sends them as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the response is sent.
 */
const getFilesFormattedCtrl = async (req, res) => { // get files from the server
  try {
    const { fileName } = req.query // get file name from queryParam
    if (fileName) { // if file name is provided in the queryParam execute getFile function
      const file = await getFile(fileName)
      res.status(200).json(file)
    } else { // if file name is not provided in the queryParam execute getFilesFormatted function to return formatted file data
      const files = await getFilesFormatted()
      res.status(200).json(files)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getFileListCtrl = async (req, res) => { // get files from the server (not formatted)
  try {
    const files = await getFileList() // get files from the server
    res.status(200).json(files)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getFilesFormattedCtrl,
  getFileListCtrl
}
