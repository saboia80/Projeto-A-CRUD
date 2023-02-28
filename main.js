'use strict'

const openmodal = () => document.getElementById('modal')
      .classList.add('active')
const closemodal = () => {
      clearFields()
      document.getElementById('modal').classList.remove('active')
}
const getLocalStorage = () => JSON.parse(localStorage.getItem('DB_client')) ?? []
const setLocalStorage = (DB_client) => localStorage.setItem("DB_client", JSON.stringify(DB_client))

const deleteClient = (index) => {
      const DB_client = readClient()
      DB_client.splice(index, 1)
      setLocalStorage(DB_client)
}
const updateClient = (index, client) => {
      const DB_client = readClient()
      DB_client[index] = client
      setLocalStorage(DB_client)
}
const readClient = () => getLocalStorage()

const createClient = (client) => {
      const DB_client = getLocalStorage()
      DB_client.push(client)
      setLocalStorage(DB_client)
}
const isValidFields = () => {
      return document.getElementById('formulario').reportValidity()
}
const clearFields = () => {
      const fields = document.querySelectorAll('.modal-field')
      fields.forEach(field => field.value = "")
}
const saveClient = () => {
      if (isValidFields()) {
            const client = {
                  nome: document.getElementById("nome").value,
                  email: document.getElementById("email").value,
                  telefone: document.getElementById("telefone").value,
                  cidade: document.getElementById("cidade").value,
                  Nascimento: document.getElementById("DataNascimento").value,
                  Documento: document.getElementById("Documento").value,
                  EstadoCivil: document.getElementById("EstadoCivil").value,
                  PossuiFilhos: document.getElementById("PossuiFilhos").value,
                  Profissão: document.getElementById("Profissão").value,
                  Sexo: document.getElementById("Sexo").value,
                  CEP: document.getElementById("CEP").value,
            }
            const indice = document.getElementById('nome').dataset.index
            if (indice == 'new') {
                  createClient(client)
                  updateTable()
                  closemodal()
                  clearFields()
            } else {
                  updateClient(indice, client)
                  updateTable()
                  closemodal()
            }
      }
}
const createRow = (client, indice) => {
      const newRow = document.createElement('tr')
      newRow.innerHTML = `
      <td>1001</td>
      <td>${client.nome}</td>
      <td>${client.email}</td>
      <td>${client.telefone}</td>
      <td>${client.cidade}</td>
      <td>${client.Nascimento}</td>
      <td>${client.Documento}</td>
      <td>${client.EstadoCivil}</td>
      <td>${client.PossuiFilhos}</td>
      <td>${client.Profissão}</td>
      <td>${client.Sexo}</td>
      <td>${client.CEP}</td>
      <td>
        <button type="button" class="btn green" data-action='visualizar-${indice}'>Visualizar</button>
        <button type="button" class="btn yellow" data-action='editar-${indice}'>Editar</button>
        <button type="button" class="btn red" data-action='excluir-${indice}'>Excluir</button>
      </td>`

      document.querySelector('#TBClient>tbody').appendChild(newRow)
}
const cleartable = () => {
      const rows = document.querySelectorAll('#TBClient>tbody tr')
      rows.forEach(row => row.parentNode.removeChild(row))
}
const updateTable = () => {
      const DB_client = readClient()
      cleartable()
      DB_client.forEach(createRow)
}
const Fields = (client) => {
      document.getElementById('nome').value = client.nome
      document.getElementById('email').value = client.email
      document.getElementById('telefone').value = client.telefone
      document.getElementById('cidade').value = client.cidade
      document.getElementById('DataNascimento').value = client.Nascimento
      document.getElementById('Documento').value = client.Documento
      document.getElementById('EstadoCivil').value = client.EstadoCivil
      document.getElementById('PossuiFilhos').value = client.PossuiFilhos
      document.getElementById('Profissão').value = client.Profissão
      document.getElementById('Sexo').value = client.Sexo
      document.getElementById('CEP').value = client.CEP
      document.getElementById('nome').dataset.index = client.index
}
const editClient = (indice) => {
      const client = readClient()[indice]
      client.index = indice
      Fields(client)
      openmodal()
}
const editDelete = (event) => {
      if (event.target.type == 'button') {
            const [action, indice] = event.target.dataset.action.split('-')
            if (action == 'editar') {
                  editClient(indice)
            }
            else {
                  const client = readClient()[indice]
                  const response = confirm(`Excluir Cliente? ${client.nome}`)
                  if (response) {
                        deleteClient(indice)
                        updateTable()
                  }
            }
      }
}

updateTable()

document.getElementById('cadastrarCliente')
      .addEventListener('click', openmodal)
document.getElementById('modalclose')
      .addEventListener('click', closemodal)
document.getElementById('salvar')
      .addEventListener('click', saveClient)
document.querySelector('#TBClient>tbody')
      .addEventListener('click', editDelete)