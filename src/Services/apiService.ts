import axios from "axios";
import { config } from "../Config";
import Account from "../Objects/Account";

async function echo() {
  const response = await axios.get(`${config.pathBase}/Transfer/echo?name=pawel`);
  return response.data;
}

async function getTransfers() {
  const data = { Name: "Proxy" };
  const response = await axios.post(`${config.pathBase}/Transfer/List`, data);
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

export { getTransfers, getAccounts, addAccount, echo };
