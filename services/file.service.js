const axios = require('axios')

const URL = 'https://echo-serv.tbxnet.com/v1/secret'
const KEY = 'aSuperSecretKey'

const getFilesFormatted = async () => {
  const params = {
    headers: {
      Authorization: `Bearer ${KEY}`
    }
  }
  const fileList = await axios.get(`${URL}/files`, params)

  const { data: { files: dataFileList } } = fileList
  const dataProcessed = []

  for (const file of dataFileList) {
    try {
      const { data: fileDataRes } = await axios.get(`${URL}/file/${file}`, params)
      const fileData = fileDataRes.split('\n').slice(1)
      const fileFormatted = fileData.map(l => {
        const [, text, number, hex] = l.split(',')
        if (!text || !number || !hex) {
          return null
        }
        return { text, number: parseInt(number), hex }
      }).filter(l => l)
      if (fileFormatted && fileFormatted.length > 0) {
        dataProcessed.push({ file, lines: fileFormatted })
      }
    } catch (error) {
      // console.log(error)
    }
  }
  return dataProcessed
}

const getFileList = async () => {
  const params = {
    headers: {
      Authorization: `Bearer ${KEY}`
    }
  }
  const fileList = await axios.get(`${URL}/files`, params)
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
  const { data: fileData } = await axios.get(`${URL}/file/${file}`, params)
  const fileDataProcessed = fileData.split('\n').slice(1)
  const fileDataFormatted = fileDataProcessed.map(l => {
    const [, text, number, hex] = l.split(',')
    return { text, number: parseInt(number), hex }
  }).filter(l => l)
  return { file, lines: fileDataFormatted }
}

module.exports = {
  getFilesFormatted,
  getFileList,
  getFile
}
