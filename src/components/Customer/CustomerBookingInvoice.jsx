import { react, useEffect, useState } from "react";
import { toast } from "react-toastify";
import crudService from "../../services/crudService";

const CustomerBookingInvoice = () => {
  const { invoice, setInvoice } = useState(null);
  useEffect(() => {
    const fetchInvoices = async () => {};
  }, [invoiceId]);
};

export default CustomerBookingInvoice;
