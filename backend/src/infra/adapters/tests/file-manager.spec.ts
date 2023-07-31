import fs from 'fs'
import path from 'path'
import { FileManager } from '../file-manager'

jest.spyOn(path, 'join').mockImplementation((dirname, path) => {
  if (!path.includes('.pdf')) {
    return 'tmp_path'
  }
  return 'file_path'
})

jest.spyOn(fs, 'accessSync').mockImplementation()
jest.spyOn(fs, 'appendFileSync').mockImplementation()
jest.spyOn(fs, 'existsSync').mockReturnValue(true)
jest.spyOn(fs, 'mkdirSync').mockImplementation()

describe('FileManager', () => {
  const sut = new FileManager()

  describe('checkIfFileExists', () => {
    it('should call fs.accessSync with correct file path', () => {
      sut.checkIfFileExists('any_file_name')
      expect(fs.accessSync).toHaveBeenCalledWith('file_path')
    })

    it('should return true if file exists', () => {
      const result = sut.checkIfFileExists('any_file_name')
      expect(result).toBe(true)
    })

    it('should not throw if file does not exist', () => {
      jest.spyOn(fs, 'accessSync').mockImplementationOnce(() => {
        throw new Error()
      })

      expect(() => sut.checkIfFileExists('any_file_name')).not.toThrow()
    })

    it('should return false if file does not exist', () => {
      jest.spyOn(fs, 'accessSync').mockImplementationOnce(() => {
        throw new Error()
      })

      const result = sut.checkIfFileExists('any_file_name')
      expect(result).toBe(false)
    })
  })

  describe('createFile', () => {
    it('should call fs.existsSync with correct tmp folder path', () => {
      sut.createFile('any_file_name', Buffer.from('any_content'))
      expect(fs.existsSync).toHaveBeenCalledWith('tmp_path')
    })

    it('should call fs.mkdirSync with correct tmp folder path if tmp folder does not exist', () => {
      jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false)
      sut.createFile('any_file_name', Buffer.from('any_content'))
      expect(fs.mkdirSync).toHaveBeenCalledWith('tmp_path')
    })

    it('should call fs.appendFileSync with correct file path and file content', () => {
      sut.createFile('any_file_name', Buffer.from('any_content'))
      expect(fs.appendFileSync).toHaveBeenCalledWith('file_path', Buffer.from('any_content'))
    })
  })

  describe('getFilePath', () => {
    it('should return correct file path', () => {
      const result = sut.getFilePath('any_file_name')
      expect(result).toBe('file_path')
    })
  })
})
