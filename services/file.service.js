const axios = require('axios')

const URL = 'https://echo-serv.tbxnet.com/v1/secret' // URL of the external API
const KEY = 'aSuperSecretKey' // key of the external API

const getFilesFormatted = async () => { // get files from the server and format them
  const params = {
    headers: {
      Authorization: `Bearer ${KEY}`
    }
  }
  const fileList = await axios.get(`${URL}/files`, params) // get files from the server external API

  const { data: { files: dataFileList } } = fileList
  const dataProcessed = []

  for (const file of dataFileList) { // for each file in the list
    try {
      const { data: fileDataRes } = await axios.get(`${URL}/file/${file}`, params) // get file data from the server external API
      const fileData = fileDataRes.split('\n').slice(1) // format file data (convert to array and remove first line with header)
      const fileFormatted = fileData.map(l => {
        const [, text, number, hex] = l.split(',') // split line by comma
        if (!text || !number || !hex) { // check if line is valid
          return null
        }
        return { text, number: parseInt(number), hex } // return formatted line
      }).filter(l => l) // remove null lines
      if (fileFormatted && fileFormatted.length > 0) { // check if file is valid
        dataProcessed.push({ file, lines: fileFormatted }) // add formatted file to the list
      }
    } catch (error) {
      // console.log(error)
    }
  }
  return dataProcessed // return list of formatted files
}

const getFileList = async () => {
  const params = {
    headers: {
      Authorization: `Bearer ${KEY}`
    }
  }
  const fileList = await axios.get(`${URL}/files`, params) // get files from the server external API (original form)
  const { data: { files } } = fileList
  return files
}

const getFile = async (file) => {
  const params = {
    headers: {
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json'
    }
  }
  const { data: fileData } = await axios.get(`${URL}/file/${file}`, params) // get file data from the server external API
  const fileDataProcessed = fileData.split('\n').slice(1) // format file data (convert to array and remove first line with header)
  const fileDataFormatted = fileDataProcessed.map(l => { // format each line
    const [, text, number, hex] = l.split(',') // split line by comma
    return { text, number: parseInt(number), hex } // return formatted line
  }).filter(l => l) // remove null lines
  return { file, lines: fileDataFormatted }
}

module.exports = {
  getFilesFormatted,
  getFileList,
  getFile
}
