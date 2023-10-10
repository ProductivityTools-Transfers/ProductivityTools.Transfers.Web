import axios from "axios";
import { config } from "../Config";
import Account from "../Objects/Account";
import Transfer from "../Objects/Transfer";

async function echo() {
  const response = await axios.get(`${config.pathBase}/Transfer/echo?name=pawel`);
  return response.data;
}

async function getTransfers(item: number | null) {
  const data = { transferId: item };
  const response = await axios.post(`${config.pathBase}/Transfer/TransferList`, data);
  return response.data;
}

async function getTransfer(item: number) {
  const data = { transferId: item };
  const response = await axios.post(`${config.pathBase}/Transfer/TransferItem`, data);
  return response.data;
}

async function addTransfer(transfer: Transfer) {
  const data = { Name: "Proxy" };
  const response = await axios.post(`${config.pathBase}/Transfer/TransferEdit`, transfer);
  return response.data;
}

async function getAccounts() {
  const data = { Name: "Proxy" };
  const response = await axios.post(`${config.pathBase}/Account/AccountList`, data);
  return response.data;
}

async function getAccount(item: number) {
  const data = { accountId: item };
  const response = await axios.post(`${config.pathBase}/Account/AccountItem`, data);
  return response.data;
}

async function addAccount(account: Account) {
  //const data = { Name: "Proxy" };
  const response = await axios.post(`${config.pathBase}/Account/AccountEdit`, account);
  return response.data;
}

export { getTransfers, getTransfer, addTransfer, getAccounts, getAccount, addAccount, echo };
