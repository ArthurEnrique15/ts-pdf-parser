import { useContext, useState } from 'react'
import { UploadContainer } from './style'
import { api } from '../../lib/axios'
import { InvoicesContext } from '../../contexts/InvoicesContext'

export function Upload() {
  const [isFileSelected, setIsFileSelected] = useState(false)

  const { addInvoice } = useContext(InvoicesContext)

  const handleSelectFile = () => {
    setIsFileSelected(true)
  }

  const handleSendFile = async () => {
    const fileInput = document.getElementById('pdfInput') as HTMLInputElement

    if (!fileInput || !fileInput.files) return

    const file = fileInput.files[0]

    const formData = new FormData()
    formData.append('pdfFile', file)

    const response = await api.post(
      `${import.meta.env.VITE_SERVER_URL}/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    addInvoice(response.data)

    alert('Arquivo enviado com sucesso!')

    window.location.href = '/'
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
