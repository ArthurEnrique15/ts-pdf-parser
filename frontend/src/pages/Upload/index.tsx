import { useState } from 'react'
import { UploadContainer } from './style'
import { api } from '../../lib/axios'

export function Upload() {
  const [isFileSelected, setIsFileSelected] = useState(false)

  const handleSelectFile = () => {
    setIsFileSelected(true)
  }

  const handleSendFile = async () => {
    const fileInput = document.getElementById('pdfInput') as HTMLInputElement

    if (!fileInput || !fileInput.files) return

    const file = fileInput.files[0]

    const formData = new FormData()
    formData.append('pdfFile', file)

    api.post(`${import.meta.env.VITE_SERVER_URL}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    setIsFileSelected(false)
    fileInput.value = ''

    alert('Arquivo enviado com sucesso!')
  }

  return (
    <UploadContainer>
      <h1>Upload</h1>
      <input
        type="file"
        id="pdfInput"
        name="pdfInput"
        accept="pdf"
        onChange={handleSelectFile}
      ></input>
      <button onClick={handleSendFile} disabled={!isFileSelected}>
        Enviar
      </button>
    </UploadContainer>
  )
}
