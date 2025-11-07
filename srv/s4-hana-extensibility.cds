using { API_BUSINESS_PARTNER as bupa } from './external/API_BUSINESS_PARTNER';
service S4HanaService{
  entity BusinessPartners as projection on bupa.A_BusinessPartner;
  entity Supplier as projection on bupa.A_Customer;
}