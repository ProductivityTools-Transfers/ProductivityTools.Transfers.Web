import axios from "axios";
import { config } from "../Config";
import Account from "../Objects/Account";
import Transfer from "../Objects/Transfer";

async function echo() {
  const response = await axios.get(`${config.pathBase}/Transfer/echo?name=pawel`);
  return response.data;
}

async function getTransfers() {
  const data = { Name: "Proxy" };
  const response = await axios.post(`${config.pathBase}/Transfer/List`, data);
  return response.data;
}

async function addTransfer(transfer: Transfer) {
  const data = { Name: "Proxy" };
  const response = await axios.post(`${config.pathBase}/Transfer/Add`, transfer);
  return response.data;
}

async function getAccounts() {
  const data = { Name: "Proxy" };
  const response = await axios.post(`${config.pathBase}/Account/List`, data);
  return response.data;
}

async function addAccount(account: Account) {
  //const data = { Name: "Proxy" };
  const response = await axios.post(`${config.pathBase}/Account/Add`, account);
  return response.data;
}

export { getTransfers,addTransfer, getAccounts, addAccount, echo };
